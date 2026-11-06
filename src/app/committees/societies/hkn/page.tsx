import OfficerCard from "@/components/ui/OfficerCard";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/animations/FadeIn";
import ImageCarouselReverse from "@/components/ui/ImageCarouselReverse";
import Button from "@/components/ui/Button";
import { carouselImages } from "@/content/data/sliders";
import SocialLinks from "@/components/hkn/SocialLinks";
import { hknOfficers } from "@/content/data/team";

export default function HKN() {

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              IEEE Eta Kappa Nu
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Check out what HKN TXST has to offer
            </p>
          </div>
        </FadeIn>
      </Section>

      <FadeIn>
        <div className="flex flex-col gap-6 shadow-2xl">
          <ImageCarouselReverse images={carouselImages.hkn} />
        </div>
      </FadeIn>

      {/* Intro Section */}
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              HKN TXST
            </h2>
            <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
          </div>

          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Mu Upsilon IEEE-HKN (Eta Kappa Nu) at Texas State University is the official IEEE honor society recognizing the 
            top 10% of students in engineering and technology for their academic excellence, leadership, and service. 
            Membership is by invitation to students who have demonstrated not only strong performance in the 
            classroom but also meaningful involvement in leadership roles, community service, and professional development.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <div className="relative bg-gradient-to-br from-[#00629B] to-[#00A9E0] rounded-2xl shadow-xl overflow-hidden">
            <div className="p-10 text-center text-white max-w-3xl mx-auto">

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Official IEEE-HKN Chapter Page
              </h2>

              <p className="text-white/90 mb-8 text-lg">
                Learn more about our Mu Upsilon chapter, national recognition,
                and how IEEE-HKN supports academic excellence and leadership.
              </p>

              <Button
                href="https://hkn.ieee.org/hkn-chapters/all-chapters/mu-upsilon-chapter"
                variant="secondary"
                className="px-10 py-3 text-lg"
              >
                Visit Official Chapter Page
              </Button>

            </div>
          </div>
        </FadeIn>
      </Section>
       

      {/* HKN Branch Social Links Section */}
      <SocialLinks />

      {/* Officer Members Section */}
      {hknOfficers.length > 0 && (
        <Section className="bg-gray-50">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                HKN Officers
              </h2>
              <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {hknOfficers.map((officer, index) => (
              <div
                key={officer.id}
                className="w-full max-w-[240px] mx-auto sm:max-w-none"
              >
                <FadeIn key={officer.id} delay={index * 0.1}>
                  <OfficerCard
                    name={officer.name}
                    position={officer.position}
                    major={officer.major}
                    image={officer.image}
                    // bio={officer.bio}
                    email={officer.email}
                    linkedin={officer.linkedin}
                    github={officer.github}
                  />
                </FadeIn>
              </div>
            ))}
          </div>
        </Section>
      )}

    </main>
  );
}
