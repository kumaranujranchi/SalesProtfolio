# Email Setup Guide for Contact Form

This guide will help you set up email notifications for your contact form using Gmail's free SMTP service.

## 🚀 Quick Setup

### 1. Enable 2-Step Verification
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### 2. Generate App Password
1. In your Google Account settings, go to **Security**
2. Find **App passwords** (under 2-Step Verification)
3. Click **Generate** for a new app password
4. Select **Mail** as the app type
5. Copy the 16-character password that appears

### 3. Configure Environment Variables
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and replace with your actual credentials:
   ```env
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_APP_PASSWORD=your-16-character-app-password
   ```

### 4. Test the Setup
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the email functionality:
   ```bash
   curl -X POST http://localhost:3000/api/test-email
   ```

3. Check your email inbox for the test message

## 📧 How It Works

- **Contact Form Submissions**: When someone fills out your contact form, you'll receive a beautifully formatted email notification
- **Direct Reply**: You can reply directly to the email to respond to the person who submitted the form
- **Professional Template**: The email includes all form details in a clean, professional format

## 🔧 Alternative Email Services

If you prefer not to use Gmail, you can modify `server/email.ts` to use other free SMTP services:

### Outlook/Hotmail
```javascript
const emailConfig = {
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
};
```

### Yahoo Mail
```javascript
const emailConfig = {
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
};
```

### Custom SMTP (e.g., Brevo, SendGrid)
```javascript
const emailConfig = {
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
};
```

## 🛡️ Security Notes

- **Never commit your `.env` file** to version control
- **Use App Passwords**, not your regular email password
- **Keep your app password secure** and don't share it
- The `.env` file is already in `.gitignore` for security

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular password
- Verify 2-Step Verification is enabled
- Check that your email address is correct

### "Connection timeout" error
- Check your internet connection
- Verify Gmail SMTP settings are correct
- Try using a different network if on corporate firewall

### Email not received
- Check your spam folder
- Verify the email address in `.env` is correct
- Test with the `/api/test-email` endpoint first

## 📱 Email Template Customization

You can customize the email template in `server/email.ts`:
- Modify the HTML styling
- Change the subject line format
- Add your logo or branding
- Adjust the information displayed

The template includes:
- Sender's name and email
- Company (if provided)
- Service they're interested in
- Their message
- Submission timestamp
- Direct reply functionality 