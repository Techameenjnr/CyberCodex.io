"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container, Button, Card, CardContent } from "@/components/ui";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const values = [
    {
      backgroundGif: "/images/banners/GameSpooky3.gif",
      title: "Practical Learning",
      subtext: "Build real skills through interactive labs, CTF challenges, and practical exercises. Hands-on courses with real-world scenarios that prepare you for actual security challenges. Every lesson includes hands-on practice to reinforce your learning.",
      badge: "Learn by Doing"
    },
    {
      backgroundGif: "/images/banners/GameSpooky.gif",
      title: "Ethical Focus",
      subtext: "Learn the right way to apply security knowledge. We emphasize responsible disclosure, legal boundaries, and ethical hacking principles. Teaching responsible security practices with emphasis on ethics and legal compliance.",
      badge: "Responsible Security"
    },
    {
      backgroundGif: "/images/banners/shock.gif",
      title: "Always Current",
      subtext: "Stay ahead of emerging threats with regularly updated content. Our courses evolve with the cybersecurity landscape to keep you relevant. Content updated regularly to reflect the latest threats, tools, and techniques.",
      badge: "Up-to-Date"
    },
    {
      backgroundGif: "/images/banners/GameSpooky2.gif",
      title: "Community Driven",
      subtext: "Join a vibrant community of learners, share knowledge, get help, and collaborate on challenges. Learn alongside thousands of security enthusiasts and professionals worldwide. Learn together, grow together.",
      badge: "10,000+ Members"
    },
  ];

  const [activeTab, setActiveTab] = useState<"about" | "skills" | "journey">("about");

  const skills = [
    { category: "Frontend", items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 }
    ]},
    { category: "Backend", items: [
      { name: "C, C++, C#", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "API Design", level: 88 }
    ]},
    { category: "Security", items: [
      { name: "Penetration Testing", level: 78 },
      { name: "CCNA Certified", level: 85 },
      { name: "Network Security", level: 75 },
      { name: "Ethical Hacking", level: 80 }
    ]},
    { category: "Tools", items: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Linux", level: 82 },
      { name: "Kali", level: 70 }
    ]},
  ];

  const journey = [
    { year: "2026", title: "Graduated College with B.S. in Cybersecurity and Computer Science", description: "Studied ethical hacking, network defense, and software engineering — bridging security and development through hands-on projects." },
    { year: "2025", title: "Launched CyberCodex.io", description: "Built and deployed a cybersecurity education platform focused on Linux, Python, and ethical hacking fundamentals. Designed branding, frontend, and backend architecture." },
    { year: "2024", title: "IT Network Technician - NPCE", description: "Supported enterprise networks, configured domain accounts, firewalls, and remote deployments across multiple client sites. Developed internal automation scripts to improve workflow." },
    { year: "2023", title: "Node.io & Automation SaaS Prototypes", description: "Prototyped Node.io and n8n-driven workflow automations for small businesses, automating daily reports, email triggers, and schedule notifications." },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative mb-16 pt-32 pb-20 overflow-hidden min-h-[400px] md:min-h-[500px]">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/space_banner.png"
            alt="CyberCodex About Background"
            fill
            className="object-cover"
            priority
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/60 to-cyber-dark" />
          {/* Additional dark overlay at top for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        {/* Header Content */}
        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-display-2 font-bold mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%)] text-center"
            >
              About CyberCodex.io
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              We're on a mission to democratize cybersecurity knowledge and empower the next generation of security professionals
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Mission Section */}
      <section className="mb-20 -mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-display-2 gradient-text mb-6">Our Story</h2>
            <p className="text-lg text-cyber-text-secondary mb-6 leading-relaxed">
              CyberCodex was born from a simple observation: cybersecurity education was either too theoretical or
              inaccessible to most people. We set out to change that by creating a platform where anyone, regardless
              of their background, could learn practical security skills through hands-on experience.
            </p>
            <p className="text-lg text-cyber-text-secondary leading-relaxed">
              Today, we're proud to serve a global community of learners, from curious beginners to seasoned professionals
              looking to expand their skillset. Every course, every lab, and every challenge is designed with one goal in mind:
              to make you a better security professional.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="mb-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              What We Believe
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              Our core values guide everything we do, from course design to community support
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border-cyber-border hover:border-cyber-primary transition-all duration-500 !p-0 overflow-hidden relative hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                  {/* Background GIF - Shorter */}
                  <div className="absolute inset-x-0 top-0 h-32 overflow-hidden">
                    <Image
                      src={value.backgroundGif}
                      alt={`${value.title} background`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/40 via-cyber-dark/70 to-cyber-dark-secondary" />
                    {/* Additional vignette effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-cyber-dark/90 backdrop-blur-md rounded-full px-4 py-1.5 shadow-lg shadow-black/50 border border-cyber-primary/50">
                      <span className="text-xs font-bold text-cyber-primary">{value.badge}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="relative z-10 pt-36 pb-8 px-6">
                    <h3 className="text-2xl font-bold text-cyber-primary mb-4 group-hover:text-cyber-secondary transition-colors duration-300 text-center">
                      {value.title}
                    </h3>
                    <p className="text-cyber-text-secondary leading-relaxed group-hover:text-cyber-text-primary transition-colors duration-300">
                      {value.subtext}
                    </p>

                    {/* Decorative bottom accent */}
                    <div className="mt-6 flex justify-center">
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent via-cyber-primary to-transparent group-hover:w-24 transition-all duration-300"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Creator Section - Enhanced */}
      <section className="mb-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meet the Creator
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              Full-stack developer and cybersecurity innovator focused on building practical, educational platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="border-cyber-border hover:border-cyber-primary transition-all duration-500 overflow-hidden bg-cyber-dark-secondary/60 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Profile Sidebar */}
                <div className="md:col-span-1 p-8 bg-gradient-to-br from-cyber-primary/5 via-cyber-secondary/5 to-transparent border-r border-cyber-border/50">
                  {/* Animated Profile Image with Glowing Border */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative w-48 h-48 mx-auto mb-6 group"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-25 blur-sm group-hover:opacity-40 transition-opacity duration-300 animate-[border-glow_3s_ease-in-out_infinite]"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyber-primary/50 group-hover:border-cyber-primary transition-all duration-300 bg-cyber-dark">
                      <Image
                        src="/images/guy/guyWakesUp.gif"
                        alt="Jordan Hymas"
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  </motion.div>

                  {/* Name & Title */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-cyber-primary mb-2">
                      Jordan Hymas
                    </h3>
                    <p className="text-cyber-secondary font-semibold mb-1">
                      Founder & Developer
                    </p>
                    <p className="text-sm text-cyber-text-muted">
                      Cyber Security • Computer Science 
                    </p>
                  </div>

                  {/* Social Links with Enhanced Hover */}
                  <div className="flex gap-3 justify-center mb-8">
                    <a
                      href="https://github.com/Jhymas20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-cyber-dark border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                    >
                      <svg className="w-6 h-6 text-cyber-text-primary hover:text-cyber-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jordan-hymas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-cyber-dark border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                    >
                      <svg className="w-6 h-6 text-cyber-text-primary hover:text-cyber-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@node.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-cyber-dark border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                    >
                      <svg className="w-6 h-6 text-cyber-text-primary hover:text-cyber-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    </a>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark/50 border border-cyber-border/30">
                      <span className="text-sm text-cyber-text-muted">Location</span>
                      <span className="text-sm text-cyber-primary font-semibold">United States</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark/50 border border-cyber-border/30">
                      <span className="text-sm text-cyber-text-muted">Experience</span>
                      <span className="text-sm text-cyber-primary font-semibold">4+ Years</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark/50 border border-cyber-border/30">
                      <span className="text-sm text-cyber-text-muted">Projects</span>
                      <span className="text-sm text-cyber-primary font-semibold">20+ Completed</span>
                    </div>
                  </div>
                </div>

                {/* Content Area with Tabs */}
                <div className="md:col-span-2 p-8">
                  {/* Tab Navigation */}
                  <div className="flex gap-2 mb-8 border-b border-cyber-border/50 pb-2">
                    <button
                      onClick={() => setActiveTab("about")}
                      className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                        activeTab === "about"
                          ? "bg-cyber-primary text-cyber-dark"
                          : "text-cyber-text-secondary hover:text-cyber-primary hover:bg-cyber-dark/50"
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab("skills")}
                      className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                        activeTab === "skills"
                          ? "bg-cyber-primary text-cyber-dark"
                          : "text-cyber-text-secondary hover:text-cyber-primary hover:bg-cyber-dark/50"
                      }`}
                    >
                      Skills
                    </button>
                    <button
                      onClick={() => setActiveTab("journey")}
                      className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                        activeTab === "journey"
                          ? "bg-cyber-primary text-cyber-dark"
                          : "text-cyber-text-secondary hover:text-cyber-primary hover:bg-cyber-dark/50"
                      }`}
                    >
                      Journey
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[400px]">
                    {/* About Tab */}
                    {activeTab === "about" && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h4 className="text-2xl font-bold text-cyber-primary mb-4">About Me</h4>
                        <div className="space-y-4 text-cyber-text-secondary leading-relaxed">
                          <p>
                            Full-stack developer and cybersecurity enthusiast dedicated to making security education accessible and engaging.
                            I built CyberCodex to bridge the gap between theoretical knowledge and practical skills, creating a platform where
                            anyone can learn by doing.
                          </p>
                          <p>
                            With a background in network security (CCNA certified) and full-stack development, I combine deep technical expertise
                            with a passion for education. Every course, lab, and challenge on CyberCodex is designed from real-world experience
                            and best practices in the cybersecurity industry.
                          </p>
                          <p>
                            When I'm not coding or designing new learning experiences, you'll find me:
                          </p>
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Contributing to open-source security tools and educational resources</li>
                            <li>Researching emerging threats and vulnerabilities</li>
                            <li>Mentoring aspiring developers and security professionals</li>
                            <li>Building automation tools to streamline workflows</li>
                          </ul>
                          <p className="pt-4 text-cyber-primary font-semibold">
                            "The best way to learn cybersecurity is to practice it. That's why every lesson on CyberCodex includes hands-on challenges."
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === "skills" && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h4 className="text-2xl font-bold text-cyber-primary mb-6">Skills & Expertise</h4>
                        <div className="space-y-8">
                          {skills.map((skillGroup, index) => (
                            <div key={index}>
                              <h5 className="text-lg font-bold text-cyber-secondary mb-4">{skillGroup.category}</h5>
                              <div className="space-y-4">
                                {skillGroup.items.map((skill, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-semibold text-cyber-text-primary group-hover:text-cyber-primary transition-colors">
                                        {skill.name}
                                      </span>
                                      <span className="text-sm text-cyber-text-muted">
                                        {skill.level}%
                                      </span>
                                    </div>
                                    <div className="h-2 bg-cyber-dark rounded-full overflow-hidden border border-cyber-border/30">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-full relative group-hover:shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-shadow"
                                      >
                                        <div className="absolute inset-0 bg-white/20 animate-[scan-line_2s_ease-in-out_infinite]"></div>
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Journey Tab */}
                    {activeTab === "journey" && (
                      <motion.div
                        key="journey"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h4 className="text-2xl font-bold text-cyber-primary mb-6">My Journey</h4>
                        <div className="space-y-6 relative">
                          {/* Timeline Line */}
                          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-primary via-cyber-secondary to-cyber-primary/20"></div>

                          {journey.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 }}
                              className="relative pl-12 group"
                            >
                              {/* Timeline Dot */}
                              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-cyber-dark border-2 border-cyber-primary flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all duration-300">
                                <div className="w-3 h-3 rounded-full bg-cyber-primary animate-pulse"></div>
                              </div>

                              {/* Content */}
                              <div className="p-4 rounded-lg bg-cyber-dark/50 border border-cyber-border/50 group-hover:border-cyber-primary/50 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 rounded-full bg-cyber-primary/20 text-cyber-primary text-xs font-bold">
                                    {item.year}
                                  </span>
                                  <h5 className="text-lg font-bold text-cyber-text-primary">
                                    {item.title}
                                  </h5>
                                </div>
                                <p className="text-sm text-cyber-text-secondary leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Banner Section */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] mb-0">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/GameSpooky.gif"
            alt="Join CyberCodex"
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/60 to-cyber-dark" />
          {/* Additional dark overlay at top for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 relative">
                <Image
                  src="/images/logo/gengar.gif"
                  alt="CyberCodex"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%)]">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Join our community of learners and take the first step toward becoming a cybersecurity professional
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/courses">
                <Button variant="primary" size="lg" className="text-lg px-8 py-6 shadow-2xl">
                  <span className="flex items-center gap-2">
                    Browse Courses
                  </span>
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="lg" className="text-lg px-8 py-6 border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:border-cyber-primary hover:bg-cyber-primary/20 text-white shadow-2xl">
                  <span className="flex items-center gap-2">
                    View Pricing
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
