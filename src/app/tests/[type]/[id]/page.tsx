import React from "react";
import { notFound } from "next/navigation";
import { TestContent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import TestRunner from "@/components/test/TestRunner";

// Get test data directly without API for server component
async function getTestData(id: string): Promise<TestContent> {
  try {
    // For listening tests, fetch from Firebase
    if (id.includes("_ls_") || id.includes("_listening_")) {
      // Parse the Cambridge book year and test number from the id
      const idParts = id.split("_");
      let year = "";
      let testNumber = "";

      // Extract year from cambridge{year} pattern
      const cambridgeMatch = idParts.find((part) =>
        part.startsWith("cambridge")
      );
      if (cambridgeMatch) {
        year = cambridgeMatch.replace("cambridge", "");
      }

      // Extract test number from test{number} pattern
      const testMatch = idParts.find((part) => part.startsWith("test"));
      if (testMatch) {
        testNumber = testMatch.replace("test", "");
      }

      if (!year || !testNumber) {
        throw new Error(`Invalid listening test id format: ${id}`);
      }

      // Fetch the listening test from Firebase
      const type = "listening";
      const collectionId = `cambridge_${year}_${type}`;
      const querySnapshot = await getDocs(collection(db, collectionId));

      if (querySnapshot.empty) {
        throw new Error(`No listening tests found for Cambridge ${year}`);
      }

      // We only need one document per collection since all tests are in one document
      const doc = querySnapshot.docs[0];
      const data = doc.data();

      const testKey = `test_${testNumber}`;
      const questionKey = `question_${testNumber}`;
      const answerKey = `answer_${testNumber}`;

      if (!data[testKey] || !data[questionKey]) {
        throw new Error(
          `Test ${testNumber} not found in Cambridge ${year} listening tests`
        );
      }

      // Convert to TestContent format
      return {
        passages: data[testKey], // Audio URL for listening tests
        questions: data[questionKey],
        answers: data[answerKey] || {},
      };
    } // For other test types, load dynamically using the test registry
    const { getTestById } = await import("@/data/tests/testRegistry");

    try {
      // Get test with dynamic import - will only load the required test
      return await getTestById(id);
    } catch (error) {
      throw new Error(
        `Test data for ${id} not found: ${(error as Error).message}`
      );
    }
  } catch (error) {
    console.error(`Failed to get test data for ${id}:`, error);
    throw error;
  }
}

// Format test type to display the full name
function formatTestType(type: string): string {
  const typeMap: Record<string, string> = {
    general_reading: "General Reading",
    academic_reading: "Academic Reading",
    listening: "Listening",
  };

  return typeMap[type] || type.replace(/_/g, " ");
}

// Format test ID to a proper title with expanded abbreviations
function formatTestName(id: string): string {
  // Replace abbreviations with full names
  let formattedName = id
    .replace(/_gr_/g, " General Reading - ")
    .replace(/_ar_/g, " Academic Reading - ")
    .replace(/_ls_/g, " Listening - ")
    .replace(/cambridge/g, "Cambridge ");

  // Capitalize each word
  formattedName = formattedName.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2
  );

  return formattedName;
}

// Main component with properly typed params
export default async function TestPage(params: {
  params: Promise<{ id: string; type: string }>;
}) {
  try {
    // Await params to access properties
    const { id, type } = await params.params;

    // Get the test data directly
    const testData = await getTestData(id);

    // Format the test name for display with expanded abbreviations
    const testName = formatTestName(id);

    return (
      <div className="container mx-auto pt-12 pb-12 px-4 md:px-8 bg-cream-paper min-h-screen">
        {/* Page header with back button */}
        <div className="z-10 pb-6 mb-8 border-b border-pencil-gray/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/tests/${type}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 rounded-full border-pencil-gray/20 bg-white text-forest-ink hover:bg-whisper-gray font-inter shadow-sm cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold font-bricolage text-forest-ink tracking-tight">
                {testName}
              </h1>
            </div>
          </div>
        </div>

        <TestRunner
          testId={id}
          testType={type}
          testName={testName}
          passages={testData.passages}
          questions={testData.questions}
          answerKey={testData.answers || {}}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading test:", error);
    return notFound();
  }
}

// Generate metadata for the page
export async function generateMetadata(params: {
  params: Promise<{ id: string; type: string }>;
}) {
  try {
    const defaultTitle = "IELTS Practice Test | IELTS 7+";
    const defaultDescription =
      "Practice IELTS test with comprehensive materials";

    // Await params to access properties
    const { id, type } = await params.params;

    // Prepare a basic title
    let title = id
      ? id.replace(/_/g, " ").replace(/^(.)/, (match) => match.toUpperCase())
      : defaultTitle;

    // Create a type display name
    let typeDisplay = "";
    if (type === "general_reading") typeDisplay = "General Reading";
    else if (type === "academic_reading") typeDisplay = "Academic Reading";
    else if (type === "listening") typeDisplay = "Listening";
    else typeDisplay = type.replace(/_/g, " ");

    return {
      title: `${title} | IELTS 7+`,
      description: `Practice ${typeDisplay} test from IELTS 7+`,
    };
  } catch (error) {
    return {
      title: "IELTS Practice Test | IELTS 7+",
      description: "Practice IELTS tests with our comprehensive materials",
    };
  }
}
