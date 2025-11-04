"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";

interface Stat {
  label: string;
  value: string | number;
  color: string;
}

interface ProfileStatsProps {
  stats: Stat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className={`text-3xl font-bold mb-2 text-${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-cyber-text-secondary uppercase tracking-wider">
              {stat.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
