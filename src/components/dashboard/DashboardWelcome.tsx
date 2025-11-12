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
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyber-text-primary mb-2 md:mb-3">
        {getGreeting()}, <span className="gradient-text">{userName}</span>
      </h1>
      <p className="text-base md:text-lg text-cyber-text-secondary">
        Ready to level up your cybersecurity skills?
      </p>
    </motion.div>
  );
}
