"use client";

import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PassageViewerProps {
  passages: React.ReactNode | string;
  passageCollapsed: boolean;
  onToggleCollapse: () => void;
  activePassageNumber?: 1 | 2 | 3;
}

export default function PassageViewer({
  passages,
  passageCollapsed,
  onToggleCollapse,
  activePassageNumber = 1,
}: PassageViewerProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  return (
    <>
      {/* Desktop Collapsible Passage Side Panel */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-white rounded-2xl border border-forest-ink/15 shadow-sm transition-all duration-300 overflow-hidden",
          passageCollapsed ? "w-14 shrink-0" : "w-[45%] shrink-0"
        )}
      >
        {/* Header Bar */}
        <div className="px-4 py-3 bg-forest-ink/5 border-b border-forest-ink/10 flex items-center justify-between">
          {!passageCollapsed && (
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-forest-ink/70" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-forest-ink">
                Reading Passage {activePassageNumber}
              </span>
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10"
            title={passageCollapsed ? "Expand Passage" : "Collapse Passage"}
          >
            {passageCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </Button>
        </div>

        {/* Passage Content */}
        {!passageCollapsed && (
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-160px)] space-y-4 font-inter text-forest-ink leading-relaxed text-sm">
            {typeof passages === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: passages }} />
            ) : (
              passages
            )}
          </div>
        )}
      </div>

      {/* Mobile Floating Passage Button & Slide-over Sheet */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="fixed bottom-20 left-4 z-40 px-4 py-2.5 rounded-full bg-forest-ink text-white shadow-lg text-xs font-bold font-mono flex items-center gap-2 border border-white/20 active:scale-95 transition-transform"
        >
          <BookOpen size={15} /> View Passage
        </button>

        {mobileSheetOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="px-5 py-4 bg-forest-ink text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} />
                  <h3 className="text-sm font-bold font-bricolage">
                    Reading Passage {activePassageNumber}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSheetOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 font-inter text-forest-ink leading-relaxed text-sm">
                {typeof passages === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: passages }} />
                ) : (
                  passages
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
