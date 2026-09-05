// Format answer text for display, handling special cases
export function formatAnswer(answer: any): string {
  // Handle null, undefined, or empty values
  if (answer === null || answer === undefined) return "";
  
  // Convert numbers to strings
  if (typeof answer === 'number') {
    return answer.toString();
  }
  
  // For arrays (multiple correct options)
  if (Array.isArray(answer)) {
    return answer.map(item => formatAnswer(item)).join(" / ");
  }
  
  // Ensure answer is treated as a string from this point on
  const answerStr = String(answer);
  if (!answerStr) return "";
  
  // Handle single letter MCQ alternatives like "A/E" -> "A or E"
  if (/^[A-Z]\s*\/\s*[A-Z]$/i.test(answerStr.trim())) {
    return answerStr.trim().replace(/\s*\/\s*/g, " or ");
  }

  // Handle multiple acceptable answers separated by OR or slash
  if (answerStr.includes(" OR ") || answerStr.includes("/")) {
    return answerStr.replace(" OR ", " / ");
  }
  
  // Handle answers that should be all caps (usually letters for MCQs)
  if (/^[A-Z\s]+$/.test(answerStr) && answerStr.length <= 3) {
    return answerStr;
  }
  
  // Handle answers with commas (which might be multiple acceptable answers)
  if (answerStr.includes(",")) {
    return answerStr.split(",").map(a => a.trim()).join(" / ");
  }
  
  // For longer answers, ensure proper capitalization
  if (answerStr.length > 0 && !/^\d+(\.\d+)?$/.test(answerStr)) {
    return answerStr.charAt(0).toUpperCase() + answerStr.slice(1).toLowerCase();
  }
  
  return answerStr;
}

