import { hash, verify } from "@node-rs/argon2";

/**
 * Server-side password hashing utilities (Node.js only)
 * Uses Argon2id - OWASP 2025 recommended standard
 *
 * IMPORTANT: This file can only be imported in Node.js runtime
 * (API routes, Server Components, Server Actions)
 * NOT in Edge Runtime (middleware) or Client Components
 */

/**
 * OWASP recommended configuration for Argon2id
 * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
 */
const hashingConfig = {
  memoryCost: 19456, // 19 MiB
  timeCost: 2,       // iterations
  parallelism: 1,    // threads
  outputLen: 32,     // bytes
};

/**
 * Hash a password using Argon2id
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, hashingConfig);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    return await verify(hash, password);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Re-export client-safe validation utilities
 * These can be used in both client and server components
 */
export {
  validatePasswordStrength,
  calculatePasswordStrength,
} from "@/lib/utils/password-validation";
