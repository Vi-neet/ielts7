"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface ResultLoadingOverlayProps {
  title?: string;
  subtitle?: string;
}

const LOADING_STEPS = [
  "Gathering submitted test responses...",
  "Cross-checking against official IELTS answer keys...",
  "Evaluating band scores across all 40 questions...",
  "Finalizing your performance report...",
];

export default function ResultLoadingOverlay({
  title = "Compiling & Grading Results",
  subtitle = "Please wait while we compute your band score and detailed performance breakdown.",
}: ResultLoadingOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-forest-ink/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#fcfaf5] rounded-3xl p-8 max-w-md w-full border border-forest-ink/15 shadow-2xl space-y-6 text-center">
        {/* Animated Badge & Loader */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-highlighter-yellow/40 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-forest-ink flex items-center justify-center text-white shadow-md relative z-10">
            <Loader2 className="animate-spin text-highlighter-yellow" size={28} />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-ink/5 border border-forest-ink/10 text-[11px] font-mono font-bold uppercase tracking-wider text-forest-ink">
            <Sparkles size={13} className="text-forest-ink/70" /> IELTS 7+ Evaluator
          </div>
          <h2 className="text-2xl font-extrabold font-bricolage text-forest-ink leading-tight">
            {title}
          </h2>
          <p className="text-xs font-inter text-forest-ink/70 leading-relaxed max-w-xs mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Progress Steps */}
        <div className="bg-white rounded-2xl p-4 border border-forest-ink/10 shadow-xs text-left space-y-2.5">
          {LOADING_STEPS.map((step, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs font-inter transition-all duration-300 ${
                  isDone
                    ? "text-forest-ink font-medium"
                    : isCurrent
                    ? "text-forest-ink font-bold"
                    : "text-forest-ink/30 opacity-60"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 size={15} className="text-forest-ink animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-forest-ink/20 shrink-0" />
                )}
                <span className="line-clamp-1">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
