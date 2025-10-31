"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { calculatePasswordStrength } from "@/lib/auth/password";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Create account
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create account");
        setIsLoading(false);
        return;
      }

      // Auto sign in after successful signup
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but failed to sign in. Please log in manually.");
        setIsLoading(false);
        router.push("/login");
        return;
      }

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-cyber-danger/10 border border-cyber-danger text-cyber-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          required
          disabled={isLoading}
        />

        <Input
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="johndoe123"
          required
          disabled={isLoading}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          required
          disabled={isLoading}
        />

        <div>
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••••••"
            required
            disabled={isLoading}
          />

          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-cyber-text-secondary">Password strength:</span>
                <span className={`text-sm font-medium text-${passwordStrength.color}`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full h-2 bg-cyber-dark-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300`}
                  style={{
                    width: `${(passwordStrength.score / 4) * 100}%`,
                    backgroundColor: passwordStrength.score >= 3 ? '#00ff41' : passwordStrength.score >= 2 ? '#ffd700' : '#ff0033'
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-cyber-text-muted">
                Use at least 12 characters with uppercase, lowercase, numbers, and special characters
              </p>
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-cyber-text-secondary">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="text-cyber-primary hover:text-cyber-secondary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-cyber-primary hover:text-cyber-secondary">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
