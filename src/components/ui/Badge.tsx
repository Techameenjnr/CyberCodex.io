import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-cyber-dark-secondary text-cyber-text-primary border-cyber-border",
      primary: "bg-cyber-primary/20 text-cyber-primary border-cyber-primary/30",
      secondary: "bg-cyber-secondary/20 text-cyber-secondary border-cyber-secondary/30",
      success: "bg-green-500/20 text-green-400 border-green-500/30",
      warning: "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/30",
      danger: "bg-cyber-danger/20 text-cyber-danger border-cyber-danger/30",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          "transition-colors duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
