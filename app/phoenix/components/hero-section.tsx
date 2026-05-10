"use client";

import Image from "next/image";
import AppConfig from "@/config/appConfig";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#020b09] pt-20"
      id="home"
    >
      {/* Background Image */}
      <picture className="absolute inset-0 z-10 block h-full w-full">
        <Image
          height={1200}
          width={1600}
          className="h-full w-full object-cover object-center"
          src={AppConfig.imageUrls.phoenix.bg}
          alt="Hero Background"
        />
        {/* <Image
          src={AppConfig.imageUrls.phoenix.bgMobile}
          alt="Hero Background"
          height={600}
          width={500}
          className="h-full w-full object-cover object-center"
        /> */}
      </picture>
      {/* <Image
src={AppConfig.imageUrls.phoenix.bg2}
        alt="Hero Blur Overlay"
        fill
        className="absolute inset-0 z-10 object-cover object-center opacity-30 "
      /> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[58%] bg-[linear-gradient(to_top,rgba(2,11,9,0.96)_0%,rgba(2,11,9,0.7)_24%,rgba(2,11,9,0.25)_56%,rgba(2,11,9,0)_100%)]" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.45)_100%)]" />

      {/* Content */}
      <div className="relative z-30 mx-auto flex min-h-screen w-full max-w-[1188px] flex-col px-6 py-6 text-white sm:px-10 lg:px-12">
        <div className="flex flex-1 items-center justify-center pb-[12vh] pt-[10vh] sm:pb-[14vh] sm:pt-[10vh] lg:pb-[16vh] lg:pt-[12vh]">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={AppConfig.imageUrls.phoenix.phoenix}
                alt="Hero Text"
                width={800}
                height={350}
                className="h-[40vh] w-[min(70vw,800px)] min-w-[300px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] sm:w-[min(60vw,800px)] lg:w-[min(40vw)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ y: starsY }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        <Image
          src={AppConfig.imageUrls.phoenix.stars}
          alt=""
          width={420}
          height={240}
          className="pointer-events-none absolute right-[3%] top-[5%] z-30 w-64 -rotate-[8deg] opacity-45 sm:w-80 lg:w-[400px]"
        />
      </motion.div>
    </section>
  );
}
