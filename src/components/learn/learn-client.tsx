"use client";

import { motion } from "motion/react";

import { LearnIcon } from "@/components/icons";
import { CategoryCard } from "@/components/learn/category-card";
import { categories } from "@/data/learning-path";
import { useLessonProgress } from "@/hooks/useLessonProgress";

function CategorySkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-1/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="mt-3 h-2 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 space-y-5">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function LearnClient() {
  const { loading, getStatus, getCategoryProgress } = useLessonProgress();

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 pb-32 pt-6">
      <div className="flex items-center gap-2">
        <LearnIcon className="h-5 w-5 text-brand" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
          PTCB Pro
        </span>
      </div>
      <h1 className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
        Learning Path
      </h1>
      <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Complete lessons to earn XP and unlock the next step.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        {loading
          ? categories.map((category, index) => (
              <CategorySkeleton key={category.name} index={index} />
            ))
          : categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                category={category}
                index={index}
                getStatus={getStatus}
                progress={getCategoryProgress(category.name)}
              />
            ))}
      </div>
    </main>
  );
}
