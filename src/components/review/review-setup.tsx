"use client";

import { motion } from "motion/react";

import { ArrowRightIcon, LightbulbIcon, PlayIcon } from "@/components/icons";
import { questions } from "@/data/questions";
import { EXAM_CATEGORIES } from "@/lib/exam";

export type ReviewFilter = "all" | "missed" | (typeof EXAM_CATEGORIES)[number];

interface ReviewSetupProps {
  loggedIn: boolean;
  missedCount: number;
  accuracyPercent: number | null;
  onStart: (filter: ReviewFilter) => void;
  onClose: () => void;
}

const FILTER_LABELS: Record<string, string> = {
  all: "All Questions",
  missed: "Missed Questions",
};

function TopicRow({
  label,
  count,
  onClick,
}: {
  label: string;
  count: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left transition-colors hover:border-brand hover:bg-brand-soft/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-brand/10"
    >
      <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
        {label}
      </span>
      <span className="flex items-center gap-2">
        <span className="text-sm font-extrabold tabular-nums text-zinc-500 dark:text-zinc-400">
          {count}
        </span>
        <ArrowRightIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
      </span>
    </motion.button>
  );
}

export function ReviewSetup({
  loggedIn,
  missedCount,
  accuracyPercent,
  onStart,
  onClose,
}: ReviewSetupProps) {
  const totalQuestions = questions.length;

  function countFor(category: string) {
    return questions.filter((question) => question.category === category).length;
  }

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
          className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-soft dark:bg-brand/15"
        >
          <LightbulbIcon className="h-10 w-10 text-brand-strong" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
            Review Mode
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50">
            Practice without pressure
          </h1>
          <p className="mt-3 text-base font-medium text-zinc-600 dark:text-zinc-400">
            Get instant feedback with the correct answer and a full explanation
            after every question.
          </p>
        </motion.div>

        {accuracyPercent !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Your review accuracy
            </span>
            <span className="text-base font-extrabold tabular-nums text-brand">
              {accuracyPercent}%
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mt-6 flex flex-col gap-3"
        >
          <TopicRow
            label={FILTER_LABELS.all}
            count={String(totalQuestions)}
            onClick={() => onStart("all")}
          />

          {loggedIn ? (
            <TopicRow
              label={FILTER_LABELS.missed}
              count={missedCount > 0 ? String(missedCount) : "0"}
              onClick={() => onStart("missed")}
            />
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 opacity-60 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="text-base font-bold text-zinc-500 dark:text-zinc-400">
                Missed Questions
              </span>
              <span className="text-sm font-extrabold text-zinc-400 dark:text-zinc-500">
                Log in to track
              </span>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3">
            {EXAM_CATEGORIES.map((category) => (
              <TopicRow
                key={category}
                label={category}
                count={String(countFor(category))}
                onClick={() => onStart(category)}
              />
            ))}
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
          onClick={() => onStart("all")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
        >
          <PlayIcon className="h-5 w-5" />
          Practice All Questions
        </motion.button>

        <button
          onClick={onClose}
          className="w-full rounded-full px-6 py-3 text-base font-extrabold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}