// Helper to expand parentheses and optional words/suffixes
function expandParentheses(phrase: string): string[] {
  let phrases = [phrase];

  // Handle suffix parentheses like (s), ('s), (es) attached to a word: habitat(s) -> habitat, habitats
  const suffixRegex = /(\w+)\((s|'s|es)\)/gi;
  if (suffixRegex.test(phrase)) {
    const withSuffix = phrase.replace(/(\w+)\((s|'s|es)\)/gi, "$1$2");
    const withoutSuffix = phrase.replace(/(\w+)\((s|'s|es)\)/gi, "$1");
    phrases = [withSuffix, withoutSuffix];
  }

  const results = new Set<string>();

  for (const p of phrases) {
    // Separate attached parens like (CE)mark -> (CE) mark
    let processedP = p.replace(/\(([^)]+)\)(\w+)/g, "($1) $2");
    processedP = processedP.replace(/(\w+)\(([^)]+)\)/g, "$1 ($2)");

    const parenMatches = [...processedP.matchAll(/\(([^)]+)\)/g)];

    if (parenMatches.length === 0) {
      results.add(processedP.trim());
      continue;
    }

    // 1. Full phrase without parentheses symbols: "(deer) antlers" -> "deer antlers"
    const fullText = processedP.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    if (fullText) results.add(fullText);

    // 2. Phrase with parenthesized content completely omitted: "(deer) antlers" -> "antlers"
    const omittedText = processedP.replace(/\([^)]+\)/g, " ").replace(/\s+/g, " ").trim();
    if (omittedText) results.add(omittedText);

    // 3. The bracketed words themselves (unless it's just an article like "a", "an", "the"): "(deer) antlers" -> "deer"
    for (const match of parenMatches) {
      const inside = match[1].trim();
      const insideLower = inside.toLowerCase();
      if (inside && !["a", "an", "the"].includes(insideLower)) {
        results.add(inside);
      }
    }

    // 4. Multiple parentheses power set combinations: e.g. "(unique) (Chinese) architecture"
    if (parenMatches.length > 1) {
      const n = parenMatches.length;
      for (let mask = 1; mask < 1 << n; mask++) {
        let comb = processedP;
        for (let i = 0; i < n; i++) {
          const item = parenMatches[i][0];
          const content = parenMatches[i][1];
          if ((mask & (1 << i)) !== 0) {
            comb = comb.replace(item, content);
          } else {
            comb = comb.replace(item, "");
          }
        }
        const cleanedComb = comb.replace(/\s+/g, " ").trim();
        if (cleanedComb) {
          results.add(cleanedComb);
        }
      }
    }
  }

  return Array.from(results);
}

// Normalize student's input (strips punctuation, quotes, trailing dots, collapses spaces)
export function normalizeStudentAnswer(raw: string): string {
  if (!raw) return "";
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/^["'“”‘’]+|["'“”‘’.]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract all acceptable normalized forms of the correct answer
export function getAcceptableAnswers(answer: any): string[] {
  if (answer === null || answer === undefined) return [];

  if (typeof answer === "number") {
    return [answer.toString().trim().toLowerCase()];
  }

  if (Array.isArray(answer)) {
    return answer.flatMap((item) => getAcceptableAnswers(item));
  }

  let raw = String(answer).trim();
  if (!raw) return [];

  const acceptable = new Set<string>();
  acceptable.add(raw.toLowerCase());
  acceptable.add(raw.toLowerCase().replace(/[()]/g, " ").replace(/\s+/g, " ").trim());

  // Special handling for "(in either order)"
  let isEitherOrder = false;
  if (/(\(|\b)in either order(\)|\b)/i.test(raw)) {
    isEitherOrder = true;
    raw = raw.replace(/\s*\(in either order\)\s*/gi, "").replace(/\bin either order\b/gi, "").trim();
  }

  // Split alternatives: "OR", comma, or slash
  let parts: string[] = [];
  if (raw.includes(" OR ") || raw.includes(" or ")) {
    parts = raw.split(/\s+OR\s+/i);
  } else if (raw.includes("/")) {
    parts = raw.split(/\s*\/\s*/);
  } else if (raw.includes(",")) {
    parts = raw.split(/\s*,\s*/);
  } else {
    parts = [raw];
  }

  // Also include the combined raw slash alternatives normalized
  if (parts.length > 1) {
    acceptable.add(parts.map((p) => p.trim().toLowerCase()).join("/"));
    acceptable.add(parts.map((p) => p.trim().toLowerCase()).join(" / "));
    acceptable.add(parts.map((p) => p.trim().toLowerCase()).join(" or "));
    acceptable.add(parts.map((p) => p.trim().toLowerCase()).join(", "));
  }

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const expanded = expandParentheses(trimmed);
    for (const exp of expanded) {
      const norm = exp.toLowerCase().replace(/\s+/g, " ").trim();
      if (!norm) continue;

      acceptable.add(norm);

      // Hyphen variations: "orang-utan" -> "orang utan", "orangutan"
      if (norm.includes("-")) {
        acceptable.add(norm.replace(/-/g, " ").replace(/\s+/g, " ").trim());
        acceptable.add(norm.replace(/-/g, "").replace(/\s+/g, " ").trim());
      }

      // Apostrophe variations: "architect's" -> "architects", "architect"
      if (norm.includes("'")) {
        acceptable.add(norm.replace(/'/g, ""));
        acceptable.add(norm.replace(/'s\b/g, ""));
      }

      // If starts with "the ", "a ", "an ", also add without article
      const articleMatch = norm.match(/^(?:the|a|an)\s+(.+)$/);
      if (articleMatch) {
        acceptable.add(articleMatch[1].trim());
      }

      // Common British / American spelling variants
      if (norm.endsWith("tre")) acceptable.add(norm.slice(0, -3) + "ter");
      if (norm.endsWith("ter")) acceptable.add(norm.slice(0, -3) + "tre");
      if (norm.includes("our")) acceptable.add(norm.replace(/our/g, "or"));
      if (norm.includes("ise")) acceptable.add(norm.replace(/ise/g, "ize"));

      // Standard T/F/NG and Y/N
      if (norm === "not given" || norm === "ng") {
        acceptable.add("not given");
        acceptable.add("ng");
      } else if (norm === "true" || norm === "t") {
        acceptable.add("true");
        acceptable.add("t");
      } else if (norm === "false" || norm === "f") {
        acceptable.add("false");
        acceptable.add("f");
      } else if (norm === "yes" || norm === "y") {
        acceptable.add("yes");
        acceptable.add("y");
      } else if (norm === "no" || norm === "n") {
        acceptable.add("no");
        acceptable.add("n");
      }
    }
  }

  // If "in either order" like "B/D", also add paired options
  if (isEitherOrder && parts.length > 1) {
    const letters = parts.map((p) => p.trim().toLowerCase());
    acceptable.add(letters.join("/"));
    acceptable.add(letters.slice().reverse().join("/"));
    acceptable.add(letters.join(", "));
    acceptable.add(letters.join(" and "));
    acceptable.add(letters.join(" or "));
    acceptable.add(letters.join(" "));
  }

  return Array.from(acceptable);
}

// Checks if a student's answer is correct against the key
export function isAnswerCorrect(studentAns: string, correctAns: any): boolean {
  const cleanStudent = normalizeStudentAnswer(studentAns);
  if (!cleanStudent) return false;

  const acceptable = getAcceptableAnswers(correctAns);

  // 1. Direct match
  if (acceptable.includes(cleanStudent)) return true;

  // 1b. Direct match stripping parentheses from student input (e.g. "(deer) antlers")
  const studentNoParens = cleanStudent.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  if (acceptable.includes(studentNoParens)) return true;

  // 2. Match without hyphens or with hyphens replaced by space
  const studentNoHyphen = cleanStudent.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
  const studentCollapsed = cleanStudent.replace(/[-_\s]/g, "");

  for (const opt of acceptable) {
    if (opt.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim() === studentNoHyphen) return true;
    if (opt.replace(/[-_\s]/g, "") === studentCollapsed) return true;
  }

  // 3. Match if student added leading article "the", "a", "an" before answer (e.g. "the deer antlers")
  const articleStripped = cleanStudent.replace(/^(the|a|an)\s+/, "");
  if (articleStripped !== cleanStudent && acceptable.includes(articleStripped)) return true;

  return false;
}

export interface QuestionGrade {
  correct: boolean;
  studentAnswer: string;
  correctAnswer: string;
}

export interface GradeResult {
  score: number;
  total: number;
  perQuestion: Record<number, QuestionGrade>;
}

// Grades the attempt by comparing student answers to the answer key
export function gradeAttempt(
  studentAnswers: Record<number, string>,
  answerKey: Record<number, string | string[]>
): GradeResult {
  let score = 0;
  const total = Object.keys(answerKey).length;
  const perQuestion: Record<number, QuestionGrade> = {};

  Object.entries(answerKey).forEach(([numStr, correctAns]) => {
    const num = parseInt(numStr, 10);
    const studentAns = studentAnswers[num] || "";

    const isCorrect = isAnswerCorrect(studentAns, correctAns);
    if (isCorrect) {
      score++;
    }

    perQuestion[num] = {
      correct: isCorrect,
      studentAnswer: studentAns,
      correctAnswer: formatAnswer(correctAns),
    };
  });

  return { score, total, perQuestion };
}
