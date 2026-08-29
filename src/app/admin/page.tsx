"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldAlert,
  Loader2,
  FileText,
  Users,
  History,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  GraduationCap,
  Calendar,
  Globe,
  Award,
  BookOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Helper to format test type
function formatTestType(type: string): string {
  const typeMap: Record<string, string> = {
    general_reading: "General Reading",
    academic_reading: "Academic Reading",
    listening: "Listening",
  };
  return typeMap[type] || type.replace(/_/g, " ");
}

// Helper to format test name
function formatTestName(id: string): string {
  let name = id
    .replace(/_gr_/g, " General Reading - ")
    .replace(/_ar_/g, " Academic Reading - ")
    .replace(/_ls_/g, " Listening - ")
    .replace(/cambridge/g, "Cambridge ");

  return name.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2);
}

// Helper to estimate band score
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

interface Student {
  id: string;
  email?: string;
  displayName?: string;
  gender?: string;
  targetModule?: string;
  targetBand?: string;
  targetDate?: string;
  primaryPurpose?: string;
  nativeLanguage?: string;
  country?: string;
  updatedAt?: string;
  photoURL?: string;
}

interface WritingSubmission {
  id: string;
  uid: string;
  taskType: "task_1" | "task_2";
  submissionMethod: "text" | "file";
  essayText?: string;
  notes?: string;
  status: "submitted" | "graded";
  submittedAt: any;
  score?: string;
  feedbackText?: string;
  candidateEmail?: string;
  candidateName?: string;
}

interface Attempt {
  id: string;
  uid: string;
  testId: string;
  testType: string;
  score: number;
  total: number;
  submittedAt: any;
  candidateEmail?: string;
  candidateName?: string;
}

