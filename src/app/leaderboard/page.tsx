import { Container } from "@/components/ui";

export const metadata = {
  title: "Leaderboard - CyberCodex.io",
  description: "See how you rank among other learners",
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 bg-cyber-dark">
      <Container className="px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cyber-text-primary mb-4">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
            See how you rank among other cybersecurity learners
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-cyber-dark-secondary border border-cyber-border rounded-lg p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-cyber-primary/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-cyber-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-cyber-text-primary mb-3">
              Coming Soon
            </h2>
            <p className="text-cyber-text-secondary mb-6">
              The leaderboard feature is currently under development. Soon you'll be
              able to compete with other learners, track your ranking, and earn
              special achievements!
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-cyber-primary">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Stay tuned for updates
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
