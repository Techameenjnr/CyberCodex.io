import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";

export interface PricingFeature {
  readonly text: string;
  readonly included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: readonly PricingFeature[];
  ctaText: string;
  ctaVariant?: "primary" | "secondary" | "ghost";
  onCtaClick?: () => void;
  badge?: string;
  highlighted?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  ctaText,
  ctaVariant = "primary",
  onCtaClick,
  badge,
  highlighted = false,
  icon,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg p-8 transition-all duration-300 h-full flex flex-col",
        highlighted
          ? "bg-cyber-dark-secondary border-2 border-cyber-primary shadow-lg glow-primary"
          : "bg-cyber-dark-secondary border border-cyber-border hover:border-cyber-primary/50",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="primary" className="text-xs font-bold px-3 py-1">
            {badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}

        <h3 className="text-xl font-bold text-cyber-text-secondary mb-2">
          {title}
        </h3>

        <div className="mb-3">
          <span className="text-5xl font-bold text-cyber-text-primary">
            {price}
          </span>
          {period && (
            <span className="text-lg text-cyber-text-secondary ml-2">
              {period}
            </span>
          )}
        </div>

        <p className="text-cyber-text-secondary">{description}</p>
      </div>

      {/* Features List */}
      <div className="space-y-3 flex-grow mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            {feature.included ? (
              <svg
                className="w-5 h-5 text-cyber-primary flex-shrink-0 mt-0.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-cyber-text-muted flex-shrink-0 mt-0.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span
              className={cn(
                "text-sm",
                feature.included ? "text-cyber-text-primary" : "text-cyber-text-muted"
              )}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button - Now at bottom */}
      <Button
        variant={ctaVariant}
        size="lg"
        fullWidth
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>
    </div>
  );
}
