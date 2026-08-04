"use client";

import { useEffect, useMemo, useState } from "react";

import {
  categories,
  getCategoryLessons,
  type LessonStatus,
} from "@/data/learning-path";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export function useLessonProgress() {
  const { user, loading: userLoading } = useUser();
  const [completedIds, setCompletedIds] = useState<ReadonlySet<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchProgress() {
      if (!user) {
        if (active) {
          setCompletedIds(new Set());
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (!active) return;

      if (error) {
        console.warn("Failed to load lesson progress:", error.message);
        setCompletedIds(new Set());
      } else {
        setCompletedIds(new Set((data ?? []).map((row) => row.lesson_id)));
      }
      setLoading(false);
    }

    fetchProgress();

    return () => {
      active = false;
    };
  }, [user]);

  const statusBySlug = useMemo(() => {
    const statuses = new Map<string, LessonStatus>();

    for (const category of categories) {
      let unlocked = false;
      for (const lesson of getCategoryLessons(category.name)) {
        if (completedIds.has(lesson.slug)) {
          statuses.set(lesson.slug, "completed");
        } else if (!unlocked) {
          statuses.set(lesson.slug, "unlocked");
          unlocked = true;
        } else {
          statuses.set(lesson.slug, "locked");
        }
      }
    }

    return statuses;
  }, [completedIds]);

  function getStatus(slug: string): LessonStatus {
    return statusBySlug.get(slug) ?? "locked";
  }

  function getCategoryProgress(categoryName: string) {
    const categoryLessons = getCategoryLessons(categoryName);
    const completed = categoryLessons.filter(
      (lesson) => statusBySlug.get(lesson.slug) === "completed",
    ).length;
    return { completed, total: categoryLessons.length };
  }

  return { loading: userLoading || loading, completedIds, getStatus, getCategoryProgress };
}
