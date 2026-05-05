import Image from "next/image";
import Link from "next/link";
import PhoenixBg from "./phoenix-bg";

export default function FeaturedEvents() {
  const events = [
    {
      id: 11,
      title: "Hack N Tech",
      img: "/phoenix/events/hack-n-tech.png",
      registerLink: "/registration/event11",
    },
    {
      id: 2,
      title: "BGMI Tournament",
      img: "/phoenix/events/bgmi.png",
      registerLink: "/registration/event2",
    },
    {
      id: 9,
      title: "Free Fire Tournament",
      img: "/phoenix/events/freefire.png",
      registerLink: "/registration/event9",
    },
    {
      id: 12,
      title: "Idea Station",
      img: "/phoenix/events/idea-station.png",
      registerLink: "/registration/event12",
    },
    {
      id: 5,
      title: "Code Kshetra",
      img: "/phoenix/events/code-kshetra.png",
      registerLink: "/registration/event5",
    },
    {
      id: 1,
      title: "Girs Badminton Tournament",
      img: "/phoenix/events/badminton.png",
      registerLink: "/registration/event1",
    },
    {
      id: 3,
      title: "Capture The Flag",
      img: "/phoenix/events/capture-the-flag.png",
      registerLink: "/registration/event3",
    },
    {
      id: 4,
      title: "Chess Tournament",
      img: "/phoenix/events/chess.png",
      registerLink: "/registration/event4",
    },
    {
      id: 6,
      title: "Cricket Tournament",
      img: "/phoenix/events/cricket.png",
      registerLink: "/registration/event6",
    },
    {
      id: 7,
      title: "Football Tournament",
      img: "/phoenix/events/football.png",
      registerLink: "/registration/event7",
    },
    {
      id: 8,
      title: "Founder Session",
      img: "/phoenix/events/founder-session.png",
      registerLink: "/registration/event8",
    },
    {
      id: 10,
      title: "Guest Session",
      img: "/phoenix/events/guest-session.png",
      registerLink: "/registration/event10",
    },
    {
      id: 13,
      title: "Startup Showcase",
      img: "/phoenix/events/startup-showcase.png",
      registerLink: "/registration/event13",
    },
    {
      id: 14,
      title: "Treasure Hunt",
      img: "/phoenix/events/treasure-hunt.png",
      registerLink: "/404-not-found",
    },
    {
      id: 15,
      title: "Volleyball Tournament",
      img: "/phoenix/events/volleyball.png",
      registerLink: "/registration/event15",
    },
  ];

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
        <div className="max-w-5xl w-full mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Events
          </h2>
          <p className="text-lg text-[#D1D5DC]">
            Explore the exciting events happening at Phoenix
          </p>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {events.map((event) => {
            const isExternal = String(event.registerLink).startsWith("http");
            return (
              <div
                key={event.id}
                className="group relative w-full h-110 overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={event.img}
                  alt={event.title}
                  width={400}
                  height={620}
                  className="w-full h-full object-cover japanese-blur rounded-xl"
                />

                {/* Register Button */}
                {/* <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-8 sm:pb-10 lg:pb-14">
                  <Link
                    href={event.registerLink}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-black backdrop-blur-md transition-all duration-300 bg-[#d2b56d] "
                  >
                    Register Now
                  </Link>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
