"use client";

import { useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export const XP_PER_LEVEL = 500;

export type Profile = {
  id: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
  created_at?: string;
};

export function useProfile() {
  const { user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchProfile() {
      if (!user) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, xp, level, streak")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.warn("Failed to load profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data ?? null);
      }
      setLoading(false);
    }

    fetchProfile();

    return () => {
      active = false;
    };
  }, [user]);

  return {
    profile,
    loading: userLoading || loading,
    username: profile?.username ?? null,
    xp: profile?.xp ?? 0,
    level: profile?.level ?? 1,
    streak: profile?.streak ?? 0,
  };
}
