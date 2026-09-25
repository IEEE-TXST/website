import OfficerCard from "@/components/ui/OfficerCard";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/animations/FadeIn";
import ImageCarouselReverse from "@/components/ui/ImageCarouselReverse";
import SlideIn from "@/components/animations/SlideIn";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import SocialLinks from "@/components/robotics/SocialLinks";
import { rasOfficers } from "@/content/data/team";
import { carouselImages, sliderImages } from "@/content/data/sliders";

export default function Robotics() {

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <Section dark className="bg-gradient-to-br from-[#0A0F1E] to-[#00629B]">
        <FadeIn>
          <div className="text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Robotics and Automation Society
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Check out what RAS TXST has to offer
            </p>
          </div>
        </FadeIn>
      </Section>

      <FadeIn>
        <div className="flex flex-col gap-6 shadow-2xl">
          <ImageCarouselReverse images={carouselImages.robotics} />
        </div>
      </FadeIn>

      {/* Intro Section */}
      <Section>
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              RAS TXST
            </h2>
            <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
          </div>

          <p className="text-gray-900 max-w-3xl mx-auto text-center mb-3">
            IEEE Robotics and Automation Society (RAS) at Texas State University brings together students from all 
            disciplines of robotics to design, build, and program real robots. Since the chapter&apos;s founding at TXST in Fall 2025,
            it has grown to over 80+ active and paying members!
          </p> 
            
          <p className="text-gray-900 max-w-3xl mx-auto text-center">
            From CAD and 3D-printed chassis to embedded systems and autonomous code, members
            collaborate across hardware and software. RAS is organized 
            into Intro, Rapid Prototyping, and Industry committees, giving students a clear path to learn 
            fundamentals, build advanced projects, and connect robotics to real-world applications.
          </p>
        </FadeIn>
      </Section>

      {/* Committees Section */}
      <Section>
        <FadeIn>
          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

            {/* Introduction to Robotics Committee */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-300">
              <div className="mb-4 flex justify-center">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 15C8.44771 15 8 15.4477 8 16C8 16.5523 8.44771 17 9 17C9.55229 17 10 16.5523 10 16C10 15.4477 9.55229 15 9 15Z" fill="#0F0F0F"></path> <path d="M14 16C14 15.4477 14.4477 15 15 15C15.5523 15 16 15.4477 16 16C16 16.5523 15.5523 17 15 17C14.4477 17 14 16.5523 14 16Z" fill="#0F0F0F"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 1C10.8954 1 10 1.89543 10 3C10 3.74028 10.4022 4.38663 11 4.73244V7H6C4.34315 7 3 8.34315 3 10V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V10C21 8.34315 19.6569 7 18 7H13V4.73244C13.5978 4.38663 14 3.74028 14 3C14 1.89543 13.1046 1 12 1ZM5 10C5 9.44772 5.44772 9 6 9H7.38197L8.82918 11.8944C9.16796 12.572 9.86049 13 10.618 13H13.382C14.1395 13 14.832 12.572 15.1708 11.8944L16.618 9H18C18.5523 9 19 9.44772 19 10V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V10ZM13.382 11L14.382 9H9.61803L10.618 11H13.382Z" fill="#0F0F0F"></path> <path d="M1 14C0.447715 14 0 14.4477 0 15V17C0 17.5523 0.447715 18 1 18C1.55228 18 2 17.5523 2 17V15C2 14.4477 1.55228 14 1 14Z" fill="#0F0F0F"></path> <path d="M22 15C22 14.4477 22.4477 14 23 14C23.5523 14 24 14.4477 24 15V17C24 17.5523 23.5523 18 23 18C22.4477 18 22 17.5523 22 17V15Z" fill="#0F0F0F"></path> </g></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Introduction to Robotics
              </h2>              
              <p className="text-gray-900 max-w-3xl mx-auto text-center mb-3">
                Groups of students work together to build different projects of their choice. Students have 5 different projects (Robot Kits, Crawler (Spider) Robots,
                Face Tracking, Color Sorter, or Sumo Robots) to choose from, and form 2 groups of 4-5 members per project. This is a 
                semi-guided group, with technical leads versed in the projects standing by to help groups when needed.
              </p>
            </div>

            {/* Industry Robotics Committee */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-300">
              <div className="mb-4 flex justify-center">
                <svg className="w-20 h-20" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path className="st0" d="M202.622,344.796l-6.208,11.926l-0.263,0.484c-14.411,24.499-41.026,39.714-69.478,39.714 c-14.272,0-28.371-3.847-40.731-11.122c-18.544-10.908-31.733-28.37-37.122-49.195c-0.238-0.886-0.434-1.78-0.632-2.674 L37.92,412.74h173.617L202.622,344.796z"></path> <path className="st0" d="M212.883,59.091L66.446,280.944c-19.578,33.283-8.465,76.172,24.844,95.749 c33.299,19.587,76.17,8.464,95.756-24.843l99.391-191.063l-54.788-52.082C217.361,93.974,212.497,77.52,212.883,59.091z M150.794,330.533c-7.808,13.288-24.909,17.716-38.188,9.916c-13.287-7.824-17.724-24.909-9.907-38.196 c7.808-13.288,24.909-17.716,38.187-9.908C154.165,300.161,158.611,317.254,150.794,330.533z"></path> <path className="st0" d="M216.401,422.247H34.278c-12.402,0-22.449,10.055-22.449,22.457V512h227.012v-67.296 C238.841,432.302,228.794,422.247,216.401,422.247z"></path> <path className="st0" d="M450.024,185.737c7.184,0,14.082,1.255,20.48,3.559L328.505,19.542c-22.646-24.606-60.956-26.188-85.554-3.535 c-24.606,22.637-26.18,60.949-3.535,85.546l149.955,142.458C390.65,211.663,417.356,185.737,450.024,185.737z M299.584,77.537 c-9.374,8.628-23.973,8.013-32.602-1.361c-8.645-9.375-8.038-23.974,1.345-32.603c9.375-8.644,23.974-8.038,32.619,1.346 C309.575,54.293,308.967,68.892,299.584,77.537z"></path> <polygon className="st0" points="431.668,365.227 451.246,387.249 470.815,365.227 470.815,328.975 431.668,328.975 "></polygon> <path className="st0" d="M450.024,196.292c-27.698,0-50.155,22.449-50.155,50.155v72.169h100.301v-72.169 C500.171,218.741,477.73,196.292,450.024,196.292z M450.024,264.492c-10.818,0-19.578-8.768-19.578-19.578 c0-10.818,8.76-19.586,19.578-19.586c10.81,0,19.586,8.767,19.586,19.586C469.61,255.723,460.835,264.492,450.024,264.492z"></path> </g> </g></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Industry Robotics
              </h2>              
              <p className="text-gray-900 max-w-3xl mx-auto text-center mb-3">
                Group of students working on complex robotics projects (Fully Autonomous Service robot) focusing on application in 
                industry. Works with the Industrial Makerspace for College of Science and Engineering (CoSE) on campus which provides lab space,
                tools, and development help. 
              </p>
            </div>

            {/* Rapid Prototyping Committee */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-300">
              <div className="mb-4 flex justify-center">
                <svg className="w-20 h-20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none"></rect> <g> <path d="M11.1 10L18 2 7 10h2l-7 8 11-8h-1.9zm-4.3 1H3.9l2.5-1.8 7.5-5.5L10 2 3 5v3c0 2 .5 3.9 1.5 5.6L6.8 11zm6.4-2H16l-2.4 1.8L6.5 16c1 .9 2.2 1.6 3.5 2 4.2-1.5 7.1-5.5 7-10V5l-.2-.1L13.2 9z"></path> </g> </g></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Rapid Prototyping
              </h2>              
              <p className="text-gray-900 max-w-3xl mx-auto text-center mb-3">
                Group of motivated students working on building projects in a &quot;rapid&quot; prototyping style. Quick prototyping,
                followed by testing and evaluation, allows for a fast-paced development of complex robotics projects (Autonomous drone and Couch robot).
              </p>
            </div>

          </div>
        </FadeIn>
      </Section>

      {/* Why you should join Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Image */}
          <SlideIn direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageSlideshow images={sliderImages.roboticsPage} />
            </div>
          </SlideIn>

          {/* Text Content */}
          <SlideIn direction="right">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why you should join
              </h2>
              <div className="w-40 h-1 bg-[#00629B] mb-6 rounded-full mx-auto" />
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Build real technical experience outside the classroom by developing robotics systems from concept to completion.
                  Members gain hands-on experience in debugging, teamwork, and system integration while working on projects that reflect real engineering environments.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Interested in designing and competing with a full-scale robot?
                  Join our IEEE Region 5 robotics competition team and collaborate
                  with students to build, test, and compete against universities
                  across the region.
                </p>

              {/* Competition Highlight */}
              <div className="bg-[#F8FAFC] border border-gray-200 p-5 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  IEEE Region 5 Robotics Competition
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Spring 2025:</strong> Top 8 Finalist out of 20 universities
                  <br />
                  <strong>Spring 2026:</strong> 2nd Place out of 24 universities
                </p>
              </div>

              <p className="font-semibold text-lg text-gray-900 leading-relaxed mb-4">
                Meeting Times & Locations:
              </p>

              {/* Meeting Info */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Intro</h4>
                  <p className="text-sm text-gray-700">Mondays at 6:30PM</p>
                  <p className="text-sm text-gray-600">Ingram Room 4104</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Industry</h4>
                  <p className="text-sm text-gray-700">Wednesdays at 6:30PM</p>
                  <p className="text-sm text-gray-600">Ingram Makerspace</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Rapid</h4>
                  <p className="text-sm text-gray-700">Fridays at 6:30PM</p>
                  <p className="text-sm text-gray-600">Ingram Makerspace</p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* RAS Branch Social Links Section */}
      <SocialLinks />

      {/* Officer Members Section */}
      {rasOfficers.length > 0 && (
        <Section className="bg-gray-50">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                RAS Officers
              </h2>
              <div className="w-24 h-1 bg-[#00629B] mx-auto rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {rasOfficers.map((officer, index) => (
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
