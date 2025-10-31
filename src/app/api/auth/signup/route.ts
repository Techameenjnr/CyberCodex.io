import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations/auth";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input with Zod
    const validatedData = signupSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    const { name, email, username, password } = validatedData.data;

    // Additional password strength validation
    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.isValid) {
      return NextResponse.json(
        { error: "Password does not meet requirements", details: passwordStrength.errors },
        { status: 400 }
      );
    }

    // Check if user already exists (email or username)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      // Generic error to prevent user enumeration
      return NextResponse.json(
        { error: "An account with this email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password with Argon2id
    const hashedPassword = await hashPassword(password);

    // Create user with initial gamification values
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        level: 1,
        xp: 0,
        totalXp: 0,
        streak: 0,
        rank: "Novice",
        subscriptionTier: "free",
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
