"use client";

import { ArrowLeft, ArrowUpRight, Check, Clock, Maximize2, Users } from "lucide-react";
import { useState } from "react";
import Lightbox from "../components/Lightbox";
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
import { getProject, getService, services } from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!service) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <Meta className="text-wine-600">SERVICE · NOT FOUND</Meta>
        <h1 className="mt-5 font-display text-5xl font-light text-ink-900">
          This page was left in the <span className="italic text-wine-600">darkroom.</span>
        </h1>
        <Link to="/services" className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-pine-700">
          <ArrowLeft size={14} /> Back to services
        </Link>
      </section>
    );
  }

  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];
  const related = getProject(service.relatedProject);

  return (
    <>
      {/* ————— hero ————— */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-pine-950 text-cream">
        <div className="absolute inset-0">
          <Frame src={service.heroImage} alt={service.title} eager kenburns className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/55 to-wine-950/30" />
        </div>
        <Corners className="inset-5 text-cream/40" size="h-8 w-8" />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 pt-[150px] sm:px-8 sm:pb-20 lg:px-14">
          <Reveal>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60 transition-colors hover:text-brass-300"
            >
              <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
              All services
            </Link>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-display text-6xl font-light italic text-brass-300/80">{service.number}</span>
              <span className="h-px w-16 bg-brass-400/60" />
              <Meta className="text-cream/70">{service.title}</Meta>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.94] tracking-[-0.04em]">
              {service.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic text-brass-300">{service.heroTitle.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.9] text-cream/70">{service.subtitle} — {service.shortDescription}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2.5 border border-cream/25 bg-pine-950/40 px-4 py-2.5 backdrop-blur-sm">
                <Clock size={13} className="text-brass-300" />
                <Meta className="text-cream/85">{service.duration}</Meta>
              </span>
              <span className="inline-flex items-center gap-2.5 border border-cream/25 bg-pine-950/40 px-4 py-2.5 backdrop-blur-sm">
                <Users size={13} className="text-brass-300" />
                <Meta className="text-cream/85">{service.price}</Meta>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— description + included ————— */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <Reveal>
              <Kicker>The philosophy</Kicker>
              <p className="dropcap mt-8 text-[16px] leading-[2] text-ink-700">{service.description}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <blockquote className="mt-10 border-l-2 border-wine-600 bg-cream-100 py-7 pl-7 pr-6">
                <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-light italic leading-snug text-pine-700">
                  “{service.philosophy}”
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.08} className="mt-10 border border-ink-900/10 p-7">
              <Meta className="text-wine-600">Ideal for</Meta>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{service.idealFor}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="border border-ink-900/10 bg-cream-100 p-8 lg:sticky lg:top-28">
              <Meta className="text-wine-600">What's included</Meta>
              <ul className="mt-7 space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3.5 border-b border-ink-900/8 pb-4 text-sm text-ink-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-700 text-cream">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline justify-between">
                <Meta className="text-ink-500">Investment</Meta>
                <p className="font-display text-3xl font-light text-wine-600">{service.price}</p>
              </div>
              <Link to={`/contact?service=${service.slug}`} className="mt-6 block">
                <ButtonSolid className="w-full justify-center">Start this story</ButtonSolid>
              </Link>
              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
                Replies within 24 hours · No obligation
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— gallery ————— */}
      <section className="bg-cream-100 px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>Recent work</Kicker>
              <SectionTitle className="mt-5 text-ink-900">
                From this <span className="italic text-wine-600">discipline.</span>
              </SectionTitle>
            </div>
            <Meta className="pb-2 text-ink-500">Select a frame to view it large</Meta>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {service.gallery.map((img, i) => (
              <Reveal key={img.src} delay={Math.min(i * 0.07, 0.25)} className={cn(img.wide && "md:col-span-2")}>
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
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— process ————— */}
      <section className="relative overflow-hidden bg-wine-800 px-5 py-24 text-cream sm:px-8 sm:py-28 lg:px-14">
        <FilmStrip className="absolute inset-x-0 top-0 text-brass-400" />
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-14">
            <Kicker tone="brass">Step by step</Kicker>
            <SectionTitle className="mt-6">
              The <span className="italic text-brass-300">process.</span>
            </SectionTitle>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="relative border-t border-cream/20 pt-7">
                <span className="absolute -top-[13px] left-0 bg-wine-800 pr-4 font-mono text-xs tracking-[0.2em] text-brass-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-light">{p.title}</h3>
                <p className="mt-3 text-sm leading-loose text-cream/60">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— related project + next service ————— */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {related && (
            <Reveal>
              <Link to={`/portfolio/${related.slug}`} className="group relative block overflow-hidden">
                <Frame
                  src={related.cover}
                  alt={related.alt}
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-[1300ms] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-wine-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <Meta className="text-brass-300">A related story</Meta>
                  <p className="mt-3 font-display text-3xl font-light text-cream sm:text-4xl">
                    {related.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
                    {related.category} · {related.location} · {related.year}
                  </p>
                </div>
                <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-wine-600 opacity-0 shadow-lift transition-all duration-400 group-hover:opacity-100">
                  <ArrowUpRight size={19} />
                </span>
              </Link>
            </Reveal>
          )}
          <Reveal delay={0.1} className="flex flex-col justify-between gap-10 border border-ink-900/10 bg-cream-100 p-8 sm:p-10">
            <div>
              <Meta className="text-wine-600">Keep exploring</Meta>
              <p className="mt-5 font-display text-3xl font-light leading-snug text-ink-900">
                Next discipline:
                <br />
                <span className="italic text-pine-700">{next.title.replace(" Photography", "")}.</span>
              </p>
              <p className="mt-4 text-sm leading-loose text-ink-500">{next.subtitle}</p>
            </div>
            <div className="flex flex-col items-start gap-5">
              <Link to={`/services/${next.slug}`}>
                <ArrowLink>View {next.title.replace(" Photography", "").toLowerCase()}</ArrowLink>
              </Link>
              <Link to={`/contact?service=${service.slug}`}>
                <ButtonSolid variant="pine">Book {service.title.replace(" Photography", "").toLowerCase()}</ButtonSolid>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox images={service.gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </>
  );
}
