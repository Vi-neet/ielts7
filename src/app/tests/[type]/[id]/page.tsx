import React from "react";
import { notFound } from "next/navigation";
import { TestContent } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import TestPageClient from "@/components/test/TestPageClient";

// Get test data directly without API for server component
async function getTestData(id: string): Promise<TestContent> {
  try {
    // For listening tests, fetch from Firebase
    if (id.includes("_ls_") || id.includes("_listening_")) {
      const idParts = id.split("_");
      let year = "";
      let testNumber = "";

      const cambridgeMatch = idParts.find((part) => part.startsWith("cambridge"));
      if (cambridgeMatch) year = cambridgeMatch.replace("cambridge", "");

      const testMatch = idParts.find((part) => part.startsWith("test"));
      if (testMatch) testNumber = testMatch.replace("test", "");

      if (!year || !testNumber) {
        throw new Error(`Invalid listening test id format: ${id}`);
      }

      const type = "listening";
      const collectionId = `cambridge_${year}_${type}`;
      const querySnapshot = await getDocs(collection(db, collectionId));

      if (querySnapshot.empty) {
        throw new Error(`No listening tests found for Cambridge ${year}`);
      }

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

      return {
        passages: data[testKey], // Audio URL for listening tests
        questions: data[questionKey],
        answers: data[answerKey] || {},
      };
    }

    // For Reading tests, load dynamically using the test registry
    const { getTestById } = await import("@/data/tests/testRegistry");
    try {
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

/** Expand abbreviated test ID into a readable name */
function formatTestName(id: string): string {
  let name = id
    .replace(/_gr_/g, " General Reading — ")
    .replace(/_ar_/g, " Academic Reading — ")
    .replace(/_ls_/g, " Listening — ")
    .replace(/cambridge/g, "Cambridge ");

  name = name.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2);
  return name;
}

// Main route — remains a server component for metadata/data fetching
export default async function TestPage(params: {
  params: Promise<{ id: string; type: string }>;
}) {
  try {
    const { id, type } = await params.params;
    const testData = await getTestData(id);
    const testName = formatTestName(id);

    return (
      <TestPageClient
        testId={id}
        testType={type}
        testName={testName}
        testData={testData}
      />
    );
  } catch (error) {
    console.error("Error loading test:", error);
    return notFound();
  }
}

// Metadata
export async function generateMetadata(params: {
  params: Promise<{ id: string; type: string }>;
}) {
  try {
    const { id, type } = await params.params;

    let title = id
      ? id.replace(/_/g, " ").replace(/^(.)/, (m) => m.toUpperCase())
      : "IELTS Practice Test";

    let typeDisplay = "";
    if (type === "general_reading") typeDisplay = "General Reading";
    else if (type === "academic_reading") typeDisplay = "Academic Reading";
    else if (type === "listening") typeDisplay = "Listening";
    else typeDisplay = type.replace(/_/g, " ");

    return {
      title: `${title} | IELTS 7+`,
      description: `Practice ${typeDisplay} test from IELTS 7+`,
    };
  } catch {
    return {
      title: "IELTS Practice Test | IELTS 7+",
      description: "Practice IELTS tests with our comprehensive materials",
    };
  }
}
