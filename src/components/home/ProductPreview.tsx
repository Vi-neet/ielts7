"use client";

import { BookOpen, Clock, CheckCircle2 } from "lucide-react";

/**
 * Realistic IELTS Reading test interface preview for the homepage hero.
 * This is a visual marketing component only — not connected to backend logic.
 * Uses design tokens from DESIGN.md.
 */
const ProductPreview = () => {
  return (
    <div className="relative w-full max-w-[960px] mx-auto mt-8 md:mt-12">
      {/* Floating Badges */}
      <div className="absolute -top-6 -right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-ink text-white shadow-2xl rotate-3 transform origin-bottom-left border border-white/10 hidden md:flex">
        <CheckCircle2 className="w-4 h-4 text-sticky-note-mint" />
        <span className="font-bricolage font-bold tracking-wide">Band 7.5</span>
      </div>
      
      <div className="absolute -bottom-5 -left-5 z-20 px-4 py-2.5 rounded-xl bg-white text-forest-ink shadow-xl -rotate-2 transform origin-top-right border border-pencil-gray/20 hidden md:block">
        <span className="font-roboto-mono text-sm font-semibold block leading-none">52:30</span>
        <span className="font-inter text-[10px] text-pencil-gray uppercase tracking-wider block mt-1">Remaining</span>
      </div>

      <div
        className="w-full rounded-[12px] overflow-hidden border border-pencil-gray/30 bg-white relative z-10"
        style={{
          boxShadow: "0 25px 50px -12px rgba(26, 51, 0, 0.15), 0 0 0 1px rgba(26, 51, 0, 0.05)",
        }}
      >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-cream-paper border-b border-pencil-gray/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-sticky-note-mint/60">
            <BookOpen className="w-4 h-4 text-forest-ink" />
          </div>
          <div>
            <span className="font-inter text-[14px] font-semibold text-forest-ink">
              IELTS Reading
            </span>
            <span className="ml-2 text-[12px] font-roboto-mono text-pencil-gray">
              Academic
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[13px] font-roboto-mono text-forest-ink/70">
            <span className="text-forest-ink/40">Q</span>
            <span className="font-semibold text-forest-ink">3</span>
            <span className="text-forest-ink/40">of 40</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-whisper-gray">
            <Clock className="w-3.5 h-3.5 text-forest-ink/60" />
            <span className="text-[13px] font-roboto-mono font-medium text-forest-ink/80">
              52:30
            </span>
          </div>
        </div>
      </div>

      {/* Content area — passage + question */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: Passage excerpt */}
        <div className="p-5 md:border-r border-pencil-gray/15">
          <div className="mb-3">
            <span className="text-[11px] font-roboto-mono font-medium text-pencil-gray uppercase tracking-wider">
              Passage 1
            </span>
          </div>
          <div className="space-y-2.5">
            <p className="text-[15px] leading-relaxed text-forest-ink/80 font-inter">
              The chart illustrates the proportion of energy generated from
              renewable sources across five major economies between 2010 and
              2023.
            </p>
            <p className="text-[15px] leading-relaxed text-forest-ink/60 font-inter">
              Overall, the data reveals a significant upward trend in renewable
              energy adoption, with some nations demonstrating particularly
              rapid growth in solar and wind capacity...
            </p>
            <div className="h-px bg-pencil-gray/15 my-2" />
            <p className="text-[14px] leading-relaxed text-forest-ink/40 font-inter">
              According to the International Energy Agency, the share of
              renewables in global electricity generation reached 30% in
              2023...
            </p>
          </div>
        </div>

        {/* Right: Question */}
        <div className="p-5 bg-cream-paper/50">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-forest-ink text-cream-paper text-[11px] font-roboto-mono font-bold">
              3
            </span>
            <span className="text-[11px] font-roboto-mono font-medium text-pencil-gray uppercase tracking-wider">
              Multiple Choice
            </span>
          </div>

          <p className="text-[15px] font-inter font-medium text-forest-ink mb-4 leading-snug">
            Which of the following best describes the overall trend in renewable
            energy adoption?
          </p>

          <div className="space-y-2.5">
            {[
              { label: "A", text: "A consistent decline across all nations", checked: false },
              { label: "B", text: "A significant upward trend with varying rates", checked: true },
              { label: "C", text: "No significant change over the period", checked: false },
              { label: "D", text: "Growth limited to developing economies only", checked: false },
            ].map((option) => (
              <div
                key={option.label}
                className={`flex items-start gap-3 p-3 rounded-[8px] border transition-colors ${
                  option.checked
                    ? "border-forest-ink/30 bg-sticky-note-mint/20"
                    : "border-pencil-gray/20 bg-white hover:border-pencil-gray/30"
                }`}
              >
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    option.checked
                      ? "border-forest-ink bg-forest-ink"
                      : "border-pencil-gray/50"
                  }`}
                >
                  {option.checked && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cream-paper" />
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-roboto-mono font-semibold text-forest-ink/50 mt-px">
                    {option.label}
                  </span>
                  <span
                    className={`text-[14px] font-inter leading-snug ${
                      option.checked
                        ? "text-forest-ink font-medium"
                        : "text-forest-ink/70"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Progress bar */}
      <div className="px-5 py-3 border-t border-pencil-gray/15 bg-cream-paper/80 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-1 h-2 rounded-full bg-whisper-gray overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sticky-note-mint to-forest-ink/40"
              style={{ width: "7.5%" }}
            />
          </div>
          <span className="text-[12px] font-roboto-mono text-forest-ink/50">
            3/40
          </span>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <CheckCircle2 className="w-4 h-4 text-highlighter-yellow" />
          <span className="text-[13px] font-inter font-medium text-forest-ink/70">
            Band 7+ Target
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPreview;
