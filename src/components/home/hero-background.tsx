"use client";

import { cn } from "@/lib/utils";

/**
 * CSS-only atmospheric background for the homepage hero.
 * Cream Paper base with subtle radial gradients (warm cream center,
 * faint yellow ambient glow, very light green tint at edges).
 * No canvas, WebGL, particles, or heavy effects.
 */
export const HeroBackgroundAnimation = ({
  className,
}: {
  className?: string;
  interactive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
      style={{ backgroundColor: "#fcfaf5" }}
    >
      {/* Warm cream center glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(252, 250, 245, 1) 0%, rgba(252, 250, 245, 0.6) 50%, transparent 100%)",
        }}
      />

      {/* Subtle yellow ambient glow (upper area) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 233, 92, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Faint green tint (lower-right area) */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(26, 51, 0, 0.015) 0%, transparent 60%)",
        }}
      />

      {/* Very light grid pattern at ~3% opacity */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 51, 0, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 51, 0, 1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
};
