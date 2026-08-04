"use client";

import { motion } from "motion/react";

import { TrophyIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/primary-button";

export interface AchievementUnlockProps {
  name: string;
  description: string;
  icon: string;
  onClose: () => void;
}

export function AchievementUnlock({
  name,
  description,
  icon,
  onClose,
}: AchievementUnlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Achievement unlocked: ${name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 px-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-8 text-center shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
          className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft text-5xl dark:bg-brand/15"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: [0.6, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0 rounded-full bg-brand/20"
          />
          <span aria-hidden className="relative">{icon}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
            Achievement unlocked
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {name}
          </h2>
          <p className="mt-2 text-base font-medium text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="mt-8"
        >
          <PrimaryButton onClick={onClose}>
            <TrophyIcon className="h-5 w-5" />
            Continue
          </PrimaryButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
