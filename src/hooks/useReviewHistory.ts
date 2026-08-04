"use client";

import { useEffect, useMemo, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export function useReviewHistory() {
  const { user, loading: userLoading } = useUser();
  const [rows, setRows] = useState<{ question_id: string; correct: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchHistory() {
      if (!user) {
        if (active) {
          setRows([]);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("review_history")
        .select("question_id, correct")
        .eq("user_id", user.id);

      if (!active) return;

      if (error) {
        console.warn("Failed to load review history:", error.message);
        setRows([]);
      } else {
        setRows((data ?? []) as { question_id: string; correct: boolean }[]);
      }
      setLoading(false);
    }

    fetchHistory();

    return () => {
      active = false;
    };
  }, [user]);

  const stats = useMemo(() => {
    const missed = new Set<string>();
    let correct = 0;

    for (const row of rows) {
      if (row.correct) {
        correct += 1;
      } else {
        missed.add(row.question_id);
      }
    }

    return {
      totalAttempts: rows.length,
      correctAttempts: correct,
      missedCount: missed.size,
      missedIds: missed,
    };
  }, [rows]);

  return { loading: userLoading || loading, ...stats };
}
