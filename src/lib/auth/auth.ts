import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db/prisma";
import authConfig from "./auth.config";

/**
 * Main Auth.js configuration with Prisma adapter
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60,  // Update session every 24 hours
  },
  callbacks: {
    async session({ session, user }) {
      // Add custom user fields to session
      if (session.user) {
        session.user.id = user.id;
        session.user.username = user.username;
        session.user.level = user.level;
        session.user.xp = user.xp;
        session.user.totalXp = user.totalXp;
        session.user.streak = user.streak;
        session.user.rank = user.rank;
        session.user.subscriptionTier = user.subscriptionTier;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Allow sign in
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Initialize new user with default gamification values
      await prisma.user.update({
        where: { id: user.id },
        data: {
          level: 1,
          xp: 0,
          totalXp: 0,
          streak: 0,
          rank: "Novice",
          subscriptionTier: "free",
        },
      });
    },
    async signIn({ user, isNewUser }) {
      // Update last active on every sign in
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActive: new Date() },
      });

      // Check and update streak
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { lastActive: true, streak: true },
      });

      if (userData) {
        const now = new Date();
        const lastActive = new Date(userData.lastActive);
        const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          // Same day, no streak change
        } else if (hoursDiff < 48) {
          // Next day, increment streak
          await prisma.user.update({
            where: { id: user.id },
            data: { streak: userData.streak + 1 },
          });
        } else {
          // Streak broken, reset to 1
          await prisma.user.update({
            where: { id: user.id },
            data: { streak: 1 },
          });
        }
      }
    },
  },
  ...authConfig,
});
