"use client";

import { Card, CardHeader, CardTitle, CardContent, Button, ProgressBar } from "@/components/ui";
import type { UserProfile, CourseProgress, Badge } from "@/types/curriculum";
import { cn } from "@/lib/utils";

export interface CourseSidebarProps {
  user: UserProfile;
  progress: CourseProgress;
  badges: Badge[];
  className?: string;
}

export function CourseSidebar({
  user,
  progress,
  badges,
  className,
}: CourseSidebarProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* User Profile */}
      <Card className="border-cyber-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center text-2xl">
              {user.avatar || "👤"}
            </div>
            <div>
              <p className="font-semibold text-cyber-text-primary">{user.name}</p>
              <p className="text-sm text-cyber-text-secondary">Level {user.level}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full border border-cyber-border hover:border-cyber-primary">
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card className="border-cyber-border">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProgressBar
            label="Exercises"
            current={progress.exercisesCompleted}
            total={progress.totalExercises}
          />
          <ProgressBar
            label="Projects Completed"
            current={progress.projectsCompleted}
            total={progress.totalProjects}
          />
          <ProgressBar
            label="XP Earned"
            current={progress.xpEarned}
            total={progress.totalXp}
            variant="secondary"
          />
        </CardContent>
      </Card>

      {/* Course Badges */}
      <Card className="border-cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Course Badges
            <span className="text-sm text-cyber-text-secondary font-normal">
              {progress.badgesEarned}/{progress.totalBadges}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-cyber-text-secondary mb-4">
            Complete a chapter to earn a badge – collect &apos;em all!
          </p>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-2xl transition-all",
                  badge.isUnlocked
                    ? "bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 border border-cyber-primary"
                    : "bg-cyber-dark-secondary border border-cyber-border grayscale opacity-40"
                )}
                title={badge.isUnlocked ? badge.name : "Locked"}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
