"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingShape } from "@/components/ui/FloatingShape";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !cardRef.current || prefersReducedMotion) return;

    // Card entrance
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Staggered content inside card
    const items = cardRef.current.querySelectorAll(".cta-animate");
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

  }, { scope: sectionRef });

  return (
    <section className="py-24 relative bg-cream-paper overflow-hidden" ref={sectionRef}>
      
      {/* Visual background layers */}
      <FloatingShape speed={0.5} className="top-10 left-10 pointer-events-none opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#1a3300" strokeWidth="2" strokeDasharray="10 15" />
        </svg>
      </FloatingShape>

      <FloatingShape speed={-0.4} float={true} className="bottom-0 right-0 pointer-events-none opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <path d="M0 300L300 0V300H0Z" fill="#1a3300" />
        </svg>
      </FloatingShape>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div
          ref={cardRef}
          className="bg-forest-ink rounded-[24px] overflow-hidden shadow-[var(--shadow-elevated)] relative"
        >
          {/* Subtle noise/texture over the dark background */}
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Abstract SVG Geometry inside CTA */}
          <div className="absolute top-0 right-0 w-[600px] h-full pointer-events-none overflow-hidden hidden md:block">
            <svg viewBox="0 0 600 400" className="absolute right-0 h-full w-auto opacity-10 text-white" preserveAspectRatio="none">
              <path d="M600,0 L0,400 L600,400 Z" fill="currentColor" />
              <circle cx="450" cy="200" r="150" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="450" cy="200" r="100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            </svg>
          </div>

          {/* Top highlight bar */}
          <div className="h-2 w-full bg-highlighter-yellow" />

          <div className="p-10 md:p-16 lg:p-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div>
              <div className="cta-animate inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full bg-cream-paper/10 text-cream-paper/90 text-xs font-medium font-inter uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-highlighter-yellow" />
                <span>Join Thousands of Successful Students</span>
              </div>

              <h2 className="cta-animate text-4xl md:text-5xl font-extrabold text-cream-paper mb-6 leading-tight tracking-tight font-bricolage">
                Achieve Your Target <span className="text-highlighter-yellow">IELTS Score</span> with Expert-Led Practice
              </h2>

              <p className="cta-animate text-cream-paper/70 text-lg leading-relaxed font-inter mb-10 max-w-md">
                Our comprehensive preparation materials and proven strategies have helped thousands of students reach band 7 and above. Start practicing today.
              </p>

              {/* CTAs */}
              <div className="cta-animate flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    className="w-full sm:w-auto px-8 py-6 bg-highlighter-yellow hover:bg-highlighter-yellow/90 text-forest-ink font-bold text-[16px] rounded-[8px] font-inter shadow-sm"
                  >
                    <a href="/?section=practice-tests">
                      Start Practicing Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    className="w-full sm:w-auto px-8 py-6 bg-transparent hover:bg-cream-paper/5 text-cream-paper border border-cream-paper/30 font-semibold text-[16px] rounded-[8px] font-inter"
                  >
                    <a href="/about">
                      Learn More
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Right List */}
            <div className="cta-animate lg:pl-12 lg:border-l border-cream-paper/10">
              <div className="space-y-6">
                {[
                  "Authentic practice tests from Cambridge IELTS",
                  "Detailed performance analysis and feedback",
                  "Structured preparation for all four test sections",
                  "Learn from high-scoring students' strategies",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-4 mt-0.5 shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-sticky-note-mint" />
                    </div>
                    <p className="text-cream-paper/85 font-inter text-[15px] leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
