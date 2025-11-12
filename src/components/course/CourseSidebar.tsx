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
    <div className={cn("space-y-4 lg:space-y-6", className)}>
      {/* User Profile */}
      <Card className="border-cyber-border bg-cyber-dark-secondary/50">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center text-2xl shadow-lg shadow-cyber-primary/20">
              {user.avatar || "👤"}
            </div>
            <div>
              <p className="font-semibold text-cyber-text-primary text-lg">{user.name}</p>
              <p className="text-sm text-cyber-text-secondary">Level {user.level}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full border border-cyber-border hover:border-cyber-primary transition-all">
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card className="border-cyber-border bg-cyber-dark-secondary/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <ProgressBar
            label="Exercises"
            current={progress.exercisesCompleted}
            total={progress.totalExercises}
          />
          <ProgressBar
            label="Projects"
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
      <Card className="border-cyber-border bg-cyber-dark-secondary/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg">
            Course Badges
            <span className="text-sm text-cyber-text-secondary font-normal">
              {progress.badgesEarned}/{progress.totalBadges}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-sm text-cyber-text-secondary mb-4">
            Complete chapters to earn badges – collect &apos;em all!
          </p>
          <div className="grid grid-cols-4 gap-2.5">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-2xl transition-all cursor-help",
                  badge.isUnlocked
                    ? "bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 border-2 border-cyber-primary shadow-lg shadow-cyber-primary/20"
                    : "bg-cyber-dark-secondary border-2 border-cyber-border grayscale opacity-40 hover:opacity-50"
                )}
                title={badge.isUnlocked ? badge.name : "Locked - " + badge.description}
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
