"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, logOut } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { gradeAttempt, GradeResult, formatAnswer } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, updatePassword, linkWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  History,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  ChevronRight,
  FileText,
  HelpCircle,
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  User,
  Lock,
  LogOut,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Sliders,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProfileLoadingOverlay from "@/components/profile/ProfileLoadingOverlay";

interface Attempt {
  id: string;
  testId: string;
  testType: string;
  answers: Record<number, string>;
  score: number;
  total: number;
  submittedAt: any; // Firestore Timestamp
}

// Format test type to display name
function formatTestType(type: string): string {
  const typeMap: Record<string, string> = {
    general_reading: "General Reading",
    academic_reading: "Academic Reading",
    listening: "Listening",
  };
  return typeMap[type] || type.replace(/_/g, " ");
}

// Format test ID to display name
function formatTestName(id: string): string {
  let formattedName = id
    .replace(/_gr_/g, " General Reading - ")
    .replace(/_ar_/g, " Academic Reading - ")
    .replace(/_ls_/g, " Listening - ")
    .replace(/cambridge/g, "Cambridge ");

  formattedName = formattedName.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2
  );

  return formattedName;
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
  if (score >= 27) return "5.5";
  if (score >= 23) return "5.0";
  if (score >= 19) return "4.5";
  if (score >= 15) return "4.0";
  return "3.5";
}

// ----------------------------------------------------
// Reusable Progress & Stats Calculation Helpers
// ----------------------------------------------------

// Calculate Average Band Score based on IELTS rounding standard
function calculateAverageBand(attempts: Attempt[]): string {
  if (attempts.length === 0) return "N/A";
  const sum = attempts.reduce((acc, curr) => {
    return acc + parseFloat(getBandScore(curr.score, curr.testType));
  }, 0);
  
  const avg = sum / attempts.length;
  const intPart = Math.floor(avg);
  const fracPart = avg - intPart;
  
  // Standard IELTS rounding logic
  let rounded = intPart;
  if (fracPart < 0.25) {
    rounded = intPart;
  } else if (fracPart < 0.75) {
    rounded = intPart + 0.5;
  } else {
    rounded = intPart + 1.0;
  }
  return rounded.toFixed(1);
}

// Calculate Highest/Best Band Score across attempts
function calculateBestBand(attempts: Attempt[]): string {
  if (attempts.length === 0) return "N/A";
  const bands = attempts.map(a => parseFloat(getBandScore(a.score, a.testType)));
  const max = Math.max(...bands);
  return max.toFixed(1);
}

interface SkillStats {
  attemptsCount: number;
  averageBand: string;
  bestBand: string;
}

// Get metrics for grouped attempts lists
function getSkillStats(filteredAttempts: Attempt[]): SkillStats {
  if (filteredAttempts.length === 0) {
    return { attemptsCount: 0, averageBand: "N/A", bestBand: "N/A" };
  }
  return {
    attemptsCount: filteredAttempts.length,
    averageBand: calculateAverageBand(filteredAttempts),
    bestBand: calculateBestBand(filteredAttempts),
  };
}

