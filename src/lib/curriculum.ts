/**
 * Curriculum Utilities
 * Functions for loading and managing course curriculum data
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import type { CourseCurriculum } from "@/types/curriculum";

const COURSES_PATH = path.join(process.cwd(), "content/courses");

/**
 * Get all curriculum slugs for static generation
 */
export function getAllCurriculumSlugs(): string[] {
  try {
    const courseDirs = fs.readdirSync(COURSES_PATH, { withFileTypes: true });
    return courseDirs
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    console.error("Error reading curriculum slugs:", error);
    return [];
  }
}

/**
 * Get curriculum data by course slug
 */
export async function getCurriculumBySlug(
  slug: string
): Promise<CourseCurriculum | null> {
  try {
    const curriculumPath = path.join(COURSES_PATH, slug, "curriculum.json");

    if (!fs.existsSync(curriculumPath)) {
      console.error(`Curriculum not found for slug: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(curriculumPath, "utf8");
    const curriculum: CourseCurriculum = JSON.parse(fileContents);

    return curriculum;
  } catch (error) {
    console.error(`Error loading curriculum for ${slug}:`, error);
    return null;
  }
}

/**
 * Get exercise content by course slug and exercise ID
 */
export async function getExerciseContent(courseSlug: string, exerciseId: string) {
  try {
    const exercisePath = path.join(
      COURSES_PATH,
      courseSlug,
      "exercises",
      `${exerciseId}.mdx`
    );

    if (!fs.existsSync(exercisePath)) {
      console.error(`Exercise not found: ${courseSlug}/${exerciseId}`);
      return null;
    }

    const fileContents = fs.readFileSync(exercisePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    // Serialize MDX with syntax highlighting
    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypePrism as any],
      },
    });

    return {
      frontmatter,
      mdxSource,
      content,
    };
  } catch (error) {
    console.error(`Error loading exercise ${courseSlug}/${exerciseId}:`, error);
    return null;
  }
}

/**
 * Get all exercise IDs for a course (for static generation)
 */
export function getAllExerciseIds(courseSlug: string): string[] {
  try {
    const exercisesPath = path.join(COURSES_PATH, courseSlug, "exercises");

    if (!fs.existsSync(exercisesPath)) {
      return [];
    }

    const files = fs.readdirSync(exercisesPath);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error(`Error reading exercises for ${courseSlug}:`, error);
    return [];
  }
}

/**
 * Validate curriculum structure
 */
export function validateCurriculum(
  curriculum: CourseCurriculum
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!curriculum.metadata?.courseId) {
    errors.push("Missing metadata.courseId");
  }

  if (!curriculum.metadata?.title) {
    errors.push("Missing metadata.title");
  }

  if (!Array.isArray(curriculum.chapters)) {
    errors.push("Chapters must be an array");
  } else {
    curriculum.chapters.forEach((chapter, index) => {
      if (!chapter.id) {
        errors.push(`Chapter ${index} missing id`);
      }
      if (!chapter.title) {
        errors.push(`Chapter ${index} missing title`);
      }
      if (!Array.isArray(chapter.exercises)) {
        errors.push(`Chapter ${index} exercises must be an array`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
