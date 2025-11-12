/**
 * API Route: POST /api/progress/start-course
 * Initializes course progress for a user when they start a course
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const startCourseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  totalExercises: z.number().int().min(1),
  totalProjects: z.number().int().min(0).default(0),
  totalXp: z.number().int().min(0),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to start a course." },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = startCourseSchema.parse(body);

    // Check if user already has progress for this course
    const existingProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: validatedData.courseId,
        },
      },
    });

    if (existingProgress) {
      return NextResponse.json(
        {
          message: "Course already started",
          progress: existingProgress,
        },
        { status: 200 }
      );
    }

    // Create new course progress
    const courseProgress = await prisma.courseProgress.create({
      data: {
        userId: session.user.id,
        courseId: validatedData.courseId,
        totalExercises: validatedData.totalExercises,
        totalProjects: validatedData.totalProjects,
        totalXp: validatedData.totalXp,
        exercisesCompleted: 0,
        projectsCompleted: 0,
        xpEarned: 0,
      },
    });

    return NextResponse.json(
      {
        message: "Course started successfully",
        progress: courseProgress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error starting course:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to start course. Please try again." },
      { status: 500 }
    );
  }
}
