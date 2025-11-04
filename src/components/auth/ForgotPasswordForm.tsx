"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ui";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setMessage({
        type: "success",
        text: "Password reset email sent! Please check your inbox.",
      });
      setEmail("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        fullWidth
      />

      {message && (
        <div
          className={cn(
            "p-4 rounded-lg",
            message.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : "bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/20"
          )}
        >
          {message.text}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} fullWidth>
        Send Reset Link
      </Button>
    </form>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
