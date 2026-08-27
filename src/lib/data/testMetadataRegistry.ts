import {
  VirtualTestIndex,
  VirtualQuestionGroup,
  VirtualQuestion,
  QuestionType,
  VirtualOption,
  VirtualReferenceBox,
} from "../types/testEngine";
import { questionContentRegistry } from "./questionContentRegistry";

/** Default options for common question types */
const TFNG_OPTIONS: VirtualOption[] = [
  { value: "TRUE", label: "TRUE" },
  { value: "FALSE", label: "FALSE" },
  { value: "NOT GIVEN", label: "NOT GIVEN" },
];

const YNNG_OPTIONS: VirtualOption[] = [
  { value: "YES", label: "YES" },
  { value: "NO", label: "NO" },
  { value: "NOT GIVEN", label: "NOT GIVEN" },
];

const MCQ_4_OPTIONS: VirtualOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

const MCQ_5_OPTIONS: VirtualOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
];

const ROMAN_HEADINGS_OPTIONS: VirtualOption[] = [
  { value: "i", label: "i" },
  { value: "ii", label: "ii" },
  { value: "iii", label: "iii" },
  { value: "iv", label: "iv" },
  { value: "v", label: "v" },
  { value: "vi", label: "vi" },
  { value: "vii", label: "vii" },
  { value: "viii", label: "viii" },
  { value: "ix", label: "ix" },
  { value: "x", label: "x" },
];

const LETTER_OPTIONS_AG: VirtualOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
];

/**
 * Returns clean options for a question based on type and answer key value.
 */
/**
 * Returns clean options for a question based on type and answer key value.
 */
function getOptionsForType(
  type: QuestionType,
  answerVal?: string | string[],
  refBoxItems?: { label: string; text?: string }[]
): VirtualOption[] | undefined {
  if (type === "true_false_not_given") return TFNG_OPTIONS;
  if (type === "yes_no_not_given") return YNNG_OPTIONS;
  if (type === "matching_headings") {
    if (refBoxItems && refBoxItems.length > 0) {
      return refBoxItems.map((item) => ({
        value: item.label,
        label: item.label,
        text: item.text ? `${item.label} ${item.text}` : item.label,
      }));
    }
    return ROMAN_HEADINGS_OPTIONS;
  }

  if (
    type === "multiple_choice_single" ||
    type === "multiple_choice_multi" ||
    type === "matching_information" ||
    type === "matching_features" ||
    type === "matching_sentence_endings" ||
    type === "summary_completion_bank"
  ) {
    const val = Array.isArray(answerVal) ? answerVal[0] : answerVal || "";
    if (val === "E" || val === "F" || val === "G") return LETTER_OPTIONS_AG;
    return MCQ_5_OPTIONS;
  }

  return undefined;
}

/**
 * Returns default group instructions text if custom instructions are not specified.
 */
function getDefaultInstruction(type: QuestionType, range: [number, number]): string {
  const [start, end] = range;
  const label = `Questions ${start}-${end}`;

  switch (type) {
    case "true_false_not_given":
      return `${label}: Do the following statements agree with the information given in the reading passage? Write TRUE, FALSE, or NOT GIVEN.`;
    case "yes_no_not_given":
      return `${label}: Do the following statements agree with the claims of the writer? Write YES, NO, or NOT GIVEN.`;
    case "multiple_choice_single":
      return `${label}: Choose the correct letter, A, B, C or D.`;
    case "multiple_choice_multi":
      return `${label}: Choose TWO letters, A-E.`;
    case "matching_headings":
      return `${label}: Choose the correct heading for each paragraph from the list of headings below.`;
    case "matching_information":
      return `${label}: Which paragraph contains the following information? Write the correct letter, A-G.`;
    case "matching_features":
      return `${label}: Match each statement with the correct person/feature below.`;
    case "matching_sentence_endings":
      return `${label}: Complete each sentence with the correct ending below.`;
    case "summary_completion_bank":
      return `${label}: Complete the summary using the list of words/options below.`;
    case "summary_completion_text":
      return `${label}: Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.`;
    case "table_completion":
      return `${label}: Complete the table below. Choose ONE WORD ONLY from the passage for each answer.`;
    case "notes_completion":
      return `${label}: Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.`;
    case "diagram_completion":
      return `${label}: Complete the diagram / flow-chart below. Choose ONE WORD ONLY from the passage.`;
    case "short_answer":
      return `${label}: Answer the questions below. Choose NO MORE THAN TWO WORDS from the passage.`;
    case "sentence_completion":
    default:
      return `${label}: Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.`;
  }
}

/**
 * Infers question type for a range by inspecting the answer key values (Fallback for non-AST tests only).
 */
