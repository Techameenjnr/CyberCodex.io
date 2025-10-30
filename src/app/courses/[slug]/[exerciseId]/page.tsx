import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import { getAllCurriculumSlugs, getAllExerciseIds, getExerciseContent, getCurriculumBySlug } from "@/lib/curriculum";
import { Container, Button } from "@/components/ui";
import type { Metadata } from "next";

interface ExercisePageProps {
  params: Promise<{
    slug: string;
    exerciseId: string;
  }>;
}

// Generate static paths for all exercises
export async function generateStaticParams() {
  const slugs = getAllCurriculumSlugs();
  const paths: { slug: string; exerciseId: string }[] = [];

  for (const slug of slugs) {
    const exerciseIds = getAllExerciseIds(slug);
    for (const exerciseId of exerciseIds) {
      paths.push({ slug, exerciseId });
    }
  }

  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ExercisePageProps): Promise<Metadata> {
  const { slug, exerciseId } = await params;
  const exercise = await getExerciseContent(slug, exerciseId);
  const curriculum = await getCurriculumBySlug(slug);

  if (!exercise || !curriculum) {
    return {
      title: "Exercise Not Found",
    };
  }

  return {
    title: `${exercise.frontmatter.title || exerciseId} - ${curriculum.metadata.title} - CyberCodex.io`,
    description: exercise.frontmatter.description || `Learn ${exercise.frontmatter.title}`,
  };
}

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { slug, exerciseId } = await params;
  const exercise = await getExerciseContent(slug, exerciseId);
  const curriculum = await getCurriculumBySlug(slug);

  if (!exercise || !curriculum) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container className="max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-cyber-text-muted mb-6">
          <Link href="/courses" className="hover:text-cyber-primary transition-colors">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${slug}`} className="hover:text-cyber-primary transition-colors">
            {curriculum.metadata.title}
          </Link>
          <span>/</span>
          <span className="text-cyber-text-secondary">{exercise.frontmatter.title || exerciseId}</span>
        </div>

        {/* Back Button */}
        <Link href={`/courses/${slug}`}>
          <Button variant="ghost" className="mb-6 border border-cyber-border hover:border-cyber-primary">
            ← Back to Course
          </Button>
        </Link>

        {/* Exercise Header */}
        <div className="mb-8">
          <h1 className="text-display-2 font-bold mb-4 gradient-text">
            {exercise.frontmatter.title || exerciseId}
          </h1>
          {exercise.frontmatter.description && (
            <p className="text-xl text-cyber-text-secondary">
              {exercise.frontmatter.description}
            </p>
          )}
        </div>

        {/* Exercise Content */}
        <article className="prose prose-invert prose-cyber max-w-none">
          <MDXRemote
            source={exercise.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypePrism as any],
              },
            }}
          />
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-cyber-border flex justify-between">
          <Link href={`/courses/${slug}`}>
            <Button variant="ghost" className="border border-cyber-border hover:border-cyber-primary">
              ← Back to Course
            </Button>
          </Link>

          {exercise.frontmatter.nextExercise && (
            <Link href={`/courses/${slug}/${exercise.frontmatter.nextExercise}`}>
              <Button variant="primary">
                Next Exercise →
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </main>
  );
}
