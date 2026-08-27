"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string;
  badgeText?: string;
  category: string;
}

interface MarqueeFeaturesProps {
  features: FeatureItem[];
}

export function MarqueeFeatures({ features }: MarqueeFeaturesProps) {
  const prefersReducedMotion = useReducedMotion();
  const row1 = features.slice(0, 6);
  const row2 = features.slice(6);

  const doubleRow1 = [...row1, ...row1];
  const doubleRow2 = [...row2, ...row2];

  return (
    <div className="relative py-6 space-y-6 overflow-hidden">
      {/* Row 1: Leftward Infinite Marquee */}
      <div className="flex overflow-hidden group">
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-6 shrink-0 group-hover:[animation-play-state:paused]"
        >
          {doubleRow1.map((feature, idx) => (
            <div key={`r1-${idx}`} className="w-[320px] shrink-0">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colorClass={feature.colorClass}
                badgeText={feature.badgeText}
                delay={0}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward Infinite Marquee */}
      <div className="flex overflow-hidden group">
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ["-50%", "0%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-6 shrink-0 group-hover:[animation-play-state:paused]"
        >
          {doubleRow2.map((feature, idx) => (
            <div key={`r2-${idx}`} className="w-[320px] shrink-0">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colorClass={feature.colorClass}
                badgeText={feature.badgeText}
                delay={0}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
