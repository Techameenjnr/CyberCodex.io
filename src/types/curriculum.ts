/**
 * Curriculum Type Definitions
 * Structure for course chapters, lessons, and exercises
 */

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  type: "exercise" | "project" | "article" | "quiz";
  isLocked: boolean;
  isCompleted: boolean;
  xpReward?: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description?: string;
  exercises: Exercise[];
  isLocked: boolean;
  isPremium: boolean; // "CLUB" badge
  icon?: string;
}

export interface CourseProgress {
  exercisesCompleted: number;
  totalExercises: number;
  projectsCompleted: number;
  totalProjects: number;
  xpEarned: number;
  totalXp: number;
  badgesEarned: number;
  totalBadges: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockCondition: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  unlockAfterChapter: number;
  isUnlocked: boolean;
}

export interface CourseMetadata {
  courseId: string;
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
}

export interface CourseCurriculum {
  metadata: CourseMetadata;
  chapters: Chapter[];
  progress: CourseProgress;
  badges: Badge[];
  cheatSheets: CheatSheet[];
}

export interface UserProfile {
  name: string;
  level: number;
  avatar?: string;
}
