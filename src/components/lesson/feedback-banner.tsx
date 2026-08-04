"use client";

import { motion } from "motion/react";

import { BoltIcon, CheckCircleIcon, XCircleIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/primary-button";

interface FeedbackBannerProps {
  correct: boolean;
  explanation: string;
  xpReward: number;
  onContinue: () => void;
  continueLabel: string;
}

export function FeedbackBanner({
  correct,
  explanation,
  xpReward,
  onContinue,
  continueLabel,
}: FeedbackBannerProps) {
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
        {correct && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-white">
            <BoltIcon className="h-3.5 w-3.5" />
            +{xpReward} XP
          </span>
        )}
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
