"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  PenTool,
  BadgeCheck,
  Star,
  TrendingUp,
  Check,
  FileSignature,
  ArrowRight
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/ContactForm";
import { SectionHeader } from "@/components/home/SectionHeader";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FloatingShape } from "@/components/ui/FloatingShape";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Button } from "@/components/ui/button";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EvaluationPage = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Visual Column Parallax & floating elements
    if (visualRef.current && heroRef.current) {
      gsap.to(visualRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animate sample essays cascading in
      const samples = visualRef.current.querySelectorAll(".sample-essay");
      gsap.from(samples, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        delay: 0.6,
      });
    }

    // Form Section Reveal
    if (formRef.current) {
      gsap.from(formRef.current.querySelector('.form-container'), {
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
        }
      });
    }
  });

  return (
    <main className="bg-cream-paper min-h-screen">
      <AmbientBackground variant="cream" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-32 overflow-hidden">
        <FloatingShape speed={0.4} float className="top-24 right-10 opacity-10 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 0L75.45 44.55L120 60L75.45 75.45L60 120L44.55 75.45L0 60L44.55 44.55L60 0Z" fill="#1a3300"/>
          </svg>
        </FloatingShape>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Content column */}
            <div className="md:col-span-6 z-10">
              <motion.div
                className="flex items-center mb-6 space-x-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-pencil-gray/20 flex items-center justify-center p-1.5">
                    <Image src="/icon.webp" alt="IELTS 7+ House" width={32} height={32} className="relative object-contain" />
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-lg font-inter text-forest-ink flex items-center gap-1.5">
                    Writing 
                    <span className="bg-sticky-note-mint/40 px-2 py-0.5 rounded text-forest-ink">Evaluation</span>
                    Service
                  </span>
                  <div className="text-xs text-forest-ink/60 font-inter flex items-center mt-0.5">
                    <BadgeCheck className="w-3 h-3 text-forest-ink mr-1" />
                    <span>Professional IELTS Feedback</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-forest-ink tracking-tight leading-tight font-bricolage mb-6"
              >
                Improve Your
                <div className="relative ml-3 inline-block">
                  <span className="relative z-10 text-forest-ink">Writing Score</span>
                  <motion.div
                    className="absolute bottom-1 left-0 right-0 h-4 bg-highlighter-yellow/80 -z-10 -rotate-1"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 flex items-center bg-white border border-pencil-gray/20 rounded-xl px-4 py-3 shadow-[var(--shadow-card)] inline-flex relative overflow-hidden group"
              >
                {/* Subtle sheen effect on pricing */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <div className="w-8 h-8 rounded-full bg-sticky-note-blush/30 flex items-center justify-center mr-3 z-10">
                  <TrendingUp className="w-4 h-4 text-forest-ink" />
                </div>
                <p className="font-medium text-[15px] text-forest-ink font-inter z-10">
                  Expert feedback for only{" "}
                  <span className="font-bold text-forest-ink font-roboto-mono bg-highlighter-yellow px-1.5 py-0.5 rounded ml-1 shadow-sm">₹49</span>
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1"
              >
                {[
                  "Detailed error analysis",
                  "Band score prediction",
                  "Improvement suggestions",
                  "24-48 hour turnaround",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-sticky-note-teal/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-forest-ink" />
                    </div>
                    <div className="text-forest-ink/80 text-sm font-inter font-medium">{feature}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual Column */}
            <div className="md:col-span-6 z-10 mt-12 md:mt-0 relative perspective-1000">
              <div ref={visualRef} className="relative">
                {/* Layered paper background cards for depth */}
                <div className="absolute inset-0 bg-white border border-pencil-gray/10 shadow-sm rounded-2xl rotate-3 scale-95 opacity-50" />
                <div className="absolute inset-0 bg-white border border-pencil-gray/10 shadow-sm rounded-2xl -rotate-2 scale-95 opacity-50" />
                
                {/* Main card */}
                <div className="bg-white rounded-[24px] shadow-[var(--shadow-elevated)] overflow-hidden border border-pencil-gray/20 relative z-10">
                  <div className="bg-[#faf9f6] border-b border-pencil-gray/10 p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-forest-ink/15"></div>
                      <div className="h-3 w-3 rounded-full bg-forest-ink/15"></div>
                      <div className="h-3 w-3 rounded-full bg-forest-ink/15"></div>
                    </div>
                    <div className="h-5 w-32 bg-white rounded-md border border-pencil-gray/10"></div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-[15px] font-bold text-forest-ink mb-6 flex items-center font-inter tracking-tight">
                      <FileSignature className="h-4 w-4 mr-2 text-forest-ink/70" />
                      Sample Evaluated Essays
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className="sample-essay p-3 bg-cream-paper rounded-xl border border-pencil-gray/15 flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="w-12 h-12 overflow-hidden rounded-lg flex-shrink-0 mb-3 border border-pencil-gray/10 shadow-sm bg-white p-1">
                            <Image src={`/essay-${num}.png`} alt={`Essay ${num}`} width={50} height={50} className="w-full h-full object-cover rounded-sm" />
                          </div>
                          <div className="text-center w-full">
                            <h4 className="text-[11px] font-bold text-forest-ink font-inter mb-1.5 uppercase tracking-wider">
                              Sample {num}
                            </h4>
                            <div className="flex items-center justify-center bg-white rounded-md py-1 px-1.5 border border-pencil-gray/10 shadow-sm">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-2 h-2 ${i < 8 - num ? "text-highlighter-yellow fill-highlighter-yellow" : "text-pencil-gray/20"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] text-forest-ink font-roboto-mono font-bold ml-1.5">
                                {8 - num}.0
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating achievement card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-pencil-gray/20 z-20 flex items-center gap-3"
                  animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-10 w-10 rounded-full bg-sticky-note-mint/40 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-forest-ink" />
                  </div>
                  <div>
                    <div className="text-xs text-forest-ink/60 font-inter font-medium">
                      Avg improvement
                    </div>
                    <div className="font-bold text-[15px] text-forest-ink font-roboto-mono">
                      +1.0 bands
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition fill="white" />

      {/* Evaluation Form Section */}
      <section ref={formRef} id="evaluation-form" className="py-24 bg-white relative z-10">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Direct Submit CTA Card */}
          <div className="mb-16 p-8 bg-cream-paper border border-pencil-gray/25 rounded-3xl shadow-sm text-center font-inter max-w-3xl mx-auto">
            <h3 className="text-xl font-bold font-bricolage text-forest-ink mb-2">
              Structured Direct Submission Portal
            </h3>
            <p className="text-sm text-forest-ink/75 leading-relaxed mb-6 max-w-md mx-auto">
              If you want to submit your essay directly, upload attachments, and track reviewer progress in real-time from your profile, use our direct student submission portal.
            </p>
            <Link href="/writing-review/submit">
              <Button variant="forest" className="h-11 px-8 font-semibold shadow-xs flex items-center gap-1.5 mx-auto cursor-pointer">
                <span>Submit Essay Now</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <SectionHeader
            eyebrowText="Get Started"
            eyebrowIcon={<PenTool className="w-3.5 h-3.5" />}
            title="General Inquiry & Payment Form"
            description="Complete the form below for general inquiries or manual payment validations."
            className="mb-12"
          />

          <div className="form-container bg-cream-paper rounded-[24px] p-6 md:p-12 border border-pencil-gray/20 shadow-[var(--shadow-card)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(255,233,92,0.15)_0%,transparent_70%)] pointer-events-none" />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvaluationPage;
