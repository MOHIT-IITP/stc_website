"use client";
import Image from "next/image";
import Link from "next/link";
import AppConfig from "@/config/appConfig";
import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { label: "About Phoenix", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Our Team", href: "#our-team" },
    { label: "Contact Us", href: "#contact" },
  ];

  const wings = [
    { label: "TATVA — Tech & Research", href: "/wings/tatva" },
    { label: "DISHA — Career Growth", href: "/wings/disha" },
    { label: "ARTHNITI — Entrepreneurship", href: "/wings/arthniti" },
  ];

  return (
    <footer className="relative w-full bg-[#020b09] border-t border-emerald-500/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(13,38,28,0.5)_0%,transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
              <motion.div whileHover={{ y: -4 }}>
                <Link
                  href="/phoenix"
                  className="flex items-center gap-3 mb-6 group"
                >
                  <Image
                    src={AppConfig.imageUrls.phoenix.logo}
                    alt="Phoenix Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div>
                    <Image
                      src={AppConfig.imageUrls.phoenix.phoenix}
                      alt="Phoenix Logo Text"
                      width={160}
                      height={44}
                      className="h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </motion.div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[260px]">
              IIT Patna&apos;s premier tech fest — where technology meets magic
              and innovation knows no bounds.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  name: "Instagram",
                  icon: "M7.8 2h8.4C19 2 22 5 22 7.8v8.4A5.8 5.8 0 0116.2 22H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z",
                  href: "https://www.instagram.com/phoenix_iitp_cet/",
                },
                {
                  name: "LinkedIn",
                  icon: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
                  href: "https://www.linkedin.com/company/stc-iitp-hybrid-programs",
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9  flex items-center justify-center text-emerald-400/50 hover:text-emerald-300 transition-all duration-500"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 4 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Wings */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5">
              STC Wings
            </h4>
            <ul className="space-y-3">
              {wings.map((wing) => (
                <motion.li key={wing.label} whileHover={{ x: 4 }}>
                  <Link
                    href={wing.href}
                    className="text-sm text-white/40 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-3" />
                    {wing.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-white/30">
            © 2026 Phoenix — STC IIT Patna Hybrid. All rights reserved.
          </p>
          <p className="text-sm text-white/30 flex items-center gap-1">
            Crafted with
            <span className="text-emerald-400 animate-pulse">&hearts;</span>
            by{" "}
            <Link
              href="/wings/tatva/subclubs/webwiser"
              className="text-emerald-400/60 hover:text-emerald-300 transition-colors"
            >
              WebWiser
            </Link>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
