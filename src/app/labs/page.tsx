import { Container } from "@/components/ui";

export default function LabsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-2 font-bold mb-6 gradient-text">
          Interactive Labs
        </h1>
        <p className="text-xl text-cyber-text-secondary">
          Coming soon: Practice your skills with hands-on cybersecurity labs.
        </p>
      </Container>
    </main>
  );
}
