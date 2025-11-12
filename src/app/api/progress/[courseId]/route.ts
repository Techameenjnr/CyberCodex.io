/**
 * API Route: GET /api/progress/[courseId]
 * Fetches user's progress for a specific course
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to view progress." },
        { status: 401 }
      );
    }

    const { courseId } = await params;

    // Fetch course progress
    const courseProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    // Fetch completed exercises
    const completedExercises = await prisma.userExercise.findMany({
      where: {
        userId: session.user.id,
        courseId,
        isCompleted: true,
      },
      select: {
        exerciseId: true,
        completedAt: true,
        code: true,
      },
    });

    // Fetch unlocked badges for this course
    const unlockedBadges = await prisma.userBadge.findMany({
      where: {
        userId: session.user.id,
        badge: {
          courseId,
        },
      },
      include: {
        badge: true,
      },
      orderBy: {
        unlockedAt: "desc",
      },
    });

    // If no progress exists, return empty state
    if (!courseProgress) {
      return NextResponse.json({
        courseProgress: null,
        completedExercises: [],
        unlockedBadges: [],
        progressPercentage: 0,
      });
    }

    // Calculate progress percentage
    const progressPercentage =
      courseProgress.totalExercises > 0
        ? Math.round(
            (courseProgress.exercisesCompleted / courseProgress.totalExercises) *
              100
          )
        : 0;

    return NextResponse.json({
      courseProgress,
      completedExercises: completedExercises.map((ex) => ex.exerciseId),
      completedExercisesData: completedExercises,
      unlockedBadges,
      progressPercentage,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);

    return NextResponse.json(
      { error: "Failed to fetch course progress. Please try again." },
      { status: 500 }
    );
  }
}
