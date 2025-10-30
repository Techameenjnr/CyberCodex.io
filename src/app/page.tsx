import { Hero } from "@/components/features";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with 3D */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-cyber-dark-secondary">
        <div className="container-custom">
          <h2 className="text-display-2 text-center mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Security",
                description: "Master OWASP Top 10, XSS, CSRF, SQL injection, and modern web vulnerabilities",
                icon: "🕸",
              },
              {
                title: "Network Security",
                description: "Learn network protocols, packet analysis, and network penetration testing",
                icon: "🌐",
              },
              {
                title: "Cryptography",
                description: "Understand encryption, hashing, digital signatures, and cryptographic protocols",
                icon: "🔐",
              },
              {
                title: "Penetration Testing",
                description: "Hands-on practice with real-world scenarios and ethical hacking techniques",
                icon: "🎯",
              },
              {
                title: "Malware Analysis",
                description: "Analyze and reverse engineer malicious software safely",
                icon: "🦠",
              },
              {
                title: "Cloud Security",
                description: "Secure cloud infrastructure on AWS, Azure, and GCP",
                icon: "☁️",
              },
            ].map((feature, index) => (
              <div key={index} className="card">
                <div className="mb-4 flex items-center justify-start">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-cyber-primary">{feature.title}</h3>
                <p className="text-cyber-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10">
        <div className="container-custom text-center">
          <h2 className="text-display-2 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-cyber-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering cybersecurity skills
          </p>
          <button className="btn btn-primary text-lg">
            Get Started for Free
          </button>
        </div>
      </section>
    </main>
  );
}
