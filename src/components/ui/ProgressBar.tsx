import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  label?: string;
  current: number;
  total: number;
  className?: string;
  showPercentage?: boolean;
  variant?: "primary" | "secondary" | "success";
}

export function ProgressBar({
  label,
  current,
  total,
  className,
  showPercentage = false,
  variant = "primary",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

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
            {current}/{total}
            {showPercentage && ` (${percentage}%)`}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-cyber-dark-secondary rounded-full overflow-hidden">
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
