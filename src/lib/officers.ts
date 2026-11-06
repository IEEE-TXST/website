import "server-only"; // reads files from disk: never send this code to the browser
import fs from "fs";
import path from "path";
import { parseCsv, rowsToRecords } from "@/lib/csv";
import { MEDIA_URL, kindRoot, listPastTermIds, presentTermLabel, termLabel, termPathOf } from "@/lib/terms";
import {
  SOCIETIES,
  type SocietyId,
  type SocietyTeam,
  type TeamMember,
  type TermData,
} from "@/content/data/team";

/**
 * OFFICERS LOADER
 *
 * Reads everything about officers from the /officers folder and hands typed data to the pages.
 * It runs at BUILD time, so adding a row or a photo and pushing to GitHub is all it takes.
 *
 *   officers/<term>/info/<society>.csv                one spreadsheet per society
 *   officers/<term>/pictures/<society>/<photo>        headshots, named firstname-lastname.jpg
 *   officers/<term>/pictures/group-photo.jpg          optional team photo for the term
 *
 * <term> is `present` or `past/<year>`. Pictures are copied to /public/media by scripts/sync-media.mjs.
 * Bad data never crashes the site: invalid rows/links are skipped and reported as warnings in the build log.
 */

// Shown when a person has no photo.
const DEFAULT_AVATAR = "/images/branding/txst-bobcat-logo.png";
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp"];

const warn = (msg: string) => console.warn(`[officers] ${msg}`);

/** "Jane O'Doe" -> "jane-o-doe": the form used to match a name to a photo file. */
const slug = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * Lists the images in one folder as a map of lower-cased name WITHOUT extension -> real file name.
 * e.g. { "jane-doe" => "Jane-Doe.JPG" }. Returns an empty map when the folder doesn't exist.
 */
function readPhotos(dir: string): Map<string, string> {
  const map = new Map<string, string>();
  try {
    for (const f of fs.readdirSync(dir)) {
      const ext = path.extname(f).toLowerCase();
      if (IMAGE_EXT.includes(ext)) map.set(path.basename(f, path.extname(f)).toLowerCase(), f);
    }
  } catch {
    // folder missing: no photos
  }
  return map;
}

/**
 * Accepts a link only if it is https:// AND on one of the allowed websites
 * (so a LinkedIn column can't be used to link somewhere else). Invalid links are dropped.
 */
function safeUrl(value: string | undefined, hosts: string[], label: string): string | undefined {
  const v = (value ?? "").trim();
  if (!v) return undefined; // empty is fine
  try {
    const u = new URL(v);
    if (u.protocol === "https:" && hosts.includes(u.hostname.replace(/^www\./, ""))) return u.toString();
  } catch {
    // not a valid URL: handled below
  }
  warn(`Ignoring invalid ${label} link "${v}"`);
  return undefined;
}

/** Accepts anything that looks like name@domain.tld; otherwise drops it with a warning. */
function safeEmail(value: string | undefined): string | undefined {
  const v = (value ?? "").trim();
  if (!v) return undefined;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return v;
  warn(`Ignoring invalid email "${v}"`);
  return undefined;
}

/**
 * Loads ONE society for ONE term: reads its CSV and finds each person's photo.
 * Returns { executiveBoard, officers }. A society with no CSV simply has nobody.
 */
function loadSociety(termPath: string, society: SocietyId): SocietyTeam {
  const team: SocietyTeam = { executiveBoard: [], officers: [] };
  const csvFile = path.join(kindRoot("officers"), termPath, "info", `${society}.csv`);
  const picturesDir = path.join(kindRoot("officers"), termPath, "pictures", society);
  let raw: string;
  try {
    raw = fs.readFileSync(csvFile, "utf-8");
  } catch {
    return team; // society has no file for this term - that's fine
  }

  const photos = readPhotos(picturesDir);
  const seen = new Set<string>(); // to warn if the same person is listed twice

  rowsToRecords(parseCsv(raw)).forEach((r, i) => {
    const name = (r.name ?? "").trim();
    if (!name) return; // blank row

    const key = slug(name);
    if (seen.has(key)) warn(`${termPath}/${society}: "${name}" is listed twice`);
    seen.add(key);

    // PHOTO LOOKUP: the photo is found from the person's name ("Jane Doe" -> jane-doe.jpg).
    // The optional `image` column overrides this when a file is named differently.
    const wanted = (r.image ? path.basename(r.image, path.extname(r.image)) : key).toLowerCase();
    let file = photos.get(wanted);
    let photoSociety: string = society; // which society's folder the photo was found in
    if (!file) {
      // Someone in two societies only needs one photo: look in this term's other society folders.
      for (const other of SOCIETIES) {
        if (other.id === society) continue;
        const found = readPhotos(path.join(kindRoot("officers"), termPath, "pictures", other.id)).get(wanted);
        if (found) {
          file = found;
          photoSociety = other.id;
          break;
        }
      }
    }
    if (!file) warn(`${termPath}/${society}: no photo for "${name}" (expected ${wanted}.jpg)`);

    const member: TeamMember = {
      id: `${termPath}-${society}-${i}-${key}`, // unique key for React lists
      name,
      position: r.position ?? "",
      major: r.major ?? "",
      graduationYear: r.graduationyear ?? "", // CSV headers are lower-cased by rowsToRecords
      image: file ? `${MEDIA_URL}/officers/${termPath}/${photoSociety}/${file}` : DEFAULT_AVATAR,
      email: safeEmail(r.email),
      linkedin: safeUrl(r.linkedin, ["linkedin.com"], "LinkedIn"),
      github: safeUrl(r.github, ["github.com"], "GitHub"),
    };

    // `group` = executive puts the person on the Executive Board; anything else is a regular officer.
    (r.group?.trim().toLowerCase() === "executive" ? team.executiveBoard : team.officers).push(member);
  });
  return team;
}

/** Loads a whole term: every society plus the optional group photo. */
function loadTerm(id: string, termPath: string, label: string, isPresent: boolean): TermData {
  const societies = {} as Record<SocietyId, SocietyTeam>;
  for (const s of SOCIETIES) societies[s.id] = loadSociety(termPath, s.id);

  // The group photo is any image called "group-photo" directly inside pictures/.
  let groupPhoto: string | undefined;
  const gp = [...readPhotos(path.join(kindRoot("officers"), termPath, "pictures"))].find(([base]) => base === "group-photo");
  if (gp) groupPhoto = `${MEDIA_URL}/officers/${termPath}/${gp[1]}`;

  return { id, label, isPresent, groupPhoto, societies };
}

/**
 * Every term that should appear on the Officers page: the present term first, then past terms
 * newest-first (by folder name, e.g. 2025-26 before 2024-25).
 */
export function getTerms(): TermData[] {
  const terms = [loadTerm("present", "present", presentTermLabel(), true)];
  const past = listPastTermIds("officers").map((name) => loadTerm(name, termPathOf(name), termLabel(name), false));
  // Hide past terms that have no officers yet (e.g. empty folders waiting to be filled in)
  return [...terms, ...past.filter((t) => Object.values(t.societies).some((s) => s.executiveBoard.length + s.officers.length > 0))];
}

/** Present-term team of one society (used by the HKN / Robotics / Computer Society pages). */
export function getPresentTeam(society: SocietyId): SocietyTeam {
  return loadSociety("present", society);
}
