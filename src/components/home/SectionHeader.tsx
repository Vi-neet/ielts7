"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrowIcon?: React.ReactNode;
  eyebrowText: string;
  title: string | React.ReactNode;
  description: string;
  className?: string;
  centered?: boolean;
}

/**
 * Reusable section header component matching the docs/DESIGN.md aesthetic.
 * Utilizes Bricolage Grotesque for the title and Inter for body text.
 */
export const SectionHeader = ({
  eyebrowIcon,
  eyebrowText,
  title,
  description,
  className,
  centered = true,
}: SectionHeaderProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <motion.div variants={itemVariants} className={cn("mb-5", centered && "flex justify-center")}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pencil-gray/20 bg-white/50 text-[12px] font-medium text-forest-ink/70 tracking-wider uppercase font-inter">
          {eyebrowIcon && <span className="text-forest-ink/60">{eyebrowIcon}</span>}
          <span>{eyebrowText}</span>
        </div>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-forest-ink mb-4 tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        {title}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-forest-ink/65 text-lg leading-relaxed font-inter"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
