"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import {
  ArrowLink,
  ButtonSolid,
  Corners,
  FilmStrip,
  Frame,
  Kicker,
  Meta,
  Reveal,
  SectionTitle,
} from "../components/primitives";
import { faqs, services } from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";

const sharedProcess = [
  { n: "A", title: "The conversation", text: "Every story starts with listening — your people, your places, your reasons." },
  { n: "B", title: "The direction", text: "Moodboards, timelines and light plans, shaped around what matters to you." },
  { n: "C", title: "The session", text: "Calm, present, unhurried. You live it; I make sure it's remembered." },
  { n: "D", title: "The delivery", text: "A careful edit, a private gallery, and photographs made to outlive screens." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-ink-900/10">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-ink-900/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="flex items-baseline gap-5">
                <Meta className="shrink-0 text-wine-600">{String(i + 1).padStart(2, "0")}</Meta>
                <span className={cn(
                  "font-display text-xl font-light tracking-tight transition-colors duration-300 sm:text-2xl",
                  isOpen ? "text-wine-600" : "text-ink-900 group-hover:text-wine-600"
                )}>
                  {f.q}
                </span>
              </span>
              <span className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isOpen ? "border-wine-600 bg-wine-600 text-cream" : "border-ink-900/15 text-ink-500 group-hover:border-wine-600 group-hover:text-wine-600"
              )}>
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-0 text-sm leading-loose text-ink-500 sm:pl-[52px]">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  return (
    <>
      {/* ————— header ————— */}
      <section className="relative overflow-hidden px-5 pt-[130px] sm:px-8 sm:pt-[150px] lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(48% 42% at 90% 8%, rgba(108,21,30,0.08), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1600px]">
          <Reveal>
            <Kicker>Services · Four disciplines, one eye</Kicker>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,8vw,7.2rem)] font-light leading-[0.93] tracking-[-0.045em] text-ink-900">
              Every story deserves
              <br />
              to be <span className="italic text-wine-600">seen.</span>
            </h1>
            <div className="mt-9 flex flex-col justify-between gap-6 border-t border-ink-900/10 pt-7 lg:flex-row lg:items-center">
              <p className="max-w-xl text-[15px] leading-[1.95] text-ink-500">
                Whether it lasts a lifetime, an afternoon, or a single frame — each
                service is built around the same promise: honest, artful photographs
                that feel like you.
              </p>
              <Meta className="shrink-0 text-pine-700">Now booking · 2026 — 2027</Meta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— service rows ————— */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px] space-y-24 sm:space-y-32">
          {services.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className={cn(
                "grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20",
              )}
            >
              <Reveal className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <Link to={`/services/${s.slug}`} className="group block">
                  <div className={cn("absolute -top-4 h-full w-full border", i % 2 === 0 ? "-left-4 border-brass-500/50" : "-right-4 border-pine-700/40")} aria-hidden="true" />
                  <div className="relative aspect-[4/3] overflow-hidden shadow-frame">
                    <Frame
                      src={s.previewImage}
                      alt={s.title}
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-[1300ms] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-wine-950/0 transition-colors duration-500 group-hover:bg-wine-950/15" />
                    <Corners className="text-cream/70" />
                    <span className="absolute left-5 top-5 bg-cream/90 px-3.5 py-2 font-display text-xl italic text-wine-600 backdrop-blur-sm">
                      {s.number}
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.1} className={cn(i % 2 === 1 && "lg:order-1")}>
                <Kicker>{s.subtitle}</Kicker>
                <h2 className="mt-5 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight tracking-tight text-ink-900">
                  {s.title.replace(" Photography", "")}
                  <span className="italic text-wine-600"> photography.</span>
                </h2>
                <p className="mt-6 max-w-lg text-[15px] leading-[1.95] text-ink-500">
                  {s.shortDescription}
                </p>
                <ul className="mt-7 space-y-3">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-ink-700">
                      <Check size={15} className="shrink-0 text-pine-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-7 border-t border-ink-900/10 pt-7">
                  <Link to={`/services/${s.slug}`}>
                    <ButtonSolid variant={i % 2 === 0 ? "wine" : "pine"}>Discover</ButtonSolid>
                  </Link>
                  <div>
                    <p className="font-display text-2xl font-light text-pine-700">{s.price}</p>
                    <Meta className="mt-0.5 block text-ink-500">{s.duration}</Meta>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ————— shared process ————— */}
      <section className="relative overflow-hidden bg-pine-950 px-5 py-24 text-cream sm:px-8 sm:py-28 lg:px-14">
        <FilmStrip className="absolute inset-x-0 top-0 text-brass-400" />
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-14">
            <Kicker tone="brass">The method</Kicker>
            <SectionTitle className="mt-6">
              How every story <span className="italic text-brass-300">unfolds.</span>
            </SectionTitle>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {sharedProcess.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08} className="group bg-pine-950 p-8 transition-colors duration-500 hover:bg-pine-900">
                <span className="font-display text-5xl font-light italic text-brass-400/60 transition-colors duration-500 group-hover:text-brass-300">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-2xl font-light">{p.title}</h3>
                <p className="mt-3 text-sm leading-loose text-cream/55">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal>
            <Kicker>Before you ask</Kicker>
            <SectionTitle className="mt-6 text-ink-900">
              Good
              <br />
              <span className="italic text-pine-700">questions.</span>
            </SectionTitle>
            <p className="mt-7 max-w-xs text-sm leading-loose text-ink-500">
              Anything else on your mind? Write to me — I answer every message myself,
              usually within a day.
            </p>
            <Link to="/contact" className="mt-6 inline-block">
              <ArrowLink>Ask a question</ArrowLink>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* ————— CTA ————— */}
      <section className="border-t border-ink-900/10 bg-cream-100 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-tight tracking-tight text-ink-900">
              Ready when you are. <span className="italic text-wine-600">Truly.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact" className="group inline-flex items-center gap-4">
              <ButtonSolid>Check your date</ButtonSolid>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

