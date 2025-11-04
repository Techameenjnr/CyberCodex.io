import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { Container } from "@/components/ui";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

export const metadata = {
  title: "Settings - CyberCodex.io",
  description: "Manage your account settings and preferences",
};

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/settings");
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-cyber-dark">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-display-2 gradient-text mb-4">Settings</h1>
            <p className="text-cyber-text-secondary">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Settings Tabs */}
          <SettingsTabs user={session.user} />
        </div>
      </Container>
    </main>
  );
}
