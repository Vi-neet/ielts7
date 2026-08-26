"use client";

import React from "react";
import { VirtualQuestion } from "@/lib/types/testEngine";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MultiChoiceRendererProps {
  question: VirtualQuestion;
  answers: Record<number, string>;
  onMultiChange: (qNums: number[], selectedVals: string[]) => void;
  disabled?: boolean;
}

export default function MultiChoiceRenderer({
  question,
  answers,
  onMultiChange,
  disabled = false,
}: MultiChoiceRendererProps) {
  const qNums = question.multiSelectQuestionNumbers || [question.questionNumber];
  const maxSelections = question.maxSelections || qNums.length;
  const options = question.options || [];

  // Get current selections across all question numbers in the multi-select group
  const currentSelections = qNums
    .map((n) => answers[n] || "")
    .filter(Boolean);

  const toggleOption = (optVal: string) => {
    if (disabled) return;
    let nextSelections = [...currentSelections];
    if (nextSelections.includes(optVal)) {
      nextSelections = nextSelections.filter((v) => v !== optVal);
    } else {
      if (nextSelections.length >= maxSelections) {
        nextSelections.shift();
      }
      nextSelections.push(optVal);
    }
    nextSelections.sort();
    onMultiChange(qNums, nextSelections);
  };

  const mainPrompt = question.groupPrompt || question.promptText;

  return (
    <div className="space-y-4">
      {mainPrompt && (
        <p className="text-base font-semibold text-forest-ink">
          {mainPrompt}
        </p>
      )}

      <div className="bg-purple-900/5 p-3.5 rounded-xl border border-purple-900/10">
        <p className="text-xs font-semibold text-purple-900/80">
          Select up to {maxSelections} options for Questions {qNums.join(" and ")}:
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {options.map((opt, idx) => {
          const isSelected = currentSelections.includes(opt.value);
          return (
            <button
              key={`${idx}-${opt.value}`}
              type="button"
              disabled={disabled}
              onClick={() => toggleOption(opt.value)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between",
                isSelected
                  ? "bg-purple-700 text-white border-purple-800 font-semibold shadow-sm"
                  : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/40 hover:bg-forest-ink/5",
                disabled && "opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-7 h-7 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 border",
                    isSelected
                      ? "bg-white text-purple-900 border-white"
                      : "bg-forest-ink/5 text-forest-ink border-forest-ink/20"
                  )}
                >
                  {opt.label}
                </span>
                {opt.text && opt.text !== opt.label && (
                  <span className="text-sm font-medium">
                    {opt.text}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center shrink-0",
                  isSelected
                    ? "border-white bg-white text-purple-700"
                    : "border-forest-ink/30 bg-transparent"
                )}
              >
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
