import type { Metadata } from "next";

import { ExamClient } from "@/components/exam/exam-client";

export const metadata: Metadata = {
  title: "Practice Exam",
};

export default function ExamPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ExamClient />
    </div>
  );
}
