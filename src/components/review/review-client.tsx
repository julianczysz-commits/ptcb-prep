"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";

import {
  ReviewComplete,
} from "@/components/review/review-complete";
import {
  ReviewQuestion,
} from "@/components/review/review-question";
import {
  ReviewSetup,
  type ReviewFilter,
} from "@/components/review/review-setup";
import { questions } from "@/data/questions";
import type { Question } from "@/data/types";
import { useReviewHistory } from "@/hooks/useReviewHistory";
import { useUser } from "@/hooks/useUser";
import { recordReviewAnswer } from "@/lib/exam-results";
import { EXAM_CATEGORIES, shuffle } from "@/lib/exam";

type Phase = "setup" | "question" | "complete";

export function ReviewClient({ initialFilter }: { initialFilter?: string }) {
  const router = useRouter();
  const { user } = useUser();
  const { loading, missedIds, totalAttempts, correctAttempts } =
    useReviewHistory();

  const [phase, setPhase] = useState<Phase>("setup");
  const [deck, setDeck] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const buildPool = useCallback(
    (selected: ReviewFilter): Question[] => {
      if (selected === "all") {
        return questions;
      }
      if (selected === "missed") {
        return questions.filter((question) => missedIds.has(question.id));
      }
      return questions.filter((question) => question.category === selected);
    },
    [missedIds],
  );

  useEffect(() => {
    let active = true;

    async function applyInitialFilter() {
      if (!initialFilter || loading) return;
      if (
        initialFilter === "all" ||
        initialFilter === "missed" ||
        (EXAM_CATEGORIES as readonly string[]).includes(initialFilter)
      ) {
        if (initialFilter === "missed" && !user) return;
        const selected = initialFilter as ReviewFilter;
        const pool = buildPool(selected);
        if (pool.length === 0 || !active) return;
        setDeck(shuffle(pool));
        setIndex(0);
        setCorrectCount(0);
        setPhase("question");
      }
    }

    applyInitialFilter();

    return () => {
      active = false;
    };
  }, [initialFilter, loading, user, buildPool]);

  function startWithFilter(selected: ReviewFilter) {
    const pool = buildPool(selected);
    if (pool.length === 0) {
      setPhase("setup");
      return;
    }

    setDeck(shuffle(pool));
    setIndex(0);
    setCorrectCount(0);
    setPhase("question");
  }

  const currentQuestion = deck[index];
  const totalQuestions = deck.length;

  const accuracyPercent = useMemo(() => {
    if (totalAttempts === 0) return null;
    return Math.round((correctAttempts / totalAttempts) * 100);
  }, [totalAttempts, correctAttempts]);

  function handleClose() {
    router.push("/");
  }

  function handleAnswered(correct: boolean) {
    if (correct) {
      setCorrectCount((count) => count + 1);
    }
    if (!user || !currentQuestion) return;
    void recordReviewAnswer({
      userId: user.id,
      questionId: currentQuestion.id,
      correct,
    }).then((result) => {
      if (!result.success) {
        console.warn("Failed to record review answer:", result.error);
      }
    });
  }

  function handleNext() {
    if (index + 1 < totalQuestions) {
      setIndex((current) => current + 1);
    } else {
      setPhase("complete");
    }
  }

  function handleReviewAgain() {
    setPhase("setup");
  }

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pb-16">
        <div className="h-20 w-20 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4">
      <AnimatePresence mode="wait">
        {phase === "setup" && (
          <ReviewSetup
            key="setup"
            loggedIn={user !== null}
            missedCount={missedIds.size}
            accuracyPercent={accuracyPercent}
            onStart={startWithFilter}
            onClose={handleClose}
          />
        )}

        {phase === "question" && currentQuestion && (
          <ReviewQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={index + 1}
            totalQuestions={totalQuestions}
            onAnswered={handleAnswered}
            onNext={handleNext}
            onClose={handleClose}
          />
        )}

        {phase === "complete" && (
          <ReviewComplete
            key="complete"
            correctCount={correctCount}
            totalQuestions={totalQuestions}
            onReviewAgain={handleReviewAgain}
            onHome={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
