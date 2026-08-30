"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { sendSpeakingEmail } from "@/lib/speakingEmail";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Mic,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  User,
  ChevronRight,
  Sparkles,
  Target,
  Volume2,
  BookOpen,
  Award,
  Zap,
  Loader2,
  Check,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ──────────────────────────────────────────────────────────
// Static data for starter content hub
// ──────────────────────────────────────────────────────────

const TEST_PARTS = [
  {
    part: "Part 1",
    title: "Introduction & Interview",
    duration: "4–5 minutes",
    icon: MessageCircle,
    color: "bg-sticky-note-mint/40 border-sticky-note-mint",
    iconColor: "text-emerald-700",
    description:
      "The examiner introduces themselves and asks you general questions about familiar topics such as your home, family, work, studies, and interests. Answers should be natural and fluent.",
    tips: ["Keep answers 2-3 sentences", "Use varied vocabulary", "Speak naturally — not rehearsed"],
  },
  {
    part: "Part 2",
    title: "Individual Long Turn",
    duration: "3–4 minutes",
    icon: BookOpen,
    color: "bg-highlighter-yellow/30 border-highlighter-yellow",
    iconColor: "text-amber-700",
    description:
      "You receive a cue card with a topic and bullet points. You have 1 minute to prepare, then speak for 1–2 minutes. The examiner may ask 1–2 brief follow-up questions.",
    tips: ["Use all 1 minute of prep time", "Cover all bullet points", "Add a personal anecdote"],
  },
  {
    part: "Part 3",
    title: "Two-way Discussion",
    duration: "4–5 minutes",
    icon: Sparkles,
    color: "bg-sticky-note-blush/40 border-sticky-note-blush",
    iconColor: "text-purple-700",
    description:
      "A deeper discussion linked to the Part 2 topic. The examiner asks abstract, analytical questions about issues, society, and trends. This is where Band 7+ candidates shine.",
    tips: ["Give opinions with reasons", "Use speculative language", "Ask for clarification if needed"],
  },
];

const CRITERIA = [
  {
    code: "FC",
    name: "Fluency & Coherence",
    icon: Volume2,
    color: "from-emerald-500/10 to-emerald-500/5 border-emerald-200",
    band7: "Speaks at length without noticeable effort. Some hesitation but self-corrects. Uses cohesive devices effectively.",
    tips: ["Avoid long silences", "Use fillers naturally (\"well\", \"let me think\")", "Link ideas with discourse markers"],
  },
  {
    code: "LR",
    name: "Lexical Resource",
    icon: BookOpen,
    color: "from-amber-500/10 to-amber-500/5 border-amber-200",
    band7: "Uses a wide enough vocabulary to discuss topics with some flexibility. Uses paraphrase successfully.",
    tips: ["Learn topic-specific collocations", "Paraphrase if unsure of exact word", "Avoid word repetition"],
  },
  {
    code: "GRA",
    name: "Grammatical Range & Accuracy",
    icon: Zap,
    color: "from-blue-500/10 to-blue-500/5 border-blue-200",
    band7: "Uses a mix of simple and complex structures. Makes some errors but communication is not impeded.",
    tips: ["Use conditional sentences", "Mix tenses naturally", "Use relative clauses"],
  },
  {
    code: "PR",
    name: "Pronunciation",
    icon: Mic,
    color: "from-purple-500/10 to-purple-500/5 border-purple-200",
    band7: "Easy to understand. Uses a range of pronunciation features with mixed control. L1 accent does not impede understanding.",
    tips: ["Focus on word stress", "Link words naturally", "Practice intonation patterns"],
  },
];

