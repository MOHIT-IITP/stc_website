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
          {sponsors.map((sponsor, index) => (
            <div key={index} className="group relative">
              <div className="relative h-[300px] md:h-[350px] bg-gradient-to-br from-[#1a3a2e]/90 to-[#0f2618]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#1C3F35]/40 transition-all duration-500 hover:border-[#1C3F35] hover:shadow-2xl hover:shadow-[#1C3F35]/40 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F35]/0 via-[#1C3F35]/0 to-[#1C3F35]/0 group-hover:from-[#1C3F35]/20 group-hover:via-[#1C3F35]/10 group-hover:to-transparent transition-all duration-500"></div>

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#1C3F35] opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#1C3F35] opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#1C3F35] opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#1C3F35] opacity-60 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 pt-20">
                  <div className="relative mb-4 md:mb-6">
                    <div className="absolute inset-0 bg-[#1C3F35]/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[#0a3a2a]/60 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-[#1C3F35]/40 group-hover:border-[#1C3F35]/70 transition-all duration-500 overflow-hidden">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Company name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transition-colors duration-300">
                    {sponsor.name}
                  </h3>

                  <p className="text-gray-400 text-sm md:text-base text-center mb-4 transition-colors">
                    Official Sponsor
                  </p>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-[#1C3F35]/0 group-hover:border-[#1C3F35]/30 group-hover:scale-105 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
