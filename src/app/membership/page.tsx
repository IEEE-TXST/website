/**
 * MEMBERSHIP PAGE
 *
 * Simple, straightforward information about joining IEEE TXST.
 * No marketing speak - just what students need to know.
 */

import { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/content/config";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join IEEE Texas State University and gain access to all events and opportunities we have to offer."
}

export default function MembershipPage() {
  // What you&apos;ll get as a member
  const activities = [
    {
      icon: "workshop",
      title: "Workshops & Learning",
      description: "Learn new skills through hands-on Open Project Source (OPS) workshops covering a wide range of engineering tools, technologies, and topics.",
    },
    {
      icon: "community",
      title: "Community",
      description: "Meet like-minded students, build friendships, and become part of a supportive engineering community that grows together.",
    },
    {
      icon: "project",
      title: "Projects",
      description: "Work on real-world engineering projects and apply classroom knowledge through our IEEE Robotics and Automation Society (RAS) and other technical teams.",
    },
    {
      icon: "network",
      title: "Industry Connections",
      description: "Connect with professionals ranging from recruiters to engineers and managers. Attend industry talks and networking events to explore career opportunities.",
    },
    {
      icon: "learn",
      title: "IEEE Resources",
      description: "Gain access to IEEE Xplore digital library, IEEE Spectrum magazine, discounts on conferences, continuing education courses, and a global network with over 420,000 members.",
    },
    {
      icon: "calendar",
      title: "Social Events",
      description: "Join social events like bowling and potlucks, game (Super Smash Bros) and movie nights, and community service activities such as Bobcat Build and San Marcos River Clean Up.",
    },
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Join IEEE TXST
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Open to all Texas State students interested in technology, engineering, and community.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* What Membership Includes */}
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What&apos;s Included
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              As a member, you&apos;ll have access to everything we offer
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-[#00629B] mb-4 flex justify-center">
                  <Icon name={activity.icon} className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {activity.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* How to Join */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How to Join
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <SlideIn direction="left" delay={0.1}>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00629B] text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Show Up to a Meeting
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Come to one of our meetings - all are welcome!
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <strong>When:</strong> {siteConfig.meetings.schedule}
                      </p>
                      <p className="text-gray-700">
                        <strong>Where:</strong> {siteConfig.meetings.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.2}>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00629B] text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Fill Out the Form and Pay your National Membership Dues
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Complete this membership form so we can keep you updated on events and opportunities.
                    </p>
                    <Button variant="primary" href={siteConfig.cta.membershipFormUrl}>
                      Complete Form
                    </Button>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="left" delay={0.3}>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00629B] text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Get Involved
                    </h3>
                    <p className="text-gray-700">
                      Attend workshops, work on projects, and participate in events.
                      The more you engage, the more you&apos;ll gain!
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-6">
          <FadeIn delay={0.1}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is there a membership fee?
              </h3>
              <p className="text-gray-600">
                While it is free to attend regular general meetings, in order to receive an OPS circuit kit, and participate in events and tours, 
                you must be a paid IEEE National Member. A student national membership costs $32 and is bought through the official IEEE website. 
                Please fill out the membership form to join and feel free to ask us any questions you may have!
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do I need to be an engineering major?
              </h3>
              <p className="text-gray-600">
                Not at all! We welcome students from any major who are interested in technology and learning.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What&apos;s the time commitment?
              </h3>
              <p className="text-gray-600">
                It&apos;s flexible! Attend as many events as you like. Most members attend weekly meetings and a few events per month.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I join mid-semester?
              </h3>
              <p className="text-gray-600">
                Absolutely! You&apos;re welcome to join at any time during the semester.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark className="bg-gradient-to-br from-[#00629B] to-[#00A9E0]">
        <FadeIn>
          <div className="text-center py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Become part of the IEEE TXST community today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" href={siteConfig.cta.membershipFormUrl}>
                Complete Membership Form
              </Button>
              <Button variant="ghost" href="/events">
                View Upcoming Events
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
