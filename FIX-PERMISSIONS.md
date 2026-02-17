# 🔧 Fix: Gallery Not Showing - Permissions Issue

## ❌ Problem Detected

The test shows: **❌ Gallery - Forbidden**

This means the Gallery API permissions are not enabled for public access.

---

## ✅ Solution: Enable Gallery Permissions

### Step 1: Open Strapi Admin

Go to: **http://localhost:1337/admin**

Login with your admin credentials.

---

### Step 2: Navigate to Permissions

1. Click **Settings** (⚙️ icon) in the left sidebar (at the bottom)
2. Under "USERS & PERMISSIONS PLUGIN", click **Roles**
3. Click on **Public** role

---

### Step 3: Find Gallery Section

Scroll down until you see **Gallery** in the list of permissions.

```
┌─────────────────────────────────────┐
│ PERMISSIONS                         │
├─────────────────────────────────────┤
│ ☐ Admin-message                     │
│   ☐ find                            │
├─────────────────────────────────────┤
│ ☐ FAQ                               │
│   ☐ find  ☐ findOne                 │
├─────────────────────────────────────┤
│ ☐ Gallery                           │ ← Find this!
│   ☐ find  ☐ findOne                 │
├─────────────────────────────────────┤
│ ☐ Kebele                            │
│   ☐ find  ☐ findOne                 │
└─────────────────────────────────────┘
```

---

### Step 4: Enable Gallery Permissions

Check BOTH boxes for Gallery:
- ✅ **find** (allows fetching all gallery items)
- ✅ **findOne** (allows fetching single gallery item)

```
┌─────────────────────────────────────┐
│ ☑ Gallery                           │
│   ☑ find  ☑ findOne                 │ ← Check both!
└─────────────────────────────────────┘
```

---

### Step 5: Save Changes

Click the **Save** button at the top right corner.

```
┌─────────────────────────────────────┐
│                        [Save]       │ ← Click here
└─────────────────────────────────────┘
```

You should see a success message: ✅ Saved

---

### Step 6: Test Again

Run the test script:
```cmd
node check-strapi.js
```

You should now see:
```
✅ Gallery              - X items
```

---

### Step 7: Add Gallery Content

Now that permissions are enabled:

1. Go to **Content Manager** → **Gallery**
2. Click **Create new entry**
3. Fill in:
   - **Title**: "Test Photo"
   - **Image**: Upload any photo
   - **Category**: Choose any (e.g., "Community")
4. Click **Save**
5. **IMPORTANT:** Click **Publish**

---

### Step 8: Refresh Your Website

1. Make sure frontend is running:
   ```cmd
   npm run dev
   ```

2. Open http://localhost:5173

3. Scroll to **Community Gallery** section

4. Your photo should appear!

---

## 🐛 Still Not Working?

### Check 1: Is Strapi Running?
```cmd
cd backend
npm run develop
```

### Check 2: Is Frontend Running?
```cmd
npm run dev
```

### Check 3: Did You Publish?
- In Strapi, make sure your gallery entry shows "Published" (not "Draft")

### Check 4: Browser Console
- Press F12 in your browser
- Look for any red error messages
- Share them if you see any

### Check 5: Hard Refresh
- Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- This clears the cache

---

## 📊 Expected Test Results

After fixing permissions, `node check-strapi.js` should show:

```
✅ Projects             - X items
✅ News                 - X items
✅ Sectors              - X items
✅ FAQs                 - X items
✅ Kebeles              - X items
✅ Gallery              - X items  ← Should be ✅ now!
✅ Admin Message        - 1 items
✅ Global Settings      - 1 items
```

---

## 🎯 Quick Checklist

Before photos will show, you need:

- [ ] Strapi backend running
- [ ] Gallery permissions enabled (find + findOne)
- [ ] At least one gallery entry created
- [ ] Gallery entry is **Published** (not draft)
- [ ] Frontend running
- [ ] Page refreshed

---

## 💡 Why This Happens

By default, Strapi protects all content from public access. You must explicitly enable permissions for each content type. This is a security feature!

When you create a new content type (like Gallery), you need to:
1. Enable public permissions
2. Create content
3. Publish content

Only then will it be accessible via the API and show on your website.

---

## 🎉 Once Fixed

After enabling permissions and adding photos:
- Photos load automatically from Strapi
- No code changes needed
- Just add/edit/delete in Strapi admin
- Changes appear immediately on website

---

## 📞 Need More Help?

If you're still having issues:
1. Run `node check-strapi.js` and share the output
2. Check browser console (F12) and share any errors
3. Verify you completed all steps above
4. Make sure both Strapi and frontend are running
