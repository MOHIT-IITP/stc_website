"use client";

import { useState } from "react";

type Role = "LEADS" | "COORDINATORS" | "MEMBERS";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  category: Role;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sophia Alvarez",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 4,
    name: "James Whitfield",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 5,
    name: "Elena Russo",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 6,
    name: "David Osei",
    role: "Lead",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    category: "LEADS",
  },
  {
    id: 7,
    name: "William Baron",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 8,
    name: "Aisha Kamara",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 9,
    name: "Lucas Martins",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 10,
    name: "Mei Lin",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 11,
    name: "Ryan O'Sullivan",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 12,
    name: "Fatima Al-Rashid",
    role: "Coordinator",
    image:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=600&fit=crop&crop=face",
    category: "COORDINATORS",
  },
  {
    id: 13,
    name: "Noah Fischer",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
  {
    id: 14,
    name: "Amara Diallo",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
  {
    id: 15,
    name: "Kenji Watanabe",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
  {
    id: 16,
    name: "Isabella Torres",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
  {
    id: 17,
    name: "Omar Hassan",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
  {
    id: 18,
    name: "Zoe Campbell",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=600&fit=crop&crop=face",
    category: "MEMBERS",
  },
];

const SLOT_OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

export default function MyTeam() {
  const [activeTab, setActiveTab] = useState<Role>("COORDINATORS");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = teamMembers.filter(
    (member) => member.category === activeTab,
  );
  const centeredMember = filtered[activeIndex] ?? filtered[0] ?? null;

  const handleTabChange = (tab: Role) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    setActiveIndex((index) => Math.max(0, index - 1));
  };

  const handleNext = () => {
    setActiveIndex((index) => Math.min(filtered.length - 1, index + 1));
  };

  return (
    <section className="relative isolate  z-9 flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden  py-16">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[420px] -translate-y-1/2 blur-3xl opacity-80" />

      <div className="relative z-10 text-center mb-2">
        <h1
          className="text-5xl font-semibold tracking-wide md:text-6xl"
          style={{
            color: "#9ccab4",
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: "0.03em",
          }}
        >
          <span className="inline-flex items-center gap-4">
            <Dash />
            Our Team
            <Dash />
          </span>
        </h1>
        <p
          className="mt-2 text-sm tracking-[0.25em]"
          style={{
            color: "rgba(205,233,221,0.72)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          The minds behind the magic
        </p>
      </div>

      <div className="relative z-10 mt-8 mb-8 flex flex-wrap justify-center gap-6 md:gap-10">
        {(["LEADS", "COORDINATORS", "MEMBERS"] as Role[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className="min-w-[188px] rounded-full px-8 py-4 text-sm font-semibold tracking-[0.18em] transition-all duration-300"
            style={{
              background:
                activeTab === tab
                  ? "linear-gradient(180deg, rgba(216,230,223,0.92) 0%, rgba(151,173,165,0.92) 100%)"
                  : "linear-gradient(180deg, rgba(178,197,190,0.42) 0%, rgba(110,131,126,0.42) 100%)",
              color: activeTab === tab ? "#17322d" : "rgba(227,240,234,0.88)",
              border: "1px solid rgba(222,239,232,0.12)",
              boxShadow:
                activeTab === tab
                  ? "0 10px 30px rgba(11,28,22,0.24)"
                  : "0 8px 24px rgba(11,28,22,0.14)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="absolute right-8 top-[40%] z-20 flex gap-3 md:right-10">
        <NavArrow
          dir="left"
          onClick={handlePrev}
          disabled={activeIndex === 0}
        />
        <NavArrow
          dir="right"
          onClick={handleNext}
          disabled={activeIndex >= filtered.length - 1}
        />
      </div>

      <div className="relative z-10 mt-4 flex w-full max-w-[1200px] items-end justify-center gap-6 px-2 md:gap-8">
        {SLOT_OFFSETS.map((offset, slotIndex) => {
          const isCenter = slotIndex === 3;
          return (
            <div
              key={offset}
              className="relative shrink-0 transition-all duration-500"
              style={{
                width: isCenter ? "420px" : "118px",
                height: "420px",
                transform: "translateY(0px)",
                zIndex: isCenter ? 10 : 1,
              }}
            >
              {isCenter ? (
                <CenterCard member={centeredMember} />
              ) : (
                <EmptyCard />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CenterCard({ member }: { member: TeamMember | null }) {
  if (!member) {
    return <EmptyCard />;
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(15,120,78,0.96) 0%, rgba(7,53,37,0.96) 100%)",
        boxShadow: "0 22px 45px rgba(0,0,0,0.32)",
      }}
    >
      <div
        className="absolute inset-3 rounded-[20px]"
        style={{
          border: "1px solid rgba(232,165,55,0.85)",
          boxShadow: "inset 0 0 0 1px rgba(255,214,129,0.12)",
        }}
      />
      <GoldOrnament />

      <div className="absolute inset-x-0 top-8 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_72%)] blur-[2px]" />
      </div>

      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-x-0 bottom-0 mx-auto h-[86%] w-[98%] object-contain object-bottom"
      />

      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-4 pt-12 text-center"
        style={{
          background:
            "linear-gradient(to top, rgba(7,34,25,0.96) 24%, rgba(7,34,25,0) 100%)",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <span
          className="text-[18px] font-semibold text-white"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {member.name}
        </span>
        <span
          className="mt-1 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "rgba(233,242,236,0.78)" }}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

function EmptyCard() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,239,239,0.96) 100%)",
        boxShadow: "0 16px 34px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.82)",
      }}
    >
      <svg
        width="48"
        height="40"
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="46"
          height="38"
          rx="4"
          stroke="#bfc7c4"
          strokeWidth="2"
        />
        <circle cx="16" cy="14" r="5" stroke="#bfc7c4" strokeWidth="2" />
        <path
          d="M2 32 L14 20 L22 28 L30 18 L46 32"
          stroke="#bfc7c4"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

function GoldOrnament() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 200 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 5 }}
    >
      <path
        d="M100 0 C92 18, 82 34, 98 52 C114 34, 108 18, 100 0Z"
        stroke="#f1bb63"
        strokeWidth="1.5"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M100 50 C70 60, 30 80, 10 120"
        stroke="#f1bb63"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M100 50 C130 60, 170 80, 190 120"
        stroke="#f1bb63"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

function NavArrow({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-sm transition-all duration-200"
      style={{
        background: "rgba(219,236,231,0.86)",
        border: "1px solid rgba(230,243,238,0.55)",
        color: disabled ? "rgba(38,62,54,0.35)" : "rgba(38,62,54,0.9)",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "0 10px 18px rgba(0,0,0,0.16)",
      }}
    >
      {dir === "left" ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M8 2L4 6L8 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4 2L8 6L4 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function Dash() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "32px",
        height: "2px",
        background:
          "linear-gradient(90deg, transparent, #a8d5b5 30%, rgba(168,213,181,0.95))",
        verticalAlign: "middle",
        opacity: 0.8,
      }}
    />
  );
}

function Starfield() {
  const dots = [
    [4, 10, 2, 0.38],
    [10, 18, 1.4, 0.25],
    [14, 61, 2.4, 0.35],
    [8, 83, 1.6, 0.28],
    [18, 28, 1.2, 0.18],
    [22, 74, 1.8, 0.32],
    [26, 48, 1.5, 0.2],
    [30, 10, 2, 0.26],
    [34, 90, 1.6, 0.2],
    [40, 18, 1.8, 0.22],
    [42, 32, 1.2, 0.16],
    [44, 54, 2.3, 0.28],
    [48, 68, 1.1, 0.16],
    [52, 84, 1.8, 0.22],
    [56, 12, 2.2, 0.3],
    [58, 42, 1.4, 0.18],
    [61, 59, 1.9, 0.24],
    [65, 7, 1.3, 0.18],
    [68, 76, 2.1, 0.26],
    [70, 30, 1.5, 0.2],
    [74, 52, 1.2, 0.18],
    [77, 88, 2.4, 0.28],
    [80, 21, 1.5, 0.2],
    [84, 39, 1.1, 0.16],
    [86, 63, 1.9, 0.24],
    [90, 11, 1.6, 0.18],
    [93, 45, 2.2, 0.28],
    [96, 80, 1.4, 0.2],
    [13, 38, 1.1, 0.14],
    [17, 95, 1.4, 0.18],
    [47, 3, 1.8, 0.22],
    [59, 96, 1.6, 0.16],
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <div
          key={`${dot[0]}-${dot[1]}`}
          className="absolute rounded-full"
          style={{
            top: `${dot[0]}%`,
            left: `${dot[1]}%`,
            width: dot[2],
            height: dot[2],
            background: "rgba(225,247,238,0.9)",
            opacity: dot[3],
            boxShadow: "0 0 10px rgba(225,247,238,0.35)",
          }}
        />
      ))}
    </div>
  );
}
