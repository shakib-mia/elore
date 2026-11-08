"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ————— scroll reveal ————— */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ————— kicker: small rule + letterspaced label ————— */

export function Kicker({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "brass";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "h-px w-9",
          tone === "dark" && "bg-wine-600",
          tone === "light" && "bg-cream/60",
          tone === "brass" && "bg-brass-400"
        )}
      />
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.28em]",
          tone === "dark" && "text-ink-500",
          tone === "light" && "text-cream/60",
          tone === "brass" && "text-brass-400"
        )}
      >
        {children}
      </span>
    </div>
  );
}

/* ————— aperture mark (brand) ————— */

export function Aperture({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="16" cy="16" r="5.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M16 1.5 L19.4 11.4 M29.8 11.9 L20.2 15.2 M26 28.1 L19.5 20.3 M6 28.1 L12.5 20.3 M2.2 11.9 L11.8 15.2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ————— viewfinder corner brackets ————— */

export function Corners({ className, size = "h-5 w-5" }: { className?: string; size?: string }) {
  const base = "pointer-events-none absolute border-current";
  return (
    <div className={cn("pointer-events-none absolute inset-3 z-10", className)} aria-hidden="true">
      <span className={cn(base, size, "left-0 top-0 border-l border-t")} />
      <span className={cn(base, size, "right-0 top-0 border-r border-t")} />
      <span className={cn(base, size, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(base, size, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}

/* ————— framed photograph with graceful load-in ————— */

export function Frame({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  kenburns = false,
  grade = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  kenburns?: boolean;
  grade?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-cream-200", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-cream-200 to-cream-300 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        )}
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-1000",
          loaded ? "opacity-100" : "opacity-0",
          grade && "photo-grade",
          kenburns && "animate-kenburns",
          imgClassName
        )}
      />
    </div>
  );
}

/* ————— film sprocket strip ————— */

export function FilmStrip({ className }: { className?: string }) {
  return <div className={cn("sprockets w-full", className)} aria-hidden="true" />;
}

/* ————— mono metadata tag ————— */

export function Meta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", className)}>
      {children}
    </span>
  );
}

/* ————— marquee band ————— */

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("marquee-hover relative overflow-hidden", className)}>
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-7 font-display text-2xl italic tracking-tight sm:text-3xl">
                  {item}
                </span>
                <Aperture className="h-5 w-5 shrink-0 opacity-60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ————— arrow link ————— */

export function ArrowLink({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "group/al inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
        light ? "text-cream/80 hover:text-cream" : "text-wine-600 hover:text-wine-500",
        className
      )}
    >
      <span className="link-rule">{children}</span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-300 group-hover/al:-translate-y-0.5 group-hover/al:translate-x-0.5"
      />
    </span>
  );
}

/* ————— primary button ————— */

export function ButtonSolid({
  children,
  className,
  variant = "wine",
}: {
  children: ReactNode;
  className?: string;
  variant?: "wine" | "cream" | "pine";
}) {
  return (
    <span
      className={cn(
        "group/btn inline-flex min-h-12 items-center gap-4 px-7 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300",
        variant === "wine" && "bg-wine-600 text-cream shadow-frame hover:bg-pine-700",
        variant === "pine" && "bg-pine-700 text-cream shadow-frame hover:bg-wine-600",
        variant === "cream" && "bg-cream text-wine-700 shadow-frame hover:bg-brass-300 hover:text-wine-800",
        className
      )}
    >
      {children}
      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </span>
  );
}

/* ————— section heading with big serif ————— */

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(2.6rem,5.5vw,4.8rem)] font-light leading-[0.98] tracking-[-0.03em]",
        className
      )}
    >
      {children}
    </h2>
  );
}
