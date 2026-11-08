"use client";

import {
	AnimatePresence,
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Quote,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lightbox from "../components/Lightbox";
import ProjectCard from "../components/ProjectCard";
import aperture from "@/pictures/aperture.png";
import {
	Aperture,
	ArrowLink,
	ButtonSolid,
	Corners,
	FilmStrip,
	Frame,
	Kicker,
	Marquee,
	Meta,
	Reveal,
	SectionTitle,
} from "../components/primitives";
import {
	imagery,
	projects,
	services,
	site,
	stats,
	testimonials,
} from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";
import Image from "next/image";

/* ————— animated counter ————— */
function CountUp({ value }: { value: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduce = useReducedMotion();
	const match = value.match(/^(\d+)(.*)$/);
	const target = match ? parseInt(match[1], 10) : 0;
	const suffix = match ? match[2] : value;
	const pad = match && match[1].startsWith("0") ? match[1].length : 0;

	useEffect(() => {
		if (!inView || !ref.current) return;
		if (reduce) {
			ref.current.textContent = value;
			return;
		}
		const controls = animate(0, target, {
			duration: 1.6,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (v) => {
				if (ref.current)
					ref.current.textContent =
						String(Math.round(v)).padStart(pad, "0") + suffix;
			},
		});
		return () => controls.stop();
	}, [inView, target, suffix, pad, reduce, value]);

	return (
		<span ref={ref}>
			{pad ? "0".repeat(pad) : "0"}
			{suffix}
		</span>
	);
}

/* ————— hero ————— */
function Hero() {
	const reduce = useReducedMotion();
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

	const stagger = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: reduce ? 0 : 0.12,
				delayChildren: 0.15,
			},
		},
	};
	const item = {
		hidden: { opacity: 0, y: reduce ? 0 : 26 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
		},
	};

	return (
		<section ref={ref} className="relative overflow-hidden">
			{/* warm ambient wash */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(52% 42% at 82% 12%, rgba(212,175,94,0.16), transparent 70%), radial-gradient(40% 36% at 6% 88%, rgba(108,21,30,0.07), transparent 70%)",
				}}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-28 top-24 hidden h-[380px] w-[380px] animate-spin-slower bg-wine-600 opacity-20 lg:block"
				style={{
					WebkitMaskImage: `url(${aperture.src})`,
					maskImage: `url(${aperture.src})`,
					WebkitMaskSize: "contain",
					maskSize: "contain",
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					WebkitMaskPosition: "center",
					maskPosition: "center",
				}}
			/>
			{/* <Aperture
        className="pointer-events-none absolute -left-28 top-24 hidden h-[380px] w-[380px] text-wine-600/[0.05] animate-spin-slower lg:block"
        strokeWidth={0.5}
      /> */}

			<div className="relative mx-auto grid min-h-svh max-w-[1600px] items-center gap-12 px-5 pb-16 pt-[118px] sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:px-14 lg:pb-20">
				{/* left — editorial introduction */}
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="show"
					className="relative z-10"
				>
					<motion.div variants={item}>
						<Kicker>
							Independent photographer · Available worldwide
						</Kicker>
					</motion.div>

					<motion.h1
						variants={item}
						className="mt-8 font-display text-[clamp(3.6rem,8.2vw,7.6rem)] font-light leading-[0.93] tracking-[-0.04em] text-ink-900"
					>
						The art of
						<br />
						seeing{" "}
						<span className="relative inline-block italic text-wine-600">
							differently.
							<svg
								className="absolute -bottom-3 left-0 w-full text-brass-500"
								viewBox="0 0 300 12"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M4 8 C 80 2, 220 2, 296 7"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
								/>
							</svg>
						</span>
					</motion.h1>

					<motion.p
						variants={item}
						className="mt-9 max-w-md text-[15px] leading-[1.95] text-ink-500"
					>
						Thoughtful imagery for the moments, people, and places
						that deserve to be remembered. A study of light,
						emotion, and the beauty in between.
					</motion.p>

					<motion.div
						variants={item}
						className="mt-10 flex flex-wrap items-center gap-7"
					>
						<Link to="/portfolio">
							<ButtonSolid>Explore the work</ButtonSolid>
						</Link>
						<Link to="/about">
							<ArrowLink>The photographer</ArrowLink>
						</Link>
					</motion.div>

					<motion.div
						variants={item}
						className="mt-14 flex items-center gap-6 border-t border-ink-900/10 pt-6"
					>
						<div>
							<p className="font-display text-2xl tracking-tight text-ink-900">
								01—08
							</p>
							<Meta className="mt-1 block text-ink-500">
								Selected stories
							</Meta>
						</div>
						<span className="h-10 w-px bg-ink-900/10" />
						<p className="max-w-[150px] text-[11px] leading-relaxed text-ink-500">
							Creating timeless photographs with an editorial eye.
						</p>
						<span className="hidden h-10 w-px bg-ink-900/10 sm:block" />
						<div className="hidden sm:block">
							<p className="font-display text-2xl italic tracking-tight text-pine-700">
								Est. {site.est}
							</p>
							<Meta className="mt-1 block text-ink-500">
								Lyon, France
							</Meta>
						</div>
					</motion.div>
				</motion.div>

				{/* right — the viewfinder */}
				<motion.div
					initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 1.1,
						delay: 0.25,
						ease: [0.22, 1, 0.36, 1],
					}}
					className="relative mx-auto w-full max-w-[640px]"
				>
					<motion.div style={{ y: imgY }} className="relative">
						<div className="relative aspect-[4/5] overflow-hidden shadow-lift">
							<Frame
								src={imagery.hero}
								alt={imagery.heroAlt}
								eager
								kenburns
								className="absolute inset-0"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-pine-950/55 via-transparent to-wine-950/10" />
							<Corners className="text-cream/80" size="h-7 w-7" />

							{/* viewfinder readouts */}
							<div className="absolute inset-x-6 top-5 z-10 flex items-center justify-between">
								<Meta className="text-cream/90">
									FR. 001 — GOLDEN HOUR
								</Meta>
								<span className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-wine-400 animate-blink" />
									<Meta className="text-cream/90">SPOT</Meta>
								</span>
							</div>

							{/* focus mark */}
							<div
								className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-cream/50"
								aria-hidden="true"
							>
								<svg
									width="46"
									height="46"
									viewBox="0 0 46 46"
									fill="none"
								>
									<path
										d="M23 8v8M23 30v8M8 23h8M30 23h8"
										stroke="currentColor"
										strokeWidth="1.4"
									/>
								</svg>
							</div>

							<div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 text-cream sm:p-7">
								<div>
									<Meta className="text-cream/70">
										f/1.8 · 1/250 · ISO 200
									</Meta>
									<p className="mt-2 font-display text-3xl font-light italic sm:text-4xl">
										Quiet moments.
									</p>
								</div>
								<Link
									to="/portfolio/where-the-wild-things-are"
									aria-label="View the landscape story"
									className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/40 backdrop-blur-sm transition-all duration-300 hover:border-brass-300 hover:bg-cream/10 hover:text-brass-300"
								>
									<ArrowUpRight size={19} />
								</Link>
							</div>
						</div>

						{/* under-frame label */}
						<div className="mt-5 flex items-center justify-between gap-4 border-t border-ink-900/10 pt-4">
							<div>
								<Meta className="text-ink-500">
									Based on Earth
								</Meta>
								<p className="mt-1 font-display text-lg italic text-ink-900 sm:text-xl">
									Available worldwide
								</p>
							</div>
							<Meta className="text-right text-ink-500">
								CANON R5 · RF 50MM
								<br />
								<span className="text-wine-600">
									N 45°46′ — E 4°50′
								</span>
							</Meta>
						</div>
					</motion.div>

					{/* vertical rail */}
					<div
						className="absolute -right-8 top-8 hidden [writing-mode:vertical-rl] xl:block"
						aria-hidden="true"
					>
						<Meta className="text-ink-400">
							Photography · Art · Stories
						</Meta>
					</div>
				</motion.div>
			</div>

			{/* scroll cue */}
			<button
				type="button"
				onClick={() =>
					document
						.getElementById("selected-work")
						?.scrollIntoView({ behavior: "smooth" })
				}
				className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500 transition-colors hover:text-wine-600 lg:flex"
			>
				Scroll to explore
				<ArrowDown size={13} className="animate-drift" />
			</button>
		</section>
	);
}

