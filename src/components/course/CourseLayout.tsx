import { ReactNode } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface CourseLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  hero?: ReactNode;
  className?: string;
}

export function CourseLayout({
  children,
  sidebar,
  hero,
  className,
}: CourseLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      {hero && <div className="w-full">{hero}</div>}

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-8">
            {children}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              {sidebar}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
