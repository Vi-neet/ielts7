/**
 * Exam duration configuration from environment variables.
 * Set NEXT_PUBLIC_READING_EXAM_DURATION_MINUTES and
 * NEXT_PUBLIC_LISTENING_EXAM_DURATION_MINUTES in .env.local
 * to configure exam durations. Defaults to 30 minutes each.
 */
export function getReadingExamDurationMinutes(): number {
  const envVal = process.env.NEXT_PUBLIC_READING_EXAM_DURATION_MINUTES;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 55; // Default IELTS Reading duration (55 min)
}

export function getListeningExamDurationMinutes(): number {
  const envVal = process.env.NEXT_PUBLIC_LISTENING_EXAM_DURATION_MINUTES;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 30; // Default IELTS Listening duration (30 min)
}

export const READING_EXAM_DURATION_MINUTES = getReadingExamDurationMinutes();
export const LISTENING_EXAM_DURATION_MINUTES = getListeningExamDurationMinutes();

/** Returns the exam duration in seconds for the given test type. */
export function getExamDurationSeconds(testType: string): number {
  const isListening = testType?.toLowerCase().includes("listening");
  const minutes = isListening
    ? getListeningExamDurationMinutes()
    : getReadingExamDurationMinutes();
  return minutes * 60;
}

/** Human-readable duration label, e.g. "30 minutes". */
export function formatDurationMinutes(minutes: number): string {
  return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

/** Format seconds as MM:SS for the exam timer display. */
export function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
