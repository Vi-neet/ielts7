"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt, GradeResult, formatAnswer, getAcceptableAnswers } from "@/lib/scoring";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { AnswerContext } from "./AnswerContext";
import { TestMetadata } from "@/data/tests/testRegistry";
import TestHeader from "./TestHeader";
import QuestionNavigator from "./QuestionNavigator";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Props ────────────────────────────────────────────────────────────────────

interface TestRunnerProps {
  testId: string;
  testType: string;
  testName: string;
  passages: React.ReactNode | string;
  questions: React.ReactNode | string;
  answerKey: Record<number, string | string[]>;
  mode: "practice" | "exam";
  /** Total exam duration in seconds (ignored in practice mode) */
  examDurationSeconds: number;
}

// ─── DOM utilities ────────────────────────────────────────────────────────────

/** Walk the DOM near an input to discover its question number */
function findQuestionNumberForInput(
  inputEl: HTMLInputElement,
  container: HTMLElement
): number | null {
  const nameOrId = inputEl.name || inputEl.id || "";
  const nameMatch = nameOrId.match(/question(\d+)|q(\d+)/i);
  if (nameMatch) {
    const num = parseInt(nameMatch[1] || nameMatch[2], 10);
    if (num >= 1 && num <= 40) return num;
  }

  const isQuestionNumberText = (text: string) => {
    const clean = text.trim();
    const match = clean.match(/^[\(]?\s*(\d+)\s*[\.\:\)]?$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 40) return num;
    }
    return null;
  };

  // Backward search
  let current: Node | null = inputEl;
  let prevNum: number | null = null;
  let prevSteps = 0;
  while (current && prevSteps < 30) {
    if (current.previousSibling) {
      current = current.previousSibling;
      while (current.lastChild) current = current.lastChild;
    } else {
      current = current.parentNode;
      if (!current || current === container) break;
      continue;
    }
    prevSteps++;
    let num: number | null = null;
    if (current.nodeType === Node.TEXT_NODE) num = isQuestionNumberText(current.nodeValue || "");
    else if (current.nodeType === Node.ELEMENT_NODE)
      num = isQuestionNumberText((current as HTMLElement).textContent || "");
    if (num !== null) { prevNum = num; break; }
  }

  // Forward search
  current = inputEl;
  let nextNum: number | null = null;
  let nextSteps = 0;
  while (current && nextSteps < 30) {
    if (current.nextSibling) {
      current = current.nextSibling;
      while (current.firstChild) current = current.firstChild;
    } else {
      current = current.parentNode;
      if (!current || current === container) break;
      continue;
    }
    nextSteps++;
    let num: number | null = null;
    if (current.nodeType === Node.TEXT_NODE) num = isQuestionNumberText(current.nodeValue || "");
    else if (current.nodeType === Node.ELEMENT_NODE)
      num = isQuestionNumberText((current as HTMLElement).textContent || "");
    if (num !== null) { nextNum = num; break; }
  }

  if (prevNum !== null && nextNum !== null)
    return prevSteps <= nextSteps ? prevNum : nextNum;
  return prevNum !== null ? prevNum : nextNum;
}

// ─── Band score (kept inline — do not change scoring.ts) ─────────────────────

function getBandScore(score: number, testType: string): string {
  const isAcademic = testType === "academic_reading";
  const isListening = testType === "listening";

  if (isListening) {
    if (score >= 39) return "9.0"; if (score >= 37) return "8.5";
    if (score >= 35) return "8.0"; if (score >= 32) return "7.5";
    if (score >= 30) return "7.0"; if (score >= 27) return "6.5";
    if (score >= 23) return "6.0"; if (score >= 20) return "5.5";
    if (score >= 16) return "5.0"; if (score >= 13) return "4.5";
    if (score >= 10) return "4.0"; return "3.5";
  }
  if (isAcademic) {
    if (score >= 39) return "9.0"; if (score >= 37) return "8.5";
    if (score >= 35) return "8.0"; if (score >= 33) return "7.5";
    if (score >= 30) return "7.0"; if (score >= 27) return "6.5";
    if (score >= 23) return "6.0"; if (score >= 19) return "5.5";
    if (score >= 15) return "5.0"; if (score >= 13) return "4.5";
    if (score >= 10) return "4.0"; return "3.5";
  }
  if (score >= 40) return "9.0"; if (score >= 39) return "8.5";
  if (score >= 37) return "8.0"; if (score >= 36) return "7.5";
  if (score >= 34) return "7.0"; if (score >= 32) return "6.5";
  if (score >= 30) return "6.0"; if (score >= 27) return "5.5";
  if (score >= 23) return "5.0"; if (score >= 19) return "4.5";
  if (score >= 15) return "4.0"; return "3.5";
}

