"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, ProgressBar, Badge } from "@/components/ui";
import Link from "next/link";

interface CourseProgress {
  id: string;
  courseId: string;
  exercisesCompleted: number;
  totalExercises: number;
  xpEarned: number;
  isCompleted: boolean;
  progressPercentage: number;
}

interface UserBadge {
  id: string;
  badge: {
    name: string;
    icon: string;
    description: string;
  };
  earnedAt: Date;
}

interface ProfileContentProps {
  activeTab: string;
  courseProgress: CourseProgress[];
  badges: UserBadge[];
}

export function ProfileContent({
  activeTab,
  courseProgress,
  badges,
}: ProfileContentProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === "overview" && (
        <motion.div
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-cyber-text-primary mb-6">
              Course Progress
            </h2>

            {courseProgress.length > 0 ? (
              <div className="space-y-4">
                {courseProgress.map((progress) => (
                  <div
                    key={progress.id}
                    className="p-4 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-cyber-text-primary">
                        {progress.courseId
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </h3>
                      {progress.isCompleted && (
                        <Badge variant="primary" size="sm">
                          Completed
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cyber-text-secondary">
                          {progress.exercisesCompleted}/{progress.totalExercises}{" "}
                          exercises
                        </span>
                        <span className="text-cyber-warning font-semibold">
                          {progress.xpEarned} XP
                        </span>
                      </div>
                      <ProgressBar
                        value={progress.progressPercentage}
                        variant="primary"
                        size="md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cyber-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-cyber-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-cyber-text-secondary mb-4">
                  You haven't started any courses yet
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-3 bg-cyber-primary text-cyber-dark font-semibold rounded-lg hover:bg-cyber-primary/90 transition-colors duration-200"
                >
                  Browse Courses
                </Link>
              </div>
            )}
          </Card>

          {badges.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-cyber-text-primary mb-6">
                Recent Achievements
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badges.slice(0, 4).map((userBadge) => (
                  <div
                    key={userBadge.id}
                    className="flex flex-col items-center p-4 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-colors duration-200"
                  >
                    <span className="text-4xl mb-2">{userBadge.badge.icon}</span>
                    <p className="text-xs text-center text-cyber-text-primary font-medium">
                      {userBadge.badge.name}
                    </p>
                  </div>
                ))}
              </div>
              {badges.length > 4 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {}}
                    className="text-sm text-cyber-primary hover:text-cyber-secondary transition-colors duration-200"
                  >
                    View all {badges.length} badges →
                  </button>
                </div>
              )}
            </Card>
          )}
        </motion.div>
      )}

      {activeTab === "badges" && (
        <motion.div
          key="badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-cyber-text-primary mb-6">
              All Achievements
            </h2>

            {badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {badges.map((userBadge) => (
                  <div
                    key={userBadge.id}
                    className="group relative flex flex-col items-center p-4 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-all duration-200"
                  >
                    <span className="text-4xl mb-2">{userBadge.badge.icon}</span>
                    <p className="text-xs text-center text-cyber-text-primary font-medium mb-1">
                      {userBadge.badge.name}
                    </p>
                    <p className="text-xs text-center text-cyber-text-muted">
                      {new Date(userBadge.earnedAt).toLocaleDateString()}
                    </p>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-cyber-dark border border-cyber-border rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 w-48 z-10">
                      <p className="text-xs text-cyber-text-secondary text-center">
                        {userBadge.badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block opacity-50">🏆</span>
                <p className="text-cyber-text-secondary">
                  Complete courses to earn badges
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {activeTab === "activity" && (
        <motion.div
          key="activity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-cyber-text-primary mb-6">
              Recent Activity
            </h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cyber-secondary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-cyber-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-cyber-text-secondary">
                Activity tracking coming soon
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
