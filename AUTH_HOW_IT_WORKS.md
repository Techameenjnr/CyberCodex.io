# 🔐 Authentication System - How It Works

**Last Updated**: 2025-10-31

## Overview

CyberCodex.io uses **Auth.js v5** (NextAuth) with SQLite for local development. The system supports both OAuth (Google, GitHub, Discord) and email/password authentication with secure Argon2id password hashing.

---

## 🏗️ Architecture

### Key Files

```
src/
├── lib/
│   ├── auth/
│   │   ├── auth.config.ts       # Edge-compatible (OAuth only)
│   │   ├── auth.ts              # Full config (OAuth + Credentials)
│   │   └── password.ts          # Argon2 hashing (Node.js only)
│   ├── utils/
│   │   └── password-validation.ts  # Client-safe validation
│   └── validations/
│       └── auth.ts              # Zod schemas
├── middleware.ts                # Route protection (uses auth.config.ts)
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts   # Auth.js API handler
│   │   └── signup/route.ts          # User registration
│   ├── (auth)/
│   │   ├── login/page.tsx       # Login page
│   │   └── signup/page.tsx      # Signup page
│   ├── dashboard/page.tsx       # Protected route
│   └── profile/page.tsx         # Protected route
└── components/
    ├── auth/
    │   ├── LoginForm.tsx        # Client component
    │   └── SignupForm.tsx       # Client component
    └── layout/
        ├── NavigationWrapper.tsx  # Server: fetches session
        ├── Navigation.tsx         # Client: displays UI
        └── UserMenu.tsx           # Client: dropdown menu

prisma/
├── schema.prisma                # Database schema
└── dev.db                       # SQLite database file
```

---

## 🔄 How Sign-In Works

### 1. OAuth Sign-In (Google/GitHub/Discord)

**Flow:**
```
1. User clicks "Sign in with Google" button
2. SignIn redirects to OAuth provider
3. User authorizes on provider's site
4. Provider redirects back to /api/auth/callback/google
5. Auth.js creates/updates user in database
6. Session created and stored in database
7. User redirected to /dashboard
```

**Code:**
```tsx
// In LoginForm.tsx or SignupForm.tsx
const handleOAuthSignIn = (provider: string) => {
  signIn(provider, { callbackUrl: "/dashboard" });
};

<button onClick={() => handleOAuthSignIn("google")}>
  Sign in with Google
</button>
```

**Configuration:**
```typescript
// src/lib/auth/auth.config.ts (Edge-compatible)
GitHub({
  clientId: process.env.AUTH_GITHUB_ID,
  clientSecret: process.env.AUTH_GITHUB_SECRET,
})
```

### 2. Email/Password Sign-In (Credentials)

**Flow:**
```
1. User enters email + password in LoginForm
2. Form calls signIn("credentials", { email, password })
3. Auth.js calls authorize() in Credentials provider
4. authorize() finds user in database
5. Verifies password with Argon2id
6. Returns user object or null
7. Session created if successful
8. User redirected to /dashboard
```

**Code:**
```tsx
// In LoginForm.tsx
const handleSubmit = async (e) => {
  const result = await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirect: false,
  });

  if (!result?.error) {
    router.push("/dashboard");
  }
};
```

**Password Verification:**
```typescript
// src/lib/auth/auth.ts (Node.js only)
Credentials({
  async authorize(credentials) {
    const { email, password } = credentials;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });

    // Verify password with Argon2id
    const isValid = await verifyPassword(user.password, password);

    if (!isValid) return null;

    return user; // Creates session
  }
})
```

---

## 📝 How Sign-Up Works

**Flow:**
```
1. User fills out SignupForm (name, email, username, password)
2. Form validates password strength client-side
3. Form submits to POST /api/auth/signup
4. API validates input with Zod schema
5. API checks password strength requirements
6. API hashes password with Argon2id
7. API creates user in database
8. API auto-signs user in with signIn("credentials")
9. User redirected to /dashboard
```

