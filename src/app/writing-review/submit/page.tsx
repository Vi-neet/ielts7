"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileText,
  CreditCard,
  PenTool,
  Award,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  ShieldCheck
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

  // Load Razorpay Checkout Script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      <div className="min-h-screen bg-cream-paper flex items-center justify-center font-inter">
        <div className="text-center space-y-3">
          <Loader2 className="w-9 h-9 text-forest-ink animate-spin mx-auto" />
          <p className="text-forest-ink/60 text-sm font-semibold">Verifying session credentials…</p>
        </div>
      </div>
    );
  }

  // ── Target words based on task ──────────────────────────────────────────────
  const targetWords = taskType === "task_1" ? 150 : 250;

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

  // ── Secure Submission ────────────────────────────────────────────────────────
  const submitEssayWithPayment = async (paymentId: string) => {
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          paymentId,
          taskType,
          essayText,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessId(data.submissionId);
        setStep("success");
      } else {
        setErrorMsg(data.error || "Verification failed. Please check your payment status.");
      }
    } catch (err) {
      console.error("Verification POST failed:", err);
      setErrorMsg("Failed to confirm your payment with the server. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentAndSubmit = async () => {
    if (typeof window === "undefined" || !(window as any).Razorpay) {
      setErrorMsg("Payment gateway is initializing, please try again in a few seconds.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      setErrorMsg("Payment gateway is temporarily unavailable. Please contact support.");
      setSubmitting(false);
      return;
    }

    try {
      const options = {
        key: keyId,
        amount: 4900, // ₹49 in paise
        currency: "INR",
        name: "IELTS 7+ House",
        description: `Writing Evaluation (${taskType === "task_1" ? "Task 1" : "Task 2"})`,
        image: "/icon.webp",
        handler: async function (response: any) {
          const paymentId = response.razorpay_payment_id;
          if (paymentId) {
            await submitEssayWithPayment(paymentId);
          } else {
            setErrorMsg("Payment captured, but transaction ID is missing.");
            setSubmitting(false);
          }
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        theme: {
          color: "#1a3300",
        },
        modal: {
          ondismiss: function () {
            setErrorMsg("Payment window closed. Please complete payment to submit your essay.");
            setSubmitting(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Razorpay trigger error:", err);
      setErrorMsg("Could not connect to Razorpay checkout. Please try again.");
      setSubmitting(false);
    }
  };

  // ── Step metadata ────────────────────────────────────────────────────────────
  const stepsList = [
    { id: "setup", label: "Task Type", num: "1" },
    { id: "content", label: "Write Essay", num: "2" },
    { id: "preview", label: "Review & Checkout", num: "3" },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#faf9f5] min-h-screen pt-12 pb-24 font-inter text-forest-ink relative overflow-x-hidden">
      <AmbientBackground variant="cream" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 space-y-6">

        {/* Back / cancel link */}
        {step !== "success" && (
          <div className="flex items-center justify-between">
            <Link href="/writing-review">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-2xl border-forest-ink/15 bg-white text-forest-ink hover:bg-forest-ink/5 font-semibold shadow-2xs cursor-pointer text-xs"
              >
                <ArrowLeft size={14} />
                Back to Overview
              </Button>
            </Link>
            <span className="text-xs font-mono text-forest-ink/50">
              Logged in as: <strong className="text-forest-ink font-semibold">{user.email}</strong>
            </span>
          </div>
        )}

        {/* ── Success screen ── */}
        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-forest-ink/10 shadow-lg text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300/50 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={32} className="text-emerald-700" />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-200">
                Payment Verified · ₹49
              </span>
              <h1 className="text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight pt-2">
                Essay Submitted Successfully!
              </h1>
              <p className="text-forest-ink/70 text-sm max-w-md mx-auto leading-relaxed">
                Your payment was confirmed and your essay has been queued for certified IELTS evaluation. Line-by-line feedback will be sent directly to your candidate dashboard within 24–48 hours.
              </p>
            </div>

            <div className="p-3 bg-[#faf9f5] rounded-xl border border-forest-ink/10 text-xs font-mono text-forest-ink/50 max-w-sm mx-auto truncate">
              Submission ID: {successId}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/profile">
                <Button variant="forest" className="w-full sm:w-auto h-11 px-8 font-semibold rounded-2xl shadow-xs cursor-pointer">
                  View My Profile Dashboard
                </Button>
              </Link>
              <Link href="/writing-review">
                <Button variant="forestOutline" className="w-full sm:w-auto h-11 px-8 font-semibold rounded-2xl shadow-xs cursor-pointer">
                  Submit Another Essay
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Multi-step form container ── */}
        {step !== "success" && (
          <div className="bg-white rounded-3xl border border-forest-ink/10 shadow-md overflow-hidden space-y-0">

            {/* Stepper Header */}
            <div className="bg-forest-ink text-white px-6 md:px-8 py-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                    Writing Evaluation Portal
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white font-bricolage tracking-tight flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-emerald-300" />
                    Submit Essay for Review
                  </h1>
                </div>

                {/* Styled Stepper Badges */}
                <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15">
                  {stepsList.map((st, i) => {
                    const active = step === st.id;
                    const passed = stepsList.findIndex((s) => s.id === step) > i;
                    return (
                      <div
                        key={st.id}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                          active
                            ? "bg-white text-forest-ink shadow-xs"
                            : passed
                            ? "text-emerald-300 bg-white/10"
                            : "text-white/40"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          active ? "bg-forest-ink text-white" : "bg-white/20"
                        }`}>
                          {st.num}
                        </span>
                        <span className="hidden sm:inline">{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Error banner */}
              {errorMsg && (
                <div className="p-4 bg-terracotta/10 border border-terracotta/30 rounded-2xl flex items-start gap-3 text-xs text-terracotta font-medium">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ── Step 1: Task selection ── */}
              {step === "setup" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div>
                    <h2 className="text-base font-bold text-forest-ink font-bricolage">
                      Step 1: Select Writing Task Type
                    </h2>
                    <p className="text-xs text-forest-ink/60 mt-0.5">
                      Choose whether your response is an Academic/GT Task 1 report or Task 2 essay.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        type: "task_1" as const,
                        title: "Writing Task 1",
                        desc: "Visual reports, bar charts, line graphs, process diagrams, or GT formal/informal letters.",
                        target: "Min 150 words recommended",
                        icon: BookOpen,
                      },
                      {
                        type: "task_2" as const,
                        title: "Writing Task 2",
                        desc: "Academic essay responses (Agree/Disagree, Discuss Both Views, Cause & Effect).",
                        target: "Min 250 words recommended",
                        icon: FileText,
                      },
                    ].map((item) => {
                      const selected = taskType === item.type;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.type}
                          onClick={() => setTaskType(item.type)}
                          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-3 relative overflow-hidden ${
                            selected
                              ? "bg-[#f4faee] border-emerald-600/40 ring-2 ring-emerald-600/20 shadow-xs"
                              : "border-forest-ink/10 hover:border-forest-ink/20 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              selected ? "bg-emerald-700 text-white" : "bg-forest-ink/5 text-forest-ink/60"
                            }`}>
                              <Icon size={20} />
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-forest-ink/5 border border-forest-ink/10 text-forest-ink/70">
                              ₹49 per review
                            </span>
                          </div>
                          <div>
                            <span className="font-extrabold font-bricolage text-base text-forest-ink block">
                              {item.title}
                            </span>
                            <span className="text-xs text-forest-ink/65 block mt-1 leading-relaxed">
                              {item.desc}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-forest-ink/5 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-forest-ink/50">{item.target}</span>
                            {selected && <CheckCircle2 size={15} className="text-emerald-700" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Essay textarea & live word counter ── */}
              {step === "content" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-bold text-forest-ink font-bricolage">
                          Step 2: Paste or Type Your Essay
                        </h2>
                        <p className="text-xs text-forest-ink/60 mt-0.5">
                          {taskType === "task_1" ? "Writing Task 1 Response" : "Writing Task 2 Response"}
                        </p>
                      </div>

                      {/* Word count pill */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl transition-colors ${
                            wordCount < MIN_WORDS
                              ? "bg-terracotta/10 text-terracotta border border-terracotta/20"
                              : wordCount >= targetWords
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300/60"
                              : "bg-forest-ink/8 text-forest-ink border border-forest-ink/10"
                          }`}
                        >
                          {wordCount} words
                        </span>
                      </div>
                    </div>

                    <textarea
                      id="essay"
                      className="w-full min-h-[320px] p-4 sm:p-5 rounded-2xl border border-forest-ink/20 focus:outline-none focus:border-forest-ink focus:ring-2 focus:ring-forest-ink/10 font-inter text-sm leading-relaxed resize-y bg-[#faf9f5]"
                      placeholder={`Paste your complete ${taskType === "task_1" ? "Task 1 report/letter" : "Task 2 essay"} response here…`}
                      value={essayText}
                      onChange={(e) => setEssayText(e.target.value)}
                    />

                    <div className="flex items-center justify-between text-[11px] text-forest-ink/45 font-mono px-1">
                      <span>Minimum requirement: {MIN_WORDS} words</span>
                      <span>Target: {targetWords}+ words</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-forest-ink/8">
                    <label htmlFor="notes" className="text-xs font-bold text-forest-ink block">
                      Notes for Trainer / Evaluator <span className="font-normal text-forest-ink/50">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[80px] p-3 rounded-2xl border border-forest-ink/15 focus:outline-none focus:border-forest-ink font-inter text-xs leading-relaxed resize-y bg-white"
                      placeholder="E.g. specific areas you want feedback on (e.g. paragraphing, vocabulary, task response)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Review & Checkout ── */}
              {step === "preview" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div>
                    <h2 className="text-base font-bold text-forest-ink font-bricolage">
                      Step 3: Confirm & Complete Evaluation Order
                    </h2>
                    <p className="text-xs text-forest-ink/60 mt-0.5">
                      Review your submission details before proceeding to instant Razorpay checkout.
                    </p>
                  </div>

                  <div className="p-5 bg-[#faf9f5] border border-forest-ink/10 rounded-2xl space-y-4 font-inter text-xs">
                    <div className="flex items-center justify-between border-b border-forest-ink/10 pb-3">
                      <span className="font-mono text-[10px] uppercase font-bold text-forest-ink/50">Item Summary</span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Total: ₹49 INR
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <span className="text-forest-ink/55">Candidate Email</span>
                      <span className="font-semibold text-forest-ink font-mono truncate">{user.email}</span>

                      <span className="text-forest-ink/55">Task Type</span>
                      <span className="font-bold text-forest-ink capitalize">
                        {taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                      </span>

                      <span className="text-forest-ink/55">Word Count</span>
                      <span className="font-semibold text-forest-ink font-mono">{wordCount} words</span>
                    </div>

                    {notes.trim() && (
                      <div className="pt-2 border-t border-forest-ink/8 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-forest-ink/45 block">Trainer Notes</span>
                        <p className="text-xs text-forest-ink/75 italic bg-white p-2.5 rounded-xl border border-forest-ink/8">
                          "{notes.trim()}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-2xl text-xs text-emerald-900 flex items-center gap-3">
                    <ShieldCheck size={20} className="shrink-0 text-emerald-700" />
                    <p className="leading-snug">
                      Includes line-by-line annotations, band score calculations, and candidate dashboard access.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="bg-[#faf9f5] border-t border-forest-ink/10 px-6 md:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between items-center font-inter">
              {step !== "setup" ? (
                <Button
                  onClick={goBack}
                  disabled={submitting}
                  variant="outline"
                  className="w-full sm:w-auto h-10 px-6 font-semibold rounded-xl cursor-pointer text-xs"
                >
                  Back
                </Button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {step === "preview" ? (
                <Button
                  onClick={handlePaymentAndSubmit}
                  disabled={submitting}
                  variant="forest"
                  className="w-full sm:w-auto h-11 px-8 font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing Verification…
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Pay ₹49 & Submit Essay
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  variant="forest"
                  className="w-full sm:w-auto h-10 px-8 font-semibold rounded-xl shadow-xs cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <span>Continue to {step === "setup" ? "Essay" : "Review"}</span>
                  <ArrowRight size={14} />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
