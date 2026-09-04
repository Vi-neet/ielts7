"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt } from "@/lib/scoring";
import { db, auth } from "@/lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AnswerContext } from "./AnswerContext";
import {
  Timer,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Send,
  Volume2,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatCountdown } from "@/lib/examConfig";

interface SimpleExamRunnerProps {
  testId: string;
  testType: string;
  testName: string;
  passages: React.ReactNode | string;
  questions: React.ReactNode | string;
  answerKey: Record<number, string | string[]>;
  examDurationSeconds: number;
}

// ── DOM Helpers to associate rendered inputs with IELTS question numbers ──

/**
 * Scan DOM to discover the question number associated with an input or radio.
 */
function findQuestionNumberForInput(
  inputEl: HTMLElement,
  container: HTMLElement
): number | null {
  // 1. Direct name, id or data-question attribute
  const nameOrId =
    (inputEl as HTMLInputElement).name ||
    inputEl.id ||
    inputEl.getAttribute("data-question") ||
    "";

  const directMatch = nameOrId.match(/(?:question|q)[-_]?(\d+)/i);
  if (directMatch) {
    const num = parseInt(directMatch[1], 10);
    if (num >= 1 && num <= 40) return num;
  }

  const isQuestionNumberText = (text: string) => {
    const clean = text.trim();
    // Matches patterns like "1", "1.", "1)", "(1)", "Question 1", "Q1"
    const match = clean.match(/^(?:question\s*|q\s*)?[\(]?\s*(\d+)\s*[\.\:\)]?$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 40) return num;
    }
    return null;
  };

  // 2. Backward search for closest label or strong text indicating question number
  let current: Node | null = inputEl;
  let prevSteps = 0;
  while (current && prevSteps < 35) {
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
    if (current.nodeType === Node.TEXT_NODE) {
      num = isQuestionNumberText(current.nodeValue || "");
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      if (el.tagName === "STRONG" || el.tagName === "B" || el.classList.contains("q-num")) {
        num = isQuestionNumberText(el.textContent || "");
      } else {
        num = isQuestionNumberText(el.textContent || "");
      }
    }
    if (num !== null) return num;
  }

  // 3. Forward search if backward did not find anything
  current = inputEl;
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
    if (current.nodeType === Node.TEXT_NODE) {
      num = isQuestionNumberText(current.nodeValue || "");
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      num = isQuestionNumberText((current as HTMLElement).textContent || "");
    }
    if (num !== null) return num;
  }

  return null;
}

