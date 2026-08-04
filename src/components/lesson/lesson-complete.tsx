"use client";

import { motion } from "motion/react";

import { BoltIcon, SparklesIcon, TrophyIcon } from "@/components/icons";
import { useProfile } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";

interface LessonCompleteProps {
  xpEarned: number;
  correctCount: number;
  totalQuestions: number;
  readinessBefore: number;
  readinessAfter: number;
  onKeepLearning: () => void;
  onHome: () => void;
}

export function LessonComplete({
  xpEarned,
  correctCount,
  totalQuestions,
  readinessBefore,
  readinessAfter,
  onKeepLearning,
  onHome,
}: LessonCompleteProps) {
  const { username } = useProfile();
  const { user } = useUser();
  const name =
    username ?? user?.email?.split("@")[0] ?? "pharmacy student";
  const readinessBoost = Math.max(0, readinessAfter - readinessBefore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft dark:bg-brand/15"
        >
          <TrophyIcon className="h-12 w-12 text-brand-strong" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            Lesson complete!
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-600 dark:text-zinc-400">
            Great job, {name}. Your pharmacy skills are growing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="flex w-full flex-col gap-3"
        >
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              XP earned
            </span>
            <span className="flex items-center gap-1 text-base font-extrabold text-brand">
              <BoltIcon className="h-5 w-5" />
              +{xpEarned} XP
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Questions correct
            </span>
            <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
              {correctCount}/{totalQuestions}
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                Exam readiness
              </span>
              <span className="flex items-center gap-1 text-base font-extrabold text-brand">
                <SparklesIcon className="h-4 w-4" />
                +{readinessBoost}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                initial={{ width: `${readinessBefore}%` }}
                animate={{ width: `${readinessAfter}%` }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.55 }}
                className="h-full rounded-full bg-gradient-to-r from-brand-strong to-brand"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
        className="flex flex-col gap-3 pb-6"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onKeepLearning}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
        >
          Keep Learning
        </motion.button>
        <button
          onClick={onHome}
          className="w-full rounded-full px-6 py-3 text-base font-extrabold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}
