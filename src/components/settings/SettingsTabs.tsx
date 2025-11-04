"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { PreferencesTab } from "./PreferencesTab";
import { AccountTab } from "./AccountTab";

type Tab = "profile" | "security" | "preferences" | "account";

interface SettingsTabsProps {
  user: any;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "preferences", label: "Preferences", icon: "⚙️" },
  { id: "account", label: "Account", icon: "🗑️" },
];

export function SettingsTabs({ user }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-cyber-border">
        <nav className="flex space-x-8" aria-label="Settings tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-4 px-1 text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:ring-offset-2 focus:ring-offset-cyber-dark",
                activeTab === tab.id
                  ? "text-cyber-primary"
                  : "text-cyber-text-secondary hover:text-cyber-text-primary"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "profile" && <ProfileTab user={user} />}
        {activeTab === "security" && <SecurityTab user={user} />}
        {activeTab === "preferences" && <PreferencesTab user={user} />}
        {activeTab === "account" && <AccountTab user={user} />}
      </motion.div>
    </div>
  );
}
