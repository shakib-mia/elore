"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/* Thin adapter so components keep the same <Link to="…"> API, now backed by the Next.js router. */

export function useRoute() {
  const path = usePathname() || "/";
  return { path, segments: path.split("/").filter(Boolean) };
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <NextLink href={to} {...rest}>
      {children}
    </NextLink>
  );
}
