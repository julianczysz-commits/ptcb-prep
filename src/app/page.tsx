import { BottomNav } from "@/components/bottom-nav";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { DailyGoal } from "@/components/dashboard/daily-goal";
import { ExamCard } from "@/components/dashboard/exam-card";
import { Header } from "@/components/dashboard/header";
import { ProgressCard } from "@/components/dashboard/progress-card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-32 pt-6">
        <div className="flex flex-col gap-5">
          <Header />
          <ProgressCard />
          <DailyGoal />
          <ExamCard />
          <ContinueLearning />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
