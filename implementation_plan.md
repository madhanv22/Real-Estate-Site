# PropFunnel – React + Express + MySQL Migration Plan

## Project Overview

**PropFunnel** is a real estate lead-generation platform for Pune properties.
The existing site is a single-file SPA (HTML/CSS/JS) with all data hardcoded in `app.js`.

### Current Features (from the vanilla JS site)
| Feature | Details |
|---|---|
| **Home Page** | Hero section, stats (340+ listings, ₹48Cr+ deals, 4.9★ rating), benefits grid, featured properties (first 3), testimonials, CTA banner |
| **Listings Page** | Search by name/location, filter pills (All / 1BHK / 2BHK / 3BHK / Villa), property grid cards |
| **Property Detail Page** | Image gallery with thumbnails, price/specs, Chart.js price history chart, amenities grid, nearby places, gated section (locked details), sticky sidebar with agent info + CTA buttons |
| **Agent Profile Page** | Agent header card, agent's property listings |
| **Lead Modal** | Budget, type, timeline, loan fields + WhatsApp number → redirects to WhatsApp |
| **Visit Booking Modal** | Date picker, time slot selector, name/phone → confirmation |
| **WhatsApp Float Button** | Fixed bottom-right, always visible |
| **Mobile Nav** | Hamburger menu |

### Data Models (currently hardcoded)
- **Properties** (6): id, agentId, title, location, price, type, beds, baths, area, tags[], highlights[], img, gallery[], priceHistory[], amenities[], nearby[]
- **Agents** (2): id, name, title, experience, deals, avatar, tagline, phone
- **Testimonials** (3): name, role, rating, text

---

## Proposed Architecture

```
propfunnel/
├── client/         ← Vite + React + Tailwind CSS
├── server/         ← Express + Sequelize + MySQL
└── README.md
```

### Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React (Vite) | Fast HMR, easy Vercel deploy |
| Styling | Tailwind CSS v3 | Utility-first, responsive, fast |
| API State | TanStack React Query v5 | Caching, loading states, refetch |
| Routing | React Router v6 | Clean URL-based navigation |
| Charts | Recharts | React-native chart library |
| Backend | Express.js (Node) | Minimal, Vercel-friendly |
| ORM | Sequelize + MySQL2 | Easy model definition, migrations |
| DB | MySQL (PlanetScale or Railway) | Free tier, easy setup, Vercel-compatible |
| Deployment | Vercel (frontend + serverless backend) | Free, fast |

> [!IMPORTANT]
> For database hosting, we'll use **Railway** (free MySQL) or **PlanetScale** (free MySQL-compatible). Both work with Vercel and don't require a credit card for dev tiers.

---

## Proposed Changes

### Backend (Express + Sequelize + MySQL)

#### [NEW] `server/`
```
server/
├── index.js           ← Express app entry
├── config/db.js       ← Sequelize connection
├── models/
│   ├── Property.js    ← Property model
│   ├── Agent.js       ← Agent model
│   ├── Testimonial.js ← Testimonial model
│   └── Lead.js        ← Lead capture model (NEW feature)
├── routes/
│   ├── properties.js  ← GET /api/properties, GET /api/properties/:id
│   ├── agents.js      ← GET /api/agents, GET /api/agents/:id
│   ├── testimonials.js← GET /api/testimonials
│   └── leads.js       ← POST /api/leads (save lead to DB)
├── seed.js            ← Seed initial data
├── package.json
└── vercel.json        ← Vercel serverless config
```

