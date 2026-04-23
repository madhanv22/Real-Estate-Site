// ── DATA ─────────────────────────────────────────────────────────────────

const PROPERTIES = [
  {
    id: 1, agentId: "priya-homes",
    title: "Luminaire Residences", location: "Baner, Pune",
    price: "₹1.2 Cr", type: "3 BHK Apartment",
    beds: 3, baths: 2, area: "1,450 sq ft",
    tags: ["Ready to Move", "RERA Approved", "Gated"],
    highlights: ["Rooftop Pool", "EV Charging", "24/7 Security", "Club House"],
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
    ],
    priceHistory: [{ y: "2020", v: 72 }, { y: "2021", v: 78 }, { y: "2022", v: 88 }, { y: "2023", v: 98 }, { y: "2024", v: 112 }, { y: "2025", v: 120 }],
    amenities: ["Swimming Pool", "Gymnasium", "Jogging Track", "Kids Play Area", "Party Hall", "Cafeteria"],
    nearby: ["500m – Metro Station", "1.2km – International School", "800m – Supermarket", "2km – Hospital"]
  },
  {
    id: 2, agentId: "ravi-properties",
    title: "Serenity Heights", location: "Wakad, Pune",
    price: "₹85 Lakh", type: "2 BHK Apartment",
    beds: 2, baths: 2, area: "1,100 sq ft",
    tags: ["Under Construction", "RERA Approved"],
    highlights: ["Smart Home", "Solar Power", "Vastu Compliant", "Modular Kitchen"],
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80"
    ],
    priceHistory: [{ y: "2020", v: 52 }, { y: "2021", v: 58 }, { y: "2022", v: 63 }, { y: "2023", v: 70 }, { y: "2024", v: 79 }, { y: "2025", v: 85 }],
    amenities: ["Gym", "Rooftop Garden", "Covered Parking", "Power Backup", "CCTV"],
    nearby: ["300m – Highway", "1km – IT Park", "600m – Mall", "1.5km – School"]
  },
  {
    id: 3, agentId: "priya-homes",
    title: "Emerald Villas", location: "Hinjewadi, Pune",
    price: "₹2.4 Cr", type: "4 BHK Villa",
    beds: 4, baths: 3, area: "2,800 sq ft",
    tags: ["Ready to Move", "Premium"],
    highlights: ["Private Garden", "Home Theatre", "Servant Quarter", "Premium Finishes"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
    ],
    priceHistory: [{ y: "2020", v: 160 }, { y: "2021", v: 175 }, { y: "2022", v: 190 }, { y: "2023", v: 210 }, { y: "2024", v: 228 }, { y: "2025", v: 240 }],
    amenities: ["Private Pool", "Landscaped Garden", "Home Automation", "Solar Panels", "Guest Suite"],
    nearby: ["1km – IT Hub", "2km – Airport Road", "500m – Luxury Mall"]
  },
  {
    id: 4, agentId: "ravi-properties",
    title: "Metro Suites", location: "Kharadi, Pune",
    price: "₹68 Lakh", type: "1 BHK Studio",
    beds: 1, baths: 1, area: "680 sq ft",
    tags: ["Ready to Move", "Investment"],
    highlights: ["High Rental Yield", "Fully Furnished Option", "Metro Connectivity"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"],
    priceHistory: [{ y: "2020", v: 42 }, { y: "2021", v: 46 }, { y: "2022", v: 52 }, { y: "2023", v: 58 }, { y: "2024", v: 63 }, { y: "2025", v: 68 }],
    amenities: ["Co-working Space", "Rooftop Lounge", "24/7 Concierge", "Gym"],
    nearby: ["200m – Metro", "5min – EON IT Park", "300m – Restaurants"]
  },
  {
    id: 5, agentId: "priya-homes",
    title: "Garden Grove", location: "Aundh, Pune",
    price: "₹1.6 Cr", type: "3 BHK Penthouse",
    beds: 3, baths: 3, area: "2,100 sq ft",
    tags: ["Ready to Move", "Luxury"],
    highlights: ["Private Terrace", "Panoramic Views", "Italian Tiles", "Smart Lighting"],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80"],
    priceHistory: [{ y: "2020", v: 105 }, { y: "2021", v: 115 }, { y: "2022", v: 128 }, { y: "2023", v: 140 }, { y: "2024", v: 152 }, { y: "2025", v: 160 }],
    amenities: ["Private Terrace", "Infinity Pool", "Spa", "Concierge", "Valet Parking"],
    nearby: ["400m – Aundh Market", "1km – Symbiosis College", "600m – Park"]
  },
  {
    id: 6, agentId: "ravi-properties",
    title: "Skyline Towers", location: "Viman Nagar, Pune",
    price: "₹92 Lakh", type: "2 BHK Apartment",
    beds: 2, baths: 2, area: "1,050 sq ft",
    tags: ["RERA Approved", "Under Construction"],
    highlights: ["Airport Road", "Glass Facade", "Sky Lounge", "EV Charging"],
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80"],
    priceHistory: [{ y: "2020", v: 58 }, { y: "2021", v: 64 }, { y: "2022", v: 72 }, { y: "2023", v: 80 }, { y: "2024", v: 87 }, { y: "2025", v: 92 }],
    amenities: ["Sky Lounge", "Infinity Pool", "Business Center", "Kids Club"],
    nearby: ["800m – Airport Road", "1km – Phoenix Mall", "1.5km – Koregaon Park"]
  }
];

