"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container, Badge } from "@/components/ui";
import { courseCategories, difficultyLevels } from "@/lib/config";
import type { CourseSummary } from "@/types";

interface CoursesClientProps {
  courses: CourseSummary[];
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
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-2 font-bold mb-4 gradient-text">Cybersecurity Courses</h1>
          <p className="text-xl text-cyber-text-secondary max-w-3xl">
            Master cybersecurity through hands-on tutorials and comprehensive learning paths
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 bg-cyber-dark-secondary border border-cyber-border rounded-lg
                     text-cyber-text-primary placeholder:text-cyber-text-muted
                     focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary
                     transition-all duration-200"
          />
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-cyber-text-secondary mb-3 uppercase tracking-wider">
              Category
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-cyber-primary text-cyber-dark"
                    : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary border border-cyber-border"
                }`}
              >
                All Categories
              </button>
              {courseCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-cyber-primary text-cyber-dark"
                      : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary border border-cyber-border"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-semibold text-cyber-text-secondary mb-3 uppercase tracking-wider">
              Difficulty
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedDifficulty("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDifficulty === "all"
                    ? "bg-cyber-primary text-cyber-dark"
                    : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary border border-cyber-border"
                }`}
              >
                All Levels
              </button>
              {Object.entries(difficultyLevels).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedDifficulty === key
                      ? "bg-cyber-primary text-cyber-dark"
                      : "bg-cyber-dark-secondary text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-primary border border-cyber-border"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const category = courseCategories.find((c) => c.id === course.category);
              const difficulty = difficultyLevels[course.difficulty];

              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="card group hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{category?.icon}</div>
                    <Badge variant={difficulty.color as any}>{difficulty.label}</Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-cyber-primary group-hover:text-cyber-secondary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-cyber-text-secondary mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-cyber-text-muted">
                    <span>{course.duration}</span>
                    {course.readingTime && <span>{course.readingTime} min read</span>}
                  </div>

                  {course.tags && course.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-cyber-dark-secondary border border-cyber-border rounded text-cyber-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
