# 📸 How to Add a Photo to the Gallery

## Step-by-Step Visual Guide

### Step 1: Open Strapi Admin
```
http://localhost:1337/admin
```
Login with your admin credentials.

---

### Step 2: Go to Content Manager
Look at the left sidebar:
```
┌─────────────────────┐
│ 📊 Content Manager  │ ← Click here
├─────────────────────┤
│ 📁 Content-Type     │
│   Builder           │
├─────────────────────┤
│ 📤 Media Library    │
├─────────────────────┤
│ ⚙️  Settings         │
└─────────────────────┘
```

---

### Step 3: Select Gallery
Under "COLLECTION TYPES", click **Gallery**:
```
COLLECTION TYPES
├─ Admin-message
├─ FAQ
├─ Gallery          ← Click here
├─ Kebele
├─ News
├─ Project
└─ Sector
```

---

### Step 4: Create New Entry
Click the blue **"Create new entry"** button (top right).

---

### Step 5: Fill in the Form

```
┌─────────────────────────────────────┐
│ Title *                             │
│ ┌─────────────────────────────────┐ │
│ │ Farmers at Beke Kelate Market   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Description                         │
│ ┌─────────────────────────────────┐ │
│ │ Local farmers displaying their  │ │
│ │ fresh teff harvest              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Image *                             │
│ ┌─────────────────────────────────┐ │
│ │ [+] Add new assets              │ │ ← Click to upload
│ └─────────────────────────────────┘ │
│                                     │
│ Category                            │
│ ┌─────────────────────────────────┐ │
│ │ Market                      ▼   │ │ ← Select from dropdown
│ └─────────────────────────────────┘ │
│                                     │
│ Order                               │
│ ┌─────────────────────────────────┐ │
│ │ 0                               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Field Details:

**Title** (required)
- Short, descriptive name
- Example: "Coffee Harvest 2025"
- Shows on hover overlay

**Description** (optional)
- Longer explanation
- Example: "Annual coffee harvest in Ginde Beret kebele"
- Shows on hover overlay

**Image** (required)
- Click "Add new assets"
- Upload from computer
- Formats: JPG, PNG, WebP
- Recommended: 800x800px or larger

**Category** (dropdown)
- Farming
- Market
- Beekeeping
- School
- Landscape
- Culture
- Infrastructure
- Community
- Other

**Order** (number)
- Controls display order
- Lower numbers appear first
- Use: 0, 10, 20, 30... (leaves room for reordering)

---

### Step 6: Upload Image

When you click "Add new assets":

```
┌─────────────────────────────────────┐
│  Upload files                       │
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │   Drag & drop files here      │ │
│  │   or click to browse          │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  [Browse files]                     │
└─────────────────────────────────────┘
```

1. Click "Browse files" or drag & drop
2. Select your photo
3. Wait for upload to complete
4. Click "Finish"

---

### Step 7: Save

Click the **"Save"** button (top right).

```
┌─────────────────────────────────────┐
│  [Save]  [Publish]                  │ ← Click Save first
└─────────────────────────────────────┘
```

---

### Step 8: Publish ⚠️ IMPORTANT!

After saving, click the **"Publish"** button.

```
┌─────────────────────────────────────┐
│  [Save]  [Publish]                  │ ← Then click Publish
└─────────────────────────────────────┘
```

**Why?** Draft content is NOT accessible via the API. You MUST publish!

---

### Step 9: Verify

You should see a success message:
```
✅ Published
```

The entry status changes from "Draft" to "Published".

---

### Step 10: View on Website

1. Go to your website: http://localhost:5173
2. Scroll down to "Community Gallery" section
3. Your photo should appear!

```
┌─────────────────────────────────────┐
│     Community Gallery               │
│     የማህበረሰብ ምስሎች                    │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │     │ │     │ │     │           │
│  │ NEW │ │     │ │     │           │ ← Your photo!
│  │     │ │     │ │     │           │
│  └─────┘ └─────┘ └─────┘           │
└─────────────────────────────────────┘
```

---

## 🎯 Quick Reference

### Minimum Required:
- ✅ Title
- ✅ Image
- ✅ Click Publish

### Optional but Recommended:
- Description (shows on hover)
- Category (for organization)
- Order (for sorting)

---

## 🔄 To Add More Photos

Just repeat steps 4-9 for each photo:
1. Create new entry
2. Fill in title
3. Upload image
4. Choose category
5. Save
6. **Publish** ⚠️

---

## ✏️ To Edit a Photo

1. Content Manager → Gallery
2. Click on the photo you want to edit
3. Make changes
4. Save
5. **Publish** again

---

## 🗑️ To Delete a Photo

1. Content Manager → Gallery
2. Click on the photo
3. Click trash icon (top right)
4. Confirm deletion

---

## 🐛 Troubleshooting

### Photo not showing on website?

**Check:**
1. ✅ Did you click **Publish**? (not just Save)
2. ✅ Is Strapi running?
3. ✅ Are Gallery permissions enabled?
4. ✅ Did you refresh the website?

**Test:**
```bash
node check-strapi.js
```
Should show: ✅ Gallery - X items

### Image not loading?

**Check:**
1. ✅ Did the image upload successfully?
2. ✅ Is the image field filled in the entry?
3. ✅ Check browser console (F12) for errors

---

## 📊 Example Entry

Here's a complete example:

```
Title: Traditional Coffee Ceremony
Description: Women performing the traditional Oromo coffee ceremony at the annual cultural festival
Category: Culture
Order: 10
Image: [coffee-ceremony.jpg uploaded]
Status: Published ✅
```

Result on website:
```
┌─────────────────────────┐
│                         │
│   [Beautiful Photo]     │
│                         │
│  Hover to see:          │
│  • Traditional Coffee   │
│    Ceremony             │
│  • Description text     │
│  • Culture badge        │
└─────────────────────────┘
```

---

## 🎉 You're Done!

Now you know how to:
- ✅ Add photos to the gallery
- ✅ Edit existing photos
- ✅ Delete photos
- ✅ Organize by category
- ✅ Control display order

Keep adding photos to build your community gallery! 📸
