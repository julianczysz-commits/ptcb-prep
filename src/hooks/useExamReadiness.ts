"use client";

import { useMemo } from "react";

import { useLessonProgress } from "@/hooks/useLessonProgress";
import { calculateExamReadiness } from "@/lib/exam-readiness";
import { lessons } from "@/lib/lesson-data";

export function useExamReadiness() {
  const { loading, completedIds } = useLessonProgress();

  const percent = useMemo(
    () =>
      calculateExamReadiness({
        completedLessons: completedIds.size,
        totalLessons: lessons.length,
      }),
    [completedIds],
  );

  return { loading, percent };
}
