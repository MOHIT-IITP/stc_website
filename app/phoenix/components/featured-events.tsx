import Image from "next/image";
import PhoenixBg from "./phoenix-bg";
import AppConfig from "@/config/appConfig";

export default function FeaturedEvents() {
  const events = [
    { id: 1, title: "Event 1", img: "/phoenix/events/event1.png" },
    { id: 2, title: "Event 2", img: "/phoenix/events/event2.png" },
    { id: 3, title: "Event 3", img: "/phoenix/events/event3.png" },
    { id: 4, title: "Event 4", img: "/phoenix/events/event4.png" },
    { id: 5, title: "Event 5", img: "/phoenix/events/event5.png" },
    { id: 6, title: "Event 6", img: "/phoenix/events/event6.png" },
    { id: 7, title: "Event 7", img: "/phoenix/events/event7.png" },
    { id: 8, title: "Event 8", img: "/phoenix/events/event8.png" },
    { id: 9, title: "Event 9", img: "/phoenix/events/event9.png" },
    { id: 10, title: "Event 10", img: "/phoenix/events/event10.png" },
    { id: 11, title: "Event 11", img: "/phoenix/events/event11.png" },
    { id: 12, title: "Event 12", img: "/phoenix/events/event12.png" },
    { id: 13, title: "Event 13", img: "/phoenix/events/event13.png" },
    { id: 14, title: "Event 14", img: "/phoenix/events/event14.png" },
    { id: 15, title: "Event 15", img: "/phoenix/events/event15.png" },
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
          {events.map((event) => (
            <div
              key={event.id}
              className="w-full h-110 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={event.img}
                alt={event.title}
                width={400}
                height={620}
                className="w-full h-full object-cover japanese-blur rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
