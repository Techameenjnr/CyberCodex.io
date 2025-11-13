import { NextResponse } from "next/server";
import { getCommunityStats } from "@/lib/leaderboard";

export async function GET() {
  try {
    // Fetch community statistics
    const stats = await getCommunityStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Community stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch community stats" },
      { status: 500 }
    );
  }
}
