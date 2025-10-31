import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Container } from "@/components/ui";
import Image from "next/image";

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

  const completedCourses = userData.courseProgress.filter((p) => p.isCompleted).length;

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        {/* Profile Header with Banner */}
        <div className="card overflow-hidden mb-8">
          {/* Banner */}
          <div
            className="h-48 bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20"
            style={{
              backgroundImage: userData.banner || 'linear-gradient(to right, rgba(0,255,65,0.2), rgba(0,217,255,0.2))',
            }}
          />

          {/* Profile Info */}
          <div className="p-8 -mt-16">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
              {/* Avatar */}
              <div className="relative">
                {userData.image ? (
                  <Image
                    src={userData.image}
                    alt={userData.name || "User"}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-cyber-dark bg-cyber-dark"
                  />
                ) : (
                  <div className="w-30 h-30 rounded-full border-4 border-cyber-dark bg-cyber-dark-secondary flex items-center justify-center">
                    <span className="text-5xl">
                      {userData.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}

                {/* Level Badge */}
                <div className="absolute -bottom-2 -right-2 bg-cyber-primary text-cyber-dark rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {userData.level}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-cyber-text-primary mb-2">
                  {userData.name}
                </h1>
                <p className="text-cyber-text-secondary mb-3">
                  @{userData.username || "user"}
                </p>
                {userData.bio && (
                  <p className="text-cyber-text-secondary max-w-2xl">
                    {userData.bio}
                  </p>
                )}
              </div>

              {/* Edit Button */}
              <a
                href="/settings"
                className="btn btn-secondary whitespace-nowrap"
              >
                Edit Profile
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-cyber-text-muted">Joined</span>{" "}
                <span className="text-cyber-text-primary font-medium">
                  {new Date(userData.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <span className="text-cyber-text-muted">Rank</span>{" "}
                <span className="text-cyber-primary font-bold">{userData.rank}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-6">Stats</h2>

              <div className="space-y-6">
                {/* Exercises */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cyber-text-secondary">EXERCISES</span>
                    <span className="text-2xl font-bold text-cyber-secondary">
                      {userData.courseProgress.reduce((acc, cp) => acc + cp.exercisesCompleted, 0)}
                    </span>
                  </div>
                </div>

                {/* Total XP */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cyber-text-secondary">TOTAL XP</span>
                    <span className="text-2xl font-bold text-cyber-warning">
                      {userData.totalXp}
                    </span>
                  </div>
                </div>

                {/* Course Badges */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cyber-text-secondary">COURSE BADGES</span>
                    <span className="text-2xl font-bold text-cyber-primary">
                      {userData.badges.length}
                    </span>
                  </div>
                </div>

                {/* Daily Streak */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cyber-text-secondary">DAILY STREAK</span>
                    <span className="text-2xl font-bold text-cyber-danger">
                      {userData.streak}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <p className="text-cyber-text-secondary text-sm">
                Complete courses to unlock skills
              </p>
            </div>
          </div>

          {/* Right Column - Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Progress */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-6">Course Progress</h2>

              {userData.courseProgress.length > 0 ? (
                <div className="space-y-4">
                  {userData.courseProgress.map((progress) => (
                    <div
                      key={progress.id}
                      className="p-4 rounded-lg border border-cyber-border bg-cyber-dark-secondary"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-cyber-text-primary">
                          {progress.courseId.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </h3>
                        <span className="text-sm text-cyber-text-secondary">
                          {progress.exercisesCompleted}/{progress.totalExercises} exercises
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-cyber-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyber-primary transition-all duration-300"
                          style={{
                            width: `${(progress.exercisesCompleted / progress.totalExercises) * 100}%`
                          }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-cyber-text-muted">
                          {Math.round((progress.exercisesCompleted / progress.totalExercises) * 100)}% complete
                        </span>
                        <span className="text-cyber-warning">
                          {progress.xpEarned} XP earned
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-cyber-text-secondary mb-4">
                    You haven't started any courses yet
                  </p>
                  <a href="/courses" className="btn btn-primary">
                    Browse Courses
                  </a>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-6">Achievements</h2>

              {userData.badges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {userData.badges.map((userBadge) => (
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
              ) : (
                <div className="text-center py-8">
                  <span className="text-6xl mb-4 block opacity-50">🏆</span>
                  <p className="text-cyber-text-secondary">
                    Complete courses to earn badges
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