const AGENTS = {
  "priya-homes": {
    name: "Priya Sharma", title: "Senior Property Consultant",
    experience: "12 years", deals: "340+ deals",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
    tagline: "Premium Homes, Trusted Hands", phone: "919876543210"
  },
  "ravi-properties": {
    name: "Ravi Mehta", title: "Investment Property Specialist",
    experience: "8 years", deals: "210+ deals",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    tagline: "Smart Investments, Real Returns", phone: "918765432109"
  }
};

const TESTIMONIALS = [
  { name: "Ankit Verma", role: "First-time Buyer", rating: 5, text: "Found my dream home in 2 weeks. The price history feature gave me confidence to make the right decision." },
  { name: "Sneha Kulkarni", role: "Investor", rating: 5, text: "Bought 3 properties through this platform. The lead process is smooth and agents are genuinely helpful." },
  { name: "Deepak Nair", role: "NRI Buyer", rating: 5, text: "WhatsApp-based communication made the entire process seamless from Dubai. Highly recommend." }
];

// ── STATE ─────────────────────────────────────────────────────────────────

let currentFilter = "All";
let currentProperty = null;
let priceChart = null;
let galleryIndex = 0;

// ── NAVIGATION ────────────────────────────────────────────────────────────

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) { page.classList.add('active'); window.scrollTo(0, 0); }
  closeMobileMenu();
  if (name === 'listings') renderListings();
}

function showDetailPage(id) {
  currentProperty = PROPERTIES.find(p => p.id === id);
  if (!currentProperty) return;
  galleryIndex = 0;
  renderDetailPage();
  showPage('detail');
}

function showAgentPage(agentId) {
  renderAgentPage(agentId);
  showPage('agent');
}

// ── MOBILE MENU ───────────────────────────────────────────────────────────

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── BADGE HELPER ──────────────────────────────────────────────────────────

function tagClass(tag) {
  if (tag.includes('Ready') || tag.includes('RERA')) return 'badge-green';
  if (tag.includes('Premium') || tag.includes('Luxury')) return 'badge-amber';
  return 'badge-blue';
}

// ── PROPERTY CARD HTML ────────────────────────────────────────────────────

