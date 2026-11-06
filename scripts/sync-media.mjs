/**
 * SYNC MEDIA
 *
 * Browsers can only load images from the /public folder, but our officer and event pictures live in
 * /officers and /events (next to their spreadsheets). This script copies them over:
 *
 *   officers/<term>/pictures/**  ->  public/media/officers/<term>/**
 *   events/<term>/pictures/**    ->  public/media/events/<term>/**
 *
 * <term> is `present` or `past/<year>`. Only image files are copied (spreadsheets stay private).
 * It runs automatically before `npm run dev` and `npm run build` (see package.json). If you add a photo
 * while the dev server is already running, run `npm run sync-media` to pick it up.
 * /public/media is GENERATED and git-ignored - never edit it by hand, it is wiped on every run.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const out = path.join(root, "public", "media");
fs.rmSync(out, { recursive: true, force: true }); // start clean so deleted pictures disappear too

const IMAGE = /\.(jpe?g|png|webp|gif|svg|avif)$/i;
let count = 0;

/** Copies every image under `src` into `dest`, keeping the sub-folders (e.g. photos/ras/). */
function copyDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue; // skip hidden files such as .gitkeep and .DS_Store
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (IMAGE.test(entry.name)) {
      fs.mkdirSync(dest, { recursive: true }); // only create folders that actually receive a picture
      fs.copyFileSync(s, d);
      count++;
    }
  }
}

for (const kind of ["officers", "events"]) {
  // The present term plus one entry per folder under <kind>/past/
  const terms = ["present"];
  const pastDir = path.join(root, kind, "past");
  if (fs.existsSync(pastDir)) {
    for (const e of fs.readdirSync(pastDir, { withFileTypes: true })) {
      if (e.isDirectory() && !e.name.startsWith(".")) terms.push(`past/${e.name}`);
    }
  }
  for (const termPath of terms) {
    const pictures = path.join(root, kind, termPath, "pictures");
    if (fs.existsSync(pictures)) copyDir(pictures, path.join(out, kind, termPath));
  }
}
console.log(`[sync-media] copied ${count} pictures to public/media`);
