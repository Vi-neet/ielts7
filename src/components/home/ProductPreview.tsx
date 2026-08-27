"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Headphones,
  PenTool,
  MessageCircle,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  Sparkles,
  Volume2,
  Mic,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type SkillType = "reading" | "listening" | "writing" | "speaking";

interface ProductPreviewProps {
  activeSkill?: SkillType;
}

export default function ProductPreview({ activeSkill = "listening" }: ProductPreviewProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  return (
    <div className="relative w-full max-w-[960px] mx-auto mt-8 md:mt-12">
      {/* Floating Dynamic Score Badges */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${activeSkill}`}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-6 -right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-ink text-white shadow-2xl rotate-3 transform origin-bottom-left border border-white/10 hidden md:flex"
        >
          <Award className="w-4 h-4 text-highlighter-yellow" />
          <span className="font-bricolage font-bold tracking-wide">
            {activeSkill === "listening"
              ? "Listening Practice"
              : activeSkill === "reading"
              ? "Reading Passage"
              : activeSkill === "writing"
              ? "Writing Review"
              : "Speaking Simulator"}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-5 -left-5 z-20 px-4 py-2.5 rounded-xl bg-white text-forest-ink shadow-xl -rotate-2 transform origin-top-right border border-pencil-gray/20 hidden md:block">
        <span className="font-roboto-mono text-sm font-semibold block leading-none">
          {activeSkill === "listening" ? "04:12" : activeSkill === "speaking" ? "01:45" : "52:30"}
        </span>
        <span className="font-inter text-[10px] text-pencil-gray uppercase tracking-wider block mt-1">
          {activeSkill === "listening" ? "Audio Time" : activeSkill === "speaking" ? "Recording" : "Time Remaining"}
        </span>
      </div>

      <div
        className="w-full rounded-[16px] overflow-hidden border border-pencil-gray/30 bg-white relative z-10 shadow-2xl transition-all duration-500"
        style={{
          boxShadow: "0 25px 50px -12px rgba(26, 51, 0, 0.12), 0 0 0 1px rgba(26, 51, 0, 0.05)",
        }}
      >
        {/* Dynamic Card Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-cream-paper border-b border-pencil-gray/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-forest-ink text-white">
              {activeSkill === "listening" && <Headphones className="w-4 h-4 text-highlighter-yellow" />}
              {activeSkill === "reading" && <BookOpen className="w-4 h-4 text-highlighter-yellow" />}
              {activeSkill === "writing" && <PenTool className="w-4 h-4 text-highlighter-yellow" />}
              {activeSkill === "speaking" && <MessageCircle className="w-4 h-4 text-highlighter-yellow" />}
            </div>
            <div>
              <span className="font-inter text-[14px] font-bold text-forest-ink">
                {activeSkill === "listening"
                  ? "IELTS Listening Test"
                  : activeSkill === "reading"
                  ? "IELTS Reading Test"
                  : activeSkill === "writing"
                  ? "IELTS Writing Review"
                  : "IELTS Speaking Simulator"}
              </span>
              <span className="ml-2.5 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-forest-ink/5 text-forest-ink/70">
                {activeSkill === "listening"
                  ? "Cambridge 20 • Section 2"
                  : activeSkill === "reading"
                  ? "Academic • Passage 1"
                  : activeSkill === "writing"
                  ? "Task 2 • Instant Feedback"
                  : "Part 2 • Cue Card"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-ink/5 text-xs font-mono font-bold text-forest-ink">
              <Sparkles size={13} className="text-forest-ink" /> IELTS 7+ Prep
            </div>
          </div>
        </div>

        {/* Dynamic Card Content View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-[320px] bg-white flex flex-col justify-between"
          >
            {/* 1. LISTENING VIEW */}
            {activeSkill === "listening" && (
              <div className="p-6 space-y-6">
                {/* Embedded Audio Player Widget */}
                <div className="bg-forest-ink rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-12 h-12 rounded-xl bg-highlighter-yellow text-forest-ink flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                      {isPlayingAudio ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <div>
                      <p className="text-sm font-bold text-white font-bricolage">Audio Track 2 — Event Locations & Map</p>
                      <p className="text-xs font-mono text-white/60">04:12 / 28:00 • Clear British Accent</p>
                    </div>
                  </div>

                  {/* Equalizer Waveform animation */}
                  <div className="flex items-center gap-1.5 h-8">
                    {[40, 70, 30, 90, 60, 100, 50, 80, 40, 70, 90, 30, 60].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isPlayingAudio ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : "20%" }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.08, ease: "easeInOut" }}
                        className="w-1.5 rounded-full bg-highlighter-yellow"
                      />
                    ))}
                  </div>
                </div>

                {/* Multi-Select Question Preview */}
                <div className="bg-[#fcfaf5] rounded-2xl p-5 border border-forest-ink/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-ink/60">
                      Questions 17 & 18 • Multi-Select
                    </span>
                    <span className="text-xs font-inter font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      ✓ Choose TWO letters
                    </span>
                  </div>
                  <p className="text-sm font-bold font-inter text-forest-ink">
                    Which TWO facilities were added during the recent central atrium renovation?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {[
                      { letter: "A", text: "Interactive Information Kiosk", selected: true },
                      { letter: "B", text: "Expanded Outdoor Seating Area", selected: false },
                      { letter: "C", text: "Automated Ticket Machine", selected: false },
                      { letter: "E", text: "Central Escalator System", selected: true },
                    ].map((opt) => (
                      <div
                        key={opt.letter}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium font-inter transition-all ${
                          opt.selected
                            ? "bg-purple-700 text-white border-purple-800 font-bold shadow-sm"
                            : "bg-white text-forest-ink border-forest-ink/15"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold ${
                            opt.selected ? "bg-white text-purple-900" : "bg-forest-ink/5 text-forest-ink"
                          }`}
                        >
                          {opt.letter}
                        </span>
                        <span>{opt.text}</span>
                        {opt.selected && <CheckCircle2 size={16} className="ml-auto text-white shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. READING VIEW */}
            {activeSkill === "reading" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-forest-ink/10">
                <div className="p-5 md:border-r border-pencil-gray/15 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-pencil-gray uppercase tracking-wider">
                    Passage Excerpt — Urban Agriculture
                  </span>
                  <p className="text-xs leading-relaxed text-forest-ink/80 font-inter">
                    Vertical farming relies on controlled-environment agriculture to optimize plant growth. <span className="bg-highlighter-yellow/60 px-1 font-bold text-forest-ink rounded">Hydroponics and aeroponics</span> allow crops to be cultivated without soil, reducing water usage by up to 95%.
                  </p>
                  <p className="text-xs leading-relaxed text-forest-ink/60 font-inter">
                    Recent studies demonstrate that indoor LED light spectrums can accelerate photosynthesis, resulting in year-round harvests...
                  </p>
                </div>
                <div className="p-5 bg-cream-paper/50 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-forest-ink/60 uppercase tracking-wider">
                    Question 3 — True / False / Not Given
                  </span>
                  <p className="text-xs font-bold text-forest-ink font-inter leading-snug">
                    Hydroponic systems require significantly less water than traditional soil farming.
                  </p>
                  <div className="space-y-2 pt-1">
                    {[
                      { label: "TRUE", selected: true },
                      { label: "FALSE", selected: false },
                      { label: "NOT GIVEN", selected: false },
                    ].map((opt) => (
                      <div
                        key={opt.label}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                          opt.selected
                            ? "bg-forest-ink text-white border-forest-ink shadow-sm"
                            : "bg-white text-forest-ink border-forest-ink/15"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.selected && <CheckCircle2 size={16} className="text-highlighter-yellow" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. WRITING VIEW */}
            {activeSkill === "writing" && (
              <div className="p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider">
                      Writing Feedback & Analysis
                    </span>
                    <h4 className="text-base font-extrabold font-bricolage text-purple-950">
                      Task 2 Essay Review — Cohesion & Vocabulary Focus
                    </h4>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-900 text-white font-mono text-xs font-bold shrink-0">
                    <Sparkles size={14} className="text-highlighter-yellow" /> Task 2 Review
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-forest-ink/15 p-4 space-y-3 font-inter text-xs leading-relaxed text-forest-ink/80">
                  <p>
                    "<span className="bg-emerald-100 text-emerald-900 px-1 font-semibold rounded border border-emerald-300">Furthermore, transitioning to renewable power grids</span> is not merely an environmental imperative, but a catalyst for sustained economic resilience. <span className="bg-purple-100 text-purple-900 px-1 font-semibold rounded border border-purple-300">While skeptics contend that initial infrastructure costs are prohibitive</span>, long-term yield analysis contradicts this notion."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                    <span className="font-mono font-bold block mb-0.5">✦ Lexical Resource</span>
                    Advanced vocabulary & collocations
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs">
                    <span className="font-mono font-bold block mb-0.5">✦ Coherence & Cohesion</span>
                    Fluent paragraph transitions
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                    <span className="font-mono font-bold block mb-0.5">✦ Grammar Accuracy</span>
                    Complex clause structures
                  </div>
                </div>
              </div>
            )}

            {/* 4. SPEAKING VIEW */}
            {activeSkill === "speaking" && (
              <div className="p-6 space-y-5">
                <div className="bg-forest-ink text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30 animate-pulse">
                      <Mic size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-bricolage text-white">Live Simulator Recording</h4>
                      <p className="text-xs font-mono text-white/60">Speaking Part 2 • Cue Card Presentation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-highlighter-yellow font-mono font-bold text-sm">
                      01:45 / 02:00
                    </div>
                  </div>
                </div>

                <div className="bg-[#fcfaf5] rounded-2xl p-5 border border-forest-ink/15 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-ink/60">
                    Cue Card Topic
                  </span>
                  <p className="text-sm font-bold text-forest-ink font-inter">
                    Describe an educational trip or journey that had a lasting impact on your choice of career.
                  </p>
                  <ul className="text-xs font-inter text-forest-ink/75 space-y-1 list-disc pl-4 pt-1">
                    <li>Where you went and who accompanied you</li>
                    <li>What key insights or activities stood out</li>
                    <li>Why this experience influenced your career direction</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer: Progress bar */}
        <div className="px-5 py-3 border-t border-pencil-gray/15 bg-cream-paper/80 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 h-2 rounded-full bg-whisper-gray overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-highlighter-yellow via-emerald-500 to-forest-ink transition-all duration-500"
                style={{
                  width:
                    activeSkill === "listening"
                      ? "45%"
                      : activeSkill === "reading"
                      ? "25%"
                      : activeSkill === "writing"
                      ? "85%"
                      : "65%",
                }}
              />
            </div>
            <span className="text-[12px] font-mono font-bold text-forest-ink/60 uppercase">
              {activeSkill} Prep
            </span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[13px] font-inter font-bold text-forest-ink">
              Band 7.0+ Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
