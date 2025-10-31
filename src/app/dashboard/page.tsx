import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Container } from "@/components/ui";
import { StatsCard } from "@/components/dashboard/StatsCard";

export const metadata = {
  title: "Dashboard - CyberCodex.io",
  description: "Your cybersecurity learning dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user data with progress
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      courseProgress: true,
      badges: {
        include: {
          badge: true,
        },
      },
    },
  });

  if (!userData) {
    redirect("/login");
  }

  // Calculate stats
  const totalCoursesStarted = userData.courseProgress.length;
  const completedCourses = userData.courseProgress.filter(
    (p) => p.isCompleted
  ).length;

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-display-2 gradient-text mb-4">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-lg text-cyber-text-secondary">
            Continue your cybersecurity learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Level"
            value={userData.level}
            icon="🎯"
            color="cyber-primary"
          />
          <StatsCard
            title="Total XP"
            value={userData.totalXp.toLocaleString()}
            icon="⭐"
            color="cyber-warning"
          />
          <StatsCard
            title="Streak"
            value={`${userData.streak} days`}
            icon="🔥"
            color="cyber-danger"
          />
          <StatsCard
            title="Badges"
            value={userData.badges.length}
            icon="🏆"
            color="cyber-secondary"
          />
        </div>

        {/* User Info */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Username</p>
              <p className="text-lg text-cyber-text-primary">@{userData.username || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Rank</p>
              <p className="text-lg text-cyber-primary font-bold">{userData.rank}</p>
            </div>
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Courses Started</p>
              <p className="text-lg text-cyber-text-primary">{totalCoursesStarted}</p>
            </div>
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Courses Completed</p>
              <p className="text-lg text-cyber-text-primary">{completedCourses}</p>
            </div>
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Subscription</p>
              <p className="text-lg text-cyber-text-primary capitalize">
                {userData.subscriptionTier}
                {userData.subscriptionTier === "pro" && " ✨"}
              </p>
            </div>
            <div>
              <p className="text-sm text-cyber-text-secondary mb-1">Member Since</p>
              <p className="text-lg text-cyber-text-primary">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/courses"
              className="p-6 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-colors duration-200 text-center"
            >
              <span className="text-4xl mb-2 block">📚</span>
              <p className="font-medium text-cyber-text-primary">Browse Courses</p>
            </a>
            <a
              href="/profile"
              className="p-6 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-colors duration-200 text-center"
            >
              <span className="text-4xl mb-2 block">👤</span>
              <p className="font-medium text-cyber-text-primary">View Profile</p>
            </a>
            <a
              href="/pricing"
              className="p-6 rounded-lg border border-cyber-border bg-cyber-dark-secondary hover:border-cyber-primary transition-colors duration-200 text-center"
            >
              <span className="text-4xl mb-2 block">⚡</span>
              <p className="font-medium text-cyber-text-primary">Upgrade to Pro</p>
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
