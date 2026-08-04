"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { AnswerOption, type AnswerState } from "@/components/lesson/answer-option";
import { FeedbackBanner } from "@/components/lesson/feedback-banner";
import { XpReward } from "@/components/XpReward";
import { XMarkIcon } from "@/components/icons";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  onClose: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswered,
  onNext,
  onClose,
}: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);
  const answered = selectedId !== null;
  const isCorrect = answered && selectedId === question.correctOptionId;

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelectedId(optionId);
    if (optionId === question.correctOptionId) {
      setShowReward(true);
    }
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
      {showReward && (
        <XpReward xp={question.xpReward} onComplete={() => setShowReward(false)} />
      )}

      <div className="flex items-center gap-3 py-4">
        <button
          onClick={onClose}
          className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Close lesson"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
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
        <h2 className="text-2xl font-extrabold leading-snug text-zinc-900 dark:text-zinc-50">
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
          <FeedbackBanner
            correct={isCorrect}
            explanation={question.explanation}
            xpReward={question.xpReward}
            continueLabel={
              questionNumber === totalQuestions ? "Finish" : "Continue"
            }
            onContinue={onNext}
          />
        </div>
      )}
    </motion.div>
  );
}
