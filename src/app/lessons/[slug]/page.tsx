import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonPlayer } from "@/components/lesson/lesson-player";
import { getLesson, lessons } from "@/lib/lesson-data";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson ? lesson.title : "Lesson" };
}

export default async function LessonPage({
  params,
}: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <LessonPlayer lesson={lesson} />
    </div>
  );
}
