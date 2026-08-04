"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { motion } from "motion/react";

import { FlameIcon } from "@/components/icons";
import { useProfile } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function displayName(username: string | null, user: User) {
  if (username) return username;
  const metadata = user.user_metadata as Record<string, unknown> | undefined;
  const name = metadata?.full_name ?? metadata?.name;
  if (typeof name === "string" && name.trim()) return name.trim();
  return user.email?.split("@")[0] ?? "there";
}

export function Header() {
  const { user, loading: userLoading } = useUser();
  const { username, streak, loading: profileLoading } = useProfile();

  const loading = userLoading || (user !== null && profileLoading);
  const loggedIn = !userLoading && user !== null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex items-center justify-between gap-4"
    >
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
          PTCB Pro
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
          {loading ? (
            <span className="inline-block h-7 w-44 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          ) : loggedIn ? (
            `${greeting()}, ${displayName(username, user)}!`
          ) : (
            `${greeting()}! Ready to study?`
          )}
        </h1>
      </div>

      {loading ? (
        <div className="h-9 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      ) : loggedIn ? (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
          className="flex items-center gap-1.5 rounded-full bg-flame/10 px-3.5 py-2"
        >
          <FlameIcon className="h-5 w-5 text-flame" />
          <span className="text-base font-extrabold tabular-nums text-flame">{streak}</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
        >
          <Link
            href="/login"
            className="rounded-full border-2 border-brand px-5 py-2.5 text-sm font-extrabold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Log in
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
