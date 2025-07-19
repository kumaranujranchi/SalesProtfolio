import { Handler } from '@netlify/functions';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const insertContactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(1),
});

// Email configuration
const createTransporter = () => {
  // For testing - use hardcoded values if env vars not set
  const emailUser = process.env.EMAIL_USER || 'anuj.esprit@gmail.com';
  const emailPass = (process.env.EMAIL_APP_PASSWORD || 'wcuq mnan llvt pcku').replace(/\s/g, '');
  
  console.log('Email config:', { user: emailUser, pass: emailPass ? '***' : 'NOT SET' });
  
  const emailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(emailConfig);
};

// Email template for contact form notifications
const createContactNotificationEmail = (submission: any) => {
  const { name, email, company, service, message } = submission;
  
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
            <div class="value">${new Date().toLocaleString()}</div>
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
  
  return {
    subject,
    html: htmlContent
  };
};

// Send contact form notification
const sendContactNotification = async (submission: any): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const emailUser = process.env.EMAIL_USER || 'anuj.esprit@gmail.com';
    
    console.log('Sending email to:', emailUser);
    
    const { subject, html } = createContactNotificationEmail(submission);
    
    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailUser,
      replyTo: submission.email,
      subject,
      html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = insertContactSubmissionSchema.parse(body);
      
      // Send email notification
      const emailSent = await sendContactNotification(validatedData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
          id: Date.now().toString(),
          emailSent
        })
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: "Please check your form inputs.",
            errors: error.errors
          })
        };
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Something went wrong. Please try again later."
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};