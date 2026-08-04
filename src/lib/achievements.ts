import { calculateStreak } from "@/lib/streak";
import { getLessonQuestions, lessons } from "@/lib/lesson-data";
import { supabase } from "@/lib/supabase";

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string | null;
}

export type CheckAchievementsResult = {
  success: boolean;
  error?: string;
  unlocked: AchievementDefinition[];
};

const THRESHOLDS = {
  firstSteps: { name: "First Steps", lessonsCompleted: 1 },
  gettingStarted: { name: "Getting Started", xp: 100 },
  studyStreak: { name: "Study Streak", streakDays: 7 },
  quizMaster: { name: "Quiz Master", correctAnswers: 50 },
} as const;

export async function checkAchievements(
  userId: string,
): Promise<CheckAchievementsResult> {
  if (!userId) {
    return { success: false, error: "userId is required", unlocked: [] };
  }

  const { data: definitions, error: definitionsError } = await supabase
    .from("achievements")
    .select("id, name, description, icon");

  if (definitionsError) {
    return { success: false, error: definitionsError.message, unlocked: [] };
  }

  const { data: progressRows, error: progressError } = await supabase
    .from("lesson_progress")
    .select("lesson_id, score")
    .eq("user_id", userId)
    .eq("completed", true);

  if (progressError) {
    return { success: false, error: progressError.message, unlocked: [] };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    return { success: false, error: profileError.message, unlocked: [] };
  }

  const streak = await calculateStreak(userId);

  const questionCounts = new Map(
    lessons.map((lesson) => [lesson.slug, getLessonQuestions(lesson).length]),
  );

  const completedLessons = progressRows ?? [];
  const lessonsCompleted = completedLessons.length;
  const xp = profile?.xp ?? 0;
  const correctAnswers = completedLessons.reduce((total, row) => {
    const count = questionCounts.get(row.lesson_id) ?? 0;
    return total + Math.round(((row.score ?? 0) / 100) * count);
  }, 0);

  const earnedByName = new Set<string>();
  if (lessonsCompleted >= THRESHOLDS.firstSteps.lessonsCompleted) {
    earnedByName.add(THRESHOLDS.firstSteps.name);
  }
  if (xp >= THRESHOLDS.gettingStarted.xp) {
    earnedByName.add(THRESHOLDS.gettingStarted.name);
  }
  if (streak >= THRESHOLDS.studyStreak.streakDays) {
    earnedByName.add(THRESHOLDS.studyStreak.name);
  }
  if (correctAnswers >= THRESHOLDS.quizMaster.correctAnswers) {
    earnedByName.add(THRESHOLDS.quizMaster.name);
  }

  const { data: existingRows, error: existingError } = await supabase
    .from("user_achievements")
    .select("achievement_id")
    .eq("user_id", userId);

  if (existingError) {
    return { success: false, error: existingError.message, unlocked: [] };
  }

  const alreadyUnlocked = new Set(
    (existingRows ?? []).map((row) => row.achievement_id),
  );

  const toUnlock = definitions.filter(
    (achievement) =>
      earnedByName.has(achievement.name) && !alreadyUnlocked.has(achievement.id),
  );

  const unlocked: AchievementDefinition[] = [];
  for (const achievement of toUnlock) {
    const { error: insertError } = await supabase
      .from("user_achievements")
      .insert({ user_id: userId, achievement_id: achievement.id });

    if (insertError) {
      console.warn("Failed to unlock achievement:", achievement.name, insertError.message);
    } else {
      unlocked.push(achievement);
    }
  }

  return { success: true, unlocked };
}
