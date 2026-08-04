"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
  ArrowRightIcon,
  DocumentIcon,
  LightbulbIcon,
  TargetIcon,
} from "@/components/icons";
import { useExamReadiness } from "@/hooks/useExamReadiness";

export function ExamCard() {
  const { loading, percent } = useExamReadiness();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-strong via-brand to-sky-500 p-5 text-white shadow-lg shadow-brand/20"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/80">
          <DocumentIcon className="h-4 w-4" />
          PTCE Practice Exam
        </span>
        {loading ? (
          <span className="h-5 w-10 animate-pulse rounded-full bg-white/30" />
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-extrabold backdrop-blur-sm">
            <TargetIcon className="h-3.5 w-3.5" />
            {percent}% ready
          </span>
        )}
      </div>

      <h2 className="mt-3 text-xl font-extrabold leading-snug">
        Test your exam readiness
      </h2>
      <p className="mt-1 text-sm font-semibold text-white/80">
        A timed, randomized 90-question practice test with instant scoring and
        category breakdown.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link
            href="/exam"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-brand shadow-md transition-colors hover:bg-brand-soft"
          >
            Take Practice Exam
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>

        <Link
          href="/review"
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-white/10"
        >
          <LightbulbIcon className="h-4 w-4" />
          Review Mode
        </Link>
      </div>
    </motion.section>
  );
}
