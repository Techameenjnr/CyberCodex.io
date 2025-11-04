"use client";

import { useState } from "react";
import { ProfileTabs, ProfileStats, ProfileContent } from "@/components/profile";

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

interface ProfilePageClientProps {
  courseProgress: CourseProgress[];
  badges: UserBadge[];
  stats: {
    label: string;
    value: string | number;
    color: string;
  }[];
}

export function ProfilePageClient({
  courseProgress,
  badges,
  stats,
}: ProfilePageClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <ProfileStats stats={stats} />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileContent
        activeTab={activeTab}
        courseProgress={courseProgress}
        badges={badges}
      />
    </>
  );
}
