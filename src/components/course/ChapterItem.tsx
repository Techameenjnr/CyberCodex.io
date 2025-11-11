"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui";
import { ExerciseItem } from "./ExerciseItem";
import type { Chapter } from "@/types/curriculum";
import { cn } from "@/lib/utils";

export interface ChapterItemProps {
  chapter: Chapter;
  courseSlug: string;
  isFirst?: boolean;
  startingExerciseNumber?: number;
  className?: string;
}

export function ChapterItem({
  chapter,
  courseSlug,
  isFirst = false,
  startingExerciseNumber = 1,
  className,
}: ChapterItemProps) {
  const [isExpanded, setIsExpanded] = useState(isFirst);

  return (
    <div className={cn("relative", className)}>
      {/* Vertical line connector */}
      {!isFirst && (
        <div className="absolute left-6 -top-4 w-0.5 h-4 bg-cyber-border" />
      )}

      {/* Chapter Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all group",
          "hover:bg-cyber-dark-secondary/50 border border-transparent hover:border-cyber-border",
          isExpanded && "bg-cyber-dark-secondary/30 border-cyber-border"
        )}
      >
        {/* Chapter Number Circle */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all",
            "border-2 text-base md:text-lg",
            isExpanded
              ? "bg-gradient-to-br from-cyber-primary to-cyber-secondary text-cyber-dark border-cyber-primary shadow-lg shadow-cyber-primary/30"
              : "bg-cyber-dark border-cyber-border text-cyber-text-secondary group-hover:border-cyber-primary"
          )}
        >
          {chapter.number}
        </div>

        {/* Chapter Info */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2 md:gap-3 mb-1">
            <h3 className="font-semibold text-base md:text-lg text-cyber-text-primary group-hover:text-cyber-primary transition-colors truncate">
              {chapter.title}
            </h3>
            {chapter.isPremium && (
              <Badge variant="warning" className="text-xs flex-shrink-0">
                CLUB
              </Badge>
            )}
          </div>
          {chapter.description && (
            <p className="text-sm text-cyber-text-secondary line-clamp-2">
              {chapter.description}
            </p>
          )}
        </div>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-shrink-0 text-cyber-text-secondary mt-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* Exercises List (Collapsible) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="ml-12 md:ml-16 mt-2 space-y-1 pb-2">
              {chapter.exercises.map((exercise, index) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  courseSlug={courseSlug}
                  exerciseNumber={startingExerciseNumber + index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical line connector to next chapter */}
      <div className="absolute left-6 bottom-0 w-0.5 h-4 bg-cyber-border" />
    </div>
  );
}
