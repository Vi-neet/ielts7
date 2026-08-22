"use client";

import React from "react";

type QuestionStatus =
  | "unanswered"
  | "answered"
  | "current"
  | "checked-correct"
  | "checked-incorrect";

interface QuestionNavigatorProps {
  testType: string;
  /** All question numbers in the answer key (sorted ascending) */
  questionNumbers: number[];
  answers: Record<number, string>;
  /** In practice mode only: map of questionNum → correct (true/false). Empty in exam mode. */
  checkedQuestions: Record<number, boolean>;
  currentQuestion: number | null;
  mode: "practice" | "exam";
  onNavigate: (num: number) => void;
}

interface SectionDef {
  name: string;
  range: [number, number]; // inclusive
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
  // Academic Reading & General Reading
  return [
    { name: "Section 1", range: [1, 13] },
    { name: "Section 2", range: [14, 27] },
    { name: "Section 3", range: [28, 40] },
  ];
}

function getButtonStyle(status: QuestionStatus): string {
  const base =
    "w-8 h-8 rounded-lg text-xs font-mono font-semibold border transition-all duration-150 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-forest-ink focus-visible:outline-offset-1 cursor-pointer";

  switch (status) {
    case "current":
      return `${base} bg-highlighter-yellow border-[#d4c000] text-forest-ink shadow-sm`;
    case "answered":
      return `${base} bg-forest-ink border-forest-ink text-white`;
    case "checked-correct":
      return `${base} bg-[#d8f3dc] border-[#b7e4c7] text-forest-ink`;
    case "checked-incorrect":
      return `${base} bg-[#fcd2c2] border-[#f8b195] text-[#cb5521]`;
    default: // unanswered
      return `${base} bg-white border-pencil-gray/25 text-forest-ink/45 hover:border-forest-ink/30 hover:text-forest-ink`;
  }
}

export default function QuestionNavigator({
  testType,
  questionNumbers,
  answers,
  checkedQuestions,
  currentQuestion,
  mode,
  onNavigate,
}: QuestionNavigatorProps) {
  const sections = getSections(testType);
  const questionSet = new Set(questionNumbers);

  const getStatus = (num: number): QuestionStatus => {
    if (num === currentQuestion) return "current";
    // Only expose correctness in practice mode
    if (mode === "practice" && checkedQuestions[num] !== undefined) {
      return checkedQuestions[num] ? "checked-correct" : "checked-incorrect";
    }
    if (answers[num]?.trim()) return "answered";
    return "unanswered";
  };

  const answeredInSection = (range: [number, number]) => {
    let count = 0;
    for (let n = range[0]; n <= range[1]; n++) {
      if (questionSet.has(n) && answers[n]?.trim()) count++;
    }
    return count;
  };

  const totalInSection = (range: [number, number]) =>
    questionNumbers.filter((n) => n >= range[0] && n <= range[1]).length;

  return (
    <div className="mt-3 bg-white rounded-2xl border border-pencil-gray/15 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-pencil-gray/10 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-forest-ink/40">
          Question Navigator
        </span>
        {/* Legend — only show correctness legend in practice mode */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-forest-ink" aria-hidden />
            <span className="text-[9px] font-mono text-forest-ink/40">Answered</span>
          </div>
          {mode === "practice" && (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#d8f3dc] border border-[#b7e4c7]" aria-hidden />
                <span className="text-[9px] font-mono text-forest-ink/40">Correct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#fcd2c2] border border-[#f8b195]" aria-hidden />
                <span className="text-[9px] font-mono text-forest-ink/40">Incorrect</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-3 space-y-4">
        {sections.map(({ name, range }) => {
          const sectionNums = questionNumbers.filter(
            (n) => n >= range[0] && n <= range[1]
          );
          if (sectionNums.length === 0) return null;

          const answered = answeredInSection(range);
          const total = totalInSection(range);

          return (
            <div key={name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-forest-ink/45 font-semibold">
                  {name}
                </span>
                <span className="text-[9px] font-mono text-forest-ink/35">
                  {answered}/{total}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label={name}>
                {sectionNums.map((num) => {
                  const status = getStatus(num);
                  return (
                    <button
                      key={num}
                      onClick={() => onNavigate(num)}
                      className={getButtonStyle(status)}
                      aria-label={`Question ${num}${
                        status === "current" ? " (current)" : ""
                      }${status === "answered" ? " (answered)" : ""}${
                        status === "checked-correct" ? " (correct)" : ""
                      }${status === "checked-incorrect" ? " (incorrect)" : ""}`}
                      aria-current={status === "current" ? "true" : undefined}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
