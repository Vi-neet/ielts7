"use client";

import React from "react";
import { VirtualQuestion } from "@/lib/types/testEngine";

interface TextInputRendererProps {
  question: VirtualQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function TextInputRenderer({
  question,
  value,
  onChange,
  disabled = false,
}: TextInputRendererProps) {
  const hasSentenceWrap = Boolean(question.sentenceBefore || question.sentenceAfter);

  if (hasSentenceWrap) {
    return (
      <div className="p-4 rounded-xl bg-forest-ink/5 border border-forest-ink/10 space-y-3">
        {question.contextHeader && (
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-forest-ink/60">
            {question.contextHeader}
          </h4>
        )}
        <div className="text-base font-medium text-forest-ink leading-relaxed flex flex-wrap items-center gap-2">
          {question.sentenceBefore && <span>{question.sentenceBefore}</span>}
          <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder={question.placeholder || "Type answer..."}
            onChange={(e) => onChange(e.target.value)}
            className="w-48 h-10 px-3 rounded-lg border border-forest-ink/30 bg-white font-inter text-forest-ink placeholder:text-forest-ink/30 focus:outline-none focus:ring-2 focus:ring-forest-ink/30 focus:border-forest-ink transition-all text-base shadow-2xs inline-block disabled:opacity-60 disabled:cursor-not-allowed"
          />
          {question.sentenceAfter && <span>{question.sentenceAfter}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {question.contextHeader && (
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-forest-ink/60">
          {question.contextHeader}
        </h4>
      )}

      {question.promptText && (
        <p className="text-base font-medium text-forest-ink leading-relaxed">
          {question.promptText}
        </p>
      )}

      <div className="relative">
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={question.placeholder || "Type your answer..."}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-forest-ink/20 bg-white font-inter text-forest-ink placeholder:text-forest-ink/30 focus:outline-none focus:ring-2 focus:ring-forest-ink/30 focus:border-forest-ink transition-all text-base shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
