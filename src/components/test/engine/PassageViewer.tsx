"use client";

import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, BookOpen, Headphones, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PassageViewerProps {
  passages: React.ReactNode | string;
  passageCollapsed: boolean;
  onToggleCollapse: () => void;
  activePassageNumber?: 1 | 2 | 3;
  testType?: string;
}

export default function PassageViewer({
  passages,
  passageCollapsed,
  onToggleCollapse,
  activePassageNumber = 1,
  testType,
}: PassageViewerProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const isAudioPassage = testType === "listening" || (typeof passages === "string" && (
    passages.startsWith("http") ||
    passages.endsWith(".mp3") ||
    passages.endsWith(".ogg") ||
    passages.endsWith(".wav") ||
    passages.includes("/sounds/")
  ));

  const renderPassageContent = () => {
    if (isAudioPassage) {
      const hasValidAudioUrl = typeof passages === "string" && passages.trim().startsWith("http");
      if (!hasValidAudioUrl) {
        return (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 space-y-2">
            <p className="text-sm font-bold flex items-center gap-2 font-bricolage">
              <Headphones size={16} /> Audio Recording Unavailable
            </p>
            <p className="text-xs text-amber-800/90 leading-relaxed font-inter">
              The audio recording for this listening test is currently unavailable.
            </p>
          </div>
        );
      }
      return (
        <div className="space-y-6">
          <div className="bg-forest-ink/5 p-5 rounded-2xl border border-forest-ink/10 shadow-xs">
            <p className="text-xs font-bold text-forest-ink uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
              <Headphones size={16} className="text-forest-ink/80" /> Listening Test Audio Player
            </p>
            <audio controls preload="auto" className="w-full mt-2 rounded-xl" key={passages as string}>
              <source src={passages as string} type="audio/mpeg" />
              <source src={passages as string} type="audio/mp3" />
              <source src={passages as string} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="text-xs text-forest-ink/75 space-y-2 font-inter bg-whisper-gray/60 p-4 rounded-xl border border-pencil-gray/20">
            <p className="font-bold text-forest-ink">Listening Exam Instructions:</p>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li>Listen to the audio recording carefully to answer Questions 1 to 40.</li>
              <li>Use the controls above to play, pause, or adjust volume.</li>
              <li>You may navigate through questions freely while listening.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (typeof passages === "string") {
      return <div dangerouslySetInnerHTML={{ __html: passages }} />;
    }

    return passages;
  };

  return (
    <>
      {/* Desktop Collapsible Sticky Passage Side Panel */}
      <div
        className={cn(
          "hidden md:flex flex-col sticky top-20 max-h-[calc(100vh-100px)] bg-white rounded-2xl border border-forest-ink/15 shadow-sm transition-all duration-300 overflow-hidden",
          passageCollapsed
            ? "w-14 shrink-0 bg-gradient-to-b from-forest-ink/5 via-cream-paper to-forest-ink/5 cursor-pointer hover:border-forest-ink/30 group"
            : "w-[45%] shrink-0"
        )}
        onClick={passageCollapsed ? onToggleCollapse : undefined}
      >
        {passageCollapsed ? (
          /* Collapsed Vertical Strip UI */
          <div className="flex-1 flex flex-col items-center justify-between py-4 px-2 select-none">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              className="h-9 w-9 p-0 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10 rounded-xl"
              title={isAudioPassage ? "Expand Audio Player" : "Expand Passage"}
            >
              <PanelLeftOpen size={18} />
            </Button>

            <div className="flex flex-col items-center gap-3 text-forest-ink/60 group-hover:text-forest-ink transition-colors">
              {isAudioPassage ? <Headphones size={16} className="shrink-0" /> : <BookOpen size={16} className="shrink-0" />}
              <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-mono font-bold tracking-widest uppercase py-2">
                {isAudioPassage ? "Audio Player (Click to expand)" : `Passage ${activePassageNumber} (Click to expand)`}
              </span>
            </div>

            <div className="w-2 h-2 rounded-full bg-forest-ink/20 group-hover:bg-forest-ink/40 transition-colors" />
          </div>
        ) : (
          /* Expanded Full Passage UI */
          <>
            {/* Header Bar */}
            <div className="px-4 py-3 bg-forest-ink/5 border-b border-forest-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isAudioPassage ? (
                  <>
                    <Headphones size={16} className="text-forest-ink/70" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-forest-ink">
                      Listening Audio Track
                    </span>
                  </>
                ) : (
                  <>
                    <BookOpen size={16} className="text-forest-ink/70" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-forest-ink">
                      Reading Passage {activePassageNumber}
                    </span>
                  </>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="h-8 w-8 p-0 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10 rounded-lg"
                title={isAudioPassage ? "Collapse Audio Player" : "Collapse Passage"}
              >
                <PanelLeftClose size={18} />
              </Button>
            </div>

            {/* Passage Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-160px)] space-y-4 font-inter text-forest-ink leading-relaxed text-sm">
              {renderPassageContent()}
            </div>
          </>
        )}
      </div>

      {/* Mobile Floating Passage Button & Slide-over Sheet */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="fixed bottom-20 left-4 z-40 px-4 py-2.5 rounded-xl bg-forest-ink text-white shadow-lg text-xs font-bold font-mono flex items-center gap-2 border border-white/20 active:scale-95 transition-transform"
        >
          {isAudioPassage ? <Headphones size={15} /> : <BookOpen size={15} />} {isAudioPassage ? "Audio Player" : "View Passage"}
        </button>

        {mobileSheetOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="px-5 py-4 bg-forest-ink text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isAudioPassage ? <Headphones size={18} /> : <BookOpen size={18} />}
                  <h3 className="text-sm font-bold font-bricolage">
                    {isAudioPassage ? "Listening Audio Track" : `Reading Passage ${activePassageNumber}`}
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
                {renderPassageContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
