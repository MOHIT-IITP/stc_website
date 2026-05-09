"use client";

import PhoenixBg from "./phoenix-bg";
import AppConfig from "@/config/appConfig";
import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    {
      value: "300k+",
      label: (
        <>
          Social media <br /> reach
        </>
      ),
    },
    {
      value: "2500+",
      label: <>Footfall</>,
    },
    {
      value: "20+",
      label: (
        <>
          workshops and <br /> competitions
        </>
      ),
    },
  ];

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
          <motion.div
            className="flex justify-center items-center w-full h-full relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/phoenix/about-section.png"
              alt="About Phoenix"
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* LOGO GRAPHIC (Right) */}
          <motion.div
            className="group flex justify-center items-center relative scale-90 md:scale-100"
            style={{ animation: "stcLogoFloat 8s ease-in-out infinite" }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
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
          </motion.div>
        </div>

        {/*Bottom Stats */}
        <div className="mt-20 w-full max-w-5xl grid grid-cols-3 gap-3 sm:gap-6 text-center pb-8">
          {stats.map((item, index) => (
            <motion.div
              key={item.value}
              className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-2 py-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#D1E8E0] mb-2">
                {item.value}
              </h2>
              <p className="text-xs sm:text-sm text-[#A3C7B6] font-medium leading-tight max-w-[140px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
