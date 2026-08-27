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
      {/* Instructions & Word Limit Requirement */}
      <div className="space-y-3">
        {group.instructions && (
          <p className="text-sm font-medium text-forest-ink/80 leading-relaxed">
            {group.instructions}
          </p>
        )}

        {group.wordLimit && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono bg-amber-500/10 text-amber-950 border border-amber-500/20 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0" />
            <span>Requirement: {group.wordLimit}</span>
          </div>
        )}
      </div>

      {/* Reference Box (Headings / Features / Word Bank) if present */}
      {group.referenceBox && !group.type?.includes("heading") && (
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
              {group.referenceBox.items.map((item, idx) => (
                <div
                  key={`${idx}-${item.label}`}
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
