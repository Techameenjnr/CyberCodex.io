import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Reset Password - CyberCodex.io",
  description: "Create a new password for your account",
};

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-cyber-dark">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Reset Password
          </h1>
          <p className="text-cyber-text-secondary">
            Enter your new password below. Make sure it's strong and secure!
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="card p-8">
          <ResetPasswordForm token={params.token} />
        </div>

        {/* Back to Login Link */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-cyber-primary hover:text-cyber-secondary transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
