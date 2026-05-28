"use client";
import PhoenixBg from "./phoenix-bg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function SponsorsSection() {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollRail = (direction: number) => {
    const container = railRef.current;

    if (!container) {
      return;
    }

    const card = container.querySelector<HTMLElement>("[data-rail-card]");
    const step =
      card?.offsetWidth ?? Math.min(container.clientWidth * 0.85, 320);

    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

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
      name: "Idnetify",
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
      tag: "Event Partner",
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Our Sponsors
            </h2>
          </div>
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto px-4">
            Powered by industry leaders who believe in innovation
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-emerald-500/15 blur-[90px]"></div>

          <div className="relative">
            <button
              type="button"
              aria-label="Scroll sponsors left"
              onClick={() => scrollRail(-1)}
              className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white shadow-lg shadow-black/25 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-slate-900 sm:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Scroll sponsors right"
              onClick={() => scrollRail(1)}
              className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white shadow-lg shadow-black/25 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-slate-900 sm:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 touch-pan-x overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] sm:grid sm:grid-cols-1 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-2 lg:grid-cols-3 md:gap-8 sm:snap-none scroll-smooth [&::-webkit-scrollbar]:hidden"
            >
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  data-rail-card
                  className="group relative flex-none w-[calc(100vw-4rem)] max-w-[20rem] snap-center snap-always sm:w-full sm:max-w-none"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_60%)] opacity-0 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none filter group-hover:blur-2xl"></div>

                  <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] h-40 md:h-52 flex items-center justify-center">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-36 md:w-48 h-36 md:h-48 rounded-full opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-105 transition-all duration-700 pointer-events-none filter blur-4xl bg-[radial-gradient(circle,rgba(245,158,11,0.55)_0%,rgba(245,158,11,0.28)_40%,transparent_75%)]"></div>
                      <Image
                        height={208}
                        width={320}
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
                </div>
              ))}
              <div aria-hidden="true" className="shrink-0 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
