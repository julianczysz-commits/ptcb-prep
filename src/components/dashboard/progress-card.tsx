"use client";

import { motion } from "motion/react";

import { TrophyIcon } from "@/components/icons";
import { useExamReadiness } from "@/hooks/useExamReadiness";
import { useProfile, XP_PER_LEVEL } from "@/hooks/useProfile";

const RING_RADIUS = 30;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ReadinessRing({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="9"
            className="stroke-zinc-100 dark:stroke-zinc-800"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
            animate={{ strokeDashoffset: RING_CIRCUMFERENCE * (1 - percent / 100) }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="stroke-brand"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
          {percent}%
        </span>
      </div>
      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
        Exam ready
      </span>
    </div>
  );
}

export function ProgressCard() {
  const { level, xp, loading } = useProfile();
  const { percent: readinessPercent } = useExamReadiness();
  const percent = Math.min(100, Math.round((xp / XP_PER_LEVEL) * 100));

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="h-5 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-flame" />
              <span className="text-sm font-extrabold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Level {level}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
                  className="flex h-full items-center rounded-full bg-gradient-to-r from-brand-strong to-brand"
                />
              </div>
              <span className="text-sm font-extrabold tabular-nums text-brand">
                {xp}/{XP_PER_LEVEL}
              </span>
            </div>

            <p className="mt-3 text-xs font-bold text-zinc-500 dark:text-zinc-400">
              {XP_PER_LEVEL - xp} XP to level {level + 1}
            </p>
          </div>

          <ReadinessRing percent={readinessPercent} />
        </div>
      )}
    </motion.section>
  );
}
