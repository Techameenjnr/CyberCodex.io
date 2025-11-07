import { cn } from "@/lib/utils";
import Image from "next/image";

interface Feature {
  readonly name: string;
  readonly info: string;
  readonly free: boolean | string;
  readonly pro: boolean | string;
}

interface FeatureCategory {
  readonly category: string;
  readonly features: readonly Feature[];
}

export interface FeatureComparisonProps {
  features: readonly FeatureCategory[];
  className?: string;
}

export function FeatureComparison({ features, className }: FeatureComparisonProps) {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <svg
          className="w-6 h-6 text-cyber-primary mx-auto"
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
        <span className="text-cyber-text-muted text-2xl">-</span>
      );
    }
    return <span className="text-cyber-text-primary text-sm font-medium">{value}</span>;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Logo - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex col-span-1 items-center justify-center">
          <div className="font-pixel leading-tight text-center" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}>
            <span className="text-cyber-primary">Cyber</span>
            <span className="text-cyber-text-primary">Codex.io</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-lg overflow-hidden">
            <Image
              src="/images/categories/possibleCharacter.gif"
              alt="Explorer"
              width={64}
              height={64}
              className="object-cover"
              unoptimized
            />
          </div>
          <h3 className="text-xl font-bold text-cyber-text-secondary mb-1">Explorer</h3>
          <button className="px-6 py-2 mt-2 border border-cyber-border rounded-lg text-cyber-text-primary hover:border-cyber-primary transition-colors duration-200">
            Start for Free
          </button>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-lg overflow-hidden">
            <Image
              src="/images/logo/coin.webp"
              alt="Elite Hacker"
              width={64}
              height={64}
              className="object-cover"
              unoptimized
            />
          </div>
          <h3 className="text-xl font-bold text-cyber-primary mb-1">ELITE</h3>
          <button className="px-6 py-2 mt-2 bg-cyber-primary text-cyber-dark rounded-lg font-bold hover:bg-cyber-primary/90 transition-colors duration-200">
            Join Elite
          </button>
        </div>
      </div>

      {/* Feature Rows */}
      <div className="space-y-8">
        {features.map((category) => (
          <div key={category.category}>
            <h4 className="text-xs font-bold text-cyber-text-muted uppercase tracking-wider mb-4 px-2">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.features.map((feature) => (
                <div
                  key={feature.name}
                  className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 gap-4 md:gap-6 items-center py-4 px-4 rounded-lg hover:bg-cyber-dark-secondary transition-colors duration-200"
                >
                  <div className="col-span-1 flex items-center space-x-2">
                    <span className="text-cyber-text-primary font-medium text-sm md:text-base">
                      {feature.name}
                    </span>
                    <button
                      title={feature.info}
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-cyber-border text-cyber-text-muted hover:text-cyber-primary hover:border-cyber-primary transition-colors duration-200 text-xs flex-shrink-0"
                    >
                      i
                    </button>
                  </div>
                  <div className="text-center w-12 md:w-auto">{renderValue(feature.free)}</div>
                  <div className="text-center w-12 md:w-auto">{renderValue(feature.pro)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
