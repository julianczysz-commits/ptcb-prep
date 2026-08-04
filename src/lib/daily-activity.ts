import { supabase } from "@/lib/supabase";

export type DailyActivityResult =
  | { success: true }
  | { success: false; error: string };

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function recordDailyActivity(params: {
  userId: string;
  xpEarned: number;
  activityDate?: string;
}): Promise<DailyActivityResult> {
  const { userId, xpEarned } = params;

  if (!userId) {
    return { success: false, error: "userId is required" };
  }

  if (!Number.isFinite(xpEarned) || xpEarned < 0) {
    return { success: false, error: "xpEarned must be a non-negative number" };
  }

  const today = params.activityDate ?? toDateString(new Date());

  const { data: existing, error: selectError } = await supabase
    .from("daily_activity")
    .select("id, xp_earned, lessons_completed")
    .eq("user_id", userId)
    .eq("activity_date", today)
    .maybeSingle();

  if (selectError) {
    return { success: false, error: selectError.message };
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("daily_activity")
      .update({
        xp_earned: existing.xp_earned + xpEarned,
        lessons_completed: existing.lessons_completed + 1,
      })
      .eq("id", existing.id);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true };
  }

  const { error: insertError } = await supabase
    .from("daily_activity")
    .insert({
      user_id: userId,
      activity_date: today,
      xp_earned: xpEarned,
      lessons_completed: 1,
    });

  if (insertError) {
    return { success: false, error: insertError.message };
  }

  return { success: true };
}
