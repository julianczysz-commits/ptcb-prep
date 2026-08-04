"use client";

import { motion } from "motion/react";

import { CheckCircleIcon, XCircleIcon } from "@/components/icons";

export type AnswerState = "idle" | "correct" | "incorrect" | "dimmed";

interface AnswerOptionProps {
  letter: string;
  text: string;
  state: AnswerState;
  disabled: boolean;
  onSelect: () => void;
}

const containerStyles: Record<AnswerState, string> = {
  idle: "border-zinc-200 bg-white hover:border-brand hover:bg-brand-soft/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-brand/10",
  correct:
    "border-brand bg-brand-soft dark:bg-brand/20",
  incorrect: "border-berry bg-berry/10",
  dimmed: "border-zinc-100 bg-zinc-50 opacity-50 dark:border-zinc-800/50 dark:bg-zinc-800/40",
};

const letterStyles: Record<AnswerState, string> = {
  idle: "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400",
  correct: "border-brand bg-brand text-white",
  incorrect: "border-berry bg-berry text-white",
  dimmed: "border-zinc-200 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500",
};

export function AnswerOption({
  letter,
  text,
  state,
  disabled,
  onSelect,
}: AnswerOptionProps) {
  const showCheck = state === "correct";
  const showX = state === "incorrect";

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      animate={
        state === "correct"
          ? { scale: [1, 1.03, 1] }
          : state === "incorrect"
            ? { x: [0, -6, 6, -4, 4, 0] }
            : undefined
      }
      transition={{ duration: 0.35 }}
      onClick={onSelect}
      disabled={disabled}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-colors ${containerStyles[state]}`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors ${letterStyles[state]}`}
      >
        {letter}
      </span>
      <span className="flex-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
        {text}
      </span>
      {showCheck && <CheckCircleIcon className="h-6 w-6 shrink-0 text-brand-strong" />}
      {showX && <XCircleIcon className="h-6 w-6 shrink-0 text-berry" />}
    </motion.button>
  );
}
