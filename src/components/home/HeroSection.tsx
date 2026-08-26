"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Headphones,
  PenTool,
  MessageCircle,
} from "lucide-react";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FloatingShape } from "@/components/ui/FloatingShape";
import { HighlightedText } from "./HighlightedText";
import ProductPreview, { SkillType } from "./ProductPreview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<SkillType>("listening");

  const skillPills: { id: SkillType; icon: any; label: string; href: string }[] = [
    { id: "reading", icon: BookOpen, label: "Reading", href: "/tests?module=reading" },
    { id: "listening", icon: Headphones, label: "Listening", href: "/tests?module=listening" },
    { id: "writing", icon: PenTool, label: "Writing", href: "/writing-review" },
    { id: "speaking", icon: MessageCircle, label: "Speaking", href: "/tests" },
  ];

  return (
    <section
      className="relative pt-12 pb-0 overflow-hidden min-h-screen flex flex-col justify-center perspective-1000"
      ref={containerRef}
    >
      <AmbientBackground variant="cream" />

      {/* Dynamic Ambient Accent Glow behind hero */}
      <motion.div
        animate={{
          backgroundColor:
            activeSkill === "listening"
              ? "rgba(15, 118, 110, 0.08)"
              : activeSkill === "reading"
              ? "rgba(224, 122, 95, 0.08)"
              : activeSkill === "writing"
              ? "rgba(147, 51, 234, 0.08)"
              : "rgba(16, 185, 129, 0.08)",
        }}
        transition={{ duration: 0.6 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Decorative SVG layers powered by GSAP Parallax */}
      <FloatingShape speed={0.8} float={true} className="top-24 right-[8%] hidden lg:block opacity-20">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 4 L34 29 L59 32 L34 35 L32 60 L30 35 L5 32 L30 29 Z" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </FloatingShape>

      <FloatingShape speed={0.4} float={true} className="bottom-40 left-[6%] hidden lg:block opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40 Q40 10 70 40" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M60 34 L70 40 L62 48" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </FloatingShape>

      <FloatingShape speed={1.2} className="top-40 left-[12%] hidden xl:block opacity-10">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="#1a3300" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </FloatingShape>

      <div className="container mx-auto max-w-6xl px-6 relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mt-12 md:mt-24"
        >
          {/* Eyebrow */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-forest-ink/15 bg-cream-paper/80 backdrop-blur-sm shadow-sm">
              <Image src="/icon.webp" alt="IELTS 7+ House" width={20} height={20} className="rounded-sm" priority />
              <span className="text-[13px] font-medium text-forest-ink/80 tracking-wide font-inter">
                ✦ IELTS 7+ PREPARATION
              </span>
            </div>
          </div>

          <h1 className="mb-6 tracking-tight leading-none text-forest-ink font-bricolage font-extrabold max-w-[760px] text-[clamp(42px,7vw,72px)]">
            Your path to <HighlightedText>Band 7+</HighlightedText> starts here.
          </h1>

          <p className="mb-8 text-forest-ink/65 leading-relaxed font-inter text-[clamp(16px,2vw,18px)] max-w-[560px]">
            Comprehensive practice materials and proven strategies that have
            helped thousands of students achieve their target IELTS scores.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <Button asChild variant="forest" className="px-5 py-2.5 text-[15px] font-semibold font-inter shadow-md hover:shadow-lg transition-shadow">
              <a href="/tests">
                Start Practicing
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button asChild variant="forestOutline" className="px-5 py-2.5 text-[15px] font-inter">
              <a href="/resources">Free Resources</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mb-14 font-inter">
            {["Free to start", "Reading & Listening tests", "10,000+ students"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[13px] text-pencil-gray">
                <CheckCircle2 className="w-3.5 h-3.5 text-sticky-note-mint" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Interactive Skill Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 md:mb-16">
            {skillPills.map(({ id, icon: Icon, label, href }) => {
              const isActive = activeSkill === id;
              return (
                <motion.a
                  key={id}
                  href={href}
                  onMouseEnter={() => setActiveSkill(id)}
                  onClick={(e) => {
                    // Pre-select active skill tab
                    setActiveSkill(id);
                  }}
                  whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.04 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all font-inter shadow-xs cursor-pointer",
                    isActive
                      ? "bg-forest-ink text-white border-forest-ink shadow-md"
                      : "bg-white/80 text-forest-ink/75 border-pencil-gray/25 hover:text-forest-ink hover:bg-white hover:border-forest-ink/30"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-highlighter-yellow" : "text-forest-ink/60")} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-highlighter-yellow animate-pulse ml-0.5" />
                  )}
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full"
        >
          <div className="absolute -inset-4 rounded-2xl pointer-events-none bg-[radial-gradient(ellipse_at_50%_60%,rgba(26,51,0,0.04)_0%,transparent_70%)]" />
          <ProductPreview activeSkill={activeSkill} />
        </motion.div>
      </div>

      <div className="relative z-10 h-24 mt-[-1px] bg-gradient-to-b from-transparent to-[#fcfaf5]" />
    </section>
  );
};

export default HeroSection;
