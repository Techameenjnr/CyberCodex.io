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
    <div className={cn("", className)}>
      <div className="mb-6 pb-4 border-b border-cyber-border/50">
        <h2 className="text-2xl md:text-3xl font-bold text-cyber-text-primary mb-2">
          Course Curriculum
        </h2>
        <p className="text-sm md:text-base text-cyber-text-secondary">
          {chapters.length} chapters • {exerciseCounter} exercises
        </p>
      </div>

      <div className="space-y-2">
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
    </div>
  );
}