// Helper to thin/space out dates on line chart X axis
function getXLabelVisible(index: number, total: number) {
  if (total <= 5) return true;
  if (index === 0 || index === total - 1) return true;
  const step = Math.floor(total / 4) || 1;
  return index % step === 0;
}

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const router = useRouter();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  
  // Profile settings states
  const [nameInput, setNameInput] = useState("");
  const [updatingName, setUpdatingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState("");

  // Google account linking states
  const [linkingGoogle, setLinkingGoogle] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkError, setLinkError] = useState("");

  // Password change states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState("");

  // States for reviewing a specific attempt
  const [reviewingAttempt, setReviewingAttempt] = useState<Attempt | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewResults, setReviewResults] = useState<GradeResult | null>(null);

  // Saved Practice Sessions State
  interface SavedSession {
    testId: string;
    testType: string;
    testName: string;
    mode: "practice" | "exam";
    answers: Record<number, string>;
    updatedAt: number;
  }
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);

  useEffect(() => {
    try {
      const list: SavedSession[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("ielts7_session_")) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const data = JSON.parse(raw);
            if (data && data.mode === "practice" && data.answers && Object.keys(data.answers).length > 0) {
              list.push(data);
            }
          }
        }
      }
      setSavedSessions(list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDiscardSession = (testId: string) => {
    localStorage.removeItem(`ielts7_session_${testId}`);
    setSavedSessions((prev) => prev.filter((s) => s.testId !== testId));
  };

  // Authenticated route protection
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/profile`);
    } else if (user) {
      setNameInput(user.displayName || "");
    }
  }, [user, authLoading, router]);

  // Fetch attempts from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchAttempts = async () => {
      try {
        setLoadingAttempts(true);
        
        // Primary query with ordering
        const primaryQuery = query(
          collection(db, "attempts"),
          where("uid", "==", user.uid),
          orderBy("submittedAt", "desc")
        );

        let querySnapshot;
        try {
          querySnapshot = await getDocs(primaryQuery);
        } catch (idxError) {
          console.warn("Firestore index error, falling back to client-side sorting", idxError);
          // Fallback query without ordering (to avoid index required error)
          const fallbackQuery = query(
            collection(db, "attempts"),
            where("uid", "==", user.uid)
          );
          querySnapshot = await getDocs(fallbackQuery);
        }

        const fetched: Attempt[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            testId: data.testId,
            testType: data.testType,
            answers: data.answers || {},
            score: data.score || 0,
            total: data.total || 40,
            submittedAt: data.submittedAt,
          };
        });

        // Sort on client side if fallback query was used
        fetched.sort((a, b) => {
          const timeA = a.submittedAt?.seconds || 0;
          const timeB = b.submittedAt?.seconds || 0;
          return timeB - timeA;
        });

        setAttempts(fetched);
      } catch (err) {
        console.error("Failed to load attempts:", err);
      } finally {
        setLoadingAttempts(false);
      }
    };

    fetchAttempts();
  }, [user]);

  // Fetch writing submissions from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchSubmissions = async () => {
      try {
        setLoadingSubmissions(true);
        
        // Primary query with ordering
        const primaryQuery = query(
          collection(db, "writingSubmissions"),
          where("uid", "==", user.uid),
          orderBy("submittedAt", "desc")
        );

        let querySnapshot;
        try {
          querySnapshot = await getDocs(primaryQuery);
        } catch (idxError) {
          console.warn("Writing submissions index error, falling back to client-side sorting", idxError);
          // Fallback query without ordering (to avoid index required error)
          const fallbackQuery = query(
            collection(db, "writingSubmissions"),
            where("uid", "==", user.uid)
          );
          querySnapshot = await getDocs(fallbackQuery);
        }

        const fetched = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            uid: data.uid,
            taskType: data.taskType,
            submissionMethod: data.submissionMethod,
            essayText: data.essayText,
            storagePath: data.storagePath,
            fileName: data.fileName,
            fileSize: data.fileSize,
            wordCount: data.wordCount,
            notes: data.notes,
            status: data.status || "submitted",
            submittedAt: data.submittedAt,
          };
        });

        // Sort on client side if fallback query was used
        fetched.sort((a, b) => {
          const timeA = a.submittedAt?.seconds || 0;
          const timeB = b.submittedAt?.seconds || 0;
          return timeB - timeA;
        });

        setSubmissions(fetched);
      } catch (err) {
        console.error("Failed to load writing submissions:", err);
      } finally {
        setLoadingSubmissions(false);
      }
    };

    fetchSubmissions();
  }, [user]);


  // Check if user has standard password authentication provider
  const hasPasswordProvider = user
    ? user.providerData.some((provider) => provider.providerId === "password")
    : false;

  // Handle display name update
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!nameInput.trim()) {
      setNameError("Display name cannot be empty");
      return;
    }

    setUpdatingName(true);
    setNameError("");
    setNameSuccess(false);

    try {
      await updateProfile(user, { displayName: nameInput.trim() });
      setNameSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("Name update error:", err);
      setNameError(err.message || "Failed to update profile name");
    } finally {
      setUpdatingName(false);
    }
  };

  // Handle password change update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!newPassword || !confirmPassword) {
      setPassError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPassError("Password must be at least 6 characters");
      return;
    }

    setUpdatingPass(true);
    setPassError("");
    setPassSuccess(false);

    try {
      await updatePassword(user, newPassword);
      setPassSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password update error:", err);
      if (err.code === "auth/requires-recent-login") {
        setPassError(
          "For security, password changes require a recent sign-in. Please log out and log back in to proceed."
        );
      } else {
        setPassError(err.message || "Failed to update password");
      }
    } finally {
      setUpdatingPass(false);
    }
  };

  // Handle linking Google account
  const handleLinkGoogle = async () => {
    if (!user) return;
    setLinkingGoogle(true);
    setLinkError("");
    setLinkSuccess(false);

    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(user, provider);
      await refreshUser();
      setLinkSuccess(true);
    } catch (err: any) {
      console.error("Google linking error:", err);
      if (err.code === "auth/credential-already-in-use") {
        setLinkError("This Google account is already linked to another user. Accounts cannot be merged.");
      } else if (err.code === "auth/provider-already-linked") {
        setLinkError("This account is already connected to Google.");
      } else if (err.code === "auth/popup-blocked") {
        setLinkError("Google popup was blocked by your browser. Please allow popups and retry.");
      } else if (err.code === "auth/requires-recent-login") {
        setLinkError("For security, connecting Google requires a recent sign-in. Please log out, sign in again, and retry.");
      } else if (err.code !== "auth/popup-closed-by-user") {
        setLinkError(err.message || "Failed to connect Google account. Please try again.");
      }
    } finally {
      setLinkingGoogle(false);
    }
  };

  const handleLogoutClick = async () => {
    await logOut();
    router.push("/login");
  };

  // Load detailed answer review for an attempt
  const handleOpenReview = async (attempt: Attempt) => {
    setReviewingAttempt(attempt);
    setReviewLoading(true);
    setReviewResults(null);

    try {
      let answerKey: Record<number, string | string[]> = {};

      if (attempt.testType === "listening" || attempt.testId.includes("_ls_")) {
        const match = attempt.testId.match(/cambridge(\d+)_ls_test(\d+)/);
        if (match) {
          const year = match[1];
          const testNum = parseInt(match[2]);
          const collectionId = `cambridge_${year}_listening`;
          const querySnapshot = await getDocs(collection(db, collectionId));
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            answerKey = docData[`answer_${testNum}`] || {};
          }
        }
      } else {
        const { getTestById } = await import("@/data/tests/testRegistry");
        const testData = await getTestById(attempt.testId);
        answerKey = testData.answers || {};
      }

      const graded = gradeAttempt(attempt.answers, answerKey);
      setReviewResults(graded);
    } catch (err) {
      console.error("Failed to load review answers:", err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleCloseReview = () => {
    setReviewingAttempt(null);
    setReviewResults(null);
  };

  if (authLoading || (user && (loadingAttempts || loadingSubmissions))) {
    return <ProfileLoadingOverlay />;
  }

  if (!user) return null;

  // ----------------------------------------------------
  // Calculated In-Memory Metrics (Derived strictly from attempts)
  // ----------------------------------------------------
  const hasAttempts = attempts.length > 0;
  
  const latestAttempt = hasAttempts ? attempts[0] : null;
  const latestBand = latestAttempt ? getBandScore(latestAttempt.score, latestAttempt.testType) : "N/A";
  const bestBand = calculateBestBand(attempts);
  const averageBand = calculateAverageBand(attempts);

  // Band 7 target progress percentage
  const band7Percentage = bestBand !== "N/A"
    ? Math.min(100, Math.round((parseFloat(bestBand) / 7.0) * 100))
    : 0;

  // Skill breakdowns
  const listeningAttempts = attempts.filter((a) => a.testType === "listening");
  const readingAttempts = attempts.filter((a) => a.testType === "academic_reading" || a.testType === "general_reading");
  const academicReadingAttempts = attempts.filter((a) => a.testType === "academic_reading");
  const generalReadingAttempts = attempts.filter((a) => a.testType === "general_reading");

  const listeningStats = getSkillStats(listeningAttempts);
  const readingStats = getSkillStats(readingAttempts);
  const academicStats = getSkillStats(academicReadingAttempts);
  const generalStats = getSkillStats(generalReadingAttempts);

  // Chart setup
  const chartAttempts = [...attempts].reverse(); // Oldest first
  const chartWidth = 500;
  const chartHeight = 250;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;
  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;
  const minY = 3.0;
  const maxY = 9.0;

  const points = chartAttempts.map((attempt, index) => {
    const band = parseFloat(getBandScore(attempt.score, attempt.testType));
    const x = paddingLeft + (index / (chartAttempts.length - 1 || 1)) * graphWidth;
    const y = paddingTop + graphHeight - ((band - minY) / (maxY - minY)) * graphHeight;
    return { x, y, band, attempt };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const targetY = paddingTop + graphHeight - ((7.0 - minY) / (maxY - minY)) * graphHeight;

  return (
    <div className="min-h-screen bg-cream-paper pt-12 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">

        {/* Dynamic Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Dashboard Header Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight flex items-center gap-2">
                  <Sparkles className="text-forest-ink h-7 w-7" /> Student Dashboard
                </h1>
                <p className="text-forest-ink/65 text-sm font-inter mt-1">
                  Analyze your performance trends, key metrics, and path to Band 7.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-whisper-gray px-4 py-2.5 rounded-full border border-pencil-gray/10 shrink-0">
                <History className="text-forest-ink h-5 w-5" />
                <span className="font-inter text-forest-ink/80 text-sm font-medium">
                  Attempts: <strong className="text-forest-ink font-bold">{attempts.length}</strong>
                </span>
              </div>
            </div>

            {/* Saved Practice Sessions (Resume Later) */}
            {savedSessions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-forest-ink/15 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-forest-ink/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold font-bricolage text-forest-ink">
                        Saved Practice Sessions ({savedSessions.length})
                      </h3>
                      <p className="text-xs text-forest-ink/60 font-inter">
                        Resume your practice tests anytime right where you left off.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedSessions.map((session) => {
                    const answered = Object.values(session.answers || {}).filter((v) => v?.trim()).length;
                    return (
                      <div
                        key={session.testId}
                        className="p-4 rounded-2xl bg-cream-paper/70 border border-forest-ink/10 hover:border-forest-ink/20 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full bg-forest-ink/10 text-forest-ink text-[10px] font-mono font-bold uppercase tracking-wider">
                              {formatTestType(session.testType)}
                            </span>
                            <h4 className="text-sm font-bold font-bricolage text-forest-ink mt-1.5">
                              {session.testName || formatTestName(session.testId)}
                            </h4>
                            <p className="text-xs font-mono text-forest-ink/60 mt-0.5">
                              {answered} / 40 Questions Answered
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDiscardSession(session.testId)}
                            className="p-1.5 rounded-xl text-forest-ink/40 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Discard practice draft"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="pt-2 border-t border-forest-ink/10 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-forest-ink/50">
                            {new Date(session.updatedAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>

                          <Link
                            href={`/tests/${session.testType}/${session.testId}`}
                            className="px-4 py-1.5 rounded-xl bg-forest-ink hover:bg-forest-ink/90 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                          >
                            Resume Practice <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State vs Dashboard Contents */}
            {!hasAttempts ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-pencil-gray/25 p-12 text-center flex flex-col items-center justify-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-sticky-note-blush/30 flex items-center justify-center mb-6 border border-pencil-gray/10">
                  <BookOpen className="text-forest-ink h-8 w-8" />
                </div>
                <h2 className="text-2xl font-extrabold font-bricolage text-forest-ink mb-3">
                  Your progress starts here.
                </h2>
                <p className="text-forest-ink/75 font-inter text-sm mb-8 max-w-md leading-relaxed">
                  You haven&apos;t taken any scored practice tests yet. Completing a reading or listening test will populate your dashboard metrics, band charts, and detailed skills breakdown.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link href="/tests/academic_reading">
                    <Button variant="forest" className="h-11 px-8 cursor-pointer font-semibold shadow-xs">
                      Take Reading Test
                    </Button>
                  </Link>
                  <Link href="/tests/listening">
                    <Button variant="forestOutline" className="h-11 px-8 cursor-pointer font-semibold shadow-xs">
                      Take Listening Test
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* 1. Progress Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Card 1: Tests Completed */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="bg-[#c2f0fc] border border-[#a0e1f3] rounded-2xl p-5 text-forest-ink flex flex-col justify-between min-h-[120px] shadow-xs"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/60">Completed</span>
                    <span className="text-4xl font-extrabold font-bricolage mt-2">{attempts.length}</span>
                    <span className="text-[10px] font-inter text-forest-ink/50 mt-1">Total scored tests</span>
                  </motion.div>

                  {/* Card 2: Best Band */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-[#d8f3dc] border border-[#b7e4c7] rounded-2xl p-5 text-forest-ink flex flex-col justify-between min-h-[120px] shadow-xs"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/60">Best Band</span>
                    <span className="text-4xl font-extrabold font-bricolage mt-2">{bestBand}</span>
                    <span className="text-[10px] font-inter text-forest-ink/50 mt-1">Highest calculated</span>
                  </motion.div>

                  {/* Card 3: Average Band */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fcd2c2] border border-[#f8b195] rounded-2xl p-5 text-forest-ink flex flex-col justify-between min-h-[120px] shadow-xs"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/60">Average Band</span>
                    <span className="text-4xl font-extrabold font-bricolage mt-2">{averageBand}</span>
                    <span className="text-[10px] font-inter text-forest-ink/50 mt-1">Overall standard mean</span>
                  </motion.div>

                  {/* Card 4: Latest Band */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-[#c2f0fc] border border-[#a0e1f3] rounded-2xl p-5 text-forest-ink flex flex-col justify-between min-h-[120px] shadow-xs"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/60">Latest Band</span>
                    <span className="text-4xl font-extrabold font-bricolage mt-2">{latestBand}</span>
                    <span className="text-[10px] font-inter text-forest-ink/50 mt-1">Most recent attempt</span>
                  </motion.div>
                </div>

                {/* Target Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 border border-pencil-gray/20 shadow-xs"
                >
                  <div className="flex justify-between items-center text-sm font-mono text-forest-ink/60">
                    <span className="font-semibold">Target Band 7.0 Progress</span>
                    <span className="font-bold text-forest-ink">{band7Percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-whisper-gray rounded-full overflow-hidden border border-pencil-gray/5 mt-2">
                    <motion.div
                      className="h-full bg-forest-ink rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${band7Percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-forest-ink/50 font-inter mt-2">
                    Calculated based on your highest score of <strong>{bestBand} Band</strong>. You are closer to the IELTS benchmark target.
                  </p>
                </motion.div>

                {/* 2. Performance Over Time Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-pencil-gray/20 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold font-bricolage text-forest-ink flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" /> Performance Trend
                      </h2>
                      <p className="text-xs text-forest-ink/50 mt-0.5">Scored calculated band levels over your test attempts history.</p>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="w-full overflow-x-auto scrollbar-thin">
                    <svg
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="w-full min-w-[450px] overflow-visible bg-cream-paper rounded-xl border border-pencil-gray/10"
                    >
                      {/* Grid Lines */}
                      {Array.from({ length: 6 }).map((_, idx) => {
                        const bandVal = 4 + idx;
                        const y = paddingTop + graphHeight - ((bandVal - minY) / (maxY - minY)) * graphHeight;
                        return (
                          <g key={bandVal}>
                            <line
                              x1={paddingLeft}
                              y1={y}
                              x2={chartWidth - paddingRight}
                              y2={y}
                              stroke="#e4e4e0"
                              strokeWidth={1}
                              strokeDasharray="2 2"
                            />
                            <text
                              x={paddingLeft - 8}
                              y={y + 3}
                              textAnchor="end"
                              fill="#132b1d"
                              className="text-[9px] font-mono opacity-50"
                            >
                              {bandVal.toFixed(1)}
                            </text>
                          </g>
                        );
                      })}

                      {/* Band 7 Target Line */}
                      <line
                        x1={paddingLeft}
                        y1={targetY}
                        x2={chartWidth - paddingRight}
                        y2={targetY}
                        stroke="#e2f150"
                        strokeWidth={2}
                      />
                      <text
                        x={chartWidth - paddingRight - 6}
                        y={targetY - 5}
                        textAnchor="end"
                        fill="#132b1d"
                        className="text-[9px] font-bold font-mono"
                      >
                        Band 7.0 Target
                      </text>

                      {/* Graph Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#132b1d"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Points */}
                      {points.map((p, idx) => (
                        <g key={idx}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={4}
                            fill="#fbfbf8"
                            stroke="#132b1d"
                            strokeWidth={2}
                            className="cursor-pointer hover:r-6 transition-all duration-200"
                          />
                          <text
                            x={p.x}
                            y={p.y - 8}
                            textAnchor="middle"
                            fill="#132b1d"
                            className="text-[9px] font-bold font-mono"
                          >
                            {p.band.toFixed(1)}
                          </text>
                        </g>
                      ))}

                      {/* X Axis Labels */}
                      {points.map((p, idx) => {
                        const showLabel = getXLabelVisible(idx, points.length);
                        if (!showLabel) return null;
                        const dateStr = p.attempt.submittedAt
                          ? new Date(p.attempt.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "";
                        return (
                          <text
                            key={idx}
                            x={p.x}
                            y={chartHeight - 10}
                            textAnchor="middle"
                            fill="#132b1d"
                            className="text-[8px] font-mono opacity-50"
                          >
                            {dateStr}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                </motion.div>

                {/* 3. Skill Breakdown comparing Listening vs Reading */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Skill Card 1: Listening */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#c2f0fc] border border-[#a0e1f3] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-bricolage text-forest-ink mb-2">Listening Skills</h3>
                      <p className="text-xs text-forest-ink/60 mb-6">Metrics covering all taken IELTS Listening audio practice tests.</p>
                      
                      <div className="grid grid-cols-3 gap-4 border-t border-forest-ink/10 pt-4 font-inter text-forest-ink">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Attempts</span>
                          <div className="text-xl font-bold font-mono mt-1">{listeningStats.attemptsCount}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Avg Band</span>
                          <div className="text-xl font-bold font-mono mt-1">{listeningStats.averageBand}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Best Band</span>
                          <div className="text-xl font-bold font-mono mt-1">{listeningStats.bestBand}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Skill Card 2: Reading */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#d8f3dc] border border-[#b7e4c7] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-bricolage text-forest-ink mb-2">Reading Skills</h3>
                      <p className="text-xs text-forest-ink/60 mb-6">Metrics covering Academic and General Reading passages.</p>
                      
                      <div className="grid grid-cols-3 gap-4 border-t border-forest-ink/10 pt-4 font-inter text-forest-ink mb-6">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Attempts</span>
                          <div className="text-xl font-bold font-mono mt-1">{readingStats.attemptsCount}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Avg Band</span>
                          <div className="text-xl font-bold font-mono mt-1">{readingStats.averageBand}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Best Band</span>
                          <div className="text-xl font-bold font-mono mt-1">{readingStats.bestBand}</div>
                        </div>
                      </div>

                      {/* Sub-breakdown shown conditionally */}
                      {(academicStats.attemptsCount > 0 || generalStats.attemptsCount > 0) && (
                        <div className="bg-white/40 border border-forest-ink/10 rounded-xl p-3 space-y-2 font-inter text-xs text-forest-ink">
                          {academicStats.attemptsCount > 0 && (
                            <div className="flex justify-between">
                              <span className="font-semibold">Academic Reading:</span>
                              <span className="font-mono">{academicStats.attemptsCount} attempts (Avg {academicStats.averageBand})</span>
                            </div>
                          )}
                          {generalStats.attemptsCount > 0 && (
                            <div className="flex justify-between">
                              <span className="font-semibold">General Reading:</span>
                              <span className="font-mono">{generalStats.attemptsCount} attempts (Avg {generalStats.averageBand})</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* 4. Recent Attempts List */}
                <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8">
                  <h2 className="text-xl font-bold font-bricolage text-forest-ink mb-6 flex items-center gap-2">
                    <Clock className="text-forest-ink/60 h-5 w-5" /> Recent Attempt Details
                  </h2>

                  <div className="divide-y divide-pencil-gray/10">
                    {attempts.map((attempt) => {
                      const date = attempt.submittedAt
                        ? new Date(attempt.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A";
                      const band = getBandScore(attempt.score, attempt.testType);

                      return (
                        <div
                          key={attempt.id}
                          className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <h3 className="font-bold text-forest-ink font-inter text-base">
                              {formatTestName(attempt.testId)}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-forest-ink/50 font-mono">
                              <span className="flex items-center gap-1">
                                <FileText size={13} /> {formatTestType(attempt.testType)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={13} /> {date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6">
                            <div className="flex gap-4 items-center">
                              <div className="text-right">
                                <span className="text-[9px] font-mono text-forest-ink/40 uppercase tracking-wider block">Raw Score</span>
                                <span className="font-bold text-sm text-forest-ink font-inter">
                                  {attempt.score} <span className="text-xs text-forest-ink/40">/ {attempt.total}</span>
                                </span>
                              </div>

                              <div className="w-10 h-10 rounded-full bg-sticky-note-mint/20 flex items-center justify-center border border-pencil-gray/10 shrink-0">
                                <span className="font-bold text-sm text-forest-ink font-bricolage">{band}</span>
                              </div>
                            </div>

                            <Link href={`/tests/${attempt.testType}/${attempt.testId}/results/${attempt.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl border-pencil-gray/20 text-forest-ink hover:bg-whisper-gray font-semibold font-inter shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <span>Review</span>
                                <ChevronRight size={14} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* 5. Writing Review Submissions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8">
              <h2 className="text-xl font-bold font-bricolage text-forest-ink mb-6 flex items-center gap-2">
                <FileText className="text-forest-ink/60 h-5 w-5" /> Writing Review History
              </h2>

              {loadingSubmissions ? (
                <div className="py-8 text-center text-forest-ink/50 text-sm font-inter">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-forest-ink/75" />
                  Loading submissions...
                </div>
              ) : submissions.length === 0 ? (
                <div className="py-8 text-center text-forest-ink/50 text-sm font-inter">
                  No writing submissions found.{" "}
                  <Link href="/writing-review/submit" className="text-forest-ink font-semibold hover:underline">
                    Submit your first essay!
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-pencil-gray/10">
                  {submissions.map((sub) => {
                    const date = sub.submittedAt
                      ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A";

                    return (
                      <div
                        key={sub.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-inter text-sm"
                      >
                        <div>
                          <h3 className="font-bold text-forest-ink">
                            {sub.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-forest-ink/50 font-mono mt-1">
                            <span className="capitalize">Method: {sub.submissionMethod}</span>
                            {sub.wordCount !== null && (
                              <span>{sub.wordCount} words</span>
                            )}
                            {sub.fileName && (
                              <span className="truncate max-w-[150px]" title={sub.fileName}>
                                File: {sub.fileName}
                              </span>
                            )}
                            <span>{date}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize bg-[#faf9f6] border border-pencil-gray/20 text-forest-ink">
                            {sub.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Account Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-6 md:p-8">
              
              {/* Profile Card Summary */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-pencil-gray/10 mb-6">
                <div className="w-20 h-20 rounded-full bg-forest-ink text-cream-paper flex items-center justify-center font-bold text-3xl mb-4 border border-pencil-gray/10 shadow-xs overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.email?.[0].toUpperCase() || "U"
                  )}
                </div>
                <h2 className="text-xl font-extrabold font-bricolage text-forest-ink">
                  {user.displayName || "Practice Account"}
                </h2>
                <span className="text-xs font-mono text-forest-ink/50 mt-1">{user.email}</span>
                
                <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                  {user.providerData.map((provider) => (
                    <span
                      key={provider.providerId}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-pencil-gray/25 bg-whisper-gray text-forest-ink/75 capitalize animate-fade-in"
                    >
                      {provider.providerId === "password" ? "email user" : provider.providerId.replace(".com", "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Profile settings Form */}
              <form onSubmit={handleUpdateName} className="space-y-4">
                <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User size={14} /> Profile Settings
                </h3>
                
                {nameError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{nameError}</span>
                  </div>
                )}

                {nameSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-forest-ink bg-sticky-note-mint/15 p-2 rounded-lg border border-sticky-note-mint/30">
                    <CheckCircle size={14} className="shrink-0" />
                    <span>Display name updated! Refreshing...</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="displayName" className="text-xs font-semibold text-forest-ink">
                    Display Name
                  </Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    disabled={updatingName}
                    placeholder="Enter your name"
                    className="h-9 border-pencil-gray/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={updatingName || user.displayName === nameInput}
                  variant="forest"
                  size="sm"
                  className="w-full h-9 text-xs"
                >
                  {updatingName ? (
                    <>
                      <Loader2 size={12} className="animate-spin mr-1.5" />
                      Saving...
                    </>
                  ) : (
                    "Save Display Name"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="border-t border-pencil-gray/10 my-6"></div>

              {/* Authentication Methods Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} /> Authentication Methods
                </h3>

                {linkError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 leading-normal">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{linkError}</span>
                  </div>
                )}

                {linkSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-forest-ink bg-sticky-note-mint/15 p-2 rounded-lg border border-sticky-note-mint/30">
                    <CheckCircle size={14} className="shrink-0" />
                    <span>Google account connected successfully!</span>
                  </div>
                )}

                <div className="space-y-3 font-inter">
                  {/* Email & Password Provider Status */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-pencil-gray/10 bg-whisper-gray text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold text-forest-ink">Email & Password</span>
                      <span className="text-[10px] text-forest-ink/50 font-mono mt-0.5">
                        {hasPasswordProvider ? "✓ Connected" : "○ Not connected"}
                      </span>
                    </div>
                    {!hasPasswordProvider && (
                      <span className="text-xs font-mono text-forest-ink/40 select-none">
                        (Password Setup Deferred)
                      </span>
                    )}
                  </div>

                  {/* Google SSO Provider Status */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-pencil-gray/10 bg-whisper-gray text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold text-forest-ink">Google Account</span>
                      <span className="text-[10px] text-forest-ink/50 font-mono mt-0.5">
                        {user.providerData.some((p) => p.providerId === "google.com") ? "✓ Connected" : "○ Not connected"}
                      </span>
                    </div>
                    {!user.providerData.some((p) => p.providerId === "google.com") ? (
                      <Button
                        type="button"
                        onClick={handleLinkGoogle}
                        disabled={linkingGoogle}
                        variant="forest"
                        size="sm"
                        className="h-8 px-3 text-xs"
                      >
                        {linkingGoogle ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    ) : (
                      <span className="text-xs font-semibold text-forest-ink/50 flex items-center gap-0.5 select-none">
                        ✓ Connected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Security change password Form (conditional) */}
              {hasPasswordProvider && (
                <>
                  <div className="border-t border-pencil-gray/10 my-6"></div>
                  
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <h3 className="text-sm font-mono text-forest-ink/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lock size={14} /> Change Password
                    </h3>

                    {passError && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 leading-normal">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{passError}</span>
                      </div>
                    )}

                    {passSuccess && (
                      <div className="flex items-center gap-1.5 text-xs text-forest-ink bg-sticky-note-mint/15 p-2 rounded-lg border border-sticky-note-mint/30">
                        <CheckCircle size={14} className="shrink-0" />
                        <span>Password changed successfully!</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="newPass" className="text-xs font-semibold text-forest-ink">
                        New Password
                      </Label>
                      <Input
                        id="newPass"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={updatingPass}
                        placeholder="Min 6 characters"
                        className="h-9 border-pencil-gray/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPass" className="text-xs font-semibold text-forest-ink">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPass"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={updatingPass}
                        placeholder="Repeat new password"
                        className="h-9 border-pencil-gray/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updatingPass}
                      variant="forest"
                      size="sm"
                      className="w-full h-9 text-xs"
                    >
                      {updatingPass ? (
                        <>
                          <Loader2 size={12} className="animate-spin mr-1.5" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </>
              )}

              {/* Logout Block */}
              <div className="border-t border-pencil-gray/10 my-6"></div>
              <Button
                onClick={handleLogoutClick}
                variant="forestOutline"
                className="w-full h-10 text-sm justify-center flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={16} /> Log Out
              </Button>

            </div>
          </div>
        </div>

      </div>

      {/* Review Attempt Overlay Modal */}
      {reviewingAttempt && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-cream-paper rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-pencil-gray/25 shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-bold text-lg font-bricolage text-forest-ink">
                  Attempt Review details
                </h3>
                <p className="text-xs font-mono text-forest-ink/65 mt-0.5">
                  {formatTestName(reviewingAttempt.testId)} • {formatTestType(reviewingAttempt.testType)}
                </p>
              </div>
              <button
                onClick={handleCloseReview}
                className="p-1.5 rounded-full hover:bg-whisper-gray text-forest-ink/60 hover:text-forest-ink transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              {reviewLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-2" />
                  <span className="text-forest-ink/60 font-inter text-sm">Grading attempt questions...</span>
                </div>
              ) : reviewResults ? (
                <div className="space-y-6">
                  {/* Results summary header */}
                  <div className="bg-white rounded-xl border border-pencil-gray/15 p-5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider">Estimated Band</div>
                      <div className="text-3xl font-extrabold font-bricolage text-forest-ink mt-0.5">
                        {getBandScore(reviewResults.score, reviewingAttempt.testType)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider">Score Obtained</div>
                      <div className="text-2xl font-bold text-forest-ink font-inter mt-0.5">
                        {reviewResults.score} <span className="text-sm text-forest-ink/45">/ {reviewResults.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section questions list */}
                  <div className="space-y-6">
                    {Object.entries(
                      Object.entries(reviewResults.perQuestion).reduce((acc, [numStr, detail]) => {
                        const questionNum = parseInt(numStr);
                        let section = "Section 1";
                        if (reviewingAttempt.testType === "listening") {
                          if (questionNum > 10 && questionNum <= 20) section = "Section 2";
                          else if (questionNum > 20 && questionNum <= 30) section = "Section 3";
                          else if (questionNum > 30) section = "Section 4";
                        } else {
                          if (questionNum > 14 && questionNum <= 27) section = "Section 2";
                          else if (questionNum > 27) section = "Section 3";
                        }

                        if (!acc[section]) acc[section] = [];
                        acc[section].push({
                          num: questionNum,
                          correct: detail.correct,
                          student: detail.studentAnswer,
                          correctAns: detail.correctAnswer
                        });
                        return acc;
                      }, {} as Record<string, Array<{ num: number; correct: boolean; student: string; correctAns: string }>>)
                    ).map(([section, sectionQues]) => (
                      <div key={section} className="bg-white rounded-xl border border-pencil-gray/15 p-5">
                        <h4 className="font-bold text-forest-ink font-bricolage text-lg mb-4">{section}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {sectionQues
                            .sort((a, b) => a.num - b.num)
                            .map((q) => (
                              <div
                                key={q.num}
                                className={`flex items-center justify-between p-3 rounded-lg border text-sm ${
                                  q.correct
                                    ? "bg-sticky-note-mint/5 border-sticky-note-mint/20 text-forest-ink"
                                    : "bg-sticky-note-blush/5 border-sticky-note-blush/20 text-forest-ink"
                                }`}
                              >
                                <div className="space-y-0.5 truncate max-w-[80%]">
                                  <span className="font-mono font-bold text-xs">Q{q.num}:</span>
                                  <div className="truncate text-xs">
                                    <span className="text-forest-ink/40">You: </span>
                                    <span className={q.correct ? "font-medium" : "text-[#cb5521] font-medium"}>
                                      {q.student || <em className="text-forest-ink/20">Blank</em>}
                                    </span>
                                  </div>
                                  <div className="truncate text-xs">
                                    <span className="text-forest-ink/45">Key: </span>
                                    <span className="font-mono font-medium">{q.correctAns}</span>
                                  </div>
                                </div>
                                {q.correct ? (
                                  <CheckCircle2 size={16} className="text-forest-ink shrink-0" />
                                ) : (
                                  <XCircle size={16} className="text-[#cb5521] shrink-0" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-red-500 font-inter">Failed to grade/load test answers.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-end">
              <Button variant="forest" onClick={handleCloseReview} size="sm" className="h-10 px-6 cursor-pointer">
                Close Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
