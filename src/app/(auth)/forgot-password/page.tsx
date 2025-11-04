import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password - CyberCodex.io",
  description: "Reset your password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-cyber-dark">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Forgot Password?
          </h1>
          <p className="text-cyber-text-secondary">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="card p-8">
          <ForgotPasswordForm />
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
