"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import PhoenixBg from "./phoenix-bg";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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
    img: "/phoenix/events/badminton.png",
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
    img: "/phoenix/events/treasure-hunt.svg",
    phoenixTitle: "TREASURE HUNT",
  },
  {
    title: "Volleyball Tournament",
    img: "/phoenix/events/volleyball.png",
    phoenixTitle: "VOLLEYBALL TOURNAMENT",
  },
  {
    title: "Pixel Pulse",
    img: "/phoenix/events/Pixelerate.svg",
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
            Boolean(event.phoenixTitle?.trim())
        )
        .map((event) => {
          const featuredEvent = FEATURED_EVENTS.find(
            (item) =>
              item.phoenixTitle.toLowerCase() ===
              event.phoenixTitle?.trim().toLowerCase()
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
            event.img !== "" && event.phoenixTitle !== ""
        ),
    [events]
  );

  return (
    <section
      id="events"
      className="relative min-h-screen w-screen overflow-hidden text-white"
      // style={{
      //   background:
      //     "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      // }}
    >
      <PhoenixBg />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 tracking-tight">
        {/* Section Title */}
        <motion.div
          className="max-w-5xl w-full mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Events
          </h2>
          <p className="text-lg text-[#D1D5DC]">
            Explore the exciting events happening at Phoenix
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {featuredEvents.map((event, id) => {
            return (
              <motion.div
                key={event._id}
                className="group relative w-full lg:w-[105%] xl:w-[108%] h-130 overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (id % 4) * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Image
                  src={event.img}
                  alt={event.title}
                  width={400}
                  height={60}
                  className="w-full h-full object-contain rounded-xl"
                />

                {/* Register Button */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 pb-18 sm:pb-10 lg:pb-25">
                  {event.redirectLink && event.redirectLabel && event.redirectLabel !== "" && (
                    <Link
                      href={event.redirectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-black backdrop-blur-md transition-all duration-300 bg-[#d2b56d] "
                    >
                      {event.redirectLabel}
                    </Link>
                  )}

                  {event.resourcesLink && event.resourcesLabel && event.resourcesLabel !== "" && (
                    <Link
                      href={event.resourcesLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-black backdrop-blur-md transition-all duration-300 bg-[#059669] hover:bg-[#047857]"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      <span className="font-bold">{event.resourcesLabel}</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
