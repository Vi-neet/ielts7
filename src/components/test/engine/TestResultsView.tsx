"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { VirtualTestIndex } from "@/lib/types/testEngine";
import { GradeResult } from "@/lib/scoring";
import {
  RotateCcw,
  ClipboardList,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  BarChart3,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestResultsViewProps {
  testId: string;
  testType: string;
  testName: string;
  testIndex: VirtualTestIndex;
  results: GradeResult;
  submittedAt?: string | null;
  dbError?: string | null;
  passages?: React.ReactNode | string | null;
}

// Convert raw score to estimated IELTS Band Score
function calculateBandScore(score: number, testType: string): string {
  const isAcademic = testType === "academic_reading";
  const isListening = testType === "listening";

  if (isListening) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 32) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 20) return "5.5";
    if (score >= 16) return "5.0";
    if (score >= 13) return "4.5";
    if (score >= 10) return "4.0";
    return "3.5";
  }

  if (isAcademic) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 33) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 19) return "5.5";
    if (score >= 15) return "5.0";
    if (score >= 13) return "4.5";
    if (score >= 10) return "4.0";
    return "3.5";
  }

  // General Reading
  if (score >= 40) return "9.0";
  if (score >= 39) return "8.5";
  if (score >= 37) return "8.0";
  if (score >= 36) return "7.5";
  if (score >= 30) return "6.0";
  if (score >= 27) return "5.5";
  if (score >= 23) return "5.0";
  if (score >= 19) return "4.5";
  if (score >= 15) return "4.0";
  return "3.5";
}

