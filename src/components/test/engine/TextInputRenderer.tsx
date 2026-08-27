"use client";

import React from "react";
import { VirtualQuestion } from "@/lib/types/testEngine";

interface TextInputRendererProps {
  question: VirtualQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  compactInputOnly?: boolean;
}

export default function TextInputRenderer({
  question,
  value,
  onChange,
  disabled = false,
  compactInputOnly = false,
}: TextInputRendererProps) {
  const [localVal, setLocalVal] = React.useState(value);

  React.useEffect(() => {
    setLocalVal(value);
  }, [value]);

  const handleBlur = () => {
    if (localVal !== value) {
      onChange(localVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(localVal);
    }
  };

  // Compact mode for Category View: render only the input box without repeating sentence text
  if (compactInputOnly) {
    return (
      <div className="space-y-2 pt-1">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-forest-ink/60 block">
          Your Answer:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={localVal}
            disabled={disabled}
            placeholder={question.placeholder || "Type your answer and press Enter..."}
            onChange={(e) => setLocalVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-11 px-4 rounded-xl border border-forest-ink/20 bg-white font-inter text-forest-ink placeholder:text-forest-ink/30 focus:outline-none focus:ring-2 focus:ring-forest-ink/30 focus:border-forest-ink transition-all text-sm shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    );
  }

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
            value={localVal}
            disabled={disabled}
            placeholder={question.placeholder || "Type answer..."}
            onChange={(e) => setLocalVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
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
          value={localVal}
          disabled={disabled}
          placeholder={question.placeholder || "Type your answer..."}
          onChange={(e) => setLocalVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-12 px-4 rounded-xl border border-forest-ink/20 bg-white font-inter text-forest-ink placeholder:text-forest-ink/30 focus:outline-none focus:ring-2 focus:ring-forest-ink/30 focus:border-forest-ink transition-all text-base shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
