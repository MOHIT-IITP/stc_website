"use client";

export default function MarqueeSection() {
  return (
    <section className="relative w-full py-8 overflow-hidden">

      {/* Glass background strip */}
      {/* <div className="absolute inset-0 bg-[#020b09]/60 backdrop-blur-md" />

      {/* Top teal glow */}
      {/* <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-[#10b981]/20 to-transparent pointer-events-none" /> */}

      {/* Bottom fade */}
      <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full overflow-hidden">

        <h2 className="whitespace-nowrap text-[clamp(1.2rem,5vw,4rem)] font-extrabold uppercase tracking-normal sm:tracking-widest md:tracking-[0.2em] 
        bg-gradient-to-r from-[#48645D] via-white to-[#48645D] bg-clip-text text-transparent opacity-80 text-center px-2 sm:px-4">

          ENCHANTING INNOVATION

        </h2>

      </div>

      {/* Side fade (important for seamless blend) */}
      {/* <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#020b09] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#020b09] to-transparent pointer-events-none" /> */}

    </section>
  );
}