"use client";

import { Card, Badge } from "@/components/ui";
import { motion } from "framer-motion";

export interface Update {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "fix" | "update" | "announcement";
}

export interface UpdatesCardProps {
  updates: Update[];
}

export function UpdatesCard({ updates }: UpdatesCardProps) {
  const getTypeVariant = (type: Update["type"]) => {
    switch (type) {
      case "feature":
        return "primary";
      case "fix":
        return "danger";
      case "update":
        return "secondary";
      case "announcement":
        return "warning";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: Update["type"]) => {
    switch (type) {
      case "feature":
        return "New Feature";
      case "fix":
        return "Bug Fix";
      case "update":
        return "Update";
      case "announcement":
        return "Announcement";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-3 overflow-y-auto scrollbar-cyber min-h-[660px] max-h-[660px] pr-1">
        {updates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card padding="md" hover className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <Badge variant={getTypeVariant(update.type)} size="sm">
                  {getTypeLabel(update.type)}
                </Badge>
                <time className="text-xs text-cyber-text-muted whitespace-nowrap">
                  {update.date}
                </time>
              </div>
              <h4 className="font-semibold text-cyber-text-primary">
                {update.title}
              </h4>
              <p className="text-sm text-cyber-text-secondary leading-relaxed">
                {update.description}
              </p>
            </Card>
          </motion.div>
        ))}
    </div>
  );
}
