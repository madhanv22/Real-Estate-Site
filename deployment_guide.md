# 🚀 PropFunnel Final Deployment Guide

Your project is now fully optimized for a unified Vercel deployment. Both your **Public Site** and **Admin Dashboard** will live on the same domain.

## 1. 📂 Project Structure
- **Frontend**: Located in `/client`
- **Backend**: Located in `/server`
- **Master Config**: `vercel.json` in the root folder.

---

## 2. 🛰️ Vercel Deployment Steps

1.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Deploy: Integrated Sales & Admin System"
    git push origin main
    ```

2.  **Import to Vercel**:
    - Go to [Vercel.com](https://vercel.com/) and click **"Add New" → "Project"**.
    - Select your GitHub repo.

3.  **Configure Build Settings**:
    - **Framework Preset**: Vite
    - **Root Directory**: Leave it as the main folder (not `/client`).
    - **Build Command**: `cd client && npm install && npm run build`
    - **Output Directory**: `client/dist`

4.  **Environment Variables**:
    - Go to **Settings → Environment Variables** in Vercel.
    - Copy these exact keys from your `server/.env`:
        - `DB_HOST`: (Your Clever Cloud Host)
        - `DB_PORT`: 3306
        - `DB_NAME`: (Your Database Name)
        - `DB_USER`: (Your Database User)
        - `DB_PASS`: (Your Database Password)
        - `JWT_SECRET`: (Your Secure Key)
        - `NODE_ENV`: `production`

---

## 🏗️ Troubleshooting & Support

- **Database Error**: If you see a "Connection Failed" error, ensure your Clever Cloud database is active.
- **Admin Login**: If your admin login fails, check that your `JWT_SECRET` in Vercel matches your local one.
- **Refresh 404**: The `vercel.json` in the root folder is already set up to fix this.

**PropFunnel is now ready to go live!** 🚀🏡✨
