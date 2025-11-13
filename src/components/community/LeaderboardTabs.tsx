"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type LeaderboardPeriod = "weekly" | "alltime";

export interface LeaderboardTabsProps {
  onPeriodChange?: (period: LeaderboardPeriod) => void;
  defaultPeriod?: LeaderboardPeriod;
}

export function LeaderboardTabs({ onPeriodChange, defaultPeriod = "alltime" }: LeaderboardTabsProps) {
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>(defaultPeriod);

  const tabs = [
    { id: "weekly" as LeaderboardPeriod, label: "Weekly" },
    { id: "alltime" as LeaderboardPeriod, label: "All Time" },
  ];

  const handleTabClick = (period: LeaderboardPeriod) => {
    setActivePeriod(period);
    onPeriodChange?.(period);
  };

  return (
    <div className="inline-flex bg-cyber-dark-secondary rounded-lg p-1 border border-cyber-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "relative px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200",
            activePeriod === tab.id
              ? "text-cyber-dark"
              : "text-cyber-text-secondary hover:text-cyber-text-primary"
          )}
        >
          {activePeriod === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-cyber-primary rounded-md"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
