"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  Target,
  Globe,
  Calendar,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  UserCheck,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 8;

export default function OnboardingModal() {
  const { user, loading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDoc, setLoadingDoc] = useState(true);

  // Wizard Step State (1-indexed: 1 to 7)
  const [step, setStep] = useState(1);

  // Form states
  const [gender, setGender] = useState("");
  const [targetModule, setTargetModule] = useState("academic");
  const [targetBand, setTargetBand] = useState("7.0");
  const [targetDate, setTargetDate] = useState("");
  const [primaryPurpose, setPrimaryPurpose] = useState("university");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (authLoading || !user) {
      setIsOpen(false);
      setLoadingDoc(false);
      return;
    }

    // 1. Check local storage for this specific user ID
    const localPrompted = localStorage.getItem(`ielts7_onboarding_prompted_${user.uid}`);
    if (localPrompted === "true") {
      setIsOpen(false);
      setLoadingDoc(false);
      return;
    }

    // 2. Check Firestore user record to see if they've already been prompted or completed orientation
    const checkOnboardingStatus = async () => {
      try {
        setLoadingDoc(true);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          
          // If already prompted or completed, save flag locally & never prompt again
          if (data.onboardingPrompted || data.onboardingCompleted) {
            localStorage.setItem(`ielts7_onboarding_prompted_${user.uid}`, "true");
            setIsOpen(false);
            return;
          }

          // Pre-populate fields if any exist
          if (data.gender) setGender(data.gender);
          if (data.targetModule) setTargetModule(data.targetModule);
          if (data.targetBand) setTargetBand(data.targetBand);
          if (data.targetDate) setTargetDate(data.targetDate);
          if (data.primaryPurpose) setPrimaryPurpose(data.primaryPurpose);
          if (data.nativeLanguage) setNativeLanguage(data.nativeLanguage);
          if (data.country) setCountry(data.country);
          if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
        }

        // 3. Mark as prompted in Firestore & local storage so it NEVER pops up a second time
        await setDoc(userRef, { onboardingPrompted: true }, { merge: true });
        localStorage.setItem(`ielts7_onboarding_prompted_${user.uid}`, "true");

        // Open modal for the first and only time
        setIsOpen(true);
      } catch (err) {
        console.error("Error checking onboarding status:", err);
      } finally {
        setLoadingDoc(false);
      }
    };

    checkOnboardingStatus();
  }, [user, authLoading]);

  // Skip the ENTIRE orientation setup completely
  const handleSkipSetup = async () => {
    if (user) {
      localStorage.setItem(`ielts7_onboarding_prompted_${user.uid}`, "true");
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { onboardingPrompted: true }, { merge: true });
      } catch {
        // Ignore background write errors
      }
    }
    setIsOpen(false);
  };

  // Skip ONLY the current question and advance to the next step
  const handleSkipQuestion = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setSubmitting(true);
    setErrorMsg("");

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
          onboardingPrompted: true,
          onboardingCompleted: true,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      localStorage.setItem(`ielts7_onboarding_prompted_${user.uid}`, "true");
      setIsOpen(false);
    } catch (err: any) {
      console.error("Failed to save candidate onboarding details:", err);
      setErrorMsg("Failed to save candidate profile. You can try again or skip for now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loadingDoc || !isOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest-ink/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-[#faf9f5] rounded-3xl border border-forest-ink/15 shadow-2xl overflow-hidden text-forest-ink font-inter flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative bg-forest-ink text-white px-6 sm:px-8 py-5 overflow-hidden shrink-0">
            {/* Watermark grid */}
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <button
              onClick={handleSkipSetup}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Skip setup"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 space-y-1 pr-8">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-highlighter-yellow/20 text-highlighter-yellow text-[10px] font-mono font-bold uppercase tracking-wider border border-highlighter-yellow/30">
                  Orientation
                </span>
                <span className="text-[11px] font-mono font-bold text-white/70">
                  STEP {step} OF {TOTAL_STEPS}
                </span>
              </div>
              <h2 className="text-xl font-extrabold font-bricolage tracking-tight text-white mt-1">
                Candidate Profile Setup
              </h2>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden mt-4">
              <motion.div
                className="bg-highlighter-yellow h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Question Body */}
          <div className="p-6 sm:p-8 space-y-6 flex-grow min-h-[260px] flex flex-col justify-between">
            {errorMsg && (
              <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                {errorMsg}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 my-auto"
              >
                {/* STEP 1: Gender / Salutation */}
                {step === 1 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <UserCheck size={18} className="text-forest-ink/70" />
                      What is your gender or preferred salutation?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Helps personalize official IELTS candidate correspondence.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {[
                        { id: "male", label: "Male" },
                        { id: "female", label: "Female" },
                        { id: "non_binary", label: "Non-Binary" },
                        { id: "prefer_not_to_say", label: "Prefer not to say" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setGender(opt.id)}
                          className={`p-3 rounded-2xl border text-xs font-semibold font-inter transition-all cursor-pointer text-left ${
                            gender === opt.id
                              ? "bg-forest-ink text-white border-forest-ink shadow-2xs"
                              : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Target Exam Module */}
                {step === 2 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <GraduationCap size={18} className="text-forest-ink/70" />
                      Which IELTS test module are you preparing for?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      We will customize your practice test recommendations accordingly.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {[
                        {
                          id: "academic",
                          title: "Academic Module",
                          desc: "For university undergraduate/postgraduate admissions & professional registration.",
                        },
                        {
                          id: "general",
                          title: "General Training Module",
                          desc: "For immigration, permanent residency, work visas, & secondary education.",
                        },
                      ].map((mod) => (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setTargetModule(mod.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                            targetModule === mod.id
                              ? "bg-forest-ink text-white border-forest-ink shadow-2xs"
                              : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/30"
                          }`}
                        >
                          <div className="text-xs font-bold font-bricolage">{mod.title}</div>
                          <div
                            className={`text-[11px] leading-relaxed ${
                              targetModule === mod.id ? "text-white/70" : "text-forest-ink/60"
                            }`}
                          >
                            {mod.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Target Band Score Goal */}
                {step === 3 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <Target size={18} className="text-forest-ink/70" />
                      What is your target overall Band Score goal?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Your analytics charts will use this target benchmark.
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      {["6.0", "6.5", "7.0", "7.5", "8.0", "8.5+"].map((band) => (
                        <button
                          key={band}
                          type="button"
                          onClick={() => setTargetBand(band)}
                          className={`p-3.5 rounded-2xl border text-center font-mono font-bold text-sm transition-all cursor-pointer ${
                            targetBand === band
                              ? "bg-forest-ink text-highlighter-yellow border-forest-ink shadow-2xs"
                              : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/30"
                          }`}
                        >
                          Band {band}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Target Test Date */}
                {step === 4 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <Calendar size={18} className="text-forest-ink/70" />
                      When are you planning to take your official exam?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Select your official exam booking date or estimated timeframe.
                    </p>

                    <div className="space-y-3 pt-2">
                      <Input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="h-11 border-forest-ink/20 text-xs rounded-xl font-mono bg-white text-forest-ink"
                      />

                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          { label: "In 1 Month", days: 30 },
                          { label: "In 3 Months", days: 90 },
                          { label: "In 6 Months", days: 180 },
                        ].map((preset) => {
                          const d = new Date();
                          d.setDate(d.getDate() + preset.days);
                          const dateStr = d.toISOString().split("T")[0];
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => setTargetDate(dateStr)}
                              className="px-3 py-1.5 rounded-xl border border-forest-ink/15 bg-white text-forest-ink text-[11px] font-mono hover:bg-forest-ink/5 transition-colors cursor-pointer"
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Primary Goal / Purpose */}
                {step === 5 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <GraduationCap size={18} className="text-forest-ink/70" />
                      What is your primary reason for taking IELTS?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Select the primary objective for your candidate certification.
                    </p>

                    <div className="space-y-2 pt-2">
                      {[
                        { id: "university", label: "Higher Education / University Admission" },
                        { id: "immigration", label: "Immigration / Permanent Residency (PR)" },
                        { id: "professional", label: "Professional Body Registration (Nursing, Medical, Legal)" },
                        { id: "work", label: "Work Visa / Employment Requirements" },
                        { id: "personal", label: "Personal Skill Self-Assessment" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPrimaryPurpose(p.id)}
                          className={`w-full p-3 rounded-2xl border text-xs font-semibold font-inter transition-all cursor-pointer text-left ${
                            primaryPurpose === p.id
                              ? "bg-forest-ink text-white border-forest-ink shadow-2xs"
                              : "bg-white text-forest-ink border-forest-ink/15 hover:border-forest-ink/30"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6: Native Language */}
                {step === 6 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <Globe size={18} className="text-forest-ink/70" />
                      What is your native or first language?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Helps analyze common native language transfer patterns in Writing and Speaking.
                    </p>

                    <div className="space-y-3 pt-2">
                      <Input
                        type="text"
                        placeholder="Type your native language (e.g. Punjabi, Hindi, Urdu...)"
                        value={nativeLanguage}
                        onChange={(e) => setNativeLanguage(e.target.value)}
                        className="h-11 border-forest-ink/20 text-xs rounded-xl bg-white text-forest-ink"
                      />

                      <div className="flex flex-wrap gap-2">
                        {["Punjabi", "Hindi", "Urdu", "Arabic", "Chinese", "Spanish", "French", "Vietnamese"].map(
                          (lang) => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => setNativeLanguage(lang)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-inter transition-colors cursor-pointer ${
                                nativeLanguage === lang
                                  ? "bg-forest-ink text-white border-forest-ink"
                                  : "bg-white text-forest-ink border-forest-ink/15 hover:bg-forest-ink/5"
                              }`}
                            >
                              {lang}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: Country of Origin */}
                {step === 7 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <Globe size={18} className="text-forest-ink/70" />
                      Which country or region are you applying from?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Required for official test center region identification.
                    </p>

                    <div className="space-y-3 pt-2">
                      <Input
                        type="text"
                        placeholder="Type country of origin (e.g. India, Pakistan, Nepal...)"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="h-11 border-forest-ink/20 text-xs rounded-xl bg-white text-forest-ink"
                      />

                      <div className="flex flex-wrap gap-2">
                        {["India", "Pakistan", "Bangladesh", "Nepal", "Vietnam", "China", "Nigeria", "Egypt"].map(
                          (cnt) => (
                            <button
                              key={cnt}
                              type="button"
                              onClick={() => setCountry(cnt)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-inter transition-colors cursor-pointer ${
                                country === cnt
                                  ? "bg-forest-ink text-white border-forest-ink"
                                  : "bg-white text-forest-ink border-forest-ink/15 hover:bg-forest-ink/5"
                              }`}
                            >
                              {cnt}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 8: WhatsApp / Phone Number */}
                {step === 8 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-bold font-bricolage text-forest-ink flex items-center gap-2 text-base">
                      <Phone size={18} className="text-forest-ink/70" />
                      What is your WhatsApp number?
                    </Label>
                    <p className="text-xs text-forest-ink/60">
                      Used to confirm your Speaking Practice session booking and share meeting links.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="relative">
                        <Phone className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <Input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10 h-11 border-forest-ink/20 text-xs rounded-xl bg-white text-forest-ink"
                        />
                      </div>
                      <p className="text-[11px] text-forest-ink/50">
                        Include country code (e.g. +91 for India). This is optional — you can add it later in your profile.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer Navigation Buttons */}
            <div className="pt-4 border-t border-forest-ink/10 flex items-center justify-between gap-3">
              {/* Left Action: Back or Skip Setup */}
              <div className="flex items-center gap-2">
                {step > 1 ? (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    size="sm"
                    className="h-10 px-3.5 rounded-xl border-forest-ink/20 text-forest-ink hover:bg-forest-ink/5 text-xs font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSkipSetup}
                    className="text-xs text-forest-ink/60 hover:text-rose-700 font-semibold py-2 px-3 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Skip setup
                  </button>
                )}
              </div>

              {/* Right Action: Skip Question vs Next / Complete */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSkipQuestion}
                  className="text-xs text-forest-ink/60 hover:text-forest-ink font-semibold py-2 px-3 rounded-xl hover:bg-forest-ink/5 transition-colors cursor-pointer"
                >
                  Skip question
                </button>

                {step < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="forest"
                    size="sm"
                    className="h-10 px-5 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={14} />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    variant="forest"
                    size="sm"
                    className="h-10 px-6 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <span>Complete Setup</span>
                        <CheckCircle2 size={14} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
