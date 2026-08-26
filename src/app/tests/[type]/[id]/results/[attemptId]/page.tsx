"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getVirtualTestIndex } from "@/lib/data/testMetadataRegistry";
import { getTestById } from "@/data/tests/testRegistry";
import { gradeAttempt, GradeResult } from "@/lib/scoring";
import { VirtualTestIndex } from "@/lib/types/testEngine";
import TestResultsView from "@/components/test/engine/TestResultsView";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import ResultLoadingOverlay from "@/components/test/engine/ResultLoadingOverlay";

export default function TestResultPage() {
  const params = useParams();
  const router = useRouter();

  const type = String(params?.type || "");
  const id = String(params?.id || "");
  const attemptId = String(params?.attemptId || "");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [testIndex, setTestIndex] = useState<VirtualTestIndex | null>(null);
  const [results, setResults] = useState<GradeResult | null>(null);
  const [testName, setTestName] = useState<string>("");
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [passages, setPassages] = useState<React.ReactNode | string | null>(null);

  useEffect(() => {
    if (!id || !attemptId) return;

    async function loadAttemptResults() {
      setLoading(true);
      setError(null);

      try {
        // 1. Get Answer Key & Test Index
        const testData = await getTestById(id);
        const answerKey = testData.answers || {};
        if (testData.passages) {
          setPassages(testData.passages);
        }

        const vIndex = getVirtualTestIndex(id, answerKey);

        // Format test title
        const title = id
          .replace(/_gr_/g, " General Reading — ")
          .replace(/_ar_/g, " Academic Reading — ")
          .replace(/_ls_/g, " Listening — ")
          .replace(/cambridge/g, "Cambridge ")
          .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2);

        setTestName(title);
        setTestIndex(vIndex);

        // 2. Fetch Attempt Data (Try Firestore first, fallback to localStorage)
        let attemptAnswers: Record<number, string> = {};
        let attemptSubmittedAtStr: string | null = null;
        let foundAttempt = false;

        try {
          const docRef = doc(db, "attempts", attemptId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            attemptAnswers = data.answers || {};
            if (data.submittedAt?.seconds) {
              attemptSubmittedAtStr = new Date(
                data.submittedAt.seconds * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            }
            foundAttempt = true;
          }
        } catch (fsErr) {
          console.warn("Firestore fetch error, checking localStorage fallback:", fsErr);
        }

        // Check localStorage fallback if not found in Firestore
        if (!foundAttempt && typeof window !== "undefined") {
          const localStr = localStorage.getItem(`ielts_test_attempt_${attemptId}`);
          if (localStr) {
            try {
              const localData = JSON.parse(localStr);
              attemptAnswers = localData.answers || {};
              if (localData.submittedAt) {
                attemptSubmittedAtStr = new Date(localData.submittedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );
              }
              foundAttempt = true;
            } catch (e) {
              console.error("Failed to parse local attempt storage:", e);
            }
          }
        }

        if (!foundAttempt) {
          throw new Error(`Attempt details for ID '${attemptId}' were not found.`);
        }

        // 3. Grade Attempt
        const graded = gradeAttempt(attemptAnswers, answerKey);
        setResults(graded);
        setSubmittedAt(attemptSubmittedAtStr);
      } catch (err: any) {
        console.error("Failed to load test attempt result:", err);
        setError(err?.message || "Failed to load test results.");
      } finally {
        setLoading(false);
      }
    }

    loadAttemptResults();
  }, [id, attemptId, type]);

  if (loading) {
    return (
      <ResultLoadingOverlay
        title="Loading Performance Results"
        subtitle="Fetching attempt history and computing band scores..."
      />
    );
  }

  if (error || !results || !testIndex) {
    return (
      <div className="min-h-screen bg-cream-paper flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-forest-ink/20 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold font-bricolage text-forest-ink">
            Result Not Found
          </h2>
          <p className="text-xs text-forest-ink/70 leading-relaxed font-inter">
            {error || "We could not find the requested test attempt record."}
          </p>
          <div className="pt-2">
            <Link href={`/tests/${type}/${id}`}>
              <Button variant="forest" className="w-full h-11 rounded-xl font-semibold">
                <ArrowLeft size={16} className="mr-1.5" /> Back to Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TestResultsView
      testId={id}
      testType={type}
      testName={testName}
      testIndex={testIndex}
      results={results}
      submittedAt={submittedAt}
      passages={passages}
    />
  );
}
