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
  LayoutGrid,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { mockTests } from "@/data/mockTests";
import { TestMetadata, TestType } from "@/lib/types";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { FloatingShape } from "@/components/ui/FloatingShape";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function getBandScore(score: number, testType: string): string {
  const isAcademic = testType === "academic_reading";
  const isListening = testType === "listening";
  if (isListening) {
    if (score >= 39) return "9.0"; if (score >= 37) return "8.5";
    if (score >= 35) return "8.0"; if (score >= 32) return "7.5";
    if (score >= 30) return "7.0"; if (score >= 27) return "6.5";
    if (score >= 23) return "6.0"; if (score >= 20) return "5.5";
    if (score >= 16) return "5.0"; if (score >= 13) return "4.5";
    if (score >= 10) return "4.0"; return "3.5";
  }
  if (isAcademic) {
    if (score >= 39) return "9.0"; if (score >= 37) return "8.5";
    if (score >= 35) return "8.0"; if (score >= 33) return "7.5";
    if (score >= 30) return "7.0"; if (score >= 27) return "6.5";
    if (score >= 23) return "6.0"; if (score >= 19) return "5.5";
    if (score >= 15) return "5.0"; if (score >= 13) return "4.5";
    if (score >= 10) return "4.0"; return "3.5";
  }
  if (score >= 40) return "9.0"; if (score >= 39) return "8.5";
  if (score >= 37) return "8.0"; if (score >= 36) return "7.5";
  if (score >= 34) return "7.0"; if (score >= 32) return "6.5";
  if (score >= 30) return "6.0"; if (score >= 27) return "5.5";
  if (score >= 23) return "5.0"; if (score >= 19) return "4.5";
  if (score >= 15) return "4.0"; return "3.5";
}

interface TypeDetails {
  title: string;
  color: string;
  lightColor: string;
  icon: React.ElementType;
  description: string;
}

