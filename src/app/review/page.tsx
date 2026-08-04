import type { Metadata } from "next";

import { BottomNav } from "@/components/bottom-nav";
import { ReviewClient } from "@/components/review/review-client";

export const metadata: Metadata = {
  title: "Review",
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const { filter } = await searchParams;
  const initialFilter = typeof filter === "string" ? filter : undefined;

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-32 pt-6">
        <ReviewClient initialFilter={initialFilter} />
      </main>
      <BottomNav />
    </div>
  );
}
