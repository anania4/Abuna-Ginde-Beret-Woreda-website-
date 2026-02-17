# 📸 Gallery Quick Start - 5 Minutes!

## What You're Getting

A beautiful, dynamic photo gallery that:
- ✅ Loads photos from Strapi CMS
- ✅ Shows hover effects with titles and descriptions
- ✅ Organizes photos by category
- ✅ Responsive grid layout (3 columns desktop, 2 mobile)
- ✅ 3D tilt animation on hover

---

## 🚀 5-Minute Setup

### 1. Restart Strapi (1 min)
```bash
cd backend
npm run develop
```
Wait for it to fully start.

### 2. Enable Permissions (1 min)
1. Go to http://localhost:1337/admin
2. Settings → Roles → Public
3. Find **Gallery** → Check `find` and `findOne`
4. Click **Save**

### 3. Add Your First Photo (2 min)
1. Content Manager → Gallery → Create new entry
2. Fill in:
   - **Title**: "Beke Kelate Market"
   - **Category**: Market
   - **Image**: Upload a photo
   - **Order**: 0
3. Click **Save** then **Publish**

### 4. View on Website (1 min)
```bash
npm run dev
```
Open http://localhost:5173 and scroll to Community Gallery!

---

## 📝 Adding More Photos

Just repeat step 3 for each photo:
1. Content Manager → Gallery → Create new entry
2. Upload photo, add title, choose category
3. Save and Publish

That's it! Photos appear automatically on your website.

---

## 🎨 Categories Available

- Farming
- Market
- Beekeeping
- School
- Landscape
- Culture
- Infrastructure
- Community
- Other

---

## 💡 Pro Tips

1. **Order photos**: Use 0, 10, 20, 30... for easy reordering
2. **Good titles**: Keep them short and descriptive
3. **Photo size**: 800x800px or larger works best
4. **File size**: Keep under 2MB for fast loading

---

## 🐛 Not Working?

Run this to check:
```bash
node check-strapi.js
```

Should show: ✅ Gallery - X items

If not, check:
- [ ] Strapi is running
- [ ] Gallery permissions enabled
- [ ] Photos are Published (not draft)
- [ ] Frontend is running

---

## 📖 Need More Details?

See **GALLERY-SETUP-GUIDE.md** for the complete guide with:
- Detailed instructions
- Best practices
- Troubleshooting
- Examples

---

## 🎉 That's It!

You now have a fully functional, CMS-powered photo gallery!

Add photos in Strapi → They appear on your website automatically! 🚀