export const PracticeTestsSection = () => {
  const { user } = useAuth();
  const [currentType, setCurrentType] = useState<TestType | "all">("general_reading");
  const [selectedVolume, setSelectedVolume] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [attemptedMap, setAttemptedMap] = useState<Record<string, { bandScore: string; score: number; total: number }>>({});
  const [savedDraftsMap, setSavedDraftsMap] = useState<Record<string, number>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const searchParams = useSearchParams();
  const moduleParam = searchParams ? (searchParams.get("module") || searchParams.get("type")) : null;

  useEffect(() => {
    // Scan local drafts
    try {
      const drafts: Record<string, number> = {};
      const currentUid = user?.uid || null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("ielts7_session_")) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const data = JSON.parse(raw);
            if (data && data.testId && data.answers) {
              const sessionUid = data.uid || null;
              if (sessionUid === currentUid) {
                const count = Object.values(data.answers).filter((v: any) => String(v).trim()).length;
                if (count > 0) {
                  drafts[data.testId] = count;
                }
              }
            }
          }
        }
      }
      setSavedDraftsMap(drafts);
    } catch {
      // Storage error
    }

    if (!user) return;

    // Fetch user attempts from Firestore
    const fetchUserAttempts = async () => {
      try {
        const q = query(collection(db, "attempts"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const map: Record<string, { bandScore: string; score: number; total: number }> = {};
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.testId && typeof data.score === "number") {
            const band = getBandScore(data.score, data.testType);
            if (!map[data.testId] || data.score > map[data.testId].score) {
              map[data.testId] = { bandScore: band, score: data.score, total: data.total || 40 };
            }
          }
        });
        setAttemptedMap(map);
      } catch (err) {
        console.warn("Could not load user attempts:", err);
      }
    };

    fetchUserAttempts();
  }, [user]);

  useEffect(() => {
    if (moduleParam) {
      const normalized = moduleParam.toLowerCase();
      if (normalized === "listening") {
        setCurrentType("listening");
      } else if (normalized === "academic_reading" || normalized === "academic-reading" || normalized === "academic") {
        setCurrentType("academic_reading");
      } else if (normalized === "reading" || normalized === "general_reading" || normalized === "general-reading" || normalized === "general") {
        setCurrentType("general_reading");
      } else if (normalized === "all") {
        setCurrentType("all");
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

  const getTypeDetails = (type: TestType | "all"): TypeDetails => {
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
          icon: GraduationCap,
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
          title: "All Practice Modules",
          color: "bg-forest-ink/10 text-forest-ink border-forest-ink/20",
          lightColor: "bg-whisper-gray/50",
          icon: LayoutGrid,
          description: "Browse all authentic IELTS Reading and Listening practice tests.",
        };
    }
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const typeDetails = getTypeDetails(currentType);
  const TypeIcon = typeDetails.icon;

  // Gather tests based on module filter
  const getRawTests = (): { test: TestMetadata; type: TestType }[] => {
    if (currentType === "all") {
      const all: { test: TestMetadata; type: TestType }[] = [];
      (Object.keys(mockTests) as TestType[]).forEach((tKey) => {
        (mockTests[tKey] || []).forEach((t) => {
          all.push({ test: t, type: tKey });
        });
      });
      return all;
    }
    return (mockTests[currentType] || []).map((t) => ({ test: t, type: currentType }));
  };

  const allItems = getRawTests();

  const filteredItems = allItems.filter(({ test }) => {
    const matchesSearch =
      !searchQuery.trim() ||
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.year.toString().includes(searchQuery) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVolume =
      selectedVolume === "all" || test.id.toLowerCase().includes(selectedVolume.toLowerCase());

    const hasAttempt = !!attemptedMap[test.id];
    const hasDraft = !hasAttempt && !!savedDraftsMap[test.id];

    let matchesStatus = true;
    if (selectedStatus === "attempted") {
      matchesStatus = hasAttempt;
    } else if (selectedStatus === "in_progress") {
      matchesStatus = hasDraft;
    } else if (selectedStatus === "unattempted") {
      matchesStatus = !hasAttempt && !hasDraft;
    }

    return matchesSearch && matchesVolume && matchesStatus;
  });

  const handleTypeChange = (type: TestType | "all") => {
    setCurrentType(type);
    setLoading(true);
    setTimeout(() => setLoading(false), 200);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedVolume("all");
    setSelectedStatus("all");
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

        <div className="mb-10 space-y-5">
          {/* Test type selector */}
          <div className="relative mx-auto max-w-3xl p-1.5 rounded-full bg-white border border-pencil-gray/20 shadow-sm">
            <div className="flex relative">
              {[
                { id: "all", label: "All Modules", icon: LayoutGrid },
                { id: "general_reading", label: "General Reading", icon: BookOpen },
                { id: "academic_reading", label: "Academic Reading", icon: GraduationCap },
                { id: "listening", label: "Listening", icon: Headphones },
              ].map((type) => {
                const isActive = currentType === type.id;
                const Icon = type.icon;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-full font-inter text-xs md:text-sm font-semibold transition-all duration-300 relative z-10",
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
          <div className="p-6 md:p-8 border-b border-pencil-gray/15 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#faf9f6]">
            <div className="flex items-center gap-4">
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center border shrink-0", typeDetails.color)}>
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

            {/* Filters Row: Search, Volume Dropdown & Status Dropdown */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Cambridge Volume Filter Dropdown */}
              <div className="relative w-full sm:w-auto min-w-[150px]">
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-white border border-pencil-gray/30 rounded-xl text-xs font-inter font-semibold text-forest-ink focus:outline-none focus:ring-2 focus:ring-forest-ink/20 shadow-2xs cursor-pointer appearance-none"
                >
                  <option value="all">All Volumes</option>
                  <option value="cambridge19">Cambridge 19 (2024)</option>
                  <option value="cambridge18">Cambridge 18 (2023)</option>
                  <option value="cambridge17">Cambridge 17 (2022)</option>
                  <option value="cambridge16">Cambridge 16 (2021)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-forest-ink/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Attempt Status Dropdown */}
              <div className="relative w-full sm:w-auto min-w-[140px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-white border border-pencil-gray/30 rounded-xl text-xs font-inter font-semibold text-forest-ink focus:outline-none focus:ring-2 focus:ring-forest-ink/20 shadow-2xs cursor-pointer appearance-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="attempted">Attempted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="unattempted">Unattempted</option>
                </select>
                <ChevronDown className="w-4 h-4 text-forest-ink/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-56 min-w-[180px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-forest-ink/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-pencil-gray/30 rounded-xl text-xs font-inter text-forest-ink focus:outline-none focus:ring-2 focus:ring-forest-ink/20 focus:border-forest-ink/40 transition-all shadow-2xs"
                />
              </div>

              {/* Reset Filters Pill */}
              {(searchQuery || selectedVolume !== "all" || selectedStatus !== "all") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-2.5 rounded-xl bg-amber-500/10 text-amber-950 border border-amber-500/20 text-xs font-mono font-bold hover:bg-amber-500/20 transition-colors shrink-0"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Test list */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-forest-ink/50">
                <div className="w-10 h-10 border-4 border-forest-ink/20 border-t-forest-ink rounded-full animate-spin mb-4"></div>
                <p className="font-inter">Loading tests...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map(({ test, type }, index) => {
                  const attempt = attemptedMap[test.id];
                  const draftCount = savedDraftsMap[test.id];

                  return (
                    <motion.div
                      key={`${type}-${test.id}`}
                      variants={getCardVariant(index)}
                      className="group"
                      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Link href={`/tests/${type}/${test.id}`} className="block h-full">
                        <div
                          className={cn(
                            "bg-white border rounded-2xl p-6 h-full transition-all duration-300 relative overflow-hidden flex flex-col shadow-2xs hover:shadow-md",
                            attempt
                              ? "border-emerald-500/50 bg-gradient-to-b from-emerald-50/40 to-white"
                              : draftCount
                              ? "border-amber-500/50 bg-gradient-to-b from-amber-50/40 to-white"
                              : "border-pencil-gray/25 hover:border-forest-ink/30"
                          )}
                        >
                          <div className="flex justify-between items-start mb-4 gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-forest-ink/5 text-forest-ink text-[10px] font-mono font-bold uppercase tracking-wider block">
                                  {type.replace(/_/g, " ")}
                                </span>

                                {attempt && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                                    <CheckCircle2 size={11} className="text-emerald-700" />
                                    Attempted
                                  </span>
                                )}

                                {!attempt && draftCount && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                                    <Clock size={11} className="text-amber-700" />
                                    In Progress ({draftCount}/40)
                                  </span>
                                )}
                              </div>

                              <h4 className="font-semibold text-[17px] text-forest-ink font-inter leading-tight group-hover:text-terracotta transition-colors">
                                {test.title}
                              </h4>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 mb-5 text-[12px] font-roboto-mono text-forest-ink/60 mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{test.estimatedTime ? (test.estimatedTime.includes("min") ? test.estimatedTime : `${test.estimatedTime} mins`) : "60 mins"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>40 Qs</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              <span>{test.completions?.toLocaleString() || "1,200+"}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-pencil-gray/15 flex items-center justify-between mt-auto group-hover:border-forest-ink/10 transition-colors">
                            <span className={cn(
                              "text-[13px] font-semibold font-inter transition-colors",
                              attempt
                                ? "text-emerald-800"
                                : draftCount
                                ? "text-amber-900"
                                : "text-forest-ink/80 group-hover:text-forest-ink"
                            )}>
                              {attempt ? "Retake / Review Test" : draftCount ? "Resume Practice" : "Start Practice"}
                            </span>
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:rotate-[-45deg]",
                              attempt
                                ? "bg-emerald-700 text-white shadow-xs"
                                : draftCount
                                ? "bg-amber-600 text-white shadow-xs"
                                : "bg-whisper-gray group-hover:bg-forest-ink group-hover:text-white"
                            )}>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
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
