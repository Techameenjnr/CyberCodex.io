"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { Button } from "@/components/ui";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";

interface NavigationProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
    level?: number;
  } | null;
}

export function Navigation({ user }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll to change nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cyber-dark/90 backdrop-blur-lg border-b border-cyber-border"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Hide logo GIF on mobile when menu is open, always show on desktop */}
              <div
                className={cn(
                  "relative w-10 h-10 md:w-12 md:h-12 transition-opacity duration-300",
                  isOpen ? "md:block hidden" : "block"
                )}
              >
                <Image
                  src="/images/logo/possibleCharacter.gif"
                  alt="CyberCodex Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                  priority
                />
              </div>
              {/* Hide logo text on mobile when menu is open, always show on desktop */}
              <div
                className={cn(
                  "font-pixel leading-tight transition-opacity duration-300",
                  isOpen ? "md:block hidden" : "block"
                )}
                style={{ fontSize: 'var(--font-size-nav-logo)' }}
              >
                <span className="text-cyber-primary">Cyber</span>
                <span className="text-cyber-text-primary">Codex.io</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {config.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors duration-200 relative group",
                    isActive(item.href)
                      ? "text-cyber-primary"
                      : "text-cyber-text-secondary hover:text-cyber-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-cyber-primary transition-all duration-200",
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} />
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-cyber-text-primary p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    "block h-0.5 bg-current transition-all duration-300",
                    isOpen ? "rotate-45 translate-y-2" : "rotate-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-current transition-all duration-300",
                    isOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-current transition-all duration-300",
                    isOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cyber-dark border-l border-cyber-border"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center p-6 border-b border-cyber-border">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/images/logo/possibleCharacter.gif"
                        alt="CyberCodex Logo"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="font-pixel leading-tight" style={{ fontSize: 'var(--font-size-nav-logo)' }}>
                      <span className="text-cyber-primary">Cyber</span>
                      <span className="text-cyber-text-primary">Codex.io</span>
                    </div>
                  </div>
                </div>

                {/* Menu Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="flex flex-col space-y-1 px-6">
                    {config.navigation.main.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200",
                            isActive(item.href)
                              ? "bg-cyber-primary/10 text-cyber-primary"
                              : "text-cyber-text-secondary hover:bg-cyber-dark-secondary hover:text-cyber-primary"
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-6 border-t border-cyber-border space-y-3">
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth>
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth>
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="md"
                        fullWidth
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="secondary" size="md" fullWidth>
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button variant="primary" size="md" fullWidth>
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
