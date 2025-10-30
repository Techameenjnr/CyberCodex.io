import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCourseSlugs, getCourseBySlug, serializeMDX } from "@/lib/mdx";
import { Container, Badge } from "@/components/ui";
import { courseCategories, difficultyLevels } from "@/lib/config";
import type { Metadata } from "next";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all courses
export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} - CyberCodex.io`,
    description: course.description,
    keywords: course.tags,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const mdxSource = await serializeMDX(course.content);
  const category = courseCategories.find((c) => c.id === course.category);
  const difficulty = difficultyLevels[course.difficulty];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-cyber-text-muted mb-4">
            <a href="/courses" className="hover:text-cyber-primary transition-colors">
              Courses
            </a>
            <span>/</span>
            <span className="text-cyber-text-secondary">{course.title}</span>
          </div>

          {/* Title */}
          <h1 className="text-display-2 font-bold mb-4 gradient-text">{course.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant={difficulty.color as any}>{difficulty.label}</Badge>
            {category && (
              <span className="px-3 py-1 bg-cyber-dark-secondary border border-cyber-border rounded text-cyber-text-secondary">
                {category.icon} {category.name}
              </span>
            )}
            <span className="text-cyber-text-muted">{course.duration}</span>
            {course.publishedAt && (
              <span className="text-cyber-text-muted">
                Published {new Date(course.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xl text-cyber-text-secondary max-w-3xl mb-6">{course.description}</p>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-cyber-dark-secondary border border-cyber-border rounded text-cyber-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Learning Objectives */}
        {course.learningObjectives && course.learningObjectives.length > 0 && (
          <div className="card mb-12">
            <h2 className="text-2xl font-bold mb-4 text-cyber-primary">What You'll Learn</h2>
            <ul className="space-y-2">
              {course.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3 text-cyber-text-secondary">
                  <span className="text-cyber-primary mt-1">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="mb-12 p-6 bg-cyber-dark-secondary border border-cyber-border rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-cyber-warning">Prerequisites</h3>
            <ul className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-start gap-3 text-cyber-text-secondary">
                  <span className="text-cyber-warning mt-1">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Course Content */}
        <article className="prose prose-invert prose-cyber max-w-none">
          <MDXRemote source={course.content} />
        </article>
      </Container>
    </main>
  );
}
