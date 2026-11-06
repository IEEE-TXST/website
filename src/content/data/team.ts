/**
 * TEAM MEMBERS / OFFICERS DATA
 *
 * All team member data now lives in a spreadsheet, not in this file:
 *
 *     public/ieee_team_members.csv
 *
 * HOW TO ADD / EDIT A TEAM MEMBER:
 * 1. Take a professional headshot photo (square format works best)
 * 2. Save the photo to: /public/images/team/<committee>/firstname-lastname.jpg
 * 3. Open ieee_team_members.csv (Excel, Google Sheets, Numbers, etc.)
 * 4. Add or edit a row. Columns are:
 *      group, id, name, position, major, graduationYear, image, email, linkedin, github
 *    "group" controls which exported array the row lands in. Valid values:
 *      executive   -> executiveBoard
 *      officer     -> officerMembers
 *      ras         -> rasOfficers
 *      hkn         -> hknOfficers
 *      computerSoc -> computerSocOfficers
 * 5. Save the CSV back to public/ieee_team_members.csv
 *
 * Note that Officers listed in order go from
 * Main IEEE branch -> Robotics (RAS) -> Eta Kappa Nu (HKN) -> Computer Society
 *
 * This file reads the CSV from disk with Node's `fs` module
 */

import fs from "fs";
import path from "path";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  major: string;
  graduationYear: string;
  image: string; // Path to image in /public/images/team/
  email?: string;
  linkedin?: string;
  github?: string;
}

type GroupKey =
  | "executive"
  | "officer"
  | "ras"
  | "hkn"
  | "computerSoc";

interface CsvRow extends TeamMember {
  group: GroupKey;
}

const CSV_PATH = path.join(process.cwd(), "public", "ieee_team_members.csv");

/**
 * Minimal CSV line parser (handles quoted fields, "" escaped quotes,
 * and commas inside quotes) so it doesn't matter if a name, position,
 * etc. happens to contain a comma.
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++; // skip the escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields.map((f) => f.trim());
}

function parseCsv(raw: string): CsvRow[] {
  const lines = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length <= 1) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const record: Record<string, string> = {};

    headers.forEach((header, idx) => {
      record[header] = values[idx] ?? "";
    });

    // Skip blank / placeholder rows
    if (!record.name) continue;

    rows.push({
      id: record.id || `row-${i}`,
      name: record.name,
      position: record.position || "",
      major: record.major || "",
      graduationYear: record.graduationyear || "",
      image: record.image || "/images/branding/txst-bobcat-logo.png",
      email: record.email || undefined,
      linkedin: record.linkedin || undefined,
      github: record.github || undefined,
      group: ((record.group || "").trim() || "officer") as GroupKey,
    });
  }

  return rows;
}

function loadTeamMembers(): CsvRow[] {
  try {
    const raw = fs.readFileSync(CSV_PATH, "utf-8");
    return parseCsv(raw);
  } catch (err) {
    console.error(`Failed to read team members CSV at ${CSV_PATH}:`, err);
    return [];
  }
}

function stripGroup(row: CsvRow): TeamMember {
  const { group, ...member } = row;
  return member;
}

const allMembers = loadTeamMembers();

// ---- Exported groups (same names/shape the pages already import) ----
// Order: Main IEEE branch -> Robotics (RAS) -> Eta Kappa Nu (HKN) -> Computer Society

export const executiveBoard: TeamMember[] = allMembers
  .filter((m) => m.group === "executive")
  .map(stripGroup);

export const officerMembers: TeamMember[] = allMembers
  .filter((m) => m.group === "officer")
  .map(stripGroup);

export const rasOfficers: TeamMember[] = allMembers
  .filter((m) => m.group === "ras")
  .map(stripGroup);

export const hknOfficers: TeamMember[] = allMembers
  .filter((m) => m.group === "hkn")
  .map(stripGroup);

export const computerSocOfficers: TeamMember[] = allMembers
  .filter((m) => m.group === "computerSoc")
  .map(stripGroup);