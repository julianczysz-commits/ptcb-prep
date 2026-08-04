export function calculateExamReadiness(params: {
  completedLessons: number;
  totalLessons: number;
}): number {
  if (params.totalLessons <= 0) return 0;
  if (params.completedLessons <= 0) return 0;
  return Math.round((params.completedLessons / params.totalLessons) * 100);
}