const CUE_CARDS = [
  {
    topic: "Describe a book you have recently read",
    bullets: [
      "What the book was about",
      "Why you decided to read it",
      "What you liked or disliked about it",
    ],
    end: "...and explain how reading this book affected you.",
    vocab: ["thought-provoking", "engaging narrative", "literary masterpiece", "captivating plot"],
    structure: "Opening → Description → Personal reaction → Why it was significant",
  },
  {
    topic: "Describe a time you helped someone",
    bullets: [
      "Who the person was",
      "What the situation was",
      "How you helped them",
    ],
    end: "...and explain how this experience made you feel.",
    vocab: ["pivotal moment", "selfless act", "mutual support", "sense of accomplishment"],
    structure: "Set the scene → Describe the problem → Explain your actions → Reflect on impact",
  },
  {
    topic: "Describe a place you would like to visit",
    bullets: [
      "Where the place is",
      "Why you want to visit it",
      "What you would do there",
    ],
    end: "...and explain why this particular place appeals to you.",
    vocab: ["breathtaking scenery", "rich cultural heritage", "off the beaten path", "bucket list destination"],
    structure: "Introduce the place → Give context/reason → Describe plans → Express enthusiasm",
  },
];

const BAND7_TIPS = [
  {
    num: "01",
    title: "Extend Your Answers",
    desc: "Never give one-word or single-sentence answers. Use the PEEL structure: Point → Explain → Example → Link back.",
    icon: ArrowRight,
  },
  {
    num: "02",
    title: "Use Topic Vocabulary",
    desc: "Learn 10–15 topic-specific words per common subject (technology, environment, education). Use them naturally — not robotically.",
    icon: BookOpen,
  },
  {
    num: "03",
    title: "Master Discourse Markers",
    desc: "Use phrases like \"Having said that\", \"What I find particularly interesting is\", and \"On reflection\" to sound more academic and fluent.",
    icon: Volume2,
  },
  {
    num: "04",
    title: "Practice Thinking Out Loud",
    desc: "If you need time to think, fill the silence: \"That's an interesting question, let me think about that for a moment...\" — this shows fluency.",
    icon: Mic,
  },
  {
    num: "05",
    title: "Prepare Cue Card Structures",
    desc: "Have a mental template: Setting → Background → Main event → Feelings → Lessons. Adapt it to any cue card topic in your 1-minute prep time.",
    icon: Target,
  },
  {
    num: "06",
    title: "Record & Review Yourself",
    desc: "Record a 2-minute answer on any topic and play it back. Listen for pace, pronunciation clarity, unnecessary fillers, and vocabulary range.",
    icon: Star,
  },
];

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

interface SpeakingSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  isAvailable: boolean;
}

// ──────────────────────────────────────────────────────────
// Helper: generate 6-char booking reference
// ──────────────────────────────────────────────────────────
function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "SPK-";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Format time from 24h "HH:MM" to "10:00 AM"
function fmt12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// Format date "YYYY-MM-DD" to "Saturday, 6 Sep 2026"
function fmtDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// WhatsApp instructor number (from footer)
const INSTRUCTOR_WHATSAPP = "918178055015";

// ──────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────

