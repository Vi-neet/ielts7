"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  GraduationCap,
  BarChart3,
  LineChart,
  Brain,
  Gauge,
  Globe2,
  Headphones,
  Laptop,
  Route,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { MarqueeFeatures } from "./MarqueeFeatures";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string;
  badgeText?: string;
  category: string;
}

const allFeatures: FeatureItem[] = [
  {
    icon: BookOpen,
    title: "Authentic Materials",
    description: "Practice with genuine Cambridge IELTS tests for the most accurate preparation experience.",
    colorClass: "bg-sticky-note-mint/35",
    category: "Preparation",
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Master timing strategies with our timed practice tests and performance tracking.",
    colorClass: "bg-highlighter-yellow/35",
    category: "Preparation",
  },
  {
    icon: CheckCircle2,
    title: "Question Techniques",
    description: "Learn effective approaches for every question type across all test sections.",
    colorClass: "bg-sticky-note-blush/35",
    category: "Preparation",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Follow instruction from IELTS examiners with decades of assessment experience.",
    colorClass: "bg-sticky-note-teal/35",
    category: "Preparation",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Detailed insights into your test performance with strength and weakness analysis.",
    colorClass: "bg-sticky-note-teal/35",
    category: "Tracking",
  },
  {
    icon: LineChart,
    title: "Progress Dashboard",
    description: "Track your improvement over time with visual progress indicators and reports.",
    colorClass: "bg-sticky-note-mint/35",
    category: "Tracking",
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Our system adapts to focus on your areas of weakness for faster improvement.",
    colorClass: "bg-sticky-note-blush/35",
    category: "Tracking",
  },
  {
    icon: Gauge,
    title: "Band Score Prediction",
    description: "AI-powered band score assessment based on your practice test performance.",
    colorClass: "bg-highlighter-yellow/35",
    category: "Tracking",
  },
  {
    icon: Globe2,
    title: "Global Access",
    description: "Study from anywhere with our cloud-based platform and mobile optimization.",
    colorClass: "bg-sticky-note-blush/35",
    category: "Resources",
  },
  {
    icon: Headphones,
    title: "Audio Library",
    description: "Extensive listening practice with various accents and speech patterns.",
    colorClass: "bg-sticky-note-teal/35",
    category: "Resources",
  },
  {
    icon: Laptop,
    title: "Interactive Exercises",
    description: "Engage with interactive activities designed to build specific test skills.",
    colorClass: "bg-highlighter-yellow/35",
    category: "Resources",
  },
  {
    icon: Route,
    title: "Guided Study Paths",
    description: "Follow structured learning paths tailored to your target band score.",
    colorClass: "bg-sticky-note-mint/35",
    category: "Resources",
  },
];

const AnimatedNumber = ({ value, label, icon: Icon, colorClass }: { value: number; label: string; icon: React.ElementType; colorClass: string }) => {
  const numberRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!numberRef.current || prefersReducedMotion) return;

    ScrollTrigger.create({
      trigger: numberRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          numberRef.current,
          { innerHTML: 0 },
          {
            innerHTML: value,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              if (numberRef.current) {
                const val = Math.ceil(Number(this.targets()[0].innerHTML));
                let formatted = val.toLocaleString();
                numberRef.current.innerHTML = formatted;
              }
            },
          }
        );
      },
      once: true,
    });
  }, { scope: numberRef });

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-pencil-gray/20 bg-white shadow-xs group cursor-pointer transition-all hover:shadow-md"
    >
      <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", colorClass)}>
        <Icon className="w-6 h-6 text-forest-ink" />
      </div>
      <div className="text-4xl font-extrabold text-forest-ink font-bricolage mb-1 flex items-baseline justify-center">
        <span ref={numberRef}>{prefersReducedMotion ? value.toLocaleString() : "0"}</span>
        {(value === 25000 || value === 150000) && <span className="text-terracotta ml-1">+</span>}
        {value === 95 && <span className="text-terracotta ml-1">%</span>}
      </div>
      <div className="text-forest-ink/75 text-[14px] font-inter font-semibold">{label}</div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(textBgRef.current, {
        xPercent: -85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.to(textBgRef.current, {
        xPercent: -75,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-[#fcfaf5] relative overflow-hidden">
      {/* Oversized background typography */}
      <div
        ref={textBgRef}
        className="absolute top-[36%] left-0 text-[200px] md:text-[220px] font-bricolage font-extrabold text-forest-ink/[0.06] tracking-tighter leading-none whitespace-nowrap pointer-events-none z-0 select-none"
      >
        PRACTICE LEARN ACHIEVE
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-highlighter-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <SectionHeader
          eyebrowText="How we help you achieve Band 7+"
          eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="Everything you need to succeed"
          description="A complete ecosystem of tools, tests, and resources built specifically for ambitious IELTS candidates."
          className="mb-14"
        />

        {/* Option 2: Permanent Infinite Marquee Track */}
        <div className="relative z-10">
          <MarqueeFeatures features={allFeatures} />
        </div>

        {/* Stats Showcase with Floating Cards */}
        <div className="mt-20 pt-16 border-t border-pencil-gray/20 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedNumber value={25000} label="Worldwide learners" icon={Users} colorClass="bg-sticky-note-mint/40" />
            <AnimatedNumber value={42} label="Global reach (countries)" icon={Globe2} colorClass="bg-sticky-note-blush/40" />
            <AnimatedNumber value={150000} label="Tests completed" icon={BookOpen} colorClass="bg-highlighter-yellow/40" />
            <AnimatedNumber value={95} label="Success Rate" icon={Award} colorClass="bg-sticky-note-teal/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
