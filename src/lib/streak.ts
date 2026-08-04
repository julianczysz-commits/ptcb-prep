import { supabase } from "@/lib/supabase";

const STREAK_WINDOW_DAYS = 365;

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function calculateStreak(userId: string): Promise<number> {
  if (!userId) return 0;

  const now = new Date();
  const cutoff = addDays(now, -STREAK_WINDOW_DAYS);

  const { data, error } = await supabase
    .from("daily_activity")
    .select("activity_date")
    .eq("user_id", userId)
    .gte("activity_date", toDateString(cutoff))
    .order("activity_date", { ascending: false });

  if (error) {
    console.warn("Failed to load daily activity:", error.message);
    return 0;
  }

  const dates = new Set(
    (data ?? [])
      .map((row) => row.activity_date)
      .filter((date): date is string => Boolean(date)),
  );

  let cursor = addDays(now, -1);
  if (dates.has(toDateString(now))) {
    cursor = now;
  }

  let streak = 0;
  while (dates.has(toDateString(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}
