"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import { AchievementUnlock } from "@/components/AchievementUnlock";
import { LessonComplete } from "@/components/lesson/lesson-complete";
import { LessonIntro } from "@/components/lesson/lesson-intro";
import { QuestionCard } from "@/components/lesson/question-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useUser } from "@/hooks/useUser";
import {
  checkAchievements,
  type AchievementDefinition,
} from "@/lib/achievements";
import { recordDailyActivity } from "@/lib/daily-activity";
import { incrementDailyGoal } from "@/lib/dailyGoals";
import { calculateExamReadiness } from "@/lib/exam-readiness";
import { getLessonQuestions, lessons, type Lesson } from "@/lib/lesson-data";
import { recordLessonCompletion } from "@/lib/progress";
import { awardXP } from "@/lib/xp";

type Phase = "intro" | "question" | "complete";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { user } = useUser();
  const { completedIds } = useLessonProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    AchievementDefinition[]
  >([]);
  const [achievementIndex, setAchievementIndex] = useState(0);
  const savingRef = useRef(false);

  const questions = getLessonQuestions(lesson);
  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  const alreadyCompleted = completedIds.has(lesson.slug);
  const beforeCount = completedIds.size;
  const afterCount = user && !alreadyCompleted ? beforeCount + 1 : beforeCount;
  const readinessBefore = calculateExamReadiness({
    completedLessons: beforeCount,
    totalLessons: lessons.length,
  });
  const readinessAfter = calculateExamReadiness({
    completedLessons: afterCount,
    totalLessons: lessons.length,
  });

  function handleClose() {
    router.push("/learn");
  }

  function handleStart() {
    setPhase("question");
  }

  function handleAnswered(correct: boolean) {
    if (!correct) return;
    setEarnedXp((xp) => xp + currentQuestion.xpReward);
    setCorrectCount((count) => count + 1);
  }

  function handleNext() {
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((index) => index + 1);
    } else {
      completeLesson();
    }
  }

  async function completeLesson() {
    setPhase("complete");

    if (!user || savingRef.current) return;

    savingRef.current = true;

    const score = Math.round((correctCount / totalQuestions) * 100);

    const progressResult = await recordLessonCompletion({
      userId: user.id,
      lessonId: lesson.slug,
      score,
    });

    if (!progressResult.success) {
      console.warn("Failed to save lesson progress:", progressResult.error);
    }

    const activityResult = await recordDailyActivity({
      userId: user.id,
      xpEarned: earnedXp,
    });

    if (!activityResult.success) {
      console.warn("Failed to record daily activity:", activityResult.error);
    }

    const goalResult = await incrementDailyGoal(user.id);

    if (!goalResult.success) {
      console.warn("Failed to update daily goal:", goalResult.error);
    }

    if (earnedXp > 0) {
      const xpResult = await awardXP(user.id, earnedXp);
      if (!xpResult.success) {
        console.warn("Failed to award lesson XP:", xpResult.error);
      }
    }

    const achievementResult = await checkAchievements(user.id);

    if (!achievementResult.success) {
      console.warn("Failed to check achievements:", achievementResult.error);
      return;
    }

    if (achievementResult.unlocked.length > 0) {
      setUnlockedAchievements(achievementResult.unlocked);
      setAchievementIndex(0);
    }
  }

  const currentUnlock = unlockedAchievements[achievementIndex];

  function handleDismissAchievement() {
    if (achievementIndex + 1 < unlockedAchievements.length) {
      setAchievementIndex((index) => index + 1);
    } else {
      setUnlockedAchievements([]);
      setAchievementIndex(0);
    }
  }

  function handleKeepLearning() {
    router.push("/learn");
  }

  function handleHome() {
    router.push("/");
  }

  if (totalQuestions === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-16 text-center">
        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
          {lesson.title}
        </h1>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          This lesson isn&apos;t available yet. Check back soon.
        </p>
        <PrimaryButton onClick={handleClose}>Back to Learn</PrimaryButton>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <LessonIntro
              key="intro"
              lesson={lesson}
              onStart={handleStart}
              onClose={handleClose}
            />
          )}

          {phase === "question" && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={questionIndex + 1}
              totalQuestions={totalQuestions}
              onAnswered={handleAnswered}
              onNext={handleNext}
              onClose={handleClose}
            />
          )}

          {phase === "complete" && (
            <LessonComplete
              key="complete"
              xpEarned={earnedXp}
              correctCount={correctCount}
              totalQuestions={totalQuestions}
              readinessBefore={readinessBefore}
              readinessAfter={readinessAfter}
              onKeepLearning={handleKeepLearning}
              onHome={handleHome}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {currentUnlock && (
          <AchievementUnlock
            key={currentUnlock.id}
            name={currentUnlock.name}
            description={currentUnlock.description}
            icon={currentUnlock.icon ?? "🏆"}
            onClose={handleDismissAchievement}
          />
        )}
      </AnimatePresence>
    </>
  );
}
