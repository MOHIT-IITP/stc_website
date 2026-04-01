"use client";

import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AppConfig from "@/config/appConfig";
import { coreTeam, councilMembers, developers } from "@/DataStore/store";


interface TeamMember {
  name: string;
  designation: string;
  department: string;
  image: string;
  email: string;
  linkedin: string;
  team?: string;
  description?: string;
}

function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  // Generate colors based on index for variety
  const colorThemes = [
    { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
    { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
    { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
    { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
  ];
  const colors = colorThemes[index % colorThemes.length];

  return (
    <motion.div
      key={index}
      className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-xl transform transition-all duration-500 group-hover:scale-105">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className = `w-full h-full flex items-center justify-center ${colors.bg}`;
                  fallback.textContent = member.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("");
                  fallback.style.color = "white";
                  fallback.style.fontWeight = "bold";
                  fallback.style.fontSize = "2rem";
                  target.parentNode?.insertBefore(fallback, target.nextSibling);
                }}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${colors.bg} text-white font-bold text-4xl`}
              >
                {member.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-[#2e86c1] mb-1 group-hover:translate-x-1 transition-transform duration-300">
                {member.name}
              </h3>
              <p className="text-lg font-medium text-muted-foreground mb-1">
                {member.designation}
              </p>
              <p className="text-sm font-semibold text-[#2e86c1] mb-4 inline-block px-3 py-1 rounded-full bg-[#e8f1f8] bg-opacity-80">
                {member.department}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed border-l-2 border-gray-200 pl-4 italic">
                "{member.description}"
              </p>
            </div>

            {member.team && (
              <p className="text-muted-foreground mb-6 leading-relaxed border-l-2 border-gray-200 pl-4 italic">
                {member.team} Team
              </p>
            )}

            {/* Contact Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={`mailto:${member.email}`}
                className="p-3 bg-[#e8f1f8] hover:bg-[#d4e5f5] text-[#2e86c1] rounded-lg transition-colors duration-300"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={member.linkedin}
                className="p-3 bg-[#e8f1f8] hover:bg-[#d4e5f5] text-[#2e86c1] rounded-lg transition-colors duration-300"
                aria-label={`${member.name}'s LinkedIn`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Core Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="
      text-4xl md:text-5xl font-extrabold 
      text-[#1d4ed8] 
      drop-shadow-sm 
      mb-4 tracking-tight
    "
            >
              Core Leadership Team
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The executive leadership providing strategic direction and
              governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {coreTeam.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* council Team */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="
      text-4xl md:text-5xl font-extrabold 
      text-[#1d4ed8] 
      drop-shadow-sm 
      mb-4 tracking-tight
    "
            >
              Council Team
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the council team of Student Technical Council IIT Patna
              Hybrid Programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {councilMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/*Developers*/}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="
       text-4xl md:text-5xl font-extrabold 
      text-[#1d4ed8] 
      drop-shadow-sm 
      mb-4 tracking-tight
    "
            >
              STC Developers
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the Core Developers of Student Technical Council IIT Patna
              Hybrid Programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {developers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
      <div>
        <div className="flex flex-col items-center justify-center py-16 relative">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
            More Positions Coming Soon
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          </h2>
          <p className="text-gray-500 text-base">Stay tuned for updates!</p>
        </div>
      </div>
      {/* Contact CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Connect with Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help with any questions about participation,
            collaboration, or Student Technical Council activities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
