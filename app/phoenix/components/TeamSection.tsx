"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Updated MEMBER_DATA to match the ordered list and roles provided by the user.
const MEMBER_DATA: { name: string; role: string; image?: string }[] = [
  { name: "AYUSH KUMAR", role: "President", image: "AYUSH KUMAR.png" },
  { name: "SATAYAM", role: "Vice President", image: "Satyam.png" },
  { name: "HARIOM", role: "Gen. Secretary", image: "HARIOM.png" },
  { name: "Kr. Aayush", role: "Treasurer", image: "kr.ayush.png" },
  { name: "AYUSH JHA", role: "Advisor", image: "AYUSH JHA.png" },
  { name: "aryan", role: "Advisor", image: "aryan.png" },
  { name: "tushar parihar", role: "Advisor", image: "tushar parihar.png" },
  { name: "ritu raj", role: "Advisor", image: "ritu raj.png" },

  { name: "shivam", role: "Overall MNG. Lead", image: "shivam.png" },
  { name: "amrit raj", role: "Council Head", image: "amrit raj.png" },
  { name: "Badal Raj", role: "Tatva Cell Head", image: "Badal Raj.png" },
  { name: "pushp", role: "Artniti Cell Head", image: "pushp.png" },
  { name: "ritik", role: "Disha Cell Head", image: "ritik.png" },

  { name: "mohit kumar", role: "Tech Lead", image: "MohitKumar.png" },
  { name: "abhishek", role: "Tech Co-Lead", image: "abhishek.png" },
  { name: "ankit", role: "Tech Head", image: "AnkitKumar.png" },
  { name: "mandeep", role: "Tech Head", image: "mandeep.png" },

  { name: "abhijeet kr", role: "Tech Lead", image: "abhijeet-1.png" },
  { name: "sakshi kri", role: "Tech Co-Lead", image: "sakshi kri.png" },
  { name: "amarjeet", role: "E-Sports Lead", image: "amarjeet.png" },

  { name: "shruti", role: "Creative Lead", image: "shruti.png" },
  { name: "yash mishra", role: "Creative Co-Lead", image: "yash mishra.png" },
  {
    name: "anshika awasti",
    role: "Creative Crew",
    image: "anshika awasti.png",
  },
  { name: "Vinayak", role: "Creative Crew", image: "Vinayak.png" },
  { name: "aparna singh", role: "Creative Crew", image: "aparna singh.png" },
  { name: "jayati", role: "Creative Crew", image: "jayati.png" },

  { name: "katyayani", role: "Promotion Lead", image: "katyayani.png" },
  {
    name: "sumit saurav",
    role: "Promotion Co-Lead",
    image: "sumit saurav.png",
  },
  { name: "harsh", role: "Promotion Crew", image: "harsh.png" },
  { name: "ananya", role: "Promotion Crew", image: "ananya.png" },
  { name: "soni priya", role: "Promotion Crew", image: "soni priya.png" },
  { name: "raj raushan", role: "TNP Crew", image: "raj raushan.png" },

  { name: "sachinkumar", role: "Event MNG. Lead", image: "sachinkumar.png" },
  { name: "alquama", role: "Event MNG. Co-Lead", image: "alquama.png" },
  {
    name: "Sambhaw Singh",
    role: "Event MNG. Co-Lead",
    image: "Sambhaw Singh.png",
  },
  { name: "prince", role: "Event MNG. Crew", image: "prince.png" },
  {
    name: "Harshit Aadarsh",
    role: "Event MNG. Crew",
    image: "Harshit Aadarsh.png",
  },

  { name: "aditya ghosh", role: "Sponsorship Lead", image: "aditya ghosh.png" },
  { name: "prgati", role: "Sponsorship Co-Lead", image: "prgati.png" },
  { name: "pratishtha", role: "Sponsorship Crew", image: "pratishtha.png" },
  { name: "anmol", role: "Sponsorship Crew", image: "anmol.png" },
  { name: "shorya", role: "Sponsorship Crew", image: "shorya.png" },

  { name: "raunak", role: "E-Cell Lead", image: "raunak.png" },
  { name: "shivam kumar", role: "E-Cell Crew", image: "shivam kumar.png" },
  { name: "yuvraj", role: "E-Cell Lead", image: "yuvraj.png" },
  { name: "shambhavi", role: "E-Cell Crew", image: "shambhavi.png" },
  { name: "faridjot", role: "E-Cell Crew", image: "faridjot.png" },

  { name: "ramandeep", role: "Tech Lead", image: "ramandeep.png" },
  { name: "md huzaifa", role: "Tech Co-Lead", image: "md huzaifa.png" },
  { name: "priynashu", role: "Tech Crew", image: "priynashu.png" },
  { name: "suman", role: "Tech Crew", image: "suman.png" },
  { name: "raushan", role: "Tech Co-Lead", image: "raushan.png" },
  { name: "ARUNESH", role: "Tech Co-Lead", image: "ARUNESH.png" },
  { name: "ayush babu", role: "Tech Lead", image: "ayush babu.png" },
  { name: "ripunjay", role: "Tech Crew", image: "ripunjay.png" },
  { name: "vikash garg", role: "TNP Lead", image: "vikash garg.png" },
  { name: "ankit", role: "TNP Lead", image: "ankit.png" },
  { name: "mahak", role: "TNP Crew", image: "mahak.png" },
];

