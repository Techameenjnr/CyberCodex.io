# CyberCodex.io

**A Modern Cybersecurity Learning Platform**

CyberCodex.io is a comprehensive, interactive platform for learning cybersecurity, ethical hacking, and penetration testing. Built with cutting-edge web technologies, it features a Codedex-inspired curriculum system, user authentication, gamification, and hands-on learning experiences.

---

## Overview

CyberCodex.io provides structured learning paths for cybersecurity professionals and enthusiasts. The platform combines theoretical knowledge with practical exercises, offering courses in web security, network reconnaissance, cryptography, malware analysis, cloud security, and programming fundamentals.

**Target Audience:**
- Aspiring cybersecurity professionals
- Penetration testers and ethical hackers
- Security researchers
- Computer science students
- IT professionals expanding their skill set

---

## Technology Stack

### Core Framework
- **Next.js 16** - React framework with App Router and Server Components
- **React 19** - Latest React features with improved performance
- **TypeScript** - Type-safe development with full coverage

### Styling & UI
- **Tailwind CSS v4** - Modern utility-first CSS with `@theme` directive
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D network visualization in hero section

### Authentication & Database
- **Auth.js v5 (NextAuth)** - OAuth and credentials authentication
- **Prisma** - Type-safe database ORM
- **SQLite** - Local development database (PostgreSQL-ready)
- **Argon2id** - OWASP 2025 password hashing standard

### Content & Features
- **MDX** - Markdown-based course content with React components
- **rehype-prism-plus** - Syntax highlighting for code blocks
- **Lenis** - Smooth scroll implementation
- **Zustand** - State management (installed, not yet used)

---

## Key Features

### Implemented

**User Experience**
- Responsive design with mobile-first approach
- Dark cybersecurity-themed UI (Matrix green & Cyber blue)
- Smooth animations and transitions
- Interactive 3D network visualization
- Mobile menu with slide-out navigation

**Course System**
- 7 complete courses with curriculum structures
- Codedex-inspired timeline UI with chapters and exercises
- Course browsing with search and category filters
- Individual exercise pages with MDX content
- Syntax highlighting for code examples
- Badge system for achievements

**Authentication & User Management**
- OAuth sign-in (Google, GitHub, Discord)
- Email/password authentication with Argon2id hashing
- User dashboard with statistics
- Profile pages with gamification
- Session management with database storage
- Route protection middleware

**Gamification**
- XP and level system
- Streak tracking (daily activity)
- Rank progression (Novice → Apprentice → Expert → Elite)
- Badge collection system
- Course progress tracking

**Pricing & Monetization**
- Two-tier pricing page (Free Explorer / Elite Hacker)
- Feature comparison table
- FAQ accordion section

**Technical Infrastructure**
- Component library (Button, Card, Badge, Input, Modal, Grid, Accordion)
- TypeScript type safety throughout
- Prisma database schema with migrations
- Environment-based configuration
- Edge Runtime compatibility for middleware

### Roadmap

**Content Development**
- Email verification with Resend
- Password reset flow
- Interactive lab environments
- Community forums and discussions
- Code mentorship and project reviews

**Technical Enhancements**
- Rate limiting with Upstash Redis
- Two-factor authentication (2FA)
- Admin dashboard for content management
- Analytics and progress insights
- Leaderboards (XP, streaks, completions)

**Platform Features**
- Social features (follow users, activity feed)
- Certificates of completion
- Advanced lab environments (Web, Terminal, Network, Binary)
- AI-powered learning assistant
- Code playground with live execution

---

## Course Catalog

CyberCodex.io currently offers 7 comprehensive courses across multiple cybersecurity domains:

### Web Security
**SQL Injection Basics**
- 28 exercises across 6 chapters
- 6 unlockable badges
- Beginner level
- Topics: SQL syntax, injection types, exploitation, prevention

**Web App Penetration Testing**
- 35 exercises across 8 chapters
- 8 unlockable badges
- Intermediate level
- Topics: Reconnaissance, OWASP Top 10, session attacks, automated testing

