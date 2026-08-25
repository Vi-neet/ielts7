"use client";

import React from "react";
import { VirtualQuestion } from "@/lib/types/testEngine";
import TextInputRenderer from "./TextInputRenderer";

interface StructuredBlockRendererProps {
  question: VirtualQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function StructuredBlockRenderer({
  question,
  value,
  onChange,
  disabled = false,
}: StructuredBlockRendererProps) {
  return (
    <div className="space-y-4">
      {question.contextLabel && (
        <div className="px-3.5 py-2.5 rounded-lg bg-forest-ink/5 border border-forest-ink/10">
          <p className="text-xs font-semibold text-forest-ink/70">
            Section / Topic: {question.contextLabel}
          </p>
        </div>
      )}

      <TextInputRenderer
        question={question}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
