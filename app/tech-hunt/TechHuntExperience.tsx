"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Fingerprint,
  MapPin,
  ShieldAlert,
  Bolt,
  AlertCircle,
  Lock,
  Sparkles,
  Terminal,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Add Sora font import for this page only
if (typeof document !== "undefined") {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Sora:wght@700;800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

type TechHuntExperienceProps = {
  route?: string;
};

type VerifyResponse = {
  success: boolean;
  status?:
    | "waiting"
    | "question_unlocked"
    | "level_completed"
    | "completed"
    | "cooldown"
    | "wrong_route"
    | "duplicate"
    | "event_inactive"
    | "not_all_verified"
    | "error";
  message?: string;
  teamName?: string;
  currentLevel?: number;
  totalLevels?: number;
  verifiedCount?: number;
  totalMembers?: number;
  clue?: string;
  nextClue?: string;
  questionUnlocked?: boolean;
  question?: string;
  imageUrl?: string | null;
  cooldownUntil?: string;
  retryAfterSeconds?: number;
  completedAt?: string;
  members?: Array<{
    name: string;
    email: string;
    verified: boolean;
  }>;
};

const LANDING_RULES = [
  "Team size: 2-4 members",
  "Every member must verify",
  "Wrong route attempts trigger cooldown",
  "Teams must stay together",
  "Misconduct may disqualify the team",
  "Organizers' decisions are final",
];

const EVENT_FLOW = [
  "Receive clue",
  "Find location",
  "Find hidden QR",
  "All teammates verify",
  "Final verifier unlocks challenge",
  "Solve question",
  "Correct answer unlocks next clue",
];

const SECRET_COPY = "Access signal hidden. Tap the emblem.";

function TechHuntNavbar({
  isCheckpointMode,
  checkpointLabel,
  isSyncing,
}: {
  isCheckpointMode: boolean;
  checkpointLabel: string;
  isSyncing?: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-300/15 bg-[#03110d]/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/phoenix/logo.png"
            alt="Phoenix Treasure Hunt"
            width={44}
            height={44}
            className="h-9 w-9 shrink-0 sm:h-12 sm:w-12"
          />
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100/90 sm:text-sm sm:tracking-[0.28em]">
            Phoenix Treasure Hunt
          </p>
        </div>

        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {isCheckpointMode ? (
            <Badge className="hidden border-emerald-300/20 bg-emerald-300/10 text-emerald-100 sm:inline-flex">
              {checkpointLabel}
            </Badge>
          ) : (
            <Button
              asChild
              variant="outline"
              className="h-8 min-w-[68px] border-emerald-300/25 bg-transparent px-2.5 text-[11px] text-emerald-100 transition-colors duration-150 ease-in-out sm:h-9 sm:px-3 sm:text-xs"
            >
              <Link href="#rules">Rules</Link>
            </Button>
          )}

          <Button
            asChild
            className="h-8 min-w-[78px] bg-[#B8FFE1] px-2.5 text-[11px] text-[#052015] hover:bg-[#D2FFE9] transition-colors duration-150 ease-in-out sm:h-9 sm:px-3 sm:text-xs"
          >
            <Link
              href={
                isCheckpointMode ? "/tech-hunt" : "/registration/404-not-found"
              }
            >
              {isCheckpointMode ? "Landing" : "Register"}
            </Link>
          </Button>

          {isSyncing && (
            <Badge className="ml-2 hidden border-emerald-500/30 bg-emerald-500/10 text-[10px] tracking-widest text-emerald-400 md:inline-flex">
              SYNC: ACTIVE
            </Badge>
          )}
        </nav>
      </div>
    </header>
  );
}

function linkify(text?: string): React.ReactNode {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const nodes: Array<string | React.ReactNode> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const idx = match.index;
    if (idx > lastIndex) nodes.push(text.slice(lastIndex, idx));
    const url = match[0];
    nodes.push(
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-200 underline"
      >
        {url}
      </a>,
    );
    lastIndex = idx + url.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function TechHuntExperience({ route }: TechHuntExperienceProps) {
  const isCheckpointMode = Boolean(route);
  const normalizedRoute = (route || "").trim().toLowerCase();
  const emailStorageKey = normalizedRoute
    ? `techHuntEmail:${normalizedRoute}`
    : "techHuntEmail";
  const emailLockedStorageKey = normalizedRoute
    ? `techHuntEmailLocked:${normalizedRoute}`
    : "techHuntEmailLocked";
  const [secretClicks, setSecretClicks] = useState(0);
  const [email, setEmail] = useState("");
  const [rememberedEmail, setRememberedEmail] = useState("");
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<VerifyResponse | null>(null);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const syncProgress = useCallback(
    async (syncEmail: string) => {
      if (!route || !syncEmail) return;

      try {
        const res = await fetch(
          `/api/tech-hunt/verify?route=${encodeURIComponent(route)}&email=${encodeURIComponent(syncEmail)}&t=${Date.now()}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as VerifyResponse;
        if (res.ok) {
          setResponse(data);
        }
      } catch {
        // ignore background sync failures; user can still verify manually
      }
    },
    [route],
  );

  useEffect(() => {
    if (!isCheckpointMode) return;

    // reset per-route UI state before loading route-scoped persisted values
    setEmail("");
    setRememberedEmail("");
    setLocked(false);
    setResponse(null);

    const stored = window.localStorage.getItem(emailStorageKey) || "";
    const lockedStored =
      window.localStorage.getItem(emailLockedStorageKey) === "true";
    if (stored) {
      setEmail(stored);
      setRememberedEmail(stored);
      if (lockedStored) setLocked(true);
      void syncProgress(stored);
    } else if (lockedStored) {
      // inconsistent state: lock existed but no email saved — clear it
      window.localStorage.removeItem(emailLockedStorageKey);
      setLocked(false);
    }
  }, [isCheckpointMode, emailLockedStorageKey, emailStorageKey, route]);

  useEffect(() => {
    if (!isCheckpointMode || !rememberedEmail) return;

    const refreshNow = () => {
      void syncProgress(rememberedEmail);
    };

    const interval = setInterval(refreshNow, 3000); // sync every 3 seconds
    const onVisibilityChange = () => {
      if (!document.hidden) {
        refreshNow();
      }
    };
    const onFocus = () => {
      refreshNow();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    refreshNow();

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isCheckpointMode, rememberedEmail, syncProgress]);

  useEffect(() => {
    if (!response?.cooldownUntil) {
      setCooldownSeconds(0);
      return;
    }

    const updateCooldown = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(response.cooldownUntil as string).getTime() - Date.now()) /
            1000,
        ),
      );
      setCooldownSeconds(remaining);
    };

    updateCooldown();
    const timer = window.setInterval(updateCooldown, 1000);
    return () => window.clearInterval(timer);
  }, [response?.cooldownUntil]);

  const revealRegistration = secretClicks >= 3;

  const checkpointLabel = useMemo(() => {
    if (!route) return "Signal awaiting";
    return route.replace(/-/g, " ").toUpperCase();
  }, [route]);

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!route || !email.trim()) return;

    if (
      locked &&
      rememberedEmail &&
      email.trim().toLowerCase() !== rememberedEmail
    ) {
      setResponse({
        success: false,
        status: "error",
        message: `This device is locked to ${rememberedEmail}.`,
      });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/tech-hunt/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route, email: email.trim() }),
      });

      const data = (await res.json()) as VerifyResponse;
      setResponse(data);

      if (res.ok && data.success) {
        const normalized = email.trim().toLowerCase();
        window.localStorage.setItem(emailStorageKey, normalized);
        // lock this device for this checkpoint only
        window.localStorage.setItem(emailLockedStorageKey, "true");
        setRememberedEmail(normalized);
        setLocked(true);
        void syncProgress(normalized);
      }
    } catch (error) {
      setResponse({
        success: false,
        status: "error",
        message: "Unable to reach the hunt server. Try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!route || !challengeAnswer.trim()) return;

    const answerEmail = rememberedEmail || email.trim();
    if (!answerEmail) return;

    setAnswerLoading(true);

    try {
      const res = await fetch("/api/tech-hunt/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route,
          email: answerEmail,
          answer: challengeAnswer.trim(),
        }),
      });

      const data = (await res.json()) as VerifyResponse;
      setResponse(data);

      if (res.ok && data.success) {
        setChallengeAnswer("");
        void syncProgress(answerEmail);
      }
    } catch {
      setResponse({
        success: false,
        status: "error",
        message: "Unable to submit answer. Try again in a moment.",
      });
    } finally {
      setAnswerLoading(false);
    }
  };

  if (!isCheckpointMode) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#0e0e0e] text-[#e5e2e1]">
        <TechHuntNavbar
          isCheckpointMode={isCheckpointMode}
          checkpointLabel={checkpointLabel}
          isSyncing={false}
        />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 md:px-16">
          <section className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                  Operation ID:
                </span>

                <span className="text-[11px] font-bold tracking-[0.15em]">
                  PHOENIX-HUNT-2026
                </span>
              </div>

              <h1
                className="text-6xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                PHOENIX
                <br />
                TECH
                <br />
                <span className="text-[#50c878]">HUNT</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#879487]">
                A live QR treasure hunt built for teams moving across campus
                under pressure. Decode riddles, find checkpoints, verify
                together, and stay ahead of every other squad.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-14 rounded-lg border border-[#2a2a2a] bg-[#131313] px-10 uppercase tracking-[0.25em] hover:bg-[#50c878] hover:text-[#03110d] transition-colors duration-150 ease-in-out"
                >
                  <Link href="#how-it-works">
                    Enter The Hunt
                    <ArrowRight className="ml-3 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14  border border-[#2a2a2a] bg-transparent rounded-lg px-10 uppercase tracking-[0.25em] text-white"
                >
                  <Link href="#rules">Read Rules</Link>
                </Button>
              </div>
            </div>

            <div className="border rounded-2xl border-[#2a2a2a] bg-[#131313] p-10">
              <div className="mb-6 flex items-center gap-2 text-[#50c878]">
                <Terminal className="h-4 w-4" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                  Hidden Entry Console
                </span>
              </div>

              <h2
                className="text-3xl font-black uppercase"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Access Node
              </h2>

              <div className="mt-8 border border-[#2a2a2a] bg-black/30 p-6">
                <div className="flex items-center gap-2 text-[#50c878]">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.2em]">
                    signal.log
                  </span>
                </div>

                <p className="mt-6 leading-7 text-[#879487]">{SECRET_COPY}</p>

                <button
                  type="button"
                  onClick={() => setSecretClicks((value) => value + 1)}
                  className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#50c878]"
                >
                  <Fingerprint className="h-4 w-4" />
                  Tap Emblem {secretClicks}/3
                </button>
              </div>

              <div className="mt-8 border border-dashed border-[#2a2a2a] p-6">
                <p className="text-sm leading-relaxed text-[#879487]">
                  The hidden portal should not be obvious. Discover it, then
                  continue.
                </p>

                {revealRegistration ? (
                  <Button
                    asChild
                    className="mt-6 w-full rounded-none bg-[#50c878] text-[#03110d] hover:bg-[#72d993] transition-colors duration-150 ease-in-out"
                  >
                    <Link href="/registration">
                      Open Hidden Registration Portal
                    </Link>
                  </Button>
                ) : (
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#879487]">
                    Awaiting signal pattern...
                  </p>
                )}
              </div>
            </div>
          </section>

          <section id="rules" className="mt-32">
            <div className="mb-16 flex items-end justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                  Section_01
                </span>

                <h2
                  className="mt-3 text-4xl font-black uppercase tracking-tight"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Rules Of Engagement
                </h2>
              </div>

              <div className="hidden h-px flex-1 bg-[#2a2a2a] md:block" />
            </div>

            <div className="grid gap-px bg-[#2a2a2a] md:grid-cols-2 xl:grid-cols-3">
              {LANDING_RULES.map((rule, index) => (
                <div key={rule} className="bg-[#131313] p-8">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                    Protocol_{String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 text-sm font-bold uppercase leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="how-it-works" className="mt-32">
            <div className="mb-16">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                Section_02
              </span>

              <h2
                className="mt-3 text-4xl font-black uppercase tracking-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Gameplay Flow
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {EVENT_FLOW.map((step, index) => (
                <div
                  key={step}
                  className="border border-[#2a2a2a] bg-[#131313] p-8"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#879487]">
                    Step_{String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#2a2a2a] text-[#50c878]">
                      {index + 1}
                    </div>

                    <p className="text-lg font-bold uppercase tracking-wide">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-32 border-t border-[#2a2a2a] pt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#879487]">
                  Student Technical Council IIT Patna
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#50c878]">
                  Support: stchybridiitp@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#879487]">
                <div className="h-2 w-2 animate-pulse bg-[#50c878]" />
                Secure_Connection_Established
              </div>
            </div>
          </footer>
        </div>
      </main>
    );
  }

  const verifiedCount = response?.verifiedCount ?? 0;
  const totalMembers = response?.totalMembers ?? 0;
  const progressValue =
    totalMembers > 0 ? (verifiedCount / totalMembers) * 100 : 0;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(184,255,225,0.12),transparent_42%),linear-gradient(180deg,#020b09_0%,#04120d_55%,#020805_100%)] text-slate-100">
      <TechHuntNavbar
        isCheckpointMode={isCheckpointMode}
        checkpointLabel={checkpointLabel}
        isSyncing={!!rememberedEmail}
      />
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col justify-center px-4 py-4 sm:min-h-[calc(100vh-4rem)] sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.22em] text-emerald-200/90 sm:text-xs sm:tracking-[0.35em]">
          <span className="truncate pr-2">Phoenix Treasure Hunt</span>
          <span className="shrink-0">{checkpointLabel}</span>
        </div>

        <Card className="relative overflow-hidden border-emerald-300/20 bg-[#061711]/85 shadow-2xl shadow-emerald-950/20 backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent" />
          <CardHeader className="space-y-4 pb-3">
            <div className="flex items-center gap-2 text-emerald-200">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                Checkpoint detected
              </span>
            </div>
            <CardTitle className="text-3xl text-white uppercase tracking-tight sm:text-4xl">
              PHOENIX TREASURE HUNT
            </CardTitle>
            <p className="max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
              Enter your registered email to verify at this checkpoint. The
              system will confirm your team, track progress, and unlock the next
              clue when everyone is in sync.
            </p>
          </CardHeader>

          <CardContent className="space-y-5 pb-6">
            <form onSubmit={handleVerify} className="space-y-3">
              <label
                className="block text-sm font-medium text-slate-300"
                htmlFor="tech-hunt-email"
              >
                Registered email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="tech-hunt-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={locked}
                  placeholder="Enter your College email ID"
                  className="h-14 w-full rounded-full border border-white/10 bg-black/60 px-5 text-base text-slate-100 placeholder:text-slate-500"
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !email.trim() ||
                    (locked && email.trim().toLowerCase() !== rememberedEmail)
                  }
                  className="h-14 rounded-full bg-[#0b7b4d] px-8 text-white hover:bg-[#0f9a61] transition-colors duration-150 ease-in-out"
                >
                  {loading ? "Verifying..." : "Verify Identity"}
                </Button>
              </div>
            </form>

            {response?.teamName ? (
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-100/90">
                <span className="uppercase tracking-[0.3em] text-slate-500">
                  Matched team
                </span>
                <Badge className="border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
                  {response.teamName}
                </Badge>
              </div>
            ) : null}

            {rememberedEmail ? (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="uppercase tracking-[0.3em] text-slate-500">
                  Last email
                </span>
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-slate-100"
                >
                  {rememberedEmail}
                </Badge>
              </div>
            ) : null}

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Verification status</span>
                <span>
                  {verifiedCount}/{totalMembers || "?"} verified
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-300 via-emerald-200 to-[#B8FFE1] transition-all"
                  style={{ width: `${Math.min(100, progressValue)}%` }}
                />
              </div>
            </div>

            {response?.members && response.members.length > 0 ? (
              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>Team Members Status</span>
                </div>
                <div className="grid gap-2">
                  {response.members.map((m) => (
                    <div
                      key={m.email}
                      className="flex items-center justify-between rounded-lg bg-black/20 p-2.5 text-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">
                          {m.name}
                        </span>
                      </div>
                      {m.verified ? (
                        <Badge className="bg-emerald-500/20 text-[10px] text-emerald-400 hover:bg-emerald-500/20 transition-colors duration-150 ease-in-out">
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-slate-700 text-[10px] text-slate-500"
                        >
                          Pending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {response?.questionUnlocked ? (
              <div className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-linear-to-br from-slate-950 via-emerald-950/30 to-slate-900 p-5 text-emerald-50 shadow-[0_0_40px_rgba(16,185,129,0.16)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,255,225,0.24),transparent_34%)]" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-emerald-200">
                    <Sparkles className="h-4 w-4" />
                    Mission challenge unlocked
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      Solve to claim the next clue
                    </p>
                    <p className="mt-2 text-sm text-emerald-50/80">
                      The answer stays server-side. Only the final verifier can
                      move this checkpoint forward.
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-300/15 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      Challenge prompt
                    </p>
                    {/* normalize image path (strip leading public/ if present) */}
                    {(() => {
                      const raw = response?.imageUrl || null;
                      const imageSrc = raw
                        ? raw.startsWith("http")
                          ? raw
                          : raw.replace(/^\/?public\//, "/")
                        : null;

                      return (
                        <>
                          {imageSrc ? (
                            <div className="mt-3">
                              <Image
                                src={imageSrc}
                                height={200}
                                width={200}
                                alt="challenge"
                                className="max-h-64 w-auto rounded-md"
                              />
                            </div>
                          ) : null}

                          <p className="mt-3 text-lg leading-8 text-emerald-50">
                            {linkify(response?.question || "")}
                          </p>
                        </>
                      );
                    })()}

                    <form
                      onSubmit={handleSubmitAnswer}
                      className="mt-5 space-y-3"
                    >
                      <Input
                        id="tech-hunt-answer"
                        value={challengeAnswer}
                        onChange={(event) =>
                          setChallengeAnswer(event.target.value)
                        }
                        placeholder="Enter answer"
                        autoComplete="off"
                        className="h-12 border-white/10 bg-slate-900/80 text-base text-slate-100 placeholder:text-slate-500"
                      />
                      <Button
                        type="submit"
                        disabled={answerLoading || !challengeAnswer.trim()}
                        className="h-12 w-full bg-[#B8FFE1] px-6 text-[#052015] hover:bg-[#D2FFE9] transition-colors duration-150 ease-in-out"
                      >
                        {answerLoading ? "Submitting..." : "Submit answer"}
                        <ArrowRight className="ml-3 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}

            {response?.status === "waiting" ? (
              <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-50">
                <p className="flex items-center gap-2 font-medium">
                  <Clock3 className="h-4 w-4" /> Waiting for remaining
                  teammates...
                </p>
                <p className="mt-2 text-sm text-emerald-50/80">
                  Keep the team together. Once all members verify, the next clue
                  will unlock automatically. Current progress:{" "}
                  {response.verifiedCount}/{response.totalMembers}.
                </p>
              </div>
            ) : null}

            {response?.status === "cooldown" ? (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-50">
                <p className="flex items-center gap-2 font-medium">
                  <ShieldAlert className="h-4 w-4" /> Wrong path detected.
                </p>
                <p className="mt-2 text-sm text-amber-50/80">
                  Return and decode carefully.
                </p>
                <div className="mt-3 text-lg font-semibold">
                  Retry in 00:{String(cooldownSeconds).padStart(2, "0")}
                </div>
              </div>
            ) : null}

            {response?.status === "wrong_route" ? (
              <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-50">
                <p className="flex items-center gap-2 font-medium">
                  <ShieldAlert className="h-4 w-4" /> Wrong path detected.
                </p>
                <p className="mt-2 text-sm text-rose-50/80">
                  Return and decode carefully.
                </p>
              </div>
            ) : null}

            {response?.status === "not_all_verified" ? (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-50">
                <p className="flex items-center gap-2 font-medium">
                  <Users className="h-4 w-4" /> Team checkpoint not ready.
                </p>
                <p className="mt-2 text-sm text-amber-50/80">
                  {response.message ||
                    "Not all team members have verified on the current checkpoint. All members must verify before progression."}
                </p>
                <p className="mt-3 text-sm font-medium">
                  Current progress: {response.verifiedCount}/
                  {response.totalMembers} members verified
                </p>
              </div>
            ) : null}

            {response?.status === "duplicate" ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-200">
                <p className="flex items-center gap-2 font-medium">
                  <Fingerprint className="h-4 w-4" /> This member has already
                  verified this checkpoint.
                </p>
              </div>
            ) : null}

            {response?.status === "event_inactive" ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-200">
                <p className="flex items-center gap-2 font-medium">
                  <Terminal className="h-4 w-4" /> The hunt is not active right
                  now.
                </p>
              </div>
            ) : null}

            {response?.status === "level_completed" ||
            response?.status === "completed" ? (
              <div className="space-y-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-50">
                <p className="flex items-center gap-2 text-lg font-semibold">
                  <CheckCircle2 className="h-5 w-5" />
                  {response.status === "completed"
                    ? "Treasure Hunt Completed"
                    : "Level Completed"}
                </p>
                {response.teamName ? (
                  <p className="text-sm text-emerald-50/80">
                    Team {response.teamName} is moving forward.
                  </p>
                ) : null}
                {response.verifiedCount !== undefined &&
                response.totalMembers !== undefined ? (
                  <p className="text-sm text-emerald-50/80">
                    Verified {response.verifiedCount}/{response.totalMembers}{" "}
                    members at this level.
                  </p>
                ) : null}
                {response.clue || response.nextClue ? (
                  <div className="rounded-xl border border-emerald-300/20 bg-slate-950/50 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      Next clue
                    </p>
                    <p className="mt-2 text-lg leading-8 text-emerald-50">
                      {response.clue || response.nextClue}
                    </p>
                  </div>
                ) : null}
                {response.completedAt ? (
                  <p className="text-xs text-emerald-100/70">
                    Completed at{" "}
                    {new Date(response.completedAt).toLocaleString()}
                  </p>
                ) : null}
              </div>
            ) : null}

            {response?.message && response.status === "error" ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-200">
                {response.message}
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="flex items-center gap-3 p-4">
                  <Trophy className="h-5 w-5 text-emerald-200" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      Status
                    </p>
                    <p className="text-sm text-slate-200">
                      {response?.status === "completed"
                        ? "Finished"
                        : response?.status === "question_unlocked"
                          ? "Challenge live"
                          : response?.status === "level_completed"
                            ? "Unlocked"
                            : response?.status === "waiting"
                              ? "In sync"
                              : "Ready"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="flex items-center gap-3 p-4">
                  <Copy className="h-5 w-5 text-emerald-200" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      Checkpoint
                    </p>
                    <p className="text-sm text-slate-200">{checkpointLabel}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Backend remains the single source of truth.</span>
              <span>Do not leave the page unless the clue tells you to.</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link
            href="/tech-hunt"
            className="inline-flex items-center gap-2 hover:text-emerald-200 transition-colors duration-150 ease-in-out"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Landing page
          </Link>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-200" /> Immersive but
            fast
          </span>
        </div>
      </div>
    </main>
  );
}
