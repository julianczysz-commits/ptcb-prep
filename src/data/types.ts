export type QuestionCategory =
  | "Pharmacy Calculations"
  | "Pharmacy Law"
  | "Medications"
  | "Patient Safety"
  | "Pharmacy Operations";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type LessonDifficulty = "beginner" | "intermediate" | "advanced";

export type LessonSectionType = "explanation" | "memory-trick" | "example";

export interface LessonSection {
  type: LessonSectionType;
  title?: string;
  body: string;
}

export interface Lesson {
  slug: string;
  title: string;
  category: string;
  order: number;
  description?: string;
  difficulty?: LessonDifficulty;
  xpReward?: number;
  sections?: LessonSection[];
  explanation?: string;
  memoryTrick?: string;
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  lesson: string;
  difficulty: QuestionDifficulty;
  prompt: string;
  text?: string;
  options: AnswerOption[];
  correctOptionId: string;
  correctAnswer?: string;
  explanation: string;
  xpReward: number;
}
