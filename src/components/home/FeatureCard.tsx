"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string; // The pastel bg color class
  delay?: number;
  className?: string;
}

/**
 * Feature card matching DESIGN.md:
 * Clean borders, subtle shadows, pastel icon block, Forest Ink text.
 */
export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  colorClass,
  delay = 0,
  className,
}: FeatureCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(
        "group relative p-6 rounded-2xl bg-white border border-pencil-gray/20 transition-all duration-300",
        "hover:border-forest-ink/20 hover:shadow-[var(--shadow-card)]",
        className
      )}
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-[10px] flex items-center justify-center mb-5",
          "transition-transform duration-300 group-hover:scale-105",
          colorClass
        )}
      >
        <Icon className="w-5 h-5 text-forest-ink" strokeWidth={2.5} />
      </div>
      <h3 className="text-[19px] font-semibold text-forest-ink mb-2.5 leading-snug font-inter tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] text-forest-ink/65 leading-relaxed font-inter">
        {description}
      </p>
    </motion.div>
  );
};