// Stagger & Motion Variants per DESIGN.md
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function TestResultsView({
  testId,
  testType,
  testName,
  testIndex,
  results,
  submittedAt,
  dbError,
  passages,
}: TestResultsViewProps) {
  const [reviewFilter, setReviewFilter] = useState<
    "all" | "correct" | "incorrect" | "unanswered"
  >("all");

  const [passagesCollapsed, setPassagesCollapsed] = useState(true);

  const correctCount = results.score;
  const incorrectCount = Object.values(results.perQuestion).filter(
    (q) => !q.correct && q.studentAnswer?.trim()
  ).length;
  const unansweredCount = results.total - (correctCount + incorrectCount);

  const correctPct = Math.round((correctCount / results.total) * 100);
  const incorrectPct = Math.round((incorrectCount / results.total) * 100);
  const unansweredPct = Math.round((unansweredCount / results.total) * 100);

  const testDirHref = `/tests/${testType}`;
  const testPracticeHref = `/tests/${testType}/${testId}`;

  return (
    <div className="min-h-screen bg-cream-paper font-inter pb-20">
      {/* 1. Page Sub-Header / Breadcrumb Navigation */}
      <div className="border-b border-pencil-gray/20 bg-cream-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href={testDirHref}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-forest-ink/60 hover:text-forest-ink transition-colors"
          >
            <ArrowLeft size={14} /> Back to Tests
          </Link>
        </div>
      </div>

      {/* 2. Hero Performance Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-forest-ink text-cream-paper py-12 px-4 sm:px-6 lg:px-8 shadow-md"
      >
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-white/10 text-white/90 text-[10px] font-mono uppercase tracking-[0.15em] border border-white/15"
              >
                Official Performance Report
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-bricolage text-cream-paper tracking-tight leading-tight"
              >
                {testName}
              </motion.h1>
              {submittedAt && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-xs font-mono text-cream-paper/60"
                >
                  Completed on {submittedAt}
                </motion.p>
              )}
            </div>

            {/* Score & Estimated Band Highlights */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-6 shrink-0 bg-white/5 border border-white/12 p-5 rounded-xl backdrop-blur-xs"
            >
              <div className="px-4 py-1 text-center border-r border-white/15">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cream-paper/60 block mb-0.5">
                  Raw Score
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold font-bricolage text-cream-paper">
                  {results.score}{" "}
                  <span className="text-base font-normal text-cream-paper/50">
                    / {results.total}
                  </span>
                </span>
              </div>

              <div className="px-4 py-1 text-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-highlighter-yellow/90 block mb-0.5">
                  Estimated Band
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold font-bricolage text-highlighter-yellow">
                  {calculateBandScore(results.score, testType)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3. Main Content Container (Wide max-w-6xl for desktop breathing room) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10"
      >
        {/* Performance Breakdown Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.12em] text-forest-ink/70 flex items-center gap-2">
              <BarChart3 size={15} /> Performance Breakdown
            </h2>
          </div>

          <motion.div
            variants={cardVariants}
            className="p-6 sm:p-8 rounded-xl border border-forest-ink/15 bg-white space-y-6 shadow-xs"
          >
            {/* Progress Segment Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-whisper-gray border border-pencil-gray/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${correctPct}%` }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="bg-forest-ink"
                title={`Correct: ${correctCount} (${correctPct}%)`}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${incorrectPct}%` }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="bg-[#e65c5c]"
                title={`Incorrect: ${incorrectCount} (${incorrectPct}%)`}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${unansweredPct}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="bg-pencil-gray/40"
                title={`Unanswered: ${unansweredCount} (${unansweredPct}%)`}
              />
            </div>

            {/* Stats Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-lg bg-sticky-note-mint/40 border border-forest-ink/20 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-forest-ink shrink-0" />
                  <span className="font-bold text-forest-ink text-sm">Correct</span>
                </div>
                <span className="font-bold text-forest-ink font-mono text-sm">
                  {correctCount} ({correctPct}%)
                </span>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#e65c5c] shrink-0" />
                  <span className="font-bold text-rose-950 text-sm">Incorrect</span>
                </div>
                <span className="font-bold text-rose-900 font-mono text-sm">
                  {incorrectCount} ({incorrectPct}%)
                </span>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-lg bg-whisper-gray border border-pencil-gray/30 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-pencil-gray shrink-0" />
                  <span className="font-bold text-forest-ink/75 text-sm">Unanswered</span>
                </div>
                <span className="font-bold text-forest-ink/70 font-mono text-sm">
                  {unansweredCount} ({unansweredPct}%)
                </span>
              </motion.div>
            </div>
          </motion.div>

          {dbError && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0 text-amber-600" />
              <span>Result saved locally. Cloud sync pending ({dbError}).</span>
            </div>
          )}
        </motion.div>

        {/* 4. Collapsible Reading Passages Section */}
        {passages && (
          <motion.div variants={itemVariants} className="space-y-3">
            <button
              type="button"
              onClick={() => setPassagesCollapsed(!passagesCollapsed)}
              className="w-full px-6 py-3.5 rounded-xl border border-forest-ink/20 bg-white flex items-center justify-between text-xs font-mono font-bold text-forest-ink hover:bg-forest-ink/5 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2.5 text-sm">
                <BookOpen size={17} className="text-forest-ink/70" />
                <span>Reading Passage(s) Text</span>
              </div>
              <div className="flex items-center gap-1.5 text-forest-ink/60">
                <span className="text-xs font-normal">
                  {passagesCollapsed ? "Show Passage" : "Hide Passage"}
                </span>
                {passagesCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
            </button>

            <AnimatePresence>
              {!passagesCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 sm:p-8 rounded-xl border border-forest-ink/15 bg-white max-h-[550px] overflow-y-auto space-y-4 font-inter text-forest-ink leading-relaxed text-sm sm:text-base shadow-xs">
                    {typeof passages === "string" ? (
                      <div dangerouslySetInnerHTML={{ __html: passages }} />
                    ) : (
                      passages
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 5. Answer Key Review Section */}
        <motion.div variants={itemVariants} className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-ink/15 pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.12em] text-forest-ink flex items-center gap-2">
              <ClipboardList size={15} /> Answer Key Review ({results.total})
            </h2>

            {/* Filter Buttons Selector (Homepage pill design pattern) */}
            <div className="p-1 rounded-full bg-white border border-pencil-gray/25 shadow-xs inline-flex flex-wrap items-center">
              {[
                { id: "all", label: `All (${results.total})` },
                { id: "correct", label: `Correct (${correctCount})` },
                { id: "incorrect", label: `Incorrect (${incorrectCount})` },
                { id: "unanswered", label: `Unanswered (${unansweredCount})` },
              ].map((tab) => {
                const isActive = reviewFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewFilter(tab.id as any)}
                    className={cn(
                      "px-4 py-2 rounded-full font-inter text-xs font-semibold transition-all duration-200 relative z-10",
                      isActive
                        ? "text-cream-paper"
                        : "text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeResultFilterTab"
                        className="absolute inset-0 bg-forest-ink rounded-full shadow-xs -z-10"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Review List Boxes with lighter yellow fill & staggered animation */}
          <div className="space-y-4">
            {Array.from({ length: results.total }, (_, i) => i + 1)
              .filter((qNum) => {
                const item = results.perQuestion[qNum];
                if (!item) return false;
                if (reviewFilter === "correct") return item.correct;
                if (reviewFilter === "incorrect")
                  return !item.correct && Boolean(item.studentAnswer?.trim());
                if (reviewFilter === "unanswered")
                  return !Boolean(item.studentAnswer?.trim());
                return true;
              })
              .map((qNum, idx) => {
                const item = results.perQuestion[qNum];
                const qObj = testIndex.questions[qNum];
                const isAns = Boolean(item?.studentAnswer?.trim());
                const formattedNum = String(qNum).padStart(2, "0");

                return (
                  <motion.div
                    key={qNum}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.025, 0.3) }}
                    className="p-6 rounded-2xl border border-amber-300/40 bg-[#fffdf0] space-y-4 text-xs shadow-2xs"
                  >
                    {/* Top Row: Badge + Question Prompt Text */}
                    <div className="flex items-start gap-3.5">
                      <span className="px-3 py-0.5 rounded-full bg-forest-ink text-white font-mono text-xs sm:text-sm font-bold shrink-0 mt-0.5 shadow-2xs">
                        {formattedNum}
                      </span>
                      {qObj?.promptText && (
                        <p className="text-forest-ink/90 font-medium leading-relaxed text-sm sm:text-base flex-1">
                          {qObj.promptText}
                        </p>
                      )}
                    </div>

                    {/* Bottom Row: YOUR ANSWER & CORRECT ANSWER with divider */}
                    <div className="border-t border-forest-ink/10 pt-3.5 flex flex-wrap items-center justify-between gap-4 font-mono">
                      <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                        {/* Your Answer */}
                        <div className="space-y-0.5">
                          <span className="text-[11px] uppercase tracking-wider text-forest-ink/50 block font-bold">
                            YOUR ANSWER:
                          </span>
                          <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base">
                            {item?.correct ? (
                              <span className="text-emerald-700 flex items-center gap-1.5">
                                <Check size={16} strokeWidth={3} /> {item.studentAnswer}
                              </span>
                            ) : isAns ? (
                              <span className="text-rose-700 flex items-center gap-1.5">
                                <X size={16} strokeWidth={3} /> {item.studentAnswer}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-normal text-sm">
                                — —
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Correct Answer */}
                        <div className="space-y-0.5">
                          <span className="text-[11px] uppercase tracking-wider text-forest-ink/50 block font-bold">
                            CORRECT ANSWER:
                          </span>
                          <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base text-emerald-700">
                            <Check size={16} strokeWidth={3} /> {item?.correctAnswer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* 6. Bottom Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between pt-6 border-t border-forest-ink/15"
        >
          <Link href={testPracticeHref}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="px-6 py-3 rounded-[8px] bg-forest-ink text-white text-xs sm:text-sm font-semibold hover:bg-forest-ink/90 transition-colors flex items-center gap-2 shadow-xs"
            >
              <RotateCcw size={16} /> Retake Test
            </motion.button>
          </Link>

          <Link href={testDirHref}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="px-6 py-3 rounded-[8px] border border-forest-ink/30 text-forest-ink text-xs sm:text-sm font-semibold hover:bg-forest-ink/5 transition-colors flex items-center gap-2"
            >
              <BookOpen size={16} /> All Practice Tests
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
