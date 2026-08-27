"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageSquareQuote, Star, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { HighlightedText } from "./HighlightedText";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialDetails = [
  {
    badgeText: "Band 6.5 -> 7.5 Overall",
    colorClass: "bg-sticky-note-mint/40 border-forest-ink/20 text-forest-ink",
    highlightWord: "target band score of 7.5",
    rotation: "rotate-[-1.5deg]",
    tag: "Academic Module",
  },
  {
    badgeText: "Medical License: Band 7.5",
    colorClass: "bg-sticky-note-teal/40 border-forest-ink/20 text-forest-ink",
    highlightWord: "7.5 overall",
    rotation: "rotate-[1deg]",
    tag: "Professional License",
  },
  {
    badgeText: "Writing: Band 6.5 -> 8.0",
    colorClass: "bg-highlighter-yellow/50 border-forest-ink/25 text-forest-ink",
    highlightWord: "improved from a 6.5 to an 8",
    rotation: "rotate-[-2deg]",
    tag: "Writing Intensive",
  },
  {
    badgeText: "Speaking: Band 7.0",
    colorClass: "bg-sticky-note-blush/40 border-forest-ink/20 text-forest-ink",
    highlightWord: "score a 7 in the speaking section",
    rotation: "rotate-[1.5deg]",
    tag: "Speaking Simulator",
  },
  {
    badgeText: "First Attempt: Band 8.0",
    colorClass: "bg-sticky-note-mint/40 border-forest-ink/20 text-forest-ink",
    highlightWord: "achieved my dream score",
    rotation: "rotate-[-1deg]",
    tag: "First Attempt",
  },
];

export const TestimonialsSection = () => {
  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const displayedTestimonials = filter === "featured" ? testimonials.slice(0, 3) : testimonials;

  return (
    <section className="py-24 bg-cream-paper relative overflow-hidden" ref={sectionRef}>
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-highlighter-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-sticky-note-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <SectionHeader
          eyebrowText="Student Success Stories"
          eyebrowIcon={<MessageSquareQuote className="w-3.5 h-3.5" />}
          title="Real Students, Real Band 7+ Results"
          description="Read how IELTS candidates transformed their scores for university admissions, medical licensing, and global opportunities."
          className="mb-12"
        />

        {/* Filter Pill Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-pencil-gray/25 rounded-full p-1 shadow-xs">
            <button
              onClick={() => setFilter("featured")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold font-inter transition-all cursor-pointer",
                filter === "featured"
                  ? "bg-forest-ink text-white shadow-sm"
                  : "text-forest-ink/70 hover:text-forest-ink"
              )}
            >
              Featured Highlights
            </button>
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold font-inter transition-all cursor-pointer",
                filter === "all"
                  ? "bg-forest-ink text-white shadow-sm"
                  : "text-forest-ink/70 hover:text-forest-ink"
              )}
            >
              All Reviews ({testimonials.length})
            </button>
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedTestimonials.map((item, idx) => {
            const detail = testimonialDetails[idx % testimonialDetails.length];
            const isFeaturedCard = idx === 1 && filter === "featured";

            // Render content with marker highlight styling on key phrases
            const parts = item.content.split(detail.highlightWord);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(26,51,0,0.12)" }
                }
                className={cn(
                  "relative p-7 rounded-2xl bg-white border font-inter flex flex-col justify-between transition-all duration-300 group cursor-pointer",
                  detail.rotation,
                  isFeaturedCard
                    ? "border-forest-ink/40 shadow-md ring-1 ring-forest-ink/10 bg-gradient-to-b from-white to-[#fcfaf5]"
                    : "border-pencil-gray/20 shadow-xs hover:border-forest-ink/30"
                )}
              >
                {/* Hand-drawn Tape Accent at Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#e5e1d3]/80 rounded-xs border border-pencil-gray/20 shadow-2xs rotate-[-1deg] pointer-events-none" />

                <div>
                  {/* Top Badge & Tag Header */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-bricolage border", detail.colorClass)}>
                      <Award className="w-3.5 h-3.5" />
                      <span>{detail.badgeText}</span>
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-pencil-gray uppercase tracking-wider">
                      {detail.tag}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < item.rating
                            ? "fill-highlighter-yellow text-highlighter-yellow"
                            : "text-pencil-gray/30"
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote text with marker highlight */}
                  <p className="text-[15px] leading-relaxed text-forest-ink/85 font-inter mb-6">
                    {parts[0]}
                    {parts.length > 1 && (
                      <HighlightedText className="font-semibold text-forest-ink">
                        {detail.highlightWord}
                      </HighlightedText>
                    )}
                    {parts[1]}
                  </p>
                </div>

                {/* Footer Student Meta */}
                <div className="pt-4 border-t border-pencil-gray/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest-ink/5 border border-forest-ink/15 text-forest-ink font-bricolage text-base font-extrabold flex items-center justify-center">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-forest-ink leading-tight">
                        {item.name}
                      </span>
                      <span className="text-xs text-forest-ink/60 font-inter">
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-sticky-note-mint shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Footer Banner inside Testimonials */}
        <div className="mt-16 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-forest-ink/15 shadow-xs font-inter text-xs md:text-sm text-forest-ink">
            <span className="font-bold">Ready to write your own Band 7+ success story?</span>
            <a
              href="/tests"
              className="inline-flex items-center font-bold text-forest-ink hover:underline gap-1 group"
            >
              Start Free Practice
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};