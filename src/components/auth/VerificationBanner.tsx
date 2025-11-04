"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function VerificationBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend verification email");
      }

      setMessage("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      setMessage(error.message || "Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="bg-cyber-warning/10 border-b border-cyber-warning/20">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-cyber-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-cyber-warning">
                Email Not Verified
              </p>
              <p className="text-sm text-cyber-text-secondary">
                {message || "Please verify your email address to access all features"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResend}
              isLoading={isLoading}
              disabled={!!message}
            >
              Resend Email
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-cyber-text-muted hover:text-cyber-text-primary transition-colors"
              aria-label="Dismiss"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
