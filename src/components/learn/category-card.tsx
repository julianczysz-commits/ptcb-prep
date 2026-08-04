"use client";

import { motion } from "motion/react";

import {
  BoxIcon,
  CalculatorIcon,
  DocumentIcon,
  PillIcon,
  ShieldIcon,
} from "@/components/icons";
import { LessonNode } from "@/components/learn/lesson-node";
import { palettes } from "@/components/learn/palettes";
import {
  getCategoryLessons,
  type Category,
  type CategoryIcon,
  type LessonStatus,
} from "@/data/learning-path";

function CategoryIcon({ name }: { name: CategoryIcon }) {
  const className = "h-6 w-6";
  switch (name) {
    case "pills":
      return <PillIcon className={className} />;
    case "law":
      return <DocumentIcon className={className} />;
    case "calc":
      return <CalculatorIcon className={className} />;
    case "safety":
      return <ShieldIcon className={className} />;
    case "ops":
      return <BoxIcon className={className} />;
  }
}

interface CategoryCardProps {
  category: Category;
  index: number;
  getStatus: (slug: string) => LessonStatus;
  progress: { completed: number; total: number };
}

export function CategoryCard({ category, index, getStatus, progress }: CategoryCardProps) {
  const palette = palettes[category.palette];
  const lessons = getCategoryLessons(category.name);
  const { completed, total } = progress;
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className={`rounded-3xl border p-5 shadow-sm ${palette.card}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${palette.soft}`}
          >
            <CategoryIcon name={category.icon} />
          </span>
          <div className="min-w-0">
            <h2 className={`truncate text-lg font-extrabold ${palette.text}`}>
              {category.name}
            </h2>
            <p className="truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {category.description}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs font-extrabold tabular-nums text-zinc-500 dark:text-zinc-400">
          {completed}/{total}
        </span>
      </header>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.1 + 0.3 }}
          className={`h-full rounded-full ${palette.solid}`}
        />
      </div>

      <div className="relative mt-6">
        <div
          className={`absolute bottom-3 left-[22px] top-3 w-1 rounded-full ${palette.rail}`}
        />
        <div className="flex flex-col gap-5">
          {lessons.map((lesson, lessonIndex) => (
            <LessonNode
              key={lesson.slug}
              lesson={lesson}
              status={getStatus(lesson.slug)}
              palette={palette}
              delay={0.25 + lessonIndex * 0.06}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
