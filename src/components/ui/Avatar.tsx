import { forwardRef, ImgHTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBorder?: boolean;
  showGlow?: boolean;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "User avatar",
      fallback,
      size = "md",
      showBorder = false,
      showGlow = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
      xl: "w-16 h-16 text-lg",
    };

    const baseStyles = "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-cyber-dark-secondary flex-shrink-0";

    const borderStyles = showBorder ? "ring-2 ring-cyber-border" : "";
    const glowStyles = showGlow ? "glow-primary" : "";

    // Generate initials from fallback text or alt
    const getInitials = () => {
      const text = fallback || alt || "?";
      return text
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], borderStyles, glowStyles, className)}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={size === "sm" ? "32px" : size === "md" ? "40px" : size === "lg" ? "48px" : "64px"}
          />
        ) : (
          <span className="font-medium text-cyber-text-secondary select-none">
            {getInitials()}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
