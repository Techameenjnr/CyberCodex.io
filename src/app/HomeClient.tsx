"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/features";
import { Badge } from "@/components/ui";
import { courseCategories, difficultyLevels } from "@/lib/config";
import type { CourseSummary } from "@/types";

interface HomeClientProps {
  courses: CourseSummary[];
}

/**
 * CategoryHeader Component
 * Renders animated GIF as full-width header with fallback to emoji
 */
function CategoryHeader({ icon, iconGif, alt }: { icon: string; iconGif?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  // If no GIF provided or GIF failed to load, use emoji gradient background
  if (!iconGif || imageError) {
    return (
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-cyber-primary/10 via-cyber-secondary/10 to-cyber-accent/10
                    flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 h-32 overflow-hidden">
      <Image
        src={iconGif}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setImageError(true)}
        loading="lazy"
        unoptimized // Required for GIFs to animate
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyber-dark-secondary" />
    </div>
  );
}

export function HomeClient({ courses }: HomeClientProps) {
  // Show first 6 courses on homepage
  const featuredCourses = courses.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero Section with 3D */}
      <Hero />

      {/* Featured Courses Section */}
      <section className="py-20 bg-cyber-dark-secondary">
        <div className="container-custom">
          <h2 className="text-display-2 text-center mb-4">Featured Courses</h2>
          <p className="text-center text-cyber-text-secondary mb-12 max-w-2xl mx-auto">
            Start your cybersecurity journey with our most popular courses
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => {
              const category = courseCategories.find((c) => c.id === course.category);
              const difficulty = difficultyLevels[course.difficulty];

              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="card group hover:scale-[1.02] transition-all duration-300 !p-0 overflow-hidden"
                >
                  {/* Header Image/GIF */}
                  <CategoryHeader
                    icon={category?.icon || "📚"}
                    iconGif={category?.iconGif}
                    alt={`${category?.name || "Course"} icon`}
                  />

                  {/* Card Content */}
                  <div className="relative z-10 p-6 pt-36">
                    {/* Badge positioned at top-right corner of card */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-cyber-dark/90 backdrop-blur-md rounded-full p-1 shadow-lg shadow-black/50 border border-cyber-border/50">
                        <Badge variant={difficulty.color as any}>{difficulty.label}</Badge>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold mb-3 text-cyber-primary group-hover:text-cyber-secondary transition-colors duration-200"
                      style={{ fontSize: 'var(--font-size-card-title)' }}
                    >
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-cyber-text-secondary mb-5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Duration and Reading Time */}
                    <div className="flex items-center gap-3 text-sm text-cyber-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                      {course.readingTime && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {course.readingTime} min read
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-cyber-dark border border-cyber-border rounded-full text-cyber-text-muted
                                     group-hover:border-cyber-primary/30 transition-all duration-200"
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Courses Link */}
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="btn btn-primary text-lg inline-flex items-center gap-2"
            >
              View All Courses
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10">
        <div className="container-custom text-center">
          <h2 className="text-display-2 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-cyber-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering cybersecurity skills
          </p>
          <Link href="/courses" className="btn btn-primary text-lg">
            Get Started for Free
          </Link>
        </div>
      </section>
    </main>
  );
}
