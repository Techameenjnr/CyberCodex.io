# Authentication System Setup Guide

## 🚀 Quick Start (SQLite - Zero Setup!)

We're using **SQLite** for local development - it's completely free and requires **NO cloud service or installation**!

### Step 1: Environment Variables (Already Done!)

I've created `.env.local` with SQLite configuration and a generated AUTH_SECRET. You're ready to go!

### Step 2: Run Database Migration

```bash
npx prisma migrate dev --name init
```

This creates a `dev.db` file in the `prisma/` directory with all tables.

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Start Development!

```bash
npm run dev
```

That's it! Your database is ready.

---

## 📊 How SQLite Works

- **File-Based**: All data stored in `prisma/dev.db`
- **Zero Cost**: Completely free
- **No Cloud**: Runs entirely on your machine
- **Perfect for Dev**: Fast and lightweight

### Viewing Your Database

You can view your data with Prisma Studio:

```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555

---

## 🔄 Migrating to PostgreSQL Later

When you're ready for production, here's how to switch:

### 1. Update Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 2. Update Environment Variable

In `.env.local`, change:

```
DATABASE_URL="postgresql://user:password@host:5432/cybercodex"
```

### 3. Run Migration

```bash
npx prisma migrate deploy
```

**That's it!** All your auth code stays identical - Prisma handles the rest.

### PostgreSQL Options (When Ready)

- **Neon** (https://neon.tech) - Serverless PostgreSQL, generous free tier
- **Supabase** (https://supabase.com) - PostgreSQL + extras, free tier
- **Vercel Postgres** - Integrated with Vercel deployments
- **Railway** - Simple deployment platform

---

## 🔐 OAuth Providers (Optional - Configure Later)

You can test authentication with email/password first. Add OAuth later:

### Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create "OAuth client ID" → Web application
3. Add redirect: `http://localhost:3000/api/auth/callback/google`
4. Add credentials to `.env.local`:
   ```
   AUTH_GOOGLE_ID="your-client-id"
   AUTH_GOOGLE_SECRET="your-client-secret"
   ```

### GitHub OAuth

1. Go to https://github.com/settings/developers
2. "New OAuth App"
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env.local`

### Discord OAuth

1. Go to https://discord.com/developers/applications
2. Create "New Application"
3. Add redirect: `http://localhost:3000/api/auth/callback/discord`
4. Add credentials to `.env.local`

---

## 🛡️ Security Setup (Optional but Recommended)

### Rate Limiting with Upstash Redis

For production-grade rate limiting:

1. Go to https://upstash.com
2. Create free Redis database
3. Add to `.env.local`:
   ```
   UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your-token"
   ```

### Email Verification with Resend

For email verification:

1. Go to https://resend.com
2. Get API key (100 emails/day free)
3. Add to `.env.local`:
   ```
   RESEND_API_KEY="re_xxxxx"
   EMAIL_FROM="noreply@cybercodex.io"
   ```

---

## ✅ Verification Checklist

- [x] `.env.local` created (done automatically)
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npx prisma generate`
- [ ] Start server: `npm run dev`
- [ ] (Optional) Configure OAuth providers
- [ ] (Optional) Setup rate limiting
- [ ] (Optional) Setup email service

---

## 🔧 Troubleshooting

### "Environment variable not found: DATABASE_URL"

Check that `.env.local` exists and contains `DATABASE_URL="file:./dev.db"`

### "Prisma Client not generated"

Run: `npx prisma generate`

### Migration errors

Try: `npx prisma migrate reset` (⚠️ deletes all data)

### Want to reset everything?

```bash
rm prisma/dev.db
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📝 What's Next?

After running migrations, we'll implement:

- ✅ Prisma client singleton
- ✅ Auth.js configuration
- ✅ Password hashing (Argon2id)
- ✅ Login/signup pages
- ✅ User dashboard with gamification
- ✅ Profile pages
- ✅ Course progress tracking

**Start by running the migration commands above!**
