"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Test {
  id: string;
  year: string;
  testNumber: number;
  title: string;
}

export default function TestTypePage() {
  const params = useParams();
  const type = params.type as string;
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCardStyles = () => {
    switch (type) {
      case "general_reading":
        return {
          wrapper: "border-sticky-note-blush/60 bg-sticky-note-blush/10 hover:bg-sticky-note-blush/20",
          shadow: "shadow-sm hover:shadow-md",
        };
      case "listening":
        return {
          wrapper: "border-sticky-note-teal/60 bg-sticky-note-teal/10 hover:bg-sticky-note-teal/20",
          shadow: "shadow-sm hover:shadow-md",
        };
      case "academic_reading":
        return {
          wrapper: "border-sticky-note-mint/60 bg-sticky-note-mint/10 hover:bg-sticky-note-mint/20",
          shadow: "shadow-sm hover:shadow-md",
        };
      default:
        return {
          wrapper: "border-pencil-gray/20 bg-white hover:bg-whisper-gray",
          shadow: "shadow-sm hover:shadow-md",
        };
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      if (!type) return; // Early return clause for missing type

      try {
        // For listening tests, fetch from Firebase
        if (type === "listening") {
          const years = ["19", "18", "17", "16", "15", "14", "13"];
          const allTests: Test[] = [];

          for (const year of years) {
            const collectionId = `cambridge_${year}_${type}`;
            try {
              const querySnapshot = await getDocs(collection(db, collectionId));

              if (!querySnapshot.empty) {
                // We only need one document per collection since all tests are in one document
                const doc = querySnapshot.docs[0];
                const data = doc.data();

                for (let i = 1; i <= 4; i++) {
                  const testKey = `test_${i}`;
                  const questionKey = `question_${i}`;

                  if (data[testKey] && data[questionKey]) {
                    allTests.push({
                      id: `cambridge${year}_ls_test${i}`,
                      year,
                      testNumber: i,
                      title: `Cambridge ${year} ${type.replace(
                        "_",
                        " "
                      )} - Test ${i}`,
                    });
                  }
                }
              }
            } catch (innerErr) {
              console.error(`Error fetching ${collectionId}:`, innerErr);
              // Continue with the next year if one fails
            }
          }

          // Sort tests by year (descending) and then by test number (ascending)
          const sortedTests = allTests.sort((a, b) => {
            if (a.year !== b.year) {
              return parseInt(b.year) - parseInt(a.year);
            }
            return a.testNumber - b.testNumber;
          });

          setTests(sortedTests);
        } else {
          // For other types, fetch from local data
          const { mockTests } = await import("@/data/mockTests");
          setTests(mockTests[type as keyof typeof mockTests] || []);
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching tests:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTests();
  }, [type]);

  const handleTestClick = (test: Test) => {
    router.push(`/tests/${type}/${test.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-cream-paper">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-ink"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  const styles = getCardStyles();

  return (
    <div className="min-h-screen bg-cream-paper pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center mb-10">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 rounded-full border-pencil-gray/20 bg-white text-forest-ink hover:bg-whisper-gray hover:text-forest-ink font-inter shadow-sm"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold ml-6 capitalize text-forest-ink font-bricolage tracking-tight">
            {type?.replace("_", " ")} Tests
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test, index) => (
            <div
              key={index}
              onClick={() => handleTestClick(test)}
              className={`
                p-6 rounded-2xl cursor-pointer
                transform transition-all duration-300
                border ${styles.wrapper}
                hover:-translate-y-1
                ${styles.shadow}
                flex flex-col group
              `}
            >
              <h2 className="text-xl font-bold mb-3 text-forest-ink font-bricolage group-hover:text-forest-ink/80 transition-colors line-clamp-2">{test.title}</h2>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-forest-ink/10">
                <p className="text-forest-ink/60 text-sm font-inter">
                  {type === "listening"
                    ? "Audio available"
                    : "Interactive content"}
                </p>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-pencil-gray/10 shadow-sm group-hover:bg-highlighter-yellow transition-colors">
                  <svg className="w-4 h-4 text-forest-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
