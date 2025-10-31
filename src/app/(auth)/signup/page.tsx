import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { Container } from "@/components/ui";

export const metadata = {
  title: "Sign Up - CyberCodex.io",
  description: "Create your CyberCodex account",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-display-2 gradient-text mb-4">
              Join CyberCodex
            </h1>
            <p className="text-lg text-cyber-text-secondary">
              Start your journey to becoming a cybersecurity expert
            </p>
          </div>

          <SignupForm />

          <p className="mt-8 text-center text-sm text-cyber-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyber-primary hover:text-cyber-secondary font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
