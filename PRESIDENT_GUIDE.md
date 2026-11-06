# IEEE TXST Website - President's Guide

How to update the website without coding. Everything is a spreadsheet (CSV) or a picture in a folder.
After any change: **commit and push** to GitHub and the site updates itself.

## What lives where

| I want to change... | Go to |
|---|---|
| Officers | `officers/present/` |
| Events | `events/present/` |
| Contact info, meeting time, links, present term name | `src/content/config.ts` |
| Homepage text | `src/content/pages/home.ts` |
| Homepage and society photo sliders | `events/present/pictures/photos/` (see "Event photos") |
| Logos | `public/images/branding/` |

## Folder layout (officers and events are the same idea)

```
officers/                                      events/
  present/                                       present/
    info/      <society>.csv                       info/      events.csv
    pictures/  <society>/jane-doe.jpg              pictures/  date-title.png (flyers)
    pictures/  group-photo.jpg  (optional)         pictures/  photos/  (slider photos, see below)
  past/2025-26/   (same inside)                  past/2025-26/   (same inside)
  unassigned/     (parked, NOT on the website)   unassigned/     (parked, NOT on the website)
```

- Societies: `student-branch`, `hkn`, `computer-society`, `robotics-automation-society`.
- The present term's name (e.g. `2026-27`) is `currentTerm` in `src/content/config.ts`.
- You can open the CSV files in Excel, Google Sheets or Numbers. Keep the header row.

## Officers

**Add or change someone**
1. Open `officers/present/info/<society>.csv` and add a row. Columns:
   `group,name,position,major,graduationYear,email,linkedin,github,image`
   - `group`: `executive` for the Executive Board, blank for everyone else
   - leave `image` blank (only fill it if the photo file is named differently from the person)
   - LinkedIn must start with `https://linkedin.com/`, GitHub with `https://github.com/`
2. Save their photo as `officers/present/pictures/<society>/firstname-lastname.jpg`.
   The name must match the CSV ("Jane Doe" -> `jane-doe.jpg`). `.jpg .jpeg .png .webp` all work.
   Use a square photo under 500 KB. No photo? A default logo is shown.
   Someone in two societies needs only one photo: if it isn't in a society's folder, the site uses their
   photo from another society's folder in the same term.

**Remove someone:** delete their row (and photo).

**What visitors see:** the Officers page opens on Student Branch, with tabs for HKN, Computer Society and
Robotics & Automation Society, plus a Term dropdown once there is a past term with data.

## Events

1. Add a row to `events/present/info/events.csv`. Columns:
   `title,description,date,time,location,category,image,registrationLink`
   - `date`: `YYYY-MM-DD`, `time`: `6:00 PM`
   - `category`: `workshop`, `meeting`, `social`, `speaker` or `tour`
   - `image`: **leave blank** (see below); `registrationLink`: optional, starts with `https://`
2. Save the flyer in `events/present/pictures/` named **`date-title.png`**, written the same way as the row:
   - row: `Google Speaker Series`, date `2026-04-21`
   - file: `2026-04-21-google-speaker-series.png`
   - lowercase, words joined with hyphens, `.png .jpg .jpeg .webp` all work

The site links the flyer to the event by that name. If an event shows the default logo, the file name
doesn't match: the build log says `no picture for "Title" (expected 2026-04-21-title.png)`, and it also
lists any flyer that no event uses. Only fill the `image` column for an exception, such as a file with a
different name or one picture shared by two events.

Upcoming vs past is automatic from the date, and past events are grouped by term on the website.

## Every year: new batch of officers and events

1. Create `officers/past/<year>/` and `events/past/<year>/`, where `<year>` is the year of `currentTerm` in `src/content/config.ts`
   (for example `2026-27`).
2. Move everything inside `officers/present/` into `officers/past/<year>/`, and the same for events.
   (`info/`, `pictures/` and `group-photo.jpg` all move together.)
3. Recreate `present/info` and `present/pictures` (copy a CSV from the old term for its header row),
   then add the new officers, events and pictures.
