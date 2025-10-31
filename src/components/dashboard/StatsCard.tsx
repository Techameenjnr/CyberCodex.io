import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
  className?: string;
}

export function StatsCard({ title, value, icon, color = "cyber-primary", className }: StatsCardProps) {
  return (
    <div className={cn("card p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-cyber-text-secondary">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className={`text-3xl font-bold text-${color}`}>
        {value}
      </div>
    </div>
  );
}
