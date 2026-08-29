"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, logOut } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
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
  CheckCircle,
  TrendingUp,
  Sliders,
  ChevronDown,
  Shield,
  User,
  Lock,
  LogOut,
  AlertCircle,
  Target,
  Globe,
  GraduationCap
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

  // Candidate IELTS Demographics States
  const [gender, setGender] = useState("");
  const [targetModule, setTargetModule] = useState("academic");
  const [targetBand, setTargetBand] = useState("7.0");
  const [targetDate, setTargetDate] = useState("");
  const [primaryPurpose, setPrimaryPurpose] = useState("university");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [savingDemo, setSavingDemo] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoError, setDemoError] = useState("");

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

  // States for reviewing a specific essay submission
  const [reviewingEssay, setReviewingEssay] = useState<any | null>(null);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<"progress" | "writing" | "practice" | "settings">("progress");

  // Saved Practice Sessions State
  interface SavedSession {
    testId: string;
    testType: string;
    testName: string;
    mode: "practice" | "exam";
    answers: Record<number, string>;
    updatedAt: number;
    uid?: string | null;
  }
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);

  useEffect(() => {
    try {
      const list: SavedSession[] = [];
      const currentUid = user?.uid || null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("ielts7_session_")) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const data = JSON.parse(raw);
            if (data && data.mode === "practice" && data.answers && Object.keys(data.answers).length > 0) {
              const sessionUid = data.uid || null;
              if (sessionUid === currentUid) {
                list.push(data);
              }
            }
          }
        }
      }
      setSavedSessions(list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
    } catch {
      // Ignore storage errors
    }
  }, [user]);

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

  // Fetch IELTS Candidate Demographics from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.gender) setGender(data.gender);
          if (data.targetModule) setTargetModule(data.targetModule);
          if (data.targetBand) setTargetBand(data.targetBand);
          if (data.targetDate) setTargetDate(data.targetDate);
          if (data.primaryPurpose) setPrimaryPurpose(data.primaryPurpose);
          if (data.nativeLanguage) setNativeLanguage(data.nativeLanguage);
          if (data.country) setCountry(data.country);
        }
      } catch (err) {
        console.error("Failed to load user demographics:", err);
      }
    };
    fetchUserData();
  }, [user]);

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
            score: data.score || null,
            scores: data.scores || null,
            annotations: data.annotations || [],
            feedbackText: data.feedbackText || "",
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

  // Handle candidate demographics update
  const handleSaveDemographics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingDemo(true);
    setDemoError("");
    setDemoSuccess(false);

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          gender,
          targetModule,
          targetBand,
          targetDate,
          primaryPurpose,
          nativeLanguage,
          country,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      setDemoSuccess(true);
      setTimeout(() => setDemoSuccess(false), 3000);
    } catch (err: any) {
      console.error("Failed to save candidate demographics:", err);
      setDemoError("Failed to save profile details.");
    } finally {
      setSavingDemo(false);
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

  const renderAnnotatedText = (text: string, list: any[]) => {
    if (!list || list.length === 0) return text;
    const sorted = [...list].sort((a, b) => a.start - b.start);
    const elements: React.ReactNode[] = [];
    let lastIdx = 0;

    sorted.forEach((ann, i) => {
      if (ann.start > lastIdx) {
        elements.push(text.substring(lastIdx, ann.start));
      }

      const colorMap = {
        grammar: "bg-terracotta/20 border-b-2 border-terracotta text-forest-ink",
        vocabulary: "bg-highlighter-yellow/30 border-b-2 border-highlighter-yellow text-forest-ink",
        coherence: "bg-sticky-note-teal/20 border-b-2 border-sticky-note-teal text-forest-ink",
        task: "bg-sticky-note-blush/30 border-b-2 border-purple-500 text-forest-ink",
      };

      const highlightClass = colorMap[ann.category as keyof typeof colorMap] || "bg-amber-100";

      elements.push(
        <span
          key={`ann-${i}`}
          className={`relative group px-1 font-medium rounded-sm cursor-help transition-all ${highlightClass}`}
        >
          {text.substring(ann.start, ann.end)}
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-forest-ink text-white text-[11px] p-3 rounded-xl shadow-lg z-50 leading-relaxed font-inter">
            <strong className="block text-[9px] uppercase font-bold text-highlighter-yellow tracking-wider mb-1">
              {ann.category === "grammar" ? "Grammar & Accuracy" : ann.category} Correction
            </strong>
            {ann.comment}
          </span>
        </span>
      );
      lastIdx = ann.end;
    });

    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }

    return <div className="whitespace-pre-wrap">{elements}</div>;
  };

  const renderProgressTab = () => (
    <div className="space-y-8">
      {/* Bento Metrics */}
      {hasAttempts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl border border-forest-ink/10 p-5 shadow-sm flex flex-col justify-between min-h-[110px]">
            <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/50">Completed</span>
            <span className="text-3xl font-extrabold font-bricolage text-forest-ink mt-2">{attempts.length}</span>
            <span className="text-[11px] text-forest-ink/50">Scored exams taken</span>
          </div>
          <div className="bg-white rounded-3xl border border-emerald-200/80 bg-emerald-50/20 p-5 shadow-sm flex flex-col justify-between min-h-[110px]">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">Best Band</span>
            <span className="text-3xl font-extrabold font-bricolage text-emerald-700 mt-2">{bestBand}</span>
            <span className="text-[11px] text-emerald-700/70">Highest score achieved</span>
          </div>
          <div className="bg-white rounded-3xl border border-forest-ink/10 p-5 shadow-sm flex flex-col justify-between min-h-[110px]">
            <span className="text-xs font-mono uppercase tracking-wider text-forest-ink/50">Average Band</span>
            <span className="text-3xl font-extrabold font-bricolage text-forest-ink mt-2">{averageBand}</span>
            <span className="text-[11px] text-forest-ink/50">Standard IELTS mean</span>
          </div>
          <div className="bg-white rounded-3xl border border-forest-ink/10 p-5 shadow-sm flex flex-col justify-between min-h-[110px]">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-forest-ink font-mono uppercase tracking-wider text-forest-ink/50">Band 7.0 Progress</span>
              <span className="font-mono text-forest-ink font-bold">{band7Percentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-forest-ink/10 rounded-full overflow-hidden my-2">
              <motion.div
                className="h-full bg-forest-ink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${band7Percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] text-forest-ink/50">Target Band 7.0 Goal</span>
          </div>
        </div>
      )}

      {/* Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {!hasAttempts ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-forest-ink/10 p-12 text-center flex flex-col items-center justify-center py-16 shadow-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-sticky-note-mint/30 flex items-center justify-center mb-5 border border-forest-ink/10 text-forest-ink">
                <BookOpen size={30} />
              </div>
              <h2 className="text-2xl font-bold font-bricolage text-forest-ink mb-2">
                No Test Results Recorded Yet
              </h2>
              <p className="text-forest-ink/70 text-sm max-w-md mb-8 leading-relaxed">
                Take your first Cambridge Reading or Listening exam to automatically populate your band score metrics, progress trends, and detailed review feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tests/academic_reading">
                  <Button variant="forest" className="h-11 px-6 font-semibold shadow-xs cursor-pointer">
                    Start Reading Test
                  </Button>
                </Link>
                <Link href="/tests/listening">
                  <Button variant="forestOutline" className="h-11 px-6 font-semibold shadow-xs cursor-pointer">
                    Start Listening Test
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Performance Trend Chart */}
              <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold font-bricolage text-forest-ink flex items-center gap-2">
                      <TrendingUp size={20} className="text-forest-ink/70" /> Performance Trend
                    </h2>
                    <p className="text-xs text-forest-ink/60 mt-0.5">Calculated band score progression over your test attempt history.</p>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full min-w-[450px] overflow-visible bg-[#faf9f5] rounded-2xl border border-forest-ink/10"
                  >
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
                            stroke="#e2e1d7"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                          />
                          <text
                            x={paddingLeft - 8}
                            y={y + 3}
                            textAnchor="end"
                            fill="#1a3300"
                            className="text-[9px] font-mono opacity-50"
                          >
                            {bandVal.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}

                    <line
                      x1={paddingLeft}
                      y1={targetY}
                      x2={chartWidth - paddingRight}
                      y2={targetY}
                      stroke="#cb5521"
                      strokeWidth={1.5}
                      strokeDasharray="4 2"
                    />
                    <text
                      x={chartWidth - paddingRight - 6}
                      y={targetY - 5}
                      textAnchor="end"
                      fill="#cb5521"
                      className="text-[9px] font-bold font-mono"
                    >
                      Target 7.0
                    </text>

                    <path
                      d={pathD}
                      fill="none"
                      stroke="#1a3300"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {points.map((p, idx) => (
                      <g key={idx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={4}
                          fill="#ffffff"
                          stroke="#1a3300"
                          strokeWidth={2}
                        />
                        <text
                          x={p.x}
                          y={p.y - 8}
                          textAnchor="middle"
                          fill="#1a3300"
                          className="text-[9px] font-bold font-mono"
                        >
                          {p.band.toFixed(1)}
                        </text>
                      </g>
                    ))}

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
                          fill="#1a3300"
                          className="text-[8px] font-mono opacity-50"
                        >
                          {dateStr}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Recent Attempt Details Table */}
              <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-bold font-bricolage text-forest-ink flex items-center gap-2">
                  <Clock size={20} className="text-forest-ink/70" /> Recent Test History
                </h2>

                <div className="divide-y divide-forest-ink/10">
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
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h3 className="font-bold text-forest-ink text-sm sm:text-base leading-snug">
                            {formatTestName(attempt.testId)}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-forest-ink/60 font-mono">
                            <span className="px-2 py-0.5 rounded bg-forest-ink/5 border border-forest-ink/10 text-[10px] uppercase font-bold">
                              {formatTestType(attempt.testType)}
                            </span>
                            <span>{date}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-5">
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-forest-ink/40 uppercase block">Estimated Band</span>
                            <span className="text-base font-bold text-forest-ink font-mono">{band}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="forestOutline"
                            onClick={() => handleOpenReview(attempt)}
                            className="px-3 text-xs rounded-lg cursor-pointer"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar: Skills Breakdown */}
        <div className="lg:col-span-1 space-y-8">
          {hasAttempts ? (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-bricolage text-forest-ink flex items-center gap-2">
                  <BookOpen size={18} className="text-forest-ink/70" /> Listening Skills
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-forest-ink/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Taken</span>
                    <strong className="text-base font-bold font-mono">{listeningStats.attemptsCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Avg Band</span>
                    <strong className="text-base font-bold font-mono">{listeningStats.averageBand}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Best</span>
                    <strong className="text-base font-bold font-mono text-emerald-700">{listeningStats.bestBand}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-bricolage text-forest-ink flex items-center gap-2">
                  <FileText size={18} className="text-forest-ink/70" /> Reading Skills
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-forest-ink/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Taken</span>
                    <strong className="text-base font-bold font-mono">{readingStats.attemptsCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Avg Band</span>
                    <strong className="text-base font-bold font-mono">{readingStats.averageBand}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/50 block">Best</span>
                    <strong className="text-base font-bold font-mono text-emerald-700">{readingStats.bestBand}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 shadow-sm text-center py-12 flex flex-col items-center justify-center">
              <TrendingUp size={24} className="text-forest-ink/40 mb-3" />
              <h4 className="text-xs font-bold text-forest-ink/65 font-bricolage">Unlock Analytics</h4>
              <p className="text-[11px] text-forest-ink/50 mt-1 max-w-[180px] leading-relaxed">
                Complete standard test assessments to begin tracking diagnostic skill metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderWritingTab = () => (
    <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-forest-ink/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-forest-ink/5 text-forest-ink flex items-center justify-center shrink-0">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold font-bricolage text-forest-ink">
            Essay Review History
          </h2>
          <p className="text-xs text-forest-ink/60">
            Track the evaluation status and detailed band breakdown of your submitted essays.
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-forest-ink/5 text-forest-ink/55 flex items-center justify-center mb-4">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-forest-ink font-bricolage text-base">No Essays Submitted</h3>
          <p className="text-xs text-forest-ink/50 max-w-sm mt-1 leading-relaxed text-center">
            You haven't submitted any essays for evaluation yet. Submit your Task 1 or Task 2 essay to receive professional grading.
          </p>
          <div className="mt-5">
            <Link href="/writing-review">
              <Button variant="forest" size="sm" className="px-4 rounded-xl cursor-pointer">
                Submit Essay for Review
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-forest-ink/10">
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
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-forest-ink text-sm sm:text-base leading-snug">
                      {sub.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                    </h3>
                    {sub.status === "graded" && sub.score && (
                      <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded-md bg-forest-ink text-white">
                        Band {sub.score}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-forest-ink/60 font-mono">
                    <span className="capitalize">Method: {sub.submissionMethod}</span>
                    {sub.wordCount !== null && (
                      <span>{sub.wordCount} words</span>
                    )}
                    <span>{date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  {sub.status === "graded" ? (
                    <Button
                      size="sm"
                      variant="forest"
                      onClick={() => setReviewingEssay(sub)}
                      className="text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
                    >
                      View Feedback
                    </Button>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase font-mono bg-forest-ink/5 border border-forest-ink/10 text-forest-ink/65">
                      Pending Evaluation
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderPracticeTab = () => (
    <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-forest-ink/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-forest-ink/5 text-forest-ink flex items-center justify-center shrink-0">
          <Clock size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold font-bricolage text-forest-ink">
            In-Progress Practice Drafts
          </h2>
          <p className="text-xs text-forest-ink/60">
            Pick up right where you left off on practice tests or exams.
          </p>
        </div>
      </div>

      {savedSessions.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-forest-ink/5 text-forest-ink/55 flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-forest-ink font-bricolage text-base">No Drafts Saved</h3>
          <p className="text-xs text-forest-ink/50 max-w-sm mt-1 leading-relaxed text-center">
            Start any reading or listening test and save it as a draft to resume later. Your progress will appear here.
          </p>
          <div className="mt-5">
            <Link href="/tests">
              <Button variant="forest" size="sm" className="px-4 rounded-xl cursor-pointer">
                Browse Practice Tests
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedSessions.map((session) => {
            const answered = Object.values(session.answers || {}).filter((v) => v?.trim()).length;
            return (
              <div
                key={session.testId}
                className="p-4 rounded-2xl bg-[#faf9f5] border border-forest-ink/10 hover:border-forest-ink/20 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-ink/10 text-forest-ink text-[10px] font-mono font-bold uppercase tracking-wider">
                      {formatTestType(session.testType)}
                    </span>
                    <h4 className="text-sm font-bold font-bricolage text-forest-ink mt-1.5 leading-snug">
                      {session.testName || formatTestName(session.testId)}
                    </h4>
                    <p className="text-xs font-mono text-forest-ink/60 mt-1">
                      {answered} / 40 Questions Answered
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDiscardSession(session.testId)}
                    className="p-1.5 rounded-lg text-forest-ink/40 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Discard draft"
                  >
                    <X size={15} />
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
                    className="px-3.5 py-1.5 rounded-xl bg-forest-ink hover:bg-forest-ink/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    Resume <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleUpdateName} className="space-y-4">
          <h3 className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 border-b border-forest-ink/10 pb-3">
            <User size={16} className="text-forest-ink/70" /> Account Settings
          </h3>

          {nameError && (
            <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <AlertCircle size={14} className="shrink-0" />
              <span>{nameError}</span>
            </div>
          )}

          {nameSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle size={14} className="shrink-0" />
              <span>Display name updated!</span>
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
              placeholder="Enter full name"
              className="h-10 border-forest-ink/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={updatingName || user.displayName === nameInput}
            variant="forest"
            size="sm"
            className="w-full h-10 text-xs font-semibold rounded-xl cursor-pointer"
          >
            {updatingName ? (
              <>
                <Loader2 size={13} className="animate-spin mr-1.5" />
                Saving...
              </>
            ) : (
              "Save Display Name"
            )}
          </Button>
        </form>

        <form onSubmit={handleSaveDemographics} className="space-y-4 pt-2 border-t border-forest-ink/10">
          <h3 className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2">
            <GraduationCap size={16} className="text-forest-ink/70" /> Candidate Profile & Goals
          </h3>

          {demoError && (
            <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <AlertCircle size={14} className="shrink-0" />
              <span>{demoError}</span>
            </div>
          )}

          {demoSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle size={14} className="shrink-0" />
              <span>Candidate profile saved!</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="gender" className="text-xs font-semibold text-forest-ink">
              Gender / Salutation
            </Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-Binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="targetModule" className="text-xs font-semibold text-forest-ink">
              Target Exam Module
            </Label>
            <select
              id="targetModule"
              value={targetModule}
              onChange={(e) => setTargetModule(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink"
            >
              <option value="academic">Academic (University / Professional)</option>
              <option value="general">General Training (Migration / Work)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="targetBand" className="text-xs font-semibold text-forest-ink">
                Target Band
              </Label>
              <select
                id="targetBand"
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold"
              >
                <option value="6.0">Band 6.0</option>
                <option value="6.5">Band 6.5</option>
                <option value="7.0">Band 7.0</option>
                <option value="7.5">Band 7.5</option>
                <option value="8.0">Band 8.0</option>
                <option value="8.5+">Band 8.5+</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="targetDate" className="text-xs font-semibold text-forest-ink">
                Target Date
              </Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="h-10 border-forest-ink/20 text-xs rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="primaryPurpose" className="text-xs font-semibold text-forest-ink">
              Primary Goal / Purpose
            </Label>
            <select
              id="primaryPurpose"
              value={primaryPurpose}
              onChange={(e) => setPrimaryPurpose(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink"
            >
              <option value="university">Higher Education / University</option>
              <option value="immigration">Immigration / Permanent Residency</option>
              <option value="professional">Professional Registration</option>
              <option value="work">Work Visa / Employment</option>
              <option value="personal">Personal Self-Assessment</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nativeLanguage" className="text-xs font-semibold text-forest-ink">
                Native Language
              </Label>
              <Input
                id="nativeLanguage"
                type="text"
                placeholder="e.g. Punjabi, Hindi..."
                value={nativeLanguage}
                onChange={(e) => setNativeLanguage(e.target.value)}
                className="h-10 border-forest-ink/20 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="country" className="text-xs font-semibold text-forest-ink">
                Country of Origin
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g. India, Nepal..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-10 border-forest-ink/20 text-xs rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={savingDemo}
            variant="forest"
            size="sm"
            className="w-full h-10 text-xs font-semibold rounded-xl cursor-pointer"
          >
            {savingDemo ? (
              <>
                <Loader2 size={13} className="animate-spin mr-1.5" />
                Saving Candidate Profile...
              </>
            ) : (
              "Save Candidate Profile"
            )}
          </Button>
        </form>
      </div>

      <div className="lg:col-span-5 bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6 h-fit">
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 border-b border-forest-ink/10 pb-3">
            <Shield size={16} className="text-forest-ink/70" /> Authentication Providers
          </h3>

          {linkError && (
            <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <AlertCircle size={14} className="shrink-0" />
              <span>{linkError}</span>
            </div>
          )}

          {linkSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle size={14} className="shrink-0" />
              <span>Google account linked successfully!</span>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-forest-ink/10 bg-[#faf9f5] text-sm">
              <div>
                <span className="font-semibold text-forest-ink block text-xs">Email & Password</span>
                <span className="text-[10px] text-forest-ink/60 font-mono">
                  {hasPasswordProvider ? "Connected" : "Not connected"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-forest-ink/10 bg-[#faf9f5] text-sm">
              <div>
                <span className="font-semibold text-forest-ink block text-xs">Google Account</span>
                <span className="text-[10px] text-forest-ink/60 font-mono">
                  {user.providerData.some((p) => p.providerId === "google.com") ? "Connected" : "Not connected"}
                </span>
              </div>
              {!user.providerData.some((p) => p.providerId === "google.com") && (
                <Button
                  type="button"
                  onClick={handleLinkGoogle}
                  disabled={linkingGoogle}
                  variant="forest"
                  size="sm"
                  className="px-3 text-xs rounded-lg cursor-pointer"
                >
                  {linkingGoogle ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    "Connect"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {hasPasswordProvider && (
          <form onSubmit={handleUpdatePassword} className="space-y-4 pt-4 border-t border-forest-ink/10">
            <h3 className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2">
              <Lock size={16} className="text-forest-ink/70" /> Change Password
            </h3>

            {passError && (
              <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                <AlertCircle size={14} className="shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
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
                className="h-10 border-forest-ink/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm rounded-xl"
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
                className="h-10 border-forest-ink/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-sm rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={updatingPass}
              variant="forest"
              size="sm"
              className="w-full h-10 text-xs font-semibold rounded-xl cursor-pointer"
            >
              {updatingPass ? (
                <>
                  <Loader2 size={13} className="animate-spin mr-1.5" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f5] text-forest-ink pt-8 pb-24 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── 1. Restored Signature Dark Forest Ink Hero Banner ── */}
        <div className="relative bg-forest-ink text-white rounded-3xl p-6 sm:p-8 shadow-md overflow-hidden">
          {/* Graph Paper Grid Watermark SVG */}
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Candidate Identity */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 text-white flex items-center justify-center font-bricolage font-bold text-2xl sm:text-3xl border border-white/20 shadow-xs overflow-hidden shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.email?.[0].toUpperCase() || "U"
                )}
              </div>
              <div className="space-y-0.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-white tracking-tight">
                  {user.displayName || "Practice Candidate"}
                </h1>
                <p className="text-white/60 text-xs font-mono">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Quick Stat Summary Bar & Logout Button */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/15 backdrop-blur-xs text-xs font-mono">
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Tests</span>
                  <strong className="text-white font-bold text-base">{attempts.length}</strong>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Best</span>
                  <strong className="text-highlighter-yellow font-bold text-base">{bestBand}</strong>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Target</span>
                  <strong className="text-white font-bold text-base">7.0+</strong>
                </div>
              </div>

              <Button
                onClick={handleLogoutClick}
                variant="outline"
                size="sm"
                className="h-10 px-4 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-forest-ink font-semibold font-inter shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-pencil-gray/20 font-inter gap-2 sm:gap-6 overflow-x-auto scrollbar-none pb-0.5 mt-2">
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "progress"
                ? "border-forest-ink text-forest-ink font-bold"
                : "border-transparent text-forest-ink/50 hover:text-forest-ink/80"
            }`}
          >
            My Progress & Stats
          </button>
          <button
            onClick={() => setActiveTab("writing")}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "writing"
                ? "border-forest-ink text-forest-ink font-bold"
                : "border-transparent text-forest-ink/50 hover:text-forest-ink/80"
            }`}
          >
            Writing Reviews
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "practice"
                ? "border-forest-ink text-forest-ink font-bold"
                : "border-transparent text-forest-ink/50 hover:text-forest-ink/80"
            }`}
          >
            Practice Sessions {savedSessions.length > 0 && `(${savedSessions.length})`}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "border-forest-ink text-forest-ink font-bold"
                : "border-transparent text-forest-ink/50 hover:text-forest-ink/80"
            }`}
          >
            Account Settings
          </button>
        </div>

                {/* Tab Views */}
        {activeTab === "progress" && renderProgressTab()}
        {activeTab === "writing" && renderWritingTab()}
        {activeTab === "practice" && renderPracticeTab()}
        {activeTab === "settings" && renderSettingsTab()}
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

      {/* Review Essay Feedback Overlay Modal */}
      {reviewingEssay && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-cream-paper rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-pencil-gray/25 shadow-2xl flex flex-col text-forest-ink font-inter">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-extrabold text-lg font-bricolage text-forest-ink">
                  Essay Feedback & Score Report
                </h3>
                <p className="text-xs font-mono text-forest-ink/65 mt-0.5">
                  {reviewingEssay.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"} • Submitted{" "}
                  {reviewingEssay.submittedAt
                    ? new Date(reviewingEssay.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
              <button
                onClick={() => setReviewingEssay(null)}
                className="p-1.5 rounded-full hover:bg-whisper-gray text-forest-ink/60 hover:text-forest-ink transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Essay Panel */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider pb-2 border-b border-forest-ink/5">
                  <span>Your Essay Response (Hover highlights for feedback)</span>
                  <span>{reviewingEssay.wordCount || 0} Words</span>
                </div>
                
                <div className="bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs text-sm leading-relaxed min-h-[220px] max-h-[440px] overflow-y-auto">
                  {reviewingEssay.essayText ? (
                    renderAnnotatedText(reviewingEssay.essayText, reviewingEssay.annotations || [])
                  ) : (
                    <em className="text-forest-ink/30 text-xs">No essay text.</em>
                  )}
                </div>
              </div>

              {/* Right Evaluation Panel */}
              <div className="lg:col-span-5 space-y-4">
                {/* Score Summary */}
                <div className="bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-forest-ink/5 pb-2">
                    <h4 className="font-extrabold text-sm font-bricolage">
                      Rubric Scores
                    </h4>
                    <span className="px-3 py-1 rounded-xl bg-forest-ink text-white font-mono font-bold text-xs">
                      Overall Band {reviewingEssay.score}
                    </span>
                  </div>

                  {reviewingEssay.scores ? (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-whisper-gray/40 p-2.5 rounded-xl border border-pencil-gray/10">
                        <span className="text-forest-ink/55 block text-[9px] uppercase tracking-wider">Task Response</span>
                        <strong className="text-sm font-bold font-mono">Band {reviewingEssay.scores.tr?.toFixed(1) || "N/A"}</strong>
                      </div>
                      <div className="bg-whisper-gray/40 p-2.5 rounded-xl border border-pencil-gray/10">
                        <span className="text-forest-ink/55 block text-[9px] uppercase tracking-wider">Coherence & Cohesion</span>
                        <strong className="text-sm font-bold font-mono">Band {reviewingEssay.scores.cc?.toFixed(1) || "N/A"}</strong>
                      </div>
                      <div className="bg-whisper-gray/40 p-2.5 rounded-xl border border-pencil-gray/10">
                        <span className="text-forest-ink/55 block text-[9px] uppercase tracking-wider">Lexical Resource</span>
                        <strong className="text-sm font-bold font-mono">Band {reviewingEssay.scores.lr?.toFixed(1) || "N/A"}</strong>
                      </div>
                      <div className="bg-whisper-gray/40 p-2.5 rounded-xl border border-pencil-gray/10">
                        <span className="text-forest-ink/55 block text-[9px] uppercase tracking-wider">Grammatical Range</span>
                        <strong className="text-sm font-bold font-mono">Band {reviewingEssay.scores.gra?.toFixed(1) || "N/A"}</strong>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-forest-ink/55 italic">Sub-scores not available for this evaluation.</p>
                  )}
                </div>

                {/* General Written Feedback */}
                <div className="bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs space-y-2">
                  <h4 className="font-extrabold text-xs font-mono uppercase tracking-wider text-forest-ink/50 border-b border-forest-ink/5 pb-2">
                    Evaluator Feedback Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-forest-ink/80 whitespace-pre-wrap bg-[#fcfaf5] p-3 rounded-xl border border-pencil-gray/10">
                    {reviewingEssay.feedbackText || "No feedback summary provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-end">
              <Button variant="forest" onClick={() => setReviewingEssay(null)} size="sm" className="h-10 px-6 cursor-pointer rounded-xl font-semibold">
                Close Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
