"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timer, AlertTriangle, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeSelector from "@/components/test/ModeSelector";
import TestEngineRunner from "@/components/test/engine/TestEngineRunner";
import { TestContent } from "@/lib/types";
import {
  getExamDurationSeconds,
  formatDurationMinutes,
  READING_EXAM_DURATION_MINUTES,
  LISTENING_EXAM_DURATION_MINUTES,
} from "@/lib/examConfig";
import Link from "next/link";

interface TestPageClientProps {
  testId: string;
  testType: string;
  testName: string;
  testData: TestContent;
}

type ViewState = "selecting" | "exam-ready" | "running";

// ─── Exam Ready / Instructions Screen ────────────────────────────────────────
function ExamReadyScreen({
  testName,
  testType,
  durationMinutes,
  onStart,
  onBack,
}: {
  testName: string;
  testType: string;
  durationMinutes: number;
  onStart: () => void;
  onBack: () => void;
}) {
  const typeLabel: Record<string, string> = {
    academic_reading: "Academic Reading",
    general_reading: "General Reading",
    listening: "Listening",
  };
  const typeDisplay = typeLabel[testType] || testType.replace(/_/g, " ");
  const isListening = testType === "listening";

  const rules = isListening
    ? [
        `You have ${formatDurationMinutes(durationMinutes)} once you start.`,
        "The timer begins only after you click Start Exam.",
        "Audio loading and buffering time does not count toward your exam time.",
        "No correctness feedback is shown while taking the test.",
        "Answers are revealed in full once you submit or time runs out.",
        "You may navigate between questions and change answers before submitting.",
      ]
    : [
        `You have ${formatDurationMinutes(durationMinutes)} once you start.`,
        "The timer begins only after you click Start Exam.",
        "No correctness feedback is shown while taking the test.",
        "Answers are revealed in full once you submit or time runs out.",
        "You may navigate between questions and change answers before submitting.",
        "The passage remains available during the exam.",
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-lg w-full bg-white rounded-2xl border border-pencil-gray/20 shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-forest-ink flex items-center justify-center shrink-0">
          <Timer size={20} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-forest-ink/40">
            {typeDisplay} · Exam Mode
          </p>
          <h1 className="text-lg font-extrabold font-bricolage text-forest-ink leading-tight">
            {testName}
          </h1>
        </div>
      </div>

      {/* Duration pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-ink/5 border border-forest-ink/10 mb-6">
        <Timer size={14} className="text-forest-ink/60" />
        <span className="text-sm font-semibold font-inter text-forest-ink">
          {formatDurationMinutes(durationMinutes)}
        </span>
      </div>

      {/* Rules */}
      <div className="mb-7">
        <p className="text-xs font-mono uppercase tracking-wider text-forest-ink/40 mb-3">
          Before you begin
        </p>
        <ul className="space-y-2.5">
          {rules.map((rule, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm font-inter text-forest-ink/75"
            >
              <AlertTriangle
                size={13}
                className="text-forest-ink/30 mt-0.5 shrink-0"
              />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onStart}
          variant="forest"
          className="flex-1 h-11 font-semibold shadow-sm"
          aria-label={`Start ${formatDurationMinutes(durationMinutes)} exam`}
        >
          Start Exam <ChevronRight size={16} className="ml-1" />
        </Button>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 text-sm font-inter text-forest-ink/50 hover:text-forest-ink transition-colors px-4 py-2"
          aria-label="Back to mode selection"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Client Wrapper ──────────────────────────────────────────────────────
export default function TestPageClient({
  testId,
  testType,
  testName,
  testData,
}: TestPageClientProps) {
  const [viewState, setViewState] = useState<ViewState>("selecting");
  const [mode, setMode] = useState<"practice" | "exam">("practice");

  const isListening = testType === "listening";
  const examDurationMinutes = isListening
    ? LISTENING_EXAM_DURATION_MINUTES
    : READING_EXAM_DURATION_MINUTES;
  const examDurationSeconds = getExamDurationSeconds(testType);

  const handleSelectMode = (selectedMode: "practice" | "exam") => {
    setMode(selectedMode);
    if (selectedMode === "practice") {
      setViewState("running");
    } else {
      setViewState("exam-ready");
    }
  };

  // ── Mode selection screen ──
  if (viewState === "selecting") {
    return (
      <div className="container mx-auto max-w-4xl pt-10 pb-16 px-4 bg-cream-paper min-h-[calc(100vh-72px)]">
        {/* Back to test directory */}
        <div className="mb-8">
          <Link
            href={`/tests/${testType}`}
            className="inline-flex items-center gap-1.5 text-xs font-inter text-forest-ink/50 hover:text-forest-ink transition-colors"
          >
            <ArrowLeft size={14} />
            All {testType.replace(/_/g, " ")} tests
          </Link>
        </div>
        <ModeSelector
          testName={testName}
          testType={testType}
          examDurationMinutes={examDurationMinutes}
          onSelectMode={handleSelectMode}
        />
      </div>
    );
  }

  // ── Exam ready / instructions screen ──
  if (viewState === "exam-ready") {
    return (
      <div className="bg-cream-paper min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <ExamReadyScreen
          testName={testName}
          testType={testType}
          durationMinutes={examDurationMinutes}
          onStart={() => setViewState("running")}
          onBack={() => setViewState("selecting")}
        />
      </div>
    );
  }

  // ── Active test ──
  return (
    <div className="bg-cream-paper min-h-[calc(100vh-72px)]">
      <TestEngineRunner
        testId={testId}
        testType={testType}
        testName={testName}
        passages={testData.passages}
        questions={testData.questions}
        answerKey={testData.answers || {}}
        mode={mode}
        examDurationSeconds={examDurationSeconds}
      />
    </div>
  );
}
