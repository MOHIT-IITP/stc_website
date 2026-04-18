export default function AboutSection() {
  return (
    <section
      className="relative min-h-screen w-screen overflow-hidden text-white font-sans"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      }}
    >
      {/* SVG gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/phoenix/about-gradient.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />

      {/* Background starry layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 60px 60px",
          backgroundPosition: "0 0, 30px 30px",
          opacity: 0.6,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 tracking-tight">
        {/* Main Grid: Text and Logo */}
        <div className="max-w-7xl w-full grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* CONTENT BOX (Left) */}
          <div className="relative p-8 md:p-10 rounded-[20px] bg-[#0E211A]/80 backdrop-blur-md border border-white/5 shadow-2xl min-h-[420px] md:min-h-[520px]">
            {/* L-Shape Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[2px] border-l-[2px] border-[#B7E4C7] rounded-tl-[20px]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[2px] border-r-[2px] border-[#B7E4C7] rounded-br-[20px]"></div>

            <p
              className="text-[18px] tracking-normal text-[#D1D5DC]"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: "29.25px",
                verticalAlign: "middle",
                letterSpacing: "0%",
              }}
            >
              Phoenix is the definitive convergence of human potential and
              technological frontier. The name itself signifies the Extreme Peak
              of innovation - the moment where imagination becomes reality and
              engineering brilliance is unbound.
            </p>

            <p
              className="text-[18px] tracking-normal text-[#D1D5DC] mt-6"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: "29.25px",
                verticalAlign: "middle",
                letterSpacing: "0%",
              }}
            >
              This year, the festival is a celebration of creators who defy
              convention and ideas that transcend human limits. Phoenix
              envisions a revolutionary future shaped by Artificial
              Intelligence, Quantum Frontiers, and Human-Machine Symbiosis.
            </p>

            <p
              className="text-[18px] tracking-normal text-[#D1D5DC] mt-6"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: "29.25px",
                verticalAlign: "middle",
                letterSpacing: "0%",
              }}
            >
              We are exploring a world where innovation isn't merely discovered;
              it is actively designed. From intelligent systems that learn and
              adapt, to immersive realities that blur the lines of perception,
              Phoenix stands as the testament to humanity's power to push toward
              its next great evolution.
            </p>
          </div>

          {/* LOGO GRAPHIC (Right) */}
          <div className="flex justify-center items-center relative scale-90 md:scale-100">
            <img
              src="./phoenix/aboutLogo.svg"
              alt="Phoenix Logo"
              className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_0_15px_rgba(183,228,199,0.2)]"
            />
          </div>
        </div>

        {/*Bottom Stats */}
        <div className="mt-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-12 text-center pb-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              300k+
            </h2>
            <p className="text-[#A3C7B6] font-medium leading-tight max-w-[140px]">
              Social media <br /> reach
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              2500+
            </h2>
            <p className="text-[#A3C7B6] font-medium leading-tight mt-2">
              Footfall
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              20+
            </h2>
            <p className="text-[#A3C7B6] font-medium leading-tight max-w-[160px]">
              workshops and <br /> competitions
            </p>
          </div>
        </div>
      </div>

      {/* Right Scroll Indicator (Visual only) */}
      <div className="absolute right-8 top-[56%] -translate-y-1/2 w-1.5 h-16 bg-white/40 rounded-full hidden md:block"></div>
    </section>
  );
}