/* ————— services rows with floating preview ————— */
function ServicesPreview() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = useState<number | null>(null);
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.5 });
	const sy = useSpring(my, { stiffness: 180, damping: 24, mass: 0.5 });

	const onMove = (e: React.MouseEvent) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect) return;
		mx.set(e.clientX - rect.left);
		my.set(e.clientY - rect.top);
	};

	return (
		<section className="relative overflow-hidden bg-pine-950 py-24 text-cream sm:py-32">
			<FilmStrip className="absolute inset-x-0 top-0 text-brass-400" />
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(60% 50% at 85% 20%, rgba(47,107,88,0.25), transparent 70%)",
				}}
			/>
			<div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
				<div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
					<Reveal>
						<Kicker tone="brass">What I offer</Kicker>
						<SectionTitle className="mt-6 text-cream">
							Four ways to
							<br />
							tell your{" "}
							<span className="italic text-brass-300">
								story.
							</span>
						</SectionTitle>
					</Reveal>
					<Reveal delay={0.15} className="max-w-xs">
						<p className="text-sm leading-loose text-cream/50">
							Every commission begins with a conversation and ends
							with photographs that feel like memory — never like
							a photoshoot.
						</p>
					</Reveal>
				</div>

				<div
					ref={containerRef}
					onMouseMove={onMove}
					className="relative"
				>
					{/* floating preview (desktop) */}
					<motion.div
						style={{ x: sx, y: sy }}
						className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
						aria-hidden="true"
					>
						<AnimatePresence>
							{hovered !== null && (
								<motion.div
									key={hovered}
									initial={{
										opacity: 0,
										scale: 0.85,
										rotate: -4,
									}}
									animate={{
										opacity: 1,
										scale: 1,
										rotate: -3,
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
										rotate: -1,
									}}
									transition={{
										duration: 0.3,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="-ml-28 -mt-36 w-56 border-[6px] border-cream shadow-lift"
								>
									<img
										src={services[hovered].previewImage}
										alt=""
										className="photo-grade aspect-[4/5] w-full object-cover"
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					<div className="border-t border-cream/10">
						{services.map((s, i) => (
							<Reveal key={s.slug} delay={i * 0.06}>
								<Link
									to={`/services/${s.slug}`}
									onMouseEnter={() => setHovered(i)}
									onMouseLeave={() => setHovered(null)}
									className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-cream/10 py-8 transition-colors duration-300 sm:gap-8 sm:py-10"
								>
									<span className="font-mono text-xs tracking-[0.2em] text-brass-400">
										{s.number}
									</span>
									<span className="min-w-0">
										<span className="block truncate font-display text-[clamp(1.7rem,4.2vw,3.4rem)] font-light leading-tight tracking-tight text-cream transition-all duration-400 group-hover:translate-x-2 group-hover:text-brass-300 sm:group-hover:translate-x-4">
											{s.title.replace(
												" Photography",
												"",
											)}
											<span className="hidden font-light italic text-cream/40 md:inline">
												{" "}
												— {s.subtitle}
											</span>
										</span>
										<span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 md:hidden">
											{s.subtitle}
										</span>
									</span>
									<span className="flex items-center gap-5">
										<span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45 sm:block">
											{s.price}
										</span>
										<span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 group-hover:border-brass-400 group-hover:bg-brass-400 group-hover:text-pine-950">
											<ArrowUpRight size={17} />
										</span>
									</span>
								</Link>
							</Reveal>
						))}
					</div>
				</div>

				<Reveal delay={0.1} className="mt-10 flex justify-end">
					<Link to="/contact">
						<ArrowLink light>
							Not sure which fits? Let's talk
						</ArrowLink>
					</Link>
				</Reveal>
			</div>
		</section>
	);
}

/* ————— testimonials ————— */
function Testimonials() {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const reduce = useReducedMotion();
	const t = testimonials[index];

	useEffect(() => {
		if (paused || reduce) return;
		const id = window.setInterval(
			() => setIndex((i) => (i + 1) % testimonials.length),
			7000,
		);
		return () => window.clearInterval(id);
	}, [paused, reduce, index]);

	return (
		<section
			className="relative overflow-hidden bg-wine-800 py-24 text-cream sm:py-32"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(55% 60% at 15% 15%, rgba(143,47,51,0.5), transparent 70%)",
				}}
			/>
			<Quote
				className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-cream/[0.04]"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
				<div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
					<Reveal>
						<Kicker tone="brass">
							Kind words, lasting memories
						</Kicker>
						<SectionTitle className="mt-6 text-cream">
							Words from
							<br />
							<span className="italic text-brass-300">
								the heart.
							</span>
						</SectionTitle>
						<p className="mt-7 max-w-xs text-sm leading-loose text-cream/50">
							The most meaningful part of this journey is knowing
							that the photographs become a part of someone's life
							and memories.
						</p>

						<div className="mt-10 flex items-center gap-4">
							<button
								type="button"
								onClick={() =>
									setIndex(
										(index - 1 + testimonials.length) %
											testimonials.length,
									)
								}
								aria-label="Previous testimonial"
								className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 transition-colors duration-300 hover:border-brass-400 hover:bg-brass-400 hover:text-wine-900"
							>
								<ArrowLeft size={17} />
							</button>
							<button
								type="button"
								onClick={() =>
									setIndex((index + 1) % testimonials.length)
								}
								aria-label="Next testimonial"
								className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 transition-colors duration-300 hover:border-brass-400 hover:bg-brass-400 hover:text-wine-900"
							>
								<ArrowRight size={17} />
							</button>
							<Meta className="ml-2 text-cream/45">
								<span className="text-brass-300">
									{String(index + 1).padStart(2, "0")}
								</span>
								{" / "}
								{String(testimonials.length).padStart(2, "0")}
							</Meta>
						</div>
					</Reveal>

					<Reveal
						delay={0.12}
						className="flex min-h-[320px] flex-col justify-center border-t border-cream/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
					>
						<AnimatePresence mode="wait">
							<motion.figure
								key={index}
								initial={{ opacity: 0, y: reduce ? 0 : 18 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: reduce ? 0 : -12 }}
								transition={{
									duration: 0.4,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<Quote
									size={30}
									strokeWidth={1}
									className="mb-7 text-brass-300/80"
								/>
								<blockquote className="max-w-3xl font-display text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.32] tracking-tight">
									“{t.quote}”
								</blockquote>
								<figcaption className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-cream/15 pt-6">
									<div>
										<p className="font-display text-xl">
											{t.name}
										</p>
										<Meta className="mt-1.5 block text-brass-300">
											{t.role}
										</Meta>
									</div>
									<Meta className="text-cream/40">
										{t.location}
									</Meta>
								</figcaption>
							</motion.figure>
						</AnimatePresence>

						<div className="mt-10 flex gap-2">
							{testimonials.map((item, i) => (
								<button
									key={item.name}
									type="button"
									onClick={() => setIndex(i)}
									aria-label={`Show testimonial ${i + 1}`}
									className={cn(
										"h-1 rounded-full transition-all duration-500",
										i === index
											? "w-12 bg-brass-400"
											: "w-6 bg-cream/20 hover:bg-cream/50",
									)}
								/>
							))}
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

/* ————— page ————— */
export default function Home() {
	const featured = [projects[0], projects[1], projects[3], projects[2]];
	const [lightbox, setLightbox] = useState<number | null>(null);
	const ctaStrip = [
		{ src: projects[0].gallery[0].src, alt: projects[0].gallery[0].alt },
		{ src: projects[1].cover, alt: projects[1].alt },
		{ src: projects[7].cover, alt: projects[7].alt },
	];

	return (
		<>
			<Hero />

			{/* marquee */}
			<div className="border-y border-brass-500/30 bg-wine-700 py-5 text-cream">
				<Marquee
					items={[
						"Weddings",
						"Portraits",
						"Editorial",
						"Landscapes",
						"Lifestyle",
						"Film & Digital",
					]}
				/>
			</div>

			{/* ————— selected works ————— */}
			<section id="selected-work" className="scroll-mt-24 py-24 sm:py-32">
				<div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
					<div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
						<Reveal>
							<Kicker>Selected works · 2023 — 2025</Kicker>
							<SectionTitle className="mt-6 text-ink-900">
								Stories worth
								<br />
								<span className="italic text-wine-600">
									keeping.
								</span>
							</SectionTitle>
						</Reveal>
						<Reveal delay={0.15} className="max-w-xs lg:pb-2">
							<p className="text-sm leading-loose text-ink-500">
								Eight frames from eight journeys — chosen not
								because they are perfect, but because they are
								true.
							</p>
							<Link to="/portfolio" className="mt-5 inline-block">
								<ArrowLink>View all stories</ArrowLink>
							</Link>
						</Reveal>
					</div>

					<div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
						<ProjectCard
							project={featured[0]}
							className="md:col-span-2 lg:col-span-7"
						/>
						<ProjectCard
							project={featured[1]}
							className="lg:col-span-5 lg:mt-28"
							delay={0.1}
						/>
						<ProjectCard
							project={featured[2]}
							aspect="aspect-[4/5]"
							className="lg:col-span-5 lg:-mt-10"
							delay={0.05}
						/>
						<ProjectCard
							project={featured[3]}
							aspect="aspect-[4/5] lg:aspect-[16/10]"
							className="lg:col-span-7 lg:mt-16"
							delay={0.15}
						/>
					</div>
				</div>
			</section>

			{/* ————— about preview ————— */}
			<section className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
				<Aperture
					className="pointer-events-none absolute -bottom-24 -right-24 h-[340px] w-[340px] text-pine-700/[0.06] animate-spin-slower"
					strokeWidth={0.6}
				/>
				<div className="relative mx-auto grid max-w-[1600px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-14">
					<Reveal className="relative mx-auto w-full max-w-[520px]">
						<div
							className="absolute -left-4 -top-4 h-full w-full border border-brass-500/50"
							aria-hidden="true"
						/>
						<Frame
							src={imagery.aboutPortrait}
							alt="Elena Lore holding a vintage film camera"
							className="relative aspect-[4/5] shadow-frame"
						/>
						<div className="absolute -bottom-10 -right-4 w-40 rotate-3 border-[6px] border-cream bg-cream shadow-lift sm:-right-10 sm:w-48">
							<Frame
								src={imagery.aboutHands}
								alt="Hands cradling a medium format camera"
								className="aspect-[4/5]"
								grade
							/>
						</div>
						<div className="mt-5 flex items-center justify-between pr-2">
							<Meta className="text-ink-500">
								SELF-PORTRAIT · HASSELBLAD
							</Meta>
							<Meta className="text-wine-600">LYON · FR</Meta>
						</div>
					</Reveal>

					<div className="lg:pl-4">
						<Reveal>
							<Kicker>The photographer</Kicker>
							<SectionTitle className="mt-6 text-ink-900">
								Behind
								<br />
								the{" "}
								<span className="italic text-pine-700">
									lens.
								</span>
							</SectionTitle>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="mt-8 max-w-lg text-[15px] leading-[1.95] text-ink-500">
								My journey began with a fascination for the way
								light transforms ordinary moments into something
								extraordinary. Today, my approach is rooted in
								authenticity, artistic expression, and a belief
								that the most meaningful images are the ones
								that make you feel something.
							</p>
						</Reveal>

						<div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink-900/10 pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
							{stats.map((s, i) => (
								<Reveal key={s.label} delay={0.08 * i}>
									<p className="font-display text-4xl font-light tracking-tight text-wine-600">
										<CountUp value={s.value} />
									</p>
									<Meta className="mt-2 block leading-relaxed text-ink-500">
										{s.label}
									</Meta>
								</Reveal>
							))}
						</div>

						<Reveal
							delay={0.15}
							className="mt-10 flex flex-wrap items-center justify-between gap-6"
						>
							<p
								className="font-display text-4xl italic text-pine-700"
								aria-hidden="true"
							>
								Elena Lore
							</p>
							<Link to="/about">
								<ArrowLink>More about me</ArrowLink>
							</Link>
						</Reveal>
					</div>
				</div>
			</section>

			<ServicesPreview />
			<Testimonials />

			{/* ————— closing CTA ————— */}
			<section className="relative overflow-hidden py-24 sm:py-36">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"radial-gradient(50% 55% at 50% 40%, rgba(212,175,94,0.14), transparent 70%)",
					}}
				/>
				<div className="relative mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-14">
					{/* scattered frames */}
					<Reveal className="mb-14 flex items-end justify-center gap-5">
						{ctaStrip.map((img, i) => (
							<button
								key={img.src}
								type="button"
								onClick={() => setLightbox(i)}
								aria-label={`Open photograph: ${img.alt}`}
								className={cn(
									"group w-28 border-[6px] border-cream bg-cream shadow-frame transition-transform duration-500 hover:z-10 hover:scale-105 sm:w-40",
									i === 0 && "-rotate-6 translate-y-3",
									i === 1 && "rotate-1 -translate-y-2",
									i === 2 && "rotate-6 translate-y-4",
								)}
							>
								<Frame
									src={img.src}
									alt={img.alt}
									className="aspect-[4/5]"
								/>
							</button>
						))}
					</Reveal>

					<Reveal>
						<Kicker className="justify-center">
							Let's create something meaningful
						</Kicker>
						<h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.04em] text-ink-900">
							Your story
							<br />
							starts{" "}
							<span className="italic text-wine-600">here.</span>
						</h2>
						<p className="mx-auto mt-8 max-w-md text-[15px] leading-[1.95] text-ink-500">
							Have something special in mind? I would love to hear
							about it and explore how we can bring your vision to
							life.
						</p>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-7">
							<Link to="/contact">
								<ButtonSolid>Start a project</ButtonSolid>
							</Link>
							<a
								href={`mailto:${site.email}`}
								className="link-rule font-mono text-[11px] uppercase tracking-[0.2em] text-pine-700"
							>
								{site.email}
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			<Lightbox
				images={ctaStrip}
				index={lightbox}
				onClose={() => setLightbox(null)}
				onIndex={setLightbox}
			/>
		</>
	);
}
