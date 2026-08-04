"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { CheckCircleIcon, TargetIcon } from "@/components/icons";
import { useUser } from "@/hooks/useUser";
import { getOrCreateDailyGoal, type DailyGoal } from "@/lib/dailyGoals";

function goalDescription(goal: DailyGoal) {
  if (goal.goal_type === "lesson") {
    return `Complete ${goal.target} lesson${goal.target === 1 ? "" : "s"} today`;
  }
  return `${goal.goal_type} goal: ${goal.progress}/${goal.target}`;
}

export function DailyGoal() {
  const { user, loading: userLoading } = useUser();
  const [goal, setGoal] = useState<DailyGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadGoal() {
      if (!user) {
        if (active) {
          setGoal(null);
          setLoading(false);
        }
        return;
      }

      const result = await getOrCreateDailyGoal(user.id);

      if (!active) return;

      if (result.success) {
        setGoal(result.goal);
      } else {
        console.warn("Failed to load daily goal:", result.error);
      }
      setLoading(false);
    }

    loadGoal();

    return () => {
      active = false;
    };
  }, [user]);

  const ready = !userLoading && !loading;
  const progressPercent =
    goal && goal.target > 0 ? Math.min(100, (goal.progress / goal.target) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-flame via-orange-500 to-berry p-5 text-white shadow-lg shadow-orange-500/20"
    >
      {!ready ? (
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded-lg bg-white/30" />
          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-white/30" />
          <div className="h-2.5 w-full animate-pulse rounded-full bg-white/30" />
        </div>
      ) : !goal ? (
        <div className="flex items-center gap-2">
          <TargetIcon className="h-5 w-5" />
          <p className="text-sm font-extrabold">Log in to track your daily goal</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <TargetIcon className="h-5 w-5" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-100">
              Daily Goal
            </span>
            {goal.completed && (
              <span className="ml-auto flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-extrabold backdrop-blur-sm">
                <CheckCircleIcon className="h-3.5 w-3.5" />
                Done
              </span>
            )}
          </div>

          <h2 className="mt-3 text-xl font-extrabold leading-snug">
            {goalDescription(goal)}
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full bg-white"
              />
            </div>
            <span className="text-sm font-extrabold tabular-nums">
              {goal.progress}/{goal.target}
            </span>
          </div>
        </>
      )}
    </motion.section>
  );
}
