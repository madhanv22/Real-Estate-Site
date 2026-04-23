const router = require('express').Router();
const { Op } = require('sequelize');
const { Property, Agent, Testimonial, Lead, User } = require('../models');

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

module.exports = router;
