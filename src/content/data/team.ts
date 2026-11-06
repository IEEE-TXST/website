/**
 * OFFICER TYPES + SOCIETY LIST
 *
 * Officer data is folder-based (no code edits needed each year):
 *
 *   officers/
 *     present/
 *       info/<society>.csv
 *       pictures/<society>/jane-doe.jpg      (firstname-lastname)
 *       pictures/group-photo.jpg             (optional)
 *     past/2024-25/                          (same inside)
 *
 * Loaded by /src/lib/officers.ts. See PRESIDENT_GUIDE.md.
 */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  major: string;
  graduationYear: string;
  image: string; // Public path (copied from the pictures folder), e.g. /media/officers/present/student-branch/jane-doe.jpg
  email?: string;
  linkedin?: string;
  github?: string;
}

/** Folder names. Add a society here (and create its folders) to show a new tab. */
export const SOCIETIES = [
  { id: "student-branch", label: "Student Branch" },
  { id: "hkn", label: "Eta Kappa Nu (HKN)" },
  { id: "computer-society", label: "Computer Society" },
  { id: "robotics-automation-society", label: "Robotics & Automation Society" },
] as const;

export type SocietyId = (typeof SOCIETIES)[number]["id"];

export interface SocietyTeam {
  executiveBoard: TeamMember[];
  officers: TeamMember[];
}

export interface TermData {
  id: string; // "present" or a past-term folder name, e.g. "2024-25"
  label: string; // "Present Term" or "2024-25"
  isPresent: boolean;
  groupPhoto?: string;
  societies: Record<SocietyId, SocietyTeam>;
}