### Network Security
**Network Reconnaissance**
- 32 exercises across 7 chapters
- 7 unlockable badges
- Intermediate level
- Topics: Port scanning, service enumeration, OSINT, network mapping

### Cryptography
**Cryptography Fundamentals**
- 30 exercises across 7 chapters
- 7 unlockable badges
- Intermediate level
- Topics: Encryption algorithms, hashing, digital signatures, PKI

### Malware Analysis
**Malware Analysis Fundamentals**
- 33 exercises across 7 chapters
- 7 unlockable badges
- Advanced level
- Topics: Static analysis, dynamic analysis, reverse engineering, detection

### Cloud Security
**AWS Security Basics**
- 36 exercises across 8 chapters
- 8 unlockable badges
- Intermediate level
- Topics: IAM, S3 security, VPC configuration, CloudTrail, compliance

### Programming
**Python Fundamentals**
- 43 exercises across 8 chapters
- 8 unlockable badges
- Beginner level
- Topics: Syntax, data structures, functions, OOP, scripting

---

## Quick Start

Get CyberCodex.io running locally in 3 steps:

```bash
# 1. Install dependencies
npm install

# 2. Set up the database
npm run db:migrate

# 3. Start development server
npm run dev
```

Visit **http://localhost:3000** to see your local instance.

---

## Installation Guide

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Git** for version control

### Step-by-Step Setup

**1. Clone the Repository**

```bash
git clone https://github.com/Jhymas20/CyberCodex.io.git
cd CyberCodex.io
```

**2. Install Dependencies**

```bash
npm install
```

Note: Auth.js v5 requires `--legacy-peer-deps` flag (already configured in `.npmrc`).

**3. Configure Environment Variables**

Create `.env.local` in the project root:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Auth.js
AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

**4. Set Up Database**

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

**5. Start Development Server**

```bash
npm run dev
```

**6. Create Your Account**

- Visit **http://localhost:3000/signup**
- Create an account with email/password or OAuth
- Start exploring courses at **/courses**

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Database connection string (SQLite or PostgreSQL) |
| `AUTH_SECRET` | Yes | Secret key for Auth.js session encryption |
| `AUTH_URL` | Yes | Base URL for authentication callbacks |
| `AUTH_GOOGLE_ID` | No | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth Client Secret |
| `AUTH_GITHUB_ID` | No | GitHub OAuth Client ID |
| `AUTH_GITHUB_SECRET` | No | GitHub OAuth Client Secret |
| `AUTH_DISCORD_ID` | No | Discord OAuth Client ID |
| `AUTH_DISCORD_SECRET` | No | Discord OAuth Client Secret |

### Site Configuration

Edit `src/lib/config.ts` to customize:

- **Navigation menu items** - Main navigation links
- **Course categories** - Web Security, Network Security, Cryptography, etc.
- **Difficulty levels** - Beginner, Intermediate, Advanced
- **Pricing tiers** - Free Explorer and Elite Hacker features
- **Social media links** - GitHub, Twitter, Discord

### Tailwind CSS v4 Theme

**Important:** Tailwind CSS v4 uses the `@theme` directive in `src/styles/globals.css`, NOT `tailwind.config.ts`.

To customize colors, edit `src/styles/globals.css`:

```css
@theme {
  --color-cyber-dark: #0a0e27;
  --color-cyber-primary: #00ff41;
  /* Add your custom colors here */
}
```

---

## Project Structure

