# 🚀 Deployment Guide for Netlify

This guide will help you deploy your portfolio with email functionality to Netlify.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Gmail App Password**: For email functionality

## 🔧 Setup Steps

### 1. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify
4. Select your repository: `kumaranujranchi/SalesProtfolio`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`

### 2. Set Environment Variables

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

```
EMAIL_USER=anuj.esprit@gmail.com
EMAIL_APP_PASSWORD=wcuq mnan llvt pcku
```

### 3. Deploy

1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be available at a Netlify URL

## 🔍 Troubleshooting

### Common Issues:

1. **404 Errors**: 
   - Make sure the build completed successfully
   - Check that `dist/functions/contact.js` exists
   - Verify Netlify redirects are working

2. **Email Not Working**:
   - Verify environment variables are set correctly
   - Check Netlify function logs in the dashboard
   - Ensure Gmail app password is correct

3. **Build Failures**:
   - Check the build logs in Netlify dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version is set to 20

### Checking Function Logs:

1. Go to **Functions** tab in Netlify dashboard
2. Click on the `contact` function
3. Check the logs for any errors

## 📧 Email Functionality

The contact form will now:
- ✅ Send beautiful HTML emails to your Gmail
- ✅ Include all form details (name, email, company, service, message)
- ✅ Allow direct reply to the sender
- ✅ Work in production on Netlify

## 🔗 Custom Domain (Optional)

1. Go to **Domain settings** in Netlify
2. Add your custom domain
3. Configure DNS settings as instructed

## 📱 Testing

After deployment:
1. Visit your Netlify URL
2. Fill out the contact form
3. Check your email for notifications
4. Test the reply functionality

## 🛠️ Local Development

For local development with Netlify functions:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development
netlify dev
```

This will run both the frontend and Netlify functions locally.

## 📞 Support

If you encounter issues:
1. Check the Netlify function logs
2. Verify environment variables
3. Test the contact form locally first
4. Check the browser console for errors

---

**Your portfolio is now ready for production with full email functionality!** 🎉 