"use client";

import {
	motion,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
	children: ReactNode;
	/** Travel distance in px. Positive = lags behind the page (feels far), negative = moves ahead (feels near). */
	speed?: number;
	/** Horizontal drift in px. */
	x?: number;
	/** Rotation (deg) swept across the scroll range. */
	rotate?: number;
	/** Zoom-in amount as the element enters (0.08 = starts at 92% size). */
	scale?: number;
	/** Fade in while entering the viewport. */
	fade?: boolean;
	className?: string;
};

/**
 * Scroll-linked parallax wrapper with spring smoothing.
 * Respects prefers-reduced-motion.
 */
export default function Parallax({
	children,
	speed = 60,
	x = 0,
	rotate = 0,
	scale = 0,
	fade = false,
	className,
}: ParallaxProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const spring = { stiffness: 110, damping: 26, mass: 0.4 };
	const y = useSpring(
		useTransform(scrollYProgress, [0, 1], [speed, -speed]),
		spring,
	);
	const xs = useSpring(
		useTransform(scrollYProgress, [0, 1], [x, -x]),
		spring,
	);
	const r = useSpring(
		useTransform(scrollYProgress, [0, 1], [-rotate, rotate]),
		spring,
	);
	const s = useSpring(
		useTransform(scrollYProgress, [0, 0.5, 1], [1 - scale, 1, 1]),
		spring,
	);
	const o = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

	if (reduce) return <div className={className}>{children}</div>;

	return (
		<div ref={ref} className={className}>
			<motion.div
				style={{
					y,
					x: xs,
					rotate: r,
					scale: s,
					...(fade ? { opacity: o } : {}),
				}}
				className="will-change-transform"
			>
				{children}
			</motion.div>
		</div>
	);
}
