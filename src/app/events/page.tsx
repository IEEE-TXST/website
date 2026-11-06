/**
 * EVENTS PAGE
 *
 * Displays all IEEE TXST events with 3D animated cards.
 * Events come from the /events folder (info CSV + pictures),
 * loaded by /src/lib/events.ts
 *
 * Features:
 * - 3D tilt effect on event cards
 * - Filter by category (All, Workshops, Meetings, etc.)
 * - Upcoming and past events sections
 *
 * TO ADD A NEW EVENT:
 * See PRESIDENT_GUIDE.md
 */

import { Metadata } from "next";
import EventsClient from "./EventsClient";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore upcoming and past IEEE TXST events, workshops, socials, and networking opportunities."
};

export default function EventsPage() {
  const { terms, events } = getEvents();
  return <EventsClient terms={terms} events={events} />;
}
