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
    setTimeout(() => {
      const sel = window.getSelection();
      if (
        sel &&
        !sel.isCollapsed &&
        sel.toString().trim().length > 0 &&
        (passageContainerRef.current?.contains(sel.anchorNode) ||
          passageContainerRef.current?.contains(sel.focusNode))
      ) {
        setHasSelection(true);
      } else {
        setHasSelection(false);
      }
    }, 10);
  };

  const applyHighlight = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

    try {
      const range = sel.getRangeAt(0);
      const container = passageContainerRef.current;
      if (!container) return;

      const startNode = range.startContainer;
      const endNode = range.endContainer;

      // Single text node selection
      if (startNode === endNode && startNode.nodeType === Node.TEXT_NODE) {
        const textNode = startNode as Text;
        const text = textNode.nodeValue || "";
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;

        if (startOffset < endOffset) {
          const before = text.slice(0, startOffset);
          const selected = text.slice(startOffset, endOffset);
          const after = text.slice(endOffset);

          const parent = textNode.parentNode;
          if (parent) {
            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(document.createTextNode(before));

            const mark = document.createElement("mark");
            mark.className = "bg-amber-300 text-amber-950 font-semibold rounded-xs px-0.5 shadow-2xs user-highlight";
            mark.appendChild(document.createTextNode(selected));
            frag.appendChild(mark);

            if (after) frag.appendChild(document.createTextNode(after));

            parent.replaceChild(frag, textNode);
            setHighlightCount((prev) => prev + 1);
          }
        }
      } else {
        // Multi-node selection: walk text nodes safely
        const ancestor = range.commonAncestorContainer;
        const walker = document.createTreeWalker(
          ancestor.nodeType === Node.TEXT_NODE ? ancestor.parentNode || container : ancestor,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              if (!range.intersectsNode(node)) return NodeFilter.FILTER_REJECT;
              const parent = node.parentNode as HTMLElement;
              if (parent && (parent.tagName === "MARK" || parent.classList.contains("user-highlight"))) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            },
          }
        );

        const nodesToProcess: { node: Text; start: number; end: number }[] = [];
        let currentNode: Node | null = walker.currentNode;

        while (currentNode) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            const textNode = currentNode as Text;
            let start = 0;
            let end = textNode.nodeValue?.length || 0;

            if (textNode === startNode) start = range.startOffset;
            if (textNode === endNode) end = range.endOffset;

            if (start < end) {
              nodesToProcess.push({ node: textNode, start, end });
            }
          }
          currentNode = walker.nextNode();
        }

        let highlightedAny = false;
        nodesToProcess.forEach(({ node, start, end }) => {
          const text = node.nodeValue || "";
          const before = text.slice(0, start);
          const selected = text.slice(start, end);
          const after = text.slice(end);
          const parent = node.parentNode;

          if (parent && selected.trim().length > 0) {
            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(document.createTextNode(before));

            const mark = document.createElement("mark");
            mark.className = "bg-amber-300 text-amber-950 font-semibold rounded-xs px-0.5 shadow-2xs user-highlight";
            mark.appendChild(document.createTextNode(selected));
            frag.appendChild(mark);

            if (after) frag.appendChild(document.createTextNode(after));

            parent.replaceChild(frag, node);
            highlightedAny = true;
          }
        });

        if (highlightedAny) {
          setHighlightCount((prev) => prev + 1);
        }
      }

      sel.removeAllRanges();
      setHasSelection(false);
    } catch (err) {
      console.warn("Could not highlight selection:", err);
      setHasSelection(false);
    }
  };

  const clearHighlights = () => {
    if (!passageContainerRef.current) return;
    const marks = passageContainerRef.current.querySelectorAll("mark.user-highlight");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
        parent.normalize();
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
      return (
        <div
          ref={passageContainerRef}
          onMouseUp={handleMouseUpPassage}
          className="passage-content-body font-inter text-forest-ink text-sm md:text-base leading-relaxed space-y-4 select-text"
          dangerouslySetInnerHTML={{ __html: passages }}
        />
      );
    }

    return (
      <div
        ref={passageContainerRef}
        onMouseUp={handleMouseUpPassage}
        className="passage-content-body font-inter text-forest-ink text-sm md:text-base leading-relaxed space-y-4 select-text"
      >
        {passages}
      </div>
    );
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
                    {/* Clear Highlights Button */}
                    {highlightCount > 0 && (
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={clearHighlights}
                        className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-mono font-bold flex items-center gap-1 hover:bg-rose-200 transition-colors cursor-pointer"
                        title="Clear all text highlights"
                      >
                        <X size={12} /> Clear ({highlightCount})
                      </button>
                    )}
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

            {/* Passage Scrollable Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 font-inter text-forest-ink leading-relaxed text-sm relative">
              {!isAudioPassage && hasSelection && (
                <div className="sticky top-2 z-30 flex justify-center animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={applyHighlight}
                    className="px-4 py-2 rounded-full bg-forest-ink text-highlighter-yellow shadow-xl text-xs font-mono font-bold border border-highlighter-yellow/40 flex items-center gap-2 hover:bg-forest-ink/90 active:scale-95 transition-all cursor-pointer"
                  >
                    <Highlighter size={14} className="text-highlighter-yellow" /> Highlight Selected Text
                  </button>
                </div>
              )}
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
