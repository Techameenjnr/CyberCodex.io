"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components/ui";
import { calculatePasswordStrength } from "@/lib/utils/password-validation";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const passwordStrength = calculatePasswordStrength(passwords.newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Client-side validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    if (passwordStrength.score < 3) {
      setMessage({ type: "error", text: "Password is too weak. Please choose a stronger password." });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setMessage({
        type: "success",
        text: "Password reset successfully! Redirecting to login...",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="New Password"
        type="password"
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
        placeholder="Enter your new password (min 12 characters)"
        required
        fullWidth
      />

      {/* Password Strength Indicator */}
      {passwords.newPassword && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-cyber-dark-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  passwordStrength.color === "red" && "bg-red-500",
                  passwordStrength.color === "yellow" && "bg-yellow-500",
                  passwordStrength.color === "green" && "bg-green-500"
                )}
                style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
              />
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                passwordStrength.color === "red" && "text-red-500",
                passwordStrength.color === "yellow" && "text-yellow-500",
                passwordStrength.color === "green" && "text-green-500"
              )}
            >
              {passwordStrength.label}
            </span>
          </div>
          {passwordStrength.feedback && (
            <p className="text-xs text-cyber-text-muted">{passwordStrength.feedback}</p>
          )}
        </div>
      )}

      <Input
        label="Confirm New Password"
        type="password"
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, confirmPassword: e.target.value })
        }
        placeholder="Confirm your new password"
        required
        fullWidth
      />

      {/* Password Requirements */}
      <div className="bg-cyber-dark-secondary/50 p-4 rounded-lg border border-cyber-border">
        <p className="text-sm text-cyber-text-secondary mb-2">Password requirements:</p>
        <ul className="text-xs text-cyber-text-muted space-y-1">
          <li>• At least 12 characters long</li>
          <li>• Mix of uppercase and lowercase letters</li>
          <li>• At least one number</li>
          <li>• At least one special character</li>
        </ul>
      </div>

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
        Reset Password
      </Button>
    </form>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
