export type QuestionType =
  | "true_false_not_given"
  | "yes_no_not_given"
  | "multiple_choice_single"
  | "multiple_choice_multi"
  | "matching_headings"
  | "matching_information"
  | "matching_features"
  | "matching_sentence_endings"
  | "sentence_completion"
  | "summary_completion_text"
  | "summary_completion_bank"
  | "table_completion"
  | "notes_completion"
  | "diagram_completion"
  | "short_answer"
  | "unknown";

export interface VirtualOption {
  value: string;
  label: string;
  text?: string;
  sourceStatus?: "extracted" | "synthetic";
}

export interface VirtualReferenceBox {
  title: string;
  type?: "headings" | "features" | "sentence_endings" | "word_bank";
  items: { label: string; text: string }[];
}

export interface TableContext {
  title?: string;
  headers?: string[];
  rowLabel?: string;
  columnLabel?: string;
  cellText?: string;
}

export interface NotesContext {
  sectionTitle?: string;
  bulletPrefix?: string;
}

export interface VirtualQuestionGroup {
  groupId: string;
  passageNumber: 1 | 2 | 3;
  range: [number, number];
  title: string;
  instructions: string;
  wordLimit?: string;
  type: QuestionType;
  referenceBox?: VirtualReferenceBox;
  groupContextText?: string;
}

export interface VirtualQuestionContent {
  questionType?: QuestionType;
  groupId?: string;
  extractionStatus?: "extracted" | "group_inherited" | "missing";
  promptText: string;
  sentenceBefore?: string;
  sentenceAfter?: string;
  contextHeader?: string;
  referenceBox?: VirtualReferenceBox;
  options?: VirtualOption[];
  groupPrompt?: string;
  tableContext?: TableContext;
  notesContext?: NotesContext;
}

export interface VirtualQuestion {
  questionNumber: number; // 1..40
  passageNumber: 1 | 2 | 3;
  groupId: string;
  type: QuestionType;
  extractionStatus?: "extracted" | "group_inherited" | "missing";
  promptText?: string;
  sentenceBefore?: string;
  sentenceAfter?: string;
  contextHeader?: string;
  referenceBox?: VirtualReferenceBox;
  groupPrompt?: string;
  options?: VirtualOption[];
  tableContext?: TableContext;
  notesContext?: NotesContext;
  contextLabel?: string;
  multiSelectGroupId?: string;
  multiSelectQuestionNumbers?: number[];
  maxSelections?: number;
  placeholder?: string;
}

export interface VirtualTestIndex {
  testId: string;
  totalQuestions: number; // 40
  groups: VirtualQuestionGroup[];
  questions: Record<number, VirtualQuestion>;
  answerKey: Record<number, string | string[]>;
}

export type TestEngineMode = "practice" | "exam";

export type TestEngineView =
  | "mode-selection"
  | "exam-ready"
  | "running"
  | "review"
  | "submitted";

export interface QuestionState {
  answered: boolean;
  bookmarked: boolean;
  checked: boolean;
  correct?: boolean;
}

export interface TestEngineState {
  mode: TestEngineMode;
  view: TestEngineView;
  currentQuestion: number;
  answers: Record<number, string>;
  bookmarks: Record<number, boolean>;
  checkedQuestions: Record<number, { isCorrect: boolean; correctAnswer: string }>;
  isSubmitted: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
  passageCollapsed: boolean;
  activePassageNumber: 1 | 2 | 3;
}
