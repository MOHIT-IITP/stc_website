"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import PhoenixBg from "./phoenix-bg";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface Event {
  _id: string;
  title: string;
  imageUrl?: string;
  club?: string;
  phoenixTitle?: string;
  rulebook?: string;
  registerLink?: string;
  redirectLink?: string;
  redirectLabel?: string;
  resourcesLink?: string;
  resourcesLabel?: string;
}

interface FeaturedEvent {
  title: string;
  img: string;
  phoenixTitle: string;
}

type PhoenixEvent = Event & {
  img: string;
  phoenixTitle: string;
};

const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    title: "Hack N Tech",
    img: "/phoenix/events/hack-n-tech.png",
    phoenixTitle: "Hack & Tech",
  },
  {
    title: "BGMI Tournament",
    img: "/phoenix/events/bgmi.png",
    phoenixTitle: "BGMI",
  },
  {
    title: "Client Experience",
    img: "/phoenix/events/client-experience.png",
    phoenixTitle: "CLIENT EXPERIENCE",
  },
  {
    title: "Chess Tournament 2",
    img: "/phoenix/events/Chess-2.png",
    phoenixTitle: "Chess Tournament 2",
  },
  {
    title: "Free Fire Tournament",
    img: "/phoenix/events/freefire.png",
    phoenixTitle: "FREE FIRE",
  },
  {
    title: "Idea Station",
    img: "/phoenix/events/idea-station.png",
    phoenixTitle: "IDEA",
  },
  {
    title: "Code Kshetra",
    img: "/phoenix/events/code-kshetra.png",
    phoenixTitle: "CODE",
  },
  {
    title: "Girs Badminton Tournament",
    img: "/phoenix/events/girls-badminton.png",
    phoenixTitle: "BADMINTON",
  },
  {
    title: "Capture The Flag",
    img: "/phoenix/events/capture-the-flag.png",
    phoenixTitle: "CAPTURE THE FLAG",
  },
  {
    title: "Chess Tournament",
    img: "/phoenix/events/chess.png",
    phoenixTitle: "CHESS",
  },
  {
    title: "Cricket Tournament",
    img: "/phoenix/events/cricket.png",
    phoenixTitle: "CRICKET",
  },
  {
    title: "Football Tournament",
    img: "/phoenix/events/football.png",
    phoenixTitle: "FOOTBALL",
  },
  {
    title: "Founder Session",
    img: "/phoenix/events/founder-session.png",
    phoenixTitle: "FOUNDER SESSION",
  },
  {
    title: "Guest Session",
    img: "/phoenix/events/guest-session.png",
    phoenixTitle: "GUEST SESSION",
  },
  {
    title: "Startup Showcase",
    img: "/phoenix/events/startup-showcase.png",
    phoenixTitle: "STARTUP SHOWCASE",
  },
  {
    title: "Treasure Hunt",
    img: "/phoenix/events/treasure-hunt.png",
    phoenixTitle: "TREASURE HUNT",
  },
  {
    title: "Volleyball Tournament",
    img: "/phoenix/events/volleyball.png",
    phoenixTitle: "VOLLEYBALL TOURNAMENT",
  },
  {
    title: "Pixel Pulse",
    img: "/phoenix/events/Pixel-Pulse.png",
    phoenixTitle: "PIXEL PULSE",
  },
  {
    title: "Tea and Talk",
    img: "/phoenix/events/tea-and-talk.png",
    phoenixTitle: "TEA & TALK",
  },
];

