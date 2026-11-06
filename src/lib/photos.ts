import "server-only"; // reads files from disk: never send this code to the browser
import fs from "fs";
import path from "path";
import { MEDIA_URL, kindRoot, listPastTermIds, termPathOf } from "@/lib/terms";

/**
 * SLIDER / CAROUSEL PHOTOS
 *
 * Built automatically from the event photo folders, so nobody edits code to change a slider:
 *
 *   events/<term>/pictures/photos/            -> general photos  (homepage slider)
 *   events/<term>/pictures/photos/ras/        -> Robotics & Automation Society
 *   events/<term>/pictures/photos/hkn/        -> Eta Kappa Nu (HKN)
 *   events/<term>/pictures/photos/computer-society/
 *
 * <term> is `present` or `past/<year>`. Newest term first. Pictures are copied to /public/media
 * by scripts/sync-media.mjs.
 */

export type PhotoGroup = "general" | "ras" | "hkn" | "computer-society";
export interface Photo {
  src: string; // browser URL
  alt: string; // description for screen readers, made from the file name
}

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Makes a readable description from a file name, so photos are described without extra data.
 * "2025-10-27-tesla-gigafactory-tour.jpg" -> "Tesla gigafactory tour" (the date prefix is dropped).
 */
function altFromFile(file: string): string {
  const text = file
    .replace(/\.[^.]+$/, "") // drop the extension
    .replace(/^\d{4}-\d{2}-\d{2}-/, "") // drop a leading date
    .replace(/[-_]+/g, " ") // hyphens/underscores -> spaces
    .trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Image file names directly inside one folder, alphabetically. Empty if the folder doesn't exist. */
function listFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && IMAGE.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * Photos for one group from every term (present first, then past terms newest-first).
 * `limit` caps how many are returned (the homepage slider uses 12).
 */
export function getPhotos(group: PhotoGroup, limit?: number): Photo[] {
  const termPaths = ["present", ...listPastTermIds("events").map(termPathOf)];
  const photos: Photo[] = [];

  for (const termPath of termPaths) {
    // "general" photos sit directly in photos/; society photos sit in photos/<society>/.
    const sub = group === "general" ? "" : group;
    const dir = path.join(kindRoot("events"), termPath, "pictures", "photos", sub);
    for (const file of listFiles(dir)) {
      photos.push({
        src: `${MEDIA_URL}/events/${termPath}/photos/${sub ? `${sub}/` : ""}${file}`,
        alt: altFromFile(file),
      });
    }
  }
  return limit ? photos.slice(0, limit) : photos;
}