type Tab = "submissions" | "students";

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  // Navigation & Data tabs
  const [activeTab, setActiveTab] = useState<Tab>("students");

  // Core Data sets
  const [submissions, setSubmissions] = useState<WritingSubmission[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "submitted" | "graded">("all");

  // Loading indicator states
  const [loadingData, setLoadingData] = useState(true);
  const [gradingSubmission, setGradingSubmission] = useState<WritingSubmission | null>(null);
  const [gradingScore, setGradingScore] = useState("7.0");
  const [gradingFeedback, setGradingFeedback] = useState("");
  const [savingGrade, setSavingGrade] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [selectedStudentForAttempts, setSelectedStudentForAttempts] = useState<Student | null>(null);

  // Route security checks
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/admin");
    }
  }, [user, authLoading, router]);

  // Fetch all collections data if authorized
  const loadAdminData = async () => {
    if (!user || !isAdmin) return;
    try {
      setLoadingData(true);
      
      // 1. Fetch Students
      const usersSnap = await getDocs(collection(db, "users"));
      const studentsList: Student[] = usersSnap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      
      // Build a fast lookup map for candidates
      const studentsMap: Record<string, Student> = {};
      studentsList.forEach((s) => {
        studentsMap[s.id] = s;
      });

      // 2. Fetch Writing Submissions
      const subSnap = await getDocs(collection(db, "writingSubmissions"));
      const subList: WritingSubmission[] = subSnap.docs.map((docSnap) => {
        const data = docSnap.data();
        const candidate = studentsMap[data.uid];
        return {
          id: docSnap.id,
          uid: data.uid,
          taskType: data.taskType,
          submissionMethod: data.submissionMethod,
          essayText: data.essayText,
          notes: data.notes,
          status: data.status,
          submittedAt: data.submittedAt,
          score: data.score,
          feedbackText: data.feedbackText,
          candidateEmail: candidate?.email || "Unknown Student",
          candidateName: candidate?.displayName || "Practice Candidate",
        };
      });

      // Sort: submitted first, then newest
      subList.sort((a, b) => {
        if (a.status === "submitted" && b.status === "graded") return -1;
        if (a.status === "graded" && b.status === "submitted") return 1;
        const timeA = a.submittedAt?.seconds || 0;
        const timeB = b.submittedAt?.seconds || 0;
        return timeB - timeA;
      });

      // 3. Fetch Test Attempts
      const attemptsSnap = await getDocs(collection(db, "attempts"));
      const attemptsList: Attempt[] = attemptsSnap.docs.map((docSnap) => {
        const data = docSnap.data();
        const candidate = studentsMap[data.uid];
        return {
          id: docSnap.id,
          uid: data.uid,
          testId: data.testId,
          testType: data.testType,
          score: data.score,
          total: data.total || 40,
          submittedAt: data.submittedAt,
          candidateEmail: candidate?.email || (data.isGuest ? "Guest Candidate" : "Unknown Student"),
          candidateName: candidate?.displayName || (data.isGuest ? "Guest User" : "Practice Candidate"),
        };
      });

      attemptsList.sort((a, b) => {
        const timeA = a.submittedAt?.seconds || 0;
        const timeB = b.submittedAt?.seconds || 0;
        return timeB - timeA;
      });

      setStudents(studentsList);
      setSubmissions(subList);
      setAttempts(attemptsList);
    } catch (err) {
      console.error("Failed to load admin dashboard statistics:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [user, isAdmin]);

  // Handle grading submit
  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    setSavingGrade(true);
    setSaveError("");

    try {
      const docRef = doc(db, "writingSubmissions", gradingSubmission.id);
      await updateDoc(docRef, {
        status: "graded",
        score: gradingScore,
        feedbackText: gradingFeedback,
        updatedAt: serverTimestamp(),
      });

      // Update local state instantly
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === gradingSubmission.id
            ? {
                ...sub,
                status: "graded",
                score: gradingScore,
                feedbackText: gradingFeedback,
              }
            : sub
        )
      );

      setGradingSubmission(null);
      setGradingFeedback("");
      setGradingScore("7.0");
    } catch (err: any) {
      console.error("Failed to submit grade evaluation:", err);
      setSaveError(err.message || "Failed to update essay evaluation document.");
    } finally {
      setSavingGrade(false);
    }
  };

  // ─── Visual Render Checks ──────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream-paper flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 text-forest-ink animate-spin mx-auto" />
          <p className="text-forest-ink/65 font-inter text-sm font-semibold">Verifying credentials…</p>
        </div>
      </div>
    );
  }

  // Not authorized block
  if (!user || !isAdmin) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-cream-paper flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl border border-[#cb5521]/20 shadow-md p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#cb5521]/10 text-[#cb5521] border border-[#cb5521]/10 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold font-bricolage text-forest-ink tracking-tight">
              Access Denied
            </h1>
            <p className="text-forest-ink/70 font-inter text-sm leading-relaxed max-w-sm mx-auto">
              This area is restricted to administrators. If you believe this is an error, please configure your candidate role inside Firestore.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/">
              <Button variant="forest" className="w-full h-11 font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Filter lists based on Query & Status filters
  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const name = (sub.candidateName || "").toLowerCase();
    const email = (sub.candidateEmail || "").toLowerCase();
    const id = (sub.id || "").toLowerCase();
    
    const matchesSearch = name.includes(q) || email.includes(q) || id.includes(q);
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const name = (s.displayName || "").toLowerCase();
    const email = (s.email || "").toLowerCase();
    const country = (s.country || "").toLowerCase();
    const lang = (s.nativeLanguage || "").toLowerCase();
    
    return name.includes(q) || email.includes(q) || country.includes(q) || lang.includes(q);
  });

  const filteredAttempts = attempts.filter((att) => {
    const q = searchQuery.toLowerCase();
    const name = (att.candidateName || "").toLowerCase();
    const email = (att.candidateEmail || "").toLowerCase();
    const testName = formatTestName(att.testId).toLowerCase();
    
    return name.includes(q) || email.includes(q) || testName.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#faf9f5] text-forest-ink pt-8 pb-24 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner header */}
        <div className="relative bg-forest-ink text-white rounded-3xl p-6 sm:p-8 shadow-md overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-highlighter-yellow/20 text-highlighter-yellow text-[10px] font-mono font-bold uppercase tracking-wider border border-highlighter-yellow/30">
                Staff Operations
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-white tracking-tight">
                Admin Dashboard
              </h1>
            </div>
            
            {/* Quick counters */}
            <div className="flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/15 backdrop-blur-xs text-xs font-mono">
              <div>
                <span className="text-white/50 block text-[9px] uppercase tracking-wider">Pending Essays</span>
                <strong className="text-highlighter-yellow font-bold text-base">
                  {submissions.filter((s) => s.status === "submitted").length}
                </strong>
              </div>
              <div className="w-px h-6 bg-white/15" />
              <div>
                <span className="text-white/50 block text-[9px] uppercase tracking-wider">Students</span>
                <strong className="text-white font-bold text-base">{students.length}</strong>
              </div>
              <div className="w-px h-6 bg-white/15" />
              <div>
                <span className="text-white/50 block text-[9px] uppercase tracking-wider">Exams Scored</span>
                <strong className="text-white font-bold text-base">{attempts.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Tabs navigation */}
          <div className="flex gap-2 p-1.5 bg-white border border-forest-ink/10 rounded-2xl self-start">
            <button
              onClick={() => {
                setActiveTab("students");
                setSearchQuery("");
              }}
              className={`px-4 py-2 text-xs font-bold font-inter rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "students"
                  ? "bg-forest-ink text-white shadow-2xs"
                  : "text-forest-ink/75 hover:bg-whisper-gray"
              }`}
            >
              <Users size={14} />
              <span>Students</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("submissions");
                setSearchQuery("");
              }}
              className={`px-4 py-2 text-xs font-bold font-inter rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "submissions"
                  ? "bg-forest-ink text-white shadow-2xs"
                  : "text-forest-ink/75 hover:bg-whisper-gray"
              }`}
            >
              <FileText size={14} />
              <span>Essay Submissions</span>
            </button>
          </div>

          {/* Search Inputs */}
          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder={
                  activeTab === "submissions"
                    ? "Search candidate name, email, or submission ID…"
                    : "Search student name, email, country…"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-forest-ink/20 focus-visible:border-forest-ink focus-visible:ring-forest-ink/10 text-xs rounded-xl bg-white text-forest-ink"
              />
            </div>
            
            {activeTab === "submissions" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-semibold shrink-0 cursor-pointer"
              >
                <option value="all">All status</option>
                <option value="submitted">Submitted (Pending)</option>
                <option value="graded">Graded</option>
              </select>
            )}
          </div>
        </div>

        {/* Primary Data List Area */}
        <div className="bg-white rounded-3xl border border-forest-ink/10 p-6 sm:p-8 shadow-sm">
          {loadingData ? (
            <div className="py-20 text-center text-forest-ink/50 text-sm font-inter">
              <Loader2 className="h-7 w-7 animate-spin mx-auto mb-2 text-forest-ink/70" />
              Loading database collections…
            </div>
          ) : (
            <div className="overflow-x-auto">
              
              {/* Tab 1: Submissions */}
              {activeTab === "submissions" && (
                filteredSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-forest-ink/50 text-sm">
                    No essay submissions match your filters.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-forest-ink/5 text-[11px] font-mono uppercase tracking-wider text-forest-ink/45 pb-3">
                        <th className="pb-3 font-semibold">Candidate</th>
                        <th className="pb-3 font-semibold">Task</th>
                        <th className="pb-3 font-semibold">Method</th>
                        <th className="pb-3 font-semibold">Submitted</th>
                        <th className="pb-3 font-semibold">Status / Band</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest-ink/5 text-sm">
                      {filteredSubmissions.map((sub) => {
                        const date = sub.submittedAt
                          ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A";
                        return (
                          <tr key={sub.id} className="hover:bg-cream-paper/20 transition-all">
                            <td className="py-4 pr-3 max-w-[200px] truncate">
                              <span className="font-bold text-forest-ink block leading-snug">{sub.candidateName}</span>
                              <span className="text-[10px] text-forest-ink/50 block font-mono truncate">{sub.candidateEmail}</span>
                            </td>
                            <td className="py-4 pr-3">
                              <span className="px-2 py-0.5 rounded-sm bg-forest-ink/5 border border-forest-ink/10 text-[10px] font-mono font-bold uppercase tracking-wider">
                                {sub.taskType === "task_1" ? "Task 1" : "Task 2"}
                              </span>
                            </td>
                            <td className="py-4 pr-3 text-xs capitalize text-forest-ink/70">
                              {sub.submissionMethod}
                            </td>
                            <td className="py-4 pr-3 text-xs text-forest-ink/60">
                              {date}
                            </td>
                            <td className="py-4 pr-3">
                              {sub.status === "graded" ? (
                                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                                  <CheckCircle2 size={14} className="text-emerald-700" />
                                  <span>Graded (Band {sub.score})</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                                  <Clock size={14} className="text-amber-600 animate-pulse" />
                                  <span>Pending Grading</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 text-right">
                              <Button
                                size="sm"
                                variant={sub.status === "graded" ? "outline" : "forest"}
                                onClick={() => setGradingSubmission(sub)}
                                className="h-8 text-xs font-semibold rounded-lg cursor-pointer"
                              >
                                {sub.status === "graded" ? "Review feedback" : "Evaluate Essay"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )
              )}

              {/* Tab 2: Students */}
              {activeTab === "students" && (
                filteredStudents.length === 0 ? (
                  <div className="py-12 text-center text-forest-ink/50 text-sm">
                    No student profile records matches the query.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-forest-ink/5 text-[11px] font-mono uppercase tracking-wider text-forest-ink/45 pb-3">
                        <th className="pb-3 font-semibold">Student Name</th>
                        <th className="pb-3 font-semibold">Demographics</th>
                        <th className="pb-3 font-semibold">IELTS Goal</th>
                        <th className="pb-3 font-semibold">Exam Date</th>
                        <th className="pb-3 font-semibold">Last Updated</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest-ink/5 text-sm">
                      {filteredStudents.map((s) => {
                        const date = s.updatedAt
                          ? new Date(s.updatedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A";
                        return (
                          <tr key={s.id} className="hover:bg-cream-paper/20 transition-all">
                            <td className="py-4 pr-3">
                              <div className="flex items-center gap-3">
                                {s.photoURL ? (
                                  <img
                                    src={s.photoURL}
                                    alt={s.displayName || "Avatar"}
                                    className="w-10 h-10 rounded-full object-cover border border-forest-ink/10 shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-forest-ink/5 text-forest-ink border border-forest-ink/10 flex items-center justify-center font-bold text-sm uppercase shrink-0">
                                    {s.displayName?.[0] || s.email?.[0] || "U"}
                                  </div>
                                )}
                                <div className="truncate max-w-[180px]">
                                  <span className="font-bold text-forest-ink block leading-snug truncate">{s.displayName || "Practice Candidate"}</span>
                                  <span className="text-[10px] text-forest-ink/50 block font-mono truncate">{s.email || "No Email"}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-3 text-xs text-forest-ink/75 space-y-0.5">
                              <div className="flex items-center gap-1">
                                <Globe size={11} className="text-forest-ink/40" />
                                <span>{s.country || "Unknown Country"}</span>
                              </div>
                              <div className="text-[10px] text-forest-ink/50 pl-4 font-mono">
                                Lang: {s.nativeLanguage || "N/A"}
                              </div>
                            </td>
                            <td className="py-4 pr-3">
                              <span className="px-2 py-0.5 rounded bg-forest-ink/5 border border-forest-ink/10 text-[10px] font-mono font-bold uppercase tracking-wider block w-fit">
                                {s.targetModule ? `${s.targetModule} module` : "N/A"}
                              </span>
                              <span className="text-xs text-forest-ink/65 mt-1 block">
                                Target Band: <strong className="text-forest-ink">{s.targetBand || "7.0"}</strong>
                              </span>
                            </td>
                            <td className="py-4 pr-3 text-xs text-forest-ink/70">
                              {s.targetDate ? (
                                <div className="flex items-center gap-1">
                                  <Calendar size={12} className="text-forest-ink/40" />
                                  <span>{s.targetDate}</span>
                                </div>
                              ) : (
                                "Not Scheduled"
                              )}
                            </td>
                            <td className="py-4 text-xs text-forest-ink/60">
                              {date}
                            </td>
                            <td className="py-4 text-right">
                              <Button
                                size="sm"
                                variant="forest"
                                onClick={() => setSelectedStudentForAttempts(s)}
                                className="h-8 text-xs font-semibold rounded-lg cursor-pointer"
                              >
                                View Attempts
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )
              )}
            </div>
          )}
        </div>

      </div>

      {/* Evaluation/Grading Modal Overlay */}
      {gradingSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-cream-paper rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-pencil-gray/25 shadow-2xl flex flex-col text-forest-ink"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="space-y-0.5">
                <h3 className="font-bold text-lg font-bricolage text-forest-ink">
                  Essay Evaluation & Feedback
                </h3>
                <p className="text-xs text-forest-ink/60 font-mono">
                  {gradingSubmission.candidateName} ({gradingSubmission.candidateEmail}) • {gradingSubmission.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setGradingSubmission(null);
                  setGradingFeedback("");
                  setGradingScore("7.0");
                }}
                className="p-1.5 rounded-full hover:bg-whisper-gray text-forest-ink/60 hover:text-forest-ink transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Essay Panel */}
              <div className="lg:col-span-7 flex flex-col space-y-4 max-h-[500px]">
                {gradingSubmission.notes && (
                  <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 text-xs leading-relaxed">
                    <strong className="text-amber-800 font-bold block mb-0.5">Candidate Notes:</strong>
                    <span className="text-forest-ink/80 italic">{gradingSubmission.notes}</span>
                  </div>
                )}
                
                <div className="flex-grow flex flex-col min-h-0 bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-inner">
                  <div className="flex justify-between items-center text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider pb-2 border-b border-forest-ink/5">
                    <span>Submitted Essay Text</span>
                    <span>{gradingSubmission.essayText?.trim().split(/\s+/).length || 0} Words</span>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto pt-4 text-sm leading-relaxed whitespace-pre-wrap font-inter text-forest-ink/90 scroll-smooth">
                    {gradingSubmission.essayText || (
                      <em className="text-forest-ink/30 text-xs">No essay text submitted.</em>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Feedback Panel */}
              <div className="lg:col-span-5 flex flex-col">
                <form onSubmit={handleSaveGrade} className="space-y-4 bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs">
                  <h4 className="font-bold text-sm font-bricolage text-forest-ink border-b border-forest-ink/5 pb-2">
                    Evaluation Details
                  </h4>

                  {saveError && (
                    <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                      {saveError}
                    </div>
                  )}

                  {/* Select Score */}
                  <div className="space-y-1.5">
                    <Label htmlFor="gradingScore" className="text-xs font-semibold text-forest-ink">
                      Estimated IELTS Band Score
                    </Label>
                    <select
                      id="gradingScore"
                      value={gradingScore}
                      onChange={(e) => setGradingScore(e.target.value)}
                      disabled={savingGrade}
                      className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold cursor-pointer"
                    >
                      <option value="9.0">Band 9.0 (Expert)</option>
                      <option value="8.5">Band 8.5</option>
                      <option value="8.0">Band 8.0 (Very Good)</option>
                      <option value="7.5">Band 7.5</option>
                      <option value="7.0">Band 7.0 (Good)</option>
                      <option value="6.5">Band 6.5</option>
                      <option value="6.0">Band 6.0 (Competent)</option>
                      <option value="5.5">Band 5.5</option>
                      <option value="5.0">Band 5.0 (Modest)</option>
                      <option value="4.5">Band 4.5</option>
                      <option value="4.0">Band 4.0 (Limited)</option>
                    </select>
                  </div>

                  {/* Written Feedback */}
                  <div className="space-y-1.5">
                    <Label htmlFor="gradingFeedback" className="text-xs font-semibold text-forest-ink">
                      Detailed Corrections & Feedback
                    </Label>
                    <textarea
                      id="gradingFeedback"
                      rows={8}
                      placeholder="Write grammatical corrections, structural suggestions, band score breakdowns for Lexical Resource, Cohesion & Coherence, Task Response..."
                      value={gradingFeedback}
                      onChange={(e) => setGradingFeedback(e.target.value)}
                      disabled={savingGrade}
                      required
                      className="w-full p-3 border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink bg-white placeholder-forest-ink/30 focus-visible:ring-0 focus-visible:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={savingGrade}
                    variant="forest"
                    className="w-full h-10 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    {savingGrade ? (
                      <>
                        <Loader2 size={13} className="animate-spin mr-1.5" />
                        Submitting Evaluation...
                      </>
                    ) : (
                      "Submit Grade & Feedback"
                    )}
                  </Button>
                </form>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-end">
              <Button
                variant="forestOutline"
                onClick={() => {
                  setGradingSubmission(null);
                  setGradingFeedback("");
                  setGradingScore("7.0");
                }}
                size="sm"
                className="h-10 px-6 cursor-pointer rounded-xl font-semibold border-forest-ink/15 text-forest-ink"
              >
                Close Panel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Student Attempts Modal */}
      {selectedStudentForAttempts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-cream-paper rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto border border-pencil-gray/25 shadow-2xl flex flex-col text-forest-ink"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {selectedStudentForAttempts.photoURL ? (
                  <img
                    src={selectedStudentForAttempts.photoURL}
                    alt={selectedStudentForAttempts.displayName}
                    className="w-12 h-12 rounded-full object-cover border border-forest-ink/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-forest-ink/5 text-forest-ink border border-forest-ink/10 flex items-center justify-center font-bold text-base uppercase">
                    {selectedStudentForAttempts.displayName?.[0] || selectedStudentForAttempts.email?.[0] || "U"}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg font-bricolage text-forest-ink">
                    {selectedStudentForAttempts.displayName || "Practice Candidate"}
                  </h3>
                  <p className="text-xs text-forest-ink/60 font-mono">
                    {selectedStudentForAttempts.email || "No Email"}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedStudentForAttempts(null)}
                className="p-1.5 rounded-full hover:bg-whisper-gray text-forest-ink/60 hover:text-forest-ink transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              {attempts.filter((att) => att.uid === selectedStudentForAttempts.id).length === 0 ? (
                <div className="py-12 text-center text-forest-ink/50 text-sm">
                  This candidate has not attempted any practice exams yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-forest-ink/5 text-[10px] font-mono uppercase tracking-wider text-forest-ink/45 pb-2">
                        <th className="pb-2 font-semibold">Test Name</th>
                        <th className="pb-2 font-semibold">Category</th>
                        <th className="pb-2 font-semibold">Attempt Date</th>
                        <th className="pb-2 font-semibold text-right">Score & Band</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest-ink/5 text-sm">
                      {attempts
                        .filter((att) => att.uid === selectedStudentForAttempts.id)
                        .map((att) => {
                          const date = att.submittedAt
                            ? new Date(att.submittedAt.seconds * 1000).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "N/A";
                          return (
                            <tr key={att.id} className="hover:bg-cream-paper/20 transition-all">
                              <td className="py-3 pr-3 font-semibold text-forest-ink text-xs max-w-[280px] truncate">
                                {formatTestName(att.testId)}
                              </td>
                              <td className="py-3 pr-3 text-xs">
                                <span className="px-2 py-0.5 rounded bg-forest-ink/5 border border-forest-ink/10 text-[9px] font-mono font-bold uppercase tracking-wider text-forest-ink/75">
                                  {formatTestType(att.testType)}
                                </span>
                              </td>
                              <td className="py-3 pr-3 text-xs text-forest-ink/65">
                                {date}
                              </td>
                              <td className="py-3 text-right space-y-0.5">
                                <span className="font-bold font-mono text-xs block text-forest-ink">
                                  {att.score} / {att.total}
                                </span>
                                <span className="inline-block px-1.5 py-0.5 rounded-md bg-forest-ink text-white font-bold text-[9px] font-mono">
                                  Band {getBandScore(att.score, att.testType)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-end">
              <Button
                variant="forestOutline"
                onClick={() => setSelectedStudentForAttempts(null)}
                size="sm"
                className="h-10 px-6 cursor-pointer rounded-xl font-semibold border-forest-ink/15 text-forest-ink"
              >
                Close Attempts
              </Button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
