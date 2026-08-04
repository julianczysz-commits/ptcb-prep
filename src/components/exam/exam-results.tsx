"use client";

import { motion } from "motion/react";

import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  RotateIcon,
  SparklesIcon,
  TrophyIcon,
  XCircleIcon,
} from "@/components/icons";
import {
  formatDuration,
  type ExamCategoryBreakdown,
  type ExamResult,
} from "@/lib/exam";

interface ExamResultsProps {
  result: ExamResult;
  categoryBreakdown: ExamCategoryBreakdown[];
  xpEarned: number;
  readinessPercent: number;
  onReviewMissed: () => void;
  onRetake: () => void;
  onHome: () => void;
}

export function ExamResults({
  result,
  categoryBreakdown,
  xpEarned,
  readinessPercent,
  onReviewMissed,
  onRetake,
  onHome,
}: ExamResultsProps) {
  const percent = result.score;
  const passed = percent >= 70;
  const incorrect = result.totalQuestions - result.correctAnswers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col pb-8">
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
          transition={{ delay: 0.2, duration: 0.35 }}
          className="mt-6 text-center"
        >
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {passed ? "Exam passed!" : "Exam complete"}
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-600 dark:text-zinc-400">
            {passed
              ? "Great work! You scored above the passing threshold."
              : "Keep practicing — you're closer than you think."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mt-6 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Score
            </span>
            <span
              className={`text-2xl font-extrabold tabular-nums ${
                passed ? "text-brand" : "text-berry"
              }`}
            >
              {percent}%
            </span>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                <CheckCircleIcon className="h-5 w-5 text-brand" />
                Correct
              </span>
              <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
                {result.correctAnswers}
              </span>
            </div>

            <div className="flex flex-1 items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                <XCircleIcon className="h-5 w-5 text-berry" />
                Incorrect
              </span>
              <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
                {incorrect}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Time spent
            </span>
            <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatDuration(result.timeSeconds)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              XP earned
            </span>
            <span className="flex items-center gap-1 text-base font-extrabold text-brand">
              <BoltIcon className="h-5 w-5" />
              +{xpEarned} XP
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                Category breakdown
              </span>
              <SparklesIcon className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {categoryBreakdown.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      {category.category}
                    </span>
                    <span className="text-sm font-extrabold tabular-nums text-zinc-500 dark:text-zinc-400">
                      {category.correct}/{category.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.round((category.correct / category.total) * 100)}%`,
                      }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
                      className="h-full rounded-full bg-brand"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                Exam readiness
              </span>
              <span className="text-base font-extrabold tabular-nums text-brand">
                {readinessPercent}%
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {passed
                ? "You're exam ready. Keep reviewing weak categories to stay sharp."
                : `Try to reach the 70% passing threshold. Review missed questions to improve.`}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        className="flex flex-col gap-3 pb-6"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onReviewMissed}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
        >
          Review Missed Questions
          <ArrowRightIcon className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onRetake}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-6 py-4 text-base font-extrabold text-brand transition-colors hover:bg-brand-soft/40 dark:bg-transparent dark:hover:bg-brand/10"
        >
          <RotateIcon className="h-5 w-5" />
          Retake Exam
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
