# 🚀 Frontend ↔️ Strapi CMS Connection Guide

## Quick Start

### 1️⃣ Start Strapi Backend
```bash
cd backend
npm run develop
```

### 2️⃣ Configure Permissions
Follow the detailed guide: **[STRAPI-SETUP-GUIDE.md](./STRAPI-SETUP-GUIDE.md)**

The key step: Enable **Public** permissions in Strapi admin for all content types.

### 3️⃣ Test Connection
```bash
node check-strapi.js
```

Or open **test-connection.html** in your browser.

### 4️⃣ Start Frontend
```bash
npm run dev
```

Visit http://localhost:5173 - Your content should appear!

---

## 📋 What's Connected?

| Content Type | Frontend Section | API Endpoint |
|-------------|------------------|--------------|
| **Projects** | Development Progress | `/api/projects` |
| **News** | Latest Updates | `/api/news-articles` |
| **Sectors** | Government Sectors | `/api/sectors` |
| **FAQs** | FAQ Section | `/api/faqs` |
| **Kebeles** | Administrative Divisions | `/api/kebeles` |
| **Gallery** | Community Gallery | `/api/galleries` |
| **Admin Message** | Administrator Message | `/api/admin-message` |
| **Global Settings** | Footer & Stats | `/api/global-setting` |

---

## 🔧 How It Works

1. **Frontend loads** (`src/main.js`)
2. **Calls API functions** (`src/api.js`)
3. **Fetches from Strapi** (`http://localhost:1337/api/...`)
4. **Renders content** dynamically in HTML

---

## ✅ Testing Tools

### Option 1: Command Line Check
```bash
node check-strapi.js
```
Quick terminal-based test of all endpoints.

### Option 2: Browser Test Page
Open `test-connection.html` in your browser for detailed visual testing.

---

## 🐛 Common Issues & Solutions

### ❌ "Content not showing on frontend"

**Cause:** API permissions not enabled

**Solution:**
1. Go to Strapi admin → Settings → Roles → Public
2. Enable `find` and `findOne` for all content types
3. Click Save

### ❌ "Failed to fetch" or CORS errors

**Cause:** CORS not configured or wrong ports

**Solution:**
- CORS is already configured in `backend/config/middlewares.ts`
- Make sure Strapi runs on port **1337**
- Make sure frontend runs on port **5173**

### ❌ "Content shows in test but not frontend"

**Cause:** Content not published

**Solution:**
1. In Strapi, edit your content
2. Click **Publish** button (not just Save)
3. Refresh frontend

### ❌ "Images not loading"

**Cause:** Image URLs not properly configured

**Solution:**
- Images are served from `http://localhost:1337/uploads/...`
- Make sure images are uploaded in Strapi
- Check browser console for 404 errors

---

## 📝 Workflow: Adding New Content

1. **Open Strapi Admin**
   ```
   http://localhost:1337/admin
   ```

2. **Go to Content Manager**
   - Click "Content Manager" in sidebar
   - Select content type (e.g., "News")

3. **Create New Entry**
   - Click "Create new entry"
   - Fill in all fields
   - Upload images if needed

4. **Publish**
   - Click "Save" button
   - Click "Publish" button ⚠️ **IMPORTANT!**

5. **View on Frontend**
   - Go to http://localhost:5173
   - Your content appears automatically!

---

## 🎯 What to Check If It's Not Working

Run through this checklist:

- [ ] Strapi backend is running (`cd backend && npm run develop`)
- [ ] Can access Strapi admin at http://localhost:1337/admin
- [ ] Public permissions are enabled for all content types
- [ ] Created at least one piece of content
- [ ] Content is **Published** (not draft)
- [ ] `node check-strapi.js` shows all ✅
- [ ] Frontend is running (`npm run dev`)
- [ ] Browser console (F12) shows no errors

---

## 📞 Need Help?

1. Run `node check-strapi.js` to diagnose issues
2. Open `test-connection.html` for detailed testing
3. Check browser console (F12) for error messages
4. Read `STRAPI-SETUP-GUIDE.md` for step-by-step instructions

---

## 🚀 Production Deployment

Ready to deploy? The application now serves the frontend from the backend through a single server!

### Quick Production Setup

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start backend in production mode:**
   ```bash
   cd backend
   NODE_ENV=production npm run start
   ```

3. **Access everything from one URL:**
   - Frontend: http://your-domain.com/
   - Admin: http://your-domain.com/admin
   - API: http://your-domain.com/api/*

### Full Deployment Guide

See **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** for:
- Complete production setup instructions
- Environment configuration
- Cache optimization verification
- Multiple deployment options (VPS, Docker, PaaS)
- Security checklist
- Troubleshooting guide

---

## 🎉 Success!

Once everything is working:
- Add content in Strapi admin
- Click Publish
- Content automatically appears on frontend
- No code changes needed!

That's the power of a headless CMS! 🚀
