export interface EmailVerificationData {
  name: string;
  verificationUrl: string;
}

export interface PasswordResetData {
  name: string;
  resetUrl: string;
}

export interface WelcomeEmailData {
  name: string;
  dashboardUrl: string;
}

// Base email template with cyber-themed styling
const emailBaseStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #0a0e27;
    color: #e0e7ff;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .header {
    text-align: center;
    margin-bottom: 40px;
  }
  .logo {
    font-size: 32px;
    font-weight: bold;
    background: linear-gradient(135deg, #00ff41 0%, #00d9ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .card {
    background-color: #151a2f;
    border: 1px solid #1f2937;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #e0e7ff;
    margin-bottom: 20px;
  }
  .text {
    font-size: 16px;
    line-height: 1.6;
    color: #94a3b8;
    margin-bottom: 20px;
  }
  .button {
    display: inline-block;
    background-color: #00ff41;
    color: #0a0e27;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0;
  }
  .button:hover {
    background-color: #00d9ff;
  }
  .code {
    background-color: #0a0e27;
    border: 1px solid #1f2937;
    border-radius: 8px;
    padding: 16px;
    font-family: 'Courier New', monospace;
    font-size: 24px;
    letter-spacing: 4px;
    text-align: center;
    color: #00ff41;
    margin: 20px 0;
  }
  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 14px;
    color: #64748b;
  }
  .footer a {
    color: #00ff41;
    text-decoration: none;
  }
`;

export function getVerificationEmailHtml(data: EmailVerificationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - CyberCodex.io</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CyberCodex.io</div>
    </div>
    <div class="card">
      <h1 class="title">Verify Your Email Address</h1>
      <p class="text">Hi ${data.name},</p>
      <p class="text">
        Thanks for signing up for CyberCodex! To complete your registration and start your cybersecurity learning journey, please verify your email address by clicking the button below:
      </p>
      <div style="text-align: center;">
        <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
      </div>
      <p class="text">
        Or copy and paste this URL into your browser:
      </p>
      <p class="text" style="word-break: break-all; color: #00ff41;">
        ${data.verificationUrl}
      </p>
      <p class="text">
        This link will expire in 24 hours for security reasons.
      </p>
      <p class="text">
        If you didn't create an account with CyberCodex, you can safely ignore this email.
      </p>
    </div>
    <div class="footer">
      <p>
        © ${new Date().getFullYear()} CyberCodex.io - Master Cybersecurity & Ethical Hacking<br>
        <a href="https://cybercodex.io">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getPasswordResetEmailHtml(data: PasswordResetData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - CyberCodex.io</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CyberCodex.io</div>
    </div>
    <div class="card">
      <h1 class="title">Reset Your Password</h1>
      <p class="text">Hi ${data.name},</p>
      <p class="text">
        We received a request to reset your password for your CyberCodex account. Click the button below to set a new password:
      </p>
      <div style="text-align: center;">
        <a href="${data.resetUrl}" class="button">Reset Password</a>
      </div>
      <p class="text">
        Or copy and paste this URL into your browser:
      </p>
      <p class="text" style="word-break: break-all; color: #00ff41;">
        ${data.resetUrl}
      </p>
      <p class="text">
        This link will expire in 1 hour for security reasons.
      </p>
      <p class="text" style="color: #ff0033;">
        <strong>⚠️ Security Note:</strong> If you didn't request a password reset, please ignore this email and make sure your account is secure. Consider changing your password if you suspect unauthorized access.
      </p>
    </div>
    <div class="footer">
      <p>
        © ${new Date().getFullYear()} CyberCodex.io - Master Cybersecurity & Ethical Hacking<br>
        <a href="https://cybercodex.io">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getWelcomeEmailHtml(data: WelcomeEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CyberCodex.io</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CyberCodex.io</div>
    </div>
    <div class="card">
      <h1 class="title">Welcome to CyberCodex! 🎉</h1>
      <p class="text">Hi ${data.name},</p>
      <p class="text">
        Welcome to CyberCodex - your gateway to mastering cybersecurity and ethical hacking! We're excited to have you join our community of security professionals and enthusiasts.
      </p>
      <p class="text">
        <strong>Here's what you can do next:</strong>
      </p>
      <ul class="text">
        <li>Browse our course library and start learning</li>
        <li>Complete your profile to track your progress</li>
        <li>Earn XP and badges as you advance</li>
        <li>Join our community discussions</li>
      </ul>
      <div style="text-align: center;">
        <a href="${data.dashboardUrl}" class="button">Go to Dashboard</a>
      </div>
      <p class="text">
        If you have any questions, feel free to reach out to our support team. Happy hacking!
      </p>
      <p class="text">
        - The CyberCodex Team
      </p>
    </div>
    <div class="footer">
      <p>
        © ${new Date().getFullYear()} CyberCodex.io - Master Cybersecurity & Ethical Hacking<br>
        <a href="https://cybercodex.io">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
