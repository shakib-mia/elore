"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import {
  ArrowLink,
  ButtonSolid,
  FilmStrip,
  Kicker,
  Meta,
  Reveal,
} from "../components/primitives";
import { categories, projects } from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const countFor = (c: (typeof categories)[number]) =>
    c === "All" ? projects.length : projects.filter((p) => p.category === c).length;

  return (
    <>
      {/* ————— header ————— */}
      <section className="relative overflow-hidden px-5 pb-14 pt-[130px] sm:px-8 sm:pt-[150px] lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(45% 45% at 88% 10%, rgba(15,61,58,0.08), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1600px]">
          <Reveal>
            <Kicker>A collection of visual stories</Kicker>
            <div className="mt-7 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <h1 className="font-display text-[clamp(4rem,11vw,9.5rem)] font-light leading-[0.86] tracking-[-0.05em] text-ink-900">
                The
                <br />
                <span className="italic text-wine-600">portfolio.</span>
              </h1>
              <div className="max-w-[330px] lg:pb-4">
                <p className="text-sm leading-loose text-ink-500">
                  A curated collection of moments, emotions, and stories captured through
                  my lens. Each frame holds a memory worth keeping.
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-7 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-wine-600 transition-colors hover:text-pine-700"
                >
                  <ArrowDown size={14} className="animate-drift" />
                  Explore selected works
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— gallery ————— */}
      <section id="gallery" className="scroll-mt-24 px-5 pb-28 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          {/* filter bar */}
          <div className="mb-14 flex flex-col gap-6 border-y border-ink-900/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <Meta className="text-ink-500">
              Browse by category ·{" "}
              <span className="text-wine-600">{String(filtered.length).padStart(2, "0")} stories</span>
            </Meta>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stories by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active === c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "group relative border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 sm:px-5",
                    active === c
                      ? "border-wine-600 bg-wine-600 text-cream shadow-frame"
                      : "border-ink-900/15 text-ink-500 hover:border-pine-700 hover:text-pine-700"
                  )}
                >
                  {c}
                  <span className={cn("ml-2", active === c ? "text-brass-300" : "text-ink-400 group-hover:text-pine-600")}>
                    {String(countFor(c)).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* grid */}
          <motion.div layout className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    project.layout === "large" ? "md:col-span-2 lg:col-span-7" : "lg:col-span-5",
                    project.layout === "small" && i % 2 === 1 && "lg:mt-20"
                  )}
                >
                  <ProjectCard project={project} delay={Math.min(i * 0.05, 0.25)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ————— closing band ————— */}
      <section className="relative overflow-hidden bg-pine-900 py-20 text-cream sm:py-24">
        <FilmStrip className="absolute inset-x-0 top-0 text-brass-400" />
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-14">
          <Reveal>
            <Kicker tone="brass">The next frame</Kicker>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-tight tracking-tight">
              Every frame has a story.
              <br />
              <span className="italic text-brass-300">Yours could be next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col items-start gap-5">
            <Link to="/contact">
              <ButtonSolid variant="cream">Commission a story</ButtonSolid>
            </Link>
            <Link to="/services">
              <ArrowLink light>Or explore the services</ArrowLink>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
