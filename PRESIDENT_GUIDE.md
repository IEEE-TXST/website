# IEEE TXST Website - President's Guide

Welcome! This guide will help you manage the IEEE TXST website without needing coding knowledge.

## 📋 Table of Contents

1. [Adding/Updating Officers](#adding-officers)
2. [Adding Event Photos](#adding-event-photos)
3. [Adding New Events](#adding-new-events)
4. [Updating Contact Information](#updating-contact-info)
5. [Common Issues & Solutions](#troubleshooting)

---

## 👥 Adding/Updating Officers {#adding-officers}

### Step 1: Prepare the Officer Photo

1. **Take or get a professional photo** of the officer

   - Square format works best (crop to 1:1 ratio)
   - Good lighting, plain background preferred
   - File size: Keep under 2MB

2. **Name the file properly**

   - Format: `firstname-lastname.jpg`
   - Example: `john-doe.jpg`
   - Use lowercase, hyphens between words
   - Supported formats: `.jpg`, `.jpeg`, `.png`

3. **Upload the photo**
   - Navigate to: `/public/images/team/<committe>/`
   - Drag and drop your photo into this folder

### Step 2: Add Officer Information

1. **Open the team file**

   - Go to: `/public/ieee_team_members.csv`

2. **Add/Edit a Row**  Columns are:
      group    id    name    position    major    graduationYear    image    email    linkedin    github

   "group" controls which exported array the row lands in. Valid values:
 -      executive   -> executiveBoard
 -      officer     -> officerMembers
 -      ras         -> rasOfficers
 -      hkn         -> hknOfficers
 -      computerSoc -> computerSocOfficers

3. **Save the file** Save the CSV back to `/public/ieee_team_members.csv`

### Removing an Officer
- Remove the officer's row from `/public/ieee_team_members.csv`


## 📸 Adding Event Photos {#adding-event-photos}

### For the Photo Gallery (Coming Soon)

1. **Prepare photos**

   - Compress large images (use tinypng.com or similar)
   - Keep under 2MB each
   - Good quality, well-lit

2. **Name the files descriptively**

   - Format: `event-name-YYYY-MM-DD.jpg`
   - Example: `arduino-workshop-2026-02-15.jpg`

3. **Upload photos**

   - Go to: `/public/images/gallery/`
   - Drag and drop photos into this folder

4. **Photos will automatically appear** in the gallery (once implemented)

---

## 📅 Adding New Events {#adding-new-events}

### Step 1: Prepare Event Image

1. Create or get an event flyer/photo
2. Name it: `<EventName>-<IEEECategory>-<Type>-<SemesterYear>.<ext>`
3. Upload to: `/public/images/events/`

### Step 2: Add Event to List

1. **Open the events file**

   - Go to: `/src/content/data/events.ts`

2. **Copy the template** (found at the bottom)

3. **Paste it at the TOP** of the `events` array (right after `[`)

4. **Fill in the details**

   ```typescript
   {
     id: "event-005",
     title: "Python Workshop",
     description: "Learn Python basics and build your first project!",
     date: "2026-03-15",        // Format: YYYY-MM-DD
     time: "6:00 PM",
     location: "Engineering Building, Room 201",
     category: "workshop",      // Options: workshop, meeting, social, competition, speaker
     image: "/images/events/python-workshop-2026-03-15.jpg",
     registrationLink: "https://forms.gle/your-link",  // Optional
     isPast: false,
   },
   ```

5. **Category Options:**

   - `"workshop"` - Technical workshops (purple badge)
   - `"meeting"` - General meetings (blue badge)
   - `"social"` - Social events (green badge)
   - `"competition"` - Competitions, hackathons (red badge)
   - `"speaker"` - Guest speaker events (orange badge)

6. **Save the file**

### Marking Events as Past

When an event is over, change:

```typescript
isPast: false,    // Change this
```

to:

```typescript
isPast: true,     // To this
```

---

## ⚙️ Updating Contact Information {#updating-contact-info}

### Step 1: Open Config File

- Go to: `/src/content/config.ts`

### Step 2: Update Information

**Email Address:**

```typescript
contact: {
  email: "ieee@txst.edu",  // Change this
  ...
},
```

**Social Media Links:**

```typescript
contact: {
  instagram: "https://instagram.com/ieee_txst",
  discord: "https://discord.gg/your-invite",
  linkedin: "https://linkedin.com/company/ieee-txst",
},
```

**Meeting Information:**

```typescript
meetings: {
  schedule: "Every Thursday at 6:00 PM",
  location: "Engineering Building, Room 101",
  virtualLink: "https://zoom.us/j/your-meeting-id",
},
```

**Membership Form Link:**

```typescript
cta: {
  membershipFormUrl: "https://forms.gle/your-form-link",
},
```

### Step 3: Save the File

---

## 🔧 Common Issues & Troubleshooting {#troubleshooting}

### Issue: Photo Doesn't Show Up

**Solution:**

1. Check the file path is correct: `/images/team/firstname-lastname.jpg`
2. Make sure the file exists in `/public/images/team/`
3. Check file name matches exactly (case-sensitive!)
4. Try refreshing the page with Ctrl+Shift+R (hard refresh)

### Issue: Website Shows an Error After Editing

**Solution:**

1. Check for missing commas between items
2. Make sure all quotes are closed: `"text"` not `"text`
3. Check brackets are balanced: every `{` has a matching `}`
4. If stuck, press Ctrl+Z (undo) until it works again

### Issue: Changes Don't Appear

**Solution:**

1. Make sure you saved the file (Ctrl+S)
2. Wait 5-10 seconds for the website to rebuild
3. Refresh the page (F5 or Ctrl+R)
4. Try hard refresh (Ctrl+Shift+R)

### Issue: Image is Too Large/Slow to Load

**Solution:**

1. Compress the image using:
   - TinyPNG.com (easiest)
   - Squoosh.app (more options)
2. Aim for under 500KB for photos
3. Re-upload the compressed version

---

## 📝 Quick Checklists

### ✅ Adding a New Officer

- [ ] Take/get professional photo
- [ ] Crop to square (1:1 ratio)
- [ ] Name file: `firstname-lastname.jpg`
- [ ] Upload to `/public/images/team/`
- [ ] Open `/src/content/data/team.ts`
- [ ] Copy template
- [ ] Fill in all information
- [ ] Check comma after closing `}`
- [ ] Save file
- [ ] Refresh website to verify

### ✅ Adding a New Event

- [ ] Create/get event image
- [ ] Name: `event-name-YYYY-MM-DD.jpg`
- [ ] Upload to `/public/images/events/`
- [ ] Open `/src/content/data/events.ts`
- [ ] Copy template
- [ ] Paste at TOP of events array
- [ ] Fill in all details
- [ ] Pick correct category
- [ ] Save file
- [ ] Refresh website to verify

---

## 🆘 Need Help?

**Can't figure something out?**

1. Check this guide again carefully
2. Look for similar examples in the code
3. Try undoing your changes (Ctrl+Z)
4. Contact your web administrator
5. Check `/src/content/README.md` for more details

**Emergency Contact:**

- Web Administrator: [Add contact info here]
- GitHub Issues: [Add repo link]

---

## 💡 Pro Tips

1. **Always save your work** - Ctrl+S is your friend
2. **Make one change at a time** - Easier to fix if something breaks
3. **Keep backups** - Copy the file before making big changes
4. **Test after changes** - Always check the website after editing
5. **Compress images** - Keeps the website fast
6. **Use descriptive names** - Makes finding files easier later
7. **Ask for help early** - Don't struggle alone!

---

**Last Updated:** January 2026
**Maintained by:** IEEE TXST Web Team

Good luck! You've got this! 🚀
