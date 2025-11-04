import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendWelcomeEmail } from "@/lib/email/send";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
    }

    // Find verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
    }

    // Check if token is expired (24 hours)
    const now = new Date();
    if (verificationToken.expires < now) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.redirect(new URL("/login?error=token_expired", req.url));
    }

    // Update user email verification status
    const user = await prisma.user.findFirst({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/login?error=user_not_found", req.url));
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: now },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Send welcome email (async, don't wait for it)
    sendWelcomeEmail(user.email, user.name || "there").catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    // Redirect to login with success message
    return NextResponse.redirect(new URL("/login?verified=true", req.url));
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(new URL("/login?error=verification_failed", req.url));
  }
}