4. In `src/content/config.ts`, change `currentTerm` to the new year, for example `"2027-28"`.
5. Commit and push. Old terms show in the Term dropdowns. To remove an old term from the website,
   delete its folder. A past term with no data stays hidden.

`unassigned/` is a parking spot for anything you haven't sorted yet. The website ignores it.

## Site info (code files, but only text changes)

Keep the quotes `"` and commas `,` exactly as they are.
- **`src/content/config.ts`**: organization name and tagline, contact details for the main branch
  (`mainIEEEContact`) and each society (`RASContact`, `HKNContact`, `computerSocContact`),
  meeting schedule (`meetings`), navigation and the join link (`cta`).
- **`src/content/pages/home.ts`**: homepage text.

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update-social-media-links
**Changing a social link (Discord, LinkedIn, GroupMe, Instagram, Bobcat Org Hub):** edit it in
`src/content/config.ts` in that society's block: `mainIEEEContact` (IEEE Student Branch), `RASContact`,
`HKNContact` or `computerSocContact`. The buttons and the "Scan to Connect" QR codes update by themselves:
the homepage shows the Student Branch's codes, and each society page shows its own. A QR code appears only
for links that are filled in. To hide one, delete its line (or put `//` in front of it).

For print-ready QR files (posters, flyers, slides), run `npm run qr`. The files appear in
`public/images/qr/` named `<society>-<channel>`, for example `student-branch-discord.png`,
`student-branch-org-hub.svg`, `ras-instagram.png` (`.svg` is sharp at any size, `.png` is 1024 px).
Check Discord invites are set to **never expire**, or the code stops working.

<<<<<<< HEAD
=======
>>>>>>> origin/main
=======
>>>>>>> update-social-media-links
## Event photos (sliders)

The homepage slider and the Robotics and HKN carousels fill themselves from photos in the events folder.
No code to edit. Drop photos into the term they were taken in:

```
events/present/pictures/
  2026-04-21-google-speaker-series.png   <- flyers, named date-title
  photos/                            <- general photos: homepage slider
  photos/ras/                        <- Robotics & Automation Society page
  photos/hkn/                        <- HKN page
  photos/computer-society/           <- Computer Society page
```

Newest term shows first, and when you archive a term its photos move with it. Photos are described
on the site by their file name, so name them clearly (`ras-sumobot-competition-photo.png`). A photo named `date-title` like a flyer
also works as that event's picture (the Dell and Tesla tour photos do both jobs).
The homepage slider shows the 12 newest general photos. Photos you haven't sorted yet can wait in
`events/unassigned/photos/`.

## Other pictures

- Officer and event pictures go in the `officers/` and `events/` folders above, not in `public/images/`.
- `public/images/branding/` is for logos and `public/images/site/` for the homepage hero photo
  (the file is set in `src/content/pages/home.ts`).
- Compress big images first (tinypng.com or squoosh.app). Aim for under 500 KB.

## Troubleshooting

- **A person shows the default logo:** the photo name must match the CSV name exactly (`jane-doe.jpg`).
  The build log also prints `no photo for "Name" (expected name.jpg)`.
- **A row is missing:** check that the date is `YYYY-MM-DD`, the category is one of the five above,
  and links start with `https://`. Invalid rows are skipped, and the build log says why.
- **Change not showing:** make sure you saved, committed and pushed, then wait a minute for the deploy
  and hard-refresh (Ctrl+Shift+R / Cmd+Shift+R).
- **Website shows an error after editing a code file:** you probably deleted a quote or comma. Undo
  (Ctrl+Z / Cmd+Z), or ask the web team lead.

## Quick checklists

- **New officer:** photo in `officers/present/pictures/<society>/` -> row in `officers/present/info/<society>.csv` -> push
- **New event:** row in `events/present/info/events.csv` -> flyer in `events/present/pictures/` named `date-title.png` -> push
- **New year:** archive both `present/` folders into `past/<year>/` -> update `currentTerm` in `src/content/config.ts` -> add the new batch -> push

Maintained by the IEEE TXST web team.
