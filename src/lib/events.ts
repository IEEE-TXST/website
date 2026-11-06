import "server-only"; // reads files from disk: never send this code to the browser
import fs from "fs";
import path from "path";
import { parseCsv, rowsToRecords } from "@/lib/csv";
import { MEDIA_URL, kindRoot, listPastTermIds, presentTermLabel, termLabel, termPathOf } from "@/lib/terms";
import { EVENT_CATEGORIES, type Event, type EventTerm } from "@/content/data/events";

/**
 * EVENTS LOADER
 *
 * Reads events from the /events folder and hands typed data to the Events page.
 * It runs at BUILD time, so adding a row and a flyer and pushing to GitHub is all it takes.
 *
 *   events/<term>/info/events.csv         the event list (one row per event)
 *   events/<term>/pictures/<flyer>        flyers, named  <date>-<title>.png
 *   events/<term>/pictures/photos/...     event photos (also used for the sliders, see photos.ts)
 *
 * <term> is `present` or `past/<year>`. Pictures are copied to /public/media by scripts/sync-media.mjs.
 * Bad data never crashes the site: invalid rows are skipped or defaulted and reported in the build log.
 */

// Shown when an event has no matching picture.
const DEFAULT_IMAGE = "/images/branding/txst-bobcat-logo.png";
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

const warn = (msg: string) => console.warn(`[events] ${msg}`);

/** "Google Speaker Series!" -> "google-speaker-series": the form used in picture file names. */
const slug = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Accepts only https:// registration links; anything else is dropped with a warning. */
function httpsLink(value: string | undefined): string | undefined {
  const v = (value ?? "").trim();
  if (!v) return undefined; // optional column
  try {
    if (new URL(v).protocol === "https:") return v;
  } catch {
    // not a valid URL: handled below
  }
  warn(`Ignoring invalid registration link "${v}"`);
  return undefined;
}

/**
 * Looks for a picture called `wanted` (extension and capitals don't matter) in pictures/ and then in
 * pictures/photos/. Returns its path relative to pictures/ (e.g. "x.png" or "photos/x.jpg"), or null.
 * Looking in photos/ too lets one file serve as both an event's picture and a slider photo.
 */
function findPicture(picturesDir: string, wanted: string): string | null {
  const bare = wanted.replace(/\.(jpe?g|png|webp|avif)$/i, "").toLowerCase();
  for (const sub of ["", "photos"]) {
    try {
      for (const f of fs.readdirSync(path.join(picturesDir, sub), { withFileTypes: true })) {
        if (f.isFile() && IMAGE_FILE.test(f.name) && f.name.replace(/\.[^.]+$/, "").toLowerCase() === bare) {
          return sub ? `${sub}/${f.name}` : f.name;
        }
      }
    } catch {
      // folder missing: try the next one
    }
  }
  return null;
}

/** Loads all events of ONE term from its events.csv. */
function loadTerm(termId: string, termPath: string): Event[] {
  const infoDir = path.join(kindRoot("events"), termPath, "info");
  const picturesDir = path.join(kindRoot("events"), termPath, "pictures");
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(infoDir, "events.csv"), "utf-8");
  } catch {
    return []; // no events file for this term - that's fine
  }

  const out: Event[] = [];
  const used = new Set<string>(); // flyer files that some event uses (to spot unused ones later)
  rowsToRecords(parseCsv(raw)).forEach((r, i) => {
    const title = (r.title ?? "").trim();
    if (!title) return; // blank row

    // The date is required and must be YYYY-MM-DD; it decides upcoming vs past and the picture name.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date ?? "")) {
      warn(`${termPath}: "${title}" has invalid date "${r.date}" (use YYYY-MM-DD), skipped`);
      return;
    }
    const category = (r.category ?? "").trim().toLowerCase() as Event["category"];
    if (!EVENT_CATEGORIES.includes(category)) {
      warn(`${termPath}: "${title}" has unknown category "${r.category}", using "meeting"`);
    }

    // PICTURE LOOKUP: matched by NAME. A file called `<date>-<title>.<ext>`
    // (e.g. 2026-04-21-google-speaker-series.png) in pictures/ or pictures/photos/ is linked automatically.
    // The `image` column is only an override (for a differently named file, or a picture shared by two events).
    const wanted = path.basename(r.image ?? "").trim() || `${r.date}-${slug(title)}`;
    const found = findPicture(picturesDir, wanted);
    let image = DEFAULT_IMAGE;
    if (found) {
      image = `${MEDIA_URL}/events/${termPath}/${found}`;
      used.add(found.replace(/^photos\//, "").toLowerCase());
    } else {
      warn(`${termPath}: no picture for "${title}" (expected ${r.image ? wanted : `${wanted}.png`})`);
    }

    out.push({
      id: `${termId}-${i}-${slug(title)}`, // unique key for React lists
      title,
      description: r.description ?? "",
      date: r.date,
      time: r.time ?? "",
      location: r.location ?? "",
      category: EVENT_CATEGORIES.includes(category) ? category : "meeting",
      image,
      registrationLink: httpsLink(r.registrationlink), // CSV headers are lower-cased by rowsToRecords
      termId,
    });
  });

  // Flyers in pictures/ that no event uses are usually a typo in the file name: tell the user.
  try {
    for (const f of fs.readdirSync(picturesDir, { withFileTypes: true })) {
      if (f.isFile() && IMAGE_FILE.test(f.name) && !used.has(f.name.toLowerCase())) {
        warn(`${termPath}: flyer "${f.name}" is not used by any event (check its name: <date>-<title>.png)`);
      }
    }
  } catch {
    // no pictures folder: nothing to check
  }
  return out;
}

/** Today's date as YYYY-MM-DD in Texas time (so "past" flips at local midnight, not UTC). */
const todayCentral = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

/**
 * Everything the Events page needs:
 *  - `terms`: the term choices for the dropdown (present term always; past terms only if they have events)
 *  - `events`: every event from every term, newest first, each marked upcoming/past from its date
 */
export function getEvents(): { terms: EventTerm[]; events: Event[] } {
  const pastIds = listPastTermIds("events");
  const terms: EventTerm[] = [
    { id: "present", label: presentTermLabel() },
    ...pastIds.map((id) => ({ id, label: termLabel(id) })),
  ];

  const today = todayCentral();
  const events = [
    ...loadTerm("present", "present"),
    ...pastIds.flatMap((id) => loadTerm(id, termPathOf(id))),
  ]
    .map((e) => ({ ...e, isPast: e.date < today })) // YYYY-MM-DD strings compare correctly as text
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // newest first

  // Hide past terms that have no events (empty folders waiting to be filled in).
  const used = new Set(events.map((e) => e.termId));
  return { terms: terms.filter((t) => t.id === "present" || used.has(t.id)), events };
}
