# 🔓 Enable Gallery Permissions - Visual Guide

## The Problem

Your test shows: **❌ Gallery - Forbidden**

This means Strapi is blocking public access to the Gallery API.

---

## The Solution (5 Steps)

### Step 1: Open Strapi Admin

**URL:** http://localhost:1337/admin

You'll see the Strapi dashboard.

---

### Step 2: Go to Settings

Look at the **left sidebar** at the bottom:

```
┌─────────────────────┐
│ 📊 Content Manager  │
│ 📁 Content-Type     │
│    Builder          │
│ 📤 Media Library    │
│                     │
│ ⚙️  Settings        │ ← Click this!
└─────────────────────┘
```

Click the **⚙️ Settings** icon.

---

### Step 3: Navigate to Roles

In the Settings page, look for the section:

```
USERS & PERMISSIONS PLUGIN
├─ Advanced settings
├─ Email templates
├─ Providers
└─ Roles              ← Click this!
```

Click **Roles**.

---

### Step 4: Edit Public Role

You'll see a list of roles:

```
┌─────────────────────────────────────┐
│ Roles                               │
├─────────────────────────────────────┤
│ Authenticated                       │
│ 1 user                              │
├─────────────────────────────────────┤
│ Public                              │ ← Click this!
│ 0 users                             │
└─────────────────────────────────────┘
```

Click on **Public**.

---

### Step 5: Enable Gallery Permissions

Scroll down through the permissions list until you find **Gallery**.

You'll see something like this:

```
┌─────────────────────────────────────┐
│ FAQ                                 │
│ ☐ count                             │
│ ☐ find                              │
│ ☐ findOne                           │
├─────────────────────────────────────┤
│ Gallery                             │ ← Here it is!
│ ☐ count                             │
│ ☐ find                              │ ← Check this!
│ ☐ findOne                           │ ← Check this!
│ ☐ create                            │
│ ☐ update                            │
│ ☐ delete                            │
├─────────────────────────────────────┤
│ Global-setting                      │
│ ☐ find                              │
└─────────────────────────────────────┘
```

**Check these TWO boxes:**
- ✅ **find**
- ✅ **findOne**

**DO NOT check:**
- ☐ count (not needed)
- ☐ create (security risk)
- ☐ update (security risk)
- ☐ delete (security risk)

---

### Step 6: Save

Scroll to the top right and click **Save**:

```
┌─────────────────────────────────────┐
│ Public                   [Save]     │ ← Click Save
└─────────────────────────────────────┘
```

You should see a green success message:
```
✅ Saved
```

---

## ✅ Verify It Worked

### Test 1: Run Check Script
```cmd
node check-strapi.js
```

**Before:**
```
❌ Gallery              - Forbidden
```

**After:**
```
✅ Gallery              - 0 items
```

### Test 2: Check in Browser

Open: http://localhost:1337/api/galleries?populate=*

**Before:** You'd see an error
**After:** You should see JSON data (even if empty)

---

## 📸 Now Add Your First Photo

### 1. Go to Content Manager

```
┌─────────────────────┐
│ 📊 Content Manager  │ ← Click here
└─────────────────────┘
```

### 2. Click Gallery

```
COLLECTION TYPES
├─ FAQ
├─ Gallery          ← Click here
├─ Kebele
└─ News
```

### 3. Create New Entry

Click the blue **"Create new entry"** button.

### 4. Fill the Form

**Minimum required:**
- **Title:** "Test Photo"
- **Image:** Upload any photo (click "Add new assets")

**Optional:**
- **Description:** "This is a test"
- **Category:** Select "Community"
- **Order:** 0

### 5. Save and Publish

1. Click **Save** button
2. Click **Publish** button ⚠️ **IMPORTANT!**

---

## 🌐 View on Website

### 1. Start Frontend (if not running)
```cmd
npm run dev
```

### 2. Open Website
http://localhost:5173

### 3. Scroll to Gallery Section

Look for "Community Gallery" section.

### 4. See Your Photo!

Your photo should appear in the grid!

---

## 🎯 What You Should See

### In Strapi:
```
Gallery
└─ Test Photo (Published) ✅
```

### In Test Script:
```
✅ Gallery              - 1 items
```

### On Website:
```
┌─────────────────────────────────────┐
│     Community Gallery               │
│                                     │
│  ┌─────────┐                        │
│  │         │                        │
│  │  Test   │  ← Your photo!         │
│  │  Photo  │                        │
│  └─────────┘                        │
└─────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Still shows "Forbidden"?

1. **Did you click Save?**
   - After checking the boxes, you MUST click Save

2. **Did you check the right role?**
   - Make sure you edited **Public** role (not Authenticated)

3. **Did you check the right boxes?**
   - Must check **find** and **findOne** for Gallery

4. **Try refreshing Strapi admin**
   - Press Ctrl+R to refresh the page
   - Try again

### Gallery shows 0 items?

1. **Did you create a gallery entry?**
   - Content Manager → Gallery → Create new entry

2. **Did you PUBLISH it?**
   - After saving, you MUST click Publish
   - Draft entries don't show via API

3. **Check the entry status**
   - Should say "Published" (not "Draft")

### Photo not showing on website?

1. **Is frontend running?**
   ```cmd
   npm run dev
   ```

2. **Did you refresh the page?**
   - Press Ctrl+Shift+R (hard refresh)

3. **Check browser console**
   - Press F12
   - Look for errors in Console tab

---

## ✅ Success Checklist

You'll know it's working when:

- [ ] `node check-strapi.js` shows ✅ Gallery
- [ ] You can access http://localhost:1337/api/galleries
- [ ] You created at least one gallery entry
- [ ] Entry status is "Published"
- [ ] Photo appears on website at http://localhost:5173

---

## 🎉 You're Done!

Once permissions are enabled:
- ✅ Gallery API is accessible
- ✅ Frontend can fetch photos
- ✅ Photos appear automatically
- ✅ You can add unlimited photos

Just remember: **Always click Publish** after creating/editing gallery entries!

---

## 📞 Still Need Help?

If you're still stuck:
1. Share the output of `node check-strapi.js`
2. Share any browser console errors (F12)
3. Confirm you completed all steps above
4. Make sure Strapi is running on port 1337
