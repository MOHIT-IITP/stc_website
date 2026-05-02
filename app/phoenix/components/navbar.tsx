"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AppConfig from "@/config/appConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Glimpses", href: "#glimpses" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#060e0a]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[#1C3F35]/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between h-20 sm:h-24">
        {/* Logo */}
        <Link href="/phoenix" className="relative z-10 flex items-center gap-3 group">
          <Image
            src={AppConfig.imageUrls.phoenix.logo}
            alt="Phoenix Logo"
            width={64}
            height={64}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]"
          />
          <span className="hidden sm:block text-xl font-bold text-white tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            PHOENIX
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 rounded-2xl bg-[#173b31]/60 px-2 py-1.5 backdrop-blur-xl border border-[#1C3F35]/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative px-6 py-2.5 text-[15px] font-medium text-white/80 transition-all duration-300 hover:text-white rounded-xl hover:bg-[#1C3F35]/40 group"
            >
              {item.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-300 transition-all duration-300 group-hover:w-8 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Register CTA */}
        <Link
          href="#events"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:scale-105 border border-emerald-400/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Register Now
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-[#173b31]/60 backdrop-blur-xl border border-[#1C3F35]/40"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#060e0a]/95 backdrop-blur-xl border-b border-[#1C3F35]/30 transition-all duration-500 ${
          mobileOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-white/80 hover:text-white hover:bg-[#1C3F35]/30 rounded-xl transition-all duration-300 text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#events"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-center font-semibold"
          >
            ⚡ Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
