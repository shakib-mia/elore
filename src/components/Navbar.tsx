"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../data/content";
import { Link, useRoute } from "@/lib/router";
import { cn } from "../utils/cn";
import aperture from "@/pictures/aperture.png";
import Image from "next/image";
import { Aperture } from "./primitives";

const links = [
	{ label: "Home", to: "/" },
	{ label: "Portfolio", to: "/portfolio" },
	{ label: "About", to: "/about" },
	{ label: "Services", to: "/services" },
	{ label: "Contact", to: "/contact" },
];

export default function Navbar() {
	const route = useRoute();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 28,
		mass: 0.4,
	});

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => setOpen(false), [route.path]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const activeFor = (to: string) =>
		to === "/" ? route.path === "/" : route.path.startsWith(to);

	return (
		<>
			<header
				className={cn(
					"fixed inset-x-0 top-0 z-50 transition-all duration-500",
					scrolled
						? "border-b border-ink-900/10 bg-cream/90 shadow-[0_8px_30px_-18px_rgba(34,20,16,0.4)] backdrop-blur-md"
						: "border-b border-transparent bg-transparent",
				)}
			>
				{/* reading progress */}
				<motion.div
					className="absolute inset-x-0 top-0 h-[2.5px] origin-left bg-gradient-to-r from-wine-600 via-wine-500 to-brass-500"
					style={{ scaleX: progress }}
				/>
				<div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-14">
					<Link
						to="/"
						className="group flex items-center gap-3"
						aria-label="ÉLORE — home"
					>
						<span className="relative flex h-10 w-10 items-center justify-center">
							<span
								role="img"
								aria-label="ÉLORE logo"
								className="block h-8 w-8 bg-wine-600 transition-transform duration-700 group-hover:rotate-[60deg]"
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
						</span>
						<span className="flex flex-col leading-none">
							<span className="font-display text-[22px] tracking-[0.14em] text-ink-900">
								ÉLORE
							</span>
							<span className="mt-1 font-mono text-[8px] uppercase tracking-[0.34em] text-ink-500">
								Visual Stories
							</span>
						</span>
					</Link>

					<nav
						className="hidden items-center gap-8 lg:flex"
						aria-label="Primary"
					>
						{links.map((l) => (
							<Link
								key={l.to}
								to={l.to}
								aria-current={
									activeFor(l.to) ? "page" : undefined
								}
								className={cn(
									"group relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
									activeFor(l.to)
										? "text-wine-600"
										: "text-ink-500 hover:text-ink-900",
								)}
							>
								{l.label}
								<span
									className={cn(
										"absolute -bottom-1.5 left-0 h-px bg-wine-600 transition-all duration-400",
										activeFor(l.to)
											? "w-full"
											: "w-0 group-hover:w-full",
									)}
								/>
							</Link>
						))}
						<Link
							to="/contact"
							className="group ml-2 inline-flex items-center gap-2.5 bg-wine-600 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-pine-700"
						>
							<span className="h-1.5 w-1.5 rounded-full bg-brass-300 animate-blink" />
							Book a session
							<ArrowUpRight
								size={13}
								className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							/>
						</Link>
					</nav>

					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex h-11 w-11 items-center justify-center border border-ink-900/15 text-ink-900 transition-colors hover:border-wine-600 hover:text-wine-600 lg:hidden"
						aria-label="Open menu"
					>
						<Menu size={19} />
					</button>
				</div>
			</header>

			{/* ————— mobile overlay ————— */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.35 }}
						className="fixed inset-0 z-[80] flex flex-col bg-pine-950 text-cream lg:hidden"
					>
						<div className="flex h-[72px] items-center justify-between px-5 sm:px-8">
							<span className="flex items-center gap-3">
								<Aperture className="h-8 w-8 text-brass-400" />
								<span className="font-display text-xl tracking-[0.14em]">
									ÉLORE
								</span>
							</span>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="flex h-11 w-11 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-brass-400 hover:text-brass-300"
								aria-label="Close menu"
							>
								<X size={19} />
							</button>
						</div>

						<nav
							className="flex flex-1 flex-col justify-center gap-1 px-7"
							aria-label="Mobile"
						>
							{links.map((l, i) => (
								<motion.div
									key={l.to}
									initial={{ opacity: 0, x: -24 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 0.08 + i * 0.06,
										duration: 0.5,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									<Link
										to={l.to}
										className={cn(
											"group flex items-baseline gap-4 py-2.5",
											activeFor(l.to)
												? "text-brass-300"
												: "text-cream",
										)}
									>
										<span className="font-mono text-[10px] tracking-[0.2em] text-cream/40">
											0{i + 1}
										</span>
										<span className="font-display text-[13vw] font-light leading-none tracking-tight transition-colors group-hover:text-brass-300 sm:text-6xl">
											{l.label}
										</span>
									</Link>
								</motion.div>
							))}
						</nav>

						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="border-t border-cream/15 px-7 py-6"
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/50">
								Start a project
							</p>
							<a
								href={`mailto:${site.email}`}
								className="mt-2 block font-display text-xl italic text-brass-300"
							>
								{site.email}
							</a>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
