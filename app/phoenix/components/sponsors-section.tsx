"use client";
import PhoenixBg from "./phoenix-bg";

export default function SponsorsSection() {
  const sponsors = [
    {
      name: "Red Bull",
      logo: "/phoenix/sponsors/redbull.png",
      tag: "Official Sponsor",
    },
    {
      name: "Battleverse",
      logo: "/phoenix/sponsors/battleverse.png",
      tag: "Gaming Partner",
    },
    {
      name: "Identify",
      logo: "/phoenix/sponsors/idnetify.png",
      tag: "Innovation Partner",
    },
    {
      name: "Max Protein",
      logo: "/phoenix/sponsors/max-protien.png",
      tag: "Nutrition Partner",
    },
    {
      name: "Meta Mask",
      logo: "/phoenix/sponsors/meta-mask.png",
      tag: "Merch Partner",
    },
    {
      name: "Miro",
      logo: "/phoenix/sponsors/miro.png",
      tag: "Collaboration Partner",
    },
    {
      name: "Nextute",
      logo: "/phoenix/sponsors/nextute.png",
      tag: "Learning Partner",
    },
    {
      name: "OSEN",
      logo: "/phoenix/sponsors/OSEN-1.png",
      tag: "Technology Partner",
    },
  ];

  return (
    <div
      className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12 xl:min-h-screen xl:py-20" //bg-gradient-to-b from-[#0D261C] to-[#05100B]
      id="sponsors"
    >
      <PhoenixBg />

      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-20">
        <div className="mb-8 text-center sm:mb-10 md:mb-10 xl:mb-16 xl:pt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="hidden md:inline-block h-[2px] w-12 bg-emerald-400/70"></span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Our Sponsors
            </h2>
            <span className="hidden md:inline-block h-[2px] w-12 bg-emerald-400/70"></span>
          </div>
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto px-4">
            Powered by industry leaders who believe in innovation
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-emerald-500/15 blur-[90px]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name} className="group relative">
                <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-br from-emerald-300/25 via-amber-200/10 to-transparent opacity-50 blur-xl transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="relative h-[320px] md:h-[360px] rounded-[34px] overflow-hidden bg-[#07110d]/85 border border-emerald-300/25 shadow-[0_0_0_1px_rgba(16,185,129,0.12)] transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:border-amber-200/60 group-hover:shadow-[0_22px_60px_rgba(16,185,129,0.25)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] h-40 md:h-52 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl bg-emerald-100/5 border border-amber-200/20"></div>
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} Logo`}
                        className="relative z-10 w-full h-full object-contain px-4 md:px-6 drop-shadow-[0_14px_34px_rgba(245,158,11,0.25)] group-hover:scale-[1.05] transition-transform duration-700"
                      />
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-amber-100 transition-colors">
                        {sponsor.name}
                      </h3>
                      {sponsor.tag ? (
                        <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-100/80">
                          {sponsor.tag}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="absolute inset-x-10 bottom-6 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent opacity-70"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