function propCardHTML(p) {
  const badges = p.tags.map(t => `<span class="badge ${tagClass(t)}">${t}</span>`).join('');
  const highlights = p.highlights.slice(0, 3).map(h => `<span class="prop-highlight">${h}</span>`).join('');
  return `
    <div class="prop-card" onclick="showDetailPage(${p.id})">
      <div class="prop-img-wrap">
        <img src="${p.img}" alt="${p.title}" loading="lazy"/>
        <div class="prop-badges">${badges}</div>
        <div class="prop-actions">
          <button class="prop-action-btn" onclick="event.stopPropagation()" title="Save">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button class="prop-action-btn" onclick="event.stopPropagation()" title="Share">
            <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
        <div class="prop-trend"><span class="badge badge-amber">📊 Price Trend ↑</span></div>
      </div>
      <div class="prop-body">
        <div class="prop-title">${p.title}</div>
        <div class="prop-location">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.location}
        </div>
        <div class="prop-price">${p.price}</div>
        <div class="prop-specs">
          <span class="prop-spec"><svg viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 010 4H2"/><path d="M2 12h18a2 2 0 010 4H2"/></svg>${p.beds} Beds</span>
          <span class="prop-spec"><svg viewBox="0 0 24 24"><path d="M9 6 C9 3.8 10.8 2 13 2 C15.2 2 17 3.8 17 6 L17 12 L2 12 L2 14 C2 17.3 4.7 20 8 20 L16 20 C19.3 20 22 17.3 22 14 L22 12"/></svg>${p.baths} Baths</span>
          <span class="prop-spec"><svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>${p.area}</span>
        </div>
        <div class="prop-highlights">${highlights}</div>
        <div class="prop-btns">
          <button class="prop-btn-main" onclick="event.stopPropagation();showDetailPage(${p.id})">View Details</button>
          <button class="prop-btn-sec" onclick="event.stopPropagation();showDetailPage(${p.id})">Availability</button>
        </div>
      </div>
    </div>`;
}

// ── HOME PAGE RENDER ──────────────────────────────────────────────────────

