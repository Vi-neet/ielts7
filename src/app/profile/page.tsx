"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { normalizeMeetingUrl, isGoogleMeetRoomUrl, DEFAULT_MEET_LINK } from "@/lib/utils";
import { db, logOut } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
  GraduationCap,
  MessageCircle,
  Phone,
  ExternalLink,
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
  
  // Speaking sessions state
  const [speakingSessions, setSpeakingSessions] = useState<any[]>([]);
  const [loadingSpeaking, setLoadingSpeaking] = useState(true);
  const [globalDefaultMeetLink, setGlobalDefaultMeetLink] = useState<string>("");

  const getEffectiveMeetingLink = (rawLink?: string): string => {
    // 1. Specific session raw link stored in Firestore (must be valid room URL)
    const formattedRaw = normalizeMeetingUrl(rawLink);
    if (isGoogleMeetRoomUrl(formattedRaw) && !formattedRaw.includes("meet.jit.si")) {
      return formattedRaw;
    }

    // 2. Admin configured permanent Google Meet link (must be valid room URL)
    const adminLink = globalDefaultMeetLink || (typeof window !== "undefined" ? localStorage.getItem("ielts7_default_meet_link") : null);
    const formattedAdmin = normalizeMeetingUrl(adminLink);
    if (isGoogleMeetRoomUrl(formattedAdmin)) {
      return formattedAdmin;
    }

    // 3. Fallback system default room link
    return DEFAULT_MEET_LINK;
  };
  
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
  const [phoneNumber, setPhoneNumber] = useState("");
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
  const [activeTab, setActiveTab] = useState<"progress" | "writing" | "practice" | "speaking" | "settings">("progress");

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
          if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
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

  // Fetch speaking practice session bookings
  useEffect(() => {
    if (!user) return;

    const fetchSpeakingSessions = async () => {
      setLoadingSpeaking(true);
      try {
        // Fetch global configured meeting link
        try {
          const configSnap = await getDoc(doc(db, "systemConfig", "speakingSettings"));
          if (configSnap.exists() && configSnap.data().defaultMeetingLink) {
            setGlobalDefaultMeetLink(configSnap.data().defaultMeetingLink);
          }
        } catch {
          // ignore
        }

        // Primary: query by uid
        const uidQuery = query(
          collection(db, "speakingBookings"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        let snap;
        try {
          snap = await getDocs(uidQuery);
        } catch {
          // Fallback without ordering (index not created yet)
          snap = await getDocs(query(collection(db, "speakingBookings"), where("uid", "==", user.uid)));
        }
        const fetched = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const sortSessions = (items: any[]) => {
          return [...items].sort((a, b) => {
            const getMs = (s: any) => {
              if (s.slotDate && s.slotTime) {
                const timeStr = s.slotTime.includes(":") ? s.slotTime : "00:00";
                const parsed = new Date(`${s.slotDate}T${timeStr}:00`).getTime();
                if (!isNaN(parsed)) return parsed;
              }
              if (s.createdAt?.seconds) return s.createdAt.seconds * 1000;
              if (typeof s.createdAt === "string") {
                const parsed = new Date(s.createdAt).getTime();
                if (!isNaN(parsed)) return parsed;
              }
              return 0;
            };
            return getMs(b) - getMs(a);
          });
        };
        setSpeakingSessions(sortSessions(fetched));
      } catch (err) {
        console.error("Failed to load speaking sessions:", err);
      } finally {
        setLoadingSpeaking(false);
      }
    };

    fetchSpeakingSessions();
  }, [user]);

  // Cancel speaking booking and free up the slot in Firestore
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const handleCancelSpeakingBooking = async (session: any) => {
    if (!confirm("Are you sure you want to cancel this speaking session? The time slot will be re-opened for other candidates.")) return;
    setCancellingId(session.id);
    try {
      // 1. Mark booking as cancelled
      await updateDoc(doc(db, "speakingBookings", session.id), {
        status: "cancelled",
        updatedAt: new Date().toISOString(),
      });

      // 2. Re-open slot if slotId exists
      if (session.slotId) {
        try {
          await updateDoc(doc(db, "speakingSlots", session.slotId), {
            isAvailable: true,
            bookedBy: null,
            updatedAt: new Date().toISOString(),
          });
        } catch {
          // slot doc might be deleted
        }
      }

      // Re-fetch speaking sessions
      const snap = await getDocs(query(collection(db, "speakingBookings"), where("uid", "==", user!.uid)));
      const reFetched = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const getMs = (s: any) => {
        if (s.slotDate && s.slotTime) {
          const timeStr = s.slotTime.includes(":") ? s.slotTime : "00:00";
          const parsed = new Date(`${s.slotDate}T${timeStr}:00`).getTime();
          if (!isNaN(parsed)) return parsed;
        }
        if (s.createdAt?.seconds) return s.createdAt.seconds * 1000;
        return 0;
      };
      setSpeakingSessions(reFetched.sort((a, b) => getMs(b) - getMs(a)));
    } catch (err) {
      console.error("Failed to cancel speaking booking:", err);
    } finally {
      setCancellingId(null);
    }
  };


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
          phoneNumber,
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

  // Chart setup — thin to max 12 evenly-spaced points to avoid congestion
  const allChartAttempts = [...attempts].reverse(); // Oldest first
  const MAX_CHART_POINTS = 12;
  const chartAttempts = allChartAttempts.length <= MAX_CHART_POINTS
    ? allChartAttempts
    : Array.from({ length: MAX_CHART_POINTS }, (_, i) =>
        allChartAttempts[Math.round(i * (allChartAttempts.length - 1) / (MAX_CHART_POINTS - 1))]
      );
  const chartWidth = 500;
  const chartHeight = 280;
  const paddingLeft = 38;
  const paddingRight = 18;
  const paddingTop = 24;
  const paddingBottom = 36;
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
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${paddingTop + graphHeight} L ${points[0].x} ${paddingTop + graphHeight} Z`
    : '';
  const targetY = paddingTop + graphHeight - ((7.0 - minY) / (maxY - minY)) * graphHeight;
  const peakIdx = points.reduce((best, p, i) => p.band > points[best].band ? i : best, 0);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-inter">
          {/* Card 1: Completed Tests */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl border border-forest-ink/10 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[130px] relative overflow-hidden group hover:border-forest-ink/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-forest-ink/50 font-bold">
                Exams Completed
              </span>
              <div className="w-8 h-8 rounded-xl bg-forest-ink/5 text-forest-ink flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen size={16} />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-bricolage text-forest-ink block tracking-tight">
                {attempts.length}
              </span>
              <span className="text-[11px] text-forest-ink/55 block mt-1">
                Scored reading & listening tests
              </span>
            </div>
          </motion.div>

          {/* Card 2: Best Band Score */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#f4faee] rounded-3xl border border-emerald-600/20 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[130px] relative overflow-hidden group hover:border-emerald-600/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                Top Band Score
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award size={16} />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-bricolage text-emerald-800 tracking-tight">
                  {bestBand}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-700/80">/ 9.0</span>
              </div>
              <span className="text-[11px] text-emerald-700/70 block mt-1">
                Highest achieved score
              </span>
            </div>
          </motion.div>

          {/* Card 3: Average Band */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl border border-forest-ink/10 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[130px] relative overflow-hidden group hover:border-forest-ink/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-forest-ink/50 font-bold">
                Mean Band Average
              </span>
              <div className="w-8 h-8 rounded-xl bg-forest-ink/5 text-forest-ink flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-bricolage text-forest-ink tracking-tight">
                  {averageBand}
                </span>
                <span className="text-xs font-mono font-semibold text-forest-ink/40">/ 9.0</span>
              </div>
              <span className="text-[11px] text-forest-ink/55 block mt-1">
                Target: <strong className="text-forest-ink">Band 7.0</strong>
              </span>
            </div>
          </motion.div>

          {/* Card 4: Target Milestone Progress */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl border border-forest-ink/10 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[130px] relative overflow-hidden group hover:border-forest-ink/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-forest-ink/50 font-bold">
                Band 7.0 Goal
              </span>
              <div className="w-8 h-8 rounded-xl bg-forest-ink/5 text-forest-ink flex items-center justify-center group-hover:scale-105 transition-transform">
                <Target size={16} />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold font-bricolage text-forest-ink">
                  {band7Percentage}%
                </span>
                <span className="text-[10px] font-mono uppercase font-bold text-forest-ink/60">
                  {band7Percentage >= 100 ? "Achieved 🎉" : "In Progress"}
                </span>
              </div>
              <div className="h-2 w-full bg-forest-ink/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-forest-ink rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, band7Percentage)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
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

                <div className="w-full">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full overflow-visible bg-[#faf9f5] rounded-2xl border border-forest-ink/10"
                  >
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1a3300" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#1a3300" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
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
                            strokeWidth={bandVal === 7 ? 0 : 1}
                            strokeDasharray="4 4"
                          />
                          <text
                            x={paddingLeft - 8}
                            y={y + 4}
                            textAnchor="end"
                            fill="#1a3300"
                            fontSize={9}
                            fontFamily="monospace"
                            opacity={0.45}
                          >
                            {bandVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Target band 7.0 dashed line */}
                    <line
                      x1={paddingLeft}
                      y1={targetY}
                      x2={chartWidth - paddingRight}
                      y2={targetY}
                      stroke="#cb5521"
                      strokeWidth={1.5}
                      strokeDasharray="5 3"
                      opacity={0.7}
                    />
                    <text
                      x={chartWidth - paddingRight - 4}
                      y={targetY - 5}
                      textAnchor="end"
                      fill="#cb5521"
                      fontSize={9}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      Target 7.0
                    </text>

                    {/* Area fill under line */}
                    {areaD && (
                      <path d={areaD} fill="url(#chartFill)" />
                    )}

                    {/* Main line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#1a3300"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points — dots only, no per-dot labels */}
                    {points.map((p, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === points.length - 1;
                      const isPeak = idx === peakIdx;
                      const showBandLabel = isFirst || isLast || isPeak;
                      return (
                        <g key={idx}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={showBandLabel ? 5 : 3.5}
                            fill={isPeak ? "#1a3300" : "#ffffff"}
                            stroke="#1a3300"
                            strokeWidth={2}
                            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
                          />
                          {showBandLabel && (
                            <text
                              x={p.x}
                              y={p.y - 10}
                              textAnchor="middle"
                              fill="#1a3300"
                              fontSize={9}
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {p.band.toFixed(1)}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* X-axis date labels — spaced evenly */}
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
                          fontSize={8}
                          fontFamily="monospace"
                          opacity={0.45}
                        >
                          {dateStr}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Recent Test History — Card Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-bricolage text-forest-ink flex items-center gap-2">
                    <History size={19} className="text-forest-ink/70" /> Recent Test History
                  </h2>
                  <span className="text-[11px] font-mono text-forest-ink/40">{attempts.length} attempt{attempts.length !== 1 ? "s" : ""}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attempts.map((attempt) => {
                    const date = attempt.submittedAt
                      ? new Date(attempt.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A";
                    const band = getBandScore(attempt.score, attempt.testType);
                    const bandNum = parseFloat(band);
                    const pct = Math.min(100, ((bandNum - 1) / 8) * 100);
                    const isHighBand = bandNum >= 7;

                    return (
                      <motion.div
                        key={attempt.id}
                        whileHover={{ y: -2 }}
                        className="bg-white rounded-2xl border border-forest-ink/10 hover:border-forest-ink/20 p-4 flex flex-col gap-3 shadow-xs transition-all cursor-default"
                      >
                        {/* Top row: type chip + date */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-forest-ink/8 text-forest-ink/70 border border-forest-ink/10">
                            {formatTestType(attempt.testType)}
                          </span>
                          <span className="text-[10px] font-mono text-forest-ink/40">{date}</span>
                        </div>

                        {/* Test name */}
                        <h3 className="font-bold text-forest-ink text-sm leading-snug font-bricolage line-clamp-1">
                          {formatTestName(attempt.testId)}
                        </h3>

                        {/* Band score + progress bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/45">Band Score</span>
                            <span className={`text-base font-extrabold font-bricolage ${isHighBand ? "text-emerald-700" : "text-forest-ink"}`}>
                              {band}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-forest-ink/8 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${isHighBand ? "bg-emerald-600" : "bg-forest-ink"}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {/* Action */}
                        <div className="pt-1 border-t border-forest-ink/8 flex justify-end">
                          <Button
                            size="sm"
                            variant="forestOutline"
                            onClick={() => handleOpenReview(attempt)}
                            className="h-7 px-3 text-[11px] rounded-lg cursor-pointer font-semibold flex items-center gap-1"
                          >
                            Review <ArrowRight size={11} />
                          </Button>
                        </div>
                      </motion.div>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-bricolage text-forest-ink">Essay Review History</h2>
          <p className="text-xs text-forest-ink/60 mt-0.5">Track evaluation status and band breakdowns for your submitted essays.</p>
        </div>
        <Link href="/writing-review">
          <Button variant="forest" size="sm" className="rounded-xl cursor-pointer text-xs font-semibold hidden sm:flex items-center gap-1.5">
            <FileText size={13} /> Submit Essay
          </Button>
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-forest-ink/10 p-12 text-center flex flex-col items-center justify-center py-16 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-forest-ink/5 text-forest-ink/40 flex items-center justify-center mb-4 border border-forest-ink/10">
            <FileText size={26} />
          </div>
          <h3 className="font-bold text-forest-ink font-bricolage text-base">No Essays Submitted</h3>
          <p className="text-xs text-forest-ink/50 max-w-sm mt-1.5 leading-relaxed">
            Submit your Task 1 or Task 2 essay to receive professional band-score grading and detailed feedback.
          </p>
          <div className="mt-5">
            <Link href="/writing-review">
              <Button variant="forest" size="sm" className="px-5 rounded-xl cursor-pointer">
                Submit Essay for Review
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {submissions.map((sub) => {
            const date = sub.submittedAt
              ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A";
            const isGraded = sub.status === "graded";
            return (
              <motion.div
                key={sub.id}
                whileHover={{ y: -2 }}
                className={`rounded-3xl border p-5 flex flex-col justify-between gap-4 shadow-xs transition-all ${
                  isGraded
                    ? "bg-[#f4faee] border-emerald-600/20 hover:border-emerald-600/30"
                    : "bg-white border-forest-ink/10 hover:border-forest-ink/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        sub.taskType === "task_1"
                          ? "bg-forest-ink/10 text-forest-ink"
                          : "bg-forest-ink text-white"
                      }`}>
                        {sub.taskType === "task_1" ? "Task 1" : "Task 2"}
                      </span>
                      {isGraded && sub.score && (
                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded-md bg-emerald-700 text-white">
                          Band {sub.score}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-forest-ink text-sm leading-snug font-bricolage">
                      {sub.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-forest-ink/55 font-mono">
                      <span className="capitalize">{sub.submissionMethod}</span>
                      {sub.wordCount !== null && <span>{sub.wordCount} words</span>}
                      <span>{date}</span>
                    </div>
                  </div>
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                    isGraded ? "bg-emerald-600/10 text-emerald-700" : "bg-forest-ink/5 text-forest-ink/40"
                  }`}>
                    {isGraded ? <CheckCircle size={17} /> : <Clock size={17} />}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/5">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isGraded
                      ? "text-emerald-800 bg-emerald-600/10"
                      : "text-forest-ink/60 bg-forest-ink/8"
                  }`}>
                    {isGraded ? "Graded" : "Pending Evaluation"}
                  </span>
                  {isGraded ? (
                    <Button
                      size="sm"
                      variant="forest"
                      onClick={() => setReviewingEssay(sub)}
                      className="text-xs font-semibold rounded-xl cursor-pointer shadow-xs h-8 px-3"
                    >
                      View Feedback
                    </Button>
                  ) : (
                    <span className="text-[10px] text-forest-ink/40 font-mono">In queue</span>
                  )}
                </div>
              </motion.div>
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

  const renderSpeakingTab = () => (
    <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-forest-ink/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#cb5521]/10 text-[#cb5521] flex items-center justify-center shrink-0">
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-bricolage text-forest-ink">Speaking Practice Sessions</h2>
            <p className="text-xs text-forest-ink/60">Your booked 1-on-1 IELTS speaking sessions with status and examiner feedback.</p>
          </div>
        </div>
        <a
          href="/speaking-booking"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#cb5521] hover:underline"
        >
          Book New Session <ExternalLink size={12} />
        </a>
      </div>

      {loadingSpeaking ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-forest-ink/30" />
          <span className="ml-3 text-sm text-forest-ink/50">Loading your sessions...</span>
        </div>
      ) : speakingSessions.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#cb5521]/10 text-[#cb5521] flex items-center justify-center mb-4">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-forest-ink font-bricolage text-base">No Speaking Sessions Yet</h3>
          <p className="text-xs text-forest-ink/50 max-w-sm mt-1 leading-relaxed text-center">
            Book a free 1-on-1 speaking session to get personalized examiner feedback and Band 7+ strategies.
          </p>
          <div className="mt-5">
            <Link href="/speaking-booking">
              <Button variant="forest" size="sm" className="px-4 rounded-xl cursor-pointer">
                Book Free Session
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {speakingSessions.map((session: any) => {
            const statusColors: Record<string, string> = {
              pending: "bg-amber-50 text-amber-800 border-amber-200",
              confirmed: "bg-blue-50 text-blue-800 border-blue-200",
              completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
              cancelled: "bg-rose-50 text-rose-800 border-rose-200",
            };
            const color = statusColors[session.status] || statusColors.pending;
            const sessionDate = session.slotDate
              ? new Date(session.slotDate + "T00:00:00").toLocaleDateString("en-IN", {
                  weekday: "long", day: "numeric", month: "short", year: "numeric"
                })
              : "TBD";
            const sessionTime = session.slotTime
              ? (() => { const [h, m] = session.slotTime.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ap}`; })()
              : "TBD";

            return (
              <motion.div
                key={session.id}
                whileHover={{ y: -2 }}
                className="bg-[#faf9f5] rounded-2xl border border-forest-ink/10 p-5 space-y-4 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-forest-ink/50 uppercase tracking-wider">{session.referenceId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${color} capitalize`}>
                        {session.status}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-forest-ink font-bricolage">{sessionDate} at {sessionTime}</div>
                  </div>
                </div>

                {session.status === "confirmed" && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {getEffectiveMeetingLink(session.meetingLink) ? (
                      <a
                        href={getEffectiveMeetingLink(session.meetingLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                      >
                        <ExternalLink size={13} />
                        Join Meeting
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-medium">
                        <Clock size={13} className="text-amber-700" />
                        Meeting link pending instructor assignment
                      </span>
                    )}
                  </div>
                )}

                {/* Cancel & Reschedule self-service options */}
                {(session.status === "pending" || session.status === "confirmed") && (
                  <div className="flex items-center gap-3 pt-2 border-t border-forest-ink/8 text-xs">
                    <button
                      onClick={() => handleCancelSpeakingBooking(session)}
                      disabled={cancellingId === session.id}
                      className="text-rose-600 hover:underline font-medium text-[11px] cursor-pointer"
                    >
                      {cancellingId === session.id ? "Cancelling..." : "Cancel Booking"}
                    </button>
                    <span className="text-forest-ink/30">·</span>
                    <a href="/speaking-booking" className="text-forest-ink/60 hover:text-forest-ink hover:underline text-[11px]">
                      Book Different Time
                    </a>
                  </div>
                )}

                {session.status === "completed" && (
                  <div className="space-y-2 pt-2 border-t border-forest-ink/8">
                    {session.estimatedBand && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-forest-ink/50 uppercase tracking-wider">Estimated Band</span>
                        <span className="text-sm font-bold font-mono text-emerald-700">{session.estimatedBand}</span>
                      </div>
                    )}
                    {session.feedback && (
                      <div className="bg-white rounded-xl p-3 border border-forest-ink/10">
                        <div className="text-[10px] font-mono font-bold text-forest-ink/40 uppercase tracking-wider mb-1.5">Examiner Feedback</div>
                        <p className="text-xs text-forest-ink/80 leading-relaxed">{session.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
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

          <div className="space-y-1.5">
            <Label htmlFor="phoneNumber" className="text-xs font-semibold text-forest-ink">
              WhatsApp / Phone Number
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-ink/40 text-xs font-mono">📱</span>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-8 h-10 border-forest-ink/20 text-xs rounded-xl"
              />
            </div>
            <p className="text-[11px] text-forest-ink/50">Used to receive speaking session confirmations and meeting links.</p>
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

        {/* ── Hero Banner ── */}
        <div className="relative bg-forest-ink text-white rounded-3xl overflow-hidden shadow-lg">
          {/* Layered gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          {/* Glowing accent blob */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Candidate Identity */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Avatar with ring */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 to-transparent blur-sm" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 text-white flex items-center justify-center font-bricolage font-bold text-2xl sm:text-3xl border-2 border-white/25 overflow-hidden shadow-md">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="select-none">{user.email?.[0].toUpperCase() || "U"}</span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-white tracking-tight leading-tight">
                  {user.displayName || "Practice Candidate"}
                </h1>
                <p className="text-white/55 text-xs font-mono tracking-wide">{user.email}</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-white/70 uppercase tracking-wider font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  IELTS Candidate
                </span>
              </div>
            </div>

            {/* Stats pill + Logout */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-0 bg-white/[0.08] rounded-2xl border border-white/10 overflow-hidden divide-x divide-white/10">
                {[
                  { label: "Tests", value: String(attempts.length), color: "text-white" },
                  { label: "Best", value: String(bestBand), color: "text-emerald-300" },
                  { label: "Target", value: "7.0+", color: "text-white" },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-2.5 flex flex-col items-center min-w-[64px]">
                    <span className="text-white/45 text-[9px] uppercase tracking-widest font-mono font-bold">{stat.label}</span>
                    <strong className={`${stat.color} font-bold text-base font-bricolage leading-tight`}>{stat.value}</strong>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleLogoutClick}
                variant="outline"
                size="sm"
                className="h-10 px-4 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-forest-ink font-semibold font-inter transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Upcoming Session Countdown Banner ── */}
        {(() => {
          const today = new Date().toISOString().split("T")[0];
          const upcoming = speakingSessions.find(
            (s: any) => (s.status === "confirmed" || s.status === "pending") && s.slotDate >= today
          );
          if (!upcoming) return null;

          const dateStr = upcoming.slotDate;
          const timeStr = upcoming.slotTime || "10:00";
          const sessionDateTime = new Date(`${dateStr}T${timeStr}:00`);
          const diffMs = sessionDateTime.getTime() - Date.now();
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#1a3300] to-[#2d5700] text-white rounded-3xl p-5 sm:p-6 shadow-lg border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-highlighter-yellow/20 text-highlighter-yellow text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Clock size={12} />
                  Upcoming Speaking Session
                </div>
                <h3 className="text-base font-extrabold font-bricolage text-white">
                  {new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })} at {timeStr}
                </h3>
                <p className="text-xs text-white/70">
                  {diffMs > 0
                    ? `Starts in ${diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""} ` : ""}${diffHours} hour${diffHours !== 1 ? "s" : ""}`
                    : "Session starting soon!"}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {getEffectiveMeetingLink(upcoming.meetingLink) ? (
                  <a
                    href={getEffectiveMeetingLink(upcoming.meetingLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-highlighter-yellow text-forest-ink text-xs font-bold rounded-xl hover:bg-highlighter-yellow/90 transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} />
                    Join Meeting
                  </a>
                ) : (
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-xs text-forest-ink text-xs font-semibold rounded-xl border border-forest-ink/10 flex items-center gap-1.5">
                    <Clock size={13} className="text-forest-ink/60" />
                    Link pending instructor assignment
                  </span>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* Navigation Tabs — pill segmented control */}
        <div className="bg-white/80 border border-forest-ink/10 rounded-2xl p-1.5 flex gap-1 overflow-x-auto scrollbar-none shadow-xs font-inter">
          {([
            { id: "progress", label: "Progress", icon: TrendingUp, badge: null },
            { id: "writing", label: "Writing Reviews", icon: FileText, badge: submissions.length > 0 ? submissions.length : null },
            { id: "practice", label: "Practice Drafts", icon: Clock, badge: savedSessions.length > 0 ? savedSessions.length : null },
            { id: "speaking", label: "Speaking", icon: MessageCircle, badge: speakingSessions.length > 0 ? speakingSessions.length : null },
            { id: "settings", label: "Settings", icon: Sliders, badge: null },
          ] as { id: "progress" | "writing" | "practice" | "speaking" | "settings"; label: string; icon: React.ElementType; badge: number | null }[]).map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                activeTab === id
                  ? "bg-forest-ink text-white shadow-sm"
                  : "text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
              }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
              {badge !== null && (
                <span className={`ml-0.5 text-[10px] font-bold px-1.5 py-0 rounded-full ${
                  activeTab === id ? "bg-white/20 text-white" : "bg-forest-ink/10 text-forest-ink/70"
                }`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Views */}
        {activeTab === "progress" && renderProgressTab()}
        {activeTab === "writing" && renderWritingTab()}
        {activeTab === "practice" && renderPracticeTab()}
        {activeTab === "speaking" && renderSpeakingTab()}
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
