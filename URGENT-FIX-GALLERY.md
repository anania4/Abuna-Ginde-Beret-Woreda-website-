# 🚨 URGENT: Fix Gallery Permissions

## The Problem

Gallery API is **BLOCKED** by Strapi. You need to enable permissions.

---

## The Fix (Follow EXACTLY)

### Step 1: Open Strapi Admin

**Click this link:** http://localhost:1337/admin

(Or copy and paste into your browser)

---

### Step 2: Login

Enter your Strapi admin username and password.

---

### Step 3: Click Settings

Look at the **LEFT SIDEBAR** at the **BOTTOM**.

You'll see an icon that looks like a gear (⚙️).

**Click it.**

---

### Step 4: Click "Roles"

On the Settings page, look for a section called:

**"USERS & PERMISSIONS PLUGIN"**

Under it, you'll see:
- Advanced settings
- Email templates  
- Providers
- **Roles** ← **CLICK THIS**

---

### Step 5: Click "Public"

You'll see a list with two items:
- Authenticated
- **Public** ← **CLICK THIS**

---

### Step 6: Find Gallery

**Scroll down** on the page until you see **"Gallery"** in the list.

It will look like this:

```
Gallery
☐ count
☐ find
☐ findOne
☐ create
☐ update
☐ delete
```

---

### Step 7: Check TWO Boxes

**ONLY check these TWO:**

✅ **find**
✅ **findOne**

**DO NOT check the others!**

---

### Step 8: Save

Scroll to the **TOP RIGHT** of the page.

Click the **"Save"** button.

Wait for the green success message.

---

### Step 9: Test

Open your command prompt and run:

```cmd
node check-strapi.js
```

**Look for this line:**
```
✅ Gallery              - 0 items
```

If you see ✅ (not ❌), permissions are fixed!

---

## If Still Shows "Forbidden"

### Did you:

1. ✅ Click the **Public** role (not Authenticated)?
2. ✅ Check **both** find AND findOne?
3. ✅ Click the **Save** button?
4. ✅ See a success message after saving?

### Try this:

1. Close Strapi admin tab
2. Open http://localhost:1337/admin again
3. Go back to Settings → Roles → Public
4. Check if Gallery boxes are still checked
5. If not, check them again and Save

---

## After Permissions Are Fixed

### Add a Photo:

1. In Strapi admin, click **"Content Manager"** (left sidebar)
2. Click **"Gallery"**
3. Click **"Create new entry"** (blue button)
4. Type a **Title**: "My First Photo"
5. Click **"Add new assets"** under Image
6. Upload any photo from your computer
7. Click **"Save"**
8. **IMPORTANT:** Click **"Publish"**

### Check Website:

1. Make sure frontend is running: `npm run dev`
2. Open http://localhost:5173
3. Scroll down to "Community Gallery"
4. Your photo should appear!

---

## 🆘 Still Not Working?

Take a screenshot of:
1. The Strapi Public role permissions page (showing Gallery section)
2. The output of `node check-strapi.js`
3. Your browser console (press F12, click Console tab)

This will help me see exactly what's wrong.

---

## Quick Video Guide

If you're confused, here's what you're looking for:

**In Strapi Admin:**
```
Settings (⚙️)
  └─ Roles
      └─ Public
          └─ Gallery
              ✅ find
              ✅ findOne
          [Save]
```

That's it! Just check those two boxes and click Save.
