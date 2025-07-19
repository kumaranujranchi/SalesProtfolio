import nodemailer from 'nodemailer';
import type { ContactSubmission } from '@shared/schema';

// Create transporter function to ensure environment variables are loaded
const createTransporter = () => {
  const emailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: (process.env.EMAIL_APP_PASSWORD || 'your-app-password').replace(/\s/g, '')
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  // Debug environment variables
  console.log('Email service environment check:');
  console.log('process.env.EMAIL_USER:', process.env.EMAIL_USER);
  console.log('process.env.EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT SET');
  console.log('Final email config user:', emailConfig.auth.user);

  return nodemailer.createTransport(emailConfig);
};

// Email template for contact form notifications
const createContactNotificationEmail = (submission: ContactSubmission) => {
  const { name, email, company, service, message, createdAt } = submission;
  
  const subject = `New Contact Form Submission from ${name}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #22c55e, #eab308); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #22c55e; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #22c55e; margin-top: 10px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>You have received a new message from your portfolio website</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          ${company ? `
          <div class="field">
            <div class="label">🏢 Company:</div>
            <div class="value">${company}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">🎯 Service Interested In:</div>
            <div class="value">${service}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">📅 Submitted:</div>
            <div class="value">${new Date(createdAt).toLocaleString()}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from your portfolio contact form</p>
          <p>Reply directly to this email to respond to ${name}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Service: ${service}
Message: ${message}
Submitted: ${new Date(createdAt).toLocaleString()}

Reply to this email to respond to ${name}.
  `;
  
  return {
    subject,
    html: htmlContent,
    text: textContent
  };
};

// Send contact form notification
export const sendContactNotification = async (submission: ContactSubmission): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
    
    console.log('Email config:', {
      user: emailUser,
      pass: process.env.EMAIL_APP_PASSWORD ? '***' : 'NOT SET'
    });
    
    const { subject, html, text } = createContactNotificationEmail(submission);
    
    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailUser, // Send to yourself
      replyTo: submission.email, // Allow direct reply to the person who submitted
      subject,
      html,
      text
    };
    
    console.log('Attempting to send email to:', emailUser);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        code: (error as any).code,
        command: (error as any).command
      });
    }
    return false;
  }
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

// Test email function (for development)
export const sendTestEmail = async (): Promise<boolean> => {
  try {
    const testSubmission: ContactSubmission = {
      id: 0,
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      service: 'Strategy Consulting',
      message: 'This is a test message to verify email functionality.',
      createdAt: new Date()
    };
    
    return await sendContactNotification(testSubmission);
  } catch (error) {
    console.error('Test email failed:', error);
    return false;
  }
}; 