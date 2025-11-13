"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui";

export interface ExerciseCompletionButtonProps {
  courseId: string;
  exerciseId: string;
  chapterId?: string;
  xpReward: number;
  nextExerciseId?: string;
  isCompleted?: boolean;
  className?: string;
}

export function ExerciseCompletionButton({
  courseId,
  exerciseId,
  chapterId,
  xpReward,
  nextExerciseId,
  isCompleted = false,
  className,
}: ExerciseCompletionButtonProps) {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleComplete = async () => {
    if (completed || loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/progress/complete-exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          exerciseId,
          chapterId,
          xpReward,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to complete exercise");
      }

      setCompleted(true);
      setShowSuccess(true);

      // Refresh session to update user's XP in navbar
      if (updateSession) {
        await updateSession();
      }

      // Show success notification for 2 seconds
      setTimeout(() => {
        setShowSuccess(false);

        // Navigate to next exercise if available
        if (nextExerciseId) {
          router.push(`/courses/${courseId}/${nextExerciseId}`);
        } else {
          // Go back to course curriculum
          router.push(`/courses/${courseId}`);
        }
      }, 2000);
    } catch (error) {
      console.error("Error completing exercise:", error);
      alert("Failed to complete exercise. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 p-4 bg-cyber-primary/10 border border-cyber-primary rounded-lg">
        <div className="text-2xl">🎉</div>
        <div className="text-center">
          <p className="text-cyber-primary font-semibold">Exercise Completed!</p>
          <p className="text-sm text-cyber-text-secondary">+{xpReward} XP</p>
        </div>
        {nextExerciseId && (
          <p className="text-xs text-cyber-text-muted">Moving to next exercise...</p>
        )}
      </div>
    );
  }

  return (
    <Button
      onClick={handleComplete}
      disabled={loading || completed}
      variant={completed ? "ghost" : "primary"}
      className={className}
    >
      {loading ? (
        "Saving..."
      ) : completed ? (
        <>✓ Completed</>
      ) : (
        "Mark as Complete"
      )}
    </Button>
  );
}
