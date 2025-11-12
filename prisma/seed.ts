/**
 * Prisma Database Seeding Script
 * Seeds Badge data from all curriculum.json files
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

interface CurriculumBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockCondition: string;
}

interface Curriculum {
  metadata: {
    courseId: string;
    slug: string;
    title: string;
  };
  badges: CurriculumBadge[];
}

async function seedBadges() {
  console.log("🌱 Starting badge seeding...\n");

  const contentDir = join(process.cwd(), "content", "courses");
  const courseDirs = readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let totalBadges = 0;
  let totalCourses = 0;

  for (const courseDir of courseDirs) {
    const curriculumPath = join(contentDir, courseDir, "curriculum.json");

    try {
      const curriculumData = readFileSync(curriculumPath, "utf-8");
      const curriculum: Curriculum = JSON.parse(curriculumData);

      if (!curriculum.badges || curriculum.badges.length === 0) {
        console.log(`⚠️  ${curriculum.metadata.title}: No badges found`);
        continue;
      }

      console.log(
        `📚 ${curriculum.metadata.title} (${curriculum.badges.length} badges)`
      );

      for (const badge of curriculum.badges) {
        // Create unique badge name with course prefix to avoid conflicts
        const uniqueName = `${curriculum.metadata.slug}:${badge.id}`;

        // Default unlock condition if not provided
        const unlockCondition =
          badge.unlockCondition || badge.description || "Complete requirement";

        await prisma.badge.upsert({
          where: { name: uniqueName },
          update: {
            description: badge.description,
            icon: badge.icon,
            category: "course",
            courseId: curriculum.metadata.courseId,
            unlockCondition,
          },
          create: {
            name: uniqueName,
            description: badge.description,
            icon: badge.icon,
            category: "course",
            courseId: curriculum.metadata.courseId,
            unlockCondition,
          },
        });

        console.log(`   ✓ ${badge.icon} ${badge.name}`);
        totalBadges++;
      }

      totalCourses++;
      console.log("");
    } catch (error) {
      console.error(`❌ Error processing ${courseDir}:`, error);
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Courses: ${totalCourses}`);
  console.log(`   Badges: ${totalBadges}`);
}

async function main() {
  try {
    await seedBadges();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
