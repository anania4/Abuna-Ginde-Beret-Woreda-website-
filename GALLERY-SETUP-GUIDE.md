# 📸 Community Gallery Setup Guide

## Overview

I've created a new **Gallery** content type in Strapi that connects to the Community Gallery section on your website. Now you can easily add, manage, and display photos from the Strapi admin panel!

---

## 🚀 Quick Setup

### Step 1: Restart Strapi Backend

The new Gallery content type needs Strapi to restart to be recognized.

```bash
cd backend
npm run develop
```

Wait for Strapi to fully restart. You should see the Gallery content type appear in the admin panel.

---

### Step 2: Enable Gallery API Permissions

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Settings** → **Roles** → **Public**
3. Scroll down to find **Gallery**
4. Check these boxes:
   - ✅ `find`
   - ✅ `findOne`
5. Click **Save**

---

### Step 3: Add Gallery Photos

1. In Strapi admin, click **Content Manager** in the left sidebar
2. Click **Gallery** (under Collection Types)
3. Click **Create new entry**

#### Fill in the fields:

- **Title** (required): Short description of the photo
  - Example: "Farmers at Beke Kelate Market"
  
- **Description** (optional): Longer description
  - Example: "Local farmers displaying their fresh teff harvest at the weekly market"
  
- **Image** (required): Upload your photo
  - Click "Add new assets"
  - Upload from your computer
  - Supported formats: JPG, PNG, WebP
  - Recommended size: 800x800px or larger
  
- **Category**: Choose from dropdown
  - Farming
  - Market
  - Beekeeping
  - School
  - Landscape
  - Culture
  - Infrastructure
  - Community
  - Other
  
- **Order**: Number for sorting (0 = first)
  - Use 0, 10, 20, 30... to leave room for reordering later

4. Click **Save**
5. **IMPORTANT:** Click **Publish** button (top right)

---

### Step 4: Test the Gallery

**Option A:** Run the test script
```bash
node check-strapi.js
```

**Option B:** Open `test-connection.html` in your browser

You should see: ✅ Gallery - X items

---

### Step 5: View on Frontend

1. Start your frontend (if not already running):
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Scroll down to the **Community Gallery** section

4. Your photos should appear in a beautiful grid!

---

## 📋 Gallery Features

### What You Can Do:

- ✅ Upload unlimited photos
- ✅ Add titles and descriptions
- ✅ Organize by category
- ✅ Control display order
- ✅ Hover to see photo details
- ✅ Automatic responsive grid layout

### Photo Display:

- **Desktop**: 3 columns
- **Tablet**: 3 columns
- **Mobile**: 2 columns
- **Hover effect**: Shows title, description, and category
- **3D tilt effect**: Interactive card animation

---

## 🎨 Category Guide

Choose the right category for your photos:

| Category | Use For |
|----------|---------|
| **Farming** | Agricultural activities, crops, farming equipment |
| **Market** | Market scenes, trading, vendors |
| **Beekeeping** | Honey production, beekeepers, hives |
| **School** | Education, students, classrooms, school events |
| **Landscape** | Natural scenery, mountains, rivers, views |
| **Culture** | Traditional ceremonies, dances, cultural events |
| **Infrastructure** | Roads, buildings, construction projects |
| **Community** | Community gatherings, meetings, celebrations |
| **Other** | Anything else |

---

## 💡 Best Practices

### Photo Quality:
- Use high-quality images (at least 800x800px)
- Keep file sizes reasonable (under 2MB)
- Use landscape or square photos for best results

### Titles:
- Keep titles short and descriptive
- Example: "Coffee Harvest 2025" not "This is a photo of..."

### Descriptions:
- Add context and details
- Mention location, date, or event name
- Keep it under 100 characters for best display

### Order:
- Use increments of 10 (0, 10, 20, 30...)
- This makes it easy to insert photos later
- Lower numbers appear first

---

## 🔄 Managing Gallery Photos

### To Edit a Photo:

1. Go to Content Manager → Gallery
2. Click on the photo you want to edit
3. Make your changes
4. Click **Save** then **Publish**

### To Delete a Photo:

1. Go to Content Manager → Gallery
2. Click on the photo
3. Click the trash icon (top right)
4. Confirm deletion

### To Reorder Photos:

1. Edit each photo's **Order** field
2. Lower numbers appear first
3. Save and Publish each change

### To Change Categories:

1. Edit the photo
2. Select a new category from dropdown
3. Save and Publish

---

## 🎯 Example Gallery Entry

Here's a complete example:

```
Title: Traditional Coffee Ceremony
Description: Women performing the traditional Oromo coffee ceremony at the annual cultural festival in Beke Kelate
Category: Culture
Order: 10
Image: [Upload photo of coffee ceremony]
```

---

## 🐛 Troubleshooting

### Photos not showing on frontend?

1. ✅ Check that Gallery permissions are enabled (Settings → Roles → Public)
2. ✅ Make sure photos are **Published** (not draft)
3. ✅ Run `node check-strapi.js` to verify API access
4. ✅ Check browser console (F12) for errors
5. ✅ Hard refresh the page (Ctrl+Shift+R)

### Images not loading?

1. ✅ Make sure images are uploaded in Strapi
2. ✅ Check that image field is not empty
3. ✅ Images should be accessible at `http://localhost:1337/uploads/...`
4. ✅ Check browser console for 404 errors

### Gallery shows "No gallery images available"?

1. ✅ Make sure you created at least one gallery entry
2. ✅ Make sure entries are **Published**
3. ✅ Check API permissions are enabled
4. ✅ Restart Strapi if you just created the content type

---

## 📊 Gallery Grid Layout

The gallery automatically adjusts to screen size:

```
Desktop (3 columns):
┌─────┬─────┬─────┐
│  1  │  2  │  3  │
├─────┼─────┼─────┤
│  4  │  5  │  6  │
└─────┴─────┴─────┘

Mobile (2 columns):
┌─────┬─────┐
│  1  │  2  │
├─────┼─────┤
│  3  │  4  │
└─────┴─────┘
```

---

## 🎉 You're All Set!

Now you can:
1. Add photos in Strapi admin
2. Organize them by category
3. Control the display order
4. See them automatically appear on your website!

No code changes needed - just add content and publish! 🚀

---

## 📞 Need Help?

- Run `node check-strapi.js` to diagnose issues
- Open `test-connection.html` for detailed testing
- Check browser console (F12) for error messages
- Make sure both Strapi and frontend are running
