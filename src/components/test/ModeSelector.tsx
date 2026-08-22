"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Timer, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDurationMinutes } from "@/lib/examConfig";

interface ModeSelectorProps {
  testName: string;
  testType: string;
  examDurationMinutes: number;
  onSelectMode: (mode: "practice" | "exam") => void;
}

const typeLabel: Record<string, string> = {
  academic_reading: "Academic Reading",
  general_reading: "General Reading",
  listening: "Listening",
};

export default function ModeSelector({
  testName,
  testType,
  examDurationMinutes,
  onSelectMode,
}: ModeSelectorProps) {
  const typeDisplay = typeLabel[testType] || testType.replace(/_/g, " ");

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-forest-ink/40 mb-2">
          {typeDisplay}
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight mb-3">
          {testName}
        </h1>
        <p className="font-inter text-forest-ink/60 text-sm max-w-sm mx-auto">
          Choose how you&apos;d like to take this test. You can retake it in the other mode anytime.
        </p>
      </motion.div>

      {/* Mode cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Practice Mode Card */}
        <motion.div
          variants={cardVariants}
          className="group relative bg-white rounded-2xl border border-pencil-gray/20 shadow-sm p-7 flex flex-col hover:shadow-md hover:border-forest-ink/20 transition-all duration-200 cursor-pointer"
          onClick={() => onSelectMode("practice")}
          role="button"
          tabIndex={0}
          aria-label="Start Practice Mode"
          onKeyDown={(e) => e.key === "Enter" && onSelectMode("practice")}
        >
          {/* Icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-sticky-note-mint/40 border border-sticky-note-mint flex items-center justify-center mb-5">
            <BookOpen size={22} className="text-forest-ink" />
          </div>

          <h2 className="text-xl font-extrabold font-bricolage text-forest-ink mb-1">
            Practice Mode
          </h2>
          <p className="text-sm font-inter text-forest-ink/55 mb-5">
            Learn as you go with per-question feedback
          </p>

          <ul className="space-y-2.5 flex-1 mb-7">
            {[
              "No timer — work at your own pace",
              "Check individual answers with feedback",
              "See the correct answer after checking",
              "Full review after completing the test",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-inter text-forest-ink/75">
                <CheckCircle2 size={15} className="text-forest-ink/50 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Button
            variant="forestOutline"
            className="w-full h-11 font-semibold group-hover:bg-forest-ink group-hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); onSelectMode("practice"); }}
            aria-label="Start Practice Mode"
          >
            Start Practice <ChevronRight size={16} className="ml-1" />
          </Button>
        </motion.div>

        {/* Exam Mode Card */}
        <motion.div
          variants={cardVariants}
          className="group relative bg-forest-ink rounded-2xl border border-forest-ink shadow-sm p-7 flex flex-col hover:shadow-lg hover:opacity-95 transition-all duration-200 cursor-pointer"
          onClick={() => onSelectMode("exam")}
          role="button"
          tabIndex={0}
          aria-label="Start Exam Mode"
          onKeyDown={(e) => e.key === "Enter" && onSelectMode("exam")}
        >
          {/* Icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
            <Timer size={22} className="text-white" />
          </div>

          <h2 className="text-xl font-extrabold font-bricolage text-white mb-1">
            Exam Mode
          </h2>
          <p className="text-sm font-inter text-white/60 mb-5">
            Simulate real IELTS exam conditions
          </p>

          <ul className="space-y-2.5 flex-1 mb-7">
            {[
              `Timed: ${formatDurationMinutes(examDurationMinutes)}`,
              "No correctness feedback until complete",
              "Answers reviewed after submission",
              "Score, band estimate & full breakdown",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-inter text-white/80">
                <Clock size={15} className="text-white/50 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="w-full h-11 font-semibold border-white/30 bg-white/10 text-white hover:bg-white hover:text-forest-ink transition-colors"
            onClick={(e) => { e.stopPropagation(); onSelectMode("exam"); }}
            aria-label="Start Exam Mode"
          >
            Start Exam <ChevronRight size={16} className="ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
