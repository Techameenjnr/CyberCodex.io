"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, PricingCard, Accordion, Button } from "@/components/ui";
import { FeatureComparison } from "@/components/pricing/FeatureComparison";
import { pricingTiers, pricingFeatures, pricingFAQ } from "@/lib/config";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen pt-32">
      {/* Hero Banner Section */}
      <div className="relative mb-16 -mt-32 pt-32 pb-20 overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/purpleSKy.gif"
            alt="CyberCodex Pricing Background"
            fill
            className="object-cover"
            priority
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/60 to-cyber-dark" />
          {/* Additional dark overlay at top for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        {/* Header Content */}
        <Container>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-2 font-bold mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%)] px-4">
              Choose Your Path
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4">
              Unlock your full potential with tailored plans designed for every stage of your cybersecurity journey
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center space-x-2 bg-cyber-dark-secondary/90 backdrop-blur-sm rounded-lg p-1 border border-cyber-border shadow-lg">
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
        </Container>
      </div>

      {/* Pricing Cards Section */}
      <section className="mb-20">
        <Container>

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
                icon={
                  <div className="w-16 h-16 relative">
                    <Image
                      src="/images/logo/gengar.gif"
                      alt="Explorer"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                }
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
                icon={
                  <div className="w-16 h-16 relative">
                    <Image
                      src="/images/logo/coin.webp"
                      alt="Elite Hacker"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                }
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

      {/* Stats Section */}
      <section className="mb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                number: "200+",
                label: "Hands-on Exercises",
                description: "Labs and challenges spanning web, network, malware, cloud, and Python"
              },
              {
                number: "30+",
                label: "Cyber Security Courses",
                description: "Comprehensive learning paths for all levels"
              },
              {
                number: "95%",
                label: "Satisfaction Rate",
                description: "Highly rated by our community"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg border border-cyber-border hover:border-cyber-primary transition-all duration-300 h-full bg-cyber-dark-secondary">
                  {/* Content */}
                  <div className="relative z-10 p-8 text-center h-full flex flex-col justify-center">
                    <div className="text-5xl font-bold text-cyber-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xl font-semibold text-cyber-text-primary mb-2">
                      {stat.label}
                    </div>
                    <p className="text-sm text-cyber-text-muted">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Feature Comparison Section */}
      <section id="features" className="mb-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              What's Included?
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              Everything you need to master cybersecurity, all in one place
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-cyber-dark-secondary/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-cyber-border/50 shadow-2xl">
              <FeatureComparison features={pricingFeatures} />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="mb-0 pb-20 relative">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-display-2 gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-cyber-text-secondary max-w-2xl mx-auto">
              Everything you need to know about CyberCodex Elite
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-cyber-dark-secondary/30 backdrop-blur-sm rounded-2xl p-8 border border-cyber-border/50"
          >
            <Accordion items={pricingFAQ} />
          </motion.div>

          {/* Help Center CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-cyber-text-secondary mb-4 text-lg">
              Still have more questions?
            </p>
            <Button variant="secondary" size="lg" className="glow-secondary">
              Contact Support
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Banner Section - Last element before footer */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] mb-0">
        {/* Background Image/GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/categories/GameSpooky3.gif"
            alt="Ready to Level Up"
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/60 to-cyber-dark" />
          {/* Additional dark overlay at top for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 relative">
                <Image
                  src="/images/logo/gengar.gif"
                  alt="CyberCodex Elite"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%)] px-4">
              Ready to Level Up?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-4">
              Join <span className="text-cyber-primary font-bold">10,000+</span> learners mastering cybersecurity with hands-on courses, elite mentorship, and real-world labs.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button variant="primary" size="lg" className="glow-primary text-lg px-8 py-6 shadow-2xl">
                <span className="flex items-center gap-2">
                  Join Elite Now
                </span>
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 py-6 border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:border-cyber-primary hover:bg-cyber-primary/20 text-white shadow-2xl">
                <span className="flex items-center gap-2">
                  Start Free Trial
                </span>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-2">
                <span className="text-cyber-primary">✓</span> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-primary">✓</span> Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-primary">✓</span> 30-day money-back guarantee
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
