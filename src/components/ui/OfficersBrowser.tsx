"use client"; // needs state (selected society / term), so it runs in the browser

/**
 * OFFICERS BROWSER
 *
 * The interactive part of the Officers page: society tabs (Student Branch, HKN, Computer Society,
 * Robotics & Automation Society) and a Term dropdown (present term + past terms).
 * All the data is loaded on the server (src/lib/officers.ts) and passed in as `terms`,
 * so switching tabs is instant and needs no extra requests.
 */
import { useState } from "react";
import Image from "next/image";
import OfficerCard from "@/components/ui/OfficerCard";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/animations/FadeIn";
import { SOCIETIES, type SocietyId, type TeamMember, type TermData } from "@/content/data/team";

/** A responsive grid of officer cards (the staggered delay makes the cards fade in one after another). */
function Grid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {members.map((m, index) => (
        <div key={m.id} className="w-full max-w-[240px] mx-auto sm:max-w-none">
          <FadeIn delay={Math.min(index, 8) * 0.1}>
            <OfficerCard
              name={m.name}
              position={m.position}
              major={m.major}
              image={m.image}
              email={m.email}
              linkedin={m.linkedin}
              github={m.github}
            />
          </FadeIn>
        </div>
      ))}
    </div>
  );
}

/** Section title with the blue underline bar. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{children}</h2>
        <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
      </div>
    </FadeIn>
  );
}

export default function OfficersBrowser({ terms }: { terms: TermData[] }) {
  const [society, setSociety] = useState<SocietyId>("student-branch"); // Student Branch is the default tab
  const [termId, setTermId] = useState(terms[0].id); // terms[0] is always the present term

  // The selected term (falls back to the present term if the id isn't found)
  const term = terms.find((t) => t.id === termId) ?? terms[0];
  const label = SOCIETIES.find((s) => s.id === society)?.label ?? "";
  const { executiveBoard, officers } = term.societies[society];
  const empty = executiveBoard.length === 0 && officers.length === 0; // nobody listed for this society/term

  return (
    <>
      {/* Controls */}
      <Section>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Society">
            {SOCIETIES.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={society === s.id}
                onClick={() => setSociety(s.id)}
                className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                  society === s.id
                    ? "bg-[#00629B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* The Term dropdown only appears once there is at least one past term with officers */}
          {terms.length > 1 && (
            <label className="flex items-center gap-2 text-gray-700">
              <span className="font-medium">Term:</span>
              <select
                value={term.id}
                onChange={(e) => setTermId(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
              >
                {terms.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </Section>

      {/* The team photo belongs to the whole branch, so it only shows on the Student Branch tab */}
      {society === "student-branch" && term.groupPhoto && (
        <Section>
          <FadeIn>
            <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={term.groupPhoto}
                alt={`IEEE TXST Officers ${term.label}`}
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </Section>
      )}

      {empty && (
        <Section>
          <p className="text-center text-gray-600">
            No {label} officers listed for {term.label} yet.
          </p>
        </Section>
      )}

      {executiveBoard.length > 0 && (
        <Section>
          <Heading>{society === "student-branch" ? "Executive Board" : `${label} Executive Board`}</Heading>
          <Grid members={executiveBoard} />
        </Section>
      )}

      {officers.length > 0 && (
        <Section className="bg-gray-50">
          <Heading>{society === "student-branch" ? "Officers" : `${label} Officers`}</Heading>
          <Grid members={officers} />
        </Section>
      )}
    </>
  );
}
