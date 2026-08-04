import { questions } from "@/data/questions";
import type { Question, QuestionCategory } from "@/data/types";

export const EXAM_TOTAL_QUESTIONS = 90;
export const EXAM_XP_PER_CORRECT = 5;

export type ExamAnswerRecord = {
  questionId: string;
  selectedAnswer: string | null;
  correct: boolean;
};

export type ExamCategoryBreakdown = {
  category: string;
  correct: number;
  total: number;
};

export type ExamResult = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSeconds: number;
  answers: ExamAnswerRecord[];
  categoryBreakdown: ExamCategoryBreakdown[];
};

export const EXAM_CATEGORIES: QuestionCategory[] = [
  "Pharmacy Calculations",
  "Pharmacy Law",
  "Medications",
  "Patient Safety",
  "Pharmacy Operations",
];

export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function selectExamQuestions(
  count: number = EXAM_TOTAL_QUESTIONS,
): Question[] {
  const base = Math.floor(count / EXAM_CATEGORIES.length);
  const remainder = count % EXAM_CATEGORIES.length;
  const selected: Question[] = [];

  for (let i = 0; i < EXAM_CATEGORIES.length; i++) {
    const category = EXAM_CATEGORIES[i];
    const pool = shuffle(questions.filter((q) => q.category === category));
    const take = Math.min(pool.length, base + (i < remainder ? 1 : 0));
    selected.push(...pool.slice(0, take));
  }

  return shuffle(selected);
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${rest}s`;
  }
  return `${rest}s`;
}
