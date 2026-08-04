"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import { AchievementUnlock } from "@/components/AchievementUnlock";
import { ExamQuestion } from "@/components/exam/exam-question";
import { ExamResults } from "@/components/exam/exam-results";
import { ExamSetup } from "@/components/exam/exam-setup";
import { questions } from "@/data/questions";
import type { QuestionCategory } from "@/data/types";
import { useExamReadiness } from "@/hooks/useExamReadiness";
import { useUser } from "@/hooks/useUser";
import {
  checkAchievements,
  type AchievementDefinition,
} from "@/lib/achievements";
import {
  EXAM_XP_PER_CORRECT,
  selectExamQuestions,
  type ExamResult,
} from "@/lib/exam";
import {
  recordReviewAnswer,
  saveExamAttempt,
} from "@/lib/exam-results";
import { awardXP } from "@/lib/xp";

type Phase = "setup" | "question" | "results";

type SessionQuestion = {
  id: string;
  category: QuestionCategory;
};

type ExamSession = {
  questions: SessionQuestion[];
  answers: Record<string, string>;
  startedAt: number;
};

const STORAGE_KEY = "ptcb-exam-session";

function loadSession(): ExamSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ExamSession;
    if (
      !parsed ||
      !Array.isArray(parsed.questions) ||
      parsed.questions.length === 0 ||
      typeof parsed.startedAt !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(session: ExamSession) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage failures
  }
}

function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage failures
  }
}

export function ExamClient() {
  const router = useRouter();
  const { user } = useUser();
  const { percent: readinessPercent } = useExamReadiness();

  const [phase, setPhase] = useState<Phase>("setup");
  const [session, setSession] = useState<ExamSession | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    AchievementDefinition[]
  >([]);
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const savingRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const saved = loadSession();
      if (active && saved) {
        setSession(saved);
        setPhase("question");
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "question") return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const questionById = useMemo(
    () => new Map(questions.map((question) => [question.id, question])),
    [],
  );

  const currentQuestion = session
    ? questionById.get(session.questions[questionIndex]?.id)
    : undefined;
  const totalQuestions = session?.questions.length ?? 0;
  const elapsedSeconds = session
    ? Math.max(0, Math.round((now - session.startedAt) / 1000))
    : 0;

  function handleClose() {
    router.push("/");
  }

  function startExam() {
    const selected = selectExamQuestions();
    const next: ExamSession = {
      questions: selected.map((question) => ({
        id: question.id,
        category: question.category,
      })),
      answers: {},
      startedAt: Date.now(),
    };
    setSession(next);
    saveSession(next);
    setQuestionIndex(0);
    setPhase("question");
  }

  function handleSelect(optionId: string) {
    if (!session || !currentQuestion) return;
    const answers = { ...session.answers, [currentQuestion.id]: optionId };
    const next = { ...session, answers };
    setSession(next);
    saveSession(next);
  }

  function computeResult(): ExamResult {
    const total = session!.questions.length;
    let correct = 0;
    const breakdownMap = new Map<string, { correct: number; total: number }>();
    const answers: ExamResult["answers"] = [];

    for (const question of session!.questions) {
      const fullQuestion = questionById.get(question.id);
      const selectedAnswer = session!.answers[question.id] ?? null;
      const isCorrect =
        !!fullQuestion && selectedAnswer === fullQuestion.correctOptionId;
      if (isCorrect) correct++;

      const entry = breakdownMap.get(question.category) ?? {
        correct: 0,
        total: 0,
      };
      entry.total += 1;
      if (isCorrect) entry.correct += 1;
      breakdownMap.set(question.category, entry);

      answers.push({
        questionId: question.id,
        selectedAnswer,
        correct: isCorrect,
      });
    }

    return {
      score: Math.round((correct / total) * 100),
      totalQuestions: total,
      correctAnswers: correct,
      timeSeconds: Math.max(
        0,
        Math.round((Date.now() - session!.startedAt) / 1000),
      ),
      answers,
      categoryBreakdown: Array.from(breakdownMap.entries()).map(
        ([category, breakdown]) => ({
          category,
          correct: breakdown.correct,
          total: breakdown.total,
        }),
      ),
    };
  }

  function handleFinish() {
    if (!session || savingRef.current) return;
    savingRef.current = true;

    clearSession();
    const computed = computeResult();
    const xp = computed.correctAnswers * EXAM_XP_PER_CORRECT;

    setSession(null);
    setResult(computed);
    setXpEarned(xp);
    setPhase("results");

    void persistResult(computed, xp);
  }

  async function persistResult(computed: ExamResult, xp: number) {
    if (!user) return;

    const attemptResult = await saveExamAttempt({
      userId: user.id,
      score: computed.score,
      totalQuestions: computed.totalQuestions,
      correctAnswers: computed.correctAnswers,
      timeSeconds: computed.timeSeconds,
      answers: computed.answers,
    });

    if (!attemptResult.success) {
      console.warn("Failed to save exam attempt:", attemptResult.error);
    }

    for (const answer of computed.answers) {
      const reviewResult = await recordReviewAnswer({
        userId: user.id,
        questionId: answer.questionId,
        correct: answer.correct,
      });
      if (!reviewResult.success) {
        console.warn("Failed to record review answer:", reviewResult.error);
      }
    }

    if (xp > 0) {
      const xpResult = await awardXP(user.id, xp);
      if (!xpResult.success) {
        console.warn("Failed to award exam XP:", xpResult.error);
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

  function handleNext() {
    if (!session) return;
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((index) => index + 1);
    } else {
      handleFinish();
    }
  }

  function handleRetake() {
    setResult(null);
    setXpEarned(0);
    setPhase("setup");
  }

  function handleReviewMissed() {
    router.push("/review?filter=missed");
  }

  function handleDismissAchievement() {
    if (achievementIndex + 1 < unlockedAchievements.length) {
      setAchievementIndex((index) => index + 1);
    } else {
      setUnlockedAchievements([]);
      setAchievementIndex(0);
    }
  }

  const currentUnlock = unlockedAchievements[achievementIndex];

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4">
        <AnimatePresence mode="wait">
          {phase === "setup" && (
            <ExamSetup
              key="setup"
              readinessPercent={readinessPercent}
              hasSavedSession={session !== null}
              onStart={startExam}
              onResume={() => setPhase("question")}
              onClose={handleClose}
            />
          )}

          {phase === "question" && session && currentQuestion && (
            <ExamQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={questionIndex + 1}
              totalQuestions={totalQuestions}
              selectedOptionId={session.answers[currentQuestion.id] ?? null}
              elapsedSeconds={elapsedSeconds}
              onSelect={handleSelect}
              onNext={handleNext}
              onClose={handleClose}
            />
          )}

          {phase === "results" && result && (
            <ExamResults
              key="results"
              result={result}
              categoryBreakdown={result.categoryBreakdown}
              xpEarned={xpEarned}
              readinessPercent={readinessPercent}
              onReviewMissed={handleReviewMissed}
              onRetake={handleRetake}
              onHome={handleClose}
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
