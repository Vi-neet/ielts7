"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FloatingShapeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Parallax speed. Positive moves up faster, negative slower
  float?: boolean; // Continuous float
}

export function FloatingShape({ children, className, speed = 0.5, float = false }: FloatingShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Parallax effect
    if (speed !== 0) {
      gsap.to(containerRef.current, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Continuous float effect
    if (float) {
      gsap.to(containerRef.current, {
        y: "+=10",
        rotation: "+=2",
        duration: 3 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={cn("absolute pointer-events-none z-0", className)}>
      {children}
    </div>
  );
}