**API Endpoints:**
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/properties` | All properties (supports `?search=` & `?type=` filters) |
| GET | `/api/properties/:id` | Single property with full details |
| GET | `/api/agents` | All agents |
| GET | `/api/agents/:id` | Single agent + their listings |
| GET | `/api/testimonials` | All testimonials |
| POST | `/api/leads` | Save a lead (name, phone, budget, propertyId) |

---

### Frontend (React + Vite + Tailwind)

#### [NEW] `client/`
```
client/
├── src/
│   ├── main.jsx
│   ├── App.jsx              ← Router setup
│   ├── api/
│   │   └── index.js         ← All axios API calls
│   ├── hooks/
│   │   ├── useProperties.js ← React Query hooks
│   │   ├── useAgents.js
│   │   └── useLeads.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ListingsPage.jsx
│   │   ├── PropertyDetailPage.jsx
│   │   └── AgentPage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyGrid.jsx
│   │   ├── HeroSection.jsx
│   │   ├── BenefitsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── PriceHistoryChart.jsx ← Recharts
│   │   ├── GallerySection.jsx
│   │   ├── AgentSidebar.jsx
│   │   ├── LeadModal.jsx
│   │   ├── VisitModal.jsx
│   │   ├── FilterPills.jsx
│   │   ├── SearchBar.jsx
│   │   └── WhatsAppFloat.jsx
│   └── index.css            ← Tailwind base + custom
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

**React Router Routes:**
| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Hero, benefits, featured, testimonials |
| `/properties` | `ListingsPage` | All properties with filters |
| `/properties/:id` | `PropertyDetailPage` | Full property detail |
| `/agents/:id` | `AgentPage` | Agent profile + listings |

**React Query Usage:**
```js
// All properties (with optional filters)
useQuery(['properties', { search, type }], fetchProperties)

// Single property
useQuery(['property', id], () => fetchProperty(id))

// Agent + their properties
useQuery(['agent', id], () => fetchAgent(id))

// Testimonials
useQuery(['testimonials'], fetchTestimonials)

// Submit lead
useMutation(submitLead, { onSuccess: () => openWhatsApp() })
```

---

## Database Schema

```sql
-- Agents table
CREATE TABLE agents (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100),
  title VARCHAR(150),
  experience VARCHAR(50),
  deals VARCHAR(50),
  avatar VARCHAR(500),
  tagline VARCHAR(255),
  phone VARCHAR(20)
);

-- Properties table
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agent_id VARCHAR(50),
  title VARCHAR(150),
  location VARCHAR(150),
  price VARCHAR(50),
  type VARCHAR(100),
  beds INT,
  baths INT,
  area VARCHAR(50),
  img VARCHAR(500),
  tags JSON,
  highlights JSON,
  gallery JSON,
  price_history JSON,
  amenities JSON,
  nearby JSON,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

-- Testimonials table
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(100),
  rating INT,
  text TEXT
);

-- Leads table (new!)
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  phone VARCHAR(20) NOT NULL,
  budget VARCHAR(50),
  property_type VARCHAR(50),
  timeline VARCHAR(50),
  loan_required VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Deployment Plan (Vercel)

```
Vercel Project
├── /client → Static React build (Vite output)
└── /server → Serverless functions via vercel.json rewrites

Environment Variables (Vercel Dashboard):
  DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
```

**`vercel.json` (root)**:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/server/index.js" }
  ]
}
```

> [!NOTE]
> The Express app will be wrapped as a Vercel serverless function using `@vercel/node`. This is the standard pattern for full-stack Vercel deployments.

---

## Open Questions

> [!IMPORTANT]
> **Database hosting**: Do you already have a MySQL server, or should I set up with Railway (free) or PlanetScale? This affects the environment variables setup.

> [!IMPORTANT]
> **Lead saving**: Currently leads just open WhatsApp. Should the React version also **save leads to the DB** before redirecting to WhatsApp? (Recommended — gives you a CRM database of interested buyers.)

> [!NOTE]
> **Admin panel**: Do you want a simple admin dashboard to view leads (name, phone, budget, which property)? This could be added later.

> [!NOTE]
> **URL structure**: The current site uses `showPage()` JS functions (no real URLs). The React version will use proper URLs like `/properties/1`, `/agents/priya-homes`. This is better for SEO and sharing.

---

## Verification Plan

### Development
1. Run `npm run dev` in both `client/` and `server/` directories
2. Test all pages: Home → Listings → Property Detail → Agent Page
3. Test Lead Modal form submission (DB save + WhatsApp redirect)
4. Test Visit Booking Modal
5. Test search and filter pills on listings page
6. Test mobile responsive layout

### Production
1. Push to GitHub → Vercel auto-deploy
2. Set environment variables in Vercel dashboard
3. Test all API endpoints via production URL
4. Verify Chart.js → Recharts price history renders correctly
