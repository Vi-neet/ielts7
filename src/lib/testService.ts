import { TestContent, TestMetadata } from "./types";

interface FetchedTest {
  id: string;
  year: string;
  testNumber: number;
  title: string;
  test: string;     // Audio URL for listening tests
  questions: string;
  answers: Record<string, string> | null;
}

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ielts7-48b25";

/**
 * Helper to parse Firestore REST API field values into plain JS values
 */
function parseFirestoreField(field: any): any {
  if (!field) return null;
  if (field.stringValue !== undefined) return field.stringValue;
  if (field.integerValue !== undefined) return parseInt(field.integerValue, 10);
  if (field.doubleValue !== undefined) return parseFloat(field.doubleValue);
  if (field.booleanValue !== undefined) return field.booleanValue;
  if (field.mapValue !== undefined) {
    const res: Record<string, any> = {};
    const fields = field.mapValue?.fields || {};
    for (const key of Object.keys(fields)) {
      res[key] = parseFirestoreField(fields[key]);
    }
    return res;
  }
  if (field.arrayValue !== undefined) {
    const values = field.arrayValue?.values || [];
    return values.map((v: any) => parseFirestoreField(v));
  }
  return null;
}

/**
 * Fetch listening tests from Firebase via REST API:
 * Collection: cambridge_[year]_listening (e.g., cambridge_20_listening)
 * Document: Single document containing all tests for that year
 * Format: {
 *   test_1: "audio_url",
 *   question_1: "HTML content",
 *   answer_1: { "1": "answer", "2": "answer", ... }
 * }
 */
export async function fetchListeningTests(): Promise<FetchedTest[]> {
  try {
    const years = ["20", "19", "18", "17", "16", "15", "14", "13"];
    const allTests: FetchedTest[] = [];

    for (const year of years) {
      const collectionId = `cambridge_${year}_listening`;
      const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collectionId}`;

      try {
        const res = await fetch(url);
        if (!res.ok) continue;

        const data = await res.json();
        const doc = data.documents?.[0];
        if (!doc || !doc.fields) continue;

        const fields = doc.fields;
        for (let i = 1; i <= 4; i++) {
          const testKey = `test_${i}`;
          const questionKey = `question_${i}`;
          const answerKey = `answer_${i}`;

          const audioUrl = parseFirestoreField(fields[testKey]);
          const questions = parseFirestoreField(fields[questionKey]);
          const answers = parseFirestoreField(fields[answerKey]);

          if (audioUrl) {
            allTests.push({
              id: doc.name?.split("/").pop() || `cambridge${year}_ls`,
              year,
              testNumber: i,
              title: `Cambridge ${year} Listening - Test ${i}`,
              test: audioUrl,
              questions: questions || "",
              answers: typeof answers === "object" ? answers : null,
            });
          }
        }
      } catch (innerErr) {
        console.error(`Error fetching ${collectionId} via REST:`, innerErr);
      }
    }

    return allTests.sort((a, b) => {
      if (a.year !== b.year) {
        return parseInt(b.year, 10) - parseInt(a.year, 10);
      }
      return a.testNumber - b.testNumber;
    });
  } catch (err) {
    console.error("Error fetching listening tests:", err);
    throw err;
  }
}

/**
 * Fetch a specific listening test by ID (e.g., cambridge20_ls_test1)
 * Uses Firestore REST API via global fetch for Cloudflare Worker runtime compatibility.
 */
export async function fetchListeningTest(id: string): Promise<TestContent | null> {
  try {
    const match = id.match(/cambridge(\d+)_ls_test(\d+)/);
    if (!match) return null;

    const year = match[1];
    const testNum = parseInt(match[2], 10);

    const collectionId = `cambridge_${year}_listening`;
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collectionId}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Firestore REST API returned ${res.status} for ${collectionId}`);
      return null;
    }

    const data = await res.json();
    const doc = data.documents?.[0];
    if (!doc || !doc.fields) {
      console.warn(`No document or fields found in ${collectionId}`);
      return null;
    }

    const fields = doc.fields;
    const testKey = `test_${testNum}`;
    const questionKey = `question_${testNum}`;
    const answerKey = `answer_${testNum}`;

    const audioUrl = parseFirestoreField(fields[testKey]);
    const questions = parseFirestoreField(fields[questionKey]) || "";
    const answers = parseFirestoreField(fields[answerKey]) || {};

    if (!audioUrl) {
      console.warn(`Audio URL (${testKey}) not found in ${collectionId}`);
      return null;
    }

    return {
      passages: audioUrl,
      questions: questions,
      answers: typeof answers === "object" ? answers : {},
    };

  } catch (err) {
    console.warn(`Firestore REST listening test fetch failed for ${id}:`, (err as any)?.message || err);
    return null;
  }
}

/**
 * Convert fetched tests to TestMetadata format for usage in UI components
 */
export function convertToTestMetadata(tests: FetchedTest[]): TestMetadata[] {
  return tests.map(test => ({
    id: `cambridge${test.year}_ls_test${test.testNumber}`,
    year: test.year,
    testNumber: test.testNumber,
    title: test.title,
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
    estimatedTime: "40 min",
    completions: Math.floor(Math.random() * 3000) + 1000,
  }));
}

