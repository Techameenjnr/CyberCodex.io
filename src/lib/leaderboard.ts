import { prisma } from "@/lib/db/prisma";
import type { LeaderboardUser } from "@/components/community/LeaderboardEntry";

/**
 * Fetch all users for the leaderboard, sorted by totalXp
 * @param period - "weekly" or "alltime" (weekly is not yet implemented, returns alltime for now)
 * @param limit - Maximum number of users to return (default: 100)
 */
export async function getLeaderboardUsers(
  period: "weekly" | "alltime" = "alltime",
  limit: number = 100
): Promise<LeaderboardUser[]> {
  try {
    // Fetch users from database sorted by totalXp
    const dbUsers = await prisma.user.findMany({
      where: {
        isPublic: true, // Only show public profiles
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        totalXp: true,
      },
      orderBy: {
        totalXp: "desc",
      },
      take: limit,
    });

    // Transform to LeaderboardUser format
    const leaderboardUsers: LeaderboardUser[] = dbUsers.map((user) => ({
      id: user.id,
      name: user.name || "Anonymous",
      username: user.username || undefined,
      image: user.image,
      xp: user.totalXp,
      isVerified: false, // TODO: Add verification logic based on badges or achievements
    }));

    return leaderboardUsers;
  } catch (error) {
    console.error("Error fetching leaderboard users:", error);
    return [];
  }
}

/**
 * Get community statistics (includes mock users)
 */
export async function getCommunityStats() {
  try {
    const [totalUsers, xpStats, activeToday] = await Promise.all([
      // Total users count
      prisma.user.count({
        where: { isPublic: true },
      }),

      // Total XP earned across all users
      prisma.user.aggregate({
        where: { isPublic: true },
        _sum: {
          totalXp: true,
        },
      }),

      // Users active today (within last 24 hours)
      prisma.user.count({
        where: {
          isPublic: true,
          lastActive: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Calculate mock users XP total
    const mockUsersXP = MOCK_USERS.reduce((total, user) => total + user.xp, 0);

    return {
      totalUsers: totalUsers + MOCK_USERS.length, // Include mock users in count
      totalXP: (xpStats._sum.totalXp || 0) + mockUsersXP, // Include mock XP in total
      activeToday, // Mock users don't count as "active today"
    };
  } catch (error) {
    console.error("Error fetching community stats:", error);
    return {
      totalUsers: MOCK_USERS.length, // At least show mock users if DB fails
      totalXP: MOCK_USERS.reduce((total, user) => total + user.xp, 0),
      activeToday: 0,
    };
  }
}

/**
 * Mock users with low XP for leaderboard testing
 * These users will appear at the bottom of the leaderboard and are easy to beat
 */
export const MOCK_USERS: LeaderboardUser[] = [
  {
    id: "mock-1",
    name: "Beginner_01",
    username: "beginner01",
    image: null,
    xp: 150,
    isVerified: false,
  },
  {
    id: "mock-2",
    name: "Newbie Hacker",
    username: "newbiehacker",
    image: null,
    xp: 250,
    isVerified: false,
  },
  {
    id: "mock-3",
    name: "Code Learner",
    username: "codelearner",
    image: null,
    xp: 320,
    isVerified: false,
  },
  {
    id: "mock-4",
    name: "Cyber Rookie",
    username: "cyberrookie",
    image: null,
    xp: 180,
    isVerified: false,
  },
  {
    id: "mock-5",
    name: "SecurityStarter",
    username: "securitystarter",
    image: null,
    xp: 420,
    isVerified: false,
  },
  {
    id: "mock-6",
    name: "FirstTimer",
    username: "firsttimer",
    image: null,
    xp: 95,
    isVerified: false,
  },
  {
    id: "mock-7",
    name: "Junior Dev",
    username: "juniordev",
    image: null,
    xp: 275,
    isVerified: false,
  },
  {
    id: "mock-8",
    name: "Script Kiddie",
    username: "scriptkiddie",
    image: null,
    xp: 340,
    isVerified: false,
  },
  {
    id: "mock-9",
    name: "Noob Coder",
    username: "noobcoder",
    image: null,
    xp: 210,
    isVerified: false,
  },
  {
    id: "mock-10",
    name: "Fresh Start",
    username: "freshstart",
    image: null,
    xp: 125,
    isVerified: false,
  },
];

/**
 * Get combined leaderboard with real users and mock users
 */
export async function getLeaderboardWithMocks(
  period: "weekly" | "alltime" = "alltime",
  limit: number = 100
): Promise<LeaderboardUser[]> {
  const realUsers = await getLeaderboardUsers(period, limit);

  // Combine real users with mock users and sort by XP
  const combined = [...realUsers, ...MOCK_USERS].sort((a, b) => b.xp - a.xp);

  // Return up to the limit
  return combined.slice(0, limit);
}
