# 📅 Community Events Setup Guide

## Overview

I've created an **Events** content type in Strapi that connects to the Community Events section on your website. Now you can easily manage and display upcoming events!

---

## 🚀 Quick Setup

### Step 1: Restart Strapi Backend

The new Events content type needs Strapi to restart.

```bash
cd backend
npm run develop
```

Wait for Strapi to fully restart.

---

### Step 2: Enable Events API Permissions

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Settings** → **Roles** → **Public**
3. Scroll down to find **Event**
4. Check these boxes:
   - ✅ `find`
   - ✅ `findOne`
5. Click **Save**

---

### Step 3: Add Your First Event

1. In Strapi admin, click **Content Manager**
2. Click **Event** (under Collection Types)
3. Click **Create new entry**

#### Fill in the fields:

- **Title** (required): Event name
  - Example: "Annual Harvest Festival"
  
- **Description** (required): Event details
  - Example: "Join us to celebrate the year's harvest with cultural performances and awards"
  
- **Event Date** (required): When the event happens
  - Click the calendar icon
  - Select the date
  
- **Location** (required): Where it takes place
  - Example: "Beke Kelate Main Square"
  
- **Category**: Choose from dropdown
  - Festival
  - Meeting
  - Training
  - Ceremony
  - Market
  - Sports
  - Education
  - Health
  - Agriculture
  - Other
  
- **Image** (optional): Event photo
  - Click "Add new assets"
  - Upload from your computer
  
- **Status**: Event status
  - **Upcoming** (default - will show on website)
  - Ongoing
  - Completed
  - Cancelled

4. Click **Save**
5. **IMPORTANT:** Click **Publish**

---

### Step 4: Test the Events

**Option A:** Run the test script
```bash
node check-strapi.js
```

**Option B:** Open `test-connection.html` in your browser

You should see: ✅ Events - X items

---

### Step 5: View on Frontend

1. Start your frontend (if not already running):
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Scroll to the **Community Events** section

4. Your event should appear!

---

## 📋 Event Features

### What You Can Do:

- ✅ Add unlimited events
- ✅ Set event dates
- ✅ Add location information
- ✅ Organize by category
- ✅ Upload event images
- ✅ Control event status (Upcoming/Ongoing/Completed/Cancelled)
- ✅ Only "Upcoming" events show on website

### Event Display:

- Shows the **next upcoming event** on the homepage
- Beautiful date display (day, month, year)
- Event category badge
- Location with map icon
- Event description
- Optional event image

---

## 🎨 Category Guide

Choose the right category for your events:

| Category | Use For |
|----------|---------|
| **Festival** | Cultural festivals, celebrations, harvest festivals |
| **Meeting** | Community meetings, town halls, assemblies |
| **Training** | Workshops, training sessions, skill development |
| **Ceremony** | Official ceremonies, inaugurations, commemorations |
| **Market** | Market days, trade fairs, exhibitions |
| **Sports** | Sports events, competitions, tournaments |
| **Education** | School events, graduations, educational programs |
| **Health** | Health campaigns, medical camps, awareness programs |
| **Agriculture** | Agricultural shows, farmer training, demonstrations |
| **Other** | Anything else |

---

## 💡 Best Practices

### Event Dates:
- Set accurate dates
- Add events well in advance
- Update status as event progresses

### Titles:
- Keep titles clear and descriptive
- Example: "Annual Coffee Festival 2026"

### Descriptions:
- Include what, when, where, why
- Mention special activities or guests
- Keep it engaging but concise

### Locations:
- Be specific (include landmark if possible)
- Example: "Beke Kelate Main Square, near the market"

### Images:
- Use relevant, high-quality photos
- Event posters work great
- Landscape orientation recommended

### Status:
- **Upcoming**: Event hasn't happened yet (shows on website)
- **Ongoing**: Event is currently happening
- **Completed**: Event has finished
- **Cancelled**: Event was cancelled

**Only "Upcoming" events appear on the website!**

---

## 🔄 Managing Events

### To Edit an Event:

1. Go to Content Manager → Event
2. Click on the event you want to edit
3. Make your changes
4. Click **Save** then **Publish**

### To Delete an Event:

1. Go to Content Manager → Event
2. Click on the event
3. Click the trash icon (top right)
4. Confirm deletion

### To Mark Event as Completed:

1. Edit the event
2. Change **Status** to "Completed"
3. Save and Publish
4. Event will no longer show on website

---

## 🎯 Example Event Entry

Here's a complete example:

```
Title: Annual Harvest Festival
Description: Join us in Beke Kelate to celebrate the year's harvest featuring local teff, coffee, and honey products. Cultural performances, traditional dances, and awards for best farmers. Free entry for all community members!
Event Date: 2026-11-15
Location: Beke Kelate Main Square
Category: Festival
Status: Upcoming
Image: [Upload festival poster or photo]
```

---

## 🐛 Troubleshooting

### Events not showing on frontend?

1. ✅ Check that Event permissions are enabled (Settings → Roles → Public)
2. ✅ Make sure events are **Published** (not draft)
3. ✅ Verify event **Status** is "Upcoming"
4. ✅ Run `node check-strapi.js` to verify API access
5. ✅ Check browser console (F12) for errors
6. ✅ Hard refresh the page (Ctrl+Shift+R)

### Wrong event showing?

- The website shows the **first upcoming event** (sorted by date)
- Make sure event dates are correct
- Older events should be marked as "Completed"

### Event date not displaying correctly?

- Make sure you selected a date (not just typed it)
- Use the calendar picker in Strapi
- Date format: YYYY-MM-DD

---

## 📊 Event Display Logic

The website shows:
- **Only "Upcoming" events**
- **Sorted by date** (earliest first)
- **First event only** (next upcoming event)

To show a different event:
- Change other events to "Completed" or "Ongoing"
- Or adjust the event dates

---

## 🎉 You're All Set!

Now you can:
1. Add events in Strapi admin
2. Set dates and locations
3. Organize by category
4. See them automatically appear on your website!

No code changes needed - just content management! 🚀

---

## 📞 Need Help?

- Run `node check-strapi.js` to diagnose issues
- Open `test-connection.html` for detailed testing
- Check browser console (F12) for error messages
- Make sure both Strapi and frontend are running