const TEAM_MEMBERS: TeamMember[] = MEMBER_DATA.map((member, i) => ({
  id: i + 1,
  name: member.name,
  role: member.role,
  image: encodeURI(`/phoenix/photos/${member.image ?? "ARUNESH.png"}`),
}));

type Phase = "idle" | "exit" | "enter";

export default function TeamSection() {
  const [cardsPerSlide, setCardsPerSlide] = useState(6);
  const [slide, setSlide] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalSlides = Math.ceil(TEAM_MEMBERS.length / cardsPerSlide);

  useEffect(() => {
    // Use a unitary method: compute how many cards fit based on a constant
    // card width (in px). Enforce a minimum of 2 cards on phones and a
    // maximum of 6 cards on desktop.
    const container = containerRef.current;
    const CARD_UNIT_PX = 260; // logical width for one card
    const MIN_CARDS = 2;
    const MAX_CARDS = 6;

    const DESKTOP_MIN_WIDTH = 1380;

    const syncCardsPerSlide = () => {
      // Force desktop to show MAX_CARDS when viewport is wide enough
      const winWidth = window.innerWidth || 0;
      if (winWidth >= DESKTOP_MIN_WIDTH) {
        setCardsPerSlide(Math.min(MAX_CARDS, TEAM_MEMBERS.length));
        return;
      }

      const available = container?.clientWidth ?? winWidth;
      const count = Math.max(1, Math.floor(available / CARD_UNIT_PX));
      const minAllowed = Math.min(MIN_CARDS, TEAM_MEMBERS.length);
      const maxAllowed = Math.min(MAX_CARDS, TEAM_MEMBERS.length);
      const clamped = Math.max(minAllowed, Math.min(count, maxAllowed));
      setCardsPerSlide(clamped);
    };

    syncCardsPerSlide();
    window.addEventListener("resize", syncCardsPerSlide);
    return () => window.removeEventListener("resize", syncCardsPerSlide);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (totalSlides < 2) return;
      if (phase !== "idle") return;
      const wrappedTarget = (target + totalSlides) % totalSlides;
      if (wrappedTarget === slide) return;

      const movingForward =
        (slide === totalSlides - 1 && wrappedTarget === 0) ||
        (slide !== 0 && wrappedTarget > slide);

      setDir(movingForward ? "fwd" : "back");
      setPhase("exit");
      setTimeout(() => {
        setShown(wrappedTarget);
        setSlide(wrappedTarget);
        setPhase("enter");
        setTimeout(() => setPhase("idle"), 420);
      }, 260);
    },
    [phase, slide, totalSlides],
  );

  useEffect(() => {
    const lastSlide = Math.max(totalSlides - 1, 0);
    if (slide > lastSlide) setSlide(lastSlide);
    if (shown > lastSlide) setShown(lastSlide);
  }, [slide, shown, totalSlides]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(slide + 1);
      if (e.key === "ArrowLeft") goTo(slide - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, slide]);

  const members = TEAM_MEMBERS.slice(
    shown * cardsPerSlide,
    (shown + 1) * cardsPerSlide,
  );

  const rowAnimClass =
    phase === "exit"
      ? dir === "fwd"
        ? "stc-exit-fwd"
        : "stc-exit-back"
      : phase === "enter"
        ? dir === "fwd"
          ? "stc-enter-fwd"
          : "stc-enter-back"
        : "";

  return (
    <div
      id="our-team"
      className="relative w-full min-h-screen z-10 flex flex-col py-8"
      aria-label="Our Team"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
        @keyframes stc-exit-fwd   { to   { opacity:0; transform:translateX(-42px); } }
        @keyframes stc-exit-back  { to   { opacity:0; transform:translateX( 42px); } }
        @keyframes stc-enter-fwd  { from { opacity:0; transform:translateX( 42px); } to { opacity:1; transform:none; } }
        @keyframes stc-enter-back { from { opacity:0; transform:translateX(-42px); } to { opacity:1; transform:none; } }
        .stc-exit-fwd   { animation: stc-exit-fwd .26s ease forwards; }
        .stc-exit-back  { animation: stc-exit-back .26s ease forwards; }
        .stc-enter-fwd  { animation: stc-enter-fwd .42s cubic-bezier(.22,1,.36,1) forwards; }
        .stc-enter-back { animation: stc-enter-back .42s cubic-bezier(.22,1,.36,1) forwards; }
        
        .team-card {
          transition: filter .22s ease;
          background-image: 
            radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.4), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.3), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 50px 160px, rgba(255,255,255,0.5), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.4), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), rgba(0,0,0,0));
          background-size: 200px 200px;
        }
        .team-card:nth-child(1) { background-color: #12241b; }
        .team-card:nth-child(2) { background-color: #172d22; }
        .team-card:nth-child(3) { background-color: #14281e; }
        .team-card:nth-child(4) { background-color: #1a3225; }
        .team-card:nth-child(5) { background-color: #13251c; }
        .team-card:nth-child(6) { background-color: #182e23; }

        .vertical-meta {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-orientation: mixed;
          letter-spacing: 0.1em;
        }
      `}</style>

      <header className="mx-auto mb-6 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <h2
          className="text-white font-bold leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Our Team
        </h2>
        <p
          className="mt-2 text-white/65"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
        >
          Built by passionate students driving innovation together
        </p>
      </header>

      <div
        ref={containerRef}
        className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12"
      >
        <div
          className={`w-full h-[65vh] md:h-[75vh] lg:h-[85vh] flex items-stretch overflow-hidden border border-white/5 shadow-2xl ${rowAnimClass}`}
        >
          {members.map((member, index) => (
            <article
              key={member.id}
              className="team-card relative overflow-hidden flex flex-col min-w-0 border-r border-white/5 last:border-r-0"
              style={{ flex: `0 0 ${100 / cardsPerSlide}%` }}
            >
              {/* STC background text */}
              {index < 3 ? (
                <span
                  className="hidden md:block absolute top-0 -left-1 text-white font-extrabold leading-none pointer-events-none z-0 opacity-80"
                  style={{
                    fontSize: "clamp(100px, 14vw, 220px)",
                    letterSpacing: "-0.05em",
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {["S", "T", "C"][index]}
                </span>
              ) : null}

              {/* Dark Gradient from Right (behind image) to help text legibility */}
              <div className="absolute inset-0 bg-linear-to-l from-black/90 via-black/40 to-transparent pointer-events-none z-5" />

              {/* Member Image */}
              <div className="absolute inset-x-0 bottom-0 h-[75%] sm:h-[80%] pointer-events-none z-10 overflow-hidden flex items-end justify-start">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[160%] max-w-none h-full object-cover object-bottom-left -ml-[45%]"
                  loading="lazy"
                />
              </div>

              {/* Bottom overlay: match right-side gradient stops for stronger base */}
              <div
                className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                style={{
                  zIndex: 15,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 36%, rgba(0,0,0,0))",
                }}
              />

              {/* Top Right Info */}
              <div className="absolute top-12 sm:top-16 right-3 sm:right-5 z-20 flex flex-row-reverse gap-2 sm:gap-3 items-start">
                <div
                  className="vertical-meta text-[14px] sm:text-[18px] font-extrabold uppercase leading-none text-white tracking-widest drop-shadow-md"
                  style={{ fontFamily: '"Roboto Slab", serif' }}
                >
                  {member.name}
                </div>
                <div
                  className="vertical-meta text-[11px] sm:text-[13px] font-medium uppercase leading-none text-[#B2BEB5] tracking-widest drop-shadow-md"
                  style={{ fontFamily: '"Roboto Slab", serif' }}
                >
                  {member.role}
                </div>
              </div>
            </article>
          ))}

          {/* Fill remaining slots with invisible placeholders so layout stays consistent */}
          {Array.from({
            length: Math.max(0, cardsPerSlide - members.length),
          }).map((_, i) => (
            <article
              key={`filler-${shown}-${i}`}
              aria-hidden="true"
              className="team-card relative overflow-hidden flex flex-col min-w-0 border-r border-white/5 last:border-r-0"
              style={{
                flex: `0 0 ${100 / cardsPerSlide}%`,
                background: "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <nav
        className="mx-auto mt-10 mb-4 flex w-full max-w-full items-center justify-center gap-2 px-2 sm:gap-6"
        aria-label="Team navigation"
      >
        <button
          onClick={() => goTo(slide - 1)}
          aria-label="Previous slide"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex max-w-[52vw] items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:max-w-none sm:gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ease-out ${
                i === slide
                  ? "h-1.5 w-5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] sm:w-8"
                  : "h-1.5 w-1.5 bg-white/20 hover:bg-white/50 hover:scale-125"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(slide + 1)}
          aria-label="Next slide"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
