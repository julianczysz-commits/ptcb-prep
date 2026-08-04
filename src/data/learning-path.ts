import { lessons } from "@/lib/lesson-data";

export type CategoryPalette = "rose" | "violet" | "green" | "sky" | "amber";

export type CategoryIcon =
  | "pills"
  | "law"
  | "calc"
  | "safety"
  | "ops";

export interface Category {
  name: string;
  description: string;
  palette: CategoryPalette;
  icon: CategoryIcon;
}

export const categories: Category[] = [
  {
    name: "Medications",
    description: "Brand vs generic and top drugs",
    palette: "rose",
    icon: "pills",
  },
  {
    name: "Pharmacy Law",
    description: "DEA schedules, HIPAA, and rules",
    palette: "violet",
    icon: "law",
  },
  {
    name: "Pharmacy Calculations",
    description: "Conversions and dosage math",
    palette: "green",
    icon: "calc",
  },
  {
    name: "Patient Safety",
    description: "Preventing medication errors",
    palette: "sky",
    icon: "safety",
  },
  {
    name: "Pharmacy Operations",
    description: "Processing and inventory",
    palette: "amber",
    icon: "ops",
  },
];

export type LessonStatus = "completed" | "unlocked" | "locked";

export function getCategoryLessons(categoryName: string) {
  return lessons
    .filter((lesson) => lesson.category === categoryName)
    .sort((a, b) => a.order - b.order);
}
