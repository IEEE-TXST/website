/**
 * SOCIAL CHANNELS (shared list)
 *
 * The channels that can get a QR code, in display order. Each key matches a field in the contact
 * blocks of src/content/config.ts (mainIEEEContact, RASContact, HKNContact, computerSocContact).
 * A channel only shows up for a society that has that field filled in.
 *
 * Used by BOTH the website (src/components/connect/ConnectQR.tsx) and the print-file script
 * (scripts/generate-qr.mjs), so they always agree.
 */

export const CHANNELS = [
  { key: "discord", name: "Discord", blurb: "Chat with the community" },
  { key: "linkedin", name: "LinkedIn", blurb: "Follow us for updates" },
  { key: "groupme", name: "GroupMe", blurb: "Get meeting reminders" },
  { key: "instagram", name: "Instagram", blurb: "Photos and announcements" },
  { key: "orgHub", name: "Bobcat Org Hub", blurb: "Our page on Bobcat Engage" },
] as const;

/** A contact block from config.ts (some fields can be missing for a society). */
export type Contact = Record<string, string | undefined>;

/** The channels this contact block has a link for, in display order. */
export function channelsFor(contact: Contact) {
  return CHANNELS.filter((c) => contact[c.key]).map((c) => ({ ...c, url: contact[c.key] as string }));
}
