"use client";

import { motion } from "framer-motion";

interface DashboardWelcomeProps {
  userName: string;
}

export function DashboardWelcome({ userName }: DashboardWelcomeProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-cyber-text-primary mb-2">
        {getGreeting()}, <span className="gradient-text">{userName}</span>
      </h1>
      <p className="text-lg text-cyber-text-secondary">
        Ready to level up your cybersecurity skills?
      </p>
    </motion.div>
  );
}