function inferQuestionTypeFromAnswers(
  start: number,
  end: number,
  answerKey: Record<number, string | string[]>
): QuestionType {
  const ansSample = [];
  for (let q = start; q <= end; q++) {
    const val = answerKey[q];
    if (val) {
      if (Array.isArray(val)) {
        ansSample.push(...val);
      } else {
        ansSample.push(val);
      }
    }
  }

  const sampleStr = ansSample.join(" ").toUpperCase();

  if (sampleStr.includes("TRUE") || sampleStr.includes("FALSE")) {
    return "true_false_not_given";
  }
  if (sampleStr.includes("YES") || sampleStr.includes("NO")) {
    return "yes_no_not_given";
  }
  if (ansSample.some((v) => ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"].includes(String(v).toLowerCase()))) {
    return "matching_headings";
  }
  if (ansSample.some((v) => ["A", "B", "C", "D", "E", "F", "G"].includes(String(v).toUpperCase()) && String(v).length === 1)) {
    return "multiple_choice_single";
  }

  return "sentence_completion";
}

/**
 * Builds a deterministic VirtualTestIndex for any test ID and answer key.
 * Uses questionContentRegistry as the 100% authoritative data source for audited IELTS tests.
 */
export function getVirtualTestIndex(
  testId: string,
  answerKey: Record<number, string | string[]>
): VirtualTestIndex {
  let testRegistry = questionContentRegistry[testId];

  if (!testRegistry && (testId.includes("_ls_") || testId.includes("_listening_"))) {
    const { generateListeningQuestions } = require("@/data/tests/listeningRegistry");
    testRegistry = generateListeningQuestions(testId, testId);
  }

  const groups: VirtualQuestionGroup[] = [];
  const questions: Record<number, VirtualQuestion> = {};

  if (testRegistry) {
    // ── AST-AUTHORITATIVE BRANCH (For 52 audited IELTS Reading tests) ──
    const groupMap = new Map<string, number[]>();
    for (let q = 1; q <= 40; q++) {
      const qdata = testRegistry[q];
      const gId = qdata?.groupId || "unmapped";
      if (!groupMap.has(gId)) {
        groupMap.set(gId, []);
      }
      groupMap.get(gId)!.push(q);
    }

    // Build VirtualQuestionGroup objects from AST groups
    for (const [groupId, qNums] of groupMap.entries()) {
      if (groupId === "unmapped") continue;
      const start = qNums[0];
      const end = qNums[qNums.length - 1];
      const firstQData = testRegistry[start] || {};
      const passage: 1 | 2 | 3 = start <= 14 ? 1 : start <= 27 ? 2 : 3;
      const type = firstQData.questionType || "unknown";
      const isHeadingType = type.includes("heading");

      const group: VirtualQuestionGroup = {
        groupId,
        passageNumber: passage,
        range: [start, end],
        title: `Questions ${start}-${end}`,
        instructions: firstQData.groupPrompt || getDefaultInstruction(type, [start, end]),
        wordLimit: type.includes("completion") || type === "short_answer" ? "Choose ONE WORD ONLY" : undefined,
        type,
        referenceBox: isHeadingType ? undefined : firstQData.referenceBox,
        groupContextText: firstQData.groupPrompt,
      };
      groups.push(group);
    }

    // Build VirtualQuestion objects directly from AST registry
    for (let q = 1; q <= 40; q++) {
      const qdata = testRegistry[q] || {
        questionType: "unknown",
        groupId: "unmapped",
        extractionStatus: "missing",
        promptText: "",
      };

      const type = qdata.questionType || "unknown";
      const isHeadingType = type.includes("heading");
      const qNumsInGroup = groupMap.get(qdata.groupId || "unmapped") || [q];
      const startGroupNum = qNumsInGroup[0];
      const endGroupNum = qNumsInGroup[qNumsInGroup.length - 1];

      const groupRefBox = testRegistry[startGroupNum]?.referenceBox;
      const refBoxItems = qdata.referenceBox?.items || groupRefBox?.items;
      const defaultOptions = getOptionsForType(type, answerKey[q], refBoxItems);

      const isMultiAnswer = type === "multiple_choice_multi";
      const passage: 1 | 2 | 3 = startGroupNum <= 14 ? 1 : startGroupNum <= 27 ? 2 : 3;

      questions[q] = {
        questionNumber: q,
        passageNumber: passage,
        groupId: qdata.groupId || "unmapped",
        type,
        referenceBox: undefined,
        extractionStatus: qdata.extractionStatus || "missing",
        promptText: qdata.promptText || "",
        sentenceBefore: qdata.sentenceBefore,
        sentenceAfter: qdata.sentenceAfter,
        contextHeader: qdata.contextHeader,
        // Notice: referenceBox is attached at Group level to avoid duplicate rendering inside individual question cards
        groupPrompt: qdata.groupPrompt,
        options: (qdata.options && qdata.options.length > 0) ? qdata.options : defaultOptions,
        tableContext: qdata.tableContext,
        notesContext: qdata.notesContext,
        placeholder: !defaultOptions && type !== "unknown" ? `Type answer for Question ${q}...` : undefined,
        multiSelectGroupId: isMultiAnswer ? qdata.groupId : undefined,
        multiSelectQuestionNumbers: isMultiAnswer ? qNumsInGroup : undefined,
        maxSelections: isMultiAnswer ? (endGroupNum - startGroupNum + 1) : undefined,
      };
    }
  } else {
    // ── ISOLATED NON-AST FALLBACK BRANCH (For non-reading / external tests) ──
    const isListeningTest = testId.includes("_ls_") || testId.includes("_listening_");
    const groupRanges: { range: [number, number]; passage: 1 | 2 | 3 }[] = isListeningTest
      ? [
          { range: [1, 10], passage: 1 },
          { range: [11, 20], passage: 2 },
          { range: [21, 30], passage: 3 },
          { range: [31, 40], passage: 3 },
        ]
      : [
          { range: [1, 7], passage: 1 },
          { range: [8, 13], passage: 1 },
          { range: [14, 19], passage: 2 },
          { range: [20, 23], passage: 2 },
          { range: [24, 26], passage: 2 },
          { range: [27, 31], passage: 3 },
          { range: [32, 37], passage: 3 },
          { range: [38, 40], passage: 3 },
        ];

    groupRanges.forEach(({ range, passage }) => {
      const [start, end] = range;
      const groupId = `g_${start}_${end}`;
      const type = inferQuestionTypeFromAnswers(start, end, answerKey);

      const group: VirtualQuestionGroup = {
        groupId,
        passageNumber: passage,
        range,
        title: `Questions ${start}-${end}`,
        instructions: getDefaultInstruction(type, range),
        wordLimit: type.includes("completion") || type === "short_answer" ? "Choose ONE WORD ONLY" : undefined,
        type,
      };
      groups.push(group);

      const isMultiAnswer = type === "multiple_choice_multi";
      const multiRange = isMultiAnswer ? Array.from({ length: end - start + 1 }, (_, i) => start + i) : undefined;

      for (let q = start; q <= end; q++) {
        const qAns = answerKey[q];
        const defaultOptions = getOptionsForType(type, qAns);

        questions[q] = {
          questionNumber: q,
          passageNumber: passage,
          groupId,
          type,
          extractionStatus: "missing",
          promptText: `Question ${q}`,
          options: defaultOptions,
          placeholder: !defaultOptions ? `Type answer for Question ${q}...` : undefined,
          multiSelectGroupId: isMultiAnswer ? groupId : undefined,
          multiSelectQuestionNumbers: multiRange,
          maxSelections: isMultiAnswer ? end - start + 1 : undefined,
        };
      }
    });
  }

  // ── DYNAMIC MULTI-SELECT PAIR POST-PROCESSING ──
  // Automatically detect multi-select question pairs from answerKey (e.g. 17: "A/E", 18: "A/E")
  for (let q = 1; q < 40; q++) {
    const v1 = answerKey[q];
    const v2 = answerKey[q + 1];
    const s1 = (Array.isArray(v1) ? v1[0] : v1 || "").toString().trim().toUpperCase();
    const s2 = (Array.isArray(v2) ? v2[0] : v2 || "").toString().trim().toUpperCase();

    const m1 = s1.match(/^([A-Z])\s*\/\s*([A-Z])$/);
    const m2 = s2.match(/^([A-Z])\s*\/\s*([A-Z])$/);

    if (m1 && m2 && s1.replace(/\s+/g, "") === s2.replace(/\s+/g, "")) {
      const pairNums = [q, q + 1];
      const pairGroupId = `g_multi_${q}_${q + 1}`;
      const passage: 1 | 2 | 3 = q <= 14 ? 1 : q <= 27 ? 2 : 3;

      let group = groups.find((g) => g.range[0] <= q && g.range[1] >= q + 1);
      if (!group) {
        group = {
          groupId: pairGroupId,
          passageNumber: passage,
          range: [q, q + 1],
          title: `Questions ${q}-${q + 1}`,
          instructions: "Choose TWO letters, A-E.",
          type: "multiple_choice_multi",
        };
        groups.push(group);
      } else {
        group.instructions = "Choose TWO letters, A-E.";
      }

      for (const qNum of pairNums) {
        questions[qNum] = {
          questionNumber: qNum,
          passageNumber: passage,
          groupId: group.groupId,
          type: "multiple_choice_multi",
          extractionStatus: "extracted",
          promptText: `Select TWO options for Questions ${q} and ${q + 1}:`,
          groupPrompt: "Choose TWO letters, A-E.",
          options: MCQ_5_OPTIONS,
          multiSelectGroupId: group.groupId,
          multiSelectQuestionNumbers: pairNums,
          maxSelections: 2,
        };
      }
      q++; // Skip second question in pair
    }
  }

  return {
    testId,
    totalQuestions: 40,
    groups,
    questions,
    answerKey,
  };
}
