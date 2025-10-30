import { notFound } from "next/navigation";
import { getAllCurriculumSlugs, getCurriculumBySlug } from "@/lib/curriculum";
import { Container } from "@/components/ui";
import { CourseLayout, CourseSidebar, ChapterList } from "@/components/course";
import type { Metadata } from "next";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all courses
export async function generateStaticParams() {
  const slugs = getAllCurriculumSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const curriculum = await getCurriculumBySlug(slug);

  if (!curriculum) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${curriculum.metadata.title} - CyberCodex.io`,
    description: curriculum.metadata.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const curriculum = await getCurriculumBySlug(slug);

  if (!curriculum) {
    notFound();
  }

  // Mock user data (static for now since we don't have auth)
  const mockUser = {
    name: "Your Name",
    level: 1,
    avatar: "👤",
  };

  return (
    <main className="min-h-screen pt-32 pb-20">
      <CourseLayout
        hero={
          <Container>
            <div className="mb-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-cyber-text-muted mb-4">
                <a href="/courses" className="hover:text-cyber-primary transition-colors">
                  Courses
                </a>
                <span>/</span>
                <span className="text-cyber-text-secondary">{curriculum.metadata.title}</span>
              </div>

              {/* Title & Description */}
              <h1 className="text-display-1 font-bold mb-4 gradient-text">
                {curriculum.metadata.title}
              </h1>
              <p className="text-xl text-cyber-text-secondary max-w-3xl">
                {curriculum.metadata.description}
              </p>
            </div>
          </Container>
        }
        sidebar={
          <CourseSidebar
            user={mockUser}
            progress={curriculum.progress}
            badges={curriculum.badges}
          />
        }
      >
        <ChapterList chapters={curriculum.chapters} courseSlug={slug} />
      </CourseLayout>
    </main>
  );
}
