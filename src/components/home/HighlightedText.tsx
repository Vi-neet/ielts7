"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface HighlightedTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

/**
 * Yellow marker-style highlight for emphasis words/phrases.
 * Animates in from left-to-right with a natural marker stroke ease.
 */
export const HighlightedText = ({
  children,
  className,
}: HighlightedTextProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={cn("relative inline-block group cursor-pointer", className)}>
      <motion.span
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        whileHover={prefersReducedMotion ? {} : { scaleY: 1.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        style={{ originX: 0 }}
        className="absolute inset-0 -skew-x-1 bg-highlighter-yellow/85 rounded-[2px] -mx-1 px-1 pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default HighlightedText;
