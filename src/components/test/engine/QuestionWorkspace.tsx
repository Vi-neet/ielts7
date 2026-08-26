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
import TextInputRenderer from "./TextInputRenderer";
import StructuredBlockRenderer from "./StructuredBlockRenderer";
import PracticeFeedbackCard from "./PracticeFeedbackCard";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionWorkspaceProps {
  question: VirtualQuestion;
  group: VirtualQuestionGroup;
  totalQuestions: number;
  answers: Record<number, string>;
  isBookmarked: boolean;
  checkedState?: { isCorrect: boolean; correctAnswer: string };
  mode: TestEngineMode;
  onSetAnswer: (qNum: number, val: string) => void;
  onMultiAnswerChange: (qNums: number[], selectedVals: string[]) => void;
  onToggleBookmark: (qNum: number) => void;
  onCheckAnswer: (qNum: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
}

export default function QuestionWorkspace({
  question,
  group,
  totalQuestions,
  answers,
  isBookmarked,
  checkedState,
  mode,
  onSetAnswer,
  onMultiAnswerChange,
  onToggleBookmark,
  onCheckAnswer,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
}: QuestionWorkspaceProps) {
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
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
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
                ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                : "bg-forest-ink/5 text-forest-ink/70 border-forest-ink/15 hover:bg-forest-ink/10 hover:text-forest-ink"
            )}
          >
            <Bookmark size={14} className={isBookmarked ? "fill-white" : ""} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>

        {/* 3. Controlled Question Input Renderer */}
        <div className="pt-2" key={question.questionNumber}>
          {question.type === "multiple_choice_multi" ? (
            <MultiChoiceRenderer
              question={question}
              answers={answers}
              onMultiChange={onMultiAnswerChange}
              disabled={Boolean(checkedState)}
            />
          ) : question.type.includes("completion") || question.type === "short_answer" ? (
            question.contextLabel ? (
              <StructuredBlockRenderer
                question={question}
                value={currentVal}
                onChange={(val) => onSetAnswer(question.questionNumber, val)}
                disabled={Boolean(checkedState)}
              />
            ) : (
              <TextInputRenderer
                question={question}
                value={currentVal}
                onChange={(val) => onSetAnswer(question.questionNumber, val)}
                disabled={Boolean(checkedState)}
              />
            )
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
        <Button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          variant="forestOutline"
          className="h-10 px-5 font-medium"
        >
          <ChevronLeft size={15} className="mr-0.5" /> Previous
        </Button>

        {isPractice && (
          <Button
            type="button"
            onClick={() => onCheckAnswer(question.questionNumber)}
            disabled={!currentVal.trim() || Boolean(checkedState)}
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
