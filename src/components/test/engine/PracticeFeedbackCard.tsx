"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticeFeedbackCardProps {
  isCorrect: boolean;
  studentAnswer: string;
  correctAnswer: string;
}

export default function PracticeFeedbackCard({
  isCorrect,
  studentAnswer,
  correctAnswer,
}: PracticeFeedbackCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300",
        isCorrect
          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
          : "bg-rose-50 text-rose-900 border-rose-200"
      )}
    >
      <div className="flex items-start gap-3.5">
        {isCorrect ? (
          <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
        )}

        <div className="space-y-1.5 flex-1">
          <h4 className="text-base font-extrabold font-bricolage leading-tight">
            {isCorrect ? "Correct!" : "Incorrect"}
          </h4>

          <div className="text-xs font-inter space-y-1">
            <p>
              <span className="font-semibold opacity-70">Your Answer:</span>{" "}
              <span className="font-bold">{studentAnswer || "(No answer)"}</span>
            </p>
            {!isCorrect && (
              <p>
                <span className="font-semibold opacity-70">Correct Answer:</span>{" "}
                <span className="font-bold underline decoration-rose-300">
                  {correctAnswer}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
