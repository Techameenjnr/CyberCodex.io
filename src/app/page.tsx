import { getAllCourses } from "@/lib/mdx";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const courses = getAllCourses();

  return <HomeClient courses={courses} />;
}
