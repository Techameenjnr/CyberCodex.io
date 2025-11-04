"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/ui";

interface PreferencesTabProps {
  user: any;
}

export function PreferencesTab({ user }: PreferencesTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    courseUpdates: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update preferences");
      }

      setMessage({ type: "success", text: "Preferences updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Choose what emails you want to receive from CyberCodex
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Email Notification Toggles */}
            <ToggleItem
              label="Email Notifications"
              description="Receive email notifications for important updates"
              checked={preferences.emailNotifications}
              onChange={(checked) =>
                setPreferences({ ...preferences, emailNotifications: checked })
              }
            />

            <ToggleItem
              label="Course Updates"
              description="Get notified when new courses or content is available"
              checked={preferences.courseUpdates}
              onChange={(checked) =>
                setPreferences({ ...preferences, courseUpdates: checked })
              }
            />

            <ToggleItem
              label="Weekly Digest"
              description="Receive a weekly summary of your progress and achievements"
              checked={preferences.weeklyDigest}
              onChange={(checked) =>
                setPreferences({ ...preferences, weeklyDigest: checked })
              }
            />

            <ToggleItem
              label="Marketing Emails"
              description="Receive promotional emails and special offers"
              checked={preferences.marketingEmails}
              onChange={(checked) =>
                setPreferences({ ...preferences, marketingEmails: checked })
              }
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={cn(
                "p-4 rounded-lg mt-6",
                message.type === "success"
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/20"
              )}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} isLoading={isLoading}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences (Future) */}
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>
            Customize how CyberCodex looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-cyber-dark-secondary/50 rounded-lg border border-cyber-border">
              <div>
                <p className="font-medium text-cyber-text-primary">Theme</p>
                <p className="text-sm text-cyber-text-muted">Currently: Dark Mode</p>
              </div>
              <Button variant="secondary" size="sm" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-cyber-dark-secondary/50 rounded-lg border border-cyber-border">
              <div>
                <p className="font-medium text-cyber-text-primary">Language</p>
                <p className="text-sm text-cyber-text-muted">Currently: English (US)</p>
              </div>
              <Button variant="secondary" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Toggle Item Component
interface ToggleItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleItem({ label, description, checked, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-cyber-dark-secondary/50 rounded-lg border border-cyber-border">
      <div className="flex-1">
        <p className="font-medium text-cyber-text-primary">{label}</p>
        <p className="text-sm text-cyber-text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:ring-offset-2 focus:ring-offset-cyber-dark",
          checked ? "bg-cyber-primary" : "bg-cyber-border"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
