"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface LeaderboardUser {
  id: string;
  name: string;
  username?: string;
  image?: string | null;
  xp: number;
  isVerified?: boolean;
}

export interface LeaderboardEntryProps {
  user: LeaderboardUser;
  rank: number;
  index: number;
}

export function LeaderboardEntry({ user, rank, index }: LeaderboardEntryProps) {
  // Determine medal/trophy for top 3
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  const medal = getMedalEmoji(rank);
  const isTopThree = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg transition-all duration-300",
        "hover:bg-cyber-dark-secondary/50",
        isTopThree && "bg-cyber-dark-secondary/30"
      )}
    >
      {/* Rank Number */}
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-lg font-bold flex-shrink-0",
        isTopThree
          ? "text-xl bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 border border-cyber-primary/30"
          : "text-lg text-cyber-text-muted"
      )}>
        {medal || rank}
      </div>

      {/* User Avatar & Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar
          src={user.image}
          alt={user.name}
          fallback={user.name}
          size="lg"
          showBorder={isTopThree}
          showGlow={isTopThree}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              "font-semibold truncate",
              isTopThree ? "text-cyber-primary" : "text-cyber-text-primary"
            )}>
              {user.name}
            </h3>
            {user.isVerified && (
              <svg
                className="w-5 h-5 text-cyber-secondary flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Verified"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          {user.username && (
            <p className="text-sm text-cyber-text-muted truncate">
              @{user.username}
            </p>
          )}
        </div>
      </div>

      {/* XP Display */}
      <div className={cn(
        "font-bold text-lg whitespace-nowrap flex-shrink-0",
        isTopThree ? "text-cyber-primary" : "text-cyber-text-secondary"
      )}>
        {user.xp.toLocaleString()} XP
      </div>
    </motion.div>
  );
}
