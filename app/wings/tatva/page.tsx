"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Globe,
  Palette,
  Smartphone,
  BarChart,
  Brain,
  Shield,
  Trophy,
  ArrowRight,
  Mail,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const subClubs = [
  {
    name: "WebWiser",
    subtitle: "Web Development Club",
    description:
      "Hands-on workshops and projects on modern web technologies, frameworks, and full-stack development.",
    logo: "/DomainCards/WebWiser.png",
    icon: Globe,
    activities: [
      "React/Next.js workshops",
      "Backend development",
      "Full-stack projects",
      "Web design principles",
    ],
  },
  {
    name: "Pixelerate",
    subtitle: "Design Club",
    description:
      "Training and projects in UI/UX design, graphic design, and visual communication skills.",
    logo: "/DomainCards/Pixel.png",
    icon: Palette,
    activities: [
      "UI/UX design",
      "Graphic design",
      "Design thinking",
      "Prototyping tools",
    ],
  },
  {
    name: "Appistry",
    subtitle: "App Development Club",
    description:
      "Developing mobile applications with coding challenges and comprehensive development workshops.",
    logo: "/DomainCards/App.png",
    icon: Smartphone,
    activities: [
      "Mobile app development",
      "Cross-platform solutions",
      "App store deployment",
      "User experience design",
    ],
  },
  {
    name: "Analytical Arena",
    subtitle: "Data Analytics & Science Club",
    description:
      "Teaching data analysis, visualization, and interpretation using modern tools and techniques.",
    logo: "/DomainCards/Arena.png",
    icon: BarChart,
    activities: [
      "Data analysis",
      "Machine learning",
      "Data visualization",
      "Statistical modeling",
    ],
  },
  {
    name: "Synapse",
    subtitle: "AI, ML & Deep Learning Club",
    description:
      "Exploring artificial intelligence and machine learning through hands-on projects and research.",
    logo: "/DomainCards/Synapse.png",
    icon: Brain,
    activities: [
      "AI/ML projects",
      "Deep learning",
      "Neural networks",
      "Research initiatives",
    ],
  },
  {
    name: "HackShield",
    subtitle: "Cybersecurity Club",
    logo: "/DomainCards/Hack.png",
    description:
      "Promoting ethical hacking, cybersecurity awareness, and information security skills.",
    icon: Shield,
    activities: [
      "Ethical hacking",
      "Security audits",
      "CTF competitions",
      "Cybersecurity awareness",
    ],
  },
  {
    name: "CodeRED",
    subtitle: "Competitive Programming Club",
    description:
      "Enhancing algorithmic problem-solving skills through contests, practice sessions, and competitions.",
    logo: "/DomainCards/CodeRed.png",
    icon: Trophy,
    activities: [
      "Coding contests",
      "Algorithm training",
      "Problem solving",
      "Programming competitions",
    ],
  },
  {
    name: "Mech-X",
    subtitle: "Robotics Club",
    description:
      "Building and programming robots through competitions and practical learning experiences.",
    logo: "/DomainCards/Robot.png",
    icon: Code,
    activities: [
      "Robot building",
      "Arduino/Raspberry Pi",
      "Automation projects",
      "Robotics competitions",
    ],
  },
  {
    name: "Tech Hub",
    subtitle: "Tech News & Updates Club",
    description:
      "Tech News Hub, your centralized platform for staying updated with the latest tech stories, trends, and breakthroughs. Be informed, be inspired, and be ahead!",
    logo: "/DomainCards/News.png",
    icon: Newspaper,
    activities: [
      "Latest tech news",
      "Daily technology updates",
      "Trends, breakthroughs and stories",
      "Be informed, be inspired, be ahead!",
    ],
  },
];

