import PhoenixBg from "./phoenix-bg";
import AppConfig from "@/config/appConfig";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-screen overflow-hidden text-white pt-20"
      // style={{
      //   background:
      //     "radial-gradient(circle at 50% 50%, #0D261C 0%, #05100B 100%)",
      // }}
    >
      <style>{`
        @keyframes stcLogoFloat {
          0%, 100% { transform: translateY(0px); }
          35%, 65% { transform: translateY(-14px); }
        }
        @keyframes stcLogoGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.94); }
          50% { opacity: 0.75; transform: scale(1.07); }
        }
        .logo-inner-spin {
          will-change: transform, filter;
        }
      `}</style>
      <PhoenixBg />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 tracking-tight">
        {/* Stars Image - Left Top Corner */}
        {/* <div className="absolute left-0 top-0 hidden lg:flex">
          <img
src={AppConfig.imageUrls.phoenix.stars}
            alt="Stars"
            className="w-64 h-auto opacity-60"
          />
        </div> */}

        {/* Main Grid: Text and Logo */}
        <div className="max-w-6xl w-full grid md:grid-cols-[6fr_4fr] gap-8 lg:gap-12 items-center">
          {/* CONTENT IMAGE (Left) */}
          <div className="flex justify-center items-center w-full h-full relative">
            <img
              src="/phoenix/about-section.png"
              alt="About Phoenix"
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* LOGO GRAPHIC (Right) */}
          <div
            className="group flex justify-center items-center relative scale-90 md:scale-100"
            style={{ animation: "stcLogoFloat 8s ease-in-out infinite" }}
          >
            <div
              className="absolute inset-4 rounded-full bg-[#B8FFE1]/22 blur-3xl pointer-events-none"
              style={{ animation: "stcLogoGlow 4.5s ease-in-out infinite" }}
            />
            <img
              src={AppConfig.imageUrls.phoenix.aboutLogo}
              alt="Phoenix Logo"
              className="logo-inner-spin relative w-full max-w-[400px] h-auto object-contain drop-shadow-[0_0_20px_rgba(189,248,216,0.4)]"
            />
          </div>
        </div>

        {/*Bottom Stats */}
        <div className="mt-20 w-full max-w-5xl grid grid-cols-3 gap-3 sm:gap-6 text-center pb-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              300k+
            </h2>
            <p className="text-xs sm:text-sm text-[#A3C7B6] font-medium leading-tight max-w-[140px]">
              Social media <br /> reach
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              2500+
            </h2>
            <p className="text-xs sm:text-sm text-[#A3C7B6] font-medium leading-tight mt-2">
              Footfall
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
              20+
            </h2>
            <p className="text-xs sm:text-sm text-[#A3C7B6] font-medium leading-tight max-w-40">
              workshops and <br /> competitions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
