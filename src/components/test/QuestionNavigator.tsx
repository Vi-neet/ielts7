"use client";

import React, { useState } from "react";
import { Bookmark, ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionNavigatorProps {
  testType: string;
  questionNumbers: number[];
  answers: Record<number, string>;
  bookmarks?: Record<number, boolean>;
  checkedQuestions?: Record<number, { isCorrect: boolean; correctAnswer: string } | boolean>;
  currentQuestion: number | null;
  mode: "practice" | "exam";
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate: (num: number) => void;
}

interface SectionDef {
  name: string;
  range: [number, number];
}

function getSections(testType: string): SectionDef[] {
  if (testType === "listening") {
    return [
      { name: "Section 1", range: [1, 10] },
      { name: "Section 2", range: [11, 20] },
      { name: "Section 3", range: [21, 30] },
      { name: "Section 4", range: [31, 40] },
    ];
  }
  return [
    { name: "Passage 1", range: [1, 14] },
    { name: "Passage 2", range: [15, 27] },
    { name: "Passage 3", range: [28, 40] },
  ];
}

export default function QuestionNavigator({
  testType,
  questionNumbers,
  answers,
  bookmarks = {},
  checkedQuestions = {},
  currentQuestion,
  mode,
  isCollapsed = false,
  onToggleCollapse,
  onNavigate,
}: QuestionNavigatorProps) {
  const sections = getSections(testType);

  const getBadgeStyle = (num: number) => {
    const isCurrent = num === currentQuestion;
    const isAns = Boolean(answers[num]?.trim());
    const isBkmk = Boolean(bookmarks[num]);
    const checked = checkedQuestions[num];

    const isPracticeChecked =
      mode === "practice" && checked !== undefined && checked !== null;
    const isCorrect =
      isPracticeChecked &&
      (typeof checked === "object" ? checked.isCorrect : Boolean(checked));

    let base =
      "w-9 h-9 rounded-xl text-xs font-mono font-extrabold border transition-all duration-150 flex items-center justify-center relative cursor-pointer shadow-2xs";

    if (isCurrent) {
      base += " ring-2 ring-forest-ink ring-offset-1 border-forest-ink font-black scale-105 z-10";
    }

    if (isPracticeChecked) {
      if (isCorrect) {
        return `${base} bg-emerald-100 text-emerald-900 border-emerald-500 font-extrabold`;
      }
      return `${base} bg-rose-100 text-rose-900 border-rose-400 font-extrabold`;
    }

    if (isBkmk && isAns) {
      return `${base} bg-emerald-600 text-white border-emerald-700`;
    }

    if (isBkmk) {
      return `${base} bg-purple-600 text-white border-purple-700`;
    }

    if (isAns) {
      return `${base} bg-emerald-500 text-white border-emerald-600`;
    }

    // Unanswered
    return `${base} bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200`;
  };

  const answeredCount = (range: [number, number]) => {
    let count = 0;
    for (let n = range[0]; n <= range[1]; n++) {
      if (answers[n]?.trim()) count++;
    }
    return count;
  };

  const totalAnswered = questionNumbers.filter((n) => answers[n]?.trim()).length;

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-2xl border border-forest-ink/15 overflow-hidden shadow-sm p-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-between text-xs font-mono font-bold text-forest-ink hover:bg-forest-ink/5 p-2 rounded-xl transition-colors"
          title="Expand Question Navigator"
        >
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-forest-ink/70" />
            <span>Navigator ({totalAnswered}/40)</span>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-forest-ink/15 overflow-hidden shadow-sm transition-all">
      {/* Header & Legend */}
      <div className="px-4 py-3 border-b border-forest-ink/10 bg-forest-ink/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-forest-ink">
            Question Navigator
          </span>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1 rounded-lg hover:bg-forest-ink/10 text-forest-ink/60 transition-colors"
              title="Collapse Question Navigator"
            >
              <ChevronUp size={14} />
            </button>
          )}
        </div>


      </div>

      <div className="p-4 space-y-5">
        {sections.map(({ name, range }) => {
          const sectionNums = questionNumbers.filter(
            (n) => n >= range[0] && n <= range[1]
          );
          if (sectionNums.length === 0) return null;

          const ans = answeredCount(range);
          const total = sectionNums.length;

          return (
            <div key={name} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-forest-ink">{name}</span>
                <span className="text-forest-ink/50">
                  {ans}/{total}
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                {sectionNums.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onNavigate(num)}
                    className={getBadgeStyle(num)}
                    aria-label={`Question ${num}`}
                  >
                    {num}
                    {bookmarks[num] && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-2xs border border-white">
                        <Bookmark size={8} className="fill-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
