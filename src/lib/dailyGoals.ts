import { supabase } from "@/lib/supabase";

export interface DailyGoal {
  id: string;
  user_id: string;
  goal_date: string;
  goal_type: string;
  target: number;
  progress: number;
  completed: boolean;
}

export type DailyGoalResult =
  | { success: true; goal: DailyGoal }
  | { success: false; error: string };

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getOrCreateDailyGoal(
  userId: string,
): Promise<DailyGoalResult> {
  if (!userId) {
    return { success: false, error: "userId is required" };
  }

  const today = toDateString(new Date());

  const { data: existing, error: selectError } = await supabase
    .from("daily_goals")
    .select("id, user_id, goal_date, goal_type, target, progress, completed")
    .eq("user_id", userId)
    .eq("goal_date", today)
    .maybeSingle();

  if (selectError) {
    return { success: false, error: selectError.message };
  }

  if (existing) {
    return { success: true, goal: existing as DailyGoal };
  }

  const { data: created, error: insertError } = await supabase
    .from("daily_goals")
    .insert({
      user_id: userId,
      goal_date: today,
      goal_type: "lesson",
      target: 1,
      progress: 0,
      completed: false,
    })
    .select("id, user_id, goal_date, goal_type, target, progress, completed")
    .single();

  if (insertError) {
    return { success: false, error: insertError.message };
  }

  return { success: true, goal: created as DailyGoal };
}

export type IncrementDailyGoalResult =
  | { success: true; goal: DailyGoal | null; completed: boolean }
  | { success: false; error: string };

export async function incrementDailyGoal(
  userId: string,
): Promise<IncrementDailyGoalResult> {
  if (!userId) {
    return { success: false, error: "userId is required" };
  }

  const today = toDateString(new Date());

  const { data: goal, error: selectError } = await supabase
    .from("daily_goals")
    .select("id, user_id, goal_date, goal_type, target, progress, completed")
    .eq("user_id", userId)
    .eq("goal_date", today)
    .maybeSingle();

  if (selectError) {
    return { success: false, error: selectError.message };
  }

  if (!goal || goal.goal_type !== "lesson" || goal.completed) {
    return { success: true, goal: (goal ?? null) as DailyGoal | null, completed: Boolean(goal?.completed) };
  }

  const newProgress = Math.min(goal.target, goal.progress + 1);
  const completed = newProgress >= goal.target;

  const { data: updated, error: updateError } = await supabase
    .from("daily_goals")
    .update({ progress: newProgress, completed })
    .eq("id", goal.id)
    .select("id, user_id, goal_date, goal_type, target, progress, completed")
    .single();

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, goal: updated as DailyGoal, completed };
}
