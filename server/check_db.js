const { User, Property, Lead } = require('./models');

async function check() {
  const admins = await User.count({ where: { role: 'admin' } });
  const props = await Property.count();
  const leads = await Lead.count();
  const allLeads = await Lead.findAll({ attributes: ['createdAt'] });
  
  console.log('--- DB STATS ---');
  console.log('Admins:', admins);
  console.log('Properties:', props);
  console.log('Leads:', leads);
  console.log('Lead Dates:', allLeads.map(l => l.createdAt));
}

check();
