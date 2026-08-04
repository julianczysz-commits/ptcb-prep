"use client";

import { motion } from "motion/react";

import { ClockIcon, XMarkIcon } from "@/components/icons";
import type { Question } from "@/data/types";
import { formatDuration } from "@/lib/exam";

interface ExamAnswerOptionProps {
  letter: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

export function ExamAnswerOption({
  letter,
  text,
  selected,
  onSelect,
}: ExamAnswerOptionProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
        selected
          ? "border-brand bg-brand-soft/40 dark:bg-brand/10"
          : "border-zinc-200 bg-white hover:border-brand hover:bg-brand-soft/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-brand/10"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors ${
          selected
            ? "border-brand bg-brand text-white"
            : "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
        }`}
      >
        {letter}
      </span>
      <span className="flex-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
        {text}
      </span>
    </motion.button>
  );
}

interface ExamQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  elapsedSeconds: number;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onClose: () => void;
}

export function ExamQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  elapsedSeconds,
  onSelect,
  onNext,
  onClose,
}: ExamQuestionProps) {
  const answered = selectedOptionId !== null;
  const isLast = questionNumber === totalQuestions;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative flex flex-1 flex-col"
    >
      <div className="flex items-center gap-3 py-4">
        <button
          onClick={onClose}
          className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Exit exam"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-brand"
          />
        </div>
        <span className="text-xs font-extrabold tabular-nums text-zinc-500 dark:text-zinc-400">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-3">
        <ClockIcon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs font-extrabold tabular-nums text-zinc-500 dark:text-zinc-400">
          {formatDuration(elapsedSeconds)}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center pb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand">
          {question.category}
        </span>

        <h2 className="mt-2 text-2xl font-extrabold leading-snug text-zinc-900 dark:text-zinc-50">
          {question.prompt}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option, index) => (
            <ExamAnswerOption
              key={option.id}
              letter={String.fromCharCode(65 + index)}
              text={option.text}
              selected={selectedOptionId === option.id}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
      </div>

      <div className="pb-6">
        <motion.button
          whileTap={answered ? { scale: 0.96 } : undefined}
          onClick={onNext}
          disabled={!answered}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          {isLast ? "Finish Exam" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  );
}
