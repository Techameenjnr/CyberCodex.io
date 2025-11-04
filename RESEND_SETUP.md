# 📧 Resend Email Setup Guide

## Overview

This project uses [Resend](https://resend.com) for sending transactional emails (email verification, password resets, welcome emails). Resend offers a generous free tier and is perfect for modern web applications.

## Free Tier Features
- **100 emails/day** (3,000/month)
- **1 custom domain**
- All email types (transactional, marketing, etc.)
- Email API & SDKs
- Perfect for development and small-scale production

---

## Step-by-Step Setup

### 1. Create a Resend Account

1. Visit [resend.com](https://resend.com)
2. Click "Start Building" or "Sign Up"
3. Sign up with your email or GitHub account
4. Verify your email address

### 2. Get Your API Key

1. Once logged in, you'll be at the Resend dashboard
2. Click on "API Keys" in the left sidebar
3. Click "Create API Key"
4. Give it a name (e.g., "CyberCodex Development")
5. Select permissions: **"Sending access"** (Full access)
6. Click "Create"
7. **Copy the API key immediately** (it won't be shown again!)

Example key format: `re_123abc456def789ghi`

### 3. Add to Your Environment Variables

Add the API key to your `.env.local` file:

```bash
# Email Configuration (Resend)
RESEND_API_KEY="re_your_actual_api_key_here"
FROM_EMAIL="noreply@cybercodex.io"  # Use your domain or resend domain
```

**Important:** Restart your dev server after adding these variables!

```bash
npm run dev
```

### 4. Domain Setup (Optional but Recommended for Production)

For development, you can use Resend's domain (`onboarding@resend.dev`), but for production you should set up your own domain:

1. Go to **"Domains"** in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `cybercodex.io`)
4. Add the DNS records Resend provides to your domain registrar:
   - **MX records** (for receiving emails)
   - **TXT records** (for SPF, DKIM authentication)
   - **CNAME record** (for DKIM)
5. Wait for DNS propagation (5-60 minutes)
6. Click "Verify Domain" in Resend dashboard
7. Once verified, update `FROM_EMAIL` in `.env.local`:

```bash
FROM_EMAIL="noreply@cybercodex.io"  # Your verified domain
```

---

## Testing Emails

### Test in Development

Once you've added your API key, test the email system:

1. **Sign up for a new account** at `http://localhost:3000/signup`
2. Check the server console for email sending logs
3. Check your inbox for the verification email

### Using Resend Dashboard

You can also test emails directly from the Resend dashboard:

1. Go to **"Emails"** in the sidebar
2. Click "Send Test Email"
3. Choose a template or write custom HTML
4. Send to your own email to test delivery

---

## Email Templates Included

This project includes three cyber-themed email templates:

### 1. Email Verification
- **Trigger:** User signs up
- **Purpose:** Verify email address
- **Expires:** 24 hours
- **Template:** `src/lib/email/templates.ts` → `getVerificationEmailHtml()`

### 2. Password Reset
- **Trigger:** User clicks "Forgot Password"
- **Purpose:** Reset forgotten password
- **Expires:** 1 hour
- **Template:** `src/lib/email/templates.ts` → `getPasswordResetEmailHtml()`

### 3. Welcome Email
- **Trigger:** Email verification complete
- **Purpose:** Welcome new users
- **Expires:** Never
- **Template:** `src/lib/email/templates.ts` → `getWelcomeEmailHtml()`

---

## Troubleshooting

### "RESEND_API_KEY is not set" Warning

**Cause:** API key not in `.env.local` or server not restarted

**Solution:**
1. Add `RESEND_API_KEY="re_xxxxx"` to `.env.local`
2. Restart dev server: `npm run dev`

### Emails Not Sending

**Check:**
1. ✅ API key is correct and active in Resend dashboard
2. ✅ `FROM_EMAIL` matches your verified domain (or use `onboarding@resend.dev` for testing)
3. ✅ No rate limit errors in Resend dashboard (100/day free tier)
4. ✅ Check server console for error logs

### Emails Going to Spam

**Fix:**
1. Verify your domain with proper SPF/DKIM records
2. Use a consistent FROM_EMAIL address
3. Add an unsubscribe link (for marketing emails)
4. Warm up your domain by sending gradually increasing volumes

### Rate Limit Exceeded

**Free Tier Limit:** 100 emails/day

**Solutions:**
- Upgrade to paid plan ($20/month for 50,000 emails)
- Implement email throttling/queuing
- Use email only for critical actions (verification, password reset)

---

## Production Checklist

Before deploying to production:

- [ ] Verify your custom domain in Resend
- [ ] Update `FROM_EMAIL` to use your domain
- [ ] Set `RESEND_API_KEY` in production environment variables (Vercel, Railway, etc.)
- [ ] Set `NEXTAUTH_URL` to your production URL
- [ ] Test all email flows in production environment
- [ ] Monitor email delivery rates in Resend dashboard
- [ ] Set up email logging/tracking for debugging

---

## Useful Links

- **Resend Dashboard:** [resend.com/home](https://resend.com/home)
- **API Documentation:** [resend.com/docs](https://resend.com/docs)
- **React Email (Advanced Templates):** [react.email](https://react.email)
- **Pricing:** [resend.com/pricing](https://resend.com/pricing)

---

## Need Help?

- **Resend Support:** support@resend.com
- **Discord Community:** [Resend Discord](https://discord.gg/resend)
- **GitHub Issues:** Report bugs in this repo

---

**Happy sending! 🚀**
