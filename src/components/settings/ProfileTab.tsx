"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Textarea, Button } from "@/components/ui";

interface ProfileTabProps {
  user: any;
}

export function ProfileTab({ user }: ProfileTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });

      // Refresh the page to update session data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and how others see you on CyberCodex
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              fullWidth
              required
            />

            {/* Username */}
            <Input
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="johndoe"
              fullWidth
              required
            />

            {/* Bio */}
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={4}
              fullWidth
            />

            {/* Message */}
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

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Avatar Section (Future Enhancement) */}
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload a profile picture to personalize your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-cyber-dark-secondary border-2 border-cyber-border flex items-center justify-center text-4xl">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase() || "?"}</span>
              )}
            </div>
            <div>
              <Button variant="secondary" size="sm" disabled>
                Upload Image
              </Button>
              <p className="text-sm text-cyber-text-muted mt-2">
                Coming soon - Avatar upload feature
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
