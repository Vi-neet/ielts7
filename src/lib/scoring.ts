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

// Extract all acceptable normalized forms of the correct answer
export function getAcceptableAnswers(answer: any): string[] {
  if (answer === null || answer === undefined) return [];
  
  if (typeof answer === 'number') {
    return [answer.toString().trim().toLowerCase()];
  }
  
  if (Array.isArray(answer)) {
    return answer.flatMap(item => getAcceptableAnswers(item));
  }
  
  const str = String(answer);
  // Split on " OR ", ",", or slashes representing alternatives
  const parts = str.split(/\s+OR\s+|,\s*|\s*\/\s*/i);
  const baseAcceptable = parts.map(p => p.trim().toLowerCase()).filter(Boolean);

  const synonyms: string[] = [];
  for (const acc of baseAcceptable) {
    if (acc === "not given" || acc === "ng") {
      synonyms.push("not given", "ng");
    } else if (acc === "true" || acc === "t") {
      synonyms.push("true", "t");
    } else if (acc === "false" || acc === "f") {
      synonyms.push("false", "f");
    } else if (acc === "yes" || acc === "y") {
      synonyms.push("yes", "y");
    } else if (acc === "no" || acc === "n") {
      synonyms.push("no", "n");
    } else {
      synonyms.push(acc);
    }
  }

  return Array.from(new Set(synonyms));
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
    
    const acceptable = getAcceptableAnswers(correctAns);
    const cleanStudent = studentAns.trim().toLowerCase();
    
    // Check if cleanStudent matches any of the acceptable forms
    const isCorrect = cleanStudent !== "" && acceptable.some(option => option === cleanStudent);
    if (isCorrect) {
      score++;
    }

    perQuestion[num] = {
      correct: isCorrect,
      studentAnswer: studentAns,
      correctAnswer: formatAnswer(correctAns)
    };
  });

  return { score, total, perQuestion };
}
