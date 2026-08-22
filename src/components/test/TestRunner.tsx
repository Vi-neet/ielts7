"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt, GradeResult, formatAnswer } from "@/lib/scoring";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnswerContext } from "./AnswerContext";
import { TestMetadata } from "@/data/tests/testRegistry";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TestRunnerProps {
  testId: string;
  testType: string;
  testName: string;
  passages: React.ReactNode | string;
  questions: React.ReactNode | string;
  answerKey: Record<number, string | string[]>;
}

// Helper to determine question number for input element (bi-directional walk)
function findQuestionNumberForInput(inputEl: HTMLInputElement, container: HTMLElement): number | null {
  // 1. Check name/id attribute for question number
  const nameOrId = inputEl.name || inputEl.id || "";
  const nameMatch = nameOrId.match(/question(\d+)|q(\d+)/i);
  if (nameMatch) {
    const num = parseInt(nameMatch[1] || nameMatch[2], 10);
    if (num >= 1 && num <= 40) return num;
  }

  const isQuestionNumberText = (text: string) => {
    const clean = text.trim();
    // Match clean numbers: "18", "18.", "(18)", "18)", "18:"
    const match = clean.match(/^[\(]?\s*(\d+)\s*[\.\:\)]?$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 40) return num;
    }
    return null;
  };

  // 2. Backward search: walk backward in document order starting from inputEl
  let current: Node | null = inputEl;
  let prevNum: number | null = null;
  let prevSteps = 0;
  while (current && prevSteps < 30) {
    if (current.previousSibling) {
      current = current.previousSibling;
      while (current.lastChild) {
        current = current.lastChild;
      }
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
      num = isQuestionNumberText((current as HTMLElement).textContent || "");
    }
    if (num !== null) {
      prevNum = num;
      break;
    }
  }

  // 3. Forward search: walk forward in document order starting from inputEl
  current = inputEl;
  let nextNum: number | null = null;
  let nextSteps = 0;
  while (current && nextSteps < 30) {
    if (current.nextSibling) {
      current = current.nextSibling;
      while (current.firstChild) {
        current = current.firstChild;
      }
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
    if (num !== null) {
      nextNum = num;
      break;
    }
  }

  // Choose the closest matching number based on distance (steps)
  if (prevNum !== null && nextNum !== null) {
    return prevSteps <= nextSteps ? prevNum : nextNum;
  }
  return prevNum !== null ? prevNum : nextNum;
}

// Convert raw score to estimated IELTS Band Score
function getBandScore(score: number, testType: string): string {
  const isAcademic = testType === "academic_reading";
  const isListening = testType === "listening";

  if (isListening) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 32) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 20) return "5.5";
    if (score >= 16) return "5.0";
    if (score >= 13) return "4.5";
    if (score >= 10) return "4.0";
    return "3.5";
  }

  if (isAcademic) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 33) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 19) return "5.5";
    if (score >= 15) return "5.0";
    if (score >= 13) return "4.5";
    if (score >= 10) return "4.0";
    return "3.5";
  }

  if (score >= 40) return "9.0";
  if (score >= 39) return "8.5";
  if (score >= 37) return "8.0";
  if (score >= 36) return "7.5";
  if (score >= 34) return "7.0";
  if (score >= 32) return "6.5";
  if (score >= 30) return "6.0";
  {
    if (score >= 27) return "5.5";
    if (score >= 23) return "5.0";
    if (score >= 19) return "4.5";
    if (score >= 15) return "4.0";
  }
  return "3.5";
}

