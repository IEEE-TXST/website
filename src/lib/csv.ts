/**
 * Tiny CSV helpers (no dependencies), used by the officers and events loaders.
 *
 * Why not just split on commas? Spreadsheet apps wrap cells in quotes when they contain commas,
 * quotes or line breaks (e.g. an event description like "Join us, bring a laptop"). This parser handles that.
 *
 * - parseCsv():     CSV text -> rows of cells
 * - rowsToRecords(): rows of cells (first row = headers) -> objects keyed by lower-cased header
 */

/**
 * Parses CSV text into rows of cells. Handles:
 *  - quoted fields:                "Ingram Hall, Room 101"
 *  - escaped quotes inside quotes: "She said ""hi"""
 *  - commas and line breaks inside quotes
 *  - Windows (\r\n) and Mac/Unix (\n) line endings, and the invisible BOM Excel adds to the start
 */
export function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false; // true while we are between a pair of quotes
  const text = raw.replace(/^﻿/, "").replace(/\r\n?/g, "\n");

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"'; // "" inside quotes means one literal quote
          i++;
        } else {
          inQuotes = false; // closing quote
        }
      } else {
        cell += ch; // anything (even commas and newlines) is part of the cell
      }
    } else if (ch === '"') {
      inQuotes = true; // opening quote
    } else if (ch === ",") {
      row.push(cell); // end of a cell
      cell = "";
    } else if (ch === "\n") {
      row.push(cell); // end of a row
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  // The last row may not end with a line break.
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/**
 * Turns rows into objects using the first row as headers.
 *   [["Name","Email"],["Jane","j@x.edu"]]  ->  [{ name: "Jane", email: "j@x.edu" }]
 * Headers are lower-cased and cells trimmed, so "graduationYear" is read as `graduationyear`.
 * Completely empty rows are skipped.
 */
export function rowsToRecords(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return []; // only a header (or nothing): no data
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const records: Record<string, string>[] = [];
  for (let i = 1; i < rows.length; i++) {
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      if (h) record[h] = (rows[i][idx] ?? "").trim();
    });
    if (Object.values(record).some((v) => v !== "")) records.push(record);
  }
  return records;
}
