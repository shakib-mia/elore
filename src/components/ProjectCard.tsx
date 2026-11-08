"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/content";
import { Link } from "@/lib/router";
import { cn } from "../utils/cn";
import { Frame, Meta, Reveal } from "./primitives";

export default function ProjectCard({
  project,
  className,
  aspect,
  delay = 0,
}: {
  project: Project;
  className?: string;
  aspect?: string;
  delay?: number;
}) {
  const ratio =
    aspect ?? (project.layout === "large" ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]");
  return (
    <Reveal className={className} delay={delay}>
      <article>
        <Link to={`/portfolio/${project.slug}`} className="group block">
          <div className={cn("relative overflow-hidden", ratio)}>
            <Frame
              src={project.cover}
              alt={project.alt}
              className="absolute inset-0"
              imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            {/* wine tint on hover */}
            <div className="absolute inset-0 bg-wine-900/0 transition-colors duration-500 group-hover:bg-wine-900/15" />

            {/* frame number */}
            <div className="absolute left-4 top-4 flex items-center gap-2 bg-cream/90 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-wine-600" />
              <Meta className="text-ink-700">FR. {project.index} · {project.category}</Meta>
            </div>

            {/* hover arrow */}
            <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-wine-600 text-cream opacity-0 shadow-lift transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={18} />
            </span>

            {/* bottom meta strip */}
            <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-wine-950/70 to-transparent px-4 pb-3 pt-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Meta className="text-cream/85">{project.camera} · {project.film}</Meta>
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4 border-b border-ink-900/10 pb-5">
            <div>
              <h3 className="font-display text-2xl font-light tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-wine-600 sm:text-[1.7rem]">
                {project.title}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                {project.location}
              </p>
            </div>
            <span className="mt-1 shrink-0 font-mono text-[11px] tracking-[0.14em] text-wine-600">
              {project.year}
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
