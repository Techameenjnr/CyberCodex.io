/**
 * Script to clear all sessions (useful after auth config changes)
 * Usage: npx tsx scripts/clear-sessions.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearSessions() {
  console.log("🧹 Clearing all sessions...\n");

  try {
    const result = await prisma.session.deleteMany({});

    console.log(`✅ Cleared ${result.count} session(s)`);
    console.log("\n💡 All users will need to log in again.");
    console.log("   This fixes issues with old session data.\n");
  } catch (error) {
    console.error("❌ Error clearing sessions:", error);
    throw error;
  }
}

async function main() {
  try {
    await clearSessions();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
