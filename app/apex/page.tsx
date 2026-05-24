"use client";

import { motion } from "framer-motion";
import { Lock, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type Sigil = {
	name: string;
	rune: string;
	hint: string;
	glow: string;
};

const SIGILS: Sigil[] = [
	{
		name: "Nightshade",
		rune: "☾",
		hint: "The last whisper of dusk.",
		glow: "from-indigo-300/25 via-violet-300/10 to-transparent",
	},
	{
		name: "Petal",
		rune: "✿",
		hint: "A bloom that opens at dawn.",
		glow: "from-rose-300/25 via-fuchsia-300/10 to-transparent",
	},
	{
		name: "Oracle",
		rune: "◌",
		hint: "A ring that sees ahead.",
		glow: "from-cyan-300/25 via-sky-300/10 to-transparent",
	},
	{
		name: "Thorn",
		rune: "✦",
		hint: "A sharper breath in the middle.",
		glow: "from-emerald-300/25 via-lime-300/10 to-transparent",
	},
	{
		name: "Omen",
		rune: "◉",
		hint: "A sign that arrives twice.",
		glow: "from-amber-300/25 via-orange-300/10 to-transparent",
	},
	{
		name: "Ivory",
		rune: "❖",
		hint: "A pale shard of moonlight.",
		glow: "from-white/25 via-slate-200/10 to-transparent",
	},
] as const;

const RITUAL_ORDER = ["Petal", "Omen", "Thorn", "Ivory", "Oracle", "Nightshade"] as const;

export default function ApexPage() {
	const [picked, setPicked] = useState<string[]>([]);
	const [mistakes, setMistakes] = useState(0);
	const [solved, setSolved] = useState(false);
	const [status, setStatus] = useState(
		"Read the first breath of each sigil. The answer is hidden in the ingredients, not in phonetic code.",
	);

	const pickedLetters = useMemo(
		() => picked.map((name) => name[0]).join(""),
		[picked],
	);

	const handlePick = (name: string) => {
		if (solved) {
			return;
		}

		const expectedName = RITUAL_ORDER[picked.length];

		if (name !== expectedName) {
			setPicked([]);
			setMistakes((count) => count + 1);
			setStatus("The cauldron rejects that sigil. The ritual begins again.");
			return;
		}

		const nextPicked = [...picked, name];
		setPicked(nextPicked);

		if (nextPicked.length === RITUAL_ORDER.length) {
			setSolved(true);
			setStatus("The veil parts. The hidden draught is revealed.");
			return;
		}

		setStatus(`${nextPicked.length}/6 sigils aligned.`);
	};

	const resetRitual = () => {
		setPicked([]);
		setMistakes(0);
		setSolved(false);
		setStatus(
			"Read the first breath of each sigil. The answer is hidden in the ingredients, not in phonetic code.",
		);
	};

	return (
		<section className="relative min-h-screen overflow-hidden bg-[#040807] text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.14),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,#06110d_0%,#030605_100%)]" />
			<motion.div
				aria-hidden="true"
				className="absolute left-6 top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"
				animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				aria-hidden="true"
				className="absolute bottom-6 right-4 h-56 w-56 rounded-full bg-amber-300/15 blur-3xl"
				animate={{ x: [0, -14, 0], y: [0, 8, 0] }}
				transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
			/>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">

				<div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
					>
						<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,transparent_68%,rgba(255,255,255,0.05))]" />

						<div className="relative z-10 max-w-2xl">
							<span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-100/70">
								<Lock className="h-3.5 w-3.5" />
								Hidden route
							</span>

							<h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
								<span className="text-white">A ritual that spells </span>
								<span className="bg-linear-to-r from-emerald-200 via-amber-100 to-cyan-200 bg-clip-text text-transparent">
									Potion
								</span>
							</h2>

							<p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
								This is not a phonetic cipher. The secret is hidden inside six
								moonlit ingredients. Tap them in the right order and the vault
								opens.
							</p>

							<div
								className="mt-6 rounded-2xl border border-emerald-300/10 bg-black/20 p-4 text-sm leading-7 text-emerald-50/75"
								aria-live="polite"
							>
								{status}
							</div>

							<div className="mt-6 grid gap-3 sm:grid-cols-3">
								<div className="rounded-2xl border border-white/10 bg-white/3 p-4">
									<p className="text-xs uppercase tracking-[0.3em] text-white/45">
										Progress
									</p>
									<p className="mt-2 text-2xl font-semibold text-white">
										{picked.length}/6
									</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/3 p-4">
									<p className="text-xs uppercase tracking-[0.3em] text-white/45">
										Mistakes
									</p>
									<p className="mt-2 text-2xl font-semibold text-white">
										{mistakes}
									</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/3 p-4">
									<p className="text-xs uppercase tracking-[0.3em] text-white/45">
										Hidden word
									</p>
									<p className="mt-2 text-2xl font-semibold tracking-[0.25em] text-emerald-200">
										{solved ? "POTION" : "······"}
									</p>
								</div>
							</div>

							<div className="mt-8 flex flex-wrap gap-3">
								<button
									type="button"
									onClick={resetRitual}
									className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
								>
									<RotateCcw className="h-4 w-4" />
									Reset ritual
								</button>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.08 }}
						className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6"
					>
						<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_48%),radial-gradient(circle_at_bottom,rgba(251,191,36,0.12),transparent_34%)]" />

						<div className="relative z-10">
							<div className="mb-5 flex items-center justify-between gap-3">
								<div>
									<p className="text-xs uppercase tracking-[0.3em] text-emerald-100/45">
										Sigil deck
									</p>
									<h3 className="mt-1 text-xl font-semibold text-white">
										Tap the six ingredients in order
									</h3>
								</div>

								<div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
									{pickedLetters || "-----"}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
								{SIGILS.map((sigil) => {
									const isPicked = picked.includes(sigil.name);
									const isSolved = solved;

									return (
										<motion.button
											key={sigil.name}
											type="button"
											onClick={() => handlePick(sigil.name)}
											whileHover={{ y: -4, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5 ${
												isPicked || isSolved
													? "border-emerald-300/30 bg-emerald-300/10"
													  : "border-white/10 bg-white/4 hover:border-white/20 hover:bg-white/6"
											}`}
										>
											<div
												className={`pointer-events-none absolute inset-0 bg-linear-to-br ${sigil.glow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
											/>

											<div className="relative z-10 flex items-start justify-between gap-3">
												<div>
													<p className="text-4xl leading-none text-white/90 sm:text-5xl">
														{sigil.rune}
													</p>
													<p className="mt-4 text-base font-semibold tracking-wide text-white">
														{sigil.name}
													</p>
													<p className="mt-1 text-sm leading-6 text-white/55">
														{sigil.hint}
													</p>
												</div>

												<div
													className={`mt-1 h-3 w-3 rounded-full ${
														isPicked
															? "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]"
															: "bg-white/20"
													}`}
												/>
											</div>
										</motion.button>
									);
								})}
							</div>

							  <div className="mt-5 rounded-2xl border border-white/10 bg-white/3 p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-white/45">
									Spell trace
								</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{picked.length ? (
										picked.map((name, index) => (
											<span
												key={`${name}-${index}`}
												className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-emerald-100"
											>
												{name[0]}
											</span>
										))
									) : (
										<span className="text-sm text-white/40">
											The runes are still sleeping.
										</span>
									)}
								</div>
							</div>

							{solved ? (
								<motion.div
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.45 }}
									className="mt-5 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5 text-center"
								>
									<p className="text-xs uppercase tracking-[0.35em] text-emerald-100/70">
										Vault unlocked
									</p>
									<p className="mt-3 text-4xl font-bold tracking-[0.28em] text-emerald-100 sm:text-5xl">
										POTION
									</p>
									<p className="mt-2 text-sm leading-6 text-emerald-50/70">
										The hidden draught has been found. Share the route only with
										the participants.
									</p>
								</motion.div>
							) : null}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
