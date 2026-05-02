import Image from "next/image";
import Link from "next/link";
import AppConfig from "@/config/appConfig";

export default function Footer() {
  const quickLinks = [
    { label: "About Phoenix", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Past Glimpses", href: "#glimpses" },
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/phoenix" className="flex items-center gap-3 mb-6 group">
              <Image
                src={AppConfig.imageUrls.phoenix.logo}
                alt="Phoenix Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div>
                <span
                  className="text-xl font-bold text-white tracking-wider block"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  PHOENIX
                </span>
                <span className="text-xs text-emerald-400/60 tracking-widest">2026</span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[260px]">
              IIT Patna&apos;s premier tech fest — where technology meets magic and innovation knows no bounds.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                { name: "Instagram", icon: "M7.8 2h8.4C19 2 22 5 22 7.8v8.4A5.8 5.8 0 0116.2 22H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z", href: "https://www.instagram.com/stc_iitp_cet" },
                { name: "LinkedIn", icon: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z", href: "https://www.linkedin.com/company/stc-iitp-hybrid-programs" },
                { name: "Twitter", icon: "M22.46 6c-.85.38-1.78.64-2.73.76 1-.6 1.76-1.54 2.12-2.67-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.42.72-.66 1.56-.66 2.46 0 1.68.85 3.16 2.14 4.02-.79-.02-1.53-.24-2.18-.6v.06c0 2.35 1.67 4.31 3.88 4.76-.4.1-.83.16-1.27.16-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.83 2.1-6.15 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.52 14.02-14.02 0-.21 0-.42-.01-.63.96-.69 1.79-1.56 2.45-2.55z", href: "https://twitter.com/stc_iitpatna" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/25 transition-all duration-500"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wings */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5">STC Wings</h4>
            <ul className="space-y-3">
              {wings.map((wing) => (
                <li key={wing.label}>
                  <Link
                    href={wing.href}
                    className="text-sm text-white/40 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-3" />
                    {wing.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5">Stay Updated</h4>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Subscribe to receive updates about events, workshops, and more magical experiences.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 bg-[#0a1f1a]/60 border border-emerald-500/15 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-400/40 transition-colors duration-300"
              />
              <button className="px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-sm font-medium transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-white/30">
            © 2026 Phoenix — STC IIT Patna. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Crafted with
            <span className="text-emerald-400 animate-pulse">✦</span>
            by{" "}
            <Link href="/" className="text-emerald-400/60 hover:text-emerald-300 transition-colors">
              WebWiser, STC Hybrid
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
