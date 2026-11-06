/**
 * HOMEPAGE
 *
 * Simple, student-focused landing page for IEEE TXST.
 *
 * SECTIONS:
 * 1. Hero - Welcome message
 * 2. About Us - What IEEE TXST is about
 * 3. Social Links - Connect with us on social media
 * 4. Get Involved - How to join and participate
 * 5. Events Preview - Upcoming events
 */

import Hero from "@/components/home/Hero";
import SocialLinks from "@/components/home/SocialLinks";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { homeContent } from "@/content/pages/home";
import { siteConfig } from "@/content/config";
import { getPhotos } from "@/lib/photos";
import ConnectQR from "@/components/connect/ConnectQR";

export default function Home() {
  // What we offer (simple, educational focus)
  const activities = [
    {
      icon: "workshop",
      title: "Technical Workshops",
      description: "Build practical skills through hands-on workshops covering real engineering tools and technologies.",
    },
    {
      icon: "community",
      title: "Community & Networking",
      description: "Meet driven students, connect with industry professionals, and grow your network beyond the classroom.",
    },
    {
      icon: "project",
      title: "Project Opportunities",
      description: "Apply your knowledge on real engineering projects through IEEE RAS and other technical initiatives.",
    },
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <SlideIn direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageSlideshow images={getPhotos("general", 12)} />
            </div>
          </SlideIn>

          {/* Text Content */}
          <SlideIn direction="right">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About IEEE TXST
              </h2>
              <div className="w-24 h-1 bg-[#00629B] mb-6 rounded-full" />
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {homeContent.whatWeDo.description}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {homeContent.whatWeDo.secondaryDescription}
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-2">
                  <strong>When:</strong> {siteConfig.meetings.schedule}
                </p>
                <p className="text-gray-700">
                  <strong>Where:</strong> {siteConfig.meetings.location}
                </p>
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* Main IEEE Branch Social Links Section */}
      <SocialLinks />

      {/* QR codes for the IEEE Student Branch: Discord, LinkedIn, GroupMe, Instagram, Bobcat Org Hub */}
      <ConnectQR contact={siteConfig.mainIEEEContact} subtitle="Point your phone camera at a code to join the IEEE Student Branch community." />

      {/* What We Offer */}
      <Section className="bg-gray-50">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              IEEE TXST provides opportunities for learning, collaboration, and growth
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[#00629B] mb-4 flex justify-center">
                  <Icon name={activity.icon} className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Get Involved Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get Involved
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you&apos;re interested in workshops, projects, events, or just want to meet
              other students, there&apos;s a place for you at IEEE TXST
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" href="/membership">
                Learn About Membership
              </Button>
              <Button variant="ghost" href="/events">
                View Events
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Contact Section */}
      <Section>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Feel free to reach out to us!
            </p>
            <a
              href={`mailto:${siteConfig.mainIEEEContact.email}`}
              className="text-[#00629B] hover:text-[#00A9E0] text-xl font-medium transition-colors"
            >
              {siteConfig.mainIEEEContact.email}
            </a>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
