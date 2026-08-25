"use client";

import React, { useState } from "react";
import { VirtualQuestionGroup } from "@/lib/types/testEngine";
import { BookOpen, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupContextBannerProps {
  group: VirtualQuestionGroup;
}

export default function GroupContextBanner({ group }: GroupContextBannerProps) {
  const [refBoxCollapsed, setRefBoxCollapsed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-forest-ink/15 p-5 shadow-sm space-y-4">
      {/* Group Title & Passage Indicator */}
      <div className="flex items-center justify-between border-b border-forest-ink/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-forest-ink/5 border border-forest-ink/10 flex items-center justify-center shrink-0">
            <BookOpen size={16} className="text-forest-ink" />
          </div>
          <div>
            <h3 className="text-base font-extrabold font-bricolage text-forest-ink">
              {group.title}
            </h3>
            <p className="text-[11px] font-mono tracking-wider text-forest-ink/50 uppercase">
              Passage {group.passageNumber} Context
            </p>
          </div>
        </div>

        {group.wordLimit && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            {group.wordLimit}
          </span>
        )}
      </div>

      {/* Instructions */}
      <p className="text-sm font-medium text-forest-ink/80 leading-relaxed">
        {group.instructions}
      </p>

      {/* Reference Box (Headings / Features / Word Bank) if present */}
      {group.referenceBox && (
        <div className="mt-3 rounded-xl border border-forest-ink/15 bg-cream-paper overflow-hidden">
          <button
            type="button"
            onClick={() => setRefBoxCollapsed(!refBoxCollapsed)}
            className="w-full px-4 py-2.5 bg-forest-ink/5 border-b border-forest-ink/10 flex items-center justify-between text-left hover:bg-forest-ink/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-forest-ink/70" />
              <span className="text-xs font-bold font-mono tracking-wide text-forest-ink uppercase">
                {group.referenceBox.title || "Reference Options"}
              </span>
            </div>
            {refBoxCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>

          {!refBoxCollapsed && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto">
              {group.referenceBox.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-forest-ink/10 text-xs"
                >
                  <span className="font-mono font-bold text-forest-ink shrink-0 bg-forest-ink/5 px-1.5 py-0.5 rounded border border-forest-ink/10">
                    {item.label}
                  </span>
                  <span className="text-forest-ink/80 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
