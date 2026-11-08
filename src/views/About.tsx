"use client";

import { Aperture as ApertureIcon, Eye, Feather, Heart } from "lucide-react";
import {
  Aperture,
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
import { gear, imagery, milestones, site, stats } from "../data/content";
import { Link } from "@/lib/router";

const pillars = [
  {
    icon: Eye,
    title: "Authenticity",
    text: "Nothing staged that doesn't want to be. I photograph what is actually happening — because real life composes itself better than I ever could.",
  },
  {
    icon: Feather,
    title: "Artistry",
    text: "An editorial eye trained on ordinary days: light studied like a language, colour graded like a memory, every frame built with intention.",
  },
  {
    icon: Heart,
    title: "Feeling",
    text: "The only brief that truly matters. If a photograph doesn't make you feel something years later, it was only ever a picture.",
  },
];

export default function About() {
  return (
    <>
      {/* ————— intro ————— */}
      <section className="relative overflow-hidden px-5 pt-[130px] sm:px-8 sm:pt-[150px] lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(45% 40% at 10% 15%, rgba(212,175,94,0.15), transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <Kicker>The photographer · {site.photographer}</Kicker>
            <h1 className="mt-7 font-display text-[clamp(3rem,7.5vw,6.8rem)] font-light leading-[0.94] tracking-[-0.04em] text-ink-900">
              Every photograph
              <br />
              begins with{" "}
              <span className="italic text-wine-600">light.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.95] text-ink-500">
              I'm Elena — an independent photographer based in Lyon, working wherever a
              story asks to be seen. Weddings, portraits, editorials and wild places:
              different subjects, one obsession.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-7">
              <Link to="/portfolio">
                <ButtonSolid>See the work</ButtonSolid>
              </Link>
              <Link to="/contact">
                <ArrowLink>Say hello</ArrowLink>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -right-4 -top-4 h-full w-full border border-pine-700/40" aria-hidden="true" />
            <div className="relative aspect-[4/5] shadow-lift">
              <Frame src={imagery.aboutPortrait} alt="Elena Lore with her vintage film camera" eager className="absolute inset-0" />
              <Corners className="text-cream/70" />
              <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
                <Meta className="text-cream/90">SELF · 2025</Meta>
                <Meta className="text-cream/90">PORTRA 400</Meta>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Meta className="text-ink-500">“The camera is an excuse to pay attention.”</Meta>
              <Aperture className="h-6 w-6 text-wine-600" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— numbers band ————— */}
      <section className="mt-24 bg-pine-950 py-16 text-cream">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4 lg:px-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-l border-cream/15 pl-6">
              <p className="font-display text-5xl font-light tracking-tight text-brass-300">{s.value}</p>
              <Meta className="mt-3 block text-cream/50">{s.label}</Meta>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— the journey ————— */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker>The journey</Kicker>
              <SectionTitle className="mt-6 text-ink-900">
                A curiosity
                <br />
                that became a{" "}
                <span className="italic text-pine-700">calling.</span>
              </SectionTitle>
              <div className="relative mt-10 max-w-[380px]">
                <Frame src={imagery.aboutCamera} alt="A hand holding a classic 35mm film camera" className="aspect-[4/3] shadow-frame" />
                <div className="mt-4 flex items-center justify-between">
                  <Meta className="text-ink-500">THE FIRST TEACHER · LIGHT</Meta>
                  <Meta className="text-wine-600">FIG. 02</Meta>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10 lg:pt-3">
            <Reveal>
              <p className="dropcap text-[16px] leading-[2] text-ink-700">
                My journey into photography began with a fascination for the way light
                transforms ordinary moments into something extraordinary. A kitchen at
                seven in the morning. A stranger's face turning toward a window. I wanted
                to understand why these things stopped me — and whether a camera could
                hold the feeling.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[16px] leading-[2] text-ink-700">
                Over time, that curiosity grew into a creative pursuit — learning to see
                beyond what is visible and discovering the emotions, stories, and details
                hidden within every frame. I assisted, I second-shot, I ruined rolls of
                film in expensive ways, and slowly the seeing became instinct.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[16px] leading-[2] text-ink-700">
                Today, my approach is rooted in authenticity, artistic expression, and a
                belief that the most meaningful images are the ones that make you feel
                something. The gear has changed. The obsession hasn't.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <blockquote className="border-l-2 border-brass-500 bg-cream-100 py-7 pl-7 pr-6">
                <p className="font-display text-2xl font-light italic leading-snug text-wine-700">
                  “I don't take photographs of things. I take photographs of what things
                  feel like.”
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.05} className="flex items-center justify-between border-t border-ink-900/10 pt-7">
              <p className="font-display text-4xl italic text-pine-700">Elena Lore</p>
              <Meta className="text-ink-500">FOUNDER · ÉLORE</Meta>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— pillars ————— */}
      <section className="bg-wine-800 px-5 py-24 text-cream sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker tone="brass">The approach</Kicker>
              <SectionTitle className="mt-6">
                Three things I <span className="italic text-brass-300">believe.</span>
              </SectionTitle>
            </div>
            <Meta className="pb-2 text-cream/50">Everything else is technique</Meta>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-cream/15 bg-cream/15 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="group bg-wine-800 p-9 transition-colors duration-500 hover:bg-wine-700">
                <p.icon size={26} strokeWidth={1.4} className="text-brass-300 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-6 font-display text-3xl font-light">{p.title}</h3>
                <p className="mt-4 text-sm leading-loose text-cream/60">{p.text}</p>
                <Meta className="mt-6 block text-brass-400/70">0{i + 1}</Meta>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— timeline + gear ————— */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <Kicker>Milestones</Kicker>
              <SectionTitle className="mt-6 text-ink-900">
                Six years,
                <br />
                <span className="italic text-wine-600">one obsession.</span>
              </SectionTitle>
            </Reveal>
            <div className="relative mt-12 border-l border-ink-900/15 pl-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.06} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cream bg-wine-600 shadow-[0_0_0_3px_rgba(108,21,30,0.2)]" />
                  <Meta className="text-wine-600">{m.year}</Meta>
                  <h3 className="mt-2 font-display text-2xl font-light text-ink-900">{m.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-loose text-ink-500">{m.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:pt-24">
            <Reveal>
              <div className="border border-ink-900/10 bg-pine-950 p-8 text-cream sm:p-10">
                <FilmStrip className="mb-8 text-brass-400" />
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-3xl font-light">
                    In the <span className="italic text-brass-300">bag.</span>
                  </h3>
                  <ApertureIcon size={24} strokeWidth={1.4} className="text-brass-400" />
                </div>
                <ul className="mt-8 space-y-5">
                  {gear.map((g) => (
                    <li key={g.item} className="flex items-baseline justify-between gap-4 border-b border-cream/10 pb-4">
                      <span className="text-sm font-semibold">{g.item}</span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                        {g.note}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-sm leading-loose text-cream/50">
                  Tools matter less than attention. But these have earned their scratches.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex items-center justify-between gap-6 border border-ink-900/10 bg-cream-100 p-7">
              <p className="font-display text-xl font-light italic text-ink-900">
                Curious what this eye could do with your story?
              </p>
              <Link to="/contact" className="shrink-0">
                <ArrowLink>Let's talk</ArrowLink>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
