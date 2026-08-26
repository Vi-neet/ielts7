import { TestContent } from "@/lib/types";
import { VirtualQuestionContent } from "@/lib/types/testEngine";

/**
 * Returns fallback TestContent for a listening test ID if Firestore is unreachable.
 * Does NOT return fake audio URLs; passages is left empty if no real audio URL is retrieved.
 */
export function getListeningTestContent(id: string): TestContent {
  return {
    passages: "",
    questions: "",
    answers: DEFAULT_LISTENING_ANSWERS,
  };
}

/**
 * Generates 40 structured listening questions divided into standard IELTS Sections:
 * Section 1 (Q1-10): Form & Note Completion
 * Section 2 (Q11-20): Multiple Choice & Matching
 * Section 3 (Q21-30): Academic Discussion & Notes
 * Section 4 (Q31-40): Monologue & Lecture Summary
 */
export function generateListeningQuestions(
  testId: string,
  testTitle: string
): Record<number, VirtualQuestionContent> {
  const questions: Record<number, VirtualQuestionContent> = {};

  // Section 1: Questions 1-10 (Form & Note Completion)
  for (let q = 1; q <= 10; q++) {
    const Prompts: Record<number, { before: string; after: string; cell: string }> = {
      1: { before: "Name of customer: Sarah", after: "", cell: "Contact Phone Number" },
      2: { before: "Date of arrival: 14th", after: "", cell: "Arrival Month" },
      3: { before: "Room type requested:", after: "suite with sea view", cell: "Accommodation Choice" },
      4: { before: "Number of guests:", after: "adults", cell: "Party Size" },
      5: { before: "Payment method:", after: "card", cell: "Payment Details" },
      6: { before: "Special requirements: quiet room near the", after: "", cell: "Location Preference" },
      7: { before: "Breakfast preference:", after: "breakfast included", cell: "Meal Options" },
      8: { before: "Airport transfer time:", after: "pm", cell: "Transport Schedule" },
      9: { before: "Total estimated deposit: $", after: "", cell: "Booking Fee" },
      10: { before: "Booking reference code:", after: "7PLUS", cell: "Confirmation Number" },
    };
    const info = Prompts[q] || { before: `Section 1 details for Item ${q}:`, after: "", cell: `Note ${q}` };

    questions[q] = {
      questionType: "notes_completion",
      groupId: "g_1_10",
      extractionStatus: "extracted",
      promptText: `${info.before} ______ ${info.after}`,
      sentenceBefore: info.before,
      sentenceAfter: info.after,
      groupPrompt: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
      contextHeader: `Section 1 — ${info.cell}`,
    };
  }

  // Section 2: Questions 11-20 (Multiple Choice & Matching)
  for (let q = 11; q <= 20; q++) {
    if (q <= 15) {
      questions[q] = {
        questionType: "multiple_choice_single",
        groupId: "g_11_15",
        extractionStatus: "extracted",
        promptText: `What is the main reason for the recent changes to facility #${q - 10}?`,
        groupPrompt: "Choose the correct letter, A, B, or C.",
        options: [
          { value: "A", label: "A — To improve visitor safety" },
          { value: "B", label: "B — To increase overall capacity" },
          { value: "C", label: "C — To reduce maintenance costs" },
        ],
        contextHeader: "Section 2 — Visitor Center Facilities",
      };
    } else {
      questions[q] = {
        questionType: "matching_features",
        groupId: "g_16_20",
        extractionStatus: "extracted",
        promptText: `Match Event item #${q} with its corresponding location:`,
        groupPrompt: "Which location is recommended for each activity below? Write the correct letter, A-E.",
        options: [
          { value: "A", label: "A — Main Conference Hall" },
          { value: "B", label: "B — Outdoor Pavilion" },
          { value: "C", label: "C — Riverside Garden" },
          { value: "D", label: "D — East Wing Auditorium" },
          { value: "E", label: "E — Central Atrium" },
        ],
        contextHeader: "Section 2 — Event Map & Locations",
      };
    }
  }

  // Section 3: Questions 21-30 (Academic Discussion)
  for (let q = 21; q <= 30; q++) {
    if (q <= 25) {
      const Topics: Record<number, string> = {
        21: "What key finding surprised both students during their initial research?",
        22: "Why did the tutor suggest modifying the survey methodology?",
        23: "Which aspect of the project requires additional data collection?",
        24: "How do the students plan to analyze the survey responses?",
        25: "What is the deadline for submitting the final group draft?",
      };
      questions[q] = {
        questionType: "multiple_choice_single",
        groupId: "g_21_25",
        extractionStatus: "extracted",
        promptText: Topics[q] || `Research Question ${q}:`,
        groupPrompt: "Choose the correct letter, A, B, or C.",
        options: [
          { value: "A", label: "A — The sample size was too small" },
          { value: "B", label: "B — The results contradicted previous studies" },
          { value: "C", label: "C — The response rate was higher than expected" },
        ],
        contextHeader: "Section 3 — Student Research Project",
      };
    } else {
      const Tasks: Record<number, string> = {
        26: "Literature review section",
        27: "Statistical chart creation",
        28: "Field survey distribution",
        29: "Audio interview transcription",
        30: "Final slide deck presentation",
      };
      questions[q] = {
        questionType: "matching_features",
        groupId: "g_26_30",
        extractionStatus: "extracted",
        promptText: `Who will take primary responsibility for the ${Tasks[q] || `task #${q}`}?`,
        groupPrompt: "Match each task with the person responsible. Write the correct letter, A, B, or C.",
        options: [
          { value: "A", label: "A — Jack only" },
          { value: "B", label: "B — Emily only" },
          { value: "C", label: "C — Both Jack and Emily" },
        ],
        contextHeader: "Section 3 — Task Division",
      };
    }
  }

  // Section 4: Questions 31-40 (Academic Lecture Summary)
  for (let q = 31; q <= 40; q++) {
    const LecturePrompts: Record<number, { before: string; after: string; topic: string }> = {
      31: { before: "Early urban development relied heavily on nearby", after: "supplies.", topic: "Historical Context" },
      32: { before: "The primary cause of soil erosion was identified as intensive", after: "", topic: "Environmental Factors" },
      33: { before: "Researchers observed a dramatic increase in local", after: "species.", topic: "Biodiversity Trends" },
      34: { before: "Modern building designs incorporate advanced", after: "insulation.", topic: "Architectural Innovations" },
      35: { before: "Industrial waste regulations were first enacted in the year", after: "", topic: "Policy Timeline" },
      36: { before: "The key energy source for remote monitoring stations is", after: "power.", topic: "Energy Systems" },
      37: { before: "Communities reported a significant improvement in overall", after: "health.", topic: "Social Impact" },
      38: { before: "Future studies will focus on long-term climate", after: "models.", topic: "Research Outlook" },
      39: { before: "Funding for the next phase was granted by a national", after: "foundation.", topic: "Project Sponsorship" },
      40: { before: "The final recommendation calls for stricter public", after: "guidelines.", topic: "Conclusion" },
    };
    const lec = LecturePrompts[q] || { before: `Lecture Note Item ${q}:`, after: "", topic: `Lecture Point ${q}` };

    questions[q] = {
      questionType: "notes_completion",
      groupId: "g_31_40",
      extractionStatus: "extracted",
      promptText: `${lec.before} ______ ${lec.after}`,
      sentenceBefore: lec.before,
      sentenceAfter: lec.after,
      groupPrompt: "Complete the lecture notes below. Write ONE WORD ONLY for each answer.",
      contextHeader: `Section 4 — ${lec.topic}`,
    };
  }

  return questions;
}

/** Default Answer Key for Listening Tests */
export const DEFAULT_LISTENING_ANSWERS: Record<number, string> = {
  1: "0412345678",
  2: "October",
  3: "Deluxe",
  4: "2",
  5: "Credit",
  6: "garden",
  7: "Continental",
  8: "3:30",
  9: "150",
  10: "B",
  11: "A",
  12: "B",
  13: "C",
  14: "A",
  15: "C",
  16: "B",
  17: "D",
  18: "A",
  19: "C",
  20: "E",
  21: "B",
  22: "A",
  23: "C",
  24: "B",
  25: "A",
  26: "B",
  27: "A",
  28: "C",
  29: "A",
  30: "C",
  31: "water",
  32: "farming",
  33: "native",
  34: "thermal",
  35: "1995",
  36: "solar",
  37: "public",
  38: "prediction",
  39: "science",
  40: "safety",
};
