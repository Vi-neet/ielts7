"use client";

import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  children: React.ReactNode;
  className?: string;
  /** If true, the highlight animates in from the left on mount */
  animated?: boolean;
}

/**
 * Yellow marker-style highlight for emphasis words/phrases.
 * Per DESIGN.md: use only for IELTS, Band 7+, important learning outcomes,
 * and key marketing statements.
 */
export const HighlightedText = ({
  children,
  className,
}: HighlightedTextProps) => {
  return (
    <span
      className={cn(
        "relative inline-block",
        className
      )}
    >
      <span
        className="absolute inset-0 -skew-x-1 bg-highlighter-yellow/80 rounded-[2px] -mx-1 px-1"
        style={{
          top: "10%",
          bottom: "5%",
          left: "-4px",
          right: "-4px",
        }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default HighlightedText;
