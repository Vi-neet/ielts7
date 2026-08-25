"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt, GradeResult, formatAnswer, getAcceptableAnswers } from "@/lib/scoring";
import { db, auth } from "@/lib/firebase";
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
import { cn } from "@/lib/utils";


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
  inputEl: HTMLElement,
  container: HTMLElement
): number | null {
  const nameOrId = (inputEl as HTMLInputElement).name || inputEl.id || "";
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

/** Helper to extract question number from a radio button or group */
function getRadioQuestionNumber(btn: HTMLButtonElement, container: HTMLElement): number | null {
  if (btn.id) {
    const match = btn.id.match(/^(?:question|q)[-_]?(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 1 && n <= 40) return n;
    }
  }
  const group = btn.closest('[role="radiogroup"]');
  if (group) {
    const groupName = group.getAttribute("name") || group.id || "";
    const match = groupName.match(/^(?:question|q)[-_]?(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 1 && n <= 40) return n;
    }
  }
  return findQuestionNumberForInput(btn, container);
}

/** Helper to extract value for a radio button */
function getRadioValue(btn: HTMLButtonElement, container: HTMLElement): string {
  // 1. Direct attribute or property on the button element
  const directVal = btn.getAttribute("value") || btn.value || btn.dataset.value;
  if (directVal && directVal !== "on") return directVal;

  // 2. Fallback via associated label text
  if (btn.id) {
    const label =
      container.querySelector<HTMLElement>(`label[for="${CSS.escape(btn.id)}"]`) ||
      btn.closest("label");
    if (label) {
      const text = label.textContent?.trim() || "";
      if (!text) return "";

      const upperText = text.toUpperCase();
      if (upperText === "TRUE" || upperText === "FALSE" || upperText === "NOT GIVEN") {
        return upperText;
      }
      if (upperText === "YES" || upperText === "NO") {
        return upperText;
      }

      // Check roman numerals first (i, ii, iii, iv, v, vi, vii, viii, ix, x)
      const romanMatch = text.match(/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)(?:[\.\:\)\s].*)?$/i);
      if (romanMatch) {
        return romanMatch[1].toLowerCase();
      }

      // Match letter prefix or single letter (A-Z)
      const singleLetter = text.match(/^([A-Z])(?:[\.\:\)\s].*)?$/i);
      if (singleLetter) {
        return singleLetter[1].toUpperCase();
      }

      return text;
    }
  }
  return "";
}