function renderHome() {
  // Featured grid
  const fg = document.getElementById('featuredGrid');
  if (fg) fg.innerHTML = PROPERTIES.slice(0, 3).map(propCardHTML).join('');

  // Testimonials
  const tg = document.getElementById('testiGrid');
  if (tg) tg.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card">
      <div class="testi-stars">${'★'.repeat(t.rating)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">${t.name}</div>
      <div class="testi-role">${t.role}</div>
    </div>`).join('');
}

// ── LISTINGS RENDER ───────────────────────────────────────────────────────

const FILTERS = ["All", "1 BHK", "2 BHK", "3 BHK", "Villa"];

function renderListings() {
  // Rebuild filter pills
  const pills = document.getElementById('filterPills');
  if (pills) pills.innerHTML = FILTERS.map(f => `
    <button class="filter-pill ${currentFilter === f ? 'active' : ''}" onclick="setFilter('${f}')">${f}</button>`).join('');

  const search = (document.getElementById('searchInput') || {}).value || '';
  const filtered = PROPERTIES.filter(p =>
    (currentFilter === 'All' || p.type.includes(currentFilter)) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  );

  const grid = document.getElementById('listingsGrid');
  const empty = document.getElementById('listingsEmpty');
  const count = document.getElementById('listingsCount');

  if (count) count.textContent = `${filtered.length} verified propert${filtered.length === 1 ? 'y' : 'ies'} in Pune`;
  if (grid) grid.innerHTML = filtered.map(propCardHTML).join('');
  if (empty) empty.style.display = filtered.length ? 'none' : 'block';
  if (grid) grid.style.display = filtered.length ? 'grid' : 'none';
}

function setFilter(f) {
  currentFilter = f;
  renderListings();
}

function filterListings() {
  renderListings();
}

// ── DETAIL PAGE RENDER ────────────────────────────────────────────────────

function renderDetailPage() {
  const p = currentProperty;
  if (!p) return;
  const agent = AGENTS[p.agentId];

  const thumbsHTML = p.gallery.length > 1
    ? `<div class="gallery-thumbs">${p.gallery.map((g, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" id="thumb-${i}" onclick="setGalleryImg(${i})">
          <img src="${g}" alt="" loading="lazy"/>
        </div>`).join('')}</div>`
    : '';

  const badgesHTML = p.tags.map(t => `<span class="badge ${tagClass(t)}">${t}</span>`).join('');
  const amenitiesHTML = p.amenities.map(a => `
    <div class="amenity-item">
      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${a}
    </div>`).join('');
  const nearbyHTML = p.nearby.map(n => `
    <div class="nearby-item">
      <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${n}
    </div>`).join('');

  const appreciation = Math.round(
    ((p.priceHistory.at(-1).v - p.priceHistory[0].v) / p.priceHistory[0].v) * 100
  );

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-left">

      <!-- Gallery -->
      <div>
        <div class="gallery-main">
          <img id="mainGalleryImg" src="${p.gallery[0]}" alt="${p.title}"/>
          <div class="gallery-badges">${badgesHTML}</div>
        </div>
        ${thumbsHTML}
      </div>

      <!-- Title block -->
      <div>
        <h1 class="detail-title serif">${p.title}</h1>
        <div class="detail-location">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.location}
        </div>
        <div class="detail-price-row">
          <span class="detail-price">${p.price}</span>
          <span class="detail-type">${p.type} · ${p.area}</span>
        </div>
        <div class="detail-specs">
          <span class="detail-spec">
            <svg viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 010 4H2"/></svg>
            ${p.beds} Bedrooms
          </span>
          <span class="detail-spec">
            <svg viewBox="0 0 24 24"><path d="M9 6 C9 3.8 10.8 2 13 2 C15.2 2 17 3.8 17 6 L17 12 L2 12 L2 14 C2 17.3 4.7 20 8 20 L16 20 C19.3 20 22 17.3 22 14 L22 12"/></svg>
            ${p.baths} Bathrooms
          </span>
          <span class="detail-spec">
            <svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            ${p.area}
          </span>
        </div>
      </div>

      <!-- Price History Chart -->
      <div class="info-card">
        <div class="info-card-title green">
          <svg viewBox="0 0 24 24" style="color:#10b981"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          Price History (₹ in Lakhs)
        </div>
        <div class="chart-wrap"><canvas id="priceChart"></canvas></div>
        <p class="chart-appreciation">↑ ${appreciation}% appreciation over 5 years</p>
      </div>

      <!-- Amenities -->
      <div class="info-card">
        <div class="info-card-title">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          Amenities
        </div>
        <div class="amenities-grid">${amenitiesHTML}</div>
      </div>

      <!-- Nearby -->
      <div class="info-card">
        <div class="info-card-title">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Location Advantages
        </div>
        <div class="nearby-list">${nearbyHTML}</div>
      </div>

      <!-- Gated block -->
      <div class="gated-card" id="gatedCard">
        <div class="gated-content">
          <div class="info-card-title" style="margin-bottom:14px">
            <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Full Specifications & Contact
          </div>
          <p>📍 Exact Address: Plot 47, Luminaire Complex, Baner-Pashan Link Road, Pune 411045</p>
          <p>📞 Builder: Horizon Realty Pvt. Ltd. — +91 98000 12345</p>
          <p>🏗 Possession: December 2025 | Floors: G+18 | Units: 240</p>
          <p>📄 RERA No: P52100012345</p>
        </div>
        <div class="gated-overlay" id="gatedOverlay">
          <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <p>Unlock exact address, builder contact & full specs</p>
          <button onclick="openLeadModal()">Unlock Full Details</button>
        </div>
      </div>
    </div>

    <!-- Sticky Sidebar -->
    <div class="detail-sidebar">
      <div class="sidebar-card">
        <div class="agent-row">
          <img class="agent-avatar" src="${agent.avatar}" alt="${agent.name}"/>
          <div>
            <div class="agent-name">${agent.name}</div>
            <div class="agent-role">${agent.title}</div>
            <div class="agent-badges">
              <span class="badge badge-blue">${agent.experience}</span>
              <span class="badge badge-green">${agent.deals}</span>
            </div>
          </div>
        </div>
        <div class="sidebar-btns">
          <button class="sidebar-btn green" onclick="openLeadModal()">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            Get Full Details
          </button>
          <button class="sidebar-btn blue" onclick="openVisitModal()">
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Book Site Visit
          </button>
          <button class="sidebar-btn outline" onclick="openLeadModal()">
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Unlock Price Insights
          </button>
        </div>
        <div class="trust-items">
          <div class="trust-item">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            RERA Verified Property
          </div>
          <div class="trust-item">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Agent responds in &lt;15 min
          </div>
          <div class="trust-item">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            No hidden brokerage fees
          </div>
        </div>
      </div>
    </div>`;

  // Render Chart.js chart after DOM update
  setTimeout(() => {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    if (priceChart) { priceChart.destroy(); priceChart = null; }
    priceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: p.priceHistory.map(d => d.y),
        datasets: [{
          label: '₹ Lakhs',
          data: p.priceHistory.map(d => d.v),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.1)',
          borderWidth: 2.5,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => `₹${ctx.parsed.y} L` },
            backgroundColor: '#0f172a', titleColor: '#fff', bodyColor: '#94a3b8',
            padding: 10, cornerRadius: 8, displayColors: false
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 12 } } },
          y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 11 }, callback: v => '₹' + v + 'L' } }
        }
      }
    });
  }, 100);
}

function setGalleryImg(i) {
  galleryIndex = i;
  const img = document.getElementById('mainGalleryImg');
  if (img) img.src = currentProperty.gallery[i];
  document.querySelectorAll('.gallery-thumb').forEach((t, idx) => {
    t.classList.toggle('active', idx === i);
  });
}

function unlockGated() {
  const overlay = document.getElementById('gatedOverlay');
  if (overlay) overlay.style.display = 'none';
  const content = document.querySelector('.gated-content');
  if (content) {
    content.style.filter = 'none';
    content.style.userSelect = 'auto';
    content.style.pointerEvents = 'auto';
  }
}

// ── AGENT PAGE RENDER ─────────────────────────────────────────────────────

function renderAgentPage(agentId) {
  const agent = AGENTS[agentId];
  if (!agent) return;
  const listings = PROPERTIES.filter(p => p.agentId === agentId);

  document.getElementById('agentContent').innerHTML = `
    <div class="agent-header">
      <div class="agent-info-row">
        <img class="agent-big-avatar" src="${agent.avatar}" alt="${agent.name}"/>
        <div class="agent-header-meta">
          <div class="agent-header-label">Verified Agent</div>
          <h1 class="agent-header-name serif">${agent.name}</h1>
          <div class="agent-header-role">${agent.title}</div>
          <div class="agent-header-tagline">"${agent.tagline}"</div>
          <div class="agent-header-badges">
            <span class="badge badge-blue">${agent.experience}</span>
            <span class="badge badge-green">${agent.deals}</span>
          </div>
        </div>
      </div>
      <div>
        <a href="https://wa.me/${agent.phone}?text=Hi%20${encodeURIComponent(agent.name)}%2C%20I'm%20interested%20in%20one%20of%20your%20properties."
           target="_blank" class="btn btn-whatsapp btn-md" style="display:inline-flex">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Chat with ${agent.name.split(' ')[0]}
        </a>
      </div>
    </div>
    <h2 class="serif" style="font-size:1.4rem;font-weight:900;color:#0f172a;margin-bottom:24px">
      ${agent.name.split(' ')[0]}'s Properties (${listings.length})
    </h2>
    <div class="prop-grid">${listings.map(propCardHTML).join('')}</div>`;
}

// ── LEAD MODAL ────────────────────────────────────────────────────────────

function openLeadModal() {
  const p = currentProperty;
  document.getElementById('modalBox').innerHTML = `
    <div class="modal-head modal-head-dark">
      <button class="modal-close" onclick="closeModalDirect()">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-head-icon">
        <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:none;stroke:#fbbf24;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      </div>
      <div class="modal-head-label">Unlock Full Details</div>
      <div class="modal-head-title">${p ? p.title : 'Property Details'}</div>
      <div class="modal-head-sub">Quick form → get exact address, builder contact & full specs</div>
    </div>
    <div class="modal-body" id="leadBody">
      <div class="form-grid">
        <div class="form-field">
          <label>Budget Range</label>
          <select id="lb_budget">
            <option value="">Select…</option>
            <option>Under ₹50L</option>
            <option>₹50L – ₹1Cr</option>
            <option>₹1Cr – ₹2Cr</option>
            <option>₹2Cr+</option>
          </select>
        </div>
        <div class="form-field">
          <label>Property Type</label>
          <select id="lb_type">
            <option value="">Select…</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>Villa</option>
          </select>
        </div>
        <div class="form-field">
          <label>Purchase Timeline</label>
          <select id="lb_timeline">
            <option value="">Select…</option>
            <option>Immediately</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div class="form-field">
          <label>Loan Required?</label>
          <select id="lb_loan">
            <option value="">Select…</option>
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </select>
        </div>
        <div class="form-field form-full">
          <label>WhatsApp Number *</label>
          <input type="tel" id="lb_phone" placeholder="+91 98765 43210"/>
        </div>
      </div>
      <button class="modal-submit" onclick="submitLead()">
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        Get Details on WhatsApp
      </button>
      <p class="modal-note">No spam. Agent will reach you within 15 minutes.</p>
    </div>`;
  document.getElementById('modalBackdrop').style.display = 'flex';
}

function submitLead() {
  const phone = document.getElementById('lb_phone').value;
  if (!phone) { document.getElementById('lb_phone').focus(); return; }
  const budget = document.getElementById('lb_budget').value;
  const p = currentProperty;
  const msg = p
    ? `Hi, I'm interested in ${p.title} at ${p.location}. Budget: ${budget || 'Not specified'}. Please share full details.`
    : `Hi, I'm interested in a property. Budget: ${budget || 'Not specified'}. Please share details.`;

  document.getElementById('leadBody').innerHTML = `
    <div class="modal-success">
      <div class="success-icon green">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3>You're all set! 🎉</h3>
      <p>Connecting you to the agent on WhatsApp now…</p>
      <a href="https://wa.me/919876543210?text=${encodeURIComponent(msg)}" target="_blank"
         class="btn btn-whatsapp btn-lg" style="display:inline-flex">
        <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        Open WhatsApp
      </a>
    </div>`;
  unlockGated();
}

// ── VISIT MODAL ───────────────────────────────────────────────────────────

let selectedSlot = '';
const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

function openVisitModal() {
  selectedSlot = '';
  const p = currentProperty;
  document.getElementById('modalBox').innerHTML = `
    <div class="modal-head modal-head-blue">
      <button class="modal-close" onclick="closeModalDirect()">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-head-icon">
        <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <div class="modal-head-label">Site Visit Booking</div>
      <div class="modal-head-title">Book a Site Visit</div>
      <div class="modal-head-sub">${p ? p.title : 'Property'}</div>
    </div>
    <div class="modal-body" id="visitBody">
      <div class="form-grid">
        <div class="form-field form-full">
          <label>Select Date</label>
          <input type="date" id="vb_date" min="${new Date().toISOString().split('T')[0]}"/>
        </div>
      </div>
      <div class="form-field" style="margin-bottom:14px">
        <label style="font-size:.72rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:block">Time Slot</label>
        <div class="slots-grid">
          ${TIME_SLOTS.map(s => `<button class="slot-btn" id="slot_${s.replace(/[: ]/g, '_')}" onclick="selectSlot('${s}')">${s}</button>`).join('')}
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>Your Name</label>
          <input type="text" id="vb_name" placeholder="e.g. Rahul Sharma"/>
        </div>
        <div class="form-field">
          <label>Phone Number</label>
          <input type="tel" id="vb_phone" placeholder="+91 98765…"/>
        </div>
      </div>
      <button class="modal-submit" onclick="submitVisit()" style="background:#2563eb;box-shadow:0 4px 16px rgba(37,99,235,.25)">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Confirm Visit
      </button>
    </div>`;
  document.getElementById('modalBackdrop').style.display = 'flex';
}

function selectSlot(s) {
  selectedSlot = s;
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('slot_' + s.replace(/[: ]/g, '_'));
  if (btn) btn.classList.add('active');
}

function submitVisit() {
  const date = document.getElementById('vb_date').value;
  const name = document.getElementById('vb_name').value;
  const phone = document.getElementById('vb_phone').value;
  if (!date || !selectedSlot || !name || !phone) {
    alert('Please fill in all fields and select a time slot.');
    return;
  }
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('visitBody').innerHTML = `
    <div class="modal-success">
      <div class="success-icon blue">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3>Visit Confirmed! 🏠</h3>
      <p>${formatted}<br><strong>${selectedSlot}</strong></p>
      <p style="font-size:.8rem;color:#94a3b8;margin-top:4px">Agent will call ${name} 30 mins prior</p>
      <button onclick="closeModalDirect()" style="margin-top:16px;font-size:.875rem;font-weight:700;color:#2563eb;background:none;border:none;cursor:pointer">
        ← Back to Property
      </button>
    </div>`;
}

// ── MODAL CONTROLS ────────────────────────────────────────────────────────

function closeModal(e) {
  if (e.target === document.getElementById('modalBackdrop')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modalBackdrop').style.display = 'none';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

// ── INIT ──────────────────────────────────────────────────────────────────

renderHome();
renderListings();
