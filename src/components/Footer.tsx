"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { services, site } from "../data/content";
import { Link } from "@/lib/router";
import { Aperture, FilmStrip, Meta } from "./primitives";

const nav = [
	{ label: "Home", to: "/" },
	{ label: "Portfolio", to: "/portfolio" },
	{ label: "About", to: "/about" },
	{ label: "Services", to: "/services" },
	{ label: "Contact", to: "/contact" },
];

export function BackToTopFloat() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 700);

		window.addEventListener("scroll", onScroll, { passive: true });

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.button
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 16 }}
					type="button"
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
					aria-label="Back to top"
					className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-wine-600 text-cream shadow-lift transition-colors duration-300 hover:bg-pine-700"
				>
					<ArrowUp size={18} />
				</motion.button>
			)}
		</AnimatePresence>
	);
}

export default function Footer() {
	return (
		<footer className="relative overflow-hidden bg-pine-950 text-cream">
			<FilmStrip className="text-brass-400" />

			<div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
				{/* Main footer content */}
				<div className="relative grid gap-14 border-b border-cream/10 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.65fr_0.9fr_1.05fr] lg:gap-10">
					{/* Background watermark */}
					<div
						className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
						aria-hidden="true"
					>
						<p className="whitespace-nowrap font-display text-[30vw] font-light leading-none tracking-[0.08em] text-cream/[0.045] lg:text-[22vw]">
							ÉLORE
						</p>
					</div>

					{/* Brand */}
					<div className="relative z-10 max-w-sm">
						<Link
							to="/"
							className="group inline-flex items-center gap-4"
						>
							<Aperture className="h-12 w-12 text-brass-400 transition-transform duration-700 group-hover:rotate-90" />

							<span className="flex flex-col leading-none">
								<span className="font-display text-3xl tracking-[0.14em]">
									ÉLORE
								</span>

								<span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.34em] text-cream/40">
									Visual Stories
								</span>
							</span>
						</Link>

						<p className="mt-7 text-sm leading-loose text-cream/50">
							Creating timeless visual stories through light,
							emotion, and thoughtful artistic expression — by{" "}
							{site.photographer}, since {site.est}.
						</p>

						<div className="mt-8 flex flex-wrap gap-2.5">
							{site.socials.map((s) => (
								<a
									key={s.label}
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 border border-cream/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60 transition-all duration-300 hover:border-brass-400 hover:text-brass-300"
								>
									{s.label}
									<ArrowUpRight size={11} />
								</a>
							))}
						</div>
					</div>

					{/* Explore */}
					<div className="relative z-10">
						<h3 className="mb-7 font-mono text-[10px] uppercase tracking-[0.26em] text-brass-400">
							Explore
						</h3>

						<ul className="space-y-4">
							{nav.map((item) => (
								<li key={item.to}>
									<Link
										to={item.to}
										className="group inline-flex items-center gap-2 text-sm text-cream/55 transition-colors duration-300 hover:text-cream"
									>
										{item.label}

										<ArrowUpRight
											size={12}
											className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
										/>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Photography */}
					<div className="relative z-10">
						<h3 className="mb-7 font-mono text-[10px] uppercase tracking-[0.26em] text-brass-400">
							Photography
						</h3>

						<ul className="space-y-4">
							{services.map((s) => (
								<li key={s.slug}>
									<Link
										to={`/services/${s.slug}`}
										className="text-sm text-cream/55 transition-colors duration-300 hover:text-cream"
									>
										{s.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className="relative z-10">
						<h3 className="mb-7 font-mono text-[10px] uppercase tracking-[0.26em] text-brass-400">
							Get in touch
						</h3>

						<p className="max-w-xs text-sm leading-loose text-cream/50">
							Have a story in mind? Let's create something
							meaningful together.
						</p>

						<a
							href={`mailto:${site.email}`}
							className="mt-6 inline-flex items-center gap-3 border-b border-brass-400/60 pb-1.5 text-sm text-cream transition-colors duration-300 hover:text-brass-300"
						>
							<Mail size={15} className="text-brass-400" />
							{site.email}
						</a>

						<p className="mt-5 flex items-start gap-3 text-sm text-cream/45">
							<MapPin
								size={15}
								className="mt-0.5 shrink-0 text-brass-400"
							/>
							{site.studio}
						</p>

						<Link
							to="/contact"
							className="group mt-7 inline-flex items-center gap-3 bg-wine-600 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-wine-500"
						>
							Start a project
							<ArrowUpRight
								size={13}
								className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							/>
						</Link>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
					<p className="font-mono text-[10px] tracking-[0.14em] text-cream/35">
						© 2026 ÉLORE Photography. All rights reserved.
					</p>

					<div className="flex items-center gap-6">
						<Meta className="text-cream/30">
							Made with intention & creativity
						</Meta>

						<button
							type="button"
							onClick={() =>
								window.scrollTo({ top: 0, behavior: "smooth" })
							}
							className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 transition-colors hover:text-brass-300"
						>
							Back to top
							<ArrowUp
								size={13}
								className="transition-transform duration-300 group-hover:-translate-y-1"
							/>
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
