"use client";

import { ChapterItem } from "./ChapterItem";
import type { Chapter } from "@/types/curriculum";
import { cn } from "@/lib/utils";

export interface ChapterListProps {
  chapters: Chapter[];
  courseSlug: string;
  className?: string;
}

export function ChapterList({ chapters, courseSlug, className }: ChapterListProps) {
  // Calculate starting exercise number for each chapter
  let exerciseCounter = 0;
  const chaptersWithStartingNumbers = chapters.map((chapter) => {
    const startingExerciseNumber = exerciseCounter + 1;
    exerciseCounter += chapter.exercises.length;
    return { chapter, startingExerciseNumber };
  });

  return (
    <div className={cn("space-y-4", className)}>
      {chaptersWithStartingNumbers.map(({ chapter, startingExerciseNumber }, index) => (
        <ChapterItem
          key={chapter.id}
          chapter={chapter}
          courseSlug={courseSlug}
          isFirst={index === 0}
          startingExerciseNumber={startingExerciseNumber}
        />
      ))}
    </div>
  );
}
