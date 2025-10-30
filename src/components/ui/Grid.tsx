import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 6 | 12;
  };
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, gap = "md", responsive, children, ...props }, ref) => {
    const gapStyles = {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    const colStyles: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    };

    const responsiveClasses = responsive
      ? [
          responsive.sm && `sm:grid-cols-${responsive.sm}`,
          responsive.md && `md:grid-cols-${responsive.md}`,
          responsive.lg && `lg:grid-cols-${responsive.lg}`,
          responsive.xl && `xl:grid-cols-${responsive.xl}`,
        ].filter(Boolean)
      : [];

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colStyles[cols],
          gapStyles[gap],
          ...responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  responsive?: {
    sm?: { colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" };
    md?: { colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" };
    lg?: { colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" };
  };
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan = 1, colStart, responsive, children, ...props }, ref) => {
    const spanStyles: Record<number | "full", string> = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    };

    const startStyles: Record<number, string> = {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7",
      8: "col-start-8",
      9: "col-start-9",
      10: "col-start-10",
      11: "col-start-11",
      12: "col-start-12",
    };

    const responsiveClasses = responsive
      ? [
          responsive.sm?.colSpan && `sm:col-span-${responsive.sm.colSpan === "full" ? "full" : responsive.sm.colSpan}`,
          responsive.md?.colSpan && `md:col-span-${responsive.md.colSpan === "full" ? "full" : responsive.md.colSpan}`,
          responsive.lg?.colSpan && `lg:col-span-${responsive.lg.colSpan === "full" ? "full" : responsive.lg.colSpan}`,
        ].filter(Boolean)
      : [];

    return (
      <div
        ref={ref}
        className={cn(
          spanStyles[colSpan],
          colStart && startStyles[colStart],
          ...responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", padding = true, children, ...props }, ref) => {
    const sizeStyles = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[1440px]",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeStyles[size],
          padding && "px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
