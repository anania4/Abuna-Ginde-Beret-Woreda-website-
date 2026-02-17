# ✅ Gallery Setup Checklist

## Quick Diagnostic

Run this first:
```cmd
node check-strapi.js
```

---

## If Gallery Shows "Forbidden"

### Fix Permissions (5 minutes):

1. [ ] Open http://localhost:1337/admin
2. [ ] Click Settings (⚙️) at bottom of left sidebar
3. [ ] Click "Roles" under "USERS & PERMISSIONS PLUGIN"
4. [ ] Click "Public" role
5. [ ] Scroll to find "Gallery"
6. [ ] Check ✅ **find**
7. [ ] Check ✅ **findOne**
8. [ ] Click **Save** button (top right)
9. [ ] Run `node check-strapi.js` again
10. [ ] Should now show: ✅ Gallery - 0 items

**Detailed guide:** See `ENABLE-GALLERY-PERMISSIONS.md`

---

## Add Your First Photo

### In Strapi Admin:

1. [ ] Click "Content Manager" in left sidebar
2. [ ] Click "Gallery" under Collection Types
3. [ ] Click "Create new entry" button
4. [ ] Fill in **Title** (required): "Test Photo"
5. [ ] Click "Add new assets" for **Image** (required)
6. [ ] Upload a photo from your computer
7. [ ] Select **Category** from dropdown (optional)
8. [ ] Click **Save** button
9. [ ] Click **Publish** button ⚠️ **MUST DO THIS!**
10. [ ] Entry should show "Published" status

**Detailed guide:** See `ADD-GALLERY-PHOTO.md`

---

## View on Website

### Start Frontend:

1. [ ] Open terminal/command prompt
2. [ ] Run: `npm run dev`
3. [ ] Open http://localhost:5173
4. [ ] Scroll to "Community Gallery" section
5. [ ] Your photo should appear!

---

## If Photo Still Not Showing

### Check These:

1. [ ] Strapi is running (`cd backend && npm run develop`)
2. [ ] Frontend is running (`npm run dev`)
3. [ ] Gallery permissions enabled (find + findOne)
4. [ ] Gallery entry is **Published** (not Draft)
5. [ ] Run `node check-strapi.js` - shows ✅ Gallery - 1 items
6. [ ] Browser console (F12) shows no errors
7. [ ] Hard refresh page (Ctrl+Shift+R)

---

## Quick Test

### Test API Directly:

Open in browser: http://localhost:1337/api/galleries?populate=*

**Should see:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Test Photo",
        ...
      }
    }
  ]
}
```

**If you see error:** Permissions not enabled
**If you see empty array:** No published entries

---

## Common Mistakes

### ❌ Forgot to Publish
- Saving is NOT enough
- You MUST click Publish button
- Draft entries don't show via API

### ❌ Wrong Permissions
- Must enable for **Public** role (not Authenticated)
- Must check **find** and **findOne**
- Must click **Save** after checking boxes

### ❌ Strapi Not Restarted
- After creating Gallery content type
- Must restart Strapi: `cd backend && npm run develop`

### ❌ Frontend Not Running
- Must run: `npm run dev`
- Must be on http://localhost:5173

---

## Success Indicators

### ✅ Everything Working When:

1. `node check-strapi.js` shows:
   ```
   ✅ Gallery              - 1 items
   ```

2. Browser shows JSON at:
   ```
   http://localhost:1337/api/galleries?populate=*
   ```

3. Website shows photo in Community Gallery section

4. Hover over photo shows title and description

---

## Next Steps

Once first photo is working:

1. [ ] Add more photos (repeat "Add Your First Photo" steps)
2. [ ] Try different categories
3. [ ] Use Order field to sort photos (0, 10, 20, 30...)
4. [ ] Add descriptions for hover effect
5. [ ] Build your community gallery!

---

## 📚 Detailed Guides

- **Permissions Issue?** → `ENABLE-GALLERY-PERMISSIONS.md`
- **How to Add Photos?** → `ADD-GALLERY-PHOTO.md`
- **Quick Start?** → `GALLERY-QUICK-START.md`
- **Full Setup?** → `GALLERY-SETUP-GUIDE.md`
- **General Issues?** → `FIX-PERMISSIONS.md`

---

## 🆘 Still Stuck?

1. Run `node check-strapi.js` and share output
2. Check browser console (F12) and share errors
3. Verify all checkboxes above are ✅
4. Read `FIX-PERMISSIONS.md` for detailed troubleshooting
