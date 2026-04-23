# 🏠 PropFunnel – End-to-End Workflow & Feature Guide

PropFunnel is now a robust, full-stack real estate platform. It is designed as a **SaaS (Software as a Service)** product where you (the Super Admin) provide the platform to Real Estate owners (Admins).

---

## 🎭 User Personas

### 1. Super Admin (You - Site Owner)
*   **Role**: Manages the entire platform.
*   **Goal**: Onboard new Real Estate clients and monitor overall platform health.
*   **Credentials**: `admin@propfunnel.com` / `Admin@123`

### 2. Admin (Real Estate Owner / Your Client)
*   **Role**: Manages their own properties, agents, and leads.
*   **Goal**: Convert property inquiries into sales.
*   **Credentials**: `priya@primehomes.com` / `Priya@123` (Example)

### 3. Public User (The Buyer)
*   **Role**: Browses the site.
*   **Goal**: Find a home and contact an agent.

---

## 🔄 End-to-End Workflow

### Phase 1: Onboarding (Super Admin Flow)
1.  **Login**: Go to `/login` and use Super Admin credentials.
2.  **Dashboard**: See total users, properties, and leads across the whole platform.
3.  **Client Creation**: Go to **"Manage Admins"**. Create a new account for a Real Estate owner (e.g., "Skyline Developers").
4.  **Platform Control**: You can deactivate a client's account if they stop paying for the service.

### Phase 2: Listing & Management (Admin Flow)
1.  **Login**: The Real Estate owner logs in with the account you created.
2.  **Setup Agents**: They add their sales team as "Agents" (Name, Experience, WhatsApp number).
3.  **Add Properties**: They upload property details (Title, Price, BHK, Area, Images, Price History, Amenities).
4.  **Monitor Stats**: They see how many leads are coming specifically for *their* properties.

### Phase 3: Discovery & Lead Capture (Public Flow)
1.  **Landing**: A buyer visits the homepage. They see featured properties and testimonials.
2.  **Search**: They go to **"Properties"** to filter by BHK (e.g., 3 BHK) or search for "Baner".
3.  **Engagement**:
    *   **Unlock Details**: To see the exact address or builder contact, they must fill the **Lead Form**.
    *   **WhatsApp Redirect**: Once they submit, they are automatically redirected to the Agent's WhatsApp with a pre-filled message.
    *   **Site Visit**: They can book a specific date and time slot for a physical tour.

### Phase 4: Conversion (Admin/Sales Flow)
1.  **Lead Management**: The Admin goes to their **"Leads"** tab.
2.  **CRM Status**: They see the new lead (Name, Phone, Budget).
3.  **Follow-up**: They change the status from `New` → `Contacted` → `Converted`.
4.  **Tracking**: The Admin tracks which properties are generating the most interest.

---

## 🛠 Features List

| Feature | Description |
| :--- | :--- |
| **Role-Based Access** | Different dashboards for Super Admin and Admins. |
| **Gated Content** | Key property info is hidden until a lead form is filled (Lead Magnet). |
| **Price History Charts** | Interactive charts showing property appreciation (built with Recharts). |
| **WhatsApp Integration** | Direct 1-click connection to agents. |
| **Site Visit Booking** | Users can pick date/time slots, preventing manual scheduling hassle. |
| **SEO Optimized** | Built with semantic HTML and optimized meta tags for Google. |
| **Responsive Design** | Premium glassmorphism UI that works perfectly on mobile. |

---

## 🌐 Professional Hosting (Free & Professional)

For a professional demo that "doesn't break the flow," I recommend:

1.  **Frontend**: [Vercel](https://vercel.com/) (Free)
    *   Fastest deployment, professional `.vercel.app` URL (or your custom domain).
2.  **Backend API**: [Vercel Serverless Functions](https://vercel.com/docs/functions) (Free)
    *   Included in your project. No "sleep" time like other free services.
3.  **Database**: [TiDB Cloud](https://www.pingcap.com/tidb-cloud/) (Free Tier)
    *   **Why**: It is a professional-grade MySQL-compatible database. It has a "Serverless" tier that is **free forever** (up to 5GB), and unlike other free DBs, it **never goes to sleep**. Your site will always be fast.

---

## 🚀 How to start right now on your PC

1.  **Database**: Ensure you have MySQL running.
2.  **Environment**: Update `server/.env` with your MySQL credentials.
3.  **Seed Data**:
    ```bash
    cd server
    npm run seed
    ```
4.  **Run Server**:
    ```bash
    npm run dev
    ```
5.  **Run Client**:
    ```bash
    cd ../client
    npm run dev
    ```
