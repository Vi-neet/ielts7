"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ALLOW_GUEST_TESTS } from "@/lib/featureFlags";
import { gradeAttempt, GradeResult, formatAnswer, getAcceptableAnswers } from "@/lib/scoring";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { getVirtualTestIndex } from "@/lib/data/testMetadataRegistry";
import { VirtualTestIndex, TestEngineMode } from "@/lib/types/testEngine";
import TestHeader from "../TestHeader";
import QuestionNavigator from "../QuestionNavigator";
import PassageViewer from "./PassageViewer";
import QuestionWorkspace, { ViewMode } from "./QuestionWorkspace";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Loader2,
  ClipboardList,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

import ResultLoadingOverlay from "./ResultLoadingOverlay";

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
  const [viewMode, setViewMode] = useState<ViewMode>("group");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [dbError, setDbError] = useState<string | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showRestartConfirmModal, setShowRestartConfirmModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [redirectingMessage, setRedirectingMessage] = useState<string | null>(null);
  const [resultsTab, setResultsTab] = useState<"summary" | "review">("summary");
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "unanswered">("all");

  const [passageCollapsed, setPassageCollapsed] = useState(false);
  const [navigatorCollapsed, setNavigatorCollapsed] = useState(false);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ielts7_test_dark_mode") === "true";
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("ielts7_test_dark_mode", String(next));
      }
      return next;
    });
  };

  // Exam mode timer state
  const [timeRemaining, setTimeRemaining] = useState(
    mode === "exam" ? examDurationSeconds : 0
  );
  const [timerExpired, setTimerExpired] = useState(false);
  const autoSubmitCalledRef = useRef(false);

  const router = useRouter();

  const sessionKey = `ielts7_session_${testId}`;

  // Restore session state on initial load if present
  useEffect(() => {
    try {
      const cached = localStorage.getItem(sessionKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (data && Date.now() - (data.updatedAt || 0) < 24 * 60 * 60 * 1000) {
          // Verify that this draft session belongs to the current user (or guest)
          const sessionUid = data.uid || null;
          const currentUid = user?.uid || null;
          if (sessionUid !== currentUid) return;

          if (data.answers && Object.keys(data.answers).length > 0) {
            setAnswers(data.answers);
          }
          if (data.bookmarks) setBookmarks(data.bookmarks);
          if (data.checkedQuestions) setCheckedQuestions(data.checkedQuestions);
          if (data.currentQuestion) setCurrentQuestion(data.currentQuestion);
          if (mode === "exam" && typeof data.timeRemaining === "number" && data.timeRemaining > 0) {
            setTimeRemaining(data.timeRemaining);
          }
        }
      }
    } catch {
      // Storage read error ignored
    }
  }, [sessionKey, mode, user]);

  // Persist active session state to localStorage
  useEffect(() => {
    if (isSubmitted) return;
    try {
      if (Object.keys(answers).length > 0 || Object.keys(bookmarks).length > 0) {
        const payload = {
          testId,
          testType,
          testName,
          mode,
          answers,
          bookmarks,
          checkedQuestions,
          currentQuestion,
          timeRemaining,
          updatedAt: Date.now(),
          uid: user?.uid || null,
        };
        localStorage.setItem(sessionKey, JSON.stringify(payload));
      }
    } catch {
      // Storage quota error ignored
    }
  }, [testId, testType, testName, mode, answers, bookmarks, checkedQuestions, currentQuestion, timeRemaining, isSubmitted, sessionKey, user]);

  // Warn user on browser reload / tab close if answers exist
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

  const handleExitTest = (savePractice: boolean = false) => {
    if (!savePractice) {
      localStorage.removeItem(sessionKey);
    }
    setShowExitConfirmModal(false);

    if (savePractice && mode === "practice") {
      setRedirectingMessage("Saving progress & redirecting to profile...");
      setTimeout(() => {
        router.push("/profile");
      }, 100);
    } else {
      setRedirectingMessage("Redirecting to test catalog...");
      setTimeout(() => {
        router.push(`/tests?module=${testType}`);
      }, 100);
    }
  };

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
      handleSubmitTest();
    }
  }, [timerExpired, isSubmitted, submitting]);

  // ── 5. Engine Actions ──
  const setAnswer = (qNum: number, val: string) => {
    if (isSubmitted) return;
    // Do not allow editing an answer if it has already been checked in Practice mode
    if (checkedQuestions[qNum]) return;
    setAnswers((prev) => ({ ...prev, [qNum]: val }));
  };

  const handleMultiAnswerChange = (qNums: number[], selectedVals: string[]) => {
    if (isSubmitted) return;
    // Do not allow editing if any question in multi group is checked
    if (qNums.some((n) => checkedQuestions[n])) return;
    setAnswers((prev) => {
      const next = { ...prev };
      qNums.forEach((n, idx) => {
        next[n] = selectedVals[idx] || "";
      });
      return next;
    });
  };

  const toggleBookmark = (qNum: number) => {
    setBookmarks((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const checkSingleAnswer = (qNum: number) => {
    const qObj = testIndex.questions[qNum];
    const isMulti = qObj?.type === "multiple_choice_multi";
    const qNumsToCheck = isMulti && qObj?.multiSelectQuestionNumbers
      ? qObj.multiSelectQuestionNumbers
      : [qNum];

    const allQuestionsInGroupCorrect = qNumsToCheck.every((n) => {
      const studentAns = (answers[n] || "").trim().toLowerCase();
      const acceptable = getAcceptableAnswers(answerKey[n]);
      return studentAns !== "" && acceptable.includes(studentAns);
    });

    const updates: Record<number, { isCorrect: boolean; correctAnswer: string }> = {};
    for (const n of qNumsToCheck) {
      const studentAns = (answers[n] || "").trim().toLowerCase();
      const correctVal = answerKey[n];
      const acceptable = getAcceptableAnswers(correctVal);
      const isCorrect = isMulti
        ? allQuestionsInGroupCorrect
        : studentAns !== "" && acceptable.includes(studentAns);

      updates[n] = {
        isCorrect,
        correctAnswer: formatAnswer(correctVal),
      };
    }

    setCheckedQuestions((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleRestartTest = () => {
    localStorage.removeItem(sessionKey);
    setAnswers({});
    setCheckedQuestions({});
    setBookmarks({});
    setCurrentQuestion(1);
    setIsSubmitted(false);
    setResults(null);
    setSaveStatus("idle");
    setDbError(null);
    setShowRestartConfirmModal(false);
  };

  const handleSubmitTest = async () => {
    if (!ALLOW_GUEST_TESTS && !user) {
      alert("Guest test-taking is disabled. Please sign in to submit.");
      return;
    }

    localStorage.removeItem(sessionKey);
    setShowSubmitConfirmModal(false);
    setSubmitting(true);

    const latestAnswers = answersRef.current || {};
    const sanitizedAnswers: Record<number, string> = {};
    for (const [key, val] of Object.entries(latestAnswers)) {
      if (val !== undefined && val !== null) {
        sanitizedAnswers[Number(key)] = val;
      }
    }

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
    } catch (error: any) {
      console.error("Firestore persistence failed, saving local attempt fallback:", error);
    }

    // Always mirror attempt payload in localStorage so direct result URL works offline/guest
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
      } catch (e) {
        console.error("Failed to save attempt to localStorage:", e);
      }
    }

    // Short minimum delay so the student sees the grading progress animation smoothly
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Keep submitting as true so the loading overlay stays visible during route transition
    router.push(`/tests/${testType}/${testId}/results/${attemptId}`);
  };

  const handleNextQuestion = () => {
    const qObj = testIndex.questions[currentQuestion];
    if (qObj?.type === "multiple_choice_multi" && qObj.multiSelectQuestionNumbers) {
      const maxNum = Math.max(...qObj.multiSelectQuestionNumbers);
      setCurrentQuestion(Math.min(40, maxNum + 1));
    } else {
      setCurrentQuestion((q) => Math.min(40, q + 1));
    }
  };

  const handlePreviousQuestion = () => {
    const prevQNum = Math.max(1, currentQuestion - 1);
    const prevQObj = testIndex.questions[prevQNum];
    if (prevQObj?.type === "multiple_choice_multi" && prevQObj.multiSelectQuestionNumbers) {
      const minNum = Math.min(...prevQObj.multiSelectQuestionNumbers);
      setCurrentQuestion(minNum);
    } else {
      setCurrentQuestion(prevQNum);
    }
  };

  const handleNavigateQuestion = (num: number) => {
    const qObj = testIndex.questions[num];
    if (qObj?.type === "multiple_choice_multi" && qObj.multiSelectQuestionNumbers) {
      const minNum = Math.min(...qObj.multiSelectQuestionNumbers);
      setCurrentQuestion(minNum);
    } else {
      setCurrentQuestion(num);
    }
  };

  const activeQuestion = testIndex.questions[currentQuestion];
  const activeGroup = activeQuestion
    ? testIndex.groups.find((g) => g.groupId === activeQuestion.groupId) ||
      testIndex.groups[0]
    : testIndex.groups[0];

  const activeGroupQuestions = activeGroup
    ? Array.from(
        { length: activeGroup.range[1] - activeGroup.range[0] + 1 },
        (_, i) => activeGroup.range[0] + i
      ).map((qNum) => testIndex.questions[qNum]).filter(Boolean)
    : [activeQuestion];

  const currentGroupIndex = testIndex.groups.findIndex((g) => g.groupId === activeGroup?.groupId);

  const handleCheckGroupAnswers = (qNums: number[]) => {
    const updates: Record<number, { isCorrect: boolean; correctAnswer: string }> = {};
    for (const qNum of qNums) {
      const qObj = testIndex.questions[qNum];
      const isMulti = qObj?.type === "multiple_choice_multi";
      const qNumsToCheck = isMulti && qObj?.multiSelectQuestionNumbers
        ? qObj.multiSelectQuestionNumbers
        : [qNum];

      const allQuestionsInMultiCorrect = qNumsToCheck.every((n) => {
        const studentAns = (answers[n] || "").trim().toLowerCase();
        const acceptable = getAcceptableAnswers(answerKey[n]);
        return studentAns !== "" && acceptable.includes(studentAns);
      });

      const studentAns = (answers[qNum] || "").trim().toLowerCase();
      const correctVal = answerKey[qNum];
      const acceptable = getAcceptableAnswers(correctVal);
      const isCorrect = isMulti
        ? allQuestionsInMultiCorrect
        : studentAns !== "" && acceptable.includes(studentAns);

      updates[qNum] = {
        isCorrect,
        correctAnswer: formatAnswer(correctVal),
      };
    }

    setCheckedQuestions((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleNextGroup = () => {
    if (currentGroupIndex < testIndex.groups.length - 1) {
      const nextGroup = testIndex.groups[currentGroupIndex + 1];
      setCurrentQuestion(nextGroup.range[0]);
    }
  };

  const handlePreviousGroup = () => {
    if (currentGroupIndex > 0) {
      const prevGroup = testIndex.groups[currentGroupIndex - 1];
      setCurrentQuestion(prevGroup.range[0]);
    }
  };

  const activeMaxNum = activeQuestion?.type === "multiple_choice_multi" && activeQuestion.multiSelectQuestionNumbers
    ? Math.max(...activeQuestion.multiSelectQuestionNumbers)
    : currentQuestion;

  // Split pane resizing state
  const [passageWidthPercent, setPassageWidthPercent] = useState<number>(45);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const handleMouseDownResizer = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const containerWidth = window.innerWidth;
      if (containerWidth <= 768) return;
      const newPercent = (e.clientX / containerWidth) * 100;
      const clamped = Math.min(Math.max(newPercent, 25), 65);
      setPassageWidthPercent(clamped);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const canNext = activeMaxNum < 40;
  const canPrevious = currentQuestion > 1;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col overflow-hidden select-none animate-in fade-in duration-200 transition-colors duration-200", isDarkMode ? "dark-test-mode bg-[#121c0e] text-[#e8efe2]" : "bg-cream-paper text-forest-ink")}>
      {/* Test Header */}
      <TestHeader
        testName={testName}
        testType={testType}
        mode={mode}
        answeredCount={answeredCount}
        totalQuestions={40}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setShowSubmitConfirmModal(true)}
        onRestartClick={() => setShowRestartConfirmModal(true)}
        onBackClick={() => setShowExitConfirmModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Workspace Layout (Full-Height Distraction-Free Canvas) */}
      <main className="flex-1 w-full px-4 py-4 flex flex-col md:flex-row items-stretch gap-4 overflow-hidden select-text">
        {/* Left: Collapsible Passage Viewer */}
        <div
          style={{
            width: passageCollapsed ? undefined : `${passageWidthPercent}%`,
          }}
          className={cn(
            "hidden md:flex flex-col h-full shrink-0 transition-all duration-150",
            passageCollapsed ? "w-14" : ""
          )}
        >
          <PassageViewer
            passages={passages}
            testType={testType}
            passageCollapsed={passageCollapsed}
            onToggleCollapse={() => setPassageCollapsed(!passageCollapsed)}
            activePassageNumber={activeQuestion?.passageNumber || 1}
          />
        </div>

        {/* Vertical Split-Pane Resizer Handle */}
        {!passageCollapsed && (
          <div
            onMouseDown={handleMouseDownResizer}
            className={cn(
              "hidden md:flex items-center justify-center w-3 hover:w-3 cursor-col-resize group shrink-0 transition-colors py-8",
              isResizing ? "bg-forest-ink/20 rounded-full" : "hover:bg-forest-ink/10 rounded-full"
            )}
            title="Drag to resize passage and question panels"
          >
            <div className="w-1 h-8 rounded-full bg-forest-ink/30 group-hover:bg-forest-ink/60 transition-colors" />
          </div>
        )}

        {/* Middle: Question Workspace (Scrollable Panel) */}
        <div className="flex-1 h-full overflow-y-auto pr-1">
          {activeQuestion && activeGroup ? (
            <QuestionWorkspace
              question={activeQuestion}
              group={activeGroup}
              groupQuestions={activeGroupQuestions}
              totalQuestions={40}
              answers={answers}
              bookmarks={bookmarks}
              checkedQuestions={checkedQuestions}
              mode={mode}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              onSetAnswer={setAnswer}
              onMultiAnswerChange={handleMultiAnswerChange}
              onToggleBookmark={toggleBookmark}
              onCheckAnswer={checkSingleAnswer}
              onCheckGroupAnswers={handleCheckGroupAnswers}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
              onPreviousGroup={handlePreviousGroup}
              onNextGroup={handleNextGroup}
              canPrevious={canPrevious}
              canNext={canNext}
              canPreviousGroup={currentGroupIndex > 0}
              canNextGroup={currentGroupIndex < testIndex.groups.length - 1}
            />
          ) : (
            <div className="p-8 text-center text-forest-ink/60">
              Loading question...
            </div>
          )}
        </div>

        {/* Right: Persistent Question Navigator (Scrollable Panel) */}
        <div className={cn("hidden lg:block h-full shrink-0 overflow-y-auto transition-all duration-300", navigatorCollapsed ? "w-60" : "w-72")}>
          <QuestionNavigator
            testType={testType}
            questionNumbers={questionNumbers}
            answers={answers}
            bookmarks={bookmarks}
            checkedQuestions={checkedQuestions}
            currentQuestion={currentQuestion}
            mode={mode}
            isCollapsed={navigatorCollapsed}
            onToggleCollapse={() => setNavigatorCollapsed(!navigatorCollapsed)}
            onNavigate={handleNavigateQuestion}
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
                onClick={handleSubmitTest}
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

      {/* Confirmation Modal before Restart */}
      {showRestartConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-forest-ink/15 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold font-bricolage text-forest-ink">
                  Restart Test?
                </h3>
                <p className="text-xs font-mono text-amber-700/80 uppercase tracking-wider font-semibold">
                  All progress will be lost
                </p>
              </div>
            </div>

            <p className="text-sm text-forest-ink/80 leading-relaxed">
              Are you sure you want to restart this test? All your current answers, bookmarks, and progress will be reset immediately without saving.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRestartConfirmModal(false)}
                className="flex-1 h-11 border-forest-ink/20 font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleRestartTest}
                className="flex-1 h-11 bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-2xs"
              >
                <RotateCcw size={15} className="mr-1.5" />
                Yes, Restart Test
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal before Exit */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-forest-ink/15 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={22} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold font-bricolage text-forest-ink">
                  {mode === "exam" ? "Exit Exam Session?" : "Leave Practice Session?"}
                </h3>
                <p className="text-xs font-mono text-amber-800 uppercase tracking-wider font-semibold">
                  {mode === "exam" ? "Progress will be lost" : "Save or Discard Progress"}
                </p>
              </div>
            </div>

            <p className="text-sm text-forest-ink/80 leading-relaxed font-inter">
              {mode === "exam"
                ? `You have answered ${answeredCount} of 40 questions. Leaving the exam now will cancel your timed session and your unsubmitted answers will be lost.`
                : `You have answered ${answeredCount} of 40 questions. You can save your progress to your profile and resume anytime, or exit without saving.`}
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              {mode === "practice" && (
                <Button
                  type="button"
                  onClick={() => handleExitTest(true)}
                  className="w-full h-11 bg-forest-ink hover:bg-forest-ink/90 text-white font-semibold shadow-2xs flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Progress & Go to Profile
                </Button>
              )}

              <Button
                type="button"
                onClick={() => handleExitTest(false)}
                className="w-full h-10 bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-2xs"
              >
                {mode === "exam" ? "Exit & Cancel Exam" : "Exit Without Saving"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full h-10 border-forest-ink/20 font-semibold"
              >
                Continue {mode === "exam" ? "Exam" : "Practice"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Submitting Result Loading Overlay */}
      {submitting && (
        <ResultLoadingOverlay
          title="Compiling & Grading Results"
          subtitle="Please wait while we calculate your band score and generate your detailed performance report..."
        />
      )}

      {/* Redirecting / Saving Progress Buffering Overlay */}
      {redirectingMessage && (
        <div className="fixed inset-0 z-50 bg-cream-paper/95 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-forest-ink/15 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 border-4 border-forest-ink/20 border-t-forest-ink rounded-full animate-spin mx-auto" />
            <div>
              <h3 className="text-lg font-extrabold font-bricolage text-forest-ink">
                Please Wait...
              </h3>
              <p className="text-xs font-mono font-bold text-forest-ink/75 mt-1">
                {redirectingMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