// ─── Test type label ──────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  general_reading: "General Reading",
  academic_reading: "Academic Reading",
  listening: "Listening",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TestRunner({
  testId,
  testType,
  testName,
  passages,
  questions,
  answerKey,
  mode,
  examDurationSeconds,
}: TestRunnerProps) {
  const { user, loading: authLoading } = useAuth();

  // ── Refs ──
  const containerRef = useRef<HTMLDivElement>(null);
  const inputToQuestionMap = useRef<Map<HTMLInputElement, number>>(new Map());
  const autoSubmitCalledRef = useRef(false);

  // ── Core test state ──
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [reviewMode, setReviewMode] = useState<"summary" | "context">("summary");

  // ── Practice mode state ──
  // Map of question number → whether it was correct (undefined = not yet checked)
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);

  // ── Reading layout state ──
  const [passageCollapsed, setPassageCollapsed] = useState(false);

  // ── Exam timer state ──
  const [timeRemaining, setTimeRemaining] = useState(
    mode === "exam" ? examDurationSeconds : 0
  );
  const [timerExpired, setTimerExpired] = useState(false);

  const isListening = testType === "listening";
  const questionNumbers = Object.keys(answerKey)
    .map(Number)
    .sort((a, b) => a - b);
  const totalQuestions = questionNumbers.length;
  const answeredCount = questionNumbers.filter((n) => answers[n]?.trim()).length;

  // ─── Timer — Exam mode only, starts on mount ──────────────────────────────
  useEffect(() => {
    if (mode !== "exam") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); // intentionally empty — starts once on mount

  // Stop timer display update after manual submission
  // (interval reference is scoped inside the effect above, so it cleans up on unmount)

  // ─── Auto-submit when timer expires ──────────────────────────────────────
  useEffect(() => {
    if (
      timerExpired &&
      !autoSubmitCalledRef.current &&
      !isSubmitted &&
      !submitting
    ) {
      autoSubmitCalledRef.current = true;
      handleFormSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerExpired]);

  // ─── DOM: Scan inputs and register event listeners ────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const textInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input:not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="hidden"])'
    );
    const radioInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );

    inputToQuestionMap.current.clear();

    textInputs.forEach((input) => {
      const num = findQuestionNumberForInput(input, container);
      if (num) {
        inputToQuestionMap.current.set(input, num);
        input.value = answers[num] || "";
        input.disabled = isSubmitted;
      }
    });

    radioInputs.forEach((radio) => {
      const num = findQuestionNumberForInput(radio, container);
      if (num) {
        inputToQuestionMap.current.set(radio, num);
        let answerValue = radio.value;
        const label = container.querySelector<HTMLElement>(`label[for="${radio.id}"]`);
        if (label) {
          const text = label.textContent?.trim() || "";
          const match = text.match(/^([A-D])\b/i);
          answerValue = match ? match[1].toUpperCase() : text;
        }
        (radio as HTMLInputElement & { _mappedValue?: string })._mappedValue = answerValue;
        radio.checked = answers[num] === answerValue;
        radio.disabled = isSubmitted;
      }
    });

    const handleInputEvent = (e: Event) => {
      if (isSubmitted) return;
      const target = e.target as HTMLInputElement & { _mappedValue?: string };
      const num = inputToQuestionMap.current.get(target);
      if (num) {
        const val =
          target.type === "radio"
            ? target._mappedValue || target.value
            : target.value;
        setAnswers((prev) => ({ ...prev, [num]: val }));
      }
    };

    container.addEventListener("input", handleInputEvent);
    container.addEventListener("change", handleInputEvent);

    return () => {
      container.removeEventListener("input", handleInputEvent);
      container.removeEventListener("change", handleInputEvent);
    };
  }, [questions, isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── DOM: Sync state back to inputs ──────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const textInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input:not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="hidden"])'
    );
    textInputs.forEach((input) => {
      const num = inputToQuestionMap.current.get(input);
      if (num) {
        input.value = answers[num] || "";
        input.disabled = isSubmitted;
      }
    });

    const radioInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    radioInputs.forEach((radio) => {
      const num = inputToQuestionMap.current.get(radio);
      if (num) {
        const val =
          (radio as HTMLInputElement & { _mappedValue?: string })._mappedValue ||
          radio.value;
        radio.checked = answers[num] === val;
        radio.disabled = isSubmitted;
      }
    });
  }, [answers, isSubmitted]);

  // ─── Answer setter ────────────────────────────────────────────────────────
  const setAnswer = (num: number, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [num]: val }));
  };

  // ─── Practice: Check a single answer ─────────────────────────────────────
  const checkAnswer = useCallback(
    (num: number) => {
      if (checkedQuestions[num] !== undefined) return;
      const studentAns = (answers[num] || "").trim().toLowerCase();
      const acceptable = getAcceptableAnswers(answerKey[num]);
      const isCorrect =
        studentAns !== "" && acceptable.some((opt) => opt === studentAns);
      setCheckedQuestions((prev) => ({ ...prev, [num]: isCorrect }));
    },
    [answers, answerKey, checkedQuestions]
  );

  // ─── Navigator: scroll to question in DOM ────────────────────────────────
  const scrollToQuestion = useCallback((num: number) => {
    if (!containerRef.current) return;
    for (const [input, mappedNum] of inputToQuestionMap.current) {
      if (mappedNum === num) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        try { input.focus({ preventScroll: true }); } catch (_) { /* ignore */ }
        break;
      }
    }
  }, []);

  const handleNavigate = (num: number) => {
    setCurrentQuestion(num);
    scrollToQuestion(num);
  };

  // ─── Submission ───────────────────────────────────────────────────────────
  const handleFormSubmit = async () => {
    if (isSubmitted || submitting) return;

    if (!user && !ALLOW_GUEST_TESTS) {
      alert("Guest test-taking is disabled. Please sign in to submit.");
      return;
    }

    setSubmitting(true);
    const gradeResult = gradeAttempt(answers, answerKey);
    setResults(gradeResult);

    try {
      const attemptData = {
        uid: user ? user.uid : null,
        isGuest: !user,
        testId,
        testType,
        answers,
        score: gradeResult.score,
        total: gradeResult.total,
        submittedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "attempts"), attemptData);
      setSaveStatus("saved");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to save attempt to Firestore:", error);
      setSaveStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Retake ───────────────────────────────────────────────────────────────
  const handleRetake = () => {
    setAnswers({});
    setResults(null);
    setSaveStatus("idle");
    setIsSubmitted(false);
    setReviewMode("summary");
    setCheckedQuestions({});
    setCurrentQuestion(null);
    setPassageCollapsed(false);
    // Timer is not reset on retake — for exam mode, user would need to navigate back
    // and start a new exam via the mode selector (which remounts this component).
  };

  // ─── Next test routing ────────────────────────────────────────────────────
  const getNextTestId = () => {
    const currentMeta = TestMetadata[testId as keyof typeof TestMetadata];
    if (!currentMeta) return null;
    const sorted = Object.entries(TestMetadata)
      .filter(([_, m]) => m.type === currentMeta.type)
      .sort((a, b) => {
        if (a[1].book !== b[1].book) return a[1].book - b[1].book;
        return a[1].testNumber - b[1].testNumber;
      });
    const idx = sorted.findIndex(([id]) => id === testId);
    if (idx !== -1 && idx < sorted.length - 1) return sorted[idx + 1][0];
    return null;
  };

  // ─── Auth loading ─────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
        <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-2" />
        <span className="text-forest-ink/65 font-inter text-sm">Loading test content...</span>
      </div>
    );
  }

  // ─── Guest guard ──────────────────────────────────────────────────────────
  if (!user && !ALLOW_GUEST_TESTS) {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-sticky-note-blush/30 flex items-center justify-center mb-6 border border-pencil-gray/10">
            <AlertTriangle className="text-forest-ink h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold font-bricolage text-forest-ink mb-4">
            Sign In Required
          </h2>
          <p className="text-forest-ink/75 font-inter mb-8 max-w-md">
            Guest test-taking is currently disabled. Please sign in to access the test,
            submit answers, and receive detailed scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href={`/login?redirect=${encodeURIComponent(`/tests/${testType}/${testId}`)}`}
              className="w-full sm:w-auto"
            >
              <Button variant="forest" className="w-full sm:w-auto px-8 h-11">
                Sign In to Start
              </Button>
            </Link>
            <Link
              href={`/signup?redirect=${encodeURIComponent(`/tests/${testType}/${testId}`)}`}
              className="w-full sm:w-auto"
            >
              <Button variant="forestOutline" className="w-full sm:w-auto px-8 h-11">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Results: context review (read-only test sheet) ───────────────────────
  if (isSubmitted && results && reviewMode === "context") {
    const bandScore = getBandScore(results.score, testType);
    return (
      <div className="container mx-auto pt-8 pb-16 px-4 md:px-8 bg-cream-paper min-h-screen">
        <div className="pb-6 mb-8 border-b border-pencil-gray/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/tests/${testType}`}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-full border-pencil-gray/20 bg-white text-forest-ink hover:bg-whisper-gray font-inter shadow-sm cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>All Tests</span>
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight">
              Test Review: {testName}
            </h1>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 border border-pencil-gray/25 shadow-xs">
            <button
              onClick={() => setReviewMode("summary")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
            >
              Score Summary &amp; Questions
            </button>
            <button
              onClick={() => setReviewMode("context")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer bg-forest-ink text-white shadow-xs"
            >
              View Test Sheet (Read-Only)
            </button>
          </div>
        </div>

        <AnswerContext.Provider
          value={{ answers, setAnswer, disabled: true, isSubmitted: true }}
        >
          <div className="w-full">
            {isListening && passages && (
              <div className="audio-player-container mb-6 bg-white rounded-2xl border border-pencil-gray/25 p-4 shadow-xs">
                <audio controls className="w-full">
                  <source src={passages as string} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {isListening ? (
              <div className="h-full rounded-2xl bg-white shadow-sm border border-pencil-gray/20 p-6 md:p-8 max-h-[600px] overflow-auto prose prose-lg max-w-none">
                <div
                  ref={containerRef}
                  className="questions-container"
                  dangerouslySetInnerHTML={{ __html: questions as string }}
                />
              </div>
            ) : (
              <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                <div className="flex flex-col h-[calc(100vh-270px)]">
                  <h2 className="text-xl font-bold mb-4 py-2 font-bricolage text-forest-ink">Passages</h2>
                  <div className="prose prose-sm max-w-none p-6 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 overflow-y-auto flex-grow">
                    {passages}
                  </div>
                </div>
                <div className="flex flex-col h-[calc(100vh-270px)]">
                  <h2 className="text-xl font-bold mb-4 py-2 font-bricolage text-forest-ink">Questions</h2>
                  <div className="prose prose-sm max-w-none p-6 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 overflow-y-auto flex-grow">
                    <div ref={containerRef} className="questions-container">{questions}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8 bg-white/85 backdrop-blur-md rounded-2xl border border-pencil-gray/20 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-forest-ink/60 h-5 w-5" />
                <span className="font-inter text-forest-ink/80 text-sm">
                  Reviewing attempt in context. Score:{" "}
                  <strong className="text-forest-ink">{results.score}</strong> / {results.total} (
                  {bandScore} Band)
                </span>
              </div>
              <Button
                onClick={() => setReviewMode("summary")}
                variant="forest"
                className="w-full sm:w-auto h-11 px-8 cursor-pointer font-semibold shadow-xs"
              >
                Back to Score Dashboard
              </Button>
            </div>
          </div>
        </AnswerContext.Provider>
      </div>
    );
  }

  // ─── Results: summary view ────────────────────────────────────────────────
  if (isSubmitted && results && reviewMode === "summary") {
    const bandScore = getBandScore(results.score, testType);
    const pctCorrect = Math.round((results.score / results.total) * 100);
    const testTypeLabel = TYPE_LABEL[testType] || testType.replace(/_/g, " ");
    const completionDate = new Date().toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

    const nextTestId = getNextTestId();

    const sectionScores: Record<string, { correct: number; total: number }> = {};
    const groupedResults: Record<
      string,
      Array<{ num: number; correct: boolean; student: string; correctAns: string }>
    > = {};

    Object.entries(results.perQuestion).forEach(([numStr, detail]) => {
      const questionNum = parseInt(numStr);
      let section = "Section 1";
      if (isListening) {
        if (questionNum > 10 && questionNum <= 20) section = "Section 2";
        else if (questionNum > 20 && questionNum <= 30) section = "Section 3";
        else if (questionNum > 30) section = "Section 4";
      } else {
        if (questionNum > 13 && questionNum <= 27) section = "Section 2";
        else if (questionNum > 27) section = "Section 3";
      }

      if (!groupedResults[section]) groupedResults[section] = [];
      groupedResults[section].push({
        num: questionNum,
        correct: detail.correct,
        student: detail.studentAnswer,
        correctAns: detail.correctAnswer,
      });

      if (!sectionScores[section]) sectionScores[section] = { correct: 0, total: 0 };
      if (detail.correct) sectionScores[section].correct++;
      sectionScores[section].total++;
    });

    const getLearningSummary = () => {
      const { score, total } = results;
      if (score === total) return "Perfect score! Outstanding work on this practice test.";
      if (score >= total * 0.8)
        return `Strong performance. You answered ${score} of ${total} questions correctly. You have solid mastery of this format.`;
      if (score >= total * 0.6)
        return `Good effort. You answered ${score} of ${total} questions correctly. Check the incorrect items below to address minor gaps.`;
      return `You answered ${score} of ${total} correctly. Review the questions below carefully before your next attempt to improve your accuracy.`;
    };

    return (
      <div className="container mx-auto pt-8 pb-16 px-4 md:px-8 bg-cream-paper min-h-screen">
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-pencil-gray/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/tests/${testType}`}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 rounded-full border-pencil-gray/20 bg-white text-forest-ink hover:bg-whisper-gray font-inter shadow-sm cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>All Tests</span>
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight">
              Test Review: {testName}
            </h1>
          </div>
        </div>

        {/* Review mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 border border-pencil-gray/25 shadow-xs">
            <button
              onClick={() => setReviewMode("summary")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer bg-forest-ink text-white shadow-xs"
            >
              Score Summary &amp; Questions
            </button>
            <button
              onClick={() => setReviewMode("context")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
            >
              View Test Sheet (Read-Only)
            </button>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 flex items-center justify-between col-span-2">
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-bricolage text-forest-ink flex items-center gap-2">
                  <Sparkles className="text-forest-ink h-5 w-5" /> Completed Successfully!
                </h2>
                <p className="text-forest-ink/60 text-xs font-mono uppercase mt-1">
                  {testTypeLabel} • {completionDate}
                </p>
                <p className="text-forest-ink/65 text-sm font-inter pt-1">
                  {user
                    ? "Your score is saved to your profile history."
                    : "You took this test as a Guest attempt."}
                </p>
                {!user && (
                  <div className="pt-2 text-xs font-semibold text-[#cb5521]">
                    <Link href="/signup" className="hover:underline">
                      Sign up to preserve future attempts!
                    </Link>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-forest-ink/40 text-[10px] font-mono uppercase tracking-wider">
                  Raw Score
                </div>
                <div className="text-4xl font-extrabold font-bricolage text-forest-ink">
                  {results.score}{" "}
                  <span className="text-lg text-forest-ink/40">/ {results.total}</span>
                </div>
                <div className="text-xs font-mono text-forest-ink/50 mt-0.5">
                  {pctCorrect}% correct
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-bricolage text-forest-ink">Band Estimate</h3>
                <p className="text-forest-ink/65 text-sm font-inter">Equivalent IELTS score</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#d8f3dc] border border-[#b7e4c7] flex items-center justify-center shadow-xs shrink-0">
                <span className="text-2xl font-extrabold font-bricolage text-forest-ink">
                  {bandScore}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-pencil-gray/20 shadow-xs">
            <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-2">
              Performance Summary
            </h3>
            <p className="font-inter text-forest-ink text-sm leading-relaxed">
              {getLearningSummary()}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              onClick={handleRetake}
              variant="forestOutline"
              className="h-10 px-6 cursor-pointer font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw size={16} /> Retake Test
            </Button>
            {nextTestId ? (
              <Link href={`/tests/${testType}/${nextTestId}`}>
                <Button
                  variant="forest"
                  className="h-10 px-6 cursor-pointer font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  Next Test <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <Link href={`/tests/${testType}`}>
                <Button
                  variant="forest"
                  className="h-10 px-6 cursor-pointer font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  All Tests / Back to Directory
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Section breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-pencil-gray/20 shadow-xs mb-8">
          <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-4">
            Section Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(sectionScores).map(([secName, secScore]) => (
              <div
                key={secName}
                className="p-3 bg-whisper-gray rounded-xl border border-pencil-gray/10 text-center font-inter"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">
                  {secName}
                </span>
                <div className="text-lg font-bold text-forest-ink font-mono mt-1">
                  {secScore.correct}{" "}
                  <span className="text-xs text-forest-ink/45">/ {secScore.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([section, sectionQuestions]) => (
            <div
              key={section}
              className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-4 font-bricolage text-forest-ink">
                {section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sectionQuestions
                  .sort((a, b) => a.num - b.num)
                  .map((q) => (
                    <div
                      key={q.num}
                      className={`flex flex-col p-4 rounded-xl border transition-all ${
                        q.correct
                          ? "bg-[#d8f3dc]/25 border-[#b7e4c7]/50"
                          : "bg-[#fcd2c2]/20 border-[#f8b195]/40"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs font-bold text-forest-ink/60">
                          Question {q.num}
                        </span>
                        {q.correct ? (
                          <CheckCircle2 size={16} className="text-forest-ink shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-[#cb5521] shrink-0" />
                        )}
                      </div>
                      <div className="space-y-1.5 text-xs font-inter leading-relaxed flex-grow flex flex-col justify-end">
                        <div>
                          <span className="text-forest-ink/40 text-[10px] block">Your Answer</span>
                          <span
                            className={`font-semibold ${
                              q.correct ? "text-forest-ink" : "text-[#cb5521]"
                            }`}
                          >
                            {q.student.trim() ? (
                              q.student
                            ) : (
                              <em className="text-forest-ink/30 font-normal">Not answered</em>
                            )}
                          </span>
                        </div>
                        <div className="pt-0.5 border-t border-pencil-gray/5">
                          <span className="text-forest-ink/40 text-[10px] block">Correct Answer</span>
                          <span className="font-mono font-semibold text-forest-ink">
                            {q.correctAns}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Active test (pre-submission) ─────────────────────────────────────────

  // Check Answer panel state (practice mode)
  const checkedResult =
    currentQuestion !== null ? checkedQuestions[currentQuestion] : undefined;
  const currentAnswer =
    currentQuestion !== null ? answers[currentQuestion]?.trim() : "";

  return (
    <AnswerContext.Provider value={{ answers, setAnswer, disabled: isSubmitted, isSubmitted }}>
      <div className="min-h-screen bg-cream-paper flex flex-col">
        {/* Sticky test header */}
        <TestHeader
          testName={testName}
          testType={testType}
          mode={mode}
          timeRemaining={timeRemaining}
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
        />

        {/* Main content */}
        <div className="flex-1 px-3 md:px-5 pt-4 pb-6 flex flex-col gap-4">

          {/* ── Listening layout ── */}
          {isListening && (
            <div className="flex flex-col gap-4">
              {/* Audio player */}
              {passages && (
                <div className="bg-white rounded-2xl border border-pencil-gray/25 p-4 shadow-xs">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/40 mb-2">
                    Audio
                  </p>
                  <audio controls className="w-full">
                    <source src={passages as string} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Questions */}
              <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-5 md:p-7 overflow-y-auto max-h-[55vh] prose prose-sm max-w-none">
                <div
                  ref={containerRef}
                  className="questions-container"
                  dangerouslySetInnerHTML={{ __html: questions as string }}
                />
              </div>

              {/* Navigator */}
              <QuestionNavigator
                testType={testType}
                questionNumbers={questionNumbers}
                answers={answers}
                checkedQuestions={mode === "practice" ? checkedQuestions : {}}
                currentQuestion={currentQuestion}
                mode={mode}
                onNavigate={handleNavigate}
              />

              {/* Practice: Check Answer panel */}
              {mode === "practice" && currentQuestion !== null && !isSubmitted && (
                <CheckAnswerPanel
                  questionNum={currentQuestion}
                  currentAnswer={currentAnswer ?? ""}
                  checkedResult={checkedResult}
                  correctAnswer={formatAnswer(answerKey[currentQuestion])}
                  onCheck={() => checkAnswer(currentQuestion)}
                />
              )}
            </div>
          )}

          {/* ── Reading layout ── */}
          {!isListening && (
            <>
              {/* Mobile/tablet: stacked layout */}
              <div className="lg:hidden flex flex-col gap-4">
                {/* Collapsible passage accordion */}
                <div className="bg-white rounded-2xl border border-pencil-gray/20 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setPassageCollapsed((p) => !p)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-whisper-gray/50 transition-colors"
                    aria-expanded={!passageCollapsed}
                    aria-controls="mobile-passage-panel"
                  >
                    <span className="text-sm font-semibold font-bricolage text-forest-ink">
                      Reading Passage
                    </span>
                    {passageCollapsed ? (
                      <ChevronRight size={16} className="text-forest-ink/50" />
                    ) : (
                      <ChevronLeft size={16} className="text-forest-ink/50 rotate-90" />
                    )}
                  </button>
                  {!passageCollapsed && (
                    <div
                      id="mobile-passage-panel"
                      className="px-5 pb-5 pt-1 prose prose-sm max-w-none border-t border-pencil-gray/10"
                    >
                      {passages}
                    </div>
                  )}
                </div>

                {/* Questions */}
                <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-5 prose prose-sm max-w-none overflow-y-auto max-h-[60vh]">
                  <div ref={containerRef} className="questions-container">
                    {questions}
                  </div>
                </div>

                {/* Navigator */}
                <QuestionNavigator
                  testType={testType}
                  questionNumbers={questionNumbers}
                  answers={answers}
                  checkedQuestions={mode === "practice" ? checkedQuestions : {}}
                  currentQuestion={currentQuestion}
                  mode={mode}
                  onNavigate={handleNavigate}
                />

                {/* Practice: Check Answer panel */}
                {mode === "practice" && currentQuestion !== null && !isSubmitted && (
                  <CheckAnswerPanel
                    questionNum={currentQuestion}
                    currentAnswer={currentAnswer ?? ""}
                    checkedResult={checkedResult}
                    correctAnswer={formatAnswer(answerKey[currentQuestion])}
                    onCheck={() => checkAnswer(currentQuestion)}
                  />
                )}
              </div>

              {/* Desktop: side-by-side layout */}
              <div className="hidden lg:flex gap-5 h-[calc(100vh-180px)]">
                {/* Passage panel */}
                <div
                  className={`transition-all duration-300 flex flex-col min-h-0 ${
                    passageCollapsed ? "w-10 shrink-0" : "flex-[55] min-w-0"
                  }`}
                >
                  {passageCollapsed ? (
                    /* Collapsed: thin strip with expand button */
                    <button
                      onClick={() => setPassageCollapsed(false)}
                      className="h-full flex flex-col items-center justify-center gap-2 text-forest-ink/40 hover:text-forest-ink transition-colors w-full border border-pencil-gray/20 rounded-2xl bg-white shadow-xs"
                      aria-label="Show reading passage"
                    >
                      <PanelLeftOpen size={15} />
                      <span
                        className="text-[9px] font-mono uppercase tracking-widest"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        Passage
                      </span>
                    </button>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2 shrink-0">
                        <h2 className="text-sm font-bold font-bricolage text-forest-ink">
                          Reading Passage
                        </h2>
                        <button
                          onClick={() => setPassageCollapsed(true)}
                          className="flex items-center gap-1 text-xs font-inter text-forest-ink/45 hover:text-forest-ink transition-colors"
                          aria-label="Collapse passage panel"
                        >
                          <PanelLeftClose size={14} />
                          Collapse
                        </button>
                      </div>
                      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-pencil-gray/20 shadow-xs p-6 overflow-y-auto prose prose-sm max-w-none">
                        {passages}
                      </div>
                    </div>
                  )}
                </div>

                {/* Questions panel */}
                <div
                  className={`flex flex-col min-h-0 transition-all duration-300 ${
                    passageCollapsed ? "flex-1 min-w-0" : "flex-[45] min-w-0"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 shrink-0">
                    <h2 className="text-sm font-bold font-bricolage text-forest-ink">Questions</h2>
                    {passageCollapsed && (
                      <button
                        onClick={() => setPassageCollapsed(false)}
                        className="flex items-center gap-1 text-xs font-inter text-forest-ink/45 hover:text-forest-ink transition-colors"
                        aria-label="Show passage panel"
                      >
                        <PanelLeftOpen size={14} />
                        Show Passage
                      </button>
                    )}
                  </div>

                  {/* Scrollable questions */}
                  <div className="flex-1 min-h-0 bg-white rounded-2xl border border-pencil-gray/20 shadow-xs p-5 overflow-y-auto prose prose-sm max-w-none">
                    <div ref={containerRef} className="questions-container">
                      {questions}
                    </div>
                  </div>

                  {/* Navigator */}
                  <QuestionNavigator
                    testType={testType}
                    questionNumbers={questionNumbers}
                    answers={answers}
                    checkedQuestions={mode === "practice" ? checkedQuestions : {}}
                    currentQuestion={currentQuestion}
                    mode={mode}
                    onNavigate={handleNavigate}
                  />

                  {/* Practice: Check Answer panel */}
                  {mode === "practice" && currentQuestion !== null && !isSubmitted && (
                    <CheckAnswerPanel
                      questionNum={currentQuestion}
                      currentAnswer={currentAnswer ?? ""}
                      checkedResult={checkedResult}
                      correctAnswer={formatAnswer(answerKey[currentQuestion])}
                      onCheck={() => checkAnswer(currentQuestion)}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── Submit panel ── */}
          <div className="flex flex-col gap-3">
            {saveStatus === "error" && (
              <div className="p-4 bg-sticky-note-blush/20 border border-[#cb5521]/30 rounded-2xl flex items-start gap-2.5 text-xs text-[#cb5521] animate-fade-in font-inter">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Submission Failed</strong>
                  <span>
                    Failed to save your attempt to the database. Please check your internet
                    connection and try clicking &ldquo;Submit&rdquo; again. Your answers are
                    preserved.
                  </span>
                </div>
              </div>
            )}

            {/* Exam: show confirmation note if any questions unanswered */}
            {mode === "exam" && answeredCount < totalQuestions && !submitting && (
              <div className="px-4 py-2.5 bg-[#ffe95c]/20 border border-[#ffe95c]/50 rounded-2xl flex items-center gap-2 text-xs font-inter text-forest-ink/70">
                <AlertTriangle size={13} className="text-[#7a6000] shrink-0" />
                <span>
                  <strong>{totalQuestions - answeredCount}</strong> question
                  {totalQuestions - answeredCount !== 1 ? "s" : ""} unanswered.
                </span>
              </div>
            )}

            <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-pencil-gray/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-forest-ink/60 h-5 w-5" />
                <span className="font-inter text-forest-ink/80 text-sm">
                  Answered:{" "}
                  <strong className="text-forest-ink">{answeredCount}</strong> /{" "}
                  {totalQuestions}
                </span>
              </div>
              <Button
                onClick={handleFormSubmit}
                disabled={submitting || (answeredCount === 0 && !timerExpired)}
                variant="forest"
                className="w-full sm:w-auto h-11 px-8 cursor-pointer shadow-md font-semibold"
                aria-label={
                  mode === "exam" ? "Submit exam" : "Submit answers"
                }
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : mode === "exam" ? (
                  <>
                    Submit Exam <ChevronRight size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    Submit Answers <ChevronRight size={16} className="ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnswerContext.Provider>
  );
}

// ─── Check Answer Panel (practice mode) ──────────────────────────────────────

interface CheckAnswerPanelProps {
  questionNum: number;
  currentAnswer: string;
  /** undefined = not yet checked; true = correct; false = incorrect */
  checkedResult: boolean | undefined;
  correctAnswer: string;
  onCheck: () => void;
}

function CheckAnswerPanel({
  questionNum,
  currentAnswer,
  checkedResult,
  correctAnswer,
  onCheck,
}: CheckAnswerPanelProps) {
  const isChecked = checkedResult !== undefined;

  return (
    <motion.div
      key={questionNum}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-2 p-4 bg-white rounded-2xl border border-pencil-gray/20 shadow-xs"
      role="region"
      aria-label={`Check answer for question ${questionNum}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs font-bold text-forest-ink/50">
          Question {questionNum}
        </span>
        {isChecked && (
          checkedResult ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-forest-ink">
              <CheckCircle2 size={14} className="text-[#1a7a4a]" />
              Correct
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#cb5521]">
              <XCircle size={14} />
              Incorrect
            </span>
          )
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div>
            <span className="text-[10px] font-mono text-forest-ink/35 uppercase tracking-wider block mb-0.5">
              Your Answer
            </span>
            <span
              className={`text-sm font-inter font-medium ${
                isChecked
                  ? checkedResult
                    ? "text-forest-ink"
                    : "text-[#cb5521]"
                  : "text-forest-ink"
              }`}
            >
              {currentAnswer || (
                <em className="text-forest-ink/30 font-normal text-xs">Not answered yet</em>
              )}
            </span>
          </div>
          {isChecked && (
            <div className="pt-2 border-t border-pencil-gray/10">
              <span className="text-[10px] font-mono text-forest-ink/35 uppercase tracking-wider block mb-0.5">
                Correct Answer
              </span>
              <span className="text-sm font-mono font-semibold text-forest-ink">
                {correctAnswer}
              </span>
            </div>
          )}
        </div>

        {!isChecked && (
          <Button
            onClick={onCheck}
            disabled={!currentAnswer}
            size="sm"
            variant="forest"
            className="shrink-0 text-xs h-8 px-4"
            aria-label={`Check answer for question ${questionNum}`}
          >
            Check Answer
          </Button>
        )}
      </div>
    </motion.div>
  );
}
