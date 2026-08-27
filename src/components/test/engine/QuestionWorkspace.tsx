"use client";

import React, { useEffect } from "react";
import {
  VirtualQuestion,
  VirtualQuestionGroup,
  TestEngineMode,
} from "@/lib/types/testEngine";
import GroupContextBanner from "./GroupContextBanner";
import SingleQuestionRenderer from "./SingleQuestionRenderer";
import MultiChoiceRenderer from "./MultiChoiceRenderer";
import FillBlankRenderer from "./FillBlankRenderer";
import PracticeFeedbackCard from "./PracticeFeedbackCard";
import GroupQuestionWorkspace from "./GroupQuestionWorkspace";
import { Bookmark, LayoutGrid, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "group" | "single";

interface QuestionWorkspaceProps {
  question: VirtualQuestion;
  group: VirtualQuestionGroup;
  groupQuestions: VirtualQuestion[];
  totalQuestions: number;
  answers: Record<number, string>;
  bookmarks: Record<number, boolean>;
  checkedQuestions: Record<number, { isCorrect: boolean; correctAnswer: string }>;
  mode: TestEngineMode;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  onSetAnswer: (qNum: number, val: string) => void;
  onMultiAnswerChange: (qNums: number[], selectedVals: string[]) => void;
  onToggleBookmark: (qNum: number) => void;
  onCheckAnswer: (qNum: number) => void;
  onCheckGroupAnswers: (qNums: number[]) => void;
  onPrevious: () => void;
  onNext: () => void;
  onPreviousGroup: () => void;
  onNextGroup: () => void;
  canPrevious: boolean;
  canNext: boolean;
  canPreviousGroup: boolean;
  canNextGroup: boolean;
}

export default function QuestionWorkspace({
  question,
  group,
  groupQuestions,
  totalQuestions,
  answers,
  bookmarks,
  checkedQuestions,
  mode,
  viewMode,
  onToggleViewMode,
  onSetAnswer,
  onMultiAnswerChange,
  onToggleBookmark,
  onCheckAnswer,
  onCheckGroupAnswers,
  onPrevious,
  onNext,
  onPreviousGroup,
  onNextGroup,
  canPrevious,
  canNext,
  canPreviousGroup,
  canNextGroup,
}: QuestionWorkspaceProps) {
  const isBookmarked = Boolean(bookmarks[question.questionNumber]);
  const checkedState = checkedQuestions[question.questionNumber];
  const currentVal = answers[question.questionNumber] || "";
  const isPractice = mode === "practice";
  const isMultiAnswer = question.type === "multiple_choice_multi";
  const qNums = question.multiSelectQuestionNumbers || [question.questionNumber];
  const qNumberDisplay = isMultiAnswer && qNums.length > 1
    ? `${qNums[0]}–${qNums[qNums.length - 1]}`
    : `${question.questionNumber}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isButtonOrInput = activeEl && (activeEl.tagName === "BUTTON" || activeEl.tagName === "INPUT");
      
      if (e.key === "Enter" && isPractice && (currentVal.trim() || isMultiAnswer) && !checkedState && !isButtonOrInput) {
        e.preventDefault();
        e.stopPropagation();
        onCheckAnswer(question.questionNumber);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPractice, currentVal, isMultiAnswer, checkedState, question.questionNumber, onCheckAnswer]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* View Mode Switcher Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-forest-ink/15 shadow-2xs">
        <div className="flex items-center gap-2 pl-2">
          <span className="text-xs font-mono font-bold uppercase text-forest-ink/60 tracking-wider">
            View Mode
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#fcfaf5] p-1 rounded-xl border border-forest-ink/10">
          <button
            type="button"
            onClick={() => onToggleViewMode("group")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold font-inter transition-all flex items-center gap-1.5",
              viewMode === "group"
                ? "bg-forest-ink text-white shadow-xs"
                : "text-forest-ink/60 hover:text-forest-ink"
            )}
          >
            <LayoutGrid size={13} />
            Group View
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode("single")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold font-inter transition-all flex items-center gap-1.5",
              viewMode === "single"
                ? "bg-forest-ink text-white shadow-xs"
                : "text-forest-ink/60 hover:text-forest-ink"
            )}
          >
            <FileText size={13} />
            Single Question
          </button>
        </div>
      </div>

      {viewMode === "group" ? (
        <GroupQuestionWorkspace
          group={group}
          groupQuestions={groupQuestions}
          totalQuestions={totalQuestions}
          answers={answers}
          bookmarks={bookmarks}
          checkedQuestions={checkedQuestions}
          mode={mode}
          onSetAnswer={onSetAnswer}
          onMultiAnswerChange={onMultiAnswerChange}
          onToggleBookmark={onToggleBookmark}
          onCheckGroupAnswers={onCheckGroupAnswers}
          onPreviousGroup={onPreviousGroup}
          onNextGroup={onNextGroup}
          canPreviousGroup={canPreviousGroup}
          canNextGroup={canNextGroup}
        />
      ) : (
        <>
          {/* 1. Sticky Group Context Banner */}
          <GroupContextBanner group={group} />

          {/* 2. Active Question Card */}
          <div className="bg-white rounded-2xl border border-forest-ink/15 p-6 shadow-sm space-y-6">
            {/* Header: Question Number & Bookmark */}
            <div className="flex items-center justify-between border-b border-forest-ink/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-10 px-3 rounded-xl bg-forest-ink text-white font-extrabold font-bricolage text-base flex items-center justify-center shadow-sm shrink-0">
                  {qNumberDisplay}
                </span>
                <div>
                  <p className="text-[11px] font-mono tracking-wider text-forest-ink/50 uppercase">
                    {isMultiAnswer && qNums.length > 1
                      ? `Questions ${qNumberDisplay} of ${totalQuestions}`
                      : `Question ${question.questionNumber} of ${totalQuestions}`}
                  </p>
                  <h4 className="text-sm font-bold text-forest-ink">
                    {group.title}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleBookmark(question.questionNumber)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all",
                  isBookmarked
                    ? "bg-highlighter-yellow text-forest-ink border-forest-ink/30 font-bold shadow-xs"
                    : "bg-forest-ink/5 text-forest-ink/70 border-forest-ink/15 hover:bg-forest-ink/10 hover:text-forest-ink"
                )}
              >
                <Bookmark size={14} className={isBookmarked ? "fill-forest-ink" : ""} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>

            {/* 3. Controlled Question Input Renderer */}
            <div className="pt-2" key={question.questionNumber}>
              {question.type === "multiple_choice_multi" ? (
                <MultiChoiceRenderer
                  question={question}
                  answers={answers}
                  onChange={(selectedVals) => onMultiAnswerChange(qNums, selectedVals)}
                  disabled={Boolean(checkedState)}
                />
              ) : question.type.includes("completion") ||
                question.type === "sentence_completion" ||
                question.type === "short_answer" ? (
                <FillBlankRenderer
                  question={question}
                  value={currentVal}
                  onChange={(val) => onSetAnswer(question.questionNumber, val)}
                  disabled={Boolean(checkedState)}
                />
              ) : (
                <SingleQuestionRenderer
                  question={question}
                  value={currentVal}
                  onChange={(val) => onSetAnswer(question.questionNumber, val)}
                  disabled={Boolean(checkedState)}
                />
              )}
            </div>

            {/* 4. Practice Feedback Card */}
            {isPractice && checkedState && (
              <PracticeFeedbackCard
                isCorrect={checkedState.isCorrect}
                studentAnswer={
                  question.type === "multiple_choice_multi" && question.multiSelectQuestionNumbers
                    ? question.multiSelectQuestionNumbers
                        .map((n) => answers[n])
                        .filter(Boolean)
                        .sort()
                        .join(", ") || "(No answer)"
                    : currentVal
                }
                correctAnswer={
                  question.type === "multiple_choice_multi" && question.multiSelectQuestionNumbers
                    ? Array.from(
                        new Set(
                          question.multiSelectQuestionNumbers
                            .map((n) => checkedState.correctAnswer)
                            .flatMap((c) => c.split(/\s*or\s*|\s*\/\s*/i))
                        )
                      ).join(", ")
                    : checkedState.correctAnswer
                }
              />
            )}
          </div>

          {/* 5. Navigation & Check Answer Action Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!canPrevious}
              className={cn(
                "px-5 py-2.5 rounded-2xl font-bold font-inter text-xs flex items-center gap-2 border transition-all",
                canPrevious
                  ? "bg-white text-forest-ink border-forest-ink/20 hover:border-forest-ink hover:bg-forest-ink/5"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
              )}
            >
              Previous Question
            </button>

            {isPractice && (
              <button
                type="button"
                onClick={() => onCheckAnswer(question.questionNumber)}
                disabled={!currentVal.trim() || Boolean(checkedState)}
                className={cn(
                  "px-5 py-2.5 rounded-2xl font-bold font-inter text-xs transition-all shadow-xs shrink-0 flex items-center gap-2",
                  checkedState
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default"
                    : currentVal.trim()
                    ? "bg-forest-ink text-white hover:bg-forest-ink/90 active:scale-98"
                    : "bg-forest-ink/20 text-forest-ink/40 cursor-not-allowed"
                )}
              >
                {checkedState ? "Answer Checked" : "Check Answer"}
              </button>
            )}

            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className={cn(
                "px-5 py-2.5 rounded-2xl font-bold font-inter text-xs flex items-center gap-2 border transition-all",
                canNext
                  ? "bg-forest-ink text-white border-forest-ink hover:bg-forest-ink/90"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
              )}
            >
              Next Question
            </button>
          </div>
        </>
      )}
    </div>
  );
}
            variant="forestOutline"
            className="h-10 px-5 font-medium"
          >
            {checkedState ? "Answer Checked" : "Check Answer"}
          </Button>
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          variant="forest"
          className="h-10 px-5 font-medium"
        >
          Next <ChevronRight size={15} className="ml-0.5" />
        </Button>
      </div>
    </div>
  );
}