```
CyberCodex.io/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes (login, signup)
│   │   ├── api/
│   │   │   └── auth/                 # Auth.js API routes
│   │   ├── courses/                  # Course pages
│   │   │   └── [slug]/               # Course curriculum page
│   │   │       └── [exerciseId]/     # Exercise content page
│   │   ├── dashboard/                # User dashboard (protected)
│   │   ├── profile/                  # User profile (protected)
│   │   ├── pricing/                  # Pricing page
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/
│   │   ├── auth/                     # LoginForm, SignupForm
│   │   ├── course/                   # Course UI components
│   │   ├── dashboard/                # Dashboard components
│   │   ├── features/                 # Hero, Hero3D
│   │   ├── layout/                   # Navigation, Footer, UserMenu
│   │   ├── pricing/                  # FeatureComparison
│   │   ├── providers/                # SmoothScrollProvider
│   │   └── ui/                       # Reusable UI library
│   ├── lib/
│   │   ├── auth/                     # Auth.js configuration
│   │   │   ├── auth.config.ts        # Edge-compatible (OAuth)
│   │   │   ├── auth.ts               # Full config (OAuth + Credentials)
│   │   │   └── password.ts           # Argon2 hashing (Node.js only)
│   │   ├── db/
│   │   │   └── prisma.ts             # Prisma client singleton
│   │   ├── utils/                    # Utilities (cn, password-validation)
│   │   ├── validations/              # Zod schemas
│   │   ├── config.ts                 # App configuration
│   │   └── curriculum.ts             # Course loading utilities
│   ├── styles/
│   │   └── globals.css               # Tailwind v4 @theme + custom CSS
│   ├── types/                        # TypeScript definitions
│   └── middleware.ts                 # Route protection
├── content/
│   └── courses/                      # MDX course content
│       └── [slug]/
│           ├── curriculum.json       # Course structure
│           └── exercises/            # Exercise MDX files
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration history
│   └── dev.db                        # SQLite database (local)
├── public/                           # Static assets
├── .env.local                        # Environment variables (not in git)
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind content paths
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

---

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Build for production
npm run start            # Start production server
npm run type-check       # TypeScript type checking

# Database
npm run db:migrate       # Run Prisma migrations
npm run db:studio        # Open Prisma Studio GUI
npm run db:push          # Push schema changes (no migration)
npm run db:seed          # Seed database (if configured)

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier (if configured)
```

### Adding a New Course

1. Create course directory in `content/courses/[slug]/`
2. Create `curriculum.json` with course metadata and structure
3. Add exercise MDX files in `exercises/` directory
4. Add course to `src/lib/config.ts` course categories
5. Navigate to `/courses/[slug]` to view

See existing courses for structure examples.

### Creating UI Components

All UI components use the `forwardRef` pattern:

```typescript
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-styles", className)} {...props} />
    );
  }
);
MyComponent.displayName = "MyComponent";
```

---

## Curriculum System

### Architecture

CyberCodex.io uses a multi-layered course structure inspired by Codedex:

1. **Course Listing** (`/courses`) - Browse and filter all courses
2. **Curriculum Page** (`/courses/[slug]`) - Chapter timeline with exercises
3. **Exercise Page** (`/courses/[slug]/[exerciseId]`) - MDX content with code highlighting

### Course Structure

Each course has:
- **Metadata** - Title, description, category, difficulty, icon
- **Chapters** - Logical groupings of exercises
- **Exercises** - Individual lessons (exercise, article, project, quiz)
- **Badges** - Achievements unlocked by progress
- **Cheat Sheets** - Quick reference materials

### Exercise Types

- **Exercise** - Hands-on coding/security challenge
- **Article** - Reading material and theory
- **Project** - Comprehensive real-world application
- **Quiz** - Knowledge assessment

---

## Authentication System

### Features

- **OAuth Providers** - Google, GitHub, Discord
- **Email/Password** - Argon2id hashing (OWASP 2025 standard)
- **Database Sessions** - 7-day expiration with auto-refresh
- **Route Protection** - Middleware guards protected routes
- **Gamification** - XP, levels, streaks, ranks, badges

### Security Measures

- **Password Requirements** - 12+ chars, uppercase, lowercase, number, special character
- **Argon2id Hashing** - 19 MiB memory cost, GPU-resistant
- **Generic Error Messages** - Prevents user enumeration
- **HttpOnly Cookies** - JavaScript cannot access tokens
- **Input Validation** - Zod schemas on all forms
- **SQL Injection Protection** - Prisma parameterized queries

### OAuth Setup

See `AUTH_HOW_IT_WORKS.md` for detailed authentication documentation and OAuth provider configuration.

