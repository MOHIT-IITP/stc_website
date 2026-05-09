"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AppConfig from "@/config/appConfig";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Our Team", href: "#our-team" },
  // { label: "Glimpses", href: "#glimpses" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Spotlight Logic
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const isHeroActive = activeIndex === null;

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item, index) => {
        const sectionId = item.href.startsWith("#") ? item.href.slice(1) : "";
        const element = sectionId ? document.getElementById(sectionId) : null;
        return element ? { index, element } : null;
      })
      .filter(
        (section): section is { index: number; element: HTMLElement } =>
          section !== null,
      );

    if (!sections.length) return;

    // Keep the marker near the top so section highlight switches as soon as
    // a new section reaches the navbar area (instead of one section late).
    const markerOffset = () => Math.max(88, window.innerHeight * 0.12);

    const syncActiveIndex = () => {
      const markerY = markerOffset();
      let nextActiveIndex: number | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();

        if (rect.top <= markerY && rect.bottom >= markerY) {
          nextActiveIndex = section.index;
          bestDistance = 0;
          break;
        }

        if (rect.top <= markerY) {
          const distance = markerY - rect.top;
          if (distance < bestDistance) {
            bestDistance = distance;
            nextActiveIndex = section.index;
          }
        }
      }

      const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atPageBottom) {
        nextActiveIndex = sections[sections.length - 1].index;
      }

      setActiveIndex((currentIndex) =>
        currentIndex === nextActiveIndex ? currentIndex : nextActiveIndex,
      );
    };

    let rafId = 0;
    const onViewportChange = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        syncActiveIndex();
        rafId = 0;
      });
    };

    syncActiveIndex();
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Spotlight Mouse Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (activeIndex === null) return;
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      if (hoverX === null) {
        spotlightX.current = targetX;
        nav.style.setProperty("--spotlight-x", `${targetX}px`);
      }

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex, hoverX]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-100 flex justify-center px-4 sm:top-6 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 relative w-full max-w-[540px] rounded-full sm:w-fit sm:max-w-none ${
          scrolled
            ? "bg-white/8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10"
            : "bg-white/4 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-white/5"
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between px-4 sm:px-6 sm:justify-center sm:gap-6 md:gap-8 transition-all duration-500 ${scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"}`}
        >
          {/* Logo */}
          <Link
            href="/phoenix#home"
            className="relative z-10 flex items-center group mr-2"
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500",
                isHeroActive
                  ? "h-10 w-10 sm:h-12 sm:w-12 bg-emerald-400/45 blur-[14px] shadow-[0_0_26px_rgba(34,197,94,0.95)]"
                  : "h-0 w-0 opacity-0",
              )}
            />
            <Image
              src={AppConfig.imageUrls.phoenix.logo}
              alt="Phoenix Logo"
              width={56}
              height={56}
              className={cn(
                "h-16 w-16 sm:h-18 sm:w-18 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]",
                isHeroActive &&
                  "drop-shadow-[0_0_24px_rgba(34,197,94,1)] [filter:drop-shadow(0_0_20px_rgba(34,197,94,0.95))_drop-shadow(0_0_40px_rgba(34,197,94,0.8))]",
              )}
            />
          </Link>

          {/* Desktop Nav - Spotlight Component Integrated */}
          <div
            ref={navRef}
            className="hidden md:flex relative h-[80%] items-center gap-1 overflow-hidden px-2 rounded-full"
          >
            {/* Ambient Background Glow (Follows Mouse) */}
            <div
              className="absolute top-0 bottom-0 w-[100px] -ml-[50px] pointer-events-none z-0 transition-opacity duration-300"
              style={{
                left: "var(--spotlight-x, 0px)",
                background:
                  "radial-gradient(circle at center, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
                opacity: hoverX !== null ? 1 : 0,
              }}
            />
            {/* Premium Glowing Bottom Line (Active Item) */}
            <div
              className="absolute bottom-1 h-0.5 w-[50px] -ml-[25px] pointer-events-none z-0 bg-linear-to-r from-transparent via-[#22c55e] to-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              style={{
                left: "var(--ambience-x, 0px)",
                opacity: activeIndex === null ? 0 : 1,
              }}
            />

            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                data-index={idx}
                onClick={() => handleItemClick(idx)}
                className={cn(
                  "relative z-10 px-4 py-2 text-[15px] sm:text-[16px] font-medium transition-colors duration-300 rounded-full",
                  activeIndex === idx
                    ? "text-emerald-400"
                    : "text-white/80 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle - Circular */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-10 w-11 h-11 flex flex-col items-center justify-center gap-1.5 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-[#060e0a]/95 backdrop-blur-2xl rounded-3xl border border-white/10 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${
            mobileOpen
              ? "max-h-[400px] opacity-100 py-2"
              : "max-h-0 opacity-0 overflow-hidden border-transparent"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleItemClick(idx)}
                className={cn(
                  "px-4 py-3 rounded-2xl transition-all duration-300 text-base font-medium",
                  activeIndex === idx
                    ? "text-emerald-400 bg-white/5"
                    : "text-white/80 hover:text-white hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
