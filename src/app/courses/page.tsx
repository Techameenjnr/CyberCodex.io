import { getAllCourses } from "@/lib/mdx";
import { CoursesClient } from "./CoursesClient";

export const metadata = {
  title: "Cybersecurity Courses - CyberCodex.io",
  description: "Browse our comprehensive library of cybersecurity courses, tutorials, and learning resources",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return <CoursesClient courses={courses} />;
}
