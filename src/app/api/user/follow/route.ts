/**
 * API Route: POST /api/user/follow
 * Follow/Unfollow a user
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const followSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  action: z.enum(["follow", "unfollow"]),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to follow users." },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = followSchema.parse(body);

    // Prevent self-following
    if (session.user.id === validatedData.userId) {
      return NextResponse.json(
        { error: "You cannot follow yourself." },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    if (validatedData.action === "follow") {
      // Create follow relationship
      await prisma.userFollow.upsert({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: validatedData.userId,
          },
        },
        update: {},
        create: {
          followerId: session.user.id,
          followingId: validatedData.userId,
        },
      });

      return NextResponse.json({
        message: "Successfully followed user",
        isFollowing: true,
      });
    } else {
      // Delete follow relationship
      await prisma.userFollow.deleteMany({
        where: {
          followerId: session.user.id,
          followingId: validatedData.userId,
        },
      });

      return NextResponse.json({
        message: "Successfully unfollowed user",
        isFollowing: false,
      });
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error);

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
      { error: "Failed to follow/unfollow user. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * API Route: GET /api/user/follow?userId=xxx
 * Check if current user is following a specific user
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ isFollowing: false });
    }

    // Get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if follow relationship exists
    const follow = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });

    return NextResponse.json({
      isFollowing: !!follow,
    });
  } catch (error) {
    console.error("Error checking follow status:", error);
    return NextResponse.json(
      { error: "Failed to check follow status" },
      { status: 500 }
    );
  }
}
