import PhoenixBg from "./phoenix-bg";

export default function FeaturedEvents() {
  const events = [
    {
      id: 1,
      title: "AI Workshop",
      image: "#",
    },
    {
      id: 2,
      title: "Web3 Summit",
      image: "#",
    },
    {
      id: 3,
      title: "Hackathon",
      image: "#",
    },
    {
      id: 4,
      title: "Tech Talk",
      image: "#",
    },
  ];

  return (
    <section
      id="event"
      className="relative min-h-screen w-screen overflow-hidden text-white font-sans pt-20"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      }}
    >
      <PhoenixBg />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 tracking-tight">
        {/* Section Title */}
        <div className="max-w-5xl w-full mb-16 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Featured Events
          </h2>
          <p
            className="text-lg text-[#D1D5DC]"
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Explore the exciting events happening at Phoenix
          </p>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative w-full aspect-[9/13] group cursor-pointer"
              style={{
                backgroundImage: "url('/phoenix/Eventcard.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
