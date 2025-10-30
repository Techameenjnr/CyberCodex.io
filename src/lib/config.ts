/**
 * Application Configuration
 */

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "CyberCodex.io",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    description: "Master Cybersecurity & Ethical Hacking through interactive tutorials and hands-on labs",
  },

  routes: {
    home: "/",
    courses: "/courses",
    labs: "/labs",
    community: "/community",
    about: "/about",
    login: "/auth/login",
    signup: "/auth/signup",
    profile: "/profile",
  },

  navigation: {
    main: [
      { label: "Courses", href: "/courses" },
      { label: "Labs", href: "/labs" },
      { label: "Community", href: "/community" },
      { label: "About", href: "/about" },
    ],
  },

  features: {
    auth: false, // Will enable when NextAuth is set up
    comments: false, // Will enable when comment system is ready
    labs: false, // Will enable when lab environment is ready
  },

  content: {
    coursesPerPage: 12,
    labsPerPage: 12,
    maxRecentCourses: 6,
  },

  social: {
    github: "https://github.com/cybercodex",
    twitter: "https://twitter.com/cybercodex",
    discord: "https://discord.gg/cybercodex",
  },
} as const;

/**
 * Course Categories
 */
export const courseCategories = [
  {
    id: "web-security",
    name: "Web Security",
    description: "Master web application security and common vulnerabilities",
    icon: "🔐",
    color: "cyber-primary",
  },
  {
    id: "network-security",
    name: "Network Security",
    description: "Learn network protocols and penetration testing",
    icon: "🌐",
    color: "cyber-secondary",
  },
  {
    id: "cryptography",
    name: "Cryptography",
    description: "Understand encryption and cryptographic protocols",
    icon: "🔑",
    color: "cyber-warning",
  },
  {
    id: "penetration-testing",
    name: "Penetration Testing",
    description: "Hands-on ethical hacking techniques",
    icon: "🎯",
    color: "cyber-danger",
  },
  {
    id: "malware-analysis",
    name: "Malware Analysis",
    description: "Analyze and reverse engineer malicious software",
    icon: "🦠",
    color: "cyber-primary",
  },
  {
    id: "cloud-security",
    name: "Cloud Security",
    description: "Secure cloud infrastructure and services",
    icon: "☁️",
    color: "cyber-secondary",
  },
] as const;

/**
 * Difficulty Levels
 */
export const difficultyLevels = {
  beginner: {
    label: "Beginner",
    color: "green",
    description: "No prior knowledge required",
  },
  intermediate: {
    label: "Intermediate",
    color: "yellow",
    description: "Some basic knowledge required",
  },
  advanced: {
    label: "Advanced",
    color: "red",
    description: "Strong foundation required",
  },
} as const;

/**
 * Lab Environments
 */
export const labEnvironments = {
  web: {
    name: "Web Application",
    icon: "🌐",
    description: "Practice web security in a sandboxed environment",
  },
  terminal: {
    name: "Terminal",
    icon: "💻",
    description: "Command-line based challenges",
  },
  network: {
    name: "Network",
    icon: "🔗",
    description: "Network analysis and penetration testing",
  },
  binary: {
    name: "Binary Exploitation",
    icon: "⚙️",
    description: "Reverse engineering and exploitation",
  },
} as const;

export type CourseCategory = typeof courseCategories[number]["id"];
export type DifficultyLevel = keyof typeof difficultyLevels;
export type LabEnvironment = keyof typeof labEnvironments;
