"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGridSpotlightProps {
  className?: string;
}

const SPOTLIGHT_SIZE = 280;

export function InteractiveGridSpotlight({ className }: InteractiveGridSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 250 });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate relative position within container and offset by half size to center on cursor
      const relativeX = e.clientX - rect.left - SPOTLIGHT_SIZE / 2;
      const relativeY = e.clientY - rect.top - SPOTLIGHT_SIZE / 2;

      mouseX.set(relativeX);
      mouseY.set(relativeY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Soft Graph Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#1a3300_1px,transparent_1px),linear-gradient(to_bottom,#1a3300_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Tightly Centered Cursor Spotlight Beam */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: smoothX,
            y: smoothY,
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            background: "radial-gradient(circle, rgba(255,233,92,0.18) 0%, rgba(26,51,0,0.06) 45%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
