"use client";

import React from "react";
import { VirtualQuestion, VirtualQuestionGroup } from "@/lib/types/testEngine";
import { CheckCircle2, XCircle, Sparkles, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import SingleQuestionRenderer from "./SingleQuestionRenderer";
import MultiChoiceRenderer from "./MultiChoiceRenderer";
import FillBlankRenderer from "./FillBlankRenderer";
import PracticeFeedbackCard from "./PracticeFeedbackCard";

interface GroupQuestionWorkspaceProps {
  group: VirtualQuestionGroup;
  groupQuestions: VirtualQuestion[];
  totalQuestions: number;
  answers: Record<number, string>;
  bookmarks: Record<number, boolean>;
  checkedQuestions: Record<number, { isCorrect: boolean; correctAnswer: string }>;
  mode: "exam" | "practice";
  onSetAnswer: (qNum: number, val: string) => void;
  onMultiAnswerChange: (qNums: number[], selectedValues: string[]) => void;
  onToggleBookmark: (qNum: number) => void;
  onCheckGroupAnswers: (qNums: number[]) => void;
  onPreviousGroup: () => void;
  onNextGroup: () => void;
  canPreviousGroup: boolean;
  canNextGroup: boolean;
}

export default function GroupQuestionWorkspace({
  group,
  groupQuestions,
  totalQuestions,
  answers,
  bookmarks,
  checkedQuestions,
  mode,
  onSetAnswer,
  onMultiAnswerChange,
  onToggleBookmark,
  onCheckGroupAnswers,
  onPreviousGroup,
  onNextGroup,
  canPreviousGroup,
  canNextGroup,
}: GroupQuestionWorkspaceProps) {
  const isPractice = mode === "practice";
  const [startNum, endNum] = group.range;
  const qNums = groupQuestions.map((q) => q.questionNumber);

  // Check if all questions in group are checked
  const isGroupChecked = qNums.every((n) => Boolean(checkedQuestions[n]));

  // Calculate correct answers count for group if checked
  const correctCount = qNums.filter((n) => checkedQuestions[n]?.isCorrect).length;

  const handleCheckGroup = () => {
    if (isPractice && !isGroupChecked) {
      onCheckGroupAnswers(qNums);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* 1. Group Header & Instructions Banner (docs/DESIGN.md) */}
      <div className="bg-white rounded-3xl border border-forest-ink/15 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-ink/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-10 px-3.5 rounded-2xl bg-forest-ink text-white font-extrabold font-bricolage text-base flex items-center justify-center shadow-xs shrink-0">
              Questions {startNum}–{endNum}
            </span>
            <div>
              <p className="text-[11px] font-mono tracking-wider text-forest-ink/50 uppercase">
                Section Group • Questions {startNum} to {endNum} of {totalQuestions}
              </p>
              <h3 className="text-base font-extrabold font-bricolage text-forest-ink leading-tight">
                {group.title}
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-ink/5 border border-forest-ink/10 text-xs font-mono font-bold text-forest-ink">
            <Sparkles size={13} className="text-forest-ink/70" /> Category View
          </div>
        </div>

        {/* Group Instructions */}
        {group.instructions && (
          <div className="bg-[#fcfaf5] rounded-2xl p-4 border border-forest-ink/10 text-sm font-medium font-inter text-forest-ink leading-relaxed">
            {group.instructions}
          </div>
        )}

        {/* Shared Reference Box (List of Headings / Features / Word Bank) */}
        {group.referenceBox && (
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              {group.referenceBox.title || "Reference List"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-forest-ink">
              {group.referenceBox.items.map((item, idx) => (
                <div
                  key={`${idx}-${item.label}`}
                  className="flex gap-2 items-start bg-white/90 p-2.5 rounded-xl border border-amber-900/10 shadow-2xs"
                >
                  <span className="font-mono font-bold text-amber-900 shrink-0 bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">
                    {item.label}
                  </span>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Vertical Question Stack */}
      <div className="space-y-6">
        {groupQuestions.map((qObj) => {
          const qNum = qObj.questionNumber;
          const currentVal = answers[qNum] || "";
          const checked = checkedQuestions[qNum];
          const isBookmarked = Boolean(bookmarks[qNum]);

          return (
            <div
              key={qNum}
              id={`question-card-${qNum}`}
              className={cn(
                "bg-white rounded-3xl border p-6 shadow-xs space-y-5 transition-all duration-200",
                checked
                  ? checked.isCorrect
                    ? "border-emerald-300 bg-emerald-50/20"
                    : "border-rose-300 bg-rose-50/20"
                  : "border-forest-ink/15 hover:border-forest-ink/30"
              )}
            >
              {/* Card Header: Q Number & Bookmark */}
              <div className="flex items-center justify-between border-b border-forest-ink/10 pb-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-9 h-9 rounded-xl font-extrabold font-bricolage text-base flex items-center justify-center shadow-xs shrink-0",
                      checked
                        ? checked.isCorrect
                          ? "bg-emerald-700 text-white"
                          : "bg-rose-600 text-white"
                        : "bg-forest-ink text-white"
                    )}
                  >
                    {qNum}
                  </span>
                  <div>
                    <p className="text-[11px] font-mono tracking-wider text-forest-ink/50 uppercase">
                      Question {qNum}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(qNum)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all",
                    isBookmarked
                      ? "bg-highlighter-yellow text-forest-ink border-forest-ink/30 font-bold shadow-xs"
                      : "bg-white text-forest-ink/70 border-forest-ink/15 hover:border-forest-ink/30 hover:bg-forest-ink/5"
                  )}
                >
                  <Bookmark size={13} className={isBookmarked ? "fill-forest-ink" : ""} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
              </div>

              {/* Question Renderer Body */}
              {qObj.type === "multiple_choice_multi" ? (
                <MultiChoiceRenderer
                  question={qObj}
                  answers={answers}
                  onChange={(selectedValues) =>
                    onMultiAnswerChange(qObj.multiSelectQuestionNumbers || [qNum], selectedValues)
                  }
                  disabled={Boolean(checked)}
                />
              ) : qObj.type.includes("completion") ||
                qObj.type === "sentence_completion" ||
                qObj.type === "short_answer" ? (
                <FillBlankRenderer
                  question={qObj}
                  value={currentVal}
                  onChange={(val) => onSetAnswer(qNum, val)}
                  disabled={Boolean(checked)}
                />
              ) : (
                <SingleQuestionRenderer
                  question={qObj}
                  value={currentVal}
                  onChange={(val) => onSetAnswer(qNum, val)}
                  disabled={Boolean(checked)}
                />
              )}

              {/* Practice Feedback for individual question */}
              {isPractice && checked && (
                <PracticeFeedbackCard
                  isCorrect={checked.isCorrect}
                  studentAnswer={currentVal}
                  correctAnswer={checked.correctAnswer}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Group Action Footer (Practice Mode Check & Section Navigation) */}
      <div className="bg-white rounded-3xl border border-forest-ink/15 p-5 shadow-sm space-y-4">
        {/* Practice Mode Check Button */}
        {isPractice && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-forest-ink/10 pb-4">
            <div>
              <p className="text-xs font-bold text-forest-ink font-inter">
                {isGroupChecked
                  ? `Section Evaluated: ${correctCount} / ${qNums.length} Correct`
                  : `Evaluate Section Answers (Questions ${startNum}–${endNum})`}
              </p>
              <p className="text-[11px] font-mono text-forest-ink/60">
                {isGroupChecked
                  ? "Answers checked against official IELTS key."
                  : "Check all responses in this section."}
              </p>
            </div>

            <button
              type="button"
              disabled={isGroupChecked}
              onClick={handleCheckGroup}
              className={cn(
                "px-6 py-2.5 rounded-2xl font-bold font-inter text-xs transition-all shadow-xs shrink-0 flex items-center gap-2",
                isGroupChecked
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default"
                  : "bg-forest-ink text-white hover:bg-forest-ink/90 active:scale-98"
              )}
            >
              {isGroupChecked ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  Section Answers Checked
                </>
              ) : (
                <>
                  <Sparkles size={15} className="text-highlighter-yellow" />
                  Check Section Answers
                </>
              )}
            </button>
          </div>
        )}

        {/* Section Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="button"
            disabled={!canPreviousGroup}
            onClick={onPreviousGroup}
            className={cn(
              "px-4 py-2.5 rounded-2xl font-bold font-inter text-xs flex items-center gap-2 border transition-all",
              canPreviousGroup
                ? "bg-white text-forest-ink border-forest-ink/20 hover:border-forest-ink hover:bg-forest-ink/5"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
            )}
          >
            <ArrowLeft size={15} />
            Previous Section
          </button>

          <span className="text-xs font-mono font-bold text-forest-ink/60 hidden sm:inline">
            Questions {startNum}–{endNum}
          </span>

          <button
            type="button"
            disabled={!canNextGroup}
            onClick={onNextGroup}
            className={cn(
              "px-5 py-2.5 rounded-2xl font-bold font-inter text-xs flex items-center gap-2 border transition-all",
              canNextGroup
                ? "bg-forest-ink text-white border-forest-ink hover:bg-forest-ink/90"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
            )}
          >
            Next Section
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
