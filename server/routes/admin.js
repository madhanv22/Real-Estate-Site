const router = require('express').Router();
const { Op } = require('sequelize');
const { Property, Agent, Lead, User } = require('../models');
const { auth, isAdmin } = require('../middleware/auth');

router.use(auth, isAdmin);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    const isSuper = req.user.role === 'super_admin';
    
    // Safety check: ensure we only count active properties
    const propertyWhere = isSuper ? { isActive: true } : { userId, isActive: true };
    const leadWhere = isSuper ? {} : { userId };

    const propertiesCount = await Property.count({ where: propertyWhere });
    const leadsCount = await Lead.count({ where: leadWhere });
    const newLeadsCount = await Lead.count({ where: { ...leadWhere, status: 'new' } });

    res.json({ 
      properties: propertiesCount || 0, 
      leads: leadsCount || 0, 
      newLeads: newLeadsCount || 0, 
      views: 0 
    });
  } catch (err) { 
    console.error('❌ Stats Error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// GET /api/admin/properties
router.get('/properties', async (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    const isAgent = req.user.role === 'agent';
    
    let where = {};
    if (isSuper) {
      where = {};
    } else if (isAgent) {
      // Find the agent's record to get their admin's userId
      const agent = await Agent.findOne({ where: { linkedUserId: req.user.id } });
      where = agent ? { userId: agent.userId } : { id: 0 }; // fallback to none if no agent profile
    } else {
      where = { userId: req.user.id };
    }

    const properties = await Property.findAll({
      where,
      include: [{ model: Agent }],
      order: [['createdAt', 'DESC']],
    });
    res.json(properties);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/properties
router.post('/properties', async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/properties/:id
router.put('/properties/:id', async (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    const property = await Property.findOne({ 
      where: isSuper ? { id: req.params.id } : { id: req.params.id, userId: req.user.id } 
    });
    if (!property) return res.status(404).json({ error: 'Not found' });
    await property.update(req.body);
    res.json(property);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/properties/:id
router.delete('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!property) return res.status(404).json({ error: 'Not found' });
    await property.update({ isActive: false });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/agents
router.get('/agents', async (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    const agents = await Agent.findAll({ 
      where: isSuper ? {} : { userId: req.user.id } 
    });
    res.json(agents);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/agents
router.post('/agents', async (req, res) => {
  try {
    const { email, password, name, ...profileData } = req.body;
    let linkedUserId = null;

    if (email && password) {
      const user = await User.create({
        name,
        email,
        password,
        role: 'agent',
        phone: req.body.phone,
        companyName: req.user.companyName
      });
      linkedUserId = user.id;
    }

    const agent = await Agent.create({ 
      ...profileData, 
      id: `agent_${Date.now()}`,
      name,
      userId: req.user.id,
      linkedUserId
    });
    res.status(201).json(agent);
  } catch (err) { 
    console.error('❌ Agent Creation Error:', err);
    const msg = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
    res.status(400).json({ error: msg }); 
  }
});

// PUT /api/admin/agents/:id
router.put('/agents/:id', async (req, res) => {
  try {
    const agent = await Agent.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!agent) return res.status(404).json({ error: 'Not found' });
    await agent.update(req.body);
    res.json(agent);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/leads
router.get('/leads', async (req, res) => {
  try {
    const isSuper = req.user.role === 'super_admin';
    const leads = await Lead.findAll({
      where: isSuper ? {} : { userId: req.user.id },
      include: [{ model: Property, attributes: ['id','title','location'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(leads);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/leads/:id/status
router.put('/leads/:id/status', async (req, res) => {
  try {
    const lead = await Lead.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!lead) return res.status(404).json({ error: 'Not found' });
    await lead.update({ status: req.body.status });
    res.json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET/PUT /api/admin/profile
router.get('/profile', (req, res) => {
  const u = req.user;
  res.json({ id: u.id, name: u.name, email: u.email, companyName: u.companyName, phone: u.phone, whatsappNumber: u.whatsappNumber });
});

router.put('/profile', async (req, res) => {
  try {
    const { name, companyName, phone, whatsappNumber, password } = req.body;
    const updates = { name, companyName, phone, whatsappNumber };
    if (password) updates.password = password;
    await req.user.update(updates);
    res.json({ message: 'Profile updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