/** Helper to extract question number from a radio button or group */
function getRadioQuestionNumber(
  btn: HTMLButtonElement,
  container: HTMLElement
): number | null {
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

/** Helper to extract answer value for a radio button */
function getRadioValue(btn: HTMLButtonElement, container: HTMLElement): string {
  const directVal = btn.getAttribute("value") || btn.value || btn.dataset.value;
  if (directVal && directVal !== "on") return directVal;

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

      // Roman numerals (i, ii, iii, iv, v, vi, vii, viii, ix, x)
      const romanMatch = text.match(/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)(?:[\.\:\)\s].*)?$/i);
      if (romanMatch) {
        return romanMatch[1].toLowerCase();
      }

      // Letter option A-Z
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
function parseCheckboxId(
  id: string
): { startNum: number; endNum: number; optionLetter: string; questionNums: number[] } | null {
  if (!id) return null;
  const match = id.match(/^(?:question|q)(\d+)(?:[-_](\d+))?[-_]([a-zA-Z])$/i);
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

export default function SimpleExamRunner({
  testId,
  testType,
  testName,
  passages,
  questions,
  answerKey,
  examDurationSeconds,
}: SimpleExamRunnerProps) {
  const router = useRouter();
  const { user } = useAuth();

  const isListening = testType === "listening";

  // Containers
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const passageContainerRef = useRef<HTMLDivElement>(null);
  const inputToQuestionMap = useRef<Map<HTMLElement, number>>(new Map());
  const questionToElementMap = useRef<Map<number, HTMLElement>>(new Map());

  // State
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const answersRef = useRef<Record<number, string>>(answers);
  answersRef.current = answers;

  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(examDurationSeconds);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [passageFontSize, setPassageFontSize] = useState<"sm" | "base" | "lg">("base");

  const autoSubmitCalledRef = useRef<boolean>(false);
  const sessionKey = `ielts7_simple_session_${testId}`;

  // Define section ranges
  const sections = useMemo(() => {
    if (isListening) {
      return [
        { id: 1, label: "Section 1", range: [1, 10], subtitle: "Questions 1–10" },
        { id: 2, label: "Section 2", range: [11, 20], subtitle: "Questions 11–20" },
        { id: 3, label: "Section 3", range: [21, 30], subtitle: "Questions 21–30" },
        { id: 4, label: "Section 4", range: [31, 40], subtitle: "Questions 31–40" },
      ];
    }
    return [
      { id: 1, label: "Passage 1", range: [1, 14], subtitle: "Questions 1–14" },
      { id: 2, label: "Passage 2", range: [15, 27], subtitle: "Questions 15–27" },
      { id: 3, label: "Passage 3", range: [28, 40], subtitle: "Questions 28–40" },
    ];
  }, [isListening]);

  // Restore saved progress if exists
  useEffect(() => {
    try {
      const cached = localStorage.getItem(sessionKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (data && Date.now() - (data.updatedAt || 0) < 24 * 60 * 60 * 1000) {
          if (data.answers) setAnswers(data.answers);
          if (typeof data.timeRemaining === "number" && data.timeRemaining > 0) {
            setTimeRemaining(data.timeRemaining);
          }
        }
      }
    } catch {
      // Ignore read error
    }
  }, [sessionKey]);

  // Cache progress
  useEffect(() => {
    if (isSubmitted) return;
    try {
      if (Object.keys(answers).length > 0) {
        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            answers,
            timeRemaining,
            updatedAt: Date.now(),
          })
        );
      }
    } catch {
      // Ignore write error
    }
  }, [answers, timeRemaining, isSubmitted, sessionKey]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!autoSubmitCalledRef.current) {
            autoSubmitCalledRef.current = true;
            handleConfirmSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Warn on tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted && Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitted, answers]);

  // ── DOM Scanning & Event Listeners for Questions ──
  useEffect(() => {
    const container = questionsContainerRef.current;
    if (!container) return;

    inputToQuestionMap.current.clear();
    questionToElementMap.current.clear();

    // 1. Scan text inputs
    const textInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input:not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="hidden"]):not([type="checkbox"])'
    );
    textInputs.forEach((input) => {
      const num = findQuestionNumberForInput(input, container);
      if (num) {
        inputToQuestionMap.current.set(input, num);
        if (!questionToElementMap.current.has(num)) {
          questionToElementMap.current.set(num, input);
        }
        input.value = answersRef.current[num] || "";
        input.disabled = isSubmitted;
      }
    });

    // 2. Scan native radios
    const nativeRadios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    nativeRadios.forEach((radio) => {
      const num = findQuestionNumberForInput(radio, container);
      if (num) {
        inputToQuestionMap.current.set(radio, num);
        if (!questionToElementMap.current.has(num)) {
          questionToElementMap.current.set(num, radio);
        }
        let answerValue = radio.value;
        const label = container.querySelector<HTMLElement>(`label[for="${CSS.escape(radio.id)}"]`);
        if (label) {
          const text = label.textContent?.trim() || "";
          const match = text.match(/^([A-D])\b/i);
          answerValue = match ? match[1].toUpperCase() : text;
        }
        (radio as any)._mappedValue = answerValue;
        radio.checked = answersRef.current[num] === answerValue;
        radio.disabled = isSubmitted;
      }
    });

    // 3. Scan Radix radio buttons
    const radixRadios = container.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
    radixRadios.forEach((btn) => {
      const num = getRadioQuestionNumber(btn, container);
      if (num) {
        inputToQuestionMap.current.set(btn, num);
        if (!questionToElementMap.current.has(num)) {
          questionToElementMap.current.set(num, btn);
        }
        const val = getRadioValue(btn, container);
        const isChecked = answersRef.current[num] === val;
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
        btn.disabled = isSubmitted;
      }
    });

    // 4. Scan Radix checkboxes
    const radixCheckboxes = container.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]');
    radixCheckboxes.forEach((btn) => {
      const parsed = parseCheckboxId(btn.id);
      if (parsed) {
        inputToQuestionMap.current.set(btn, parsed.startNum);
        if (!questionToElementMap.current.has(parsed.startNum)) {
          questionToElementMap.current.set(parsed.startNum, btn);
        }
        const currentSelections = parsed.questionNums
          .map((n) => answersRef.current[n] || "")
          .filter(Boolean);
        const isChecked = currentSelections.includes(parsed.optionLetter);
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
        btn.disabled = isSubmitted;
      }
    });

    // Event listener: input / change
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

    // Event listener: click (for Radix buttons & labels)
    const handleClick = (e: MouseEvent) => {
      if (isSubmitted) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      // Radix Radio button click
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

      // Radix Checkbox click
      const checkboxBtn =
        target.closest<HTMLButtonElement>('button[role="checkbox"]') ||
        (() => {
          const label = target.closest<HTMLLabelElement>("label");
          return label?.htmlFor
            ? container.querySelector<HTMLButtonElement>(`button#${CSS.escape(label.htmlFor)}[role="checkbox"]`)
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
  }, [isSubmitted]);

  // Sync state back to DOM inputs when answers change
  useEffect(() => {
    const container = questionsContainerRef.current;
    if (!container) return;

    // Sync text inputs
    const textInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input:not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="hidden"]):not([type="checkbox"])'
    );
    textInputs.forEach((input) => {
      const num = inputToQuestionMap.current.get(input);
      if (num && input.value !== (answers[num] || "")) {
        input.value = answers[num] || "";
      }
    });

    // Sync native radios
    const nativeRadios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    nativeRadios.forEach((radio) => {
      const num = inputToQuestionMap.current.get(radio);
      if (num) {
        const val = (radio as any)._mappedValue || radio.value;
        radio.checked = answers[num] === val;
      }
    });

    // Sync Radix radios
    const radixRadios = container.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
    radixRadios.forEach((btn) => {
      const num = getRadioQuestionNumber(btn, container);
      if (num) {
        const val = getRadioValue(btn, container);
        const isChecked = answers[num] === val;
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
      }
    });

    // Sync Radix checkboxes
    const radixCheckboxes = container.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]');
    radixCheckboxes.forEach((btn) => {
      const parsed = parseCheckboxId(btn.id);
      if (parsed) {
        const currentSelections = parsed.questionNums
          .map((n) => answers[n] || "")
          .filter(Boolean);
        const isChecked = currentSelections.includes(parsed.optionLetter);
        btn.setAttribute("data-state", isChecked ? "checked" : "unchecked");
        btn.setAttribute("aria-checked", isChecked ? "true" : "false");
      }
    });
  }, [answers]);

  // Direct answer setter for AnswerContext
  const setAnswerDirect = useCallback((num: number, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [num]: val }));
  }, [isSubmitted]);

  // Navigate to specific question
  const scrollToQuestion = useCallback((qNum: number) => {
    setActiveQuestion(qNum);
    const sec = sections.find((s) => qNum >= s.range[0] && qNum <= s.range[1]);
    if (sec) setActiveSection(sec.id);

    const el = questionToElementMap.current.get(qNum);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      try {
        if ("focus" in el) (el as HTMLElement).focus({ preventScroll: true });
      } catch {
        // Ignore focus error
      }
      return;
    }

    const container = questionsContainerRef.current;
    if (container) {
      const candidates = container.querySelectorAll<HTMLElement>("strong, b, p, h3, h4");
      for (const cand of candidates) {
        const text = cand.textContent?.trim() || "";
        const m = text.match(new RegExp(`^(?:question\\s*|q\\s*)?${qNum}\\b`, "i"));
        if (m) {
          cand.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
    }
  }, [sections]);

  // Navigate to section
  const handleSectionClick = (sectionId: number) => {
    setActiveSection(sectionId);
    const sec = sections.find((s) => s.id === sectionId);
    if (!sec) return;

    scrollToQuestion(sec.range[0]);

    if (!isListening && passageContainerRef.current) {
      const pContainer = passageContainerRef.current;
      const headers = pContainer.querySelectorAll<HTMLElement>("h2, h3, div");
      for (const h of headers) {
        const text = h.textContent?.toLowerCase() || "";
        if (
          text.includes(`section ${sectionId}`) ||
          text.includes(`passage ${sectionId}`) ||
          text.includes(`reading passage ${sectionId}`)
        ) {
          h.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    }
  };

  // Submit test
  const handleConfirmSubmit = async () => {
    if (isSubmitting || isSubmitted) return;

    if (!ALLOW_GUEST_TESTS && !user) {
      alert("Guest test-taking is disabled. Please sign in to submit.");
      return;
    }

    setIsSubmitting(true);
    setShowSubmitModal(false);

    const rawAnswers = answersRef.current || {};
    const sanitizedAnswers: Record<number, string> = {};
    for (const [key, val] of Object.entries(rawAnswers)) {
      if (val !== undefined && val !== null) {
        sanitizedAnswers[Number(key)] = val;
      }
    }

    // Existing scoring method (100% untouched)
    const gradeResult = gradeAttempt(sanitizedAnswers, answerKey);

    const currentUid = auth.currentUser?.uid || null;
    const isGuest = !currentUid;

    let attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const docRef = doc(collection(db, "attempts"));
      attemptId = docRef.id;

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

      await setDoc(docRef, attemptData);
    } catch (err) {
      console.error("Firestore persistence error, saving attempt fallback locally:", err);
    }

    // Always mirror to localStorage fallback for offline / immediate result retrieval
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          `ielts_test_attempt_${attemptId}`,
          JSON.stringify({
            answers: sanitizedAnswers,
            score: gradeResult.score,
            total: gradeResult.total,
            testId,
            testType,
            submittedAt: Date.now(),
          })
        );
        localStorage.removeItem(sessionKey);
      } catch (e) {
        console.error("Failed to save attempt to localStorage:", e);
      }
    }

    setIsSubmitted(true);

    // Route to existing results page
    router.push(`/tests/${testType}/${testId}/results/${attemptId}`);
  };

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[Number(k)] && answers[Number(k)].trim() !== ""
  ).length;
  const unansweredCount = Math.max(0, 40 - answeredCount);

  return (
    <AnswerContext.Provider
      value={{
        answers,
        setAnswer: setAnswerDirect,
        disabled: isSubmitted,
        isSubmitted,
      }}
    >
      <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col antialiased">
        {/* ── Top Bar: Title, Timer & Submit Action ── */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs px-4 py-2.5 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href={`/tests/${testType}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shrink-0"
                title="Exit to test directory"
              >
                <ArrowLeft size={18} />
              </Link>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {testType.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    {sections.find((s) => s.id === activeSection)?.label}
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-[#0F172A] truncate">
                  {testName}
                </h1>
              </div>
            </div>

            {/* Center: Countdown Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <Timer
                size={16}
                className={cn(
                  "transition-colors",
                  timeRemaining < 300 ? "text-amber-600 animate-pulse" : "text-emerald-700"
                )}
              />
              <span
                className={cn(
                  "font-mono font-bold text-sm tracking-wider",
                  timeRemaining < 300 ? "text-amber-700" : "text-slate-800"
                )}
              >
                {formatCountdown(timeRemaining)}
              </span>
            </div>

            {/* Right: Palette Toggle, Progress & Submit */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPaletteOpen((prev) => !prev)}
                className={cn(
                  "h-9 px-2.5 sm:px-3 text-xs font-medium border-slate-200 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-colors",
                  isPaletteOpen ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "text-slate-700"
                )}
                title={isPaletteOpen ? "Collapse Question Palette" : "Expand Question Palette"}
              >
                <LayoutGrid size={15} className="text-emerald-700" />
                <span className="hidden sm:inline">Palette</span>
                <span className="font-mono text-emerald-700 font-bold">({answeredCount}/40)</span>
              </Button>

              <div className="text-right hidden md:block">
                <div className="text-xs font-semibold text-slate-700">
                  {answeredCount} / 40
                </div>
                <div className="text-[10px] text-slate-400">
                  {unansweredCount > 0 ? `${unansweredCount} left` : "Done"}
                </div>
              </div>

              <Button
                onClick={() => setShowSubmitModal(true)}
                disabled={isSubmitting || isSubmitted}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 h-9 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send size={14} />
                <span>Submit</span>
              </Button>
            </div>
          </div>
        </header>

        {/* ── Section Quick Navigation Bar ── */}
        <nav className="bg-white border-b border-slate-200 px-4 py-2 sticky top-[57px] z-30 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
              <span className="text-xs font-medium text-slate-400 mr-1 hidden md:inline">
                Jump to:
              </span>
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                const sectionAnswered = Array.from(
                  { length: sec.range[1] - sec.range[0] + 1 },
                  (_, i) => sec.range[0] + i
                ).filter((n) => answers[n]?.trim()).length;
                const sectionTotal = sec.range[1] - sec.range[0] + 1;

                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSectionClick(sec.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer",
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    )}
                  >
                    <span>{sec.label}</span>
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded",
                        isActive
                          ? "bg-slate-800 text-slate-200"
                          : "bg-white text-slate-500 border border-slate-200"
                      )}
                    >
                      {sectionAnswered}/{sectionTotal}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reading font zoom controls */}
            {!isListening && (
              <div className="hidden sm:flex items-center gap-1 text-slate-400">
                <span className="text-[11px] mr-1">Passage Text:</span>
                <button
                  onClick={() => setPassageFontSize("sm")}
                  className={cn(
                    "w-6 h-6 rounded text-xs font-bold transition-colors cursor-pointer",
                    passageFontSize === "sm" ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 text-slate-600"
                  )}
                  title="Smaller font"
                >
                  A-
                </button>
                <button
                  onClick={() => setPassageFontSize("base")}
                  className={cn(
                    "w-6 h-6 rounded text-xs font-bold transition-colors cursor-pointer",
                    passageFontSize === "base" ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 text-slate-600"
                  )}
                  title="Normal font"
                >
                  A
                </button>
                <button
                  onClick={() => setPassageFontSize("lg")}
                  className={cn(
                    "w-6 h-6 rounded text-xs font-bold transition-colors cursor-pointer",
                    passageFontSize === "lg" ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 text-slate-600"
                  )}
                  title="Larger font"
                >
                  A+
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Main Content Area ── */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-12">
          {/* Listening audio player */}
          {isListening && passages && (
            <div className="mb-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold text-sm">
                <Volume2 className="text-emerald-700" size={18} />
                <span>Audio Recording (Listen once as in the real exam)</span>
              </div>
              <audio controls className="w-full h-10">
                <source src={typeof passages === "string" ? passages : ""} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Reading Test: 2-Column Split (Passage Left, Questions Right) */}
          {!isListening ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Reading Passage (Sticky & Independent Scroll) */}
              <section
                ref={passageContainerRef}
                className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-140px)] overflow-y-auto select-text"
              >
                <div className="border-b border-slate-100 pb-3 mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Reading Passage
                  </span>
                  <span className="text-xs text-slate-500">
                    Scroll down to read complete text
                  </span>
                </div>
                <div
                  className={cn(
                    "prose max-w-none text-slate-800 leading-relaxed",
                    passageFontSize === "sm" && "text-sm",
                    passageFontSize === "base" && "text-base",
                    passageFontSize === "lg" && "text-lg"
                  )}
                >
                  {typeof passages === "string" ? (
                    <div dangerouslySetInnerHTML={{ __html: passages }} />
                  ) : (
                    passages
                  )}
                </div>
              </section>

              {/* Right: Full Questions Sheet */}
              <section
                ref={questionsContainerRef}
                className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm overflow-y-auto select-text"
              >
                <div className="border-b border-slate-100 pb-3 mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                    Questions 1 to 40
                  </span>
                  <span className="text-xs text-slate-500">
                    Select options or fill in the blanks
                  </span>
                </div>

                <div className="questions-sheet-content">
                  {typeof questions === "string" ? (
                    <div dangerouslySetInnerHTML={{ __html: questions }} />
                  ) : (
                    questions
                  )}
                </div>

                {/* Bottom Submit Banner inside question sheet */}
                <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-xl">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Finished with all questions?
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      You can review or change your answers above anytime before submitting.
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowSubmitModal(true)}
                    disabled={isSubmitting || isSubmitted}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 h-10 rounded-lg shadow-sm shrink-0 cursor-pointer"
                  >
                    Submit Test
                  </Button>
                </div>
              </section>
            </div>
          ) : (
            /* Listening Test: Single Column Layout */
            <div
              ref={questionsContainerRef}
              className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm select-text"
            >
              <div className="border-b border-slate-100 pb-3 mb-6 flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                  Listening Questions 1 to 40
                </span>
                <span className="text-xs text-slate-500">
                  Fill in your answers as you listen
                </span>
              </div>

              <div className="questions-sheet-content">
                {typeof questions === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: questions }} />
                ) : (
                  questions
                )}
              </div>

              {/* Bottom Submit Banner inside question sheet */}
              <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Finished listening?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Check your spelling and answers before submitting.
                  </p>
                </div>
                <Button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={isSubmitting || isSubmitted}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 h-10 rounded-lg shadow-sm shrink-0 cursor-pointer"
                >
                  Submit Test
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* ── Right-Side Vertically Collapsible Question Palette ── */}
        {isPaletteOpen ? (
          <aside
            aria-label="Question Palette"
            className="fixed right-3 top-24 bottom-6 z-40 w-64 sm:w-72 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 select-none"
          >
            {/* Palette Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-xs shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <LayoutGrid size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Question Palette
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    <span className="font-semibold text-emerald-700">{answeredCount}</span> of 40 Answered
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPaletteOpen(false)}
                title="Collapse Palette"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Scrollable Questions Grid Grouped by Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {sections.map((sec) => {
                const sectionQuestions: number[] = [];
                for (let i = sec.range[0]; i <= sec.range[1]; i++) {
                  sectionQuestions.push(i);
                }
                const sectionAnswered = sectionQuestions.filter((q) => Boolean(answers[q])).length;

                return (
                  <div key={sec.id} className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
                      <span>{sec.label}</span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {sectionAnswered}/{sectionQuestions.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {sectionQuestions.map((qNum) => {
                        const isAnswered = Boolean(answers[qNum]);
                        const isActive = activeQuestion === qNum;

                        return (
                          <button
                            key={qNum}
                            type="button"
                            onClick={() => scrollToQuestion(qNum)}
                            className={cn(
                              "h-8 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center relative",
                              isAnswered
                                ? "bg-emerald-600 text-white font-semibold shadow-xs hover:bg-emerald-700"
                                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300",
                              isActive && "ring-2 ring-emerald-500 ring-offset-1 font-bold"
                            )}
                            title={`Question ${qNum}: ${isAnswered ? "Answered" : "Unanswered"}`}
                          >
                            {qNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Palette Footer / Legend */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shadow-xs" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300 inline-block" />
                <span>Unanswered</span>
              </div>
            </div>
          </aside>
        ) : (
          /* Collapsed Floating Trigger on the Right Edge */
          <button
            type="button"
            onClick={() => setIsPaletteOpen(true)}
            title="Open Question Palette"
            className="fixed right-0 top-1/3 z-40 bg-white hover:bg-slate-50 border-y border-l border-slate-300 text-slate-700 rounded-l-xl shadow-lg px-2 py-3.5 flex flex-col items-center gap-2 transition-transform hover:-translate-x-0.5 cursor-pointer group"
          >
            <ChevronLeft size={16} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
            <LayoutGrid size={16} className="text-emerald-700" />
            <span
              style={{ writingMode: "vertical-rl" }}
              className="text-[10px] font-bold font-mono tracking-wider text-slate-600 rotate-180 select-none py-1"
            >
              Palette ({answeredCount}/40)
            </span>
          </button>
        )}

        {/* ── Submit Confirmation Modal ── */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ready to Submit?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your answers will be graded against the official IELTS answer key.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Answered Questions:</span>
                  <span className="font-bold text-emerald-700 font-mono">
                    {answeredCount} / 40
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Unanswered Questions:</span>
                  <span
                    className={cn(
                      "font-bold font-mono",
                      unansweredCount > 0 ? "text-amber-600" : "text-slate-500"
                    )}
                  >
                    {unansweredCount}
                  </span>
                </div>

                {unansweredCount > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-start gap-2 text-xs text-amber-700">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>
                      You still have <strong>{unansweredCount}</strong> unanswered questions. Are you sure you want to finish now?
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 h-10 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Keep Working
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 h-10 bg-emerald-700 hover:bg-emerald-800 text-white font-medium cursor-pointer shadow-sm"
                >
                  {isSubmitting ? "Grading & Submitting..." : "Confirm & Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnswerContext.Provider>
  );
}
