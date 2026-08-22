"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

// ─── Constants ────────────────────────────────────────────────────────────────
const MIN_WORDS = 50;
const MAX_WORDS = 1000;

// ─── Component ────────────────────────────────────────────────────────────────
export default function SubmitEssayPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Auth guard — redirect guests to login, preserving the return URL
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent("/writing-review/submit")}`);
    }
  }, [user, authLoading, router]);

  // ── Step state ──────────────────────────────────────────────────────────────
  type Step = "setup" | "content" | "preview" | "success";
  const [step, setStep] = useState<Step>("setup");

  // ── Form state ──────────────────────────────────────────────────────────────
  const [taskType, setTaskType] = useState<"task_1" | "task_2">("task_1");
  const [essayText, setEssayText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [notes, setNotes] = useState("");

  // ── UI state ────────────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successId, setSuccessId] = useState("");

  // ── Live word count ─────────────────────────────────────────────────────────
  useEffect(() => {
    const trimmed = essayText.trim();
    setWordCount(trimmed === "" ? 0 : trimmed.split(/\s+/).length);
  }, [essayText]);

  // ── Show auth loading screen ────────────────────────────────────────────────
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-cream-paper flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-9 h-9 text-forest-ink animate-spin mx-auto" />
          <p className="text-forest-ink/60 font-inter text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  // ── Step navigation ─────────────────────────────────────────────────────────
  const goNext = () => {
    setErrorMsg("");
    if (step === "setup") {
      setStep("content");
    } else if (step === "content") {
      if (wordCount < MIN_WORDS) {
        setErrorMsg(`Essay is too short — please write at least ${MIN_WORDS} words (current: ${wordCount}).`);
        return;
      }
      if (wordCount > MAX_WORDS) {
        setErrorMsg(`Essay exceeds the ${MAX_WORDS}-word limit (current: ${wordCount}). Please shorten your response.`);
        return;
      }
      setStep("preview");
    }
  };

  const goBack = () => {
    setErrorMsg("");
    if (step === "content") setStep("setup");
    else if (step === "preview") setStep("content");
  };

  // ── Submission ──────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg("");

    try {
      // Pre-allocate a Firestore document ID so the storage path stays coherent
      // if file support is added in the future.
      const docRef = doc(collection(db, "writingSubmissions"));

      await setDoc(docRef, {
        uid: user.uid,
        taskType,
        submissionMethod: "text",
        essayText,
        storagePath: null,
        fileName: null,
        fileSize: null,
        wordCount,
        notes: notes.trim() !== "" ? notes.trim() : null,
        status: "submitted",
        submittedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSuccessId(docRef.id);
      setStep("success");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg("Could not record your submission. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step indicator dots ─────────────────────────────────────────────────────
  const stepIndex = { setup: 0, content: 1, preview: 2, success: 3 };
  const stepLabel = { setup: "Step 1 · Task Selection", content: "Step 2 · Essay", preview: "Step 3 · Review" };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-cream-paper min-h-screen pt-24 pb-32">
      <AmbientBackground variant="cream" />

      <div className="container mx-auto px-6 max-w-2xl relative z-10 font-inter">

        {/* Back / cancel link */}
        {step !== "success" && (
          <div className="mb-6">
            <Link href="/writing-review">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-full border-pencil-gray/25 bg-white text-forest-ink hover:bg-whisper-gray font-semibold shadow-xs"
              >
                <ArrowLeft size={15} />
                Cancel
              </Button>
            </Link>
          </div>
        )}

        {/* ── Success screen ── */}
        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-pencil-gray/20 shadow-md text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#d8f3dc] border border-[#b7e4c7] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={30} className="text-forest-ink" />
            </div>
            <h1 className="text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight mb-3">
              Essay Submitted!
            </h1>
            <p className="text-forest-ink/70 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Your essay has been received. Our IELTS trainers will review it
              and send detailed corrections within 24–48 hours.
            </p>
            <p className="text-[10px] font-mono text-forest-ink/35 mb-8">
              Submission ID: {successId}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/profile">
                <Button variant="forest" className="w-full sm:w-auto h-11 px-8 font-semibold shadow-xs cursor-pointer">
                  View My Dashboard
                </Button>
              </Link>
              <Link href="/writing-review">
                <Button variant="forestOutline" className="w-full sm:w-auto h-11 px-8 font-semibold shadow-xs cursor-pointer">
                  Writing Review Info
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Multi-step form ── */}
        {step !== "success" && (
          <div className="bg-white rounded-3xl border border-pencil-gray/20 shadow-sm overflow-hidden">

            {/* Form header */}
            <div className="bg-whisper-gray/50 border-b border-pencil-gray/10 px-6 md:px-8 py-5 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold text-forest-ink font-bricolage tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Submit Your Essay
                </h1>
                <p className="text-[11px] text-forest-ink/50 mt-0.5 font-mono uppercase tracking-wide">
                  {stepLabel[step as keyof typeof stepLabel]}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      stepIndex[step as keyof typeof stepIndex] === i
                        ? "bg-forest-ink"
                        : stepIndex[step as keyof typeof stepIndex] > i
                        ? "bg-forest-ink/40"
                        : "bg-pencil-gray/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Error banner */}
              {errorMsg && (
                <div className="p-4 bg-[#fcd2c2]/20 border border-[#f8b195]/40 rounded-2xl flex items-start gap-2.5 text-xs text-[#cb5521]">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ── Step 1: Task selection ── */}
              {step === "setup" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <label className="block text-sm font-semibold text-forest-ink">
                    Which writing task are you submitting?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(["task_1", "task_2"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTaskType(t)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                          taskType === t
                            ? "bg-[#d8f3dc]/30 border-forest-ink/50 shadow-xs"
                            : "border-pencil-gray/20 hover:border-forest-ink/30 bg-white"
                        }`}
                      >
                        <span className="block font-bricolage text-base font-bold text-forest-ink">
                          {t === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                        </span>
                        <span className="block text-xs text-forest-ink/55 mt-1 font-inter">
                          {t === "task_1"
                            ? "Reports, charts, graphs, diagrams, or GT letters."
                            : "Academic essays and opinion / argument prompts."}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Essay textarea ── */}
              {step === "content" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="essay" className="text-sm font-semibold text-forest-ink">
                        Paste or type your essay
                      </label>
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded transition-colors ${
                          wordCount < MIN_WORDS || wordCount > MAX_WORDS
                            ? "bg-[#fcd2c2]/30 text-[#cb5521]"
                            : "bg-[#d8f3dc]/40 text-forest-ink"
                        }`}
                      >
                        {wordCount} / {MAX_WORDS} words
                      </span>
                    </div>
                    <textarea
                      id="essay"
                      className="w-full min-h-[320px] p-4 rounded-2xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 font-inter text-sm leading-relaxed resize-y"
                      placeholder="Paste your complete IELTS essay response here…"
                      value={essayText}
                      onChange={(e) => setEssayText(e.target.value)}
                    />
                    <div className="flex justify-between text-[10px] text-forest-ink/35 font-mono px-1">
                      <span>Minimum: {MIN_WORDS} words</span>
                      <span>Maximum: {MAX_WORDS} words</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-semibold text-forest-ink block">
                      Notes for the evaluator{" "}
                      <span className="font-normal text-forest-ink/45">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[90px] p-3 rounded-2xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 font-inter text-sm leading-relaxed resize-y"
                      placeholder="E.g. specific areas you'd like feedback on, the prompt you were given, or any concerns…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Preview ── */}
              {step === "preview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="p-5 bg-whisper-gray/30 border border-pencil-gray/20 rounded-2xl space-y-3 font-inter text-sm">
                    <h2 className="text-[11px] font-mono uppercase tracking-widest text-forest-ink/40 border-b border-pencil-gray/10 pb-2">
                      Submission Summary
                    </h2>
                    <div className="grid grid-cols-2 gap-y-2.5">
                      <span className="text-forest-ink/50">Task Type</span>
                      <span className="font-semibold text-forest-ink">
                        {taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                      </span>

                      <span className="text-forest-ink/50">Word Count</span>
                      <span className="font-semibold text-forest-ink font-mono">{wordCount} words</span>
                    </div>

                    {notes.trim() && (
                      <>
                        <div className="border-t border-pencil-gray/10 pt-3 text-forest-ink/50 text-xs">Notes for Evaluator</div>
                        <div className="text-xs text-forest-ink/75 italic whitespace-pre-wrap bg-white p-3 rounded-xl border border-pencil-gray/10 leading-relaxed">
                          {notes.trim()}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-3.5 bg-whisper-gray/30 border border-pencil-gray/15 rounded-2xl text-xs text-forest-ink/55 flex gap-2 leading-relaxed">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5 text-forest-ink/40" />
                    Submissions are locked once sent and cannot be edited or deleted. Please review before confirming.
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom action row */}
            <div className="bg-whisper-gray/25 border-t border-pencil-gray/10 px-6 md:px-8 py-5 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
              {step !== "setup" ? (
                <Button
                  onClick={goBack}
                  disabled={submitting}
                  variant="outline"
                  className="w-full sm:w-auto h-10 px-7 font-semibold cursor-pointer"
                >
                  Back
                </Button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {step === "preview" ? (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  variant="forest"
                  className="w-full sm:w-auto h-10 px-8 font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Confirm & Submit Essay"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  variant="forest"
                  className="w-full sm:w-auto h-10 px-8 font-semibold shadow-xs cursor-pointer"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
