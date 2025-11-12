import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  label?: string;
  current?: number;
  total?: number;
  value?: number; // Alternative: direct percentage value (0-100)
  className?: string;
  showPercentage?: boolean;
  variant?: "primary" | "secondary" | "success";
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  label,
  current,
  total,
  value,
  className,
  showPercentage = false,
  variant = "primary",
  size = "md",
}: ProgressBarProps) {
  // Use value if provided, otherwise calculate from current/total
  const percentage = value !== undefined
    ? Math.min(100, Math.max(0, value))
    : (total && current) ? Math.round((current / total) * 100) : 0;

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantColors = {
    primary: "bg-cyber-primary",
    secondary: "bg-cyber-secondary",
    success: "bg-green-500",
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-cyber-text-secondary">{label}</span>
          <span className="text-sm font-medium text-cyber-text-primary">
            {current !== undefined && total !== undefined && `${current}/${total}`}
            {showPercentage && ` (${percentage}%)`}
          </span>
        </div>
      )}
      <div className={cn("w-full bg-cyber-dark-secondary rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            variantColors[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
