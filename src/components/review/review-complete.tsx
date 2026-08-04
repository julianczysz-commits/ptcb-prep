"use client";

import { motion } from "motion/react";

import { CheckCircleIcon, PlayIcon, XCircleIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/primary-button";

interface ReviewCompleteProps {
  correctCount: number;
  totalQuestions: number;
  onReviewAgain: () => void;
  onHome: () => void;
}

export function ReviewComplete({
  correctCount,
  totalQuestions,
  onReviewAgain,
  onHome,
}: ReviewCompleteProps) {
  const accuracy = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
  const incorrect = totalQuestions - correctCount;

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
          <CheckCircleIcon className="h-12 w-12 text-brand-strong" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            Review complete!
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-600 dark:text-zinc-400">
            Every answer was saved to your review history.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="flex w-full flex-col gap-3"
        >
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Accuracy
            </span>
            <span className="text-2xl font-extrabold tabular-nums text-brand">
              {accuracy}%
            </span>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                <CheckCircleIcon className="h-5 w-5 text-brand" />
                Correct
              </span>
              <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
                {correctCount}
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        className="flex flex-col gap-3 pb-6"
      >
        <PrimaryButton onClick={onReviewAgain}>
          <PlayIcon className="h-5 w-5" />
          Review Again
        </PrimaryButton>
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
