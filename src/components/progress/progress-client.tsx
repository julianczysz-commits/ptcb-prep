"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import {
  BoltIcon,
  CheckIcon,
  FlameIcon,
  LearnIcon,
  ProgressIcon,
  TargetIcon,
} from "@/components/icons";
import { useProfile } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";
import { lessons, type Lesson } from "@/lib/lesson-data";
import { calculateStreak } from "@/lib/streak";
import { supabase } from "@/lib/supabase";

type LessonRecord = { lesson_id: string; score: number };

const lessonBySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="rounded-3xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
        {icon}
        <span className="text-[11px] font-extrabold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </motion.div>
  );
}

export function ProgressClient() {
  const { user, loading: userLoading } = useUser();
  const { xp, loading: profileLoading } = useProfile();
  const [records, setRecords] = useState<LessonRecord[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [streakLoading, setStreakLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadRecords() {
      if (!user) {
        if (active) {
          setRecords([]);
          setRecordsLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id, score")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (!active) return;

      if (error) {
        console.warn("Failed to load lesson progress:", error.message);
        setRecords([]);
      } else {
        setRecords(
          (data ?? []).filter((row): row is LessonRecord => Boolean(row.lesson_id)),
        );
      }
      setRecordsLoading(false);
    }

    loadRecords();

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    let active = true;

    async function loadStreak() {
      if (!user) {
        if (active) {
          setStreak(0);
          setStreakLoading(false);
        }
        return;
      }

      const value = await calculateStreak(user.id);
      if (!active) return;
      setStreak(value);
      setStreakLoading(false);
    }

    loadStreak();

    return () => {
      active = false;
    };
  }, [user]);

  const loading = userLoading || profileLoading || recordsLoading || streakLoading;

  const completedLessons = records
    .map((record) => ({ lesson: lessonBySlug.get(record.lesson_id), score: record.score }))
    .filter(
      (entry): entry is { lesson: Lesson; score: number } => Boolean(entry.lesson),
    )
    .sort((a, b) => {
      const categoryOrder = a.lesson.category.localeCompare(b.lesson.category);
      return categoryOrder !== 0 ? categoryOrder : a.lesson.order - b.lesson.order;
    });

  const accuracy =
    records.length > 0
      ? Math.round(records.reduce((sum, record) => sum + record.score, 0) / records.length)
      : null;

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 pb-32 pt-6">
      <div className="flex items-center gap-2">
        <ProgressIcon className="h-5 w-5 text-brand" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
          PTCB Pro
        </span>
      </div>
      <h1 className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Progress</h1>

      <div className="mt-6 flex flex-col gap-5">
        {!userLoading && !user ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              Log in to see your progress
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Track your lessons, XP, streak, and accuracy.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
            >
              Log in
            </Link>
          </motion.section>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<LearnIcon className="h-4 w-4 text-brand" />}
                label="Lessons"
                value={loading ? "…" : String(completedLessons.length)}
                delay={0.1}
              />
              <StatCard
                icon={<BoltIcon className="h-4 w-4 text-flame" />}
                label="XP"
                value={loading ? "…" : String(xp)}
                delay={0.15}
              />
              <StatCard
                icon={<FlameIcon className="h-4 w-4 text-flame" />}
                label="Streak"
                value={loading ? "…" : String(streak)}
                delay={0.2}
              />
              <StatCard
                icon={<TargetIcon className="h-4 w-4 text-flame" />}
                label="Accuracy"
                value={loading ? "…" : accuracy === null ? "—" : `${accuracy}%`}
                delay={0.25}
              />
            </div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Completed Lessons
                </span>
                <span className="text-sm font-extrabold tabular-nums text-brand">
                  {completedLessons.length}
                </span>
              </div>

              {loading ? (
                <div className="mt-4 space-y-3">
                  {[0, 1].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : completedLessons.length === 0 ? (
                <p className="mt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  No completed lessons yet. Start learning to build your accuracy.
                </p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {completedLessons.map(({ lesson, score }) => (
                    <div
                      key={lesson.slug}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand dark:bg-brand/15">
                        <CheckIcon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-zinc-900 dark:text-zinc-50">
                          {lesson.title}
                        </p>
                        <p className="truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {lesson.category}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-extrabold tabular-nums text-brand">
                        {score}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          </>
        )}
      </div>
    </main>
  );
}
