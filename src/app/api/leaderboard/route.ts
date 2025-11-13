import { NextRequest, NextResponse } from "next/server";
import { getLeaderboardWithMocks } from "@/lib/leaderboard";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const period = searchParams.get("period") as "weekly" | "alltime" || "alltime";
    const limit = parseInt(searchParams.get("limit") || "100");

    // Fetch leaderboard users (includes real users + mock users)
    const users = await getLeaderboardWithMocks(period, limit);

    return NextResponse.json({
      users,
      period,
      count: users.length,
    });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