export default function TatvaPage() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, #0D9488 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
            {/* Content */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-teal-100 text-teal-800 border border-teal-200 mb-6">
                <Code className="w-4 h-4 mr-2" />
                <span className="tracking-wider">
                  TECHNOLOGY & RESEARCH CELL
                </span>
              </div>

              {/* Mobile Layout - Logo above text */}
              <div className="lg:hidden mb-6">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/tatva_nobg.png"
                    alt="TATVA Logo"
                    width={120}
                    height={120}
                    className="w-28 h-28 md:w-28 md:h-248object-contain"
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                  <span className="text-[#0d9488]">TATVA</span>
                  <br />
                  <span className="text-lg md:text-xl font-medium text-gray-600 mt-2 block">
                    Innovation Through Technology
                  </span>
                </h1>
              </div>

              {/* Desktop Layout - Logo and text side by side */}
              <div className="hidden lg:flex items-center justify-start mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  <span className="text-[#0d9488]">TATVA</span> - Innovation
                  Through Technology
                </h1>
              </div>

              <div className="mt-4">
                <a
                  href="mailto:tatva@iitp.ac.in"
                  className="inline-flex items-center text-sm bg-[#e6f7f5] hover:bg-[#ccf0eb] text-[#0d9488] px-3 py-1.5 rounded-full border border-[#99f6e4] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  tatva@iitp.ac.in
                </a>
              </div>

              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                We foster technical excellence and research innovation through
                hands-on projects, workshops, and collaborative learning in
                cutting-edge technologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("sub-clubs")}
                  className="bg-[#0d9488] hover:bg-[#0f766e] text-white transition-colors w-full sm:w-auto"
                  size="lg"
                >
                  Explore Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => scrollToSection("about")}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* TATVA Logo Image - Hidden on mobile, visible on lg screens and up */}
            <div className="hidden lg:block relative w-full max-w-md">
              <div className="w-full bg-transparent flex items-center justify-center p-2">
                <div className="relative w-full flex items-center justify-center">
                  <Image
                    src="/images/tatva_nobg.png"
                    alt="TATVA Logo"
                    width={800}
                    height={800}
                    priority
                    className="w-full h-auto object-contain rounded-lg"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238B5CF6'%3E%3Cpath d='M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.8L18 10v9h-2v-6H8v6H6v-9l6-5.2z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About TATVA */}
      <section className="py-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About TATVA
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                TATVA is the dedicated wing of the Student Technical Council
                that aims to nurture technical expertise and promote a
                research-oriented mindset among students. It serves as a vibrant
                platform for students to explore emerging technologies, engage
                in innovative projects, and develop problem-solving skills.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Through workshops, seminars, hackathons, and collaborative
                research initiatives, TATVA bridges the gap between academic
                learning and real-world technology applications. It connects
                students with industry experts, researchers, and tech
                communities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This helps cultivate creativity, critical thinking, and a
                passion for continuous learning, empowering students to become
                future-ready technologists and innovators in fields like AI, ML,
                Web3, cybersecurity, and more.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#49cfbc] to-[#e6f7f5] rounded-3xl border-2 border-[#99f6e4] p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Technology Domains
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-[#0d9488] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Web and Mobile Development
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-[#0d9488] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Artificial Intelligence & Machine Learning
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-[#0d9488] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Data Science & Analytics
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-[#0d9488] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Cybersecurity & Ethical Hacking
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-[#0d9488] rounded-full mr-4"></div>
                  <span className="text-gray-700">Robotics & Automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub Clubs */}
      <section className="py-20" id="sub-clubs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              TATVA Sub-Clubs
            </h2>
            <p className="text-xl text-gray-600">
              Specialized technology clubs covering cutting-edge domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subClubs.map((club) => {
              const IconComponent = club.icon;
              return (
                <Link
                  href={`/wings/tatva/subclubs/${club.name.toLowerCase().replace(/\s+/g, "-")}`}
                  key={club.name}
                >
                  <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-teal-200 hover:border-teal-400 cursor-pointer">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 text-teal-600">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {club.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {club.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 flex-1">
                        {club.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Key Activities:
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {club.activities.slice(0, 3).map((activity, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-teal-600 mr-2">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-teal-600 font-medium text-sm">
                        <span>Learn more</span>
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Dive into Technology?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join TATVA and explore the cutting-edge world of technology and
            innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/participation">
              <Button
                size="lg"
                className="bg-white text-[#0d9488] hover:bg-gray-100 px-8 py-3 text-lg hover:text-[#0f766e]"
              >
                Join TATVA
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0d9488] px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
