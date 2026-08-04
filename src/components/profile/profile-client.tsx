"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import {
  BoltIcon,
  FlameIcon,
  LearnIcon,
  ProfileIcon,
  TrophyIcon,
} from "@/components/icons";
import { useAchievements } from "@/hooks/useAchievements";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useProfile, XP_PER_LEVEL } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";
import { calculateStreak } from "@/lib/streak";
import { supabase } from "@/lib/supabase";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="rounded-3xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
        {icon}
        <span className="text-[11px] font-extrabold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tabular-nums text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </motion.div>
  );
}

export function ProfileClient() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { username, xp, level, loading: profileLoading } = useProfile();
  const { completedIds, loading: lessonsLoading } = useLessonProgress();
  const { achievements, loading: achievementsLoading } = useAchievements();
  const [streak, setStreak] = useState(0);
  const [streakLoading, setStreakLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadStreak() {
      if (!user) {
        if (active) {
          setStreak(0);
          setStreakLoading(false);
        }
        return;
      }

      const value = await calculateStreak(user.id);
      if (!active) return;
      setStreak(value);
      setStreakLoading(false);
    }

    loadStreak();

    return () => {
      active = false;
    };
  }, [user]);

  const loading = userLoading || profileLoading || lessonsLoading || streakLoading;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const metadata = user?.user_metadata as Record<string, unknown> | undefined;
  const metadataName = metadata?.name ?? metadata?.full_name;
  const email = user?.email ?? null;
  const name =
    username ?? (typeof metadataName === "string" ? metadataName : null) ??
    email?.split("@")[0] ??
    null;
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  const percent = Math.min(100, Math.round((xp / XP_PER_LEVEL) * 100));

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 pb-32 pt-6">
      <div className="flex items-center gap-2">
        <ProfileIcon className="h-5 w-5 text-brand" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
          PTCB Pro
        </span>
      </div>
      <h1 className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Profile</h1>

      <div className="mt-6 flex flex-col gap-5">
        {!userLoading && !user ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
              Log in to see your profile
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Track your XP, streak, and achievements.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong"
            >
              Log in
            </Link>
          </motion.section>
        ) : (
          <>
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-2/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-strong to-brand text-2xl font-extrabold text-white shadow-lg shadow-brand/30">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                      {name ?? "User"}
                    </h2>
                    {email && (
                      <p className="mt-0.5 truncate text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                        {email}
                      </p>
                    )}
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-extrabold text-brand-strong dark:bg-brand/15 dark:text-brand">
                      <TrophyIcon className="h-3.5 w-3.5" />
                      Level {level}
                    </span>
                  </div>
                </div>
              )}
            </motion.section>

            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<BoltIcon className="h-4 w-4 text-flame" />}
                label="XP"
                value={loading ? "…" : String(xp)}
                delay={0.1}
              />
              <StatCard
                icon={<TrophyIcon className="h-4 w-4 text-flame" />}
                label="Level"
                value={loading ? "…" : String(level)}
                delay={0.15}
              />
              <StatCard
                icon={<FlameIcon className="h-4 w-4 text-flame" />}
                label="Streak"
                value={loading ? "…" : String(streak)}
                delay={0.2}
              />
              <StatCard
                icon={<LearnIcon className="h-4 w-4 text-brand" />}
                label="Lessons"
                value={loading ? "…" : String(completedIds.size)}
                delay={0.25}
              />
            </div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Level Progress
                </span>
                <span className="text-sm font-extrabold tabular-nums text-brand">
                  {xp}/{XP_PER_LEVEL} XP
                </span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-strong to-brand"
                />
              </div>
              <p className="mt-3 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {Math.max(0, XP_PER_LEVEL - xp)} XP to level {level + 1}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Achievements
                </span>
                <span className="text-sm font-extrabold tabular-nums text-brand">
                  {achievements.length}
                </span>
              </div>

              {achievementsLoading ? (
                <div className="mt-4 space-y-3">
                  {[0, 1].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : achievements.length === 0 ? (
                <p className="mt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  No achievements yet. Complete lessons to earn your first one!
                </p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.achievementId}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-2xl dark:bg-brand/15">
                        {achievement.icon ?? "🏆"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-zinc-900 dark:text-zinc-50">
                          {achievement.name}
                        </p>
                        <p className="truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {achievement.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                        {formatDate(achievement.unlockedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              className="flex w-full items-center justify-center rounded-full border-2 border-zinc-200 px-6 py-3.5 text-base font-extrabold text-zinc-500 transition-colors hover:border-berry hover:bg-berry/5 hover:text-berry dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-berry dark:hover:bg-berry/10"
            >
              Log out
            </motion.button>
          </>
        )}
      </div>
    </main>
  );
}
