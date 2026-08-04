import type { CategoryPalette } from "@/data/learning-path";

export interface PaletteClasses {
  card: string;
  soft: string;
  solid: string;
  rail: string;
  text: string;
  border: string;
}

export const palettes: Record<CategoryPalette, PaletteClasses> = {
  rose: {
    card: "border-rose-200/60 bg-gradient-to-br from-rose-50 to-white dark:border-rose-900/60 dark:from-rose-950/50 dark:to-zinc-900",
    soft: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
    solid: "bg-rose-500",
    rail: "bg-rose-200 dark:bg-rose-900/60",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-300 dark:border-rose-700",
  },
  violet: {
    card: "border-violet-200/60 bg-gradient-to-br from-violet-50 to-white dark:border-violet-900/60 dark:from-violet-950/50 dark:to-zinc-900",
    soft: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    solid: "bg-violet-500",
    rail: "bg-violet-200 dark:bg-violet-900/60",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-300 dark:border-violet-700",
  },
  green: {
    card: "border-brand/30 bg-gradient-to-br from-brand-soft/60 to-white dark:border-brand/30 dark:from-brand/10 dark:to-zinc-900",
    soft: "bg-brand-soft text-brand-strong dark:bg-brand/15 dark:text-brand",
    solid: "bg-brand",
    rail: "bg-brand/25",
    text: "text-brand-strong dark:text-brand",
    border: "border-brand/50 dark:border-brand/40",
  },
  sky: {
    card: "border-sky-200/60 bg-gradient-to-br from-sky-50 to-white dark:border-sky-900/60 dark:from-sky-950/50 dark:to-zinc-900",
    soft: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
    solid: "bg-sky-500",
    rail: "bg-sky-200 dark:bg-sky-900/60",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-300 dark:border-sky-700",
  },
  amber: {
    card: "border-amber-200/60 bg-gradient-to-br from-amber-50 to-white dark:border-amber-900/60 dark:from-amber-950/50 dark:to-zinc-900",
    soft: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    solid: "bg-amber-500",
    rail: "bg-amber-200 dark:bg-amber-900/60",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-300 dark:border-amber-700",
  },
};
