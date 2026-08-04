import { supabase } from "@/lib/supabase";

export type AwardResult =
  | { success: true; xp: number }
  | { success: false; error: string };

export async function awardXP(userId: string, amount: number): Promise<AwardResult> {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, error: "XP amount must be a positive number" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data) {
    return { success: false, error: "Profile not found" };
  }

  const newXp = data.xp + amount;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ xp: newXp })
    .eq("id", userId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, xp: newXp };
}
