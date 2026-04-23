const router = require('express').Router();
const { User, Property, Lead, Agent, Testimonial, sequelize } = require('../models');
const { auth, isSuperAdmin } = require('../middleware/auth');

router.use(auth, isSuperAdmin);

// GET /api/superadmin/stats
router.get('/stats', async (req, res) => {
  try {
    const [users, properties, leads, recentLeads, recentProperties] = await Promise.all([
      User.count({ where: { role: 'admin' } }),
      Property.count({ where: { isActive: true } }),
      Lead.count(),
      Lead.findAll({ 
        limit: 5, 
        order: [['createdAt', 'DESC']],
        include: [{ model: Property, attributes: ['title'] }, { model: User, attributes: ['companyName'] }]
      }),
      Property.findAll({ 
        limit: 5, 
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: ['companyName'] }]
      }),
    ]);

    // Month-wise lead distribution
    const monthlyData = await Lead.findAll({
      attributes: [
        [sequelize.fn('date_format', sequelize.col('createdAt'), '%m'), 'monthNum'],
        [sequelize.fn('date_format', sequelize.col('createdAt'), '%b'), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['monthNum', 'month'],
      order: [['monthNum', 'ASC']]
    });

    res.json({ 
      users, 
      properties, 
      leads, 
      recentLeads, 
      recentProperties,
      chartData: monthlyData.map(d => ({ name: d.getDataValue('month'), value: d.getDataValue('count') }))
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/superadmin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'admin' },
      attributes: ['id','name','email','companyName','phone','isActive','createdAt'],
      order: [['createdAt','DESC']],
    });
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/superadmin/users  (create admin)
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, companyName, phone, whatsappNumber } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, password required' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already in use' });
    const user = await User.create({ name, email, password, companyName, phone, whatsappNumber, role: 'admin' });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, companyName: user.companyName });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/superadmin/users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user || user.role === 'super_admin') return res.status(404).json({ error: 'Not found' });
    const { name, companyName, phone, whatsappNumber, isActive, password } = req.body;
    const updates = { name, companyName, phone, whatsappNumber, isActive };
    if (password) updates.password = password;
    await user.update(updates);
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/superadmin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user || user.role === 'super_admin') return res.status(404).json({ error: 'Not found' });
    await user.update({ isActive: false });
    res.json({ message: 'Deactivated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/superadmin/leads
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.findAll({
      include: [
        { model: Property, attributes: ['id','title','location'] },
        { model: User, attributes: ['id','name','companyName'] },
      ],
      order: [['createdAt','DESC']],
    });
    res.json(leads);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/superadmin/properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{ model: User, attributes: ['id','name','companyName'] }, { model: Agent, attributes: ['name'] }],
      order: [['createdAt','DESC']],
    });
    res.json(properties);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Testimonials CRUD
router.get('/testimonials', async (req, res) => {
  try { res.json(await Testimonial.findAll()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/testimonials', async (req, res) => {
  try { res.status(201).json(await Testimonial.create(req.body)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    await Testimonial.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
