"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong disabled:opacity-50 ${className}`}
    >
      {children}
    </motion.button>
  );
}
