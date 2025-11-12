"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Badge } from "@/components/ui";
import { courseCategories, difficultyLevels } from "@/lib/config";
import type { CourseSummary } from "@/types";

interface CoursesClientProps {
  courses: CourseSummary[];
}

/**
 * CategoryHeader Component
 * Renders animated GIF as full-width header with fallback to emoji
 * Optimized for performance with lazy loading and proper sizing
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

export function CoursesClient({ courses }: CoursesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [courses, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Banner Section */}
      <div className="relative mb-16 -mt-32 pt-32 pb-20 overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/computerGuy.gif"
            alt="Cybersecurity Courses Background"
            fill
            className="object-cover"
            priority
            unoptimized
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/60 to-cyber-dark" />
          {/* Additional dark overlay at top for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        {/* Header Content */}
        <Container>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-2 font-bold mb-4 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%)] px-4">
              Cybersecurity Courses
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)] px-4">
              Master cybersecurity through hands-on tutorials and comprehensive learning paths
            </p>
          </div>
        </Container>
      </div>

      <Container>

        {/* Search */}
        <div className="mb-10">
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search courses by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-cyber-dark-secondary border border-cyber-border rounded-lg
                       text-cyber-text-primary placeholder:text-cyber-text-muted
                       focus:outline-none focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-cyber-text-secondary mb-4 uppercase tracking-wider">
              Category
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  selectedCategory === "all"
                    ? "bg-cyber-primary text-cyber-dark shadow-lg shadow-cyber-primary/20"
                    : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary hover:border-cyber-primary/50 border border-cyber-border"
                }`}
              >
                <span className="hidden sm:inline">All Categories</span>
                <span className="sm:hidden">All</span>
              </button>
              {courseCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-cyber-primary text-cyber-dark shadow-lg shadow-cyber-primary/20"
                      : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary hover:border-cyber-primary/50 border border-cyber-border"
                  }`}
                >
                  <span className="sm:hidden">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-semibold text-cyber-text-secondary mb-4 uppercase tracking-wider">
              Difficulty
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedDifficulty("all")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  selectedDifficulty === "all"
                    ? "bg-cyber-primary text-cyber-dark shadow-lg shadow-cyber-primary/20"
                    : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary hover:border-cyber-primary/50 border border-cyber-border"
                }`}
              >
                All Levels
              </button>
              {Object.entries(difficultyLevels).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(key)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    selectedDifficulty === key
                      ? "bg-cyber-primary text-cyber-dark shadow-lg shadow-cyber-primary/20"
                      : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary hover:border-cyber-primary/50 border border-cyber-border"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-cyber-text-secondary">
            Showing <span className="text-cyber-primary font-semibold">{filteredCourses.length}</span> course
            {filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
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
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-cyber-text-secondary mb-4">No courses found</p>
            <p className="text-cyber-text-muted">Try adjusting your filters or search query</p>
          </div>
        )}
      </Container>
    </main>
  );
}
