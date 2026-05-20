"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type TouchEvent,
} from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Updated MEMBER_DATA to match the ordered list and roles provided by the user.
const MEMBER_DATA: { name: string; role: string; image?: string }[] = [
  { name: "Ayush Kumar", role: "President", image: "AYUSH KUMAR.png" },
  { name: "Satyam", role: "Vice President", image: "Satyam.png" },
  { name: "Hariom Kumar", role: "General Secretary", image: "HARIOM.png" },
  { name: "Kr Aayush", role: "Treasurer", image: "kr.ayush.png" },

  { name: "Ayush Jha", role: "Advisor", image: "AYUSH JHA.png" },
  { name: "Aryan", role: "Advisor", image: "aryan.png" },
  { name: "Tushar Parihar", role: "Advisor", image: "tushar parihar.png" },
  { name: "Ritu Raj", role: "Advisor", image: "ritu raj.png" },

  { name: "Shivam", role: "OML", image: "shivam.png" },
  { name: "Amrit Raj", role: "Council Head", image: "amrit raj.png" },
  { name: "Badal Raj", role: "Tatva Cell Head", image: "Badal Raj.png" },
  { name: "Pushp Raj", role: "Arthniti Cell Head", image: "pushp.png" },
  { name: "Ritik Raj", role: "Disha Cell Head", image: "ritik.png" },

  { name: "Mohit Kumar", role: "Tech Lead", image: "MohitKumar.png" },
  { name: "Abhishek Mohanty", role: "Tech Co-Lead", image: "abhishek.png" },
  { name: "Ankit Kumar", role: "Tech Team", image: "AnkitKumar.png" },
  { name: "Mandeep Nagar", role: "Tech Team", image: "mandeep.png" },

  { name: "Abhijeet Kumar", role: "CodeRed Lead", image: "abhijeet-1.png" },
  { name: "Sakshi Kumari", role: "CodeRed Co-Lead", image: "sakshi kri.png" },
  { name: "Amarjeet", role: "E-Sports Lead", image: "amarjeet.png" },

  { name: "Shruti", role: "Creative Lead", image: "shruti.png" },
  { name: "Yash Mishra", role: "Creative Co-Lead", image: "yash mishra.png" },
  {
    name: "Anshika Awasti",
    role: "Creative Crew",
    image: "anshika awasti.png",
  },
  { name: "Aryan Kumar", role: "Creative Crew", image: "aryan-kumar.png" },
  { name: "Vinayak", role: "Creative Crew", image: "Vinayak.png" },
  { name: "Aparna Singh", role: "Creative Crew", image: "aparna singh.png" },
  { name: "Jayati", role: "Creative Crew", image: "jayati.png" },

  { name: "Katyayani", role: "PR Lead", image: "katyayani.png" },
  {
    name: "Sumit Saurav",
    role: "PR Co-Lead",
    image: "sumit saurav.png",
  },
  { name: "Harsh", role: "PR Crew", image: "harsh.png" },
  { name: "Ananya Manah", role: "PR Crew", image: "ananya.png" },
  { name: "Soni Priya", role: "PR Crew", image: "soni priya.png" },

  { name: "Raj Raushan", role: "TNP Lead", image: "raj raushan.png" },

  { name: "Sachin Kumar", role: "EMT Lead", image: "sachinkumar.png" },
  { name: "Alquama", role: "EMT Co-Lead", image: "alquama.png" },
  {
    name: "Sambhav",
    role: "EMT Co-Lead",
    image: "Sambhaw Singh.png",
  },
  { name: "Prince Kumar", role: "EMT Crew", image: "prince.png" },
  {
    name: "Harshit",
    role: "EMT Crew",
    image: "Harshit Aadarsh.png",
  },

  { name: "Aditya Ghosh", role: "Sponsors Lead", image: "aditya ghosh.png" },
  { name: "Pragati", role: "Sponsors Co-Lead", image: "prgati.png" },
  { name: "Pratistha", role: "Sponsors Crew", image: "pratishtha.png" },
  { name: "Anmol", role: "Sponsors Crew", image: "anmol.png" },
  { name: "Shourya", role: "Sponsors Crew", image: "shorya.png" },

  { name: "Raunak Singh", role: "E-Cell Lead", image: "raunak.png" },
  { name: "Yuv Raj", role: "E-Cell Lead", image: "yuvraj.png" },
  { name: "Shivam Kumar", role: "E-Cell Team", image: "shivam kumar.png" },
  { name: "Shambhavi", role: "E-Cell Team", image: "shambhavi.png" },
  { name: "Faridjot", role: "E-Cell Team", image: "faridjot.png" },

  { name: "Ramandeep", role: "RSVP Lead", image: "ramandeep.png" },
  { name: "Md Huzaifa", role: "RSVP Team", image: "md huzaifa.png" },
  { name: "Priyanshu", role: "RSVP Team", image: "priynashu.png" },
  { name: "Raushan", role: "RSVP Team", image: "raushan.png" },
  { name: "Suyash", role: "RSVP Crew", image: "suyash.png" },
  { name: "Goongoon", role: "RSVP Crew", image: "goongoon.png" },
  { name: "Arunesh", role: "Pixelerate Co-Lead", image: "ARUNESH.png" },
  
  
  { name: "Aayush Babu", role: "HackShield Lead", image: "ayush babu.png" },
  { name: "Ripunjay", role: "HackShield Team", image: "ripunjay.png" },
  { name: "Suman Kumar", role: "HackShield Team", image: "suman.png" },

  { name: "Ankit Kumar", role: "TNP Lead", image: "ankit.png" },
  { name: "Vikash Garg", role: "TNP Lead", image: "vikash garg.png" },
  { name: "Mahak", role: "TNP Team", image: "mahak.png" },


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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
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

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const start = touchStartRef.current;
      const touch = event.changedTouches[0];
      touchStartRef.current = null;

      if (!start || !touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

      if (!isHorizontalSwipe || Math.abs(deltaX) < 48) return;

      goTo(deltaX < 0 ? slide + 1 : slide - 1);
    },
    [goTo, slide],
  );

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
      className="relative z-10 flex w-full flex-col py-6 sm:py-8 md:py-6 xl:min-h-screen xl:py-8"
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

      <header className="mx-auto mb-4 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:mb-5 xl:mb-6">
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
          className={`flex h-[56vh] min-h-[360px] w-full touch-pan-y select-none items-stretch overflow-hidden border border-white/5 shadow-2xl sm:h-[60vh] sm:min-h-[420px] md:h-[56vh] md:min-h-[440px] lg:h-[64vh] xl:h-[85vh] xl:min-h-0 ${rowAnimClass}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
          }}
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
                <Image
                  height={400}
                  width={300}
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
        className="mx-auto mb-2 mt-6 flex w-full max-w-full items-center justify-center gap-2 px-2 sm:mt-8 sm:gap-6 xl:mb-4 xl:mt-10"
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
