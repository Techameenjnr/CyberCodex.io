# 🔐 OAuth Provider Setup Guide

## Overview

This guide will walk you through setting up OAuth authentication with Google and GitHub for CyberCodex. OAuth allows users to sign in with their existing accounts, reducing friction and improving security.

---

## Why OAuth?

✅ **Better UX** - Users don't need to create another password
✅ **Increased Security** - Leverage providers' 2FA and security
✅ **Faster Signup** - One-click registration
✅ **Trust** - Users trust established providers

---

## Prerequisites

Before you begin, make sure you have:
- [ ] A development environment running at `http://localhost:3000`
- [ ] The CyberCodex repository cloned and set up
- [ ] Access to create developer accounts on Google and GitHub

---

## 1. Google OAuth Setup

### Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create a New Project** (or use existing)
   - Click "Select a project" → "New Project"
   - Name: `CyberCodex` (or your preferred name)
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields:
     - **App name**: CyberCodex
     - **User support email**: Your email
     - **Developer contact**: Your email
   - Click "Save and Continue"
   - Skip scopes (default is fine)
   - Add test users if needed
   - Click "Save and Continue"

5. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `CyberCodex Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (development)
     - `https://cybercodex.io` (production - add later)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://cybercodex.io/api/auth/callback/google` (production - add later)
   - Click "Create"

6. **Copy Credentials**
   - Copy **Client ID** and **Client secret**
   - Add to `.env.local`:

```bash
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

---

## 2. GitHub OAuth Setup

### Create GitHub OAuth App

1. **Go to GitHub Developer Settings**
   - Visit: [github.com/settings/developers](https://github.com/settings/developers)
   - Sign in to GitHub

2. **Create New OAuth App**
   - Click "New OAuth App"
   - Fill in the form:
     - **Application name**: CyberCodex
     - **Homepage URL**: `http://localhost:3000` (dev) or `https://cybercodex.io` (prod)
     - **Application description**: Cybersecurity learning platform
     - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"

3. **Generate Client Secret**
   - After creating the app, click "Generate a new client secret"
   - Copy the secret immediately (won't be shown again!)

4. **Copy Credentials**
   - Copy **Client ID** and **Client secret**
   - Add to `.env.local`:

```bash
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

---

## 3. Final Configuration

### Update `.env.local`

Your complete `.env.local` should look like this:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Auth.js
AUTH_SECRET="your-super-secret-key-generate-with-openssl"
AUTH_URL="http://localhost:3000"

# OAuth Providers
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"

AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Email (Resend)
RESEND_API_KEY="re_xxxxx"
FROM_EMAIL="noreply@cybercodex.io"
```

### Restart Development Server

```bash
npm run dev
```

---

## 5. Testing OAuth

### Test Each Provider

1. **Navigate to Login Page**
   - Visit: `http://localhost:3000/login`

2. **Test Google OAuth**
   - Click the Google button
   - Sign in with your Google account
   - Verify you're redirected to `/dashboard`
   - Check that your profile is created

3. **Test GitHub OAuth**
   - Sign out first
   - Click the GitHub button
   - Authorize the application
   - Verify you're redirected to `/dashboard`

### Verify Database

Check that OAuth accounts are linked:

```bash
# Open Prisma Studio
npx prisma studio

# Navigate to:
# - User table → Check for OAuth users
# - Account table → Check for provider accounts (google, github)
```

---

## 6. Production Deployment

When deploying to production (e.g., Vercel, Railway, etc.):

### Update OAuth Apps

For each provider, add production redirect URIs:

**Google**: `https://cybercodex.io/api/auth/callback/google`
**GitHub**: `https://cybercodex.io/api/auth/callback/github`

### Update Environment Variables

Set these in your hosting platform (Vercel, Railway, etc.):

```bash
AUTH_URL="https://cybercodex.io"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
```

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Rotate OAuth secrets regularly
- [ ] Never commit `.env.local` to Git
- [ ] Use environment variables in CI/CD
- [ ] Monitor OAuth usage in provider dashboards

---

## Troubleshooting

### "Redirect URI mismatch" Error

**Cause**: The callback URL doesn't match what's registered with the provider.

**Fix**:
1. Check the exact URL in the error message
2. Add that URL to your OAuth app's allowed redirects
3. Make sure there are no trailing slashes
4. Restart your dev server

### "Access Denied" or "Unauthorized" Error

**Cause**: OAuth credentials are incorrect or not set.

**Fix**:
1. Double-check Client ID and Secret in `.env.local`
2. Ensure no extra spaces or quotes
3. Regenerate secrets if needed
4. Restart dev server after changing `.env.local`

### OAuth Button Does Nothing

**Cause**: JavaScript error or OAuth provider not configured in Auth.js.

**Fix**:
1. Check browser console for errors
2. Verify OAuth credentials are in `.env.local`
3. Restart dev server
4. Clear browser cache

### User Profile Not Created

**Cause**: Database or Prisma adapter issue.

**Fix**:
1. Run migrations: `npx prisma migrate dev`
2. Check database connection
3. Verify `Account` table exists in Prisma schema
4. Check server console for errors

---

## Provider-Specific Notes

### Google OAuth

- **Requires Google+ API** to be enabled
- **Consent screen** must be configured
- **Test users** needed for non-published apps
- **Verification** required for production (if using sensitive scopes)

### GitHub OAuth

- **No approval needed** for basic profile access
- **Email scope** is automatically included
- **Organization access** can be requested (optional)
- **Rate limits** apply to API calls

---

## Additional Resources

### Official Documentation

- **Google OAuth**: [developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)
- **GitHub OAuth**: [docs.github.com/en/developers/apps/building-oauth-apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- **Auth.js Providers**: [authjs.dev/getting-started/providers](https://authjs.dev/getting-started/providers)

### Video Tutorials

- Google OAuth Setup: Search YouTube for "Google OAuth Next.js"
- GitHub OAuth Setup: Search YouTube for "GitHub OAuth Next.js"

---

## Need Help?

- **Auth.js Discord**: [discord.gg/authjs](https://discord.gg/authjs)
- **CyberCodex Issues**: Open an issue in the GitHub repo
- **Stack Overflow**: Tag questions with `next-auth` or `oauth`

---

**Happy authenticating! 🚀**
