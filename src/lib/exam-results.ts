import { supabase } from "@/lib/supabase";
import type { ExamAnswerRecord } from "@/lib/exam";

export type SaveExamAttemptResult =
  | { success: true; attemptId: string }
  | { success: false; error: string };

export async function saveExamAttempt(params: {
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSeconds: number;
  answers: ExamAnswerRecord[];
}): Promise<SaveExamAttemptResult> {
  const { userId, score, totalQuestions, correctAnswers, timeSeconds, answers } =
    params;

  if (!userId) {
    return { success: false, error: "userId is required" };
  }

  if (
    !Number.isFinite(score) ||
    !Number.isFinite(totalQuestions) ||
    !Number.isFinite(correctAnswers)
  ) {
    return { success: false, error: "score, totalQuestions, and correctAnswers are required" };
  }

  const { data: attempt, error: attemptError } = await supabase
    .from("exam_attempts")
    .insert({
      user_id: userId,
      score,
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      time_seconds: Math.max(0, Math.round(timeSeconds)),
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    return { success: false, error: attemptError?.message ?? "Failed to create exam attempt" };
  }

  if (answers.length > 0) {
    const { error: questionsError } = await supabase.from("exam_questions").insert(
      answers.map((answer) => ({
        exam_attempt_id: attempt.id,
        question_id: answer.questionId,
        selected_answer: answer.selectedAnswer,
        correct: answer.correct,
        answered_at: new Date().toISOString(),
      })),
    );

    if (questionsError) {
      return { success: false, error: questionsError.message };
    }
  }

  return { success: true, attemptId: attempt.id };
}

export type RecordReviewAnswerResult =
  | { success: true }
  | { success: false; error: string };

export async function recordReviewAnswer(params: {
  userId: string;
  questionId: string;
  correct: boolean;
}): Promise<RecordReviewAnswerResult> {
  if (!params.userId || !params.questionId) {
    return { success: false, error: "userId and questionId are required" };
  }

  const { error } = await supabase.from("review_history").insert({
    user_id: params.userId,
    question_id: params.questionId,
    correct: params.correct,
    attempted_at: new Date().toISOString(),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
