"use client";

import React from "react";
import { VirtualQuestion } from "@/lib/types/testEngine";
import { cn } from "@/lib/utils";

interface SingleQuestionRendererProps {
  question: VirtualQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function SingleQuestionRenderer({
  question,
  value,
  onChange,
  disabled = false,
}: SingleQuestionRendererProps) {
  const options = question.options || [];
  const refBox = question.referenceBox;

  return (
    <div className="space-y-4">
      {/* Reference Box (List of Headings / Researchers / Sentence Endings) */}
      {refBox && (
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900/80">
            {refBox.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-forest-ink">
            {refBox.items.map((item, idx) => (
              <div key={`${idx}-${item.label}`} className="flex gap-2 items-start bg-white/70 p-2 rounded-lg border border-amber-900/10">
                <span className="font-mono font-bold text-amber-900 shrink-0">
                  {item.label}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Question Prompt */}
      {question.promptText && (
        <p className="text-base font-semibold text-forest-ink">
          {question.promptText}
        </p>
      )}

      {/* Controlled Options */}
      <div className="grid grid-cols-1 gap-2.5">
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={`${idx}-${opt.value}`}
              type="button"
              disabled={disabled}
              onClick={() => onChange(isSelected ? "" : opt.value)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3",
                isSelected
                  ? "bg-forest-ink text-white border-forest-ink font-semibold shadow-sm"
                  : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/40 hover:bg-forest-ink/5",
                disabled && "opacity-60 cursor-not-allowed"
              )}
            >
              {/* Radio dot */}
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                  isSelected
                    ? "border-white"
                    : "border-forest-ink/30"
                )}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>

              {/* Option text */}
              <span className="text-sm font-medium">
                {opt.text || opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
