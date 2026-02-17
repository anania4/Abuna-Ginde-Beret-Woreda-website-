# 🔧 Strapi CMS Setup Guide

## Problem: Content not showing on frontend

The most common issue is that **API permissions are not enabled** for public access.

## ✅ Solution: Enable Public API Access

### Step 1: Start Strapi Backend

```bash
cd backend
npm run develop
```

Wait for Strapi to start. You should see:
```
[INFO] ⚡️ Server started on http://localhost:1337
```

### Step 2: Open Strapi Admin Panel

1. Go to: http://localhost:1337/admin
2. Login with your admin credentials (or create an admin account if first time)

### Step 3: Enable Public Permissions

1. In the left sidebar, click **Settings** (⚙️ icon at bottom)
2. Under "USERS & PERMISSIONS PLUGIN", click **Roles**
3. Click on **Public** role
4. You'll see a list of all your content types

### Step 4: Enable Permissions for Each Content Type

For **EACH** of these content types, check the boxes:
- ✅ **Project** → find, findOne
- ✅ **News** → find, findOne  
- ✅ **Sector** → find, findOne
- ✅ **FAQ** → find, findOne
- ✅ **Kebele** → find, findOne
- ✅ **Gallery** → find, findOne
- ✅ **Admin-message** → find
- ✅ **Global-setting** → find

### Step 5: Save Changes

Click the **Save** button at the top right corner.

### Step 6: Test the Connection

1. Open `test-connection.html` in your browser
2. Click "Test All Endpoints"
3. All tests should show ✅ SUCCESS

### Step 7: Add Content in Strapi

1. In Strapi admin, click **Content Manager** in the left sidebar
2. Select a content type (e.g., "News")
3. Click **Create new entry**
4. Fill in the fields
5. Click **Save**
6. **IMPORTANT:** Click **Publish** button (top right)

### Step 8: Start Frontend

```bash
npm run dev
```

Open http://localhost:5173 - Your content should now appear!

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" or CORS errors

**Solution:** The CORS is already configured in `backend/config/middlewares.ts`. Make sure:
- Strapi is running on port 1337
- Frontend is running on port 5173
- Both are using `localhost` (not `127.0.0.1`)

### Issue: Content shows in test but not on frontend

**Solution:** 
1. Check browser console (F12) for errors
2. Make sure content is **Published** (not just saved as draft)
3. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "This attribute is not available" error

**Solution:** Make sure you clicked **Publish** after saving content. Draft content is not accessible via API.

### Issue: Images not showing

**Solution:** 
1. Make sure you uploaded images in Strapi
2. Check that the image field is populated
3. Images are served from `http://localhost:1337/uploads/...`

---

## 📝 Quick Test Checklist

- [ ] Strapi backend is running (http://localhost:1337)
- [ ] Admin panel is accessible (http://localhost:1337/admin)
- [ ] Public permissions are enabled for all content types
- [ ] At least one piece of content is created and **Published**
- [ ] Test page shows ✅ SUCCESS for all endpoints
- [ ] Frontend is running (http://localhost:5173)
- [ ] Browser console shows no errors

---

## 🎯 Next Steps

Once everything is working:

1. **Add more content** in Strapi admin
2. **Publish** each piece of content
3. **Refresh** your frontend to see updates
4. Content will automatically appear on the website!

---

## 📞 Still Having Issues?

Check the browser console (F12) and look for:
- Red error messages
- Failed network requests
- CORS errors

Share the error messages for more specific help.
