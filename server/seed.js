require('dotenv').config();
const { sequelize, User, Agent, Property, Testimonial } = require('./models');

const seed = async () => {
  await sequelize.sync({ force: true });
  console.log('DB synced (force)');

  // Super Admin
  const superAdmin = await User.create({
    name: 'PropFunnel Admin',
    email: 'admin@propfunnel.com',
    password: 'Admin@123',
    role: 'super_admin',
    companyName: 'PropFunnel HQ',
    phone: '919000000000',
  });

  // Demo Admin – Priya
  const priyaUser = await User.create({
    name: 'Priya Sharma',
    email: 'priya@primehomes.com',
    password: 'Priya@123',
    role: 'admin',
    companyName: 'Prime Homes Realty',
    phone: '919876543210',
    whatsappNumber: '919876543210',
  });

  // Demo Admin – Ravi
  const raviUser = await User.create({
    name: 'Ravi Mehta',
    email: 'ravi@ravirealty.com',
    password: 'Ravi@123',
    role: 'admin',
    companyName: 'Ravi Properties',
    phone: '918765432109',
    whatsappNumber: '918765432109',
  });

  // Agents
  const priyaAgent = await Agent.create({
    id: 'priya-homes', userId: priyaUser.id,
    name: 'Priya Sharma', title: 'Senior Property Consultant',
    experience: '12 years', deals: '340+ deals',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
    tagline: 'Premium Homes, Trusted Hands', phone: '919876543210',
  });

  const raviAgent = await Agent.create({
    id: 'ravi-properties', userId: raviUser.id,
    name: 'Ravi Mehta', title: 'Investment Property Specialist',
    experience: '8 years', deals: '210+ deals',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    tagline: 'Smart Investments, Real Returns', phone: '918765432109',
  });

  // Properties
  const props = [
    {
      agentId: 'priya-homes', userId: priyaUser.id, isFeatured: true,
      title: 'Luminaire Residences', location: 'Baner, Pune',
      price: '₹1.2 Cr', type: '3 BHK Apartment', beds: 3, baths: 2, area: '1,450 sq ft',
      tags: ['Ready to Move','RERA Approved','Gated'],
      highlights: ['Rooftop Pool','EV Charging','24/7 Security','Club House'],
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80'],
      priceHistory: [{y:'2020',v:72},{y:'2021',v:78},{y:'2022',v:88},{y:'2023',v:98},{y:'2024',v:112},{y:'2025',v:120}],
      amenities: ['Swimming Pool','Gymnasium','Jogging Track','Kids Play Area','Party Hall','Cafeteria'],
      nearby: ['500m – Metro Station','1.2km – International School','800m – Supermarket','2km – Hospital'],
    },
    {
      agentId: 'ravi-properties', userId: raviUser.id, isFeatured: true,
      title: 'Serenity Heights', location: 'Wakad, Pune',
      price: '₹85 Lakh', type: '2 BHK Apartment', beds: 2, baths: 2, area: '1,100 sq ft',
      tags: ['Under Construction','RERA Approved'],
      highlights: ['Smart Home','Solar Power','Vastu Compliant','Modular Kitchen'],
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80'],
      priceHistory: [{y:'2020',v:52},{y:'2021',v:58},{y:'2022',v:63},{y:'2023',v:70},{y:'2024',v:79},{y:'2025',v:85}],
      amenities: ['Gym','Rooftop Garden','Covered Parking','Power Backup','CCTV'],
      nearby: ['300m – Highway','1km – IT Park','600m – Mall','1.5km – School'],
    },
    {
      agentId: 'priya-homes', userId: priyaUser.id, isFeatured: true,
      title: 'Emerald Villas', location: 'Hinjewadi, Pune',
      price: '₹2.4 Cr', type: '4 BHK Villa', beds: 4, baths: 3, area: '2,800 sq ft',
      tags: ['Ready to Move','Premium'],
      highlights: ['Private Garden','Home Theatre','Servant Quarter','Premium Finishes'],
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80'],
      priceHistory: [{y:'2020',v:160},{y:'2021',v:175},{y:'2022',v:190},{y:'2023',v:210},{y:'2024',v:228},{y:'2025',v:240}],
      amenities: ['Private Pool','Landscaped Garden','Home Automation','Solar Panels','Guest Suite'],
      nearby: ['1km – IT Hub','2km – Airport Road','500m – Luxury Mall'],
    },
    {
      agentId: 'ravi-properties', userId: raviUser.id,
      title: 'Metro Suites', location: 'Kharadi, Pune',
      price: '₹68 Lakh', type: '1 BHK Studio', beds: 1, baths: 1, area: '680 sq ft',
      tags: ['Ready to Move','Investment'],
      highlights: ['High Rental Yield','Fully Furnished Option','Metro Connectivity'],
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80'],
      priceHistory: [{y:'2020',v:42},{y:'2021',v:46},{y:'2022',v:52},{y:'2023',v:58},{y:'2024',v:63},{y:'2025',v:68}],
      amenities: ['Co-working Space','Rooftop Lounge','24/7 Concierge','Gym'],
      nearby: ['200m – Metro','5min – EON IT Park','300m – Restaurants'],
    },
    {
      agentId: 'priya-homes', userId: priyaUser.id,
      title: 'Garden Grove', location: 'Aundh, Pune',
      price: '₹1.6 Cr', type: '3 BHK Penthouse', beds: 3, baths: 3, area: '2,100 sq ft',
      tags: ['Ready to Move','Luxury'],
      highlights: ['Private Terrace','Panoramic Views','Italian Tiles','Smart Lighting'],
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80'],
      priceHistory: [{y:'2020',v:105},{y:'2021',v:115},{y:'2022',v:128},{y:'2023',v:140},{y:'2024',v:152},{y:'2025',v:160}],
      amenities: ['Private Terrace','Infinity Pool','Spa','Concierge','Valet Parking'],
      nearby: ['400m – Aundh Market','1km – Symbiosis College','600m – Park'],
    },
    {
      agentId: 'ravi-properties', userId: raviUser.id,
      title: 'Skyline Towers', location: 'Viman Nagar, Pune',
      price: '₹92 Lakh', type: '2 BHK Apartment', beds: 2, baths: 2, area: '1,050 sq ft',
      tags: ['RERA Approved','Under Construction'],
      highlights: ['Airport Road','Glass Facade','Sky Lounge','EV Charging'],
      img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
      gallery: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80'],
      priceHistory: [{y:'2020',v:58},{y:'2021',v:64},{y:'2022',v:72},{y:'2023',v:80},{y:'2024',v:87},{y:'2025',v:92}],
      amenities: ['Sky Lounge','Infinity Pool','Business Center','Kids Club'],
      nearby: ['800m – Airport Road','1km – Phoenix Mall','1.5km – Koregaon Park'],
    },
  ];
  await Property.bulkCreate(props);

  await Testimonial.bulkCreate([
    { name: 'Ankit Verma', role: 'First-time Buyer', rating: 5, text: 'Found my dream home in 2 weeks. The price history feature gave me confidence to make the right decision.' },
    { name: 'Sneha Kulkarni', role: 'Investor', rating: 5, text: 'Bought 3 properties through this platform. The lead process is smooth and agents are genuinely helpful.' },
    { name: 'Deepak Nair', role: 'NRI Buyer', rating: 5, text: 'WhatsApp-based communication made the entire process seamless from Dubai. Highly recommend.' },
  ]);

  console.log('✅ Seed complete!');
  console.log('  Super Admin → admin@propfunnel.com / Admin@123');
  console.log('  Admin 1    → priya@primehomes.com / Priya@123');
  console.log('  Admin 2    → ravi@ravirealty.com  / Ravi@123');
  process.exit(0);
};

seed().catch((e) => { console.error(e); process.exit(1); });
