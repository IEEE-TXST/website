import OfficerCard from "@/components/ui/OfficerCard";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/animations/FadeIn";
// import ImageCarousel from "@/components/ui/ImageCarousel";
// import { committeeSliderImages } from "@/content/data/sliders";
import SocialLinks from "@/components/computersoc/SocialLinks";
import { computerSocOfficers } from "@/content/data/team";

export default function ComputerSoc() {

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Computer Society
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Check out what Computer Society TXST has to offer
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* No Commputer Society images yet

      <FadeIn>
        <div className="flex flex-col gap-6 shadow-2xl">
          <ImageCarousel images={committeeSliderImages.computerSoc} />
        </div>
      </FadeIn>

      */}

      {/* Intro Section */}
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Computer Society TXST
            </h2>
            <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
          </div>

          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            The IEEE Computer Society at Texas State University brings together students interested in software engineering, 
            data, artificial intelligence, and computer engineering through hands-on workshops, technical projects, and 
            industry-focused events that build real-world skills beyond the classroom.
          </p>
        </FadeIn>
      </Section>

      {/* Computer Society Branch Social Links Section */}
      <SocialLinks />

      {/* Officer Members Section */}
      {computerSocOfficers.length > 0 && (
        <Section className="bg-gray-50">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Computer Society Officers
              </h2>
              <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {computerSocOfficers.map((officer, index) => (
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
