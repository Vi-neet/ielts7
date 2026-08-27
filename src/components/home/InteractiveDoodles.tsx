"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveDoodlesProps {
  className?: string;
}

export function InteractiveDoodles({ className }: InteractiveDoodlesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  const springConfigSlow = { damping: 25, stiffness: 120 };
  const springConfigFast = { damping: 18, stiffness: 220 };

  // Multiple spring vectors for varied organic motion
  const m1X = useSpring(useMotionValue(0), springConfigSlow);
  const m1Y = useSpring(useMotionValue(0), springConfigSlow);

  const m2X = useSpring(useMotionValue(0), springConfigFast);
  const m2Y = useSpring(useMotionValue(0), springConfigFast);

  const m3X = useSpring(useMotionValue(0), springConfigSlow);
  const m3Y = useSpring(useMotionValue(0), springConfigSlow);

  const m4X = useSpring(useMotionValue(0), springConfigFast);
  const m4Y = useSpring(useMotionValue(0), springConfigFast);

  const m5X = useSpring(useMotionValue(0), springConfigSlow);
  const m5Y = useSpring(useMotionValue(0), springConfigSlow);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const offsetX = (e.clientX - w / 2) / (w / 2);
      const offsetY = (e.clientY - h / 2) / (h / 2);

      m1X.set(offsetX * 20);
      m1Y.set(offsetY * 15);

      m2X.set(-offsetX * 26);
      m2Y.set(-offsetY * 22);

      m3X.set(offsetX * 14);
      m3Y.set(-offsetY * 18);

      m4X.set(-offsetX * 18);
      m4Y.set(offsetY * 24);

      m5X.set(offsetX * 22);
      m5Y.set(-offsetY * 12);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [m1X, m1Y, m2X, m2Y, m3X, m3Y, m4X, m4Y, m5X, m5Y, prefersReducedMotion]);

  if (!isMounted) return null;

  return (
    <div className={cn("absolute inset-0 pointer-events-none z-10 overflow-hidden", className)}>
      {/* Doodle 1: Hand-drawn Curved Arrow pointing to CTAs */}
      <motion.div
        style={{ x: m1X, y: m1Y }}
        className="absolute top-[310px] left-[3%] xl:left-[6%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.08, rotate: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bricolage text-[13px] font-extrabold tracking-wide text-forest-ink bg-highlighter-yellow/60 px-3.5 py-1.5 rounded-full border border-forest-ink/30 shadow-xs group-hover:bg-highlighter-yellow transition-all transform rotate-[-3deg]">
            Start Here
          </span>
          <svg width="85" height="38" viewBox="0 0 85 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
            <path
              d="M 5 20 C 28 6, 52 6, 72 16"
              stroke="#1a3300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 3"
              className="group-hover:stroke-forest-ink transition-colors"
            />
            <path
              d="M 60 8 L 74 17 L 62 25"
              stroke="#1a3300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-forest-ink transition-colors"
            />
          </svg>
        </div>
      </motion.div>

      {/* Doodle 2: Hand-drawn Starburst Accent near Top Right */}
      <motion.div
        style={{ x: m2X, y: m2Y }}
        className="absolute top-[75px] right-[5%] xl:right-[8%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.18, rotate: 12 }}
        transition={{ type: "spring", stiffness: 250 }}
      >
        <div className="relative">
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M34 5 L37 26 L58 13 L43 31 L63 34 L43 37 L58 55 L37 42 L34 63 L31 42 L10 55 L25 37 L5 34 L25 31 L10 13 L31 26 Z"
              stroke="#1a3300"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-highlighter-yellow/20 group-hover:fill-highlighter-yellow/60 group-hover:stroke-forest-ink transition-all"
            />
          </svg>
        </div>
      </motion.div>

      {/* Doodle 3: Practice Tests Sketch Badge */}
      <motion.div
        style={{ x: m3X, y: m3Y }}
        className="absolute top-[360px] right-[4%] xl:right-[6%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: "spring", stiffness: 280 }}
      >
        <div className="relative p-2.5 rounded-xl border border-dashed border-forest-ink/30 bg-cream-paper/90 backdrop-blur-xs shadow-xs group-hover:border-forest-ink group-hover:shadow-sm transition-all transform rotate-[2deg]">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3300" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="font-bricolage text-[12px] font-extrabold text-forest-ink tracking-wide">
              PRACTICE TESTS
            </span>
          </div>
        </div>
      </motion.div>

      {/* Doodle 4: Hand-drawn Pencil Accent Top Left */}
      <motion.div
        style={{ x: m4X, y: m4Y }}
        className="absolute top-[110px] left-[5%] hidden xl:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.15, rotate: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 40 L16 38 L38 16 L30 8 L8 30 Z"
            stroke="#1a3300"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-sticky-note-teal/30 group-hover:fill-sticky-note-teal transition-all"
          />
          <path d="M30 8 L38 16" stroke="#1a3300" strokeWidth="1.75" />
          <path d="M8 40 L16 38" stroke="#1a3300" strokeWidth="1.75" />
        </svg>
      </motion.div>

      {/* Doodle 5: Star Top Center Left */}
      <motion.div
        style={{ x: m5X, y: m5Y }}
        className="absolute top-[80px] left-[20%] xl:left-[23%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.25, rotate: 15 }}
        transition={{ type: "spring", stiffness: 260 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,4 25,15 36,17 28,25 30,36 20,30 10,36 12,25 4,17 15,15" stroke="#1a3300" strokeWidth="1.5" className="fill-highlighter-yellow/40 group-hover:fill-highlighter-yellow transition-colors" />
        </svg>
      </motion.div>

      {/* Doodle 6: Headphones & Audio Wave Sketch Mid Right */}
      <motion.div
        style={{ x: m2X, y: m4Y }}
        className="absolute top-[210px] right-[10%] xl:right-[15%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.12, rotate: -6 }}
        transition={{ type: "spring", stiffness: 280 }}
      >
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-cream-paper/80 border border-forest-ink/20 shadow-2xs group-hover:bg-sticky-note-teal/20 transition-all">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a3300" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
            <path d="M17 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2z" />
            <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
          </svg>
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 8 Q 6 2 10 8 T 18 8 T 22 8" />
          </svg>
        </div>
      </motion.div>

      {/* Doodle 7: Proven Method Mint Badge Bottom Left */}
      <motion.div
        style={{ x: m4X, y: m1Y }}
        className="absolute top-[460px] left-[2%] xl:left-[4%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-bricolage text-[11px] font-extrabold tracking-wider text-forest-ink bg-sticky-note-mint px-2.5 py-1 rounded-md border border-forest-ink/25 shadow-2xs transform rotate-[-4deg] group-hover:rotate-0 transition-transform">
            ✦ Proven Method
          </span>
          <svg width="60" height="18" viewBox="0 0 60 18" fill="none" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 8 Q 20 16 35 6 T 56 12" strokeDasharray="3 2" />
          </svg>
        </div>
      </motion.div>

      {/* Doodle 8: Double Underline & Star Bottom Right */}
      <motion.div
        style={{ x: m5X, y: m3Y }}
        className="absolute top-[490px] right-[3%] xl:right-[5%] hidden lg:block pointer-events-auto group cursor-pointer"
        whileHover={{ scale: 1.15, rotate: -4 }}
        transition={{ type: "spring", stiffness: 280 }}
      >
        <div className="flex items-center gap-1">
          <svg width="70" height="20" viewBox="0 0 70 20" fill="none" stroke="#1a3300" strokeWidth="1.75" strokeLinecap="round">
            <path d="M4 6 Q 35 14 66 4" />
            <path d="M10 14 Q 38 20 60 12" strokeDasharray="4 2" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffe95c" stroke="#1a3300" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