export default function SpeakingBookingPage() {
  const { user } = useAuth();
  const bookingRef = useRef<HTMLElement>(null);

  // Starter content tab
  const [activeContentTab, setActiveContentTab] = useState<"format" | "criteria" | "cuecards" | "tips">("format");
  const [activeCueCard, setActiveCueCard] = useState(0);
  const [showStructure, setShowStructure] = useState(false);

  // Booking wizard
  const [step, setStep] = useState(1);
  const [slots, setSlots] = useState<SpeakingSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<SpeakingSlot | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("7.0");
  const [currentLevel, setCurrentLevel] = useState("intermediate");
  const [topicFocus, setTopicFocus] = useState("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingRefId, setBookingRefId] = useState("");

  // Auto-fill logged-in user fields
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      // Fetch phone from Firestore users doc
      const fetchPhone = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.phoneNumber) setPhone(data.phoneNumber);
            if (data.targetBand) setTargetBand(data.targetBand);
          }
        } catch {
          // ignore
        }
      };
      fetchPhone();
    }
  }, [user]);

  // Fetch available slots from Firestore
  useEffect(() => {
    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const today = new Date().toISOString().split("T")[0];
        let snap;
        try {
          const q = query(
            collection(db, "speakingSlots"),
            where("isAvailable", "==", true),
            where("date", ">=", today),
            orderBy("date", "asc"),
            orderBy("time", "asc")
          );
          snap = await getDocs(q);
        } catch (idxErr) {
          console.warn("Firestore composite index building/missing, using fallback client filter", idxErr);
          const simpleQ = query(
            collection(db, "speakingSlots"),
            where("isAvailable", "==", true)
          );
          snap = await getDocs(simpleQ);
        }

        const list: SpeakingSlot[] = snap.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<SpeakingSlot, "id">),
          }))
          .filter((slot) => slot.date >= today)
          .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

        setSlots(list);
      } catch (err) {
        console.error("Error fetching speaking slots:", err);
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, []);

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, SpeakingSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});
  const availableDates = Object.keys(slotsByDate).sort();

  const handleSubmitBooking = async () => {
    if (!selectedSlot) return;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setSubmitError("Please fill in your name, email, and phone number.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    try {
      const refId = generateRef();
      const bookingData: Record<string, any> = {
        referenceId: refId,
        slotId: selectedSlot.id,
        slotDate: selectedSlot.date,
        slotTime: selectedSlot.time,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        targetBand,
        currentLevel,
        topicFocus: topicFocus.trim(),
        uid: user?.uid || null,
        status: "confirmed",
        meetingLink: `https://meet.jit.si/IELTS7-Speaking-${refId}`,
        feedback: "",
        estimatedBand: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Create booking
      await addDoc(collection(db, "speakingBookings"), bookingData);

      // Mark slot as taken
      await updateDoc(doc(db, "speakingSlots", selectedSlot.id), {
        isAvailable: false,
        bookedBy: user?.uid || email.trim(),
        updatedAt: serverTimestamp(),
      });

      // Send email alert asynchronously via Web3Forms
      sendSpeakingEmail({
        type: "new_booking",
        referenceId: refId,
        candidateName: name.trim(),
        candidateEmail: email.trim(),
        candidatePhone: phone.trim(),
        slotDate: selectedSlot.date,
        slotTime: selectedSlot.time,
        targetBand,
        meetingLink: `https://meet.jit.si/IELTS7-Speaking-${refId}`,
      }).catch(() => {});

      setBookingRefId(refId);
      setStep(3);
    } catch (err: any) {
      console.error("Booking error:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I just booked a Free IELTS Speaking Practice session.\n\nBooking Ref: ${bookingRefId}\nDate: ${selectedSlot ? fmtDate(selectedSlot.date) : ""}\nTime: ${selectedSlot ? fmt12h(selectedSlot.time) : ""}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nLooking forward to the session!`
  );

  useGSAP(() => {
    gsap.from(".hero-stat", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.4,
    });
  });

  return (
    <main className="bg-[#faf9f5] min-h-screen font-inter relative overflow-x-hidden" style={{ color: "#1a3300" }}>
      <AmbientBackground variant="cream" />

      {/* ── HERO ── */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="relative bg-[#1a3300] text-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl overflow-hidden">
            {/* Grid watermark */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            {/* Glow blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#cb5521]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-highlighter-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-highlighter-yellow text-[11px] font-mono font-bold uppercase tracking-wider mb-6">
                <Mic className="w-3.5 h-3.5" />
                <span>100% Free Service</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-bricolage text-white leading-tight mb-4">
                Free Live 1-on-1<br />
                <span className="text-highlighter-yellow">IELTS Speaking</span> Practice
              </h1>
              <p className="text-white/75 text-base sm:text-lg font-inter leading-relaxed mb-8 max-w-2xl">
                Book a personalised speaking session with our expert IELTS examiner. Get real-time feedback, structured guidance, and the confidence to score Band 7+.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Star, label: "Expert Examiner Feedback" },
                  { icon: Clock, label: "30-Minute Sessions" },
                  { icon: Target, label: "Band 7+ Strategy" },
                  { icon: CheckCircle2, label: "No Payment Required" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="hero-stat flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-sm text-white/90">
                    <Icon className="w-4 h-4 text-highlighter-yellow" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-highlighter-yellow text-forest-ink font-bold hover:bg-highlighter-yellow/90 px-8 py-3 h-auto text-sm rounded-xl shadow-lg cursor-pointer"
              >
                Book Your Free Session
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STARTER CONTENT HUB ── */}
      <section className="py-16 container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb5521]/10 border border-[#cb5521]/20 text-[#cb5521] text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3 h-3" />
            Preparation Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-forest-ink mb-3">
            Master the IELTS Speaking Test
          </h2>
          <p className="text-forest-ink/60 text-sm max-w-xl mx-auto">
            Everything you need to know before your speaking session — from test structure to Band 7+ strategies.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-forest-ink/5 rounded-2xl border border-forest-ink/10 mb-8 overflow-x-auto">
          {[
            { key: "format", label: "Test Format", icon: Clock },
            { key: "criteria", label: "Marking Criteria", icon: Award },
            { key: "cuecards", label: "Sample Cue Cards", icon: BookOpen },
            { key: "tips", label: "Band 7+ Tips", icon: Sparkles },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveContentTab(key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold font-inter transition-all whitespace-nowrap cursor-pointer ${
                activeContentTab === key
                  ? "bg-forest-ink text-white shadow-sm"
                  : "text-forest-ink/60 hover:text-forest-ink hover:bg-forest-ink/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeContentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* TEST FORMAT */}
            {activeContentTab === "format" && (
              <div className="grid sm:grid-cols-3 gap-5">
                {TEST_PARTS.map((part, i) => {
                  const Icon = part.icon;
                  return (
                    <div key={i} className={`relative bg-white rounded-3xl border ${part.color} p-6 shadow-sm overflow-hidden`}>
                      <div className={`w-10 h-10 rounded-xl ${part.color} flex items-center justify-center mb-4`}>
                        <Icon className={`w-5 h-5 ${part.iconColor}`} />
                      </div>
                      <div className="text-[10px] font-mono font-bold text-forest-ink/50 uppercase tracking-wider mb-1">{part.part}</div>
                      <h3 className="text-base font-bold font-bricolage text-forest-ink mb-1">{part.title}</h3>
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-forest-ink/60 bg-forest-ink/5 px-2 py-0.5 rounded-full mb-3">
                        <Clock className="w-3 h-3" />
                        {part.duration}
                      </div>
                      <p className="text-xs text-forest-ink/70 leading-relaxed mb-4">{part.description}</p>
                      <div className="space-y-1.5">
                        {part.tips.map((tip, j) => (
                          <div key={j} className="flex items-start gap-2 text-[11px] text-forest-ink/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* MARKING CRITERIA */}
            {activeContentTab === "criteria" && (
              <div className="grid sm:grid-cols-2 gap-5">
                {CRITERIA.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div key={i} className={`bg-gradient-to-br ${c.color} border rounded-3xl p-6`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Icon className="w-4 h-4 text-forest-ink" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold text-forest-ink/40 uppercase tracking-wider">{c.code}</div>
                          <div className="text-sm font-bold font-bricolage text-forest-ink">{c.name}</div>
                        </div>
                        <div className="ml-auto inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-amber-700">
                          <Star className="w-3 h-3" />
                          Band 7
                        </div>
                      </div>
                      <p className="text-xs text-forest-ink/80 leading-relaxed bg-white/60 rounded-xl p-3 mb-4 italic">
                        &ldquo;{c.band7}&rdquo;
                      </p>
                      <div className="space-y-1.5">
                        {c.tips.map((tip, j) => (
                          <div key={j} className="flex items-center gap-2 text-[11px] text-forest-ink/70">
                            <ChevronRight className="w-3 h-3 text-forest-ink/40 shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CUE CARDS */}
            {activeContentTab === "cuecards" && (
              <div className="space-y-5">
                {/* Card selector */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {CUE_CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveCueCard(i); setShowStructure(false); }}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeCueCard === i
                          ? "bg-[#cb5521] text-white"
                          : "bg-white border border-forest-ink/15 text-forest-ink/70 hover:border-forest-ink/30"
                      }`}
                    >
                      Cue Card {i + 1}
                    </button>
                  ))}
                </div>

                {/* Active cue card */}
                <div className="bg-white border-2 border-[#cb5521]/20 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-[#cb5521] px-6 py-4">
                    <div className="text-white/70 text-[10px] font-mono uppercase tracking-wider mb-1">Part 2 — Cue Card</div>
                    <div className="text-white font-bold font-bricolage text-lg">{CUE_CARDS[activeCueCard].topic}</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-forest-ink/40 uppercase tracking-wider mb-2">You should say:</div>
                      <ul className="space-y-2">
                        {CUE_CARDS[activeCueCard].bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-forest-ink/80">
                            <span className="w-5 h-5 rounded-full bg-[#cb5521]/10 text-[#cb5521] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 text-sm text-forest-ink/80 italic border-t border-forest-ink/10 pt-3">
                        {CUE_CARDS[activeCueCard].end}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="text-[10px] font-mono text-forest-ink/50 uppercase tracking-wider w-full mb-1">Band 7+ Vocabulary</div>
                      {CUE_CARDS[activeCueCard].vocab.map((w) => (
                        <span key={w} className="px-2.5 py-1 bg-highlighter-yellow/30 border border-highlighter-yellow/50 rounded-lg text-[11px] font-semibold text-forest-ink">
                          {w}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowStructure(!showStructure)}
                      className="w-full flex items-center justify-between p-3 bg-forest-ink/5 rounded-xl border border-forest-ink/10 text-xs font-semibold text-forest-ink cursor-pointer hover:bg-forest-ink/10 transition-colors"
                    >
                      <span>View Model Answer Structure</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${showStructure ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showStructure && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-forest-ink/5 rounded-xl p-4 text-xs text-forest-ink/80 font-mono leading-relaxed">
                            {CUE_CARDS[activeCueCard].structure}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* BAND 7+ TIPS */}
            {activeContentTab === "tips" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BAND7_TIPS.map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <div key={i} className="bg-white rounded-3xl border border-forest-ink/10 p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-[11px] font-mono font-bold text-forest-ink/30">{tip.num}</span>
                        <div className="w-8 h-8 bg-highlighter-yellow/30 rounded-xl flex items-center justify-center">
                          <Icon className="w-4 h-4 text-amber-700" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold font-bricolage text-forest-ink mb-2">{tip.title}</h4>
                      <p className="text-xs text-forest-ink/65 leading-relaxed">{tip.desc}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── BOOKING WIZARD ── */}
      <section
        ref={bookingRef as React.RefObject<HTMLElement>}
        className="py-16 bg-forest-ink/[0.02] border-t border-forest-ink/10"
        id="booking"
      >
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb5521]/10 border border-[#cb5521]/20 text-[#cb5521] text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3 h-3" />
              Book a Session
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-bricolage text-forest-ink mb-3">
              Reserve Your Free Speaking Slot
            </h2>
            <p className="text-forest-ink/60 text-sm">
              Select a date and time, fill in your details, and you&apos;re done — completely free.
            </p>
          </div>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === s
                      ? "bg-forest-ink text-white shadow-md"
                      : step > s
                      ? "bg-emerald-500 text-white"
                      : "bg-forest-ink/10 text-forest-ink/40"
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className={`text-xs font-medium ${step === s ? "text-forest-ink" : "text-forest-ink/40"}`}>
                    {s === 1 ? "Select Slot" : "Your Details"}
                  </span>
                  {s < 2 && <ChevronRight className="w-4 h-4 text-forest-ink/20" />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: SLOT SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-forest-ink/10 shadow-sm p-6 sm:p-8"
              >
                <h3 className="text-base font-bold font-bricolage text-forest-ink mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#cb5521]" />
                  Choose a Date & Time
                </h3>

                {slotsLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-7 h-7 animate-spin text-forest-ink/40" />
                    <span className="ml-3 text-sm text-forest-ink/60">Loading available slots...</span>
                  </div>
                ) : availableDates.length === 0 ? (
                  <div className="text-center py-16">
                    <Calendar className="w-10 h-10 text-forest-ink/20 mx-auto mb-3" />
                    <p className="text-sm text-forest-ink/60 mb-2">No slots available right now.</p>
                    <p className="text-xs text-forest-ink/40">New slots are added regularly. Please check back soon or contact us on WhatsApp.</p>
                    <a
                      href={`https://wa.me/${INSTRUCTOR_WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to book a free IELTS speaking practice session. Could you please share available dates?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-emerald-500 text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Ask on WhatsApp
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Date selector */}
                    <div>
                      <div className="text-[10px] font-mono font-bold text-forest-ink/40 uppercase tracking-wider mb-3">Available Dates</div>
                      <div className="flex flex-wrap gap-2">
                        {availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              selectedDate === date
                                ? "bg-forest-ink text-white border-forest-ink shadow-sm"
                                : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/40"
                            }`}
                          >
                            <span className="block font-bricolage">{fmtDate(date)}</span>
                            <span className="text-[10px] font-mono opacity-70">{slotsByDate[date].length} slot{slotsByDate[date].length > 1 ? "s" : ""}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time slots */}
                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="text-[10px] font-mono font-bold text-forest-ink/40 uppercase tracking-wider mb-3">
                          Available Times — {fmtDate(selectedDate)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {slotsByDate[selectedDate].map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                selectedSlot?.id === slot.id
                                  ? "bg-[#cb5521] text-white border-[#cb5521] shadow-sm"
                                  : "bg-white text-forest-ink border-forest-ink/15 hover:border-[#cb5521]/40"
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              {fmt12h(slot.time)}
                              <span className="text-[10px] opacity-70">({slot.duration} min)</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedSlot && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <div>
                            <div className="text-sm font-bold text-emerald-900">{fmtDate(selectedSlot.date)}</div>
                            <div className="text-xs text-emerald-700">{fmt12h(selectedSlot.time)} — {selectedSlot.duration} minutes</div>
                          </div>
                        </div>
                        <Button
                          onClick={() => setStep(2)}
                          className="bg-forest-ink text-white text-xs font-bold h-9 px-4 rounded-xl cursor-pointer"
                        >
                          Continue
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: CANDIDATE DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-forest-ink/10 shadow-sm p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-bricolage text-forest-ink flex items-center gap-2">
                    <User className="w-5 h-5 text-[#cb5521]" />
                    Your Details
                  </h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-forest-ink/50 hover:text-forest-ink cursor-pointer underline"
                  >
                    Change slot
                  </button>
                </div>

                {/* Selected slot summary */}
                {selectedSlot && (
                  <div className="flex items-center gap-3 p-3 bg-forest-ink/5 rounded-xl border border-forest-ink/10 text-xs">
                    <Calendar className="w-4 h-4 text-forest-ink/50 shrink-0" />
                    <span className="font-semibold text-forest-ink">{fmtDate(selectedSlot.date)}, {fmt12h(selectedSlot.time)}</span>
                    <span className="text-forest-ink/50">— {selectedSlot.duration} min</span>
                  </div>
                )}

                {submitError && (
                  <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="booking-name" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                      Full Name <span className="text-[#cb5521]">*</span>
                    </Label>
                    <div className="relative">
                      <User className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <Input
                        id="booking-name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-11 border-forest-ink/20 focus-visible:border-forest-ink text-sm rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="booking-email" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                      Email <span className="text-[#cb5521]">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <Input
                        id="booking-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 border-forest-ink/20 focus-visible:border-forest-ink text-sm rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="booking-phone" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                    WhatsApp Number <span className="text-[#cb5521]">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      id="booking-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-11 border-forest-ink/20 focus-visible:border-forest-ink text-sm rounded-xl"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-forest-ink/50">Your meeting link will be shared on this number before the session.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="booking-band" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                      Target Band Score
                    </Label>
                    <select
                      id="booking-band"
                      value={targetBand}
                      onChange={(e) => setTargetBand(e.target.value)}
                      className="w-full h-11 px-3 bg-white border border-forest-ink/20 focus:border-forest-ink text-sm rounded-xl font-inter text-forest-ink"
                    >
                      {["6.0", "6.5", "7.0", "7.5", "8.0", "8.5+"].map((b) => (
                        <option key={b} value={b}>Band {b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                      Current Level
                    </Label>
                    <div className="flex gap-2">
                      {["beginner", "intermediate", "advanced"].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setCurrentLevel(l)}
                          className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer capitalize ${
                            currentLevel === l
                              ? "bg-forest-ink text-white border-forest-ink"
                              : "bg-white text-forest-ink/70 border-forest-ink/15 hover:border-forest-ink/40"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="booking-focus" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                    Focus Areas / Notes <span className="text-forest-ink/40 font-normal normal-case">(optional)</span>
                  </Label>
                  <textarea
                    id="booking-focus"
                    value={topicFocus}
                    onChange={(e) => setTopicFocus(e.target.value)}
                    placeholder="e.g. Part 2 cue cards, improving fluency, pronunciation, specific topics you want to practice..."
                    rows={3}
                    className="w-full px-4 py-3 border border-forest-ink/20 focus:border-forest-ink rounded-xl text-sm font-inter text-forest-ink placeholder:text-forest-ink/40 focus:outline-none resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmitBooking}
                  disabled={submitting}
                  className="w-full h-12 bg-forest-ink text-white font-bold text-sm rounded-xl cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Booking Session...
                    </>
                  ) : (
                    <>
                      Confirm Free Booking
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-center text-xs text-forest-ink/50">
                    <Link href="/login?redirect=/speaking-booking" className="text-forest-ink font-semibold underline">
                      Sign in
                    </Link>
                    {" "}to save your booking to your profile dashboard.
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 3: CONFIRMATION */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <div className="bg-white rounded-3xl border border-forest-ink/10 shadow-xl p-8 sm:p-10 space-y-6">
                  {/* Success icon */}
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold font-bricolage text-forest-ink mb-1">
                      You&apos;re Booked! 🎉
                    </h2>
                    <p className="text-sm text-forest-ink/60">Your free speaking session has been reserved. Our team will confirm it shortly.</p>
                  </div>

                  {/* Booking details card */}
                  <div className="bg-[#1a3300] text-white rounded-2xl p-5 text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">Booking Reference</span>
                      <span className="text-highlighter-yellow font-mono font-bold text-lg">{bookingRefId}</span>
                    </div>
                    {selectedSlot && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-white/50 shrink-0" />
                          <span className="text-white/80">{fmtDate(selectedSlot.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-white/50 shrink-0" />
                          <span className="text-white/80">{fmt12h(selectedSlot.time)} — {selectedSlot.duration} minutes</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-white/50 shrink-0" />
                      <span className="text-white/80">{name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-white/50 shrink-0" />
                      <span className="text-white/80">{phone}</span>
                    </div>
                  </div>

                  {/* Next steps */}
                  <div className="text-left bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      What happens next?
                    </div>
                    {[
                      "You'll receive a WhatsApp confirmation from our team.",
                      "A Google Meet link will be shared before your session.",
                      "You'll get a detailed feedback report after the session.",
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-amber-900">
                        <span className="w-4 h-4 bg-amber-200 text-amber-800 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {s}
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/918178055015?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Send WhatsApp Confirmation
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  {/* Prompt to sign up if guest */}
                  {!user && (
                    <div className="text-center text-xs text-forest-ink/60 bg-forest-ink/5 rounded-xl p-4">
                      <p className="mb-2">Create a free account to track your session status and meeting link.</p>
                      <Link
                        href={`/signup?redirect=/profile`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-ink text-white text-xs font-bold rounded-xl hover:bg-forest-ink/90 transition-colors"
                      >
                        Create Free Account
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {user && (
                    <Link
                      href="/profile"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-forest-ink/5 hover:bg-forest-ink/10 text-forest-ink text-sm font-semibold rounded-xl transition-colors"
                    >
                      View in My Profile
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
