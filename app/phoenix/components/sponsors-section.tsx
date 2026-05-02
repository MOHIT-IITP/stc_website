"use client";
import PhoenixBg from "./phoenix-bg";

export default function SponsorsSection() {
  const sponsors = [
    { name: "Red Bull", logo: "/xenith/sponsor/redbull.png" },
    { name: "Physics Wallah", logo: "/xenith/sponsor/pw.jpg" },
    { name: "Incubation Center-IITP", logo: "/xenith/sponsor/ic-iitp.png" },
    { name: "Adshree", logo: "/xenith/sponsor/adshree.png" },
    { name: "Apka Ads", logo: "/xenith/sponsor/apkaads.png" },
    { name: "Flutterflow", logo: "/xenith/sponsor/flutterflow.jpg" },
  ];

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-[#0D261C] to-[#05100B] relative overflow-hidden py-20"
      id="sponsor"
    >
      <PhoenixBg />

      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-20">
        <div className="text-center mb-12 md:mb-16 pt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Our Sponsors
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Powered by industry leaders who believe in innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <a
  href="#contact"
  className="group relative md:col-span-2 lg:col-span-1 cursor-pointer"
>
  <div className="relative h-[300px] md:h-[350px] bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-lime-400/5 backdrop-blur-md rounded-xl overflow-hidden border border-green-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/20 hover:scale-105">
    
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-emerald-500/15 to-lime-400/10 group-hover:from-green-400/25 group-hover:via-emerald-500/25 group-hover:to-lime-400/20 transition-all duration-500"></div>

    <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-white/90 mb-2 group-hover:text-green-300 transition-colors">
        Your Brand Here
      </h3>

      <p className="text-white/60 text-xs md:text-sm text-center mb-4 max-w-[240px]">
        Be part of the xenith. Add yourself as a sponsor and empower the next generation of tech leaders.
      </p>

      <div className="flex items-center gap-2 text-green-300 font-medium text-sm md:text-base">
        <span>Become a Sponsor</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>

    <div className="absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 border-t border-l border-green-300/50"></div>
    <div className="absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 border-t border-r border-green-300/50"></div>
    <div className="absolute bottom-2 left-2 w-3 h-3 md:w-4 md:h-4 border-b border-l border-green-300/50"></div>
    <div className="absolute bottom-2 right-2 w-3 h-3 md:w-4 md:h-4 border-b border-r border-green-300/50"></div>
  </div>
</a>
        </div>
      </div>
    </div>
  );
}
