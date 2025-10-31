"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, PricingCard, Accordion, Button } from "@/components/ui";
import { FeatureComparison } from "@/components/pricing/FeatureComparison";
import { pricingTiers, pricingFeatures, pricingFAQ } from "@/lib/config";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-display-1 gradient-text mb-6">
              Choose Your Path
            </h1>
            <p className="text-xl text-cyber-text-secondary max-w-3xl mx-auto mb-8">
              Unlock your full potential with tailored plans designed for every stage of your cybersecurity journey
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center space-x-2 bg-cyber-dark-secondary rounded-lg p-1 border border-cyber-border">
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingPeriod === "yearly"
                    ? "bg-cyber-primary text-cyber-dark"
                    : "text-cyber-text-secondary hover:text-cyber-text-primary"
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingPeriod === "monthly"
                    ? "bg-cyber-primary text-cyber-dark"
                    : "text-cyber-text-secondary hover:text-cyber-text-primary"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PricingCard
                title={pricingTiers.free.name}
                price={pricingTiers.free.price}
                period={pricingTiers.free.period}
                description={pricingTiers.free.description}
                features={pricingTiers.free.features}
                ctaText={pricingTiers.free.ctaText}
                ctaVariant={pricingTiers.free.ctaVariant}
                icon={<span className="text-4xl">🔓</span>}
              />
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PricingCard
                title={pricingTiers.pro.name}
                price={
                  billingPeriod === "yearly"
                    ? pricingTiers.pro.priceYearly
                    : pricingTiers.pro.price
                }
                period={
                  billingPeriod === "yearly"
                    ? pricingTiers.pro.periodYearly
                    : pricingTiers.pro.period
                }
                description={pricingTiers.pro.description}
                features={pricingTiers.pro.features}
                ctaText={pricingTiers.pro.ctaText}
                ctaVariant={pricingTiers.pro.ctaVariant}
                badge={
                  billingPeriod === "yearly"
                    ? `SAVE ${pricingTiers.pro.savingsPercentage}%`
                    : pricingTiers.pro.badge
                }
                highlighted={pricingTiers.pro.highlighted}
                icon={<span className="text-4xl">🔐</span>}
              />
            </motion.div>
          </div>

          {/* View All Features Link */}
          <div className="text-center mt-8">
            <a
              href="#features"
              className="text-cyber-primary hover:text-cyber-secondary transition-colors duration-200 font-medium inline-flex items-center space-x-2"
            >
              <span>View all features</span>
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Social Proof Section */}
      <section className="mb-20 bg-cyber-dark-secondary py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center text-cyber-text-primary mb-12">
            Trusted by Security Professionals From
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-cyber-text-secondary">Google</div>
            <div className="text-2xl font-bold text-cyber-text-secondary">Microsoft</div>
            <div className="text-2xl font-bold text-cyber-text-secondary">Amazon</div>
            <div className="text-2xl font-bold text-cyber-text-secondary">IBM</div>
            <div className="text-2xl font-bold text-cyber-text-secondary">Cisco</div>
          </div>
        </Container>
      </section>

      {/* Feature Comparison Section */}
      <section id="features" className="mb-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-display-2 gradient-text mb-4">
              Compare Features
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-cyber-dark-secondary rounded-lg p-8 border border-cyber-border">
            <FeatureComparison features={pricingFeatures} />
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-display-2 gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              Everything you need to know about CyberCodex
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion items={pricingFAQ} />
          </div>

          {/* Help Center CTA */}
          <div className="text-center mt-12">
            <p className="text-cyber-text-secondary mb-4">
              Still have more questions?
            </p>
            <Button variant="secondary" size="lg">
              Go to Help Center
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-cyber-text-primary mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-cyber-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering cybersecurity skills with CyberCodex
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Join Elite Now
              </Button>
              <Button variant="ghost" size="lg">
                Start Free
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
