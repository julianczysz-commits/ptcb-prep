"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { ArrowRightIcon, PlayIcon } from "@/components/icons";
import { categories, getCategoryLessons } from "@/data/learning-path";
import { useLessonProgress } from "@/hooks/useLessonProgress";

export function ContinueLearning() {
  const { loading, completedIds, getStatus, getCategoryProgress } =
    useLessonProgress();

  const nextLesson = (() => {
    for (const category of categories) {
      for (const lesson of getCategoryLessons(category.name)) {
        if (getStatus(lesson.slug) === "unlocked") return lesson;
      }
    }
    return null;
  })();

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-40 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-2 w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </motion.section>
    );
  }

  if (completedIds.size === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Ready to Start
          </span>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-extrabold text-brand-strong dark:bg-brand/15">
            0%
          </span>
        </div>

        <h2 className="mt-3 text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
          Start your first lesson
        </h2>
        <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Complete a lesson to track your progress and start your streak.
        </p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
            className="h-full rounded-full bg-brand"
          />
        </div>

        <motion.div whileTap={{ scale: 0.96 }} className="mt-5">
          <Link
            href={nextLesson ? `/lessons/${nextLesson.slug}` : "/learn"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
          >
            <PlayIcon className="h-5 w-5" />
            Start Learning
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  if (!nextLesson) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Continue Learning
          </span>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-extrabold text-brand-strong dark:bg-brand/15">
            100%
          </span>
        </div>

        <h2 className="mt-3 text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
          All lessons complete!
        </h2>
        <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Review a lesson to keep your skills sharp.
        </p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
            className="h-full rounded-full bg-brand"
          />
        </div>

        <motion.div whileTap={{ scale: 0.96 }} className="mt-5">
          <Link
            href="/learn"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
          >
            <PlayIcon className="h-5 w-5" />
            Review Lessons
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  const progress = getCategoryProgress(nextLesson.category);
  const progressPercent =
    progress.total === 0 ? 0 : Math.round((progress.completed / progress.total) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Continue Learning
        </span>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-extrabold text-brand-strong dark:bg-brand/15">
          {progressPercent}%
        </span>
      </div>

      <h2 className="mt-3 text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
        {nextLesson.category}
      </h2>
      <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        {nextLesson.title}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          className="h-full rounded-full bg-brand"
        />
      </div>

      <motion.div whileTap={{ scale: 0.96 }} className="mt-5">
        <Link
          href={`/lessons/${nextLesson.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
        >
          <PlayIcon className="h-5 w-5" />
          Continue
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
