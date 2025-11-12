import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Container } from "@/components/ui";
import {
  DashboardWelcome,
  JumpBackIn,
  ExploreMore,
  DashboardSidebar,
} from "@/components/dashboard";

export const metadata = {
  title: "Dashboard - CyberCodex.io",
  description: "Your cybersecurity learning dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Fetch user data with progress
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      courseProgress: {
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
      badges: {
        include: {
          badge: true,
        },
      },
    },
  });

  if (!userData) {
    redirect("/auth/login");
  }

  // Get the most recent course in progress
  const recentCourse = userData.courseProgress[0];
  const courseProgress = recentCourse
    ? {
        courseId: recentCourse.courseId,
        courseTitle: "SQL Injection Basics", // TODO: Fetch from actual course data
        courseSlug: recentCourse.courseId,
        progress: recentCourse.totalExercises > 0
          ? Math.round((recentCourse.exercisesCompleted / recentCourse.totalExercises) * 100)
          : 0,
        currentExercise: `Exercise ${recentCourse.exercisesCompleted + 1}`,
        totalExercises: recentCourse.totalExercises,
        completedExercises: recentCourse.exercisesCompleted,
        category: "Web Security",
        difficulty: "Beginner",
      }
    : undefined;

  // Prepare user stats
  const userStats = {
    xp: userData.totalXp,
    level: userData.level,
    coursesCompleted: userData.courseProgress.filter((p) => p.isCompleted).length,
    badgesEarned: userData.badges.length,
    streak: userData.streak,
  };

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 bg-cyber-dark">
      <Container className="px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <DashboardWelcome userName={userData.name || "User"} />
            <JumpBackIn courseProgress={courseProgress} />
            <ExploreMore />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <DashboardSidebar
              user={{
                name: userData.name || "User",
                email: userData.email,
                image: userData.image,
              }}
              stats={userStats}
            />
          </aside>
        </div>
      </Container>
    </main>
  );
}
