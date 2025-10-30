import { Container } from "@/components/ui";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        <h1 className="text-display-2 font-bold mb-6 gradient-text">
          About CyberCodex
        </h1>
        <p className="text-xl text-cyber-text-secondary mb-6">
          CyberCodex.io is a comprehensive cybersecurity learning platform dedicated to
          teaching ethical hacking, penetration testing, and security best practices.
        </p>
        <p className="text-lg text-cyber-text-secondary">
          Our mission is to make cybersecurity education accessible, practical, and engaging
          through interactive tutorials and hands-on labs.
        </p>
      </Container>
    </main>
  );
}