---

## Database Schema

### Core Models

**User**
- Authentication fields (email, password, emailVerified)
- Gamification (level, xp, totalXp, streak, rank)
- Subscription tier (free, elite)
- Relations to sessions, accounts, course progress, badges

**Session**
- Database-backed sessions (not JWT)
- 7-day expiration with auto-refresh

**Account**
- OAuth provider data (Google, GitHub, Discord)
- Linked to User via userId

**CourseProgress**
- Tracks user progress through courses
- Completion percentage and timestamps

**Badge**
- Course achievement definitions

**UserBadge**
- Badges earned by users

### Migrating to PostgreSQL

When ready for production:

1. Update `prisma/schema.prisma`: `provider = "postgresql"`
2. Get PostgreSQL database URL (Neon, Supabase, Vercel Postgres)
3. Update `DATABASE_URL` in `.env.local`
4. Run `npx prisma migrate deploy`

All code remains identical - Prisma handles the database switch.

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub** - Ensure your code is committed and pushed

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Set `AUTH_URL` to your production domain
   - Configure OAuth callback URLs for production

4. **Deploy**
   - Vercel builds and deploys automatically
   - Each push triggers a new deployment

### Environment Variables for Production

- `DATABASE_URL` - Use PostgreSQL (Neon, Supabase, etc.)
- `AUTH_SECRET` - Generate new secret for production
- `AUTH_URL` - Your production domain
- OAuth credentials (update callback URLs to production domain)

---

## Troubleshooting

### Build Errors

**"Can't resolve '@node-rs/argon2-wasm32-wasi'"**
- Cause: Argon2 imported in Edge Runtime (middleware)
- Solution: Use `auth.config.ts` (OAuth only) in middleware, not `auth.ts`

**TypeScript errors after pulling changes**
- Run `npm run type-check` to see all errors
- Restart TypeScript server in VS Code
- Check `src/types/next-auth.d.ts` extends User/Session correctly

### Authentication Issues

**"Invalid credentials" on login**
- Verify `AUTH_SECRET` is set in `.env.local`
- Check password was hashed correctly during signup
- Restart dev server to reload environment variables

**OAuth redirect not working**
- Verify callback URL matches in provider settings exactly
- Check CLIENT_ID and SECRET are correct in `.env.local`
- Ensure `.env.local` is loaded (not `.env.example`)

### Database Issues

**Prisma Client errors**
- Run `npx prisma generate` to regenerate client
- Run `npx prisma migrate dev` to apply pending migrations
- Check `DATABASE_URL` is correct in `.env.local`

---

## Contributing

CyberCodex.io is an educational project focused on ethical cybersecurity learning. All content and features are intended for:

**Allowed:**
- Educational purposes and learning
- Authorized security testing and penetration testing
- CTF challenges and competitions
- Security research with proper authorization
- Legal ethical hacking activities

**Not Allowed:**
- Unauthorized hacking or system access
- Malicious use of security techniques
- Distribution of malware or exploits
- Any illegal activities

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with descriptive messages
5. Push to your branch
6. Open a Pull Request

---

## License

This project is for educational purposes only. All cybersecurity techniques, tools, and content are provided for ethical and legal use only. Users are responsible for ensuring their activities comply with applicable laws and regulations.

---

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Auth.js (NextAuth)](https://authjs.dev)
- [Prisma Documentation](https://www.prisma.io/docs)

### Learning Resources
- [OWASP Foundation](https://owasp.org)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [SANS Institute](https://www.sans.org)
- [HackerOne](https://www.hackerone.com)

### Tools & Libraries
- [Three.js](https://threejs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [MDX](https://mdxjs.com)
- [Argon2 OWASP Guide](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

---

## Acknowledgments

- **Codedex.io** - Inspiration for curriculum UI design
- **OWASP** - Security best practices and guidelines
- **Next.js Team** - Excellent framework and documentation
- **Auth.js Team** - Secure authentication solution
- **Cybersecurity Community** - For making the web safer

---

**CyberCodex.io** - Built for the cybersecurity community
