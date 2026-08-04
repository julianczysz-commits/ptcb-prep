"use client";

import { motion } from "motion/react";

import {
  ArrowRightIcon,
  ClockIcon,
  DocumentIcon,
  PlayIcon,
  RotateIcon,
  TargetIcon,
} from "@/components/icons";
import { EXAM_CATEGORIES, EXAM_TOTAL_QUESTIONS } from "@/lib/exam";

interface ExamSetupProps {
  readinessPercent: number;
  hasSavedSession: boolean;
  onStart: () => void;
  onResume: () => void;
  onClose: () => void;
}

export function ExamSetup({
  readinessPercent,
  hasSavedSession,
  onStart,
  onResume,
  onClose,
}: ExamSetupProps) {
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
          <DocumentIcon className="h-10 w-10 text-brand-strong" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
            PTCE Practice Exam
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50">
            Ready to test yourself?
          </h1>
          <p className="mt-3 text-base font-medium text-zinc-600 dark:text-zinc-400">
            Simulate the real Pharmacy Technician Certification Exam with a
            randomized, timed practice test. You won&apos;t see correct answers
            until the end.
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
              Questions
            </span>
            <span className="text-base font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
              {EXAM_TOTAL_QUESTIONS}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Recommended time
            </span>
            <span className="flex items-center gap-1.5 text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              <ClockIcon className="h-5 w-5 text-brand" />
              2 hours
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                Topics covered
              </span>
              <TargetIcon className="h-5 w-5 text-brand" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXAM_CATEGORIES.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-extrabold text-brand-strong dark:bg-brand/15"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
              Exam readiness
            </span>
            <span className="text-base font-extrabold tabular-nums text-brand">
              {readinessPercent}%
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        className="flex flex-col gap-3 pb-6"
      >
        {hasSavedSession && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onResume}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-6 py-4 text-base font-extrabold text-brand transition-colors hover:bg-brand-soft/40 dark:bg-transparent dark:hover:bg-brand/10"
          >
            <RotateIcon className="h-5 w-5" />
            Resume in-progress exam
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
        >
          <PlayIcon className="h-5 w-5" />
          Start Exam
          <ArrowRightIcon className="h-5 w-5" />
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
