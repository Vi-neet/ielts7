"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Headphones, RotateCcw, Sun, Moon } from "lucide-react";
import { formatCountdown } from "@/lib/examConfig";

interface TestHeaderProps {
  testName: string;
  testType: string;
  mode: "practice" | "exam";
  /** Seconds remaining — only relevant in exam mode */
  timeRemaining: number;
  answeredCount: number;
  totalQuestions: number;
  onSubmitClick?: () => void;
  onRestartClick?: () => void;
  onBackClick?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
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
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono font-bold text-sm transition-colors ${
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
  onSubmitClick,
  onRestartClick,
  onBackClick,
  isDarkMode = false,
  onToggleDarkMode,
}: TestHeaderProps) {
  const typeDisplay = typeLabel[testType] || testType.replace(/_/g, " ");
  const isListening = testType === "listening";
  const TypeIcon = isListening ? Headphones : BookOpen;
  const testDirHref = `/tests/${testType}`;

  return (
    <div
      className={`sticky top-0 z-20 backdrop-blur-sm border-b transition-colors duration-200 ${
        isDarkMode
          ? "bg-[#182615]/95 border-[#2c3f27] text-[#e8efe2] shadow-sm"
          : "bg-cream-paper/95 border-pencil-gray/15 text-forest-ink shadow-xs"
      }`}
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4 max-w-[1400px] mx-auto">

        {/* Left: Back + Test identity */}
        <div className="flex items-center gap-3 min-w-0">
          {onBackClick ? (
            <button
              type="button"
              onClick={onBackClick}
              className={`shrink-0 flex items-center gap-1.5 text-xs font-inter transition-colors font-semibold px-2.5 py-1 rounded-lg border ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/15"
                  : "bg-forest-ink/5 hover:bg-forest-ink/10 text-forest-ink border-forest-ink/15"
              }`}
              aria-label="Back to all tests"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <Link
              href={testDirHref}
              className={`shrink-0 flex items-center gap-1.5 text-xs font-inter transition-colors ${
                isDarkMode ? "text-white/60 hover:text-white" : "text-forest-ink/50 hover:text-forest-ink"
              }`}
              aria-label="Back to all tests"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Tests</span>
            </Link>
          )}

          <span className="opacity-40 hidden sm:inline" aria-hidden>·</span>

          <div className="flex items-center gap-2 min-w-0">
            <TypeIcon size={14} className={isDarkMode ? "text-white/60 shrink-0" : "text-forest-ink/50 shrink-0"} />
            <span className={`text-xs font-inter hidden md:inline shrink-0 ${isDarkMode ? "text-white/60" : "text-forest-ink/50"}`}>
              {typeDisplay}
            </span>
            <span className="opacity-40 hidden md:inline" aria-hidden>·</span>
            <span
              className={`text-sm font-bold font-bricolage truncate ${isDarkMode ? "text-white" : "text-forest-ink"}`}
              title={testName}
            >
              {testName}
            </span>
          </div>
        </div>

        {/* Center: Mode badge */}
        <div className="shrink-0">
          {mode === "exam" ? (
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-widest ${
              isDarkMode ? "bg-highlighter-yellow text-forest-ink" : "bg-forest-ink text-white"
            }`}>
              <Clock size={10} />
              Exam Mode
            </span>
          ) : (
            <span className={`inline-flex items-center px-2.5 py-[3px] rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-[0.12em] border ${
              isDarkMode ? "border-white/30 text-white/90 bg-white/5" : "border-forest-ink/40 text-forest-ink/80 bg-transparent"
            }`}>
              Practice
            </span>
          )}
        </div>

        {/* Right: Timer (exam), progress, dark mode, restart, and submit button */}
        <div className="shrink-0 flex items-center gap-2.5 sm:gap-3">
          {mode === "exam" && (
            <TimerDisplay seconds={timeRemaining} />
          )}

          <div
            className={`flex items-center gap-1.5 text-xs font-inter ${isDarkMode ? "text-white/70" : "text-forest-ink/55"}`}
            aria-label={`${answeredCount} of ${totalQuestions} questions answered`}
          >
            <span className={`font-bold ${isDarkMode ? "text-white" : "text-forest-ink"}`}>{answeredCount}</span>
            <span>/ {totalQuestions}</span>
            <span className="hidden sm:inline opacity-60">answered</span>
          </div>

          {/* Togglable Dark Mode Button */}
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-[#273a23] border-[#3e5937] text-highlighter-yellow hover:bg-[#324b2d]"
                  : "bg-white border-pencil-gray/25 text-forest-ink/75 hover:text-forest-ink hover:bg-forest-ink/5"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {onRestartClick && (
            <button
              type="button"
              onClick={onRestartClick}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isDarkMode ? "text-white/70 hover:text-white" : "text-forest-ink/60 hover:text-forest-ink"
              }`}
              title="Restart test (all progress will be lost)"
              aria-label="Restart test"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">Restart</span>
            </button>
          )}

          {onSubmitClick && (
            <button
              type="button"
              onClick={onSubmitClick}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-highlighter-yellow text-forest-ink hover:bg-highlighter-yellow/90 font-bold"
                  : "bg-forest-ink text-white hover:bg-forest-ink/90"
              }`}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
