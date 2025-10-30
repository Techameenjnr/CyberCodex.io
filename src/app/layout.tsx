import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation, Footer } from "@/components/layout";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberCodex.io - Master Cybersecurity & Ethical Hacking",
  description: "A comprehensive cybersecurity learning platform with tutorials, interactive labs, and educational resources for ethical hacking and penetration testing.",
  keywords: ["cybersecurity", "ethical hacking", "penetration testing", "security", "tutorials", "labs"],
  authors: [{ name: "CyberCodex" }],
  openGraph: {
    title: "CyberCodex.io - Master Cybersecurity & Ethical Hacking",
    description: "Learn cybersecurity through interactive tutorials and hands-on labs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberCodex.io",
    description: "Master Cybersecurity & Ethical Hacking",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0e27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
