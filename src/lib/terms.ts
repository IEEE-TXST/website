import "server-only"; // this file reads from disk, so it must never be bundled into browser code
import fs from "fs";
import path from "path";
import { siteConfig } from "@/content/config";

/**
 * TERMS: shared helpers for the folder layout used by BOTH officers and events.
 *
 *   <kind>/present/{info,pictures}          <- the current term
 *   <kind>/past/<year>/{info,pictures}      <- one folder per old term, e.g. past/2025-26
 *
 * where <kind> is "officers" or "events". `info` holds the spreadsheets (CSV) and `pictures` holds
 * the images. Pictures are copied to /public/media by scripts/sync-media.mjs so browsers can load them.
 */
export type Kind = "officers" | "events";

/** Browser URL prefix for the copied pictures, e.g. /media/officers/present/hkn/jane-doe.jpg */
export const MEDIA_URL = "/media";

/** Absolute path of a content folder, e.g. kindRoot("events") -> <project>/events */
export const kindRoot = (kind: Kind) => path.join(process.cwd(), kind);

/**
 * Turns a term id into its folder path:
 *   "present"  -> "present"
 *   "2024-25"  -> "past/2024-25"
 */
export const termPathOf = (id: string) => (id === "present" ? "present" : `past/${id}`);

/**
 * Lists the old terms that exist on disk, newest first (e.g. ["2025-26", "2024-25"]).
 * Returns an empty list when there is no `past` folder yet.
 */
export function listPastTermIds(kind: Kind): string[] {
  try {
    return fs
      .readdirSync(path.join(kindRoot(kind), "past"), { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith(".")) // ignore files and hidden folders
      .map((d) => d.name)
      .sort() // "2024-25" < "2025-26" alphabetically...
      .reverse(); // ...so reversing gives newest first
  } catch {
    return [];
  }
}

// A term name must look like 2025-26 (four digits, dash, two digits).
const TERM_FORMAT = /^\d{4}-\d{2}$/;

/** Display version of a term name: "2025-26" -> "2025–26" (with a proper en dash). */
export const termLabel = (name: string) => name.replace("-", "–");

/**
 * The name of the present term (e.g. "2026-27"), set as `currentTerm` in src/content/config.ts.
 * Returns null if it is missing or badly formatted, so callers can fall back gracefully.
 */
export function getCurrentTermName(): string | null {
  const name = siteConfig.currentTerm?.trim();
  if (name && TERM_FORMAT.test(name)) return name;
  console.warn(`[terms] currentTerm in src/content/config.ts should look like 2026-27, got "${name}"`);
  return null;
}

/** Label shown in the dropdowns for the present term, e.g. "2026–27 (Present)". */
export function presentTermLabel(): string {
  const name = getCurrentTermName();
  return name ? `${termLabel(name)} (Present)` : "Present Term";
}
