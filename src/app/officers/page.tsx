/**
 * OFFICERS PAGE
 *
 * Displays IEEE TXST leadership team with 3D animated cards.
 * Officers come from the /officers folder (info CSVs + pictures),
 * loaded by /src/lib/officers.ts. Visitors can switch society and term.
 *
 * TO UPDATE OFFICERS: see PRESIDENT_GUIDE.md
 */

import { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import OfficersBrowser from "@/components/ui/OfficersBrowser";
import { getTerms } from "@/lib/officers";

export const metadata: Metadata = {
  title: "Officers",
  description: "Meet the leadership behind IEEE TXST."
}

export default function Officers() {
  const terms = getTerms();

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Meet the students leading IEEE TXST
            </p>
          </div>
        </FadeIn>
      </Section>

      <OfficersBrowser terms={terms} />

      {/* Become an Officer Section */}
      <Section dark className="bg-gradient-to-br from-[#00629B] to-[#00A9E0]">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Interested in Leadership?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Officer positions are open to active IEEE TXST members. Elections
              are typically held at the end of each Spring semester and are held when positions become vacant. Get involved, show
              your dedication, and you could be part of next year&apos;s leadership team!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" href="/membership">
                Learn About Membership
              </Button>
              <Button variant="ghost" href="/events">
                Get Involved
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
