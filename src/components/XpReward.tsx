"use client";

import { motion } from "motion/react";

import { BoltIcon } from "@/components/icons";

export interface XpRewardProps {
  xp: number;
  onComplete?: () => void;
}

export function XpReward({ xp, onComplete }: XpRewardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
    >
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.15, 1], opacity: [0, 1, 1], y: [0, -10, -72] }}
        transition={{ duration: 1.1, times: [0, 0.25, 1], ease: "easeOut" }}
        onAnimationComplete={onComplete}
        className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-b from-brand to-brand-strong px-5 py-2.5 text-xl font-extrabold text-white shadow-lg shadow-brand/40 ring-4 ring-brand-soft dark:ring-brand/20"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: [0, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20"
        />
        <BoltIcon className="h-6 w-6 text-white" />
        +{xp} XP
      </motion.span>
    </motion.div>
  );
}
