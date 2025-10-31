import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { loginSchema} from "@/lib/validations/auth";
import { verifyPassword } from "./password";
import prisma from "@/lib/db/prisma";

/**
 * Edge-compatible Auth.js configuration
 * This config is used in middleware (edge runtime)
 */
export default {
  providers: [
    // OAuth Providers
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true, // Allow linking OAuth to existing email
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    
    // Credentials Provider (Email/Password)
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          // Generic error to prevent user enumeration
          return null;
        }

        // Verify password
        const isValid = await verifyPassword(user.password, password);

        if (!isValid) {
          return null;
        }

        // Return user object (will be available in JWT/session)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/verify-email",
  },
} satisfies NextAuthConfig;
