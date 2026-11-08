"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import Lightbox from "../components/Lightbox";
import {
  Corners,
  Frame,
  Kicker,
  Meta,
  Reveal,
} from "../components/primitives";
import { getProject, projects } from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  if (!project) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <Meta className="text-wine-600">FR. ——— · NOT FOUND</Meta>
        <h1 className="mt-5 font-display text-5xl font-light text-ink-900">
          This frame was never <span className="italic text-wine-600">exposed.</span>
        </h1>
        <Link to="/portfolio" className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-pine-700">
          <ArrowLeft size={14} /> Back to the portfolio
        </Link>
      </section>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const facts = [
    { k: "Location", v: project.location },
    { k: "Year", v: project.year },
    { k: "Discipline", v: project.category },
    { k: "Camera", v: project.camera },
    { k: "Emulsion", v: project.film },
    { k: "The edit", v: project.frames },
  ];

  return (
    <>
      {/* ————— header ————— */}
      <section className="px-5 pt-[120px] sm:px-8 sm:pt-[140px] lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 transition-colors hover:text-wine-600"
            >
              <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
              All stories
            </Link>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
              <div>
                <Kicker>
                  FR. {project.index} · {project.category} · {project.location}
                </Kicker>
                <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.2rem)] font-light leading-[0.95] tracking-[-0.04em] text-ink-900">
                  {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic text-wine-600">
                    {project.title.split(" ").slice(-1)}
                  </span>
                </h1>
              </div>
              <div className="pb-2 text-right">
                <p className="font-display text-5xl font-light italic text-pine-700">{project.year}</p>
                <Meta className="mt-2 block text-ink-500">{project.frames}</Meta>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— hero photograph ————— */}
      <section className="mt-12 px-5 sm:px-8 lg:px-14">
        <Reveal className="mx-auto max-w-[1600px]">
          <div ref={heroRef} className="relative aspect-[4/5] overflow-hidden shadow-lift sm:aspect-[16/9]">
            <motion.div style={{ y: reduce ? 0 : y }} className="absolute -inset-y-[7%] inset-x-0">
              <Frame src={project.cover} alt={project.alt} eager className="h-full w-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950/40 via-transparent to-transparent" />
            <Corners className="text-cream/70" size="h-7 w-7" />
            <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
              <Meta className="text-cream/85">{project.camera} · {project.film}</Meta>
              <Meta className="text-cream/85">© ÉLORE {project.year}</Meta>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ————— story + field notes ————— */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
          <div>
            <Reveal>
              <Kicker>The story</Kicker>
              <p className="dropcap mt-8 text-[16px] leading-[2] text-ink-700">
                {project.story[0]}
              </p>
              <p className="mt-7 text-[16px] leading-[2] text-ink-700">{project.story[1]}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-12 border-l-2 border-wine-600 pl-7">
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light italic leading-snug text-pine-700">
                  “{project.quote}”
                </p>
                <Meta className="mt-4 block text-ink-500">— Field note, {project.location}</Meta>
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <aside className="border border-ink-900/10 bg-cream-100 p-7 lg:sticky lg:top-28">
              <Meta className="text-wine-600">Field notes</Meta>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-ink-900/8 pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{f.k}</dt>
                    <dd className="text-right text-sm font-semibold text-ink-900">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/contact"
                className="group mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-wine-600 transition-colors hover:text-pine-700"
              >
                Commission something like this
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ————— the frames ————— */}
      <section className="bg-cream-100 px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>From the contact sheet</Kicker>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light tracking-tight text-ink-900">
                The <span className="italic text-wine-600">frames.</span>
              </h2>
            </div>
            <Meta className="pb-2 text-ink-500">Select any frame to view it large</Meta>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal
                key={img.src}
                delay={Math.min(i * 0.07, 0.3)}
                className={cn(img.wide && "md:col-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden text-left"
                  aria-label={`View photograph ${i + 1} large`}
                >
                  <Frame
                    src={img.src}
                    alt={img.alt}
                    className={cn(img.wide ? "aspect-[16/9]" : "aspect-[4/5]")}
                    imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-pine-950/0 transition-colors duration-500 group-hover:bg-pine-950/20" />
                  <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-wine-600 opacity-0 shadow-frame transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 size={16} />
                  </span>
                  <span className="absolute bottom-4 left-4 bg-cream/90 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Meta className="text-ink-700">FR. {project.index}{String.fromCharCode(65 + i)} · {img.alt}</Meta>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— next story ————— */}
      <Link to={`/portfolio/${next.slug}`} className="group relative block overflow-hidden bg-pine-950 text-cream">
        <div className="absolute inset-0">
          <img
            src={next.cover}
            alt=""
            aria-hidden="true"
            className="photo-grade h-full w-full object-cover opacity-25 transition-all duration-[1400ms] group-hover:scale-[1.04] group-hover:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-950 via-pine-950/70 to-pine-950/30" />
        </div>
        <div className="relative mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
          <Kicker tone="brass">Next story · FR. {next.index}</Kicker>
          <p className="max-w-3xl font-display text-[clamp(2.4rem,6vw,5.2rem)] font-light leading-[0.98] tracking-[-0.03em]">
            {next.title}
            <span className="text-brass-300">.</span>
          </p>
          <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60 transition-colors group-hover:text-brass-300">
            {next.category} · {next.location}
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      <Lightbox
        images={project.gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </>
  );
}
