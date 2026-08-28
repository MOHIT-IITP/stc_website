"use client";

import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button"
// import { ArrowRight, Users, Award, TrendingUp } from "lucide-react"
import Link from "next/link";
import AppConfig from "@/config/appConfig";

const heroImage = "/07.jpg";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 mt-8 w-full pb-28 sm:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-20 text-center w-full max-w-5xl mx-auto px-2 sm:px-4 transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Animated Logo/Badge */}
        <div className="mb-6 sm:mb-8 mt-4 flex justify-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center overflow-hidden">
            <img
              src="/images/stc-logo.jpg"
              alt="STC Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="font-space-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#0f2a4d] leading-[1.1] tracking-tight font-bold">
            Student Technical Council
          </h1>
          <h3 className="font-space-grotesk text-xl sm:text-1xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-[#1a4b8c] tracking-wide font-semibold">
            IIT Patna Hybrid Programs
          </h3>
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 font-medium text-[#2c5282] tracking-normal leading-relaxed">
          Empowering Students Through Innovation
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
          A reimagined platform with three specialized wings -{" "}
          <span className="text-[#1a4b8c] font-semibold">
            <b>DISHA</b>, <b>ARTHNITI</b>,
          </span>{" "}
          and{" "}
          <span className="text-[#1a4b8c] font-semibold">
            <b>TATVA</b>
          </span>{" "}
          - fostering career development, entrepreneurship, and technological
          innovation at IIT Patna.
        </p>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-6 sm:mb-8">
          {[
            { label: "Active Wings", value: "3", icon: "" },
            { label: "Sub-Clubs", value: "24+", icon: "" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`relative rounded-3xl bg-white/50 p-3 sm:p-4 shadow-lg transform transition-all duration-500 hover:scale-105 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } group`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Glowing background effect on hover */}
              <div
                className="pointer-events-none z-2 absolute inset-0 border-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(69,60,213,0.05) 0%, rgba(69,60,213,0.10) 60%, transparent 100%)",
                  filter: "blur(30px)",
                }}
              />
              <div className="relative z-10 bg-transparent rounded-3xl backdrop-blur-sm">
                <div className="z-9 text-xl sm:text-2xl mb-2">{stat.icon}</div>
                <div className="z-9 text-xl sm:text-2xl md:text-3xl font-bold text-[#1a4b8c] mb-1">
                  {stat.value}
                </div>
                <div className="z-9 text-xs sm:text-sm text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
