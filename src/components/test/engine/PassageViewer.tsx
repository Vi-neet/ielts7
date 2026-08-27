"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  Headphones,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Highlighter,
  RotateCcw,
  RotateCw,
  Sparkles,
} from "lucide-react";
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

  // Audio State & Ref
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Passage Search State
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchCount, setMatchCount] = useState(0);

  // Text Selection Highlighting State
  const passageContainerRef = useRef<HTMLDivElement>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [highlightCount, setHighlightCount] = useState(0);

  const isAudioPassage =
    testType === "listening" ||
    (typeof passages === "string" &&
      (passages.startsWith("http") ||
        passages.endsWith(".mp3") ||
        passages.endsWith(".ogg") ||
        passages.endsWith(".wav") ||
        passages.includes("/sounds/")));

  // Highlight search matches in HTML string while preserving HTML tags
  const getHighlightedPassageHtml = (htmlContent: string, query: string) => {
    if (!query || !query.trim()) return htmlContent;

    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");

    return htmlContent.replace(/(<[^>]+>)|([^<]+)/g, (match, isTag, textContent) => {
      if (isTag) return isTag;
      return textContent.replace(
        regex,
        '<mark class="bg-amber-300 text-amber-950 font-bold px-0.5 rounded search-match">$1</mark>'
      );
    });
  };

  useEffect(() => {
    if (!searchQuery.trim() || !passageContainerRef.current) {
      setMatchCount(0);
      return;
    }
    const matches = passageContainerRef.current.querySelectorAll("mark.search-match");
    setMatchCount(matches.length);
    if (matches.length > 0) {
      matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [searchQuery]);

  // Handle Audio Speed Change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Handle Audio Seek (+10s / -10s)
  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime + seconds
      );
    }
  };

  // Handle Text Selection Highlighting
  const handleMouseUpPassage = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) {
      setHasSelection(true);
    } else {
      setHasSelection(false);
    }
  };

  const applyHighlight = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const mark = document.createElement("mark");
    mark.className =
      "bg-highlighter-yellow/60 text-forest-ink font-semibold rounded px-0.5 shadow-2xs transition-colors";
    mark.title = "Highlighted text";

    try {
      range.surroundContents(mark);
      setHighlightCount((prev) => prev + 1);
      sel.removeAllRanges();
      setHasSelection(false);
    } catch {
      // Handle cross-node selections gracefully
      const highlightedText = sel.toString();
      if (highlightedText && passageContainerRef.current) {
        setHasSelection(false);
      }
    }
  };

  const clearHighlights = () => {
    if (!passageContainerRef.current) return;
    const marks = passageContainerRef.current.querySelectorAll("mark");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
      }
    });
    setHighlightCount(0);
  };

  const renderPassageContent = () => {
    if (isAudioPassage) {
      const hasValidAudioUrl =
        typeof passages === "string" && passages.trim().startsWith("http");
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
          <div className="bg-white p-6 rounded-3xl border border-forest-ink/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-forest-ink/10 pb-3">
              <p className="text-xs font-bold text-forest-ink uppercase tracking-wider font-mono flex items-center gap-2">
                <Headphones size={16} className="text-forest-ink/80" /> Listening Track Player
              </p>
              <div className="flex items-center gap-1 bg-forest-ink/5 p-1 rounded-xl border border-forest-ink/10">
                {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => handleSpeedChange(speed)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all",
                      playbackSpeed === speed
                        ? "bg-forest-ink text-white shadow-xs"
                        : "text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10"
                    )}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <audio
              ref={audioRef}
              controls
              preload="auto"
              className="w-full rounded-xl"
              key={passages as string}
            >
              <source src={passages as string} type="audio/mpeg" />
              <source src={passages as string} type="audio/mp3" />
              <source src={passages as string} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>

            {/* Quick Seek Controls */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSeek(-10)}
                className="px-3.5 py-1.5 rounded-xl bg-forest-ink/5 hover:bg-forest-ink/10 text-forest-ink border border-forest-ink/10 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
              >
                <RotateCcw size={13} /> Skip -10s
              </button>
              <button
                type="button"
                onClick={() => handleSeek(10)}
                className="px-3.5 py-1.5 rounded-xl bg-forest-ink/5 hover:bg-forest-ink/10 text-forest-ink border border-forest-ink/10 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
              >
                Skip +10s <RotateCw size={13} />
              </button>
            </div>
          </div>

          <div className="text-xs text-forest-ink/75 space-y-2 font-inter bg-white/80 p-5 rounded-2xl border border-forest-ink/10 shadow-xs">
            <p className="font-bold text-forest-ink">Listening Exam Instructions:</p>
            <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
              <li>Listen to the audio recording carefully to answer Questions 1 to 40.</li>
              <li>Use the speed buttons above to adjust playback rate if needed.</li>
              <li>You may navigate through questions freely while listening.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (typeof passages === "string") {
      const finalHtml = searchQuery.trim()
        ? getHighlightedPassageHtml(passages, searchQuery)
        : passages;

      return (
        <div
          ref={passageContainerRef}
          onMouseUp={handleMouseUpPassage}
          dangerouslySetInnerHTML={{ __html: finalHtml }}
        />
      );
    }

    return passages;
  };

  return (
    <>
      {/* Desktop Collapsible Full-Height Passage Panel */}
      <div
        className={cn(
          "hidden md:flex flex-col h-full bg-white rounded-3xl border border-forest-ink/15 shadow-sm transition-all duration-300 overflow-hidden",
          passageCollapsed
            ? "w-14 shrink-0 bg-gradient-to-b from-forest-ink/5 via-cream-paper to-forest-ink/5 cursor-pointer hover:border-forest-ink/30 group"
            : "w-full flex-1"
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
              {isAudioPassage ? (
                <Headphones size={16} className="shrink-0" />
              ) : (
                <BookOpen size={16} className="shrink-0" />
              )}
              <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-mono font-bold tracking-widest uppercase py-2">
                {isAudioPassage
                  ? "Audio Player (Click to expand)"
                  : `Passage ${activePassageNumber} (Click to expand)`}
              </span>
            </div>

            <div className="w-2 h-2 rounded-full bg-forest-ink/20 group-hover:bg-forest-ink/40 transition-colors" />
          </div>
        ) : (
          /* Expanded Full Passage UI */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header Bar */}
            <div className="px-5 py-3.5 bg-forest-ink/5 border-b border-forest-ink/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                {isAudioPassage ? (
                  <>
                    <Headphones size={17} className="text-forest-ink/70" />
                    <span className="text-xs font-extrabold font-mono uppercase tracking-wider text-forest-ink">
                      Listening Audio Track
                    </span>
                  </>
                ) : (
                  <>
                    <BookOpen size={17} className="text-forest-ink/70" />
                    <span className="text-xs font-extrabold font-mono uppercase tracking-wider text-forest-ink">
                      Reading Passage {activePassageNumber}
                    </span>
                  </>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                {!isAudioPassage && (
                  <>
                    {/* Floating Selection Highlight Pill */}
                    {hasSelection && (
                      <button
                        type="button"
                        onClick={applyHighlight}
                        className="px-3 py-1 rounded-full bg-highlighter-yellow text-forest-ink border border-forest-ink/30 text-xs font-mono font-bold shadow-xs flex items-center gap-1.5 animate-in fade-in duration-150"
                      >
                        <Highlighter size={13} /> Highlight Text
                      </button>
                    )}

                    {/* Clear Highlights Button */}
                    {highlightCount > 0 && (
                      <button
                        type="button"
                        onClick={clearHighlights}
                        className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-mono font-bold flex items-center gap-1 hover:bg-rose-200 transition-colors"
                        title="Clear all text highlights"
                      >
                        <X size={12} /> Clear ({highlightCount})
                      </button>
                    )}

                    {/* Find in Passage Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowSearch(!showSearch)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors flex items-center gap-1.5",
                        showSearch
                          ? "bg-forest-ink text-white border-forest-ink"
                          : "bg-white text-forest-ink border-forest-ink/15 hover:bg-forest-ink/5"
                      )}
                    >
                      <Search size={13} /> Search
                    </button>
                  </>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onToggleCollapse}
                  className="h-8 w-8 p-0 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10 rounded-lg shrink-0"
                  title={isAudioPassage ? "Collapse Audio Player" : "Collapse Passage"}
                >
                  <PanelLeftClose size={18} />
                </Button>
              </div>
            </div>

            {/* Find in Passage Search Sub-bar */}
            {!isAudioPassage && showSearch && (
              <div className="px-5 py-2.5 bg-amber-500/10 border-b border-forest-ink/10 flex items-center justify-between gap-3 shrink-0 animate-in slide-in-from-top-1 duration-150">
                <div className="flex items-center gap-2 flex-1">
                  <Search size={14} className="text-amber-950 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type word to find in passage..."
                    className="w-full bg-white px-3 py-1 rounded-xl text-xs font-inter border border-amber-900/20 focus:outline-none focus:ring-1 focus:ring-amber-800"
                    autoFocus
                  />
                </div>

                {searchQuery.trim() && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded-lg border border-amber-400/50">
                      {matchCount} {matchCount === 1 ? "match" : "matches"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-mono font-bold text-amber-950 hover:underline shrink-0"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Passage Scrollable Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 font-inter text-forest-ink leading-relaxed text-sm">
              {renderPassageContent()}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Floating Passage Button & Slide-over Sheet */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="fixed bottom-20 left-4 z-40 px-4 py-2.5 rounded-xl bg-forest-ink text-white shadow-lg text-xs font-bold font-mono flex items-center gap-2 border border-white/20 active:scale-95 transition-transform"
        >
          {isAudioPassage ? <Headphones size={15} /> : <BookOpen size={15} />}{" "}
          {isAudioPassage ? "Audio Player" : "View Passage"}
        </button>

        {mobileSheetOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="px-5 py-4 bg-forest-ink text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isAudioPassage ? <Headphones size={18} /> : <BookOpen size={18} />}
                  <h3 className="text-sm font-bold font-bricolage">
                    {isAudioPassage
                      ? "Listening Audio Track"
                      : `Reading Passage ${activePassageNumber}`}
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
