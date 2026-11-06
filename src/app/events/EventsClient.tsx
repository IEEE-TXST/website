"use client"; // needs state (selected category / term), so it runs in the browser

/**
 * EVENTS CLIENT
 *
 * The interactive part of the Events page: category filter buttons, a Term dropdown,
 * the Upcoming list, the Calendar, and Past Events grouped by term.
 * Events are loaded on the server (src/lib/events.ts) and passed in as props.
 */
import { useState, useSyncExternalStore } from "react";
import EventCard3D from "@/components/events/EventCard3D";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/animations/FadeIn";
import type { Event, EventTerm } from "@/content/data/events";
import OutlookCalendarEmbed from "@/components/ui/OutlookCalendarEmbed";

export default function EventsClient({
  events,
  terms,
}: {
  events: Event[];
  terms: EventTerm[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("all"); // "all" or a term id such as "present" / "2024-25"

  // The page is built ahead of time, so an event's upcoming/past flag can be out of date by the time
  // someone visits. useSyncExternalStore gives `null` while the server builds the page and the visitor's
  // real date in the browser, which avoids a server/browser mismatch and keeps the flag fresh.
  const today = useSyncExternalStore(
    () => () => {},
    () => new Date().toLocaleDateString("en-CA"),
    () => null
  );

  // Categories for filtering
  const categories = [
    { id: "all", label: "All Events", color: "bg-gray-700", hoverColor: "hover:bg-gray-500" },
    { id: "workshop", label: "Workshops", color: "bg-purple-500", hoverColor: "hover:bg-purple-600" },
    { id: "meeting", label: "Meetings", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
    { id: "social", label: "Socials", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
    { id: "speaker", label: "Speakers", color: "bg-orange-500", hoverColor: "hover:bg-orange-600" },
    { id: "tour", label: "Tours", color: "bg-red-500", hoverColor: "hover:bg-red-600"},
  ];

  // Filter events
  const filteredEvents = events
    .map((event) => (today ? { ...event, isPast: event.date < today } : event))
    .filter((event) => selectedTerm === "all" || event.termId === selectedTerm)
    .filter((event) => selectedCategory === "all" || event.category === selectedCategory);

  // Separate upcoming and past events
  const upcomingEvents = filteredEvents.filter((event) => !event.isPast);
  const pastEvents = filteredEvents.filter((event) => event.isPast);

  // Past events grouped by term (terms arrive newest-first: present, then past terms)
  const pastByTerm = terms
    .map((term) => ({ term, items: pastEvents.filter((e) => e.termId === term.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join us for workshops, meetings, and community events
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Filter Section */}
      <Section className="bg-gray-50">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg scale-105`
                    : `bg-white text-gray-700 ${category.hoverColor}`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {terms.length > 1 && (
            <label className="mt-6 flex items-center justify-center gap-2 text-gray-700">
              <span className="font-medium">Term:</span>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
              >
                <option value="all">All terms</option>
                {terms.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </FadeIn>
      </Section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <Section className="-translate-y-14">
          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="w-full max-w-[240px] mx-auto sm:max-w-none"
              >
                <FadeIn delay={index * 0.1}>
                  <EventCard3D event={event} />
                </FadeIn>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Embed IEEE TXST Outlook Calendar */}
      <Section>
        <FadeIn>
          <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calendar
          </h2>
          <OutlookCalendarEmbed />
        </FadeIn>
      </Section>

      {/* No Upcoming Events Message */}
      {upcomingEvents.length === 0 && (
        <Section>
          <FadeIn>
            <div className="text-center py-12">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Upcoming Events
              </h3>
              <p className="text-gray-600">
                {selectedCategory === "all"
                  ? "Check back soon for new events!"
                  : `No upcoming ${selectedCategory} events. Try another category.`}
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <Section className="bg-gray-50">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Past Events
              </h2>
              <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
            </div>
          </FadeIn>

          <div className="space-y-12">
            {pastByTerm.map(({ term, items }) => (
              <div key={term.id}>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
                  {term.label}{" "}
                  <span className="text-base font-normal text-gray-500">
                    · {items.length} {items.length === 1 ? "event" : "events"}
                  </span>
                </h3>
                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {items.map((event, index) => (
                    <div
                      key={event.id}
                      className="w-full max-w-[240px] mx-auto sm:max-w-none"
                    >
                      <FadeIn delay={Math.min(index, 8) * 0.1}>
                        <EventCard3D event={event} />
                      </FadeIn>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Call to Action */}
      <Section dark className="bg-gradient-to-br from-[#00629B] to-[#00A9E0]">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Stay Updated?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join IEEE TXST to get notifications about upcoming events and opportunities.
            </p>
            <a
              href="/membership"
              className="inline-block bg-white text-[#00629B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Become a Member
            </a>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