**Code:**
```typescript
// src/app/api/auth/signup/route.ts
export async function POST(req: NextRequest) {
  // 1. Validate with Zod
  const validatedData = signupSchema.safeParse(body);

  // 2. Check password strength
  const passwordStrength = validatePasswordStrength(password);
  if (!passwordStrength.isValid) {
    return NextResponse.json({ error: passwordStrength.errors });
  }

  // 3. Hash password with Argon2id (19 MiB memory, 2 iterations)
  const hashedPassword = await hashPassword(password);

  // 4. Create user
  const user = await prisma.user.create({
    data: { name, email, username, password: hashedPassword }
  });

  return NextResponse.json({ success: true });
}
```

**Password Requirements:**
- Minimum 12 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

---

## 🔒 Security Features

### Password Hashing
- **Algorithm**: Argon2id (OWASP 2025 recommended)
- **Memory Cost**: 19 MiB (GPU-resistant)
- **Iterations**: 2
- **Why Not bcrypt?**: Argon2 is newer, more secure, and memory-hard

```typescript
// src/lib/auth/password.ts
const hashingConfig = {
  memoryCost: 19456, // 19 MiB
  timeCost: 2,
  parallelism: 1,
  outputLen: 32,
};

await hash(password, hashingConfig); // Argon2id
```

### Session Management
- **Strategy**: Database sessions (not JWT)
- **Duration**: 7 days
- **Auto-refresh**: Every 24 hours
- **Storage**: SQLite (`Session` table)
- **Cookies**: HttpOnly, Secure in production

```typescript
// src/lib/auth/auth.ts
session: {
  strategy: "database",
  maxAge: 7 * 24 * 60 * 60,  // 7 days
  updateAge: 24 * 60 * 60,   // Refresh every 24 hours
}
```

### Route Protection
- **Middleware**: Protects routes before they even load
- **Protected routes**: `/dashboard`, `/profile`, `/settings`
- **Auth routes**: `/login`, `/signup` (redirect if already logged in)

```typescript
// src/middleware.ts
export default auth((req) => {
  const isLoggedIn = !!req.auth;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});
```

---

## 🎮 Gamification System

Every user has these fields tracked automatically:

| Field | Default | Description |
|-------|---------|-------------|
| `level` | 1 | User level (increases with XP) |
| `xp` | 0 | Current level XP |
| `totalXp` | 0 | Lifetime XP earned |
| `streak` | 0 | Days in a row of activity |
| `rank` | "Novice" | Novice → Apprentice → Expert → Elite |
| `subscriptionTier` | "free" | free or elite |
| `lastActive` | now | Updated on every sign-in |

### Streak Logic

```typescript
// src/lib/auth/auth.ts - signIn event
const hoursDiff = (now - lastActive) / (1000 * 60 * 60);

if (hoursDiff < 24) {
  // Same day, no change
} else if (hoursDiff < 48) {
  // Next day, increment streak
  streak += 1;
} else {
  // Streak broken, reset to 1
  streak = 1;
}
```

---

## 🧪 Testing the System

### 1. Create Account
```bash
# Start dev server
npm run dev

# Visit http://localhost:3000/signup
# Fill out form with strong password (12+ chars, uppercase, lowercase, number, special)
# Should auto-sign in and redirect to /dashboard
```

### 2. Sign In
```bash
# Visit http://localhost:3000/login
# Enter email + password from signup
# Should redirect to /dashboard
```

### 3. View Database
```bash
# Open Prisma Studio
npx prisma studio

# Browse tables:
# - User: See your account + gamification fields
# - Session: See active session
# - Account: See OAuth accounts (if using Google/GitHub)
```

### 4. Test Route Protection
```bash
# While logged out, try to visit:
http://localhost:3000/dashboard  # Should redirect to /login

# While logged in, try to visit:
http://localhost:3000/login       # Should redirect to /dashboard
```

---

## 📊 Database Schema

```prisma
model User {
  id               String    @id @default(cuid())
  name             String?
  email            String    @unique
  emailVerified    DateTime?
  image            String?
  password         String?   // Argon2id hash
  username         String?   @unique

  // Gamification
  level            Int       @default(1)
  xp               Int       @default(0)
  totalXp          Int       @default(0)
  streak           Int       @default(0)
  rank             String    @default("Novice")
  subscriptionTier String    @default("free")
  lastActive       DateTime  @default(now())

  // Relations
  accounts         Account[]
  sessions         Session[]
  courseProgress   CourseProgress[]
  exercises        UserExercise[]
  badges           UserBadge[]
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... OAuth fields
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 🔧 Configuration

### Environment Variables (.env.local)

```bash
# Database
DATABASE_URL="file:./dev.db"

