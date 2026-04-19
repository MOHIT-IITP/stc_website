import Image from "next/image";
import PhoenixBg from "./phoenix-bg";
import AppConfig from "@/config/appConfig";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-screen overflow-hidden text-white font-sans pt-20"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      }}
    >
      <PhoenixBg />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 tracking-tight">
        {/* Stars Image - Left Top Corner */}
        <div className="absolute left-0 top-0 hidden lg:flex">
          <img
src={AppConfig.imageUrls.phoenix.stars}
            alt="Stars"
            className="w-64 h-auto opacity-60"
          />
        </div>

        {/* Main Grid: Text and Logo */}
        <div className="max-w-5xl w-full grid md:grid-cols-[1fr_0.85fr] gap-8 lg:gap-12 items-center">
          {/* CONTENT BOX (Left) */}
          <div className="relative p-6 md:p-8 rounded-[20px] bg-[#163031]/80 backdrop-blur-md border border-white/5 shadow-2xl">
            {/* L-Shape Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[2px] border-l-[2px] border-[#1C3F35] rounded-tl-[20px]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[2px] border-r-[2px] border-[#1C3F35] rounded-br-[20px]"></div>

            <p
              className="text-[15px] tracking-normal text-[#D1D5DC]"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "24px",
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
              className="text-[15px] tracking-normal text-[#D1D5DC] mt-3"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "24px",
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
              className="text-[15px] tracking-normal text-[#D1D5DC] mt-3"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "24px",
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
src={AppConfig.imageUrls.phoenix.aboutLogo}
              alt="Phoenix Logo"
              className="w-full max-w-[380px] h-auto object-contain drop-shadow-[0_0_15px_rgba(183,228,199,0.2)]"
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
    </section>
  );
}
