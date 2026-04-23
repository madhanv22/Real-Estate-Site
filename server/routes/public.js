const router = require('express').Router();
const { Op } = require('sequelize');
const { Property, Agent, Testimonial, Lead, User, Sale } = require('../models');

// GET /api/properties
router.get('/properties', async (req, res) => {
  try {
    const { search = '', type = 'All', featured } = req.query;
    const where = { isActive: true, status: 'available' };
    if (type && type !== 'All') where.type = { [Op.like]: `%${type}%` };
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
      ];
    }
    if (featured === 'true') where.isFeatured = true;
    const properties = await Property.findAll({ where, include: [{ model: Agent, attributes: ['id','name','title','avatar','phone'] }], order: [['isFeatured','DESC'],['createdAt','DESC']] });
    res.json(properties);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/properties/:id
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { id: req.params.id, isActive: true, status: 'available' },
      include: [{ model: Agent }],
    });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/agents/:id
router.get('/agents/:id', async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    const properties = await Property.findAll({ where: { agentId: agent.id, isActive: true, status: 'available' } });
    res.json({ agent, properties });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ where: { isActive: true } });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/leads
router.post('/leads', async (req, res) => {
  try {
    const { propertyId, name, phone, budget, propertyType, timeline, loanRequired, visitDate, visitTime, leadType } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number required' });

    let userId = null;
    if (propertyId) {
      const prop = await Property.findByPk(propertyId);
      if (prop) userId = prop.userId;
    }

    const lead = await Lead.create({ propertyId, userId, name, phone, budget, propertyType, timeline, loanRequired, visitDate, visitTime, leadType: leadType || 'inquiry' });
    res.status(201).json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/bookings (Public direct booking)
router.post('/bookings', async (req, res) => {
  try {
    const { propertyId, clientName, email, amount, paymentId } = req.body;
    const property = await Property.findByPk(propertyId);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    if (property.status !== 'available') return res.status(400).json({ error: 'Property is no longer available' });

    // Mark as sold and record the transaction
    await property.update({ status: 'sold' });
    
    // Create a Sale record for the ledger
    await Sale.create({
      propertyId,
      userId: property.userId,
      agentId: property.agentId,
      salePrice: property.price,
      commission: '0',
      clientName,
      clientEmail: email,
      paymentId: paymentId || 'PAY_AT_SITE',
      paymentStatus: (!paymentId || paymentId === 'PAY_AT_SITE') ? 'pending' : 'completed',
      saleDate: new Date()
    });

    res.status(201).json({ message: 'Booking successful' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/my-bookings
router.get('/my-bookings', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    // Find all sales/bookings for this email
    // Note: We'll match against the clientName or a new email field if we added one
    // For now, let's assume we store email in the 'clientName' field or a dedicated field
    // Looking at CheckoutPage, I'm passing email as a separate field, let's ensure Sale model has it
    const bookings = await Sale.findAll({
      where: { clientEmail: email },
      include: [{ model: Property }],
      order: [['saleDate', 'DESC']]
    });
    
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
