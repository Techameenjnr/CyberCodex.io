import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      emailVerified: Date | null;
      level: number;
      xp: number;
      totalXp: number;
      streak: number;
      rank: string;
      subscriptionTier: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string | null;
    emailVerified: Date | null;
    level: number;
    xp: number;
    totalXp: number;
    streak: number;
    rank: string;
    subscriptionTier: string;
  }
}
