"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

import { BoltIcon, CheckIcon, LockIcon, PlayIcon } from "@/components/icons";
import type { PaletteClasses } from "@/components/learn/palettes";
import { getQuestionsByLesson } from "@/data/questions";
import type { LessonStatus } from "@/data/learning-path";
import { getLessonTotalXp, type Lesson } from "@/lib/lesson-data";

interface LessonNodeProps {
  lesson: Lesson;
  status: LessonStatus;
  palette: PaletteClasses;
  delay: number;
}

function nodeCircleClasses(status: LessonStatus, palette: PaletteClasses) {
  if (status === "completed") {
    return "bg-brand text-white shadow-lg shadow-brand/30 ring-4 ring-brand-soft dark:ring-brand/20";
  }
  if (status === "unlocked") {
    return `border-2 bg-white shadow-md ${palette.border} ${palette.text} dark:bg-zinc-900`;
  }
  return "border-2 border-dashed border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800";
}

function statusChipClasses(status: LessonStatus, palette: PaletteClasses) {
  if (status === "completed") {
    return "bg-brand-soft text-brand-strong dark:bg-brand/15 dark:text-brand";
  }
  if (status === "unlocked") {
    return palette.soft;
  }
  return "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500";
}

export function LessonNode({ lesson, status, palette, delay }: LessonNodeProps) {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);

  const questionCount = getQuestionsByLesson(lesson.slug).length;
  const xp = getLessonTotalXp(lesson);

  function handleClick() {
    if (status === "locked") {
      setTapCount((count) => count + 1);
      return;
    }
    router.push(`/lessons/${lesson.slug}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative flex items-center gap-4"
    >
      <motion.button
        key={tapCount}
        animate={
          tapCount > 0 && status === "locked"
            ? { x: [0, -8, 8, -6, 6, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.4 }}
        whileTap={status !== "locked" ? { scale: 0.9 } : undefined}
        onClick={handleClick}
        aria-label={`${status === "locked" ? "Locked lesson, " : ""}${lesson.title}`}
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${nodeCircleClasses(status, palette)}`}
      >
        {status === "completed" && <CheckIcon className="h-6 w-6" />}
        {status === "unlocked" && <PlayIcon className="h-6 w-6" />}
        {status === "locked" && <LockIcon className="h-6 w-6" />}
      </motion.button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-base font-extrabold ${
            status === "locked"
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          {lesson.title}
        </p>
        {status === "locked" ? (
          <span className="mt-0.5 text-xs font-bold text-zinc-400 dark:text-zinc-500">
            Complete the previous lesson to unlock
          </span>
        ) : (
          <span className={`mt-0.5 flex items-center gap-1 text-xs font-extrabold ${palette.text}`}>
            <BoltIcon className="h-3.5 w-3.5 text-flame" />
            +{xp} XP · {questionCount} questions
          </span>
        )}
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${statusChipClasses(status, palette)}`}
      >
        {status}
      </span>
    </motion.div>
  );
}
