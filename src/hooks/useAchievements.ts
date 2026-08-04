"use client";

import { useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export interface UserAchievement {
  achievementId: string;
  name: string;
  description: string;
  icon: string | null;
  unlockedAt: string;
}

export function useAchievements() {
  const { user, loading: userLoading } = useUser();
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchAchievements() {
      if (!user) {
        if (active) {
          setAchievements([]);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("user_achievements")
        .select("achievement_id, unlocked_at, achievements(name, description, icon)")
        .eq("user_id", user.id)
        .order("unlocked_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.warn("Failed to load achievements:", error.message);
        setAchievements([]);
      } else {
        setAchievements(
          (data ?? []).map((row) => {
            const achievement = Array.isArray(row.achievements)
              ? row.achievements[0]
              : row.achievements;
            return {
              achievementId: row.achievement_id,
              unlockedAt: row.unlocked_at,
              name: achievement?.name ?? "Unknown",
              description: achievement?.description ?? "",
              icon: achievement?.icon ?? null,
            };
          }),
        );
      }
      setLoading(false);
    }

    fetchAchievements();

    return () => {
      active = false;
    };
  }, [user]);

  return { achievements, loading: userLoading || loading };
}
