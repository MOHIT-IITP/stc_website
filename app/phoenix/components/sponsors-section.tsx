"use client";
import PhoenixBg from "./phoenix-bg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function SponsorsSection() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const items = Array.from(container.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );

    if (!items.length) {
      return;
    }

    const currentLeft = container.scrollLeft;
    let currentIndex = 0;

    for (let index = 0; index < items.length; index += 1) {
      if (items[index].offsetLeft <= currentLeft + 2) {
        currentIndex = index;
      } else {
        break;
      }
    }

    const targetIndex =
      direction === "left"
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, items.length - 1);

    container.scrollTo({
      left: items[targetIndex].offsetLeft,
      behavior: "smooth",
    });
  };

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
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 sm:hidden">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll sponsors left"
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg shadow-black/25 backdrop-blur-md transition-transform duration-200 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll sponsors right"
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg shadow-black/25 backdrop-blur-md transition-transform duration-200 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-1 sm:overflow-visible sm:pb-0 md:grid-cols-2 lg:grid-cols-3 md:gap-8 sm:snap-none snap-x snap-mandatory scroll-smooth touch-pan-x"
            >
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className="group relative flex-none w-[85vw] max-w-[20rem] snap-start sm:w-full sm:max-w-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_60%)] opacity-0 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none filter group-hover:blur-2xl"></div>

                  <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] h-40 md:h-52 flex items-center justify-center">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-36 md:w-48 h-36 md:h-48 rounded-full opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-105 transition-all duration-700 pointer-events-none filter blur-4xl bg-[radial-gradient(circle,rgba(245,158,11,0.55)_0%,rgba(245,158,11,0.28)_40%,transparent_75%)]"></div>
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

                  <div className="absolute inset-x-10 bottom-6 h-px bg-linear-to-r from-transparent via-amber-200/60 to-transparent opacity-70"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
