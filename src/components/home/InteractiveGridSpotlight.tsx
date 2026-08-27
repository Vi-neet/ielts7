"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGridSpotlightProps {
  className?: string;
}

export function InteractiveGridSpotlight({ className }: InteractiveGridSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { damping: 26, stiffness: 240 });
  const smoothY = useSpring(mouseY, { damping: 26, stiffness: 240 });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isMounted) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Soft Graph Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#1a3300_1px,transparent_1px),linear-gradient(to_bottom,#1a3300_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Viewport-Fixed Spotlight Beam (Perfectly Centered on Cursor Tip) */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            left: smoothX,
            top: smoothY,
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(255,233,92,0.16) 0%, rgba(26,51,0,0.04) 50%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
