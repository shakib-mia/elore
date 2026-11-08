"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowUpRight,
	CalendarDays,
	Check,
	Clock,
	Loader2,
	Mail,
	MapPin,
	Phone,
	Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import aperture from "@/pictures/aperture.png";

import { Corners, Frame, Kicker, Meta, Reveal } from "../components/primitives";
import { imagery, services, site } from "../data/content";
import { useSearchParams } from "next/navigation";
import { cn } from "../utils/cn";

type Status = "idle" | "sending" | "sent";

interface FormState {
	name: string;
	email: string;
	service: string;
	date: string;
	location: string;
	budget: string;
	message: string;
}

const budgets = [
	"Under €500",
	"€500 — €1,500",
	"€1,500 — €3,000",
	"€3,000+",
	"Let's discuss",
];

const inputCls =
	"w-full border border-ink-900/15 bg-cream px-4 py-3.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors duration-300 focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/15";

export default function Contact() {
	const searchParams = useSearchParams();
	const prefill = searchParams.get("service") ?? "";
	const initial = useMemo<FormState>(
		() => ({
			name: "",
			email: "",
			service: services.some((s) => s.slug === prefill) ? prefill : "",
			date: "",
			location: "",
			budget: "",
			message: "",
		}),
		[prefill],
	);

	const [form, setForm] = useState<FormState>(initial);
	const [errors, setErrors] = useState<
		Partial<Record<keyof FormState, string>>
	>({});
	const [status, setStatus] = useState<Status>("idle");

	const set =
		(key: keyof FormState) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>,
		) => {
			setForm((f) => ({ ...f, [key]: e.target.value }));
			setErrors((er) => ({ ...er, [key]: undefined }));
		};

	const validate = () => {
		const er: Partial<Record<keyof FormState, string>> = {};
		if (form.name.trim().length < 2) er.name = "Please tell me your name.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
			er.email = "That email doesn't look right.";
		if (!form.service) er.service = "Choose the story you have in mind.";
		if (form.message.trim().length < 12)
			er.message = "A few more words will help me understand your story.";
		return er;
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const er = validate();
		setErrors(er);
		if (Object.keys(er).length > 0) return;
		setStatus("sending");
		window.setTimeout(() => setStatus("sent"), 1100);
	};

	const chosenService = services.find((s) => s.slug === form.service);

	return (
		<>
			{/* ————— header ————— */}
			<section className="relative overflow-hidden px-5 pt-[130px] sm:px-8 sm:pt-[150px] lg:px-14">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"radial-gradient(46% 40% at 85% 10%, rgba(212,175,94,0.16), transparent 70%)",
					}}
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-28 top-24 hidden h-[380px] w-[380px] animate-spin-slower bg-wine-600 opacity-20 lg:block"
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
				<div className="relative mx-auto max-w-[1600px]">
					<Reveal>
						<Kicker>
							Contact · Let's create something meaningful
						</Kicker>
						<h1 className="mt-7 font-display text-[clamp(3.2rem,9vw,8rem)] font-light leading-[0.92] tracking-[-0.045em] text-ink-900">
							Your story
							<br />
							starts{" "}
							<span className="italic text-wine-600">here.</span>
						</h1>
						<p className="mt-8 max-w-xl text-[15px] leading-[1.95] text-ink-500">
							Have something special in mind? Tell me about the
							people, the place, and the feeling you want to keep
							— I'll take it from there.
						</p>
					</Reveal>
				</div>
			</section>

			{/* ————— form + details ————— */}
			<section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
				<div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
					{/* form */}
					<Reveal>
						<div className="relative border border-ink-900/10 bg-cream-100 p-7 sm:p-10">
							<AnimatePresence mode="wait">
								{status === "sent" ? (
									<motion.div
										key="sent"
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{
											duration: 0.5,
											ease: [0.22, 1, 0.36, 1],
										}}
										className="flex min-h-[540px] flex-col items-center justify-center py-10 text-center"
									>
										<motion.span
											initial={{ scale: 0.6, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{
												delay: 0.15,
												type: "spring",
												stiffness: 220,
												damping: 16,
											}}
											className="flex h-20 w-20 items-center justify-center rounded-full bg-pine-700 text-cream shadow-lift"
										>
											<Check
												size={34}
												strokeWidth={2.4}
											/>
										</motion.span>
										<h2 className="mt-8 font-display text-4xl font-light text-ink-900 sm:text-5xl">
											Your story is on its{" "}
											<span className="italic text-wine-600">
												way.
											</span>
										</h2>
										<p className="mt-5 max-w-md text-sm leading-loose text-ink-500">
											Thank you, {form.name.split(" ")[0]}
											. Your inquiry about{" "}
											<strong className="text-ink-900">
												{chosenService?.title.toLowerCase() ??
													"photography"}
											</strong>
											{form.date && (
												<>
													{" "}
													for{" "}
													<strong className="text-ink-900">
														{form.date}
													</strong>
												</>
											)}{" "}
											has been received. I read every
											message personally and will reply
											within 24 hours.
										</p>
										<div className="mt-8 w-full max-w-sm border border-ink-900/10 bg-cream p-5 text-left">
											<Meta className="text-wine-600">
												Receipt · FR. 2026
											</Meta>
											<dl className="mt-4 space-y-2.5 text-sm">
												<div className="flex justify-between gap-4">
													<dt className="text-ink-500">
														From
													</dt>
													<dd className="font-semibold text-ink-900">
														{form.email}
													</dd>
												</div>
												<div className="flex justify-between gap-4">
													<dt className="text-ink-500">
														Story
													</dt>
													<dd className="font-semibold text-ink-900">
														{chosenService?.title ??
															"—"}
													</dd>
												</div>
												{form.location && (
													<div className="flex justify-between gap-4">
														<dt className="text-ink-500">
															Where
														</dt>
														<dd className="font-semibold text-ink-900">
															{form.location}
														</dd>
													</div>
												)}
												{form.budget && (
													<div className="flex justify-between gap-4">
														<dt className="text-ink-500">
															Budget
														</dt>
														<dd className="font-semibold text-ink-900">
															{form.budget}
														</dd>
													</div>
												)}
											</dl>
										</div>
										<button
											type="button"
											onClick={() => {
												setForm(initial);
												setStatus("idle");
											}}
											className="mt-9 inline-flex items-center gap-2.5 border border-wine-600 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-wine-600 transition-colors duration-300 hover:bg-wine-600 hover:text-cream"
										>
											<Send size={13} />
											Send another inquiry
										</button>
									</motion.div>
								) : (
									<motion.form
										key="form"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.4 }}
										onSubmit={submit}
										noValidate
									>
										<div className="flex items-center justify-between gap-4">
											<Meta className="text-wine-600">
												Inquiry form
											</Meta>
											<span className="flex items-center gap-2">
												<span className="h-2 w-2 rounded-full bg-pine-500 animate-blink" />
												<Meta className="text-pine-700">
													Booking 2026 — 27
												</Meta>
											</span>
										</div>

										<div className="mt-8 grid gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="name"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Your name *
												</label>
												<input
													id="name"
													type="text"
													value={form.name}
													onChange={set("name")}
													placeholder="Olivia & James"
													className={cn(
														inputCls,
														errors.name &&
															"border-wine-600 ring-2 ring-wine-600/15",
													)}
												/>
												{errors.name && (
													<p className="mt-2 text-xs font-semibold text-wine-600">
														{errors.name}
													</p>
												)}
											</div>
											<div>
												<label
													htmlFor="email"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Email *
												</label>
												<input
													id="email"
													type="email"
													value={form.email}
													onChange={set("email")}
													placeholder="you@example.com"
													className={cn(
														inputCls,
														errors.email &&
															"border-wine-600 ring-2 ring-wine-600/15",
													)}
												/>
												{errors.email && (
													<p className="mt-2 text-xs font-semibold text-wine-600">
														{errors.email}
													</p>
												)}
											</div>
											<div>
												<label
													htmlFor="service"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													The story *
												</label>
												<select
													id="service"
													value={form.service}
													onChange={set("service")}
													className={cn(
														inputCls,
														"appearance-none",
														!form.service &&
															"text-ink-400",
														errors.service &&
															"border-wine-600 ring-2 ring-wine-600/15",
													)}
												>
													<option value="" disabled>
														Choose a discipline…
													</option>
													{services.map((s) => (
														<option
															key={s.slug}
															value={s.slug}
														>
															{s.title} ·{" "}
															{s.price}
														</option>
													))}
													<option value="other">
														Something else entirely
													</option>
												</select>
												{errors.service && (
													<p className="mt-2 text-xs font-semibold text-wine-600">
														{errors.service}
													</p>
												)}
											</div>
											<div>
												<label
													htmlFor="date"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Date (if known)
												</label>
												<input
													id="date"
													type="date"
													value={form.date}
													onChange={set("date")}
													min="2026-01-01"
													className={inputCls}
												/>
											</div>
											<div>
												<label
													htmlFor="location"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Location
												</label>
												<input
													id="location"
													type="text"
													value={form.location}
													onChange={set("location")}
													placeholder="Tuscany, Paris, your kitchen…"
													className={inputCls}
												/>
											</div>
											<div>
												<label
													htmlFor="budget"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Budget
												</label>
												<select
													id="budget"
													value={form.budget}
													onChange={set("budget")}
													className={cn(
														inputCls,
														"appearance-none",
														!form.budget &&
															"text-ink-400",
													)}
												>
													<option value="" disabled>
														A rough range helps…
													</option>
													{budgets.map((b) => (
														<option
															key={b}
															value={b}
														>
															{b}
														</option>
													))}
												</select>
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="message"
													className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
												>
													Tell me the story *
												</label>
												<textarea
													id="message"
													rows={6}
													value={form.message}
													onChange={set("message")}
													placeholder="Who is it for? What does the day look like? What do you want to remember in twenty years?"
													className={cn(
														inputCls,
														"resize-none leading-relaxed",
														errors.message &&
															"border-wine-600 ring-2 ring-wine-600/15",
													)}
												/>
												{errors.message && (
													<p className="mt-2 text-xs font-semibold text-wine-600">
														{errors.message}
													</p>
												)}
											</div>
										</div>

										<div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-ink-900/10 pt-7 sm:flex-row sm:items-center">
											<p className="max-w-xs font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink-400">
												* Required · Your details stay
												between us
											</p>
											<button
												type="submit"
												disabled={status === "sending"}
												className="group inline-flex min-h-13 items-center gap-4 bg-wine-600 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream shadow-frame transition-all duration-300 hover:bg-pine-700 disabled:cursor-wait disabled:opacity-80"
											>
												{status === "sending" ? (
													<>
														<Loader2
															size={15}
															className="animate-spin"
														/>
														Developing…
													</>
												) : (
													<>
														Send the inquiry
														<ArrowUpRight
															size={15}
															className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
														/>
													</>
												)}
											</button>
										</div>
									</motion.form>
								)}
							</AnimatePresence>
						</div>
					</Reveal>

					{/* details */}
					<div className="space-y-8">
						<Reveal delay={0.1}>
							<div className="border border-ink-900/10 bg-pine-950 p-8 text-cream">
								<Meta className="text-brass-400">
									Prefer it direct?
								</Meta>
								<ul className="mt-7 space-y-6">
									<li>
										<a
											href={`mailto:${site.email}`}
											className="group flex items-start gap-4"
										>
											<Mail
												size={17}
												className="mt-1 shrink-0 text-brass-400"
											/>
											<span>
												<span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
													Email
												</span>
												<span className="mt-1 block text-sm text-cream/85 transition-colors group-hover:text-brass-300">
													{site.email}
												</span>
											</span>
										</a>
									</li>
									<li>
										<a
											href={`tel:${site.phone.replace(/\s/g, "")}`}
											className="group flex items-start gap-4"
										>
											<Phone
												size={17}
												className="mt-1 shrink-0 text-brass-400"
											/>
											<span>
												<span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
													Phone
												</span>
												<span className="mt-1 block text-sm text-cream/85 transition-colors group-hover:text-brass-300">
													{site.phone}
												</span>
											</span>
										</a>
									</li>
									<li className="flex items-start gap-4">
										<MapPin
											size={17}
											className="mt-1 shrink-0 text-brass-400"
										/>
										<span>
											<span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
												Studio
											</span>
											<span className="mt-1 block text-sm text-cream/85">
												{site.studio}
											</span>
										</span>
									</li>
									<li className="flex items-start gap-4">
										<Clock
											size={17}
											className="mt-1 shrink-0 text-brass-400"
										/>
										<span>
											<span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">
												Hours
											</span>
											<span className="mt-1 block text-sm text-cream/85">
												{site.hours}
											</span>
										</span>
									</li>
								</ul>
								<div className="mt-8 flex flex-wrap gap-2.5 border-t border-cream/10 pt-7">
									{site.socials.map((s) => (
										<a
											key={s.label}
											href={s.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 border border-cream/20 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/60 transition-colors duration-300 hover:border-brass-400 hover:text-brass-300"
										>
											{s.label}
											<ArrowUpRight size={10} />
										</a>
									))}
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.15}>
							<div className="relative">
								<Frame
									src={imagery.contactStill}
									alt="Dawn light over a quiet mountain range"
									className="aspect-[4/5] shadow-frame"
								/>
								<Corners className="text-cream/70" />
								<div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
									<Meta className="text-cream/90">
										WHEREVER YOU ARE
									</Meta>
									<Meta className="text-cream/90">
										6:12 AM
									</Meta>
								</div>
							</div>
							<div className="mt-5 flex items-center gap-3 border border-ink-900/10 bg-cream-100 px-5 py-4">
								<CalendarDays
									size={16}
									className="shrink-0 text-wine-600"
								/>
								<p className="text-xs leading-relaxed text-ink-500">
									<strong className="text-ink-900">
										Peak season fills early.
									</strong>{" "}
									May — September 2026 is roughly 70%
									reserved.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>
		</>
	);
}
