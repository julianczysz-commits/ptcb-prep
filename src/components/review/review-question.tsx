"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { AnswerOption, type AnswerState } from "@/components/lesson/answer-option";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/primary-button";
import type { Question } from "@/data/types";

interface ReviewQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  onClose: () => void;
}

function ReviewFeedback({
  correct,
  explanation,
  onContinue,
  continueLabel,
}: {
  correct: boolean;
  explanation: string;
  onContinue: () => void;
  continueLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`rounded-3xl border-2 p-5 ${
        correct
          ? "border-brand bg-brand-soft dark:bg-brand/15"
          : "border-berry bg-berry/10"
      }`}
    >
      <div className="flex items-center gap-2">
        {correct ? (
          <CheckCircleIcon className="h-6 w-6 text-brand-strong" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-berry" />
        )}
        <span
          className={`text-lg font-extrabold ${
            correct ? "text-brand-strong" : "text-berry"
          }`}
        >
          {correct ? "Correct!" : "Not quite"}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">
        {explanation}
      </p>

      <PrimaryButton onClick={onContinue} className="mt-4">
        {continueLabel}
      </PrimaryButton>
    </motion.div>
  );
}

export function ReviewQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswered,
  onNext,
  onClose,
}: ReviewQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const answered = selectedId !== null;
  const isCorrect = answered && selectedId === question.correctOptionId;
  const isLast = questionNumber === totalQuestions;

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelectedId(optionId);
    onAnswered(optionId === question.correctOptionId);
  }

  function stateFor(optionId: string): AnswerState {
    if (!answered) return "idle";
    if (optionId === question.correctOptionId) return "correct";
    if (optionId === selectedId) return "incorrect";
    return "dimmed";
  }

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
          aria-label="Exit review"
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

      <div className="flex flex-1 flex-col justify-center pb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand">
          {question.category}
        </span>

        <h2 className="mt-2 text-2xl font-extrabold leading-snug text-zinc-900 dark:text-zinc-50">
          {question.prompt}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={option.id}
              letter={String.fromCharCode(65 + index)}
              text={option.text}
              state={stateFor(option.id)}
              disabled={answered}
              onSelect={() => handleSelect(option.id)}
            />
          ))}
        </div>
      </div>

      {answered && (
        <div className="pb-6">
          <ReviewFeedback
            correct={isCorrect}
            explanation={question.explanation}
            continueLabel={isLast ? "Finish Review" : "Continue"}
            onContinue={onNext}
          />
        </div>
      )}
    </motion.div>
  );
}
