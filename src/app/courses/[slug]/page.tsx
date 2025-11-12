import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllCurriculumSlugs, getCurriculumBySlug } from "@/lib/curriculum";
import { getCourseBySlug } from "@/lib/mdx";
import { courseCategories } from "@/lib/config";
import { Container } from "@/components/ui";
import { CourseLayout, CourseSidebar, ChapterList } from "@/components/course";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all courses
export async function generateStaticParams() {
  const slugs = getAllCurriculumSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const curriculum = await getCurriculumBySlug(slug);

  if (!curriculum) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${curriculum.metadata.title} - CyberCodex.io`,
    description: curriculum.metadata.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const curriculum = await getCurriculumBySlug(slug);

  if (!curriculum) {
    notFound();
  }

  // Fetch course metadata to get category for banner
  const courseMetadata = await getCourseBySlug(slug);
  const category = courseMetadata ? courseCategories.find((c) => c.id === courseMetadata.category) : null;

  // Fetch authenticated user session
  const session = await auth();

  // Fetch user data and progress if authenticated
  let user = null;
  let userProgress = curriculum.progress; // Default to curriculum progress
  let completedExercises: string[] = [];
  let unlockedBadges: any[] = [];

  if (session?.user?.id) {
    // Fetch full user data including level, xp, etc.
    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        level: true,
        xp: true,
        totalXp: true,
        image: true,
      },
    });

    if (userData) {
      user = {
        name: userData.username || userData.name || "Anonymous",
        level: userData.level,
        avatar: userData.image || "👤",
        xp: userData.xp,
        totalXp: userData.totalXp,
      };
    }

    // Fetch course progress
    const courseProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: slug,
        },
      },
    });

    // If progress exists, merge with curriculum data
    if (courseProgress) {
      userProgress = {
        ...curriculum.progress,
        exercisesCompleted: courseProgress.exercisesCompleted,
        totalExercises: courseProgress.totalExercises || curriculum.progress.totalExercises,
        projectsCompleted: courseProgress.projectsCompleted,
        totalProjects: courseProgress.totalProjects || curriculum.progress.totalProjects,
        xpEarned: courseProgress.xpEarned,
        totalXp: courseProgress.totalXp || curriculum.progress.totalXp,
        badgesEarned: 0, // Will be calculated from unlocked badges
      };
    }

    // Fetch completed exercises
    const completedExercisesData = await prisma.userExercise.findMany({
      where: {
        userId: session.user.id,
        courseId: slug,
        isCompleted: true,
      },
      select: {
        exerciseId: true,
      },
    });

    completedExercises = completedExercisesData.map((ex) => ex.exerciseId);

    // Fetch unlocked badges for this course
    const unlockedBadgesData = await prisma.userBadge.findMany({
      where: {
        userId: session.user.id,
        badge: {
          courseId: slug,
        },
      },
      include: {
        badge: true,
      },
      orderBy: {
        unlockedAt: "desc",
      },
    });

    unlockedBadges = unlockedBadgesData.map((ub) => ({
      ...ub.badge,
      isUnlocked: true,
      unlockedAt: ub.unlockedAt,
    }));

    userProgress.badgesEarned = unlockedBadges.length;
  }

  // Default user for non-authenticated users
  if (!user) {
    user = {
      name: "Guest",
      level: 1,
      avatar: "👤",
    };
  }

  // Merge curriculum badges with unlocked badges
  const badgesWithUnlockStatus = curriculum.badges.map((badge) => {
    const unlocked = unlockedBadges.find((ub) => ub.name.endsWith(`:${badge.id}`));
    return {
      ...badge,
      isUnlocked: !!unlocked,
      unlockedAt: unlocked?.unlockedAt,
    };
  });

  return (
    <main className="min-h-screen bg-cyber-dark pb-20">
      {/* Hero Banner Section */}
      <div className="relative pt-24 pb-12 mb-8 overflow-hidden">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          {category?.iconGif && (
            <>
              <Image
                src={category.iconGif}
                alt={`${category.name} Background`}
                fill
                className="object-cover opacity-40"
                priority
                unoptimized
              />
            </>
          )}
          {!category?.iconGif && (
            // Fallback gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/20 via-cyber-secondary/20 to-cyber-dark" />
          )}
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 via-cyber-dark/90 to-cyber-dark" />
        </div>

        {/* Header Content */}
        <Container className="max-w-7xl">
          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-cyber-text-muted mb-6">
              <a href="/courses" className="hover:text-cyber-primary transition-colors">
                Courses
              </a>
              <span>/</span>
              <span className="text-cyber-text-secondary">{curriculum.metadata.title}</span>
            </div>

            {/* Title & Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
              {curriculum.metadata.title}
            </h1>
            <p className="text-lg md:text-xl text-cyber-text-secondary max-w-3xl leading-relaxed">
              {curriculum.metadata.description}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <CourseLayout
        hero={null}
        sidebar={
          <CourseSidebar
            user={user}
            progress={userProgress}
            badges={badgesWithUnlockStatus}
          />
        }
      >
        <ChapterList
          chapters={curriculum.chapters}
          courseSlug={slug}
          completedExercises={completedExercises}
        />
      </CourseLayout>
    </main>
  );
}