// Answers Display Subcomponent (Practice Mode key review before submission)
function AnswersDisplay({
  answers,
  testType,
}: {
  answers: Record<number, string | string[]>;
  testType: string;
}) {
  const groupedAnswers: Record<string, Record<number, string | string[]>> = {};

  Object.entries(answers).forEach(([question, answer]) => {
    const questionNum = parseInt(question);
    let section = "Section 1";

    if (testType === "listening") {
      if (questionNum > 10 && questionNum <= 20) section = "Section 2";
      else if (questionNum > 20 && questionNum <= 30) section = "Section 3";
      else if (questionNum > 30) section = "Section 4";
    } else {
      if (questionNum > 14 && questionNum <= 27) section = "Section 2";
      else if (questionNum > 27) section = "Section 3";
    }

    if (!groupedAnswers[section]) {
      groupedAnswers[section] = {};
    }
    groupedAnswers[section][questionNum] = answer;
  });

  return (
    <div className="space-y-6">
      {Object.entries(groupedAnswers).map(([section, sectionAnswers]) => (
        <div key={section} className="bg-white rounded-2xl p-6 border border-pencil-gray/15">
          <h3 className="text-xl font-bold mb-4 font-bricolage text-forest-ink">{section}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.entries(sectionAnswers)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([question, answer]) => (
                <div
                  key={question}
                  className="flex justify-between items-center bg-whisper-gray p-3 rounded-lg border border-pencil-gray/10 text-sm font-inter"
                >
                  <span className="font-semibold text-forest-ink mr-2">{question}:</span>
                  <span className="font-mono font-medium text-right truncate max-w-[65%] text-forest-ink">
                    {formatAnswer(answer)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestRunner({
  testId,
  testType,
  testName,
  passages,
  questions,
  answerKey,
}: TestRunnerProps) {
  const { user, loading: authLoading } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputToQuestionMap = useRef<Map<HTMLInputElement, number>>(new Map());

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [reviewMode, setReviewMode] = useState<"summary" | "context">("summary");

  const isListening = testType === "listening";

  // Scan and map uncontrolled inputs inside the questions container
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Find text inputs (excluding radio, submit, hidden inputs)
    const textInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input:not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="hidden"])'
    );
    // Find radio inputs
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
      } else {
        console.warn("Defensive Fallback: Unmapped text input found in DOM.", input);
      }
    });

    radioInputs.forEach((radio) => {
      const num = findQuestionNumberForInput(radio, container);
      if (num) {
        inputToQuestionMap.current.set(radio, num);

        // Map QSM quiz format values to display letters (A/B/C/D) or clean text
        let answerValue = radio.value;
        const label = container.querySelector<HTMLElement>(`label[for="${radio.id}"]`);
        if (label) {
          const text = label.textContent?.trim() || "";
          const match = text.match(/^([A-D])\b/i); // Matches letter prefix robustly (boundary handles period/paren/spaces)
          if (match) {
            answerValue = match[1].toUpperCase();
          } else {
            answerValue = text;
          }
        }
        (radio as any)._mappedValue = answerValue;
        radio.checked = answers[num] === answerValue;
        radio.disabled = isSubmitted;
      } else {
        if (radio.style.display !== "none") {
          console.log("Defensive Fallback: Unmapped radio item in DOM.", radio);
        }
      }
    });

    const handleInputEvent = (e: Event) => {
      if (isSubmitted) return;
      const target = e.target as HTMLInputElement;
      const num = inputToQuestionMap.current.get(target);
      if (num) {
        if (target.type === "radio") {
          const val = (target as any)._mappedValue || target.value;
          setAnswers((prev) => ({ ...prev, [num]: val }));
        } else {
          setAnswers((prev) => ({ ...prev, [num]: target.value }));
        }
      }
    };

    container.addEventListener("input", handleInputEvent);
    container.addEventListener("change", handleInputEvent);

    return () => {
      container.removeEventListener("input", handleInputEvent);
      container.removeEventListener("change", handleInputEvent);
    };
  }, [questions, isSubmitted]);

  // Sync state values back to inputs whenever answers change (using cached useRef map)
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
        const val = (radio as any)._mappedValue || radio.value;
        radio.checked = answers[num] === val;
        radio.disabled = isSubmitted;
      }
    });
  }, [answers, isSubmitted]);

  const setAnswer = (num: number, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [num]: val }));
  };

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
      // Save result attempt to Firestore
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

  // Render a loading state while auth resolutions are in-progress
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
        <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-2" />
        <span className="text-forest-ink/65 font-inter text-sm">Loading test content...</span>
      </div>
    );
  }

  // Inline sign-in prompt/block if ALLOW_GUEST_TESTS is false
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
            Guest test-taking is currently disabled. Please sign in to access the test, submit answers, and receive detailed scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href={`/login?redirect=${encodeURIComponent(`/tests/${testType}/${testId}`)}`} className="w-full sm:w-auto">
              <Button variant="forest" className="w-full sm:w-auto px-8 h-11">
                Sign In to Start
              </Button>
            </Link>
            <Link href={`/signup?redirect=${encodeURIComponent(`/tests/${testType}/${testId}`)}`} className="w-full sm:w-auto">
              <Button variant="forestOutline" className="w-full sm:w-auto px-8 h-11">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render test sheet layout (for active test-taking and read-only context review)
  const renderTestLayout = (isReviewContext: boolean) => {
    const bandScore = results ? getBandScore(results.score, testType) : "N/A";
    return (
      <AnswerContext.Provider value={{ answers, setAnswer, disabled: isSubmitted, isSubmitted }}>
        <div className="w-full">
          {/* Listening Specific: Audio Player */}
          {isListening && passages && (
            <div className="audio-player-container mb-6 bg-white rounded-2xl border border-pencil-gray/25 p-4 shadow-xs">
              <audio controls className="w-full">
                <source src={passages as string} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Layout based on Listening vs Reading */}
          {isListening ? (
            <div className="w-full">
              <Tabs defaultValue="test" className="w-full">
                <TabsList className="mb-6 w-full flex justify-center bg-transparent gap-2">
                  <TabsTrigger value="test" className="px-8 rounded-full border border-pencil-gray/20 data-[state=active]:bg-forest-ink data-[state=active]:text-white data-[state=inactive]:bg-white font-inter shadow-xs cursor-pointer">
                    Test
                  </TabsTrigger>
                  <TabsTrigger value="answers" className="px-8 rounded-full border border-pencil-gray/20 data-[state=active]:bg-forest-ink data-[state=active]:text-white data-[state=inactive]:bg-white font-inter shadow-xs cursor-pointer">
                    Practice Key
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="test" forceMount className="data-[state=inactive]:hidden">
                  <div className="h-full rounded-2xl bg-white shadow-sm border border-pencil-gray/20 p-6 md:p-8 max-h-[600px] overflow-auto prose prose-lg max-w-none">
                    <div
                      ref={containerRef}
                      className="questions-container"
                      dangerouslySetInnerHTML={{ __html: questions as string }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="answers" className="p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-pencil-gray/20">
                  <h2 className="text-2xl font-bold mb-6 font-bricolage text-forest-ink">Self-Check Practice Key</h2>
                  <AnswersDisplay answers={answerKey} testType="listening" />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            /* Reading Layout */
            <div>
              <Tabs defaultValue="test" className="w-full">
                <TabsList className="mb-8 w-full flex justify-center gap-2 bg-transparent">
                  <TabsTrigger value="test" className="px-10 py-2.5 rounded-full border border-pencil-gray/20 data-[state=active]:bg-forest-ink data-[state=active]:text-white data-[state=inactive]:bg-white font-inter shadow-xs cursor-pointer">
                    Test
                  </TabsTrigger>
                  <TabsTrigger value="answers" className="px-10 py-2.5 rounded-full border border-pencil-gray/20 data-[state=active]:bg-forest-ink data-[state=active]:text-white data-[state=inactive]:bg-white font-inter shadow-xs cursor-pointer">
                    Practice Key
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="test" forceMount className="data-[state=inactive]:hidden">
                  {/* Mobile/Tablet View inside Test tab (gated at lg collapse breakpoint) */}
                  <div className="lg:hidden w-full">
                    <Tabs defaultValue="passages" className="w-full">
                      <TabsList className="mb-6 w-full bg-white/50 border border-pencil-gray/10 rounded-xl p-1 shadow-sm">
                        <TabsTrigger value="passages" className="flex-1 font-inter data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                          Passages
                        </TabsTrigger>
                        <TabsTrigger value="questions" className="flex-1 font-inter data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                          Questions
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="passages" className="p-6 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 prose max-w-none">
                        {passages}
                      </TabsContent>
                      <TabsContent value="questions" className="p-6 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 prose max-w-none">
                        <div ref={containerRef}>{questions}</div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Desktop Side-by-Side View inside Test tab (split layout at lg screen sizes) */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                    <div className="flex flex-col h-[calc(100vh-270px)]">
                      <h2 className="text-2xl font-bold mb-4 py-2 font-bricolage text-forest-ink flex items-center">
                        <div className="w-8 h-8 rounded-full bg-sticky-note-blush/30 flex items-center justify-center mr-3 border border-pencil-gray/10">
                          <span className="text-forest-ink text-sm">P</span>
                        </div>
                        Passages
                      </h2>
                      <div className="prose prose-lg max-w-none p-8 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 overflow-y-auto flex-grow scrollbar-thin">
                        {passages}
                      </div>
                    </div>

                    <div className="flex flex-col h-[calc(100vh-270px)]">
                      <h2 className="text-2xl font-bold mb-4 py-2 font-bricolage text-forest-ink flex items-center">
                        <div className="w-8 h-8 rounded-full bg-sticky-note-teal/30 flex items-center justify-center mr-3 border border-pencil-gray/10">
                          <span className="text-forest-ink text-sm">Q</span>
                        </div>
                        Questions
                      </h2>
                      <div className="prose prose-lg max-w-none p-8 bg-white rounded-2xl shadow-sm border border-pencil-gray/20 overflow-y-auto flex-grow scrollbar-thin">
                        <div ref={containerRef} className="questions-container">
                          {questions}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="answers" className="p-8 bg-white rounded-2xl shadow-sm border border-pencil-gray/20">
                  <h2 className="text-2xl font-bold mb-8 font-bricolage text-forest-ink">Self-Check Practice Key</h2>
                  <AnswersDisplay answers={answerKey} testType={testType} />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Bottom Panel (Submit action vs. Back to Review Summary action) */}
          {isReviewContext ? (
            <div className="mt-8 bg-white/85 backdrop-blur-md rounded-2xl border border-pencil-gray/20 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-forest-ink/60 h-5 w-5" />
                <span className="font-inter text-forest-ink/80 text-sm">
                  Reviewing attempt in context. Score: <strong className="text-forest-ink">{results?.score}</strong> / {results?.total} ({bandScore} Band)
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
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              {saveStatus === "error" && (
                <div className="p-4 bg-sticky-note-blush/20 border border-[#cb5521]/30 rounded-2xl flex items-start gap-2.5 text-xs text-[#cb5521] animate-fade-in font-inter">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5">Submission Failed</strong>
                    <span>Failed to save your practice attempt to the database. Please check your internet connection and try clicking "Submit Answers" again.</span>
                  </div>
                </div>
              )}
              <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-pencil-gray/20 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <ClipboardList className="text-forest-ink/60 h-5 w-5" />
                  <span className="font-inter text-forest-ink/80 text-sm">
                    Answers entered:{" "}
                    <strong className="text-forest-ink">{Object.keys(answers).filter(k => answers[Number(k)]?.trim() !== "").length}</strong> /{" "}
                    {Object.keys(answerKey).length}
                  </span>
                </div>
                <Button
                  onClick={handleFormSubmit}
                  disabled={submitting || Object.keys(answers).length === 0}
                  variant="forest"
                  className="w-full sm:w-auto h-11 px-8 cursor-pointer shadow-md font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Submitting attempt...
                    </>
                  ) : (
                    <>
                      Submit Answers <ChevronRight size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </AnswerContext.Provider>
    );
  };

  // Graded results review display (Replaces test elements once submitted)
  if (isSubmitted && results) {
    const bandScore = getBandScore(results.score, testType);

    if (reviewMode === "context") {
      return (
        <div className="container mx-auto pt-8 pb-16 px-4 md:px-8 bg-cream-paper min-h-screen">
          {/* Back and Navigation Header */}
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

          {/* Review Mode Toggle Tab bar */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1 border border-pencil-gray/25 shadow-xs">
              <button
                onClick={() => setReviewMode("summary")}
                className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
              >
                Score Summary & Questions
              </button>
              <button
                onClick={() => setReviewMode("context")}
                className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer bg-forest-ink text-white shadow-xs"
              >
                View Test Sheet Context (Read-Only)
              </button>
            </div>
          </div>

          {/* Render in-context test sheet */}
          {renderTestLayout(true)}
        </div>
      );
    }

    const pctCorrect = Math.round((results.score / results.total) * 100);
    const testTypeLabel = (
      {
        general_reading: "General Reading",
        academic_reading: "Academic Reading",
        listening: "Listening",
      } as Record<string, string>
    )[testType] || testType.replace(/_/g, " ");
    const completionDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Determine the next test ID dynamically using registry metadata
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
      if (idx !== -1 && idx < sorted.length - 1) {
        return sorted[idx + 1][0];
      }
      return null;
    };
    const nextTestId = getNextTestId();

    // Reset attempt states to retake
    const handleRetake = () => {
      setAnswers({});
      setResults(null);
      setSaveStatus("idle");
      setIsSubmitted(false);
      setReviewMode("summary");
    };

    // Calculate section-by-section scoring metrics
    const sectionScores: Record<string, { correct: number; total: number }> = {};
    const groupedResults: Record<string, Array<{ num: number; correct: boolean; student: string; correctAns: string }>> = {};
    
    Object.entries(results.perQuestion).forEach(([numStr, detail]) => {
      const questionNum = parseInt(numStr);
      let section = "Section 1";
      if (isListening) {
        if (questionNum > 10 && questionNum <= 20) section = "Section 2";
        else if (questionNum > 20 && questionNum <= 30) section = "Section 3";
        else if (questionNum > 30) section = "Section 4";
      } else {
        if (questionNum > 14 && questionNum <= 27) section = "Section 2";
        else if (questionNum > 27) section = "Section 3";
      }

      if (!groupedResults[section]) groupedResults[section] = [];
      groupedResults[section].push({
        num: questionNum,
        correct: detail.correct,
        student: detail.studentAnswer,
        correctAns: detail.correctAnswer
      });

      if (!sectionScores[section]) {
        sectionScores[section] = { correct: 0, total: 0 };
      }
      if (detail.correct) {
        sectionScores[section].correct++;
      }
      sectionScores[section].total++;
    });

    const getLearningSummary = () => {
      const score = results.score;
      const total = results.total;
      if (score === total) {
        return "Perfect score! Outstanding work on this practice test.";
      }
      if (score >= total * 0.8) {
        return `Strong performance. You answered ${score} of ${total} questions correctly. You have solid mastery of this format.`;
      }
      if (score >= total * 0.6) {
        return `Good effort. You answered ${score} of ${total} questions correctly. Check the incorrect items below to address minor gaps.`;
      }
      return `You answered ${score} of ${total} correctly. Review the questions below carefully before your next attempt to improve your accuracy.`;
    };

    return (
      <div className="container mx-auto pt-8 pb-16 px-4 md:px-8 bg-cream-paper min-h-screen">
        
        {/* Back and Navigation Header */}
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

        {/* Review Mode Toggle Tab bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 border border-pencil-gray/25 shadow-xs">
            <button
              onClick={() => setReviewMode("summary")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer bg-forest-ink text-white shadow-xs"
            >
              Score Summary & Questions
            </button>
            <button
              onClick={() => setReviewMode("context")}
              className="px-6 py-2 rounded-full font-inter font-medium text-xs transition-all cursor-pointer text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
            >
              View Test Sheet Context (Read-Only)
            </button>
          </div>
        </div>

        {/* Results summary panel with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 mb-8"
        >
          {/* Metrics grid */}
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
                  {user ? "Your score is saved to your profile history." : "You took this test as a Guest attempt."}
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
                <div className="text-forest-ink/40 text-[10px] font-mono uppercase tracking-wider">Raw Score</div>
                <div className="text-4xl font-extrabold font-bricolage text-forest-ink">
                  {results.score} <span className="text-lg text-forest-ink/40">/ {results.total}</span>
                </div>
                <div className="text-xs font-mono text-forest-ink/50 mt-0.5">{pctCorrect}% correct</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-bricolage text-forest-ink">Band Estimate</h3>
                <p className="text-forest-ink/65 text-sm font-inter">Equivalent IELTS score</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#d8f3dc] border border-[#b7e4c7] flex items-center justify-center shadow-xs shrink-0">
                <span className="text-2xl font-extrabold font-bricolage text-forest-ink">{bandScore}</span>
              </div>
            </div>
          </div>

          {/* Learning Summary block */}
          <div className="bg-white rounded-2xl p-6 border border-pencil-gray/20 shadow-xs">
            <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-2">Performance Summary</h3>
            <p className="font-inter text-forest-ink text-sm leading-relaxed">{getLearningSummary()}</p>
          </div>

          {/* Action trigger row */}
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

        {/* Section Breakdown summaries */}
        <div className="bg-white rounded-2xl p-6 border border-pencil-gray/20 shadow-xs mb-8">
          <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-4">Section Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(sectionScores).map(([secName, secScore]) => (
              <div key={secName} className="p-3 bg-whisper-gray rounded-xl border border-pencil-gray/10 text-center font-inter">
                <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">{secName}</span>
                <div className="text-lg font-bold text-forest-ink font-mono mt-1">
                  {secScore.correct} <span className="text-xs text-forest-ink/45">/ {secScore.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic question details cards */}
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([section, sectionQuestions]) => (
            <div key={section} className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 font-bricolage text-forest-ink">{section}</h3>
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
                        <span className="font-mono text-xs font-bold text-forest-ink/60">Question {q.num}</span>
                        {q.correct ? (
                          <CheckCircle2 size={16} className="text-forest-ink shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-[#cb5521] shrink-0" />
                        )}
                      </div>
                      <div className="space-y-1.5 text-xs font-inter leading-relaxed flex-grow flex flex-col justify-end">
                        <div>
                          <span className="text-forest-ink/40 text-[10px] block">Your Answer</span>
                          <span className={`font-semibold ${q.correct ? "text-forest-ink" : "text-[#cb5521]"}`}>
                            {q.student.trim() ? q.student : <em className="text-forest-ink/30 font-normal">Not answered</em>}
                          </span>
                        </div>
                        <div className="pt-0.5 border-t border-pencil-gray/5">
                          <span className="text-forest-ink/40 text-[10px] block">Correct Answer</span>
                          <span className="font-mono font-semibold text-forest-ink">{q.correctAns}</span>
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

  // Normal live test state (Pre-submission)
  return renderTestLayout(false);
}
