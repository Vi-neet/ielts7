"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield,
  ShieldAlert,
  Loader2,
  FileText,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  Globe,
  Award,
  X,
  Download,
  Plus,
  Trash2,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ExternalLink,
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

interface Annotation {
  start: number;
  end: number;
  text: string;
  comment: string;
  category: "grammar" | "vocabulary" | "coherence" | "task";
}

interface WritingSubmission {
  id: string;
  uid: string;
  taskType: "task_1" | "task_2";
  submissionMethod: "text" | "file";
  essayText?: string;
  storagePath?: string;
  fileName?: string;
  fileSize?: number;
  notes?: string;
  status: "submitted" | "graded";
  submittedAt: any;
  score?: string;
  scores?: {
    tr: number;
    cc: number;
    lr: number;
    gra: number;
  };
  annotations?: Annotation[];
  feedbackText?: string;
  candidateEmail?: string;
  candidateName?: string;
  paymentId?: string;
  reviewedBy?: string;
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
  isGuest?: boolean;
}

type Tab = "submissions" | "students";

type SortFieldStudents = "displayName" | "country" | "targetBand" | "updatedAt" | "targetDate";
type SortFieldSubmissions = "candidateName" | "taskType" | "submittedAt" | "status";

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  // Navigation & Data tabs
  const [activeTab, setActiveTab] = useState<Tab>("students");

  // Core Data sets
  const [submissions, setSubmissions] = useState<WritingSubmission[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  // Search, Filters & Sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "submitted" | "graded">("all");
  
  const [sortFieldStud, setSortFieldStud] = useState<SortFieldStudents>("updatedAt");
  const [sortFieldSub, setSortFieldSub] = useState<SortFieldSubmissions>("submittedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Loading indicator states
  const [loadingData, setLoadingData] = useState(true);

  // Active evaluation (drawer-split panel)
  const [gradingSubmission, setGradingSubmission] = useState<WritingSubmission | null>(null);
  const [rubricScores, setRubricScores] = useState({
    tr: 7.0,
    cc: 7.0,
    lr: 7.0,
    gra: 7.0,
  });
  const [gradingFeedback, setGradingFeedback] = useState("");
  const [savingGrade, setSavingGrade] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Annotations Builder State
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([]);
  const [newAnnotation, setNewAnnotation] = useState<{
    start: number;
    end: number;
    text: string;
    comment: string;
    category: "grammar" | "vocabulary" | "coherence" | "task";
  } | null>(null);

  const essayTextContainerRef = useRef<HTMLDivElement>(null);

  // Expanded student activity hub modal
  const [selectedStudentForAttempts, setSelectedStudentForAttempts] = useState<Student | null>(null);

  // Route security checks
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/admin");
    }
  }, [user, authLoading, router]);

  // Keyboard shortcut listener (Ctrl+Enter to save, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (newAnnotation) {
          setNewAnnotation(null);
        } else if (gradingSubmission) {
          closeGradingPanel();
        } else if (selectedStudentForAttempts) {
          setSelectedStudentForAttempts(null);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && gradingSubmission && !savingGrade) {
        e.preventDefault();
        submitEvaluationForm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gradingSubmission, rubricScores, gradingFeedback, activeAnnotations, newAnnotation, selectedStudentForAttempts, savingGrade]);

  const closeGradingPanel = () => {
    setGradingSubmission(null);
    setGradingFeedback("");
    setRubricScores({ tr: 7.0, cc: 7.0, lr: 7.0, gra: 7.0 });
    setActiveAnnotations([]);
    setNewAnnotation(null);
  };

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
      
      // Build lookup map
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
          storagePath: data.storagePath || undefined,
          fileName: data.fileName || undefined,
          fileSize: data.fileSize || undefined,
          notes: data.notes,
          status: data.status,
          submittedAt: data.submittedAt,
          score: data.score,
          scores: data.scores,
          annotations: data.annotations || [],
          feedbackText: data.feedbackText,
          candidateEmail: candidate?.email || "Unknown Student",
          candidateName: candidate?.displayName || "Practice Candidate",
          paymentId: data.paymentId || undefined,
          reviewedBy: data.reviewedBy || undefined,
        };
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

  // Load active grading submission data when selected
  useEffect(() => {
    if (gradingSubmission) {
      setGradingFeedback(gradingSubmission.feedbackText || "");
      if (gradingSubmission.scores) {
        setRubricScores({
          tr: gradingSubmission.scores.tr || 7.0,
          cc: gradingSubmission.scores.cc || 7.0,
          lr: gradingSubmission.scores.lr || 7.0,
          gra: gradingSubmission.scores.gra || 7.0,
        });
      } else {
        const parsedScore = parseFloat(gradingSubmission.score || "7.0");
        const defaultVal = isNaN(parsedScore) ? 7.0 : parsedScore;
        setRubricScores({ tr: defaultVal, cc: defaultVal, lr: defaultVal, gra: defaultVal });
      }
      setActiveAnnotations(gradingSubmission.annotations || []);
    }
  }, [gradingSubmission]);

  // Calculate dynamic average band rounded to nearest half band
  const calculatedOverallBand = Math.round(((rubricScores.tr + rubricScores.cc + rubricScores.lr + rubricScores.gra) / 4) * 2) / 2;

  const [downloadingFile, setDownloadingFile] = useState(false);

  const handleDownloadSubmissionFile = async (storagePath: string) => {
    try {
      setDownloadingFile(true);
      const fileRef = ref(storage, storagePath);
      const url = await getDownloadURL(fileRef);
      window.open(url, "_blank");
    } catch (err: any) {
      console.error("Failed to load file from storage:", err);
      alert("Could not open file: " + (err.message || "Please check storage permissions."));
    } finally {
      setDownloadingFile(false);
    }
  };

  // Accurately compute selection character offsets relative to container
  function getSelectionCharacterOffsetWithin(element: HTMLElement): { start: number; end: number } | null {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    if (!element.contains(range.startContainer) || !element.contains(range.endContainer)) {
      return null;
    }
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const start = preCaretRange.toString().length;
    const end = start + range.toString().length;
    return { start, end };
  }

  // Handle text selection in essay container with accurate DOM offset calculation
  const handleEssayTextSelection = () => {
    if (!gradingSubmission || gradingSubmission.status === "graded") return;
    if (!essayTextContainerRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const text = gradingSubmission.essayText || "";
    const offsets = getSelectionCharacterOffsetWithin(essayTextContainerRef.current);
    let startIndex = offsets ? offsets.start : text.indexOf(selectedText);

    if (offsets) {
      const rawText = selection.toString();
      const leadingSpaces = rawText.length - rawText.trimStart().length;
      startIndex += leadingSpaces;
    }

    if (startIndex >= 0 && startIndex < text.length) {
      setNewAnnotation({
        start: startIndex,
        end: startIndex + selectedText.length,
        text: selectedText,
        comment: "",
        category: "grammar",
      });
    }
  };

  // Add constructed annotation to state
  const handleSaveNewAnnotation = () => {
    if (!newAnnotation || !newAnnotation.comment.trim()) return;
    setActiveAnnotations((prev) => [...prev, newAnnotation as Annotation]);
    setNewAnnotation(null);
  };

  // Remove annotation from list
  const handleDeleteAnnotation = (index: number) => {
    setActiveAnnotations((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic submit handler
  const submitEvaluationForm = async () => {
    if (!gradingSubmission) return;

    setSavingGrade(true);
    setSaveError("");

    try {
      const docRef = doc(db, "writingSubmissions", gradingSubmission.id);
      const overallStr = calculatedOverallBand.toFixed(1);

      await updateDoc(docRef, {
        status: "graded",
        score: overallStr,
        scores: rubricScores,
        annotations: activeAnnotations,
        feedbackText: gradingFeedback,
        reviewedBy: user?.email || "admin",
        reviewedByUid: user?.uid || null,
        updatedAt: serverTimestamp(),
      });

      // Update local state instantly
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === gradingSubmission.id
            ? {
                ...sub,
                status: "graded",
                score: overallStr,
                scores: rubricScores,
                annotations: activeAnnotations,
                feedbackText: gradingFeedback,
              }
            : sub
        )
      );

      closeGradingPanel();
    } catch (err: any) {
      console.error("Failed to submit grade evaluation:", err);
      setSaveError(err.message || "Failed to update essay evaluation document.");
    } finally {
      setSavingGrade(false);
    }
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    submitEvaluationForm();
  };

  // --- Dynamic Search Highlighting helper ---
  function highlightText(text: string, q: string) {
    if (!q || !text) return <>{text}</>;
    const parts = text.split(new RegExp(`(${q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="bg-highlighter-yellow text-forest-ink font-bold px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  }

  // --- Sort Toggles ---
  const toggleStudentSort = (field: SortFieldStudents) => {
    if (sortFieldStud === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortFieldStud(field);
      setSortOrder("desc");
    }
  };

  const toggleSubmissionSort = (field: SortFieldSubmissions) => {
    if (sortFieldSub === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortFieldSub(field);
      setSortOrder("desc");
    }
  };

  // --- CSV Exports ---
  const exportStudentsToCSV = () => {
    const headers = ["Name", "Email", "Country", "Native Language", "Target Module", "Target Band", "Exam Date", "Last Updated"];
    const rows = students.map((s) => [
      s.displayName || "N/A",
      s.email || "N/A",
      s.country || "N/A",
      s.nativeLanguage || "N/A",
      s.targetModule || "N/A",
      s.targetBand || "7.0",
      s.targetDate || "N/A",
      s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : "N/A"
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ielts_students_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSubmissionsToCSV = () => {
    const headers = ["Candidate Name", "Email", "Task Type", "Submission Method", "Payment ID", "Status", "Overall Band", "Submitted At"];
    const rows = submissions.map((sub) => [
      sub.candidateName || "N/A",
      sub.candidateEmail || "N/A",
      sub.taskType === "task_1" ? "Task 1" : "Task 2",
      sub.submissionMethod,
      sub.paymentId || "Unpaid/Legacy",
      sub.status,
      sub.score || "N/A",
      sub.submittedAt ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString() : "N/A"
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `essay_submissions_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Render Annotations in text pane ---
  const renderAnnotatedText = (text: string | undefined, list: Annotation[]) => {
    if (!text) return <em className="text-forest-ink/30 text-xs">No essay text submitted.</em>;
    if (!list || list.length === 0) return <div className="whitespace-pre-wrap">{text}</div>;

    // Sort chronologically by character start offset
    const sorted = [...list].sort((a, b) => a.start - b.start);

    const elements: React.ReactNode[] = [];
    let lastIdx = 0;

    sorted.forEach((ann, i) => {
      const annStart = Math.max(0, Math.min(ann.start, text.length));
      const annEnd = Math.max(annStart, Math.min(ann.end, text.length));

      // Skip if already completely covered by a previous highlight
      if (annEnd <= lastIdx) return;

      // Text segment before highlight
      if (annStart > lastIdx) {
        elements.push(text.substring(lastIdx, annStart));
      }

      const effectiveStart = Math.max(annStart, lastIdx);

      // Highlights based on annotation category
      const colorMap = {
        grammar: "bg-terracotta/20 border-b-2 border-terracotta text-forest-ink",
        vocabulary: "bg-highlighter-yellow/30 border-b-2 border-highlighter-yellow text-forest-ink",
        coherence: "bg-sticky-note-teal/20 border-b-2 border-sticky-note-teal text-forest-ink",
        task: "bg-sticky-note-blush/30 border-b-2 border-purple-500 text-forest-ink",
      };

      const highlightClass = colorMap[ann.category] || "bg-amber-100";

      elements.push(
        <span
          key={`ann-${i}`}
          className={`relative group px-1 font-medium rounded-sm cursor-help transition-all ${highlightClass}`}
        >
          {text.substring(effectiveStart, annEnd)}
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-forest-ink text-white text-[11px] p-3 rounded-xl shadow-lg z-50 leading-relaxed font-inter">
            <strong className="block text-[9px] uppercase font-bold text-highlighter-yellow tracking-wider mb-1">
              {ann.category === "grammar" ? "Grammar & Accuracy" : ann.category}
            </strong>
            {ann.comment}
          </span>
        </span>
      );
      lastIdx = annEnd;
    });

    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }

    return <div className="whitespace-pre-wrap">{elements}</div>;
  };

  // --- Dynamic Filtering & Sorting Logic ---
  const filteredSubmissions = submissions
    .filter((sub) => {
      const q = searchQuery.toLowerCase();
      const name = (sub.candidateName || "").toLowerCase();
      const email = (sub.candidateEmail || "").toLowerCase();
      const id = (sub.id || "").toLowerCase();
      
      const matchesSearch = name.includes(q) || email.includes(q) || id.includes(q);
      const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let valA: any = a[sortFieldSub];
      let valB: any = b[sortFieldSub];

      if (sortFieldSub === "submittedAt") {
        valA = a.submittedAt?.seconds ? a.submittedAt.seconds * 1000 : (a.submittedAt ? new Date(a.submittedAt).getTime() : 0);
        valB = b.submittedAt?.seconds ? b.submittedAt.seconds * 1000 : (b.submittedAt ? new Date(b.submittedAt).getTime() : 0);
        if (isNaN(valA)) valA = 0;
        if (isNaN(valB)) valB = 0;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const filteredStudents = students
    .filter((s) => {
      const q = searchQuery.toLowerCase();
      const name = (s.displayName || "").toLowerCase();
      const email = (s.email || "").toLowerCase();
      const country = (s.country || "").toLowerCase();
      const lang = (s.nativeLanguage || "").toLowerCase();
      
      return name.includes(q) || email.includes(q) || country.includes(q) || lang.includes(q);
    })
    .sort((a, b) => {
      let valA: any = a[sortFieldStud] || "";
      let valB: any = b[sortFieldStud] || "";

      if (sortFieldStud === "updatedAt") {
        const rawA = a.updatedAt as any;
        const rawB = b.updatedAt as any;
        valA = rawA ? new Date(rawA?.seconds ? rawA.seconds * 1000 : rawA).getTime() : 0;
        valB = rawB ? new Date(rawB?.seconds ? rawB.seconds * 1000 : rawB).getTime() : 0;
        if (isNaN(valA)) valA = 0;
        if (isNaN(valB)) valB = 0;
      }

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Visual Verification loading indicator
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
              <Button variant="forest" className="w-full h-11 font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] text-forest-ink pt-8 pb-24 px-4 sm:px-6 lg:px-8 font-inter relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner header */}
        <div className="relative bg-forest-ink text-white rounded-3xl p-6 sm:p-8 shadow-md overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Admin Identity */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 text-white flex items-center justify-center font-bricolage font-bold text-2xl sm:text-3xl border border-white/20 shadow-xs overflow-hidden shrink-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <Shield size={30} className="text-white/85" />
                )}
              </div>
              <div className="space-y-0.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-white tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-white/60 text-xs font-mono">
                  {user?.email || "admin@ielts7plus.internal"}
                </p>
              </div>
            </div>

            {/* Quick Stat Summary Bar & Action Button */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/15 backdrop-blur-xs text-xs font-mono">
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Students</span>
                  <strong className="text-white font-bold text-base">{students.length}</strong>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Pending</span>
                  <strong className="text-highlighter-yellow font-bold text-base">
                    {submissions.filter((s) => s.status === "submitted").length}
                  </strong>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="text-white/50 block text-[9px] uppercase tracking-wider">Graded</span>
                  <strong className="text-white font-bold text-base">
                    {submissions.filter((s) => s.status === "graded").length}
                  </strong>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={activeTab === "students" ? exportStudentsToCSV : exportSubmissionsToCSV}
                className="h-10 px-4 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-forest-ink font-semibold font-inter shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download size={15} />
                <span>Export {activeTab === "students" ? "Students" : "Essays"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* --- Theme styled Statistics Cards (Notebook Aesthetics) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-inter">
          <motion.div
            whileHover={{ y: -3, rotate: -0.5 }}
            className="bg-sticky-note-mint border border-pencil-gray/25 shadow-card rounded-3xl p-6 relative overflow-hidden rotate-0.5"
          >
            <div className="absolute top-3 right-3 opacity-20">
              <Users size={40} className="text-forest-ink" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/60 font-bold block mb-1">
              Enrolled Students
            </span>
            <strong className="text-3xl font-extrabold font-bricolage text-forest-ink block">
              {students.length}
            </strong>
            <span className="text-xs text-forest-ink/55 mt-1 block">Active user profiles in database</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, rotate: 0.5 }}
            className="bg-highlighter-yellow/30 border border-pencil-gray/25 shadow-card rounded-3xl p-6 relative overflow-hidden -rotate-0.5"
          >
            <div className="absolute top-3 right-3 opacity-20">
              <FileText size={40} className="text-forest-ink" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/60 font-bold block mb-1">
              Pending Evaluation
            </span>
            <strong className="text-3xl font-extrabold font-bricolage text-forest-ink block">
              {submissions.filter((s) => s.status === "submitted").length}
            </strong>
            <span className="text-xs text-forest-ink/55 mt-1 block">Paid essays waiting for feedback</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, rotate: -0.5 }}
            className="bg-sticky-note-teal border border-pencil-gray/25 shadow-card rounded-3xl p-6 relative overflow-hidden rotate-0.5"
          >
            <div className="absolute top-3 right-3 opacity-20">
              <Award size={40} className="text-forest-ink" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/60 font-bold block mb-1">
              Evaluations Graded
            </span>
            <strong className="text-3xl font-extrabold font-bricolage text-forest-ink block">
              {submissions.filter((s) => s.status === "graded").length}
            </strong>
            <span className="text-xs text-forest-ink/55 mt-1 block">Essays completed and reports sent</span>
          </motion.div>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Tabs navigation */}
          <div className="flex gap-2 p-1.5 bg-white border border-forest-ink/10 rounded-2xl self-start shadow-2xs">
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
                    ? "Search name, email, or submission ID…"
                    : "Search student, country, native language…"
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
                className="h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-semibold shrink-0 cursor-pointer shadow-2xs"
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
                  <table className="w-full text-left border-collapse font-inter">
                    <thead>
                      <tr className="border-b border-forest-ink/5 text-[10px] font-mono uppercase tracking-wider text-forest-ink/45 pb-3">
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleSubmissionSort("candidateName")}>
                          Candidate {sortFieldSub === "candidateName" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleSubmissionSort("taskType")}>
                          Task {sortFieldSub === "taskType" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold">Payment ID</th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleSubmissionSort("submittedAt")}>
                          Submitted {sortFieldSub === "submittedAt" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleSubmissionSort("status")}>
                          Status / Band {sortFieldSub === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
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
                              <span className="font-bold text-forest-ink block leading-snug">
                                {highlightText(sub.candidateName || "", searchQuery)}
                              </span>
                              <span className="text-[10px] text-forest-ink/50 block font-mono truncate">
                                {highlightText(sub.candidateEmail || "", searchQuery)}
                              </span>
                            </td>
                            <td className="py-4 pr-3">
                              <span className="px-2 py-0.5 rounded-sm bg-forest-ink/5 border border-forest-ink/10 text-[10px] font-mono font-bold uppercase tracking-wider">
                                {sub.taskType === "task_1" ? "Task 1" : "Task 2"}
                              </span>
                            </td>
                            <td className="py-4 pr-3 text-xs font-mono text-forest-ink/60">
                              {sub.paymentId ? (
                                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                                  {sub.paymentId}
                                </span>
                              ) : (
                                <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/40 italic">
                                  Legacy / Manual
                                </span>
                              )}
                            </td>
                            <td className="py-4 pr-3 text-xs text-forest-ink/60">
                              {date}
                            </td>
                            <td className="py-4 pr-3">
                              {sub.status === "graded" ? (
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                                    <span>Graded (Band {sub.score})</span>
                                  </div>
                                  {sub.reviewedBy && (
                                    <span className="text-[10px] text-forest-ink/45 font-mono block truncate max-w-[150px]">
                                      by {sub.reviewedBy}
                                    </span>
                                  )}
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
                                className="text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
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
                  <table className="w-full text-left border-collapse font-inter">
                    <thead>
                      <tr className="border-b border-forest-ink/5 text-[10px] font-mono uppercase tracking-wider text-forest-ink/45 pb-3">
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleStudentSort("displayName")}>
                          Student Name {sortFieldStud === "displayName" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleStudentSort("country")}>
                          Demographics {sortFieldStud === "country" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleStudentSort("targetBand")}>
                          IELTS Goal {sortFieldStud === "targetBand" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleStudentSort("targetDate")}>
                          Exam Date {sortFieldStud === "targetDate" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="pb-3 font-semibold cursor-pointer select-none hover:text-forest-ink" onClick={() => toggleStudentSort("updatedAt")}>
                          Last Updated {sortFieldStud === "updatedAt" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
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
                                  <span className="font-bold text-forest-ink block leading-snug truncate">
                                    {highlightText(s.displayName || "Practice Candidate", searchQuery)}
                                  </span>
                                  <span className="text-[10px] text-forest-ink/50 block font-mono truncate">
                                    {highlightText(s.email || "No Email", searchQuery)}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-3 text-xs text-forest-ink/75 space-y-0.5">
                              <div className="flex items-center gap-1">
                                <Globe size={11} className="text-forest-ink/40" />
                                <span>{highlightText(s.country || "Unknown Country", searchQuery)}</span>
                              </div>
                              <div className="text-[10px] text-forest-ink/50 pl-4 font-mono">
                                Lang: {highlightText(s.nativeLanguage || "N/A", searchQuery)}
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
                                className="text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
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

      {/* --- Upgraded Side-by-Side Grading Split Panel --- */}
      <AnimatePresence>
        {gradingSubmission && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeGradingPanel}
              className="fixed inset-0 bg-black z-40"
            />
            
            {/* Slide-out side drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 bg-cream-paper border-l border-pencil-gray/25 shadow-2xl w-full max-w-3xl z-50 flex flex-col text-forest-ink"
            >
              {/* Header */}
              <div className="bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10 font-inter">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-lg font-bricolage text-forest-ink flex items-center gap-1.5">
                    <FileText className="w-5 h-5 text-forest-ink/75" />
                    Essay Evaluation & Rubrics
                  </h3>
                  <p className="text-xs text-forest-ink/60 font-mono truncate max-w-md">
                    {gradingSubmission.candidateName} • {gradingSubmission.taskType === "task_1" ? "Writing Task 1" : "Writing Task 2"}
                  </p>
                </div>
                
                <button
                  onClick={closeGradingPanel}
                  className="p-1.5 rounded-full hover:bg-whisper-gray text-forest-ink/60 hover:text-forest-ink transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Split Layout */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 font-inter">
                
                {/* Payment Badge & Transaction info */}
                <div className="bg-white border border-forest-ink/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <span className="text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider block">Payment Verification</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      <strong className="text-xs font-bold text-emerald-800">Verified ₹49 Transaction</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-forest-ink/40 uppercase tracking-wider block">Razorpay ID</span>
                    <strong className="text-xs font-mono text-forest-ink/75 block mt-0.5">
                      {gradingSubmission.paymentId || "Legacy Verification"}
                    </strong>
                  </div>
                </div>

                {/* Candidate Notes */}
                {gradingSubmission.notes && (
                  <div className="bg-[#fffbeb] border border-amber-200/50 rounded-2xl p-4 text-xs leading-relaxed text-amber-900 shadow-2xs">
                    <strong className="font-extrabold block text-amber-900 uppercase tracking-wide mb-1 font-mono text-[9px]">
                      Candidate Specific Notes:
                    </strong>
                    <span className="italic">"{gradingSubmission.notes}"</span>
                  </div>
                )}

                {/* --- Essay Content Area (File vs Text) --- */}
                {gradingSubmission.submissionMethod === "file" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-forest-ink/45 uppercase tracking-wider">
                      <span>Submitted Document File</span>
                      <span>Attachment Review</span>
                    </div>

                    <div className="bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-forest-ink/5 border border-forest-ink/10 flex items-center justify-center text-forest-ink shrink-0">
                            <FileText size={24} />
                          </div>
                          <div className="min-w-0">
                            <strong className="block text-sm font-bold text-forest-ink truncate max-w-sm">
                              {gradingSubmission.fileName || "Uploaded Essay Document"}
                            </strong>
                            <span className="text-xs text-forest-ink/50 font-mono block mt-0.5">
                              {gradingSubmission.fileSize
                                ? `${(Number(gradingSubmission.fileSize) / (1024 * 1024)).toFixed(2)} MB`
                                : "Document File"}
                            </span>
                          </div>
                        </div>

                        {gradingSubmission.storagePath ? (
                          <Button
                            size="sm"
                            variant="forest"
                            disabled={downloadingFile}
                            onClick={() => handleDownloadSubmissionFile(gradingSubmission.storagePath!)}
                            className="flex items-center gap-2 text-xs font-semibold cursor-pointer shrink-0"
                          >
                            {downloadingFile ? (
                              <>
                                <Loader2 size={14} className="animate-spin" />
                                <span>Loading File...</span>
                              </>
                            ) : (
                              <>
                                <Download size={14} />
                                <span>Download / Open File</span>
                              </>
                            )}
                          </Button>
                        ) : (
                          <span className="text-xs text-amber-700 font-mono">No storage path available</span>
                        )}
                      </div>

                      <p className="text-xs text-forest-ink/65 bg-cream-paper p-3 rounded-xl border border-forest-ink/5 leading-relaxed">
                        The candidate submitted a file attachment (PDF/DOCX/Image). Click the button above to inspect their essay submission, then record your criteria marks and written feedback below.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* --- Essay annotations text pane --- */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-forest-ink/45 uppercase tracking-wider">
                        <span>
                          {gradingSubmission.status === "graded" 
                            ? "Evaluated Essay Text (Hover annotations for corrections)" 
                            : "Highlight essay text to add inline annotations"}
                        </span>
                        <span>{gradingSubmission.essayText?.trim().split(/\s+/).length || 0} Words</span>
                      </div>

                      <div
                        ref={essayTextContainerRef}
                        onMouseUp={handleEssayTextSelection}
                        className="bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs text-sm leading-relaxed text-forest-ink select-text focus-visible:outline-none min-h-[160px] max-h-[360px] overflow-y-auto"
                      >
                        {gradingSubmission.essayText ? (
                          renderAnnotatedText(gradingSubmission.essayText, activeAnnotations)
                        ) : (
                          <em className="text-forest-ink/30 text-xs">No essay text submitted.</em>
                        )}
                      </div>
                    </div>

                    {/* --- Inline Annotations List Builder (Grading Mode) --- */}
                    {gradingSubmission.status === "submitted" && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-forest-ink/45">
                          Active Corrections ({activeAnnotations.length})
                        </h4>
                        {activeAnnotations.length === 0 ? (
                          <div className="p-4 bg-white/50 border border-dashed border-forest-ink/15 rounded-2xl text-center text-xs text-forest-ink/45">
                            No inline corrections yet. Drag-select text in the essay box above to comment.
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {activeAnnotations.map((ann, idx) => (
                              <div
                                key={idx}
                                className="bg-white border border-forest-ink/5 rounded-xl p-3 flex justify-between gap-3 text-xs shadow-2xs hover:border-forest-ink/10 transition-colors"
                              >
                                <div className="space-y-1">
                                  <span className="inline-block px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono font-bold uppercase tracking-wider bg-forest-ink/5 border border-forest-ink/10 text-forest-ink capitalize">
                                    {ann.category}
                                  </span>
                                  <p className="font-semibold text-forest-ink/80 italic">"{ann.text}"</p>
                                  <p className="text-forest-ink/75 font-medium">{ann.comment}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAnnotation(idx)}
                                  className="text-forest-ink/35 hover:text-rose-700 transition-colors self-start p-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* --- Rubric-based Scoring & Summary Form --- */}
                <form onSubmit={handleSaveGrade} className="space-y-4 bg-white border border-forest-ink/10 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-forest-ink/5 pb-2">
                    <h4 className="font-extrabold text-sm font-bricolage text-forest-ink">
                      IELTS Score Breakdown
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest-ink/40">
                      Calculated overall
                    </span>
                  </div>

                  {saveError && (
                    <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                      {saveError}
                    </div>
                  )}

                  {/* Rubric Matrix Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* TR */}
                    <div className="space-y-1.5">
                      <Label htmlFor="score_tr" className="text-xs font-semibold text-forest-ink">
                        Task Response / Achievement
                      </Label>
                      <select
                        id="score_tr"
                        value={rubricScores.tr}
                        onChange={(e) => setRubricScores(prev => ({ ...prev, tr: parseFloat(e.target.value) }))}
                        disabled={savingGrade || gradingSubmission.status === "graded"}
                        className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold cursor-pointer"
                      >
                        {[9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0].map(val => (
                          <option key={val} value={val}>Band {val.toFixed(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* CC */}
                    <div className="space-y-1.5">
                      <Label htmlFor="score_cc" className="text-xs font-semibold text-forest-ink">
                        Coherence & Cohesion
                      </Label>
                      <select
                        id="score_cc"
                        value={rubricScores.cc}
                        onChange={(e) => setRubricScores(prev => ({ ...prev, cc: parseFloat(e.target.value) }))}
                        disabled={savingGrade || gradingSubmission.status === "graded"}
                        className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold cursor-pointer"
                      >
                        {[9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0].map(val => (
                          <option key={val} value={val}>Band {val.toFixed(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* LR */}
                    <div className="space-y-1.5">
                      <Label htmlFor="score_lr" className="text-xs font-semibold text-forest-ink">
                        Lexical Resource (Vocabulary)
                      </Label>
                      <select
                        id="score_lr"
                        value={rubricScores.lr}
                        onChange={(e) => setRubricScores(prev => ({ ...prev, lr: parseFloat(e.target.value) }))}
                        disabled={savingGrade || gradingSubmission.status === "graded"}
                        className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold cursor-pointer"
                      >
                        {[9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0].map(val => (
                          <option key={val} value={val}>Band {val.toFixed(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* GRA */}
                    <div className="space-y-1.5">
                      <Label htmlFor="score_gra" className="text-xs font-semibold text-forest-ink">
                        Grammatical Range & Accuracy
                      </Label>
                      <select
                        id="score_gra"
                        value={rubricScores.gra}
                        onChange={(e) => setRubricScores(prev => ({ ...prev, gra: parseFloat(e.target.value) }))}
                        disabled={savingGrade || gradingSubmission.status === "graded"}
                        className="w-full h-10 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink font-mono font-bold cursor-pointer"
                      >
                        {[9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0].map(val => (
                          <option key={val} value={val}>Band {val.toFixed(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Calculated summary band preview */}
                  <div className="bg-[#faf9f6] border border-forest-ink/5 rounded-2xl p-4 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-forest-ink font-bold">Estimated IELTS Band Score</strong>
                      <span className="text-forest-ink/65">Standardized mean average rounding rules apply</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-forest-ink text-white font-mono font-bold text-lg shadow-sm">
                      Band {calculatedOverallBand.toFixed(1)}
                    </div>
                  </div>

                  {/* Written General Feedback */}
                  <div className="space-y-1.5">
                    <Label htmlFor="gradingFeedback" className="text-xs font-semibold text-forest-ink">
                      Detailed Corrections & Feedback Review
                    </Label>
                    <textarea
                      id="gradingFeedback"
                      rows={6}
                      placeholder="Write structural corrections, detailed improvements, and general reviews..."
                      value={gradingFeedback}
                      onChange={(e) => setGradingFeedback(e.target.value)}
                      disabled={savingGrade || gradingSubmission.status === "graded"}
                      required
                      className="w-full p-3 border border-forest-ink/20 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink bg-white placeholder-forest-ink/30 focus-visible:ring-0 focus-visible:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  {gradingSubmission.status === "submitted" && (
                    <Button
                      type="submit"
                      disabled={savingGrade}
                      variant="forest"
                      className="w-full h-10 text-xs font-semibold rounded-xl cursor-pointer shadow-sm"
                    >
                      {savingGrade ? (
                        <>
                          <Loader2 size={13} className="animate-spin mr-1.5" />
                          Submitting Evaluation...
                        </>
                      ) : (
                        "Submit Grade & Feedback (Ctrl+Enter)"
                      )}
                    </Button>
                  )}
                </form>
              </div>

              {/* Modal Footer actions */}
              <div className="bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-between sticky bottom-0 z-10">
                <div className="text-[10px] font-mono text-forest-ink/35 flex items-center">
                  Ctrl+Enter to save • Esc to close
                </div>
                <Button
                  variant="forestOutline"
                  onClick={closeGradingPanel}
                  size="sm"
                  className="h-10 px-6 cursor-pointer rounded-xl font-semibold border-forest-ink/15 text-forest-ink"
                >
                  Close Panel
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Upgraded Interactive Highlight creation popover --- */}
      <AnimatePresence>
        {newAnnotation && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-sm border border-pencil-gray/25 shadow-2xl p-5 space-y-4 text-forest-ink font-inter"
            >
              <div className="flex items-center justify-between border-b border-forest-ink/5 pb-2">
                <h4 className="font-bold text-sm font-bricolage">Add Text Annotation</h4>
                <button onClick={() => setNewAnnotation(null)} className="text-forest-ink/40 hover:text-forest-ink cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="text-xs space-y-1">
                <span className="font-mono text-forest-ink/45 block">Selected sentence highlight:</span>
                <p className="bg-cream-paper border border-forest-ink/5 p-2 rounded-lg italic font-medium">
                  "{newAnnotation.text}"
                </p>
              </div>

              {/* Annotation Category */}
              <div className="space-y-1">
                <Label htmlFor="ann_cat" className="text-xs font-semibold">Category</Label>
                <select
                  id="ann_cat"
                  value={newAnnotation.category}
                  onChange={(e) => setNewAnnotation(prev => ({ ...prev!, category: e.target.value as any }))}
                  className="w-full h-9 px-2 bg-white border border-pencil-gray/25 text-xs rounded-xl font-inter text-forest-ink cursor-pointer"
                >
                  <option value="grammar">Grammar & Accuracy (GRA)</option>
                  <option value="vocabulary">Lexical Resource / Vocabulary (LR)</option>
                  <option value="coherence">Coherence & Cohesion (CC)</option>
                  <option value="task">Task Response (TR)</option>
                </select>
              </div>

              {/* Annotation Note */}
              <div className="space-y-1">
                <Label htmlFor="ann_comment" className="text-xs font-semibold">Correction Advice / Comment</Label>
                <textarea
                  id="ann_comment"
                  rows={3}
                  placeholder="Explain the error or suggest replacement text..."
                  value={newAnnotation.comment}
                  onChange={(e) => setNewAnnotation(prev => ({ ...prev!, comment: e.target.value }))}
                  required
                  className="w-full p-2.5 border border-pencil-gray/25 focus:border-forest-ink text-xs rounded-xl font-inter text-forest-ink resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="forestOutline"
                  size="sm"
                  onClick={() => setNewAnnotation(null)}
                  className="h-9 px-4 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  variant="forest"
                  size="sm"
                  onClick={handleSaveNewAnnotation}
                  disabled={!newAnnotation.comment.trim()}
                  className="h-9 px-4 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Save Highlight
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Upgraded Student Activity Journey Timeline Modal --- */}
      <AnimatePresence>
        {selectedStudentForAttempts && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudentForAttempts(null)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed inset-x-4 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-cream-paper rounded-3xl border border-pencil-gray/25 shadow-2xl flex flex-col text-forest-ink z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-white border-b border-pencil-gray/10 px-6 py-4 flex items-center justify-between z-10 font-inter">
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
                    <h3 className="font-extrabold text-base font-bricolage text-forest-ink">
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

              {/* Unified chronological timeline contents */}
              <div className="p-6 overflow-y-auto flex-grow bg-white/40">
                {(() => {
                  const timelineEvents = [
                    ...attempts
                      .filter((att) => att.uid === selectedStudentForAttempts.id)
                      .map((att) => ({
                        id: att.id,
                        type: "test" as const,
                        date: att.submittedAt,
                        title: formatTestName(att.testId),
                        subtitle: formatTestType(att.testType),
                        result: `${att.score} / ${att.total}`,
                        band: `Band ${getBandScore(att.score, att.testType)}`,
                        rawAttempt: att,
                      })),
                    ...submissions
                      .filter((sub) => sub.uid === selectedStudentForAttempts.id)
                      .map((sub) => ({
                        id: sub.id,
                        type: "essay" as const,
                        date: sub.submittedAt,
                        title: sub.taskType === "task_1" ? "Writing Task 1 Essay" : "Writing Task 2 Essay",
                        subtitle: sub.status === "graded" ? "Graded & Reviewed" : "Pending Evaluation",
                        result: sub.status === "graded" ? `Band ${sub.score}` : "Under Review",
                        band: sub.status === "graded" ? `Band ${sub.score}` : "Pending",
                        rawSubmission: sub,
                      })),
                  ].sort((a, b) => {
                    const timeA = a.date?.seconds || 0;
                    const timeB = b.date?.seconds || 0;
                    return timeB - timeA; // Newest events first
                  });

                  if (timelineEvents.length === 0) {
                    return (
                      <div className="py-16 text-center text-forest-ink/50 text-xs">
                        This candidate has no recorded practice history or essay submissions.
                      </div>
                    );
                  }

                  return (
                    <div className="relative border-l-2 border-forest-ink/10 pl-6 ml-4 space-y-6">
                      {timelineEvents.map((ev, idx) => {
                        const eventDate = ev.date
                          ? new Date(ev.date.seconds * 1000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A";
                        
                        return (
                          <div key={`${ev.id}-${idx}`} className="relative">
                            {/* Dot element */}
                            <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border bg-white shadow-2xs ${
                              ev.type === "essay" ? "border-terracotta text-terracotta" : "border-forest-ink text-forest-ink"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                ev.type === "essay" ? "bg-terracotta" : "bg-forest-ink"
                              }`} />
                            </span>

                            <div className="bg-white border border-forest-ink/5 rounded-2xl p-4 shadow-2xs space-y-2">
                              <div className="flex justify-between items-start gap-4">
                                <span className="text-[10px] font-mono text-forest-ink/40 uppercase block">
                                  {eventDate}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider block ${
                                  ev.type === "essay" 
                                    ? "bg-terracotta/5 border border-terracotta/20 text-terracotta" 
                                    : "bg-forest-ink/5 border border-forest-ink/10 text-forest-ink"
                                }`}>
                                  {ev.type === "essay" ? "Essay Response" : "Practice Exam"}
                                </span>
                              </div>

                              <div className="space-y-0.5">
                                <h4 className="font-bold text-sm text-forest-ink">
                                  {ev.title}
                                </h4>
                                <p className="text-xs text-forest-ink/65">
                                  {ev.subtitle}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-forest-ink/5 flex items-center justify-between gap-3">
                                <div>
                                  <span className="text-[10px] text-forest-ink/50 uppercase font-mono block">Performance</span>
                                  <span className="text-xs font-mono font-bold text-forest-ink">
                                    {ev.result} <span className="ml-1 text-[10px] bg-forest-ink text-white px-1.5 py-0.5 rounded font-bold">{ev.band}</span>
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {ev.type === "test" && ev.rawAttempt && (
                                    <Link
                                      href={`/tests/${ev.rawAttempt.testType}/${ev.rawAttempt.testId}/results/${ev.rawAttempt.id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Button
                                        size="sm"
                                        variant="forestOutline"
                                        className="px-3 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 hover:bg-forest-ink hover:text-white transition-colors shadow-2xs"
                                      >
                                        <span>View Result</span>
                                        <ExternalLink size={12} />
                                      </Button>
                                    </Link>
                                  )}

                                  {ev.type === "essay" && ev.rawSubmission && (
                                    <Button
                                      size="sm"
                                      variant={ev.rawSubmission.status === "graded" ? "outline" : "forest"}
                                      onClick={() => {
                                        setSelectedStudentForAttempts(null);
                                        setGradingSubmission(ev.rawSubmission);
                                      }}
                                      className="px-3 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-2xs"
                                    >
                                      <span>{ev.rawSubmission.status === "graded" ? "View Evaluation" : "Evaluate Essay"}</span>
                                      <ArrowRight size={12} />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Footer */}
              <div className="bg-white border-t border-pencil-gray/10 px-6 py-4 flex justify-end sticky bottom-0">
                <Button
                  variant="forestOutline"
                  onClick={() => setSelectedStudentForAttempts(null)}
                  size="sm"
                  className="h-10 px-6 cursor-pointer rounded-xl font-semibold border-forest-ink/15 text-forest-ink"
                >
                  Close History
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
