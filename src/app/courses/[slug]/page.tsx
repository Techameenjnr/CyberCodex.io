import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllCurriculumSlugs, getCurriculumBySlug } from "@/lib/curriculum";
import { getCourseBySlug } from "@/lib/mdx";
import { courseCategories } from "@/lib/config";
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

  // Fetch course metadata to get category for banner
  const courseMetadata = await getCourseBySlug(slug);
  const category = courseMetadata ? courseCategories.find((c) => c.id === courseMetadata.category) : null;

  // Mock user data (static for now since we don't have auth)
  const mockUser = {
    name: "Your Name",
    level: 1,
    avatar: "👤",
  };

  return (
    <main className="min-h-screen bg-cyber-dark pb-20">
      {/* Hero Banner Section */}
      <div className="relative pt-24 pb-12 mb-8 overflow-hidden">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          {category?.iconGif && (
            <>
              <Image
                src={category.iconGif}
                alt={`${category.name} Background`}
                fill
                className="object-cover opacity-40"
                priority
                unoptimized
              />
            </>
          )}
          {!category?.iconGif && (
            // Fallback gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/20 via-cyber-secondary/20 to-cyber-dark" />
          )}
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 via-cyber-dark/90 to-cyber-dark" />
        </div>

        {/* Header Content */}
        <Container className="max-w-7xl">
          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-cyber-text-muted mb-6">
              <a href="/courses" className="hover:text-cyber-primary transition-colors">
                Courses
              </a>
              <span>/</span>
              <span className="text-cyber-text-secondary">{curriculum.metadata.title}</span>
            </div>

            {/* Title & Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
              {curriculum.metadata.title}
            </h1>
            <p className="text-lg md:text-xl text-cyber-text-secondary max-w-3xl leading-relaxed">
              {curriculum.metadata.description}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <CourseLayout
        hero={null}
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
