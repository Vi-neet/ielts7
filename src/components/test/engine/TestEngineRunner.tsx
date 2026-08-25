"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt, GradeResult, formatAnswer } from "@/lib/scoring";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getVirtualTestIndex } from "@/lib/data/testMetadataRegistry";
import { VirtualTestIndex, TestEngineMode } from "@/lib/types/testEngine";
import TestHeader from "../TestHeader";
import QuestionNavigator from "../QuestionNavigator";
import PassageViewer from "./PassageViewer";
import QuestionWorkspace from "./QuestionWorkspace";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";

interface TestEngineRunnerProps {
  testId: string;
  testType: string;
  testName: string;
  passages: React.ReactNode | string;
  questions: React.ReactNode | string;
  answerKey: Record<number, string | string[]>;
  mode: TestEngineMode;
  examDurationSeconds: number;
}

// ── Band score helper ───────────────────────────────────────────────────────
function calculateBandScore(score: number, testType: string): string {
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

export default function TestEngineRunner({
  testId,
  testType,
  testName,
  passages,
  answerKey,
  mode,
  examDurationSeconds,
}: TestEngineRunnerProps) {
  const { user } = useAuth();

  // 1. Construct Virtual Question Index on mount
  const [testIndex] = useState<VirtualTestIndex>(() =>
    getVirtualTestIndex(testId, answerKey)
  );

  // 2. Engine Core State
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const answersRef = useRef<Record<number, string>>(answers);
  answersRef.current = answers;

  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<number, { isCorrect: boolean; correctAnswer: string }>
  >({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [dbError, setDbError] = useState<string | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  const [passageCollapsed, setPassageCollapsed] = useState(false);

  // Exam mode timer state
  const [timeRemaining, setTimeRemaining] = useState(
    mode === "exam" ? examDurationSeconds : 0
  );
  const [timerExpired, setTimerExpired] = useState(false);
  const autoSubmitCalledRef = useRef(false);

  const questionNumbers = Array.from({ length: 40 }, (_, i) => i + 1);
  const answeredCount = questionNumbers.filter((n) => answers[n]?.trim()).length;

  // ── 3. Exam Timer Effect ──
  useEffect(() => {
    if (mode !== "exam" || isSubmitted) return;

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
  }, [mode, isSubmitted]);

  // ── 4. Auto Submit on Timer Expiration ──
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
  }, [timerExpired, isSubmitted, submitting]);

  // ── 5. Engine Actions ──
  const setAnswer = (qNum: number, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qNum]: val }));

    // Reset checked status if modified in practice mode
    if (checkedQuestions[qNum]) {
      setCheckedQuestions((prev) => {
        const next = { ...prev };
        delete next[qNum];
        return next;
      });
    }
  };

  const handleMultiAnswerChange = (qNums: number[], selectedVals: string[]) => {
    if (isSubmitted) return;
    setAnswers((prev) => {
      const next = { ...prev };
      qNums.forEach((n, idx) => {
        next[n] = selectedVals[idx] || "";
        if (checkedQuestions[n]) {
          delete checkedQuestions[n];
        }
      });
      return next;
    });
  };

  const toggleBookmark = (qNum: number) => {
    setBookmarks((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const checkSingleAnswer = (qNum: number) => {
    const studentAns = (answers[qNum] || "").trim().toLowerCase();
    const correctVal = answerKey[qNum];
    const acceptable = Array.isArray(correctVal)
      ? correctVal.map((v) => String(v).trim().toLowerCase())
      : String(correctVal).split(/\s+OR\s+|,\s*|\s*\/\s*/i).map((v) => v.trim().toLowerCase());

    const isCorrect =
      studentAns !== "" && acceptable.some((opt) => opt === studentAns);

    setCheckedQuestions((prev) => ({
      ...prev,
      [qNum]: {
        isCorrect,
        correctAnswer: formatAnswer(correctVal),
      },
    }));
  };

  // ── 6. Form Submission & Grading ──
  const handleFormSubmit = async () => {
    if ((isSubmitted && saveStatus !== "error") || submitting) return;

    if (!user && !ALLOW_GUEST_TESTS) {
      alert("Guest test-taking is disabled. Please sign in to submit.");
      return;
    }

    setShowSubmitConfirmModal(false);
    setSubmitting(true);

    const latestAnswers = answersRef.current || {};
    const sanitizedAnswers: Record<number, string> = {};
    for (const [key, val] of Object.entries(latestAnswers)) {
      if (val !== undefined && val !== null) {
        sanitizedAnswers[Number(key)] = val;
      }
    }

    // Local grading executes synchronously
    const gradeResult = gradeAttempt(sanitizedAnswers, answerKey);
    setResults(gradeResult);
    setIsSubmitted(true);

    // Firestore async persistence
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
        console.error("Firestore persistence failed:", error);
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

  const activeQuestion = testIndex.questions[currentQuestion];
  const activeGroup = activeQuestion
    ? testIndex.groups.find((g) => g.groupId === activeQuestion.groupId) ||
      testIndex.groups[0]
    : testIndex.groups[0];

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      {/* Test Header */}
      <TestHeader
        testName={testName}
        testType={testType}
        mode={mode}
        answeredCount={answeredCount}
        totalQuestions={40}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setShowSubmitConfirmModal(true)}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Left: Collapsible Passage Viewer */}
        <PassageViewer
          passages={passages}
          passageCollapsed={passageCollapsed}
          onToggleCollapse={() => setPassageCollapsed(!passageCollapsed)}
          activePassageNumber={activeQuestion?.passageNumber || 1}
        />

        {/* Middle: Question Workspace (One Question at a Time) */}
        <div className="flex-1">
          {activeQuestion && activeGroup ? (
            <QuestionWorkspace
              question={activeQuestion}
              group={activeGroup}
              totalQuestions={40}
              answers={answers}
              isBookmarked={Boolean(bookmarks[currentQuestion])}
              checkedState={checkedQuestions[currentQuestion]}
              mode={mode}
              onSetAnswer={setAnswer}
              onMultiAnswerChange={handleMultiAnswerChange}
              onToggleBookmark={toggleBookmark}
              onCheckAnswer={checkSingleAnswer}
              onPrevious={() => setCurrentQuestion((q) => Math.max(1, q - 1))}
              onNext={() => setCurrentQuestion((q) => Math.min(40, q + 1))}
              canPrevious={currentQuestion > 1}
              canNext={currentQuestion < 40}
            />
          ) : (
            <div className="p-8 text-center text-forest-ink/60">
              Loading question...
            </div>
          )}
        </div>

        {/* Right: Persistent Question Navigator */}
        <div className="hidden lg:block w-72 shrink-0">
          <QuestionNavigator
            testType={testType}
            questionNumbers={questionNumbers}
            answers={answers}
            bookmarks={bookmarks}
            checkedQuestions={checkedQuestions}
            currentQuestion={currentQuestion}
            mode={mode}
            onNavigate={(num) => setCurrentQuestion(num)}
          />
        </div>
      </main>

      {/* Confirmation Modal before Submit */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-forest-ink/15 shadow-xl space-y-4">
            <h3 className="text-lg font-extrabold font-bricolage text-forest-ink">
              Submit Test?
            </h3>
            <p className="text-sm text-forest-ink/80">
              You have answered <strong>{answeredCount}</strong> of 40 questions.{" "}
              {40 - answeredCount > 0 && (
                <span className="text-amber-800">
                  {40 - answeredCount} questions remain unanswered.
                </span>
              )}
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="forest"
                onClick={handleFormSubmit}
                disabled={submitting}
                className="flex-1 h-11 font-semibold"
              >
                {submitting ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : null}
                Yes, Submit Test
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="h-11 border-forest-ink/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results View Modal */}
      {isSubmitted && results && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-forest-ink/20 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-forest-ink text-white flex items-center justify-center mx-auto shadow-md">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-extrabold font-bricolage text-forest-ink">
                Test Completed!
              </h2>
              <p className="text-xs font-mono tracking-wider text-forest-ink/60 uppercase">
                {testName}
              </p>
            </div>

            {/* Score & Band */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-forest-ink/5 border border-forest-ink/10 text-center">
              <div>
                <p className="text-xs font-mono uppercase text-forest-ink/50 mb-1">
                  Raw Score
                </p>
                <p className="text-3xl font-extrabold font-bricolage text-forest-ink">
                  {results.score} / {results.total}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-forest-ink/50 mb-1">
                  Band Score
                </p>
                <p className="text-3xl font-extrabold font-bricolage text-emerald-600">
                  {calculateBandScore(results.score, testType)}
                </p>
              </div>
            </div>

            {/* Save Status / DB Notice */}
            {saveStatus === "error" && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>
                  Results saved locally. Cloud sync pending ({dbError}).
                </span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="forest"
                onClick={() => window.location.reload()}
                className="flex-1 h-12 rounded-xl font-semibold shadow-sm"
              >
                <RotateCcw size={16} className="mr-2" /> Take Another Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
