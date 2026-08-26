"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BookOpen,
  Headphones,
  ArrowRight,
  Search,
  Clock,
  Users,
} from "lucide-react";
import { mockTests } from "@/data/mockTests";
import { TestMetadata, TestType } from "@/lib/types";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { FloatingShape } from "@/components/ui/FloatingShape";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TypeDetails {
  title: string;
  color: string;
  lightColor: string;
  icon: React.ElementType;
  description: string;
}

export const PracticeTestsSection = () => {
  const [currentType, setCurrentType] = useState<TestType>("general_reading");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const searchParams = useSearchParams();
  const moduleParam = searchParams ? (searchParams.get("module") || searchParams.get("type")) : null;

  useEffect(() => {
    if (moduleParam) {
      const normalized = moduleParam.toLowerCase();
      if (normalized === "listening") {
        setCurrentType("listening");
      } else if (normalized === "academic_reading" || normalized === "academic-reading" || normalized === "academic") {
        setCurrentType("academic_reading");
      } else if (normalized === "reading" || normalized === "general_reading" || normalized === "general-reading" || normalized === "general") {
        setCurrentType("general_reading");
      }
    }
  }, [moduleParam]);

  useGSAP(() => {
    if (!contentRef.current || prefersReducedMotion) return;
    
    // Macro section reveal
    gsap.from(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  const getTypeDetails = (type: TestType): TypeDetails => {
    switch (type) {
      case "general_reading":
        return {
          title: "General Reading",
          color: "bg-terracotta/20 text-terracotta border-terracotta/30",
          lightColor: "bg-terracotta/5",
          icon: BookOpen,
          description: "General interest passages from newspapers, magazines, and books.",
        };
      case "academic_reading":
        return {
          title: "Academic Reading",
          color: "bg-highlighter-yellow/30 text-forest-ink border-highlighter-yellow/50",
          lightColor: "bg-highlighter-yellow/10",
          icon: BookOpen,
          description: "Complex texts from scientific journals and textbooks.",
        };
      case "listening":
        return {
          title: "Listening",
          color: "bg-sticky-note-teal text-forest-ink border-sticky-note-teal/50",
          lightColor: "bg-sticky-note-teal/20",
          icon: Headphones,
          description: "Audio tests with various accents and academic contexts.",
        };
      default:
        return {
          title: "General Reading",
          color: "bg-terracotta/20 text-terracotta border-terracotta/30",
          lightColor: "bg-terracotta/5",
          icon: BookOpen,
          description: "General interest passages from various sources.",
        };
    }
  };

  const typeDetails = getTypeDetails(currentType);
  const TypeIcon = typeDetails.icon;

  const filteredTests =
    mockTests[currentType]?.filter((test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleTypeChange = (type: TestType) => {
    setCurrentType(type);
    setLoading(true);
    setSearchQuery("");
    setTimeout(() => setLoading(false), 300);
  };

  const getTestPath = (test: TestMetadata, type: TestType): string => {
    return `/tests/${type}/${test.id}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  // Cards enter from alternate directions based on index
  const getCardVariant = (index: number) => ({
    hidden: { 
      x: prefersReducedMotion ? 0 : (index % 2 === 0 ? -20 : 20),
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95 
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  });

  return (
    <section
      id="practice-tests"
      className="py-24 relative bg-cream-paper overflow-hidden"
      ref={sectionRef}
    >
      {/* Background UI fragments */}
      <FloatingShape speed={0.3} className="top-32 left-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="w-64 h-32 bg-white rounded-xl shadow-lg border border-pencil-gray/30 p-4">
          <div className="w-2/3 h-4 bg-pencil-gray/20 rounded mb-2" />
          <div className="w-full h-3 bg-pencil-gray/10 rounded mb-2" />
          <div className="w-4/5 h-3 bg-pencil-gray/10 rounded" />
        </div>
      </FloatingShape>

      <FloatingShape speed={-0.2} float={true} className="bottom-20 right-10 opacity-[0.05] pointer-events-none hidden lg:block">
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded bg-forest-ink flex items-center justify-center text-white font-bold text-xl">A</div>
          <div className="w-12 h-12 rounded border-2 border-forest-ink flex items-center justify-center text-forest-ink font-bold text-xl">B</div>
          <div className="w-12 h-12 rounded border-2 border-forest-ink flex items-center justify-center text-forest-ink font-bold text-xl">C</div>
        </div>
      </FloatingShape>

      <div className="container mx-auto max-w-6xl px-6 relative z-10" ref={contentRef}>
        <SectionHeader
          eyebrowText="Free Practice Tests"
          eyebrowIcon={<BookOpen className="w-3.5 h-3.5" />}
          title="IELTS Practice Tests"
          description="Prepare for your IELTS exam with our collection of authentic practice materials designed to help you achieve band 7+."
          className="mb-14"
        />

        <div className="mb-10">
          {/* Test type selector */}
          <div className="relative mx-auto max-w-2xl p-1.5 rounded-full bg-white border border-pencil-gray/20 shadow-sm">
            <div className="flex relative">
              {[
                { id: "general_reading", label: "General Reading", icon: BookOpen },
                { id: "academic_reading", label: "Academic Reading", icon: BookOpen },
                { id: "listening", label: "Listening", icon: Headphones },
              ].map((type) => {
                const isActive = currentType === type.id;
                const Icon = type.icon;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id as TestType)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-full font-inter text-[14px] font-medium transition-all duration-300 relative z-10",
                      isActive
                        ? "text-cream-paper"
                        : "text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTestTab"
                        className="absolute inset-0 bg-forest-ink rounded-full shadow-md -z-10"
                        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={cn("w-4 h-4", isActive ? "text-highlighter-yellow" : "")} />
                    <span className="hidden sm:inline">{type.label}</span>
                    <span className="sm:hidden">{type.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white rounded-[24px] border border-pencil-gray/20 shadow-[var(--shadow-card)] overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-pencil-gray/15 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#faf9f6]">
            <div className="flex items-center gap-4">
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center border", typeDetails.color)}>
                <TypeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-forest-ink font-inter tracking-tight">
                  {typeDetails.title}
                </h3>
                <p className="text-forest-ink/65 text-sm mt-1 font-inter max-w-md">
                  {typeDetails.description}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative md:max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-forest-ink/40" />
              </div>
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-pencil-gray/30 rounded-lg text-sm text-forest-ink focus:outline-none focus:ring-2 focus:ring-forest-ink/20 focus:border-forest-ink/40 transition-all font-inter shadow-sm"
              />
            </div>
          </div>

          {/* Test list */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-forest-ink/50">
                <div className="w-10 h-10 border-4 border-forest-ink/20 border-t-forest-ink rounded-full animate-spin mb-4"></div>
                <p className="font-inter">Loading tests...</p>
              </div>
            ) : filteredTests.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    variants={getCardVariant(index)}
                    className="group"
                    whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link href={getTestPath(test, currentType)} className="block h-full">
                      <div className="bg-white border border-pencil-gray/25 rounded-2xl p-6 h-full transition-colors duration-300 hover:border-forest-ink/30 hover:shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col">
                        
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-[17px] text-forest-ink font-inter leading-tight group-hover:text-terracotta transition-colors">
                            {test.title}
                          </h4>
                        </div>

                        {/* Metadata with subtle hover reveal/slide */}
                        <div className="flex items-center gap-4 mb-5 text-[12px] font-roboto-mono text-forest-ink/60 mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1.5 transform translate-y-0 group-hover:-translate-y-0.5 transition-transform">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{test.estimatedTime || "60"}m</span>
                          </div>
                          <div className="flex items-center gap-1.5 transform translate-y-0 group-hover:-translate-y-0.5 transition-transform delay-75">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>40 Qs</span>
                          </div>
                          <div className="flex items-center gap-1.5 transform translate-y-0 group-hover:-translate-y-0.5 transition-transform delay-100">
                            <Users className="w-3.5 h-3.5" />
                            <span>{test.completions?.toLocaleString() || "1,200+"}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-pencil-gray/15 flex items-center justify-between mt-auto group-hover:border-forest-ink/10 transition-colors">
                          <span className="text-[13px] font-medium text-forest-ink/80 font-inter group-hover:text-forest-ink">
                            Start Practice
                          </span>
                          <div className="w-8 h-8 rounded-full bg-whisper-gray flex items-center justify-center group-hover:bg-forest-ink group-hover:text-white transition-all duration-300 transform group-hover:rotate-[-45deg]">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-forest-ink/50">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-inter text-lg">No tests found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-terracotta hover:underline font-medium font-inter"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeTestsSection;
