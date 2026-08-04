import { supabase } from "@/lib/supabase";

export type ProgressResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function recordLessonCompletion(params: {
  userId: string;
  lessonId: string;
  score: number;
}): Promise<ProgressResult> {
  if (!params.userId || !params.lessonId) {
    return { success: false, error: "userId and lessonId are required" };
  }

  if (!Number.isFinite(params.score) || params.score < 0 || params.score > 100) {
    return { success: false, error: "score must be between 0 and 100" };
  }

  const { data, error } = await supabase
    .from("lesson_progress")
    .insert({
      user_id: params.userId,
      lesson_id: params.lessonId,
      completed: true,
      score: params.score,
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, id: data.id };
}
