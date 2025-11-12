/**
 * Script to create an admin test user
 * Usage: npx tsx scripts/create-admin-user.ts
 */

import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

async function createAdminUser() {
  console.log("🔧 Creating admin test user...\n");

  const email = "admin@cybercodex.io";
  const username = "admin";
  const password = "admin";
  const name = "Admin User";

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️  Admin user already exists!");
      console.log(`   Email: ${email}`);
      console.log(`   Username: ${existingUser.username}`);
      console.log(`   ID: ${existingUser.id}`);
      console.log("\nℹ️  To reset password, delete the user first:");
      console.log(`   npx prisma studio`);
      console.log(`   Or run: npx prisma db push --force-reset\n`);
      return;
    }

    // Hash the password using Argon2id (same as auth system)
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Create the admin user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        emailVerified: new Date(), // Mark email as verified
        level: 1,
        xp: 0,
        totalXp: 0,
        rank: "Admin",
        subscriptionTier: "pro", // Give pro subscription for testing
        subscriptionStatus: "active",
      },
    });

    console.log("✅ Admin user created successfully!\n");
    console.log("📋 Login Credentials:");
    console.log("   Email:    admin@cybercodex.io");
    console.log("   Username: admin");
    console.log("   Password: admin");
    console.log("\n🎯 User Details:");
    console.log(`   ID:       ${user.id}`);
    console.log(`   Level:    ${user.level}`);
    console.log(`   Rank:     ${user.rank}`);
    console.log(`   Tier:     ${user.subscriptionTier}`);
    console.log("\n🔗 Login at: http://localhost:3000/auth/login\n");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    throw error;
  }
}

async function main() {
  try {
    await createAdminUser();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
