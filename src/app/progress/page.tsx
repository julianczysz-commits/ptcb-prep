import type { Metadata } from "next";

import { BottomNav } from "@/components/bottom-nav";
import { ProgressClient } from "@/components/progress/progress-client";

export const metadata: Metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  return (
    <div className="flex flex-1 flex-col">
      <ProgressClient />
      <BottomNav />
    </div>
  );
}
