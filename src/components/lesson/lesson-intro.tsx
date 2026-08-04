"use client";

import { motion } from "motion/react";

import {
  ArrowRightIcon,
  BoltIcon,
  LightbulbIcon,
  XMarkIcon,
} from "@/components/icons";
import { PrimaryButton } from "@/components/ui/primary-button";
import { getLessonTotalXp, type Lesson } from "@/lib/lesson-data";

interface LessonIntroProps {
  lesson: Lesson;
  onStart: () => void;
  onClose: () => void;
}

export function LessonIntro({ lesson, onStart, onClose }: LessonIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      <div className="flex items-center justify-between py-4">
        <button
          onClick={onClose}
          className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Close lesson"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-strong dark:bg-brand/15">
          {lesson.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50"
        >
          {lesson.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {lesson.explanation}
        </motion.p>

        {lesson.memoryTrick && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="rounded-2xl border-2 border-dashed border-flame/50 bg-flame/10 p-4"
          >
            <div className="flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-flame" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-flame">
                Memory trick
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-200">
              {lesson.memoryTrick}
            </p>
          </motion.div>
        )}
      </div>

      <div className="pb-6">
        <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
          <BoltIcon className="h-4 w-4 text-flame" />
          Earn up to {getLessonTotalXp(lesson)} XP
        </div>
        <PrimaryButton onClick={onStart}>
          Start Lesson
          <ArrowRightIcon className="h-5 w-5" />
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
