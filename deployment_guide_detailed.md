# 🚀 PropFunnel: One Repo, Two Vercel Links Guide

You have your `client` and `server` in the same repository. Here is how to get two separate live links from Vercel.

---

## 🛰️ Project 1: The Backend API
**Goal**: Get a link like `propfunnel-api.vercel.app`

1.  Log in to **Vercel Dashboard**.
2.  Click **"Add New"** → **"Project"**.
3.  Import your GitHub Repository (`Real-Estate-Site`).
4.  **CRITICAL STEP**: On the configuration screen, look for **"Root Directory"**.
    *   Click **"Edit"** and select the `server` folder.
5.  Open **"Environment Variables"** and add:
    *   `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` (from your live MySQL DB like Clever Cloud or Aiven).
    *   `JWT_SECRET`: (Any long random string).
6.  Click **"Deploy"**.
7.  **RESULT**: You now have your Backend Link! (e.g., `https://propfunnel-api.vercel.app`). **Copy this link.**

---

## 🎨 Project 2: The Frontend Website
**Goal**: Get a link like `propfunnel.vercel.app`

1.  Go back to your **Vercel Dashboard**.
2.  Click **"Add New"** → **"Project"** again.
3.  Import the **SAME** GitHub Repository.
4.  **CRITICAL STEP**: On the configuration screen, set **"Root Directory"** to `client`.
5.  Click **"Deploy"**.
6.  **RESULT**: You now have your Frontend Link! (e.g., `https://propfunnel.vercel.app`).

---

## 🔗 Step 3: Connect Them Together
Now that you have both links, you must tell the Frontend where the Backend is.

1.  In your local code, go to `client/src/api/index.js`.
2.  Update the URL:
    ```javascript
    const API_URL = "https://propfunnel-api.vercel.app/api"; // 👈 Your NEW Vercel Backend Link
    ```
3.  Save, **Git Commit**, and **Git Push**.
4.  Vercel will automatically detect the push and update your site!

---

## 🛠️ Summary of Changes
| Part | Vercel Root Directory | Environment Variables Needed |
| :--- | :--- | :--- |
| **API** | `server` | `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET` |
| **Website** | `client` | None (handled via code in `api/index.js`) |

---

### ✅ Success!
You now have two professional, high-speed links running from the same repo. 🚀🚀🚀