/** Helper to parse checkbox question range and option letter from ID */
function parseCheckboxId(id: string): { startNum: number; endNum: number; optionLetter: string; questionNums: number[] } | null {
  if (!id) return null;
  const match = id.match(/^(?:question|q)(\d+)(?:-(\d+))?-([a-zA-Z])$/i);
  if (!match) return null;
  const startNum = parseInt(match[1], 10);
  const endNum = match[2] ? parseInt(match[2], 10) : startNum;
  const optionLetter = match[3].toUpperCase();
  const questionNums: number[] = [];
  for (let i = startNum; i <= endNum; i++) {
    questionNums.push(i);
  }
  return { startNum, endNum, optionLetter, questionNums };
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
  const inputToQuestionMap = useRef<Map<HTMLElement, number>>(new Map());
  const autoSubmitCalledRef = useRef(false);

  // ── Core test state ──
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const answersRef = useRef<Record<number, string>>(answers);
  answersRef.current = answers;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [reviewMode, setReviewMode] = useState<"summary" | "context">("summary");
  const [dbError, setDbError] = useState<string | null>(null);

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
    const nativeRadios = container.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );

    inputToQuestionMap.current.clear();

    textInputs.forEach((input) => {
      const num = findQuestionNumberForInput(input, container);
      if (num) {
        inputToQuestionMap.current.set(input, num);
        input.value = answersRef.current[num] || "";
        input.disabled = isSubmitted;
      }
    });

    nativeRadios.forEach((radio) => {
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
        radio.checked = answersRef.current[num] === answerValue;
        radio.disabled = isSubmitted;
      }
    });

    const radixRadios = container.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
    radixRadios.forEach((btn) => {
      const num = getRadioQuestionNumber(btn, container);
      if (num) {
        inputToQuestionMap.current.set(btn, num);
      }
    });

    const radixCheckboxes = container.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]');
    radixCheckboxes.forEach((btn) => {
      const parsed = parseCheckboxId(btn.id);
      if (parsed) {
        inputToQuestionMap.current.set(btn, parsed.startNum);
      }
    });

    // Native input / change event listener (for text inputs and native radios)
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

    // Click event listener (for Radix RadioGroup buttons and Radix Checkbox buttons)
    const handleClick = (e: MouseEvent) => {
      if (isSubmitted) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Radix Radio Button click (or label click)
      const radioBtn =
        target.closest<HTMLButtonElement>('button[role="radio"]') ||
        (() => {
          const label = target.closest<HTMLLabelElement>("label");
          if (!label) return null;
          if (label.htmlFor) {
            const escapedId = CSS.escape(label.htmlFor);
            return (
              container.querySelector<HTMLButtonElement>(`button#${escapedId}[role="radio"]`) ||
              container.querySelector<HTMLButtonElement>(`#${escapedId}`)
            );
          }
          return label.querySelector<HTMLButtonElement>('button[role="radio"]');
        })();

      if (radioBtn) {
        const num = getRadioQuestionNumber(radioBtn, container);
        const val = getRadioValue(radioBtn, container);
        if (num && val) {
          setAnswers((prev) => ({ ...prev, [num]: val }));
        }
        return;
      }

      // 2. Radix Checkbox click (or label click)
      const checkboxBtn =
        target.closest<HTMLButtonElement>('button[role="checkbox"]') ||
        (() => {
          const label = target.closest<HTMLLabelElement>("label");
          return label?.htmlFor
            ? container.querySelector<HTMLButtonElement>(`button#${label.htmlFor}[role="checkbox"]`)
            : null;
        })();

      if (checkboxBtn) {
        const parsed = parseCheckboxId(checkboxBtn.id);
        if (parsed) {
          const { questionNums, optionLetter } = parsed;
          const currentSelections = questionNums
            .map((n) => answersRef.current[n] || "")
            .filter(Boolean);

          let newSelections = [...currentSelections];
          if (newSelections.includes(optionLetter)) {
            newSelections = newSelections.filter((x) => x !== optionLetter);
          } else {
            newSelections.push(optionLetter);
          }
          newSelections.sort();

          setAnswers((prev) => {
            const next = { ...prev };
            questionNums.forEach((n, idx) => {
              next[n] = newSelections[idx] || "";
            });
            return next;
          });
        }
        return;
      }
    };

    container.addEventListener("input", handleInputEvent);
    container.addEventListener("change", handleInputEvent);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("input", handleInputEvent);
      container.removeEventListener("change", handleInputEvent);
      container.removeEventListener("click", handleClick);
    };
  }, [questions, isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── DOM: Sync state back to all inputs (native inputs, radio buttons, checkboxes) ──
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Text inputs
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

    // Native radio inputs
    const nativeRadios = container.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    nativeRadios.forEach((radio) => {
      const num = inputToQuestionMap.current.get(radio);
      if (num) {
        const val =
          (radio as HTMLInputElement & { _mappedValue?: string })._mappedValue ||
          radio.value;
        radio.checked = answers[num] === val;
        radio.disabled = isSubmitted;
      }
    });

    // Radix radio buttons
    const radixRadios = container.querySelectorAll<HTMLButtonElement>(
      'button[role="radio"]'
    );
    radixRadios.forEach((btn) => {
      const num = getRadioQuestionNumber(btn, container);
      if (num) {
        const val = getRadioValue(btn, container);
        const isChecked = answers[num] === val;
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
        btn.disabled = isSubmitted;
      }
    });

    // Radix checkboxes
    const radixCheckboxes = container.querySelectorAll<HTMLButtonElement>(
      'button[role="checkbox"]'
    );
    radixCheckboxes.forEach((btn) => {
      const parsed = parseCheckboxId(btn.id);
      if (parsed) {
        const { questionNums, optionLetter } = parsed;
        const currentSelections = questionNums
          .map((n) => answers[n] || "")
          .filter(Boolean);
        const isChecked = currentSelections.includes(optionLetter);
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
        btn.disabled = isSubmitted;
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
    if ((isSubmitted && saveStatus !== "error") || submitting) return;

    if (!user && !ALLOW_GUEST_TESTS) {
      alert("Guest test-taking is disabled. Please sign in to submit.");
      return;
    }

    setSubmitting(true);

    // Always fetch latest answers from answersRef to prevent closure staleness
    const rawAnswers = answersRef.current || {};
    const sanitizedAnswers: Record<number, string> = {};
    for (const [key, val] of Object.entries(rawAnswers)) {
      if (val !== undefined && val !== null) {
        sanitizedAnswers[Number(key)] = val;
      }
    }

    // Local grade & UI result transition (happens synchronously before Firestore)
    const gradeResult = gradeAttempt(sanitizedAnswers, answerKey);
    setResults(gradeResult);
    setIsSubmitted(true);

    // Attempt Firestore persistence if not already saved
    if (saveStatus !== "saved") {
      try {
        const currentUid = auth.currentUser?.uid || null;
        const isGuest = !currentUid;

        const attemptData = {
          uid: currentUid,
          isGuest,
          testId,
          testType,
          answers: sanitizedAnswers,
          score: gradeResult.score,
          total: gradeResult.total,
          submittedAt: serverTimestamp(),
        };

        await addDoc(collection(db, "attempts"), attemptData);
        setSaveStatus("saved");
        setDbError(null);
      } catch (error: any) {
        console.error("Failed to save attempt to Firestore:", error);
        setSaveStatus("error");
        const errCode = error?.code || "unknown";
        const errMsg = error?.message || String(error);
        setDbError(`${errCode}: ${errMsg}`);
      } finally {
        setSubmitting(false);
      }
    } else {
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
    setDbError(null);
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
            </div>
          )}

          {/* ── Reading layout ── */}
          {!isListening && (
            <div className="flex flex-col lg:flex-row gap-5 h-auto lg:h-[calc(100vh-180px)]">
              {/* Passage panel */}
              <div
                className={cn(
                  "transition-all duration-300 flex flex-col min-h-0 bg-white border border-pencil-gray/20 rounded-2xl shadow-xs overflow-hidden",
                  passageCollapsed
                    ? "lg:w-10 lg:shrink-0"
                    : "lg:flex-[55] lg:min-w-0 lg:h-full lg:overflow-y-auto"
                )}
              >
                {/* Passage header / mobile accordion trigger */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-pencil-gray/10 shrink-0">
                  <h2 className="text-sm font-bold font-bricolage text-forest-ink">
                    Reading Passage
                  </h2>
                  
                  {/* Desktop close button */}
                  {!passageCollapsed && (
                    <button
                      onClick={() => setPassageCollapsed(true)}
                      className="hidden lg:flex items-center gap-1 text-xs font-inter text-forest-ink/45 hover:text-forest-ink transition-colors cursor-pointer"
                      aria-label="Collapse passage panel"
                    >
                      <PanelLeftClose size={14} />
                      Collapse
                    </button>
                  )}

                  {/* Mobile toggle indicator */}
                  <button
                    onClick={() => setPassageCollapsed((p) => !p)}
                    className="lg:hidden flex items-center justify-center p-1 text-forest-ink/50 hover:text-forest-ink cursor-pointer"
                    aria-label={passageCollapsed ? "Expand passage" : "Collapse passage"}
                  >
                    {passageCollapsed ? (
                      <ChevronRight size={16} />
                    ) : (
                      <ChevronLeft size={16} className="rotate-90" />
                    )}
                  </button>
                </div>

                {/* Passage content: on desktop, if collapsed we render it as a side strip, so content is hidden. On mobile, if collapsed, we hide the content. */}
                {passageCollapsed ? (
                  /* Desktop collapsed strip content */
                  <button
                    onClick={() => setPassageCollapsed(false)}
                    className="hidden lg:flex flex-1 flex-col items-center justify-center gap-2 text-forest-ink/40 hover:text-forest-ink transition-colors w-full h-full cursor-pointer"
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
                  /* Expanded passage text content */
                  <div className="flex-grow p-6 overflow-y-auto prose prose-sm max-w-none">
                    {passages}
                  </div>
                )}
              </div>

              {/* Questions panel */}
              <div
                className={cn(
                  "flex flex-col min-h-0 transition-all duration-300 lg:h-full lg:overflow-y-auto",
                  passageCollapsed ? "lg:flex-1 lg:min-w-0" : "lg:flex-[45] lg:min-w-0"
                )}
              >
                {/* Desktop restore button if collapsed */}
                {passageCollapsed && (
                  <div className="hidden lg:flex items-center justify-between mb-2 shrink-0">
                    <h2 className="text-sm font-bold font-bricolage text-forest-ink">Questions</h2>
                    <button
                      onClick={() => setPassageCollapsed(false)}
                      className="flex items-center gap-1 text-xs font-inter text-forest-ink/45 hover:text-forest-ink transition-colors cursor-pointer"
                      aria-label="Show passage panel"
                    >
                      <PanelLeftOpen size={14} />
                      Show Passage
                    </button>
                  </div>
                )}
                {!passageCollapsed && (
                  <div className="hidden lg:block mb-2 shrink-0">
                    <h2 className="text-sm font-bold font-bricolage text-forest-ink">Questions</h2>
                  </div>
                )}

                {/* Single Questions block */}
                <div className="flex-grow min-h-0 bg-white rounded-2xl border border-pencil-gray/20 shadow-xs p-5 overflow-y-auto prose prose-sm max-w-none">
                  <div ref={containerRef} className="questions-container">
                    {questions}
                  </div>
                </div>

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
              </div>
            </div>
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
                  {process.env.NODE_ENV === "development" && dbError && (
                    <div className="mt-2 p-2 bg-[#fcd2c2] border border-[#cb5521]/20 rounded text-[10px] font-mono break-all text-[#cb5521]">
                      Firebase error: {dbError}
                    </div>
                  )}
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
      className={cn(
        "mt-2 p-4 rounded-2xl border shadow-xs transition-colors duration-200",
        isChecked
          ? checkedResult
            ? "bg-[#d8f3dc]/30 border-[#b7e4c7]/60 text-[#1b4332]"
            : "bg-[#fcd2c2]/20 border-[#f8b195]/40 text-[#991b1b]"
          : "bg-white border-pencil-gray/20 text-forest-ink"
      )}
      role="region"
      aria-label={`Check answer for question ${questionNum}`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-black/5 pb-2">
        <span className="font-mono text-xs font-bold opacity-60">
          Question {questionNum}
        </span>
        {isChecked && (
          checkedResult ? (
            <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#1a7a4a]">
              <CheckCircle2 size={14} className="text-[#1a7a4a] shrink-0" />
              Correct
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#cb5521]">
              <XCircle size={14} className="shrink-0" />
              Incorrect
            </span>
          )
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block mb-0.5">
              Your Answer
            </span>
            <span className="text-sm font-inter font-bold">
              {currentAnswer || (
                <em className="opacity-45 font-normal text-xs">Not answered yet</em>
              )}
            </span>
          </div>
          {isChecked && !checkedResult && (
            <div className="pt-2 border-t border-black/5">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block mb-0.5">
                Correct Answer
              </span>
              <span className="text-sm font-mono font-bold bg-[#d8f3dc] border border-[#b7e4c7] text-[#1b4332] px-2 py-0.5 rounded-md inline-block">
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
            className="shrink-0 text-xs h-8 px-4 font-semibold shadow-xs"
            aria-label={`Check answer for question ${questionNum}`}
          >
            Check Answer
          </Button>
        )}
      </div>
    </motion.div>
  );
}
