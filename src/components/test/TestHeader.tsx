"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Headphones } from "lucide-react";
import { formatCountdown } from "@/lib/examConfig";

interface TestHeaderProps {
  testName: string;
  testType: string;
  mode: "practice" | "exam";
  /** Seconds remaining — only relevant in exam mode */
  timeRemaining: number;
  answeredCount: number;
  totalQuestions: number;
}

const typeLabel: Record<string, string> = {
  academic_reading: "Academic Reading",
  general_reading: "General Reading",
  listening: "Listening",
};

function TimerDisplay({ seconds }: { seconds: number }) {
  const isWarning = seconds <= 300; // <= 5 min
  const isDanger = seconds <= 60;   // <= 1 min

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono font-bold text-sm transition-colors ${
        isDanger
          ? "bg-[#fcd2c2]/30 border-[#f8b195]/60 text-[#cb5521]"
          : isWarning
          ? "bg-[#ffe95c]/20 border-[#ffe95c]/50 text-[#7a6000]"
          : "bg-white border-pencil-gray/25 text-forest-ink"
      }`}
      aria-live="polite"
      aria-label={`${Math.floor(seconds / 60)} minutes and ${seconds % 60} seconds remaining`}
      role="timer"
    >
      <Clock
        size={13}
        className={isDanger ? "text-[#cb5521]" : isWarning ? "text-[#7a6000]" : "text-forest-ink/50"}
      />
      {formatCountdown(seconds)}
    </div>
  );
}

export default function TestHeader({
  testName,
  testType,
  mode,
  timeRemaining,
  answeredCount,
  totalQuestions,
}: TestHeaderProps) {
  const typeDisplay = typeLabel[testType] || testType.replace(/_/g, " ");
  const isListening = testType === "listening";
  const TypeIcon = isListening ? Headphones : BookOpen;
  const testDirHref = `/tests/${testType}`;

  return (
    <div className="sticky top-0 z-20 bg-cream-paper/95 backdrop-blur-sm border-b border-pencil-gray/15 shadow-xs">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4 max-w-[1400px] mx-auto">

        {/* Left: Back + Test identity */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={testDirHref}
            className="shrink-0 flex items-center gap-1.5 text-xs font-inter text-forest-ink/50 hover:text-forest-ink transition-colors"
            aria-label="Back to all tests"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Tests</span>
          </Link>

          <span className="text-pencil-gray/40 hidden sm:inline" aria-hidden>·</span>

          <div className="flex items-center gap-2 min-w-0">
            <TypeIcon size={14} className="text-forest-ink/50 shrink-0" />
            <span className="text-xs font-inter text-forest-ink/50 hidden md:inline shrink-0">
              {typeDisplay}
            </span>
            <span className="text-pencil-gray/40 hidden md:inline" aria-hidden>·</span>
            <span
              className="text-sm font-bold font-bricolage text-forest-ink truncate"
              title={testName}
            >
              {testName}
            </span>
          </div>
        </div>

        {/* Center: Mode badge */}
        <div className="shrink-0">
          {mode === "exam" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-forest-ink text-white">
              <Clock size={10} />
              Exam Mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-sticky-note-mint/50 border border-sticky-note-mint text-forest-ink">
              Practice
            </span>
          )}
        </div>

        {/* Right: Timer (exam) or progress (practice) */}
        <div className="shrink-0 flex items-center gap-3">
          {mode === "exam" && (
            <TimerDisplay seconds={timeRemaining} />
          )}

          <div
            className="flex items-center gap-1.5 text-xs font-inter text-forest-ink/55"
            aria-label={`${answeredCount} of ${totalQuestions} questions answered`}
          >
            <span className="font-bold text-forest-ink">{answeredCount}</span>
            <span>/ {totalQuestions}</span>
            <span className="hidden sm:inline text-forest-ink/35">answered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
