import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Container, Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { ProfilePageClient } from "@/components/profile/ProfilePageClient";

export const metadata = {
  title: "Profile - CyberCodex.io",
  description: "Your CyberCodex profile",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user data
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      courseProgress: {
        orderBy: {
          updatedAt: "desc",
        },
      },
      badges: {
        include: {
          badge: true,
        },
        orderBy: {
          earnedAt: "desc",
        },
      },
    },
  });

  if (!userData) {
    redirect("/login");
  }

  const completedCourses = userData.courseProgress.filter((p) => p.isCompleted).length;
  const totalExercises = userData.courseProgress.reduce(
    (acc, cp) => acc + cp.exercisesCompleted,
    0
  );

  // Prepare stats for ProfileStats component
  const stats = [
    {
      label: "Exercises",
      value: totalExercises,
      color: "cyber-secondary",
    },
    {
      label: "Total XP",
      value: userData.totalXp.toLocaleString(),
      color: "cyber-warning",
    },
    {
      label: "Badges",
      value: userData.badges.length,
      color: "cyber-primary",
    },
    {
      label: "Streak",
      value: `${userData.streak} days`,
      color: "cyber-danger",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-cyber-dark">
      <Container>
        {/* Profile Header with Banner */}
        <div className="relative overflow-hidden rounded-2xl mb-8">
          {/* Banner */}
          <div className="h-64 bg-gradient-to-r from-cyber-primary/20 via-cyber-secondary/20 to-cyber-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          </div>

          {/* Profile Info */}
          <div className="relative bg-cyber-dark-secondary border border-cyber-border rounded-b-2xl">
            <div className="px-8 py-6 -mt-20">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
                {/* Avatar */}
                <div className="relative">
                  {userData.image ? (
                    <Image
                      src={userData.image}
                      alt={userData.name || "User"}
                      width={128}
                      height={128}
                      className="rounded-2xl border-4 border-cyber-dark-secondary bg-cyber-dark shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-4 border-cyber-dark-secondary bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 flex items-center justify-center shadow-xl">
                      <span className="text-6xl font-bold gradient-text">
                        {userData.name?.charAt(0).toUpperCase() || "?"}
                      </span>
                    </div>
                  )}

                  {/* Level Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-cyber-primary text-cyber-dark rounded-xl px-3 py-1.5 flex items-center justify-center font-bold text-sm shadow-lg">
                    LVL {userData.level}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-cyber-text-primary mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-lg text-cyber-text-secondary mb-4">
                    @{userData.username || "user"}
                  </p>
                  {userData.bio && (
                    <p className="text-cyber-text-secondary max-w-2xl mb-4">
                      {userData.bio}
                    </p>
                  )}
                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-cyber-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-cyber-text-muted">Joined</span>
                      <span className="text-cyber-text-primary font-medium">
                        {new Date(userData.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-cyber-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span className="text-cyber-text-muted">Rank</span>
                      <span className="text-cyber-primary font-bold">
                        {userData.rank}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <Button variant="secondary" size="md" className="whitespace-nowrap" asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <ProfilePageClient
          courseProgress={userData.courseProgress}
          badges={userData.badges}
          stats={stats}
        />
      </Container>
    </main>
  );
}
