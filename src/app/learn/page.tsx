import { BottomNav } from "@/components/bottom-nav";
import { LearnClient } from "@/components/learn/learn-client";

export default function LearnPage() {
  return (
    <div className="flex flex-1 flex-col">
      <LearnClient />
      <BottomNav />
    </div>
  );
}