export default function FeaturedEvents() {
  const [events, setEvents] = useState([] as Event[]);
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = useMemo(
    () =>
      events
        .filter(
          (event) =>
            event.club?.trim().toLowerCase() === "phoenix" &&
            Boolean(event.phoenixTitle?.trim()),
        )
        .map((event) => {
          const featuredEvent = FEATURED_EVENTS.find(
            (item) =>
              item.phoenixTitle.toLowerCase() ===
              event.phoenixTitle?.trim().toLowerCase(),
          );

          return {
            ...event,
            title: featuredEvent?.title ?? event.title,
            img: featuredEvent?.img ?? event.imageUrl ?? "",
            phoenixTitle: event.phoenixTitle?.trim() ?? "",
          };
        })
        .filter(
          (event): event is PhoenixEvent =>
            event.img !== "" && event.phoenixTitle !== "",
        ),
    [events],
  );

  return (
    <section
      id="events"
      className="relative w-full overflow-x-clip overflow-y-hidden text-white xl:min-h-screen"
      // style={{
      //   background:
      //     "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      // }}
    >
      <PhoenixBg />

      {/* Foreground Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-start px-4 py-8 tracking-tight sm:px-6 sm:py-10 md:py-8 lg:px-8 xl:min-h-screen xl:justify-center xl:py-16">
        {/* Section Title */}
        <motion.div
          className="mb-8 w-full max-w-5xl text-center sm:mb-10 md:mb-8 xl:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Featured Events
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#D1D5DC] sm:text-lg">
            Explore the exciting events happening at Phoenix
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="relative w-full max-w-368">
          <button
            type="button"
            aria-label="Scroll featured events left"
            onClick={() => scrollRail(-1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white shadow-lg shadow-black/25 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-slate-900 sm:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Scroll featured events right"
            onClick={() => scrollRail(1)}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white shadow-lg shadow-black/25 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-slate-900 sm:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={railRef}
            className="flex w-full gap-5 overflow-x-auto overflow-y-hidden px-[9vw] pb-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-6 lg:grid-cols-4 xl:gap-10 sm:snap-none snap-x snap-mandatory scroll-smooth touch-pan-x [&::-webkit-scrollbar]:hidden"
          >
            {featuredEvents.map((event, id) => {
              return (
                <motion.div
                  key={event._id}
                  data-rail-card
                  className="group relative aspect-300/443 flex-none w-[calc(100vw-4rem)] max-w-[20rem] snap-center snap-always overflow-hidden rounded-lg transition-transform duration-300 sm:w-full sm:max-w-84 xl:max-w-88"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: (id % 4) * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1280px) 22rem, (min-width: 640px) 21rem, min(100vw - 2rem, 20rem)"
                    className="object-contain"
                  />

                  {/* Register Button */}
                  <div className="absolute left-1/2 z-10 flex w-fit max-w-[calc(100%-1rem)] -translate-x-1/2 flex-row items-center justify-center gap-1.5 whitespace-nowrap bottom-[clamp(3rem,16%,6.25rem)] sm:max-w-[calc(100%-1.5rem)] sm:gap-2">
                    {event.redirectLink &&
                      event.redirectLabel &&
                      event.redirectLabel !== "" && (
                        <Link
                          href={event.redirectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-9 flex-none items-center justify-center overflow-hidden rounded-full border border-white/25 bg-[#d2b56d] px-3 py-2 text-[clamp(0.6rem,1.8vw,0.78rem)] font-semibold leading-none text-black backdrop-blur-md transition-all duration-300 sm:px-4"
                        >
                          <span className="truncate">
                            {event.redirectLabel}
                          </span>
                        </Link>
                      )}

                    {event.resourcesLink &&
                      event.resourcesLabel &&
                      event.resourcesLabel !== "" && (
                        <Link
                          href={event.resourcesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-9 flex-none items-center justify-center overflow-hidden rounded-full border border-white/25 bg-[#059669] px-3 py-2 text-[clamp(0.58rem,1.7vw,0.7rem)] font-semibold leading-none text-black backdrop-blur-md transition-all duration-300 hover:bg-[#047857] sm:px-4"
                        >
                          <Download className="mr-1 h-3.5 w-3.5 shrink-0" />
                          <span className="truncate font-bold">
                            {event.resourcesLabel}
                          </span>
                        </Link>
                      )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
