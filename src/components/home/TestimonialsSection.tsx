"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageSquareQuote, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    // Subtle parallax on the giant quote mark
    gsap.to(quoteMarkRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: sectionRef });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-24 bg-cream-paper relative overflow-hidden" ref={sectionRef}>
      
      {/* Oversized background quote mark */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <Quote 
          ref={quoteMarkRef}
          className="w-[400px] h-[400px] text-forest-ink/[0.03] rotate-12"
          strokeWidth={0.5}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <SectionHeader
          eyebrowText="Student Success"
          eyebrowIcon={<MessageSquareQuote className="w-3.5 h-3.5" />}
          title="Don't just take our word for it"
          description=""
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[400px] md:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={activeIndex}>
              <motion.div
                key={activeIndex}
                custom={activeIndex}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -40, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-white rounded-3xl p-8 md:p-12 border border-pencil-gray/20 shadow-[var(--shadow-card)]"
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                  
                  {/* Avatar / Score */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-sticky-note-mint/30 flex items-center justify-center border-2 border-white shadow-md mb-4 text-forest-ink font-bricolage text-2xl font-bold uppercase overflow-hidden">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div className="inline-flex flex-col items-center px-3 py-1.5 rounded-xl bg-forest-ink/5 border border-forest-ink/10">
                      <span className="text-[11px] font-roboto-mono text-forest-ink/60 uppercase tracking-wider mb-0.5">Rating</span>
                      <span className="font-bricolage font-bold text-forest-ink text-lg leading-none">{testimonials[activeIndex].rating}/5</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 + 0.3 }}
                        >
                          <Star className="w-4 h-4 fill-highlighter-yellow text-highlighter-yellow" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-inter font-medium text-forest-ink leading-relaxed mb-6">
                      "{testimonials[activeIndex].content}"
                    </h4>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <p className="font-semibold text-forest-ink font-inter">{testimonials[activeIndex].name}</p>
                      <p className="text-sm text-forest-ink/60 font-inter">{testimonials[activeIndex].role}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-pencil-gray/30 flex items-center justify-center text-forest-ink hover:bg-forest-ink hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-forest-ink/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2 mx-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === idx ? "bg-forest-ink w-6" : "bg-pencil-gray/40 hover:bg-pencil-gray/60"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-pencil-gray/30 flex items-center justify-center text-forest-ink hover:bg-forest-ink hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-forest-ink/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};