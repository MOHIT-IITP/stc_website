"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PhoenixBg from "./phoenix-bg";

const glimpses = [
  {
    id: 1,
    image: "/phoenix/glimpses/glimpse1.png",
    title: "The Grand Hackathon",
    description: "Wizards of code competing through the night",
  },
  {
    id: 2,
    image: "/phoenix/glimpses/glimpse2.png",
    title: "Robotics Arena",
    description: "Where mechanical spells came alive",
  },
  {
    id: 3,
    image: "/phoenix/glimpses/glimpse3.png",
    title: "Guest Lecture",
    description: "The Great Hall illuminated with knowledge",
  },
  {
    id: 4,
    image: "/phoenix/glimpses/glimpse4.png",
    title: "The Grand Finale",
    description: "A celebration of magical innovation",
  },
];

export default function PastGlimpses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % glimpses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const child = scrollRef.current.children[activeIndex] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({
          left: child.offsetLeft - scrollRef.current.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <section
      id="glimpses"
      className="relative w-full overflow-hidden text-white py-24"
      style={{
        background: "radial-gradient(ellipse at 50% 100%, #0D261C 0%, #05100B 70%)",
      }}
    >
      <PhoenixBg />

      <div className="relative z-10 w-full flex flex-col items-center px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/50" />
            <span className="text-xs tracking-[0.4em] text-emerald-400/70 uppercase font-medium">
              Memories
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500/50" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-white">Past </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">
              Glimpses
            </span>
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Relive the magical moments from our previous editions
          </p>
        </div>

        {/* Main Image */}
        <div className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden mb-8 group">
          {glimpses.map((g, i) => (
            <div
              key={g.id}
              className="absolute inset-0 transition-all duration-1000"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? "scale(1)" : "scale(1.05)",
              }}
            >
              <Image
                src={g.image}
                alt={g.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b09] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020b09]/50 via-transparent to-[#020b09]/50" />
            </div>
          ))}

          {/* Active content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
            <div className="transition-all duration-700">
              <h3
                className="text-2xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {glimpses[activeIndex].title}
              </h3>
              <p className="text-white/60 text-sm md:text-base">
                {glimpses[activeIndex].description}
              </p>
            </div>
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl border border-emerald-500/15 group-hover:border-emerald-500/30 transition-colors duration-500" />
        </div>

        {/* Thumbnails */}
        <div ref={scrollRef} className="flex gap-4 max-w-5xl w-full overflow-x-auto scrollbar-hide pb-2">
          {glimpses.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-32 h-20 md:w-48 md:h-28 rounded-xl overflow-hidden transition-all duration-500 ${
                i === activeIndex
                  ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#020b09] scale-105"
                  : "opacity-50 hover:opacity-80 grayscale hover:grayscale-0"
              }`}
            >
              <Image
                src={g.image}
                alt={g.title}
                fill
                className="object-cover"
                sizes="200px"
              />
              {i === activeIndex && (
                <div className="absolute inset-0 bg-emerald-500/10" />
              )}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {glimpses.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
              style={{ width: i === activeIndex ? "32px" : "8px" }}
            >
              <div className={`absolute inset-0 rounded-full ${
                i === activeIndex
                  ? "bg-gradient-to-r from-emerald-400 to-green-400"
                  : "bg-white/20"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
