"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui";

interface ExploreCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: "primary" | "secondary" | "warning" | "danger";
}

const exploreCards: ExploreCard[] = [
  {
    title: "Browse Courses",
    description: "Explore our comprehensive cybersecurity curriculum",
    href: "/courses",
    color: "primary",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Practice Labs",
    description: "Hands-on challenges to test your skills",
    href: "/labs",
    color: "secondary",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: "Community",
    description: "Connect with fellow learners and experts",
    href: "/community",
    color: "warning",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Leaderboard",
    description: "See how you rank among other learners",
    href: "/leaderboard",
    color: "danger",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
];

const colorClasses = {
  primary: "bg-cyber-primary/10 text-cyber-primary group-hover:bg-cyber-primary/20",
  secondary: "bg-cyber-secondary/10 text-cyber-secondary group-hover:bg-cyber-secondary/20",
  warning: "bg-cyber-warning/10 text-cyber-warning group-hover:bg-cyber-warning/20",
  danger: "bg-cyber-danger/10 text-cyber-danger group-hover:bg-cyber-danger/20",
};

const borderColorClasses = {
  primary: "group-hover:border-cyber-primary",
  secondary: "group-hover:border-cyber-secondary",
  warning: "group-hover:border-cyber-warning",
  danger: "group-hover:border-cyber-danger",
};

export function ExploreMore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-cyber-text-primary mb-4">
        Explore more
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {exploreCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Link href={card.href} className="group">
              <Card
                className={`p-6 h-full transition-all duration-300 ${borderColorClasses[card.color]}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${colorClasses[card.color]}`}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-cyber-text-primary mb-2 group-hover:text-cyber-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-cyber-text-secondary">
                  {card.description}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
