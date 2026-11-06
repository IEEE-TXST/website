/**
 * EVENT TYPES
 *
 * Event data is folder-based (no code edits needed):
 *
 *   events/present/info/events.csv
 *   events/present/pictures/<flyer>.png
 *   events/past/2024-25/{info,pictures}/...
 *
 * Loaded by /src/lib/events.ts. See PRESIDENT_GUIDE.md.
 * "Upcoming" vs "past" is worked out from the date automatically.
 */

export const EVENT_CATEGORIES = ["workshop", "meeting", "social", "speaker", "tour"] as const;

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "6:00 PM"
  location: string;
  category: (typeof EVENT_CATEGORIES)[number];
  image: string; // Public path, e.g. /media/events/present/flyer.png
  registrationLink?: string;
  isPast?: boolean; // Computed from the date
  termId?: string; // "present" or e.g. "2024-25"
}

export interface EventTerm {
  id: string;
  label: string;
}
