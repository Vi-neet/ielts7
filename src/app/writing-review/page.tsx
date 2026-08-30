"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  PenTool,
  BadgeCheck,
  Star,
  TrendingUp,
  Check,
  FileSignature,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/ContactForm";
import { SectionHeader } from "@/components/home/SectionHeader";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample interactive annotations for the interactive demo
const SAMPLE_ANNOTATIONS = [
  {
    start: 28,
    end: 42,
    category: "grammar",
    label: "Grammar & Accuracy",
    comment: "Subject-verb disagreement. Use 'has increased' instead of 'have increased' for singular noun phrase.",
    color: "bg-terracotta/20 text-terracotta border-b-2 border-terracotta"
  },
  {
    start: 84,
    end: 99,
    category: "vocabulary",
    label: "Lexical Resource",
    comment: "Strong academic collocation! Using 'exponential growth' demonstrates Band 8+ vocabulary range.",
    color: "bg-highlighter-yellow/40 text-[#1a3300] border-b-2 border-amber-500"
  },
  {
    start: 142,
    end: 158,
    category: "coherence",
    label: "Coherence & Cohesion",
    comment: "Excellent transitional phrase ('Consequently, it is evident'). Ensures smooth paragraph flow.",
    color: "bg-sticky-note-teal/30 text-emerald-900 border-b-2 border-emerald-600"
  }
];

const EvaluationPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef<HTMLElement>(null);
  // Default to showing the first annotation (Grammar) so there is no empty callout box
  const [hoveredAnnotation, setHoveredAnnotation] = useState<number | null>(0);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    if (formRef.current) {
      gsap.from(formRef.current.querySelector(".form-container"), {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      });
    }
  });

  return (
    <main className="bg-[#faf9f5] min-h-screen font-inter relative overflow-x-hidden" style={{ color: "#1a3300" }}>
      <AmbientBackground variant="cream" />

      {/* ── 1. Hero Section ── */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          
          {/* Main Hero Card */}
          <div className="relative bg-[#1a3300] text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl overflow-hidden" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-bricolage text-white tracking-tight leading-tight"
                  style={{ color: "#ffffff" }}
                >
                  Get Line-by-Line <br />
                  <span className="relative inline-block text-emerald-300" style={{ color: "#6ee7b7" }}>
                    IELTS Writing Feedback
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white text-sm sm:text-base leading-relaxed max-w-xl font-inter font-normal"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Stop guessing why your writing score is stuck at Band 6.0 or 6.5. Get professional evaluation for Task 1 and Task 2 essays with exact band score breakdown across all 4 official IELTS criteria.
                </motion.p>

                {/* Key Features Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono font-medium"
                  style={{ color: "#ffffff" }}
                >
                  {[
                    "Color-coded line annotations",
                    "TR, CC, LR & GRA score breakdown",
                    "Grammar & vocabulary corrections",
                    "Band 7.5+ rewrite suggestions",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Pricing CTA Row */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                >
                  <Link href="/writing-review/submit">
                    <Button variant="forest" className="h-12 px-8 text-base font-bold font-inter rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-[#1a3300] border-none" style={{ backgroundColor: "#34d399", color: "#1a3300" }}>
                      <span>Submit Essay Now</span>
                      <span className="bg-[#1a3300] text-white text-xs px-2 py-0.5 rounded-full font-mono font-extrabold ml-1" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>₹49</span>
                      <ArrowRight size={16} />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs font-mono text-white" style={{ color: "#ffffff" }}>
                    <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                    <span>Instant payment receipt & candidate dashboard tracking</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Sample Review Showcase Preview */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-5 shadow-2xl border border-pencil-gray/20 relative"
                  style={{ backgroundColor: "#ffffff", color: "#1a3300" }}
                >
                  {/* Mock Toolbar (Removed traffic dots) */}
                  <div className="flex items-center justify-between border-b border-[#1a3300]/10 pb-3 mb-4">
                    <span className="text-xs font-mono font-extrabold" style={{ color: "#1a3300" }}>Trainer Feedback Live View</span>
                    <span className="bg-[#1a3300] text-white px-2.5 py-0.5 rounded text-[11px] font-mono font-extrabold" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
                      Estimated: Band 7.5
                    </span>
                  </div>

                  {/* Interactive Annotation Snippet */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider font-extrabold" style={{ color: "#1a3300" }}>
                      Interactive Sample (Click or hover highlights):
                    </p>
                    
                    <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#1a3300]/10 text-xs leading-relaxed font-inter" style={{ color: "#1a3300" }}>
                      "The proportion of urban dwellers{" "}
                      <span
                        onClick={() => setHoveredAnnotation(0)}
                        onMouseEnter={() => setHoveredAnnotation(0)}
                        className={`cursor-pointer px-1 rounded transition-all font-semibold ${SAMPLE_ANNOTATIONS[0].color}`}
                      >
                        have increased
                      </span>{" "}
                      significantly over the past three decades. Cities worldwide experienced{" "}
                      <span
                        onClick={() => setHoveredAnnotation(1)}
                        onMouseEnter={() => setHoveredAnnotation(1)}
                        className={`cursor-pointer px-1 rounded transition-all font-semibold ${SAMPLE_ANNOTATIONS[1].color}`}
                      >
                        exponential growth
                      </span>{" "}
                      due to rapid industrial development.{" "}
                      <span
                        onClick={() => setHoveredAnnotation(2)}
                        onMouseEnter={() => setHoveredAnnotation(2)}
                        className={`cursor-pointer px-1 rounded transition-all font-semibold ${SAMPLE_ANNOTATIONS[2].color}`}
                      >
                        Consequently, it is evident
                      </span>{" "}
                      that infrastructure planning must adapt."
                    </div>

                    {/* Active feedback callout */}
                    <div className="min-h-[70px]">
                      {hoveredAnnotation !== null && (
                        <motion.div
                          key={hoveredAnnotation}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-xl text-xs space-y-1 shadow-md"
                          style={{ backgroundColor: "#1a3300", color: "#ffffff" }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-highlighter-yellow uppercase font-extrabold" style={{ color: "#ffe95c" }}>
                              {SAMPLE_ANNOTATIONS[hoveredAnnotation].label}
                            </span>
                            <span className="text-[9px] font-mono text-white/70" style={{ color: "rgba(255,255,255,0.7)" }}>Trainer Note</span>
                          </div>
                          <p className="text-white text-[11px] leading-snug font-medium" style={{ color: "#ffffff" }}>
                            {SAMPLE_ANNOTATIONS[hoveredAnnotation].comment}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Criteria Badge row */}
                  <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-[#1a3300]/10 text-center">
                    {[
                      { label: "TR", score: "7.5" },
                      { label: "CC", score: "8.0" },
                      { label: "LR", score: "7.5" },
                      { label: "GRA", score: "7.0" },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#1a3300]/5 p-1.5 rounded-lg border border-[#1a3300]/10">
                        <span className="text-[9px] font-mono block font-extrabold" style={{ color: "#1a3300" }}>{item.label}</span>
                        <strong className="text-xs font-bold font-bricolage" style={{ color: "#1a3300" }}>{item.score}</strong>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. The 4 IELTS Writing Criteria Breakdown Section (EXPLICIT SOLID DARK STYLES) ── */}
      <section className="py-16 bg-white border-y border-slate-200 relative z-10" style={{ backgroundColor: "#ffffff", color: "#1a3300" }}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-sm" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
              EVALUATION STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage tracking-tight" style={{ color: "#1a3300" }}>
              Evaluated Across All 4 Official Criteria
            </h2>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed max-w-xl mx-auto" style={{ color: "#2d3748" }}>
              Every essay is evaluated using official Cambridge IELTS writing band descriptors so you know exactly where to make adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
            {[
              {
                code: "TR",
                title: "Task Achievement",
                desc: "Evaluates whether you fully addressed all prompt requirements, developed clear main ideas, and presented a well-supported position.",
                bgColor: "#f8f0ff",
                borderColor: "#c084fc",
                badgeBg: "#7e22ce",
              },
              {
                code: "CC",
                title: "Coherence & Cohesion",
                desc: "Assesses your paragraph structure, logical progression of ideas, topic sentences, and effective use of cohesive linking devices.",
                bgColor: "#e8f8f0",
                borderColor: "#34d399",
                badgeBg: "#065f46",
              },
              {
                code: "LR",
                title: "Lexical Resource",
                desc: "Measures vocabulary range, precision, collocations, awareness of style and register, as well as spelling and word formation accuracy.",
                bgColor: "#fffbe6",
                borderColor: "#f59e0b",
                badgeBg: "#92400e",
              },
              {
                code: "GRA",
                title: "Grammatical Range",
                desc: "Examines your use of complex sentence structures, clause variation, punctuation precision, and overall error-free sentence ratio.",
                bgColor: "#ebf5ff",
                borderColor: "#60a5fa",
                badgeBg: "#1e40af",
              },
            ].map((crit) => (
              <motion.div
                key={crit.code}
                whileHover={{ y: -3 }}
                className="rounded-2xl border-2 p-5 space-y-3 shadow-sm transition-all"
                style={{ backgroundColor: crit.bgColor, borderColor: crit.borderColor, color: "#1a3300" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg shadow-xs" style={{ backgroundColor: crit.badgeBg, color: "#ffffff" }}>
                    {crit.code}
                  </span>
                  <CheckCircle2 size={20} style={{ color: "#1a3300" }} />
                </div>
                <h3 className="font-extrabold text-base font-bricolage" style={{ color: "#1a3300" }}>{crit.title}</h3>
                <p className="text-xs font-semibold leading-relaxed" style={{ color: "#2d3748" }}>{crit.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. How It Works Steps (EXPLICIT SOLID DARK STYLES) ── */}
      <section className="py-16 bg-[#faf9f5] relative z-10" style={{ backgroundColor: "#faf9f5", color: "#1a3300" }}>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-sm" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
              WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage tracking-tight" style={{ color: "#1a3300" }}>
              Simple 3-Step Evaluation Process
            </h2>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed" style={{ color: "#2d3748" }}>
              Submit your essay in minutes and track evaluation status directly from your candidate dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-inter">
            {[
              {
                step: "01",
                title: "Submit Response",
                desc: "Select Task 1 or Task 2, paste your essay response or notes, and complete instant ₹49 verification.",
                icon: FileSignature,
              },
              {
                step: "02",
                title: "Trainer Review",
                desc: "Certified IELTS evaluators inspect your essay, adding line-by-line category highlights & band score calculations.",
                icon: PenTool,
              },
              {
                step: "03",
                title: "Detailed Report",
                desc: "Access your evaluated essay, category breakdown, estimated band score, and rewrite strategy in your profile.",
                icon: Award,
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border-2 p-6 shadow-sm space-y-4 relative" style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#1a3300" }}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-mono text-2xl font-extrabold" style={{ color: "#1a3300" }}>{item.step}</span>
                </div>
                <h3 className="font-extrabold text-base font-bricolage" style={{ color: "#1a3300" }}>{item.title}</h3>
                <p className="text-xs font-semibold leading-relaxed" style={{ color: "#2d3748" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner Box */}
          <div className="rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: "#1a3300", color: "#ffffff" }}>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold" style={{ color: "#6ee7b7" }}>
                Ready to improve your band score?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-bricolage tracking-tight" style={{ color: "#ffffff" }}>
                Submit Your Essay Today for Only ₹49
              </h3>
              <p className="text-xs sm:text-sm max-w-md font-inter font-normal" style={{ color: "rgba(255,255,255,0.9)" }}>
                Includes line-by-line error annotations, criteria breakdown, and actionable rewrite suggestions.
              </p>
            </div>
            <Link href="/writing-review/submit" className="shrink-0 w-full md:w-auto">
              <Button variant="forest" className="h-12 px-8 font-bold font-inter rounded-2xl shadow-md flex items-center justify-center gap-2 w-full cursor-pointer border-none" style={{ backgroundColor: "#34d399", color: "#1a3300" }}>
                <span>Go to Submission Portal</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── 4. General Support & Contact Form Section ── */}
      <section ref={formRef} id="evaluation-form" className="py-16 bg-white border-t border-slate-200 relative z-10" style={{ backgroundColor: "#ffffff", color: "#1a3300" }}>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader
            eyebrowText="Inquiries & Support"
            eyebrowIcon={<PenTool className="w-3.5 h-3.5" />}
            title="Questions About Writing Evaluation?"
            description="Have questions regarding corporate bulk submissions, custom feedback, or exam prep strategies? Drop us a message below."
            className="mb-10 text-center"
          />

          <div className="form-container rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xs relative overflow-hidden" style={{ backgroundColor: "#faf9f5", color: "#1a3300" }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvaluationPage;