# Auth.js
AUTH_SECRET="your-secret-key"  # Generated with: openssl rand -base64 32
AUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

### Setting Up OAuth Providers

**Google:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth client ID (Web application)
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env.local`

**GitHub:**
1. Go to: https://github.com/settings/developers
2. New OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

**Discord:**
1. Go to: https://discord.com/developers/applications
2. New Application
3. Redirect: `http://localhost:3000/api/auth/callback/discord`
4. Copy Client ID and Secret to `.env.local`

---

## 🚨 Important: Edge Runtime vs Node.js

**Edge Runtime** (Middleware):
- ❌ Cannot use Argon2 (Node.js only)
- ✅ Can use OAuth providers
- ✅ Can check if user is authenticated
- **File**: `src/middleware.ts` uses `auth.config.ts`

**Node.js Runtime** (API Routes, Server Components):
- ✅ Can use Argon2 password hashing
- ✅ Can use OAuth + Credentials providers
- ✅ Can query database
- **Files**: `src/lib/auth/auth.ts`, `src/app/api/**`

This is why we have **two auth configurations**:
- `auth.config.ts` - Edge-compatible (OAuth only)
- `auth.ts` - Full Node.js config (OAuth + Credentials)

---

## 🧑‍💻 Common Operations

### Check if User is Authenticated (Server Component)

```typescript
import { auth } from "@/lib/auth/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <div>Hello {session.user.name}</div>;
}
```

### Check if User is Authenticated (Client Component)

```typescript
"use client";
import { useSession } from "next-auth/react";

export function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Hello {session.user.name}</div>;
}
```

### Sign Out

```typescript
import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/" })}>
  Sign Out
</button>
```

### Update User XP/Level (Example)

```typescript
// In an API route or Server Action
import prisma from "@/lib/db/prisma";

export async function awardXP(userId: string, amount: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      xp: { increment: amount },
      totalXp: { increment: amount },
    },
  });

  // Check if user leveled up (every 100 XP = 1 level)
  const newLevel = Math.floor(user.totalXp / 100) + 1;
  if (newLevel > user.level) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: newLevel },
    });
  }

  return user;
}
```

---

## 📦 Next Steps

### Planned Features
- [ ] Email verification (Resend integration)
- [ ] Password reset flow
- [ ] Rate limiting (Upstash Redis)
- [ ] Two-factor authentication (2FA)
- [ ] Social features (follow users)
- [ ] Leaderboards (top XP, streaks)
- [ ] Admin dashboard

### To Add XP Rewards
1. Create Server Action in `src/app/actions/xp.ts`
2. Call `awardXP()` after exercise completion
3. Update session to reflect new XP/level
4. Show notification to user

### To Migrate to PostgreSQL
1. Update `prisma/schema.prisma`: `provider = "postgresql"`
2. Get database URL (Neon, Supabase, Vercel Postgres)
3. Update `DATABASE_URL` in `.env.local`
4. Run `npx prisma migrate deploy`

---

## 🐛 Troubleshooting

### "Can't resolve '@node-rs/argon2-wasm32-wasi'"
- **Cause**: Trying to use Argon2 in Edge Runtime (middleware)
- **Fix**: Use `auth.config.ts` (OAuth only) in middleware, not `auth.ts`

### "Invalid credentials" on login
- **Check**: Password was hashed correctly during signup
- **Check**: `AUTH_SECRET` environment variable is set
- **Debug**: Add console.log in `authorize()` function

### OAuth redirect not working
- **Check**: Callback URL matches exactly in provider settings
- **Check**: CLIENT_ID and SECRET are correct in `.env.local`
- **Check**: `.env.local` is being loaded (restart dev server)

### Session not persisting
- **Check**: Database has `Session` table
- **Check**: Cookies are enabled in browser
- **Check**: `AUTH_SECRET` hasn't changed (invalidates all sessions)

### TypeScript errors
- **Run**: `npm run type-check` to see all errors
- **Check**: `src/types/next-auth.d.ts` extends User/Session correctly
- **Fix**: Restart TypeScript server in VS Code

---

## 📚 Resources

- [Auth.js v5 Docs](https://authjs.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Argon2 OWASP Guide](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**Questions?** Check the code or ask Claude Code! 🤖
