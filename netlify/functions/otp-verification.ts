import { Handler } from '@netlify/functions';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// In-memory storage for OTPs (in production, use a database)
const otpStore = new Map<string, { otp: string; timestamp: number; data: any }>();

// OTP validation schema
const otpRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(1),
});

const otpVerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

// Email configuration
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || 'anuj.esprit@gmail.com';
  const emailPass = (process.env.EMAIL_APP_PASSWORD || 'wcuq mnan llvt pcku').replace(/\s/g, '');
  
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

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create OTP email template
const createOTPEmail = (name: string, otp: string) => {
  const subject = `Verify your email - OTP for contact form`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Email Verification OTP</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f8f9fa; 
        }
        .container { 
          max-width: 500px; 
          margin: 0 auto; 
          background: white; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
          border-radius: 12px; 
          overflow: hidden; 
        }
        .header { 
          background: linear-gradient(135deg, #22c55e, #eab308); 
          color: white; 
          padding: 30px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: 600; 
        }
        .content { 
          padding: 30px; 
        }
        .greeting { 
          font-size: 16px; 
          color: #22c55e; 
          font-weight: 600; 
          margin-bottom: 20px; 
        }
        .message { 
          font-size: 14px; 
          line-height: 1.6; 
          color: #555; 
          margin-bottom: 25px; 
        }
        .otp-container { 
          text-align: center; 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe); 
          border-radius: 8px; 
          border: 2px dashed #22c55e; 
        }
        .otp-code { 
          font-size: 32px; 
          font-weight: bold; 
          color: #22c55e; 
          letter-spacing: 8px; 
          font-family: 'Courier New', monospace; 
          margin: 10px 0; 
        }
        .otp-label { 
          font-size: 14px; 
          color: #666; 
          margin-bottom: 10px; 
        }
        .expiry { 
          font-size: 12px; 
          color: #999; 
          margin-top: 15px; 
        }
        .footer { 
          background: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          color: #666; 
          font-size: 12px; 
        }
        .contact-info { 
          margin-top: 15px; 
          padding-top: 15px; 
          border-top: 1px solid #e5e7eb; 
        }
        .contact-info p { 
          margin: 3px 0; 
        }
        .highlight { 
          color: #22c55e; 
          font-weight: 600; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Email Verification</h1>
        </div>
        
        <div class="content">
          <div class="greeting">Hello ${name},</div>
          
          <div class="message">
            Thank you for contacting us! To ensure the security of your message and verify your email address, please use the OTP (One-Time Password) below.
          </div>
          
          <div class="otp-container">
            <div class="otp-label">Your verification code:</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry">⏰ This code expires in 10 minutes</div>
          </div>
          
          <div class="message">
            <strong>Important:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Enter this code in the form to complete your submission</li>
              <li>This code is valid for 10 minutes only</li>
              <li>If you didn't request this code, please ignore this email</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <div class="contact-info">
            <p><strong>Best regards,</strong></p>
            <p>Anuj Kumar</p>
            <p>Full Stack Developer & Sales Professional</p>
            <p>📧 anuj.esprit@gmail.com</p>
            <p>🌐 <a href="https://salesportfoliosynergy.netlify.app/" style="color: #22c55e;">salesportfoliosynergy.netlify.app</a></p>
          </div>
          
          <p style="margin-top: 15px; font-size: 11px; color: #999;">
            This is an automated verification email. Please do not reply to this message.
          </p>
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

// Send OTP email
const sendOTPEmail = async (email: string, name: string, otp: string): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const emailUser = process.env.EMAIL_USER || 'anuj.esprit@gmail.com';
    
    const { subject, html } = createOTPEmail(name, otp);
    
    const mailOptions = {
      from: `"Anuj Kumar - Portfolio" <${emailUser}>`,
      to: email,
      subject,
      html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return false;
  }
};

// Clean expired OTPs (older than 10 minutes)
const cleanExpiredOTPs = () => {
  const now = Date.now();
  const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  for (const [email, data] of otpStore.entries()) {
    if (now - data.timestamp > tenMinutes) {
      otpStore.delete(email);
    }
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

  // Clean expired OTPs
  cleanExpiredOTPs();

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      
      // Check if this is an OTP request or verification
      if (body.action === 'request-otp') {
        // Step 1: Request OTP
        const validatedData = otpRequestSchema.parse(body);
        
        // Generate OTP
        const otp = generateOTP();
        const timestamp = Date.now();
        
        // Store OTP with form data
        otpStore.set(validatedData.email, {
          otp,
          timestamp,
          data: validatedData
        });
        
        // Send OTP email
        const emailSent = await sendOTPEmail(validatedData.email, validatedData.name, otp);
        
        if (emailSent) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: `OTP sent to ${validatedData.email}`,
              action: 'otp-sent'
            })
          };
        } else {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Failed to send OTP. Please try again.'
            })
          };
        }
        
      } else if (body.action === 'verify-otp') {
        // Step 2: Verify OTP and submit form
        const { email, otp } = otpVerifySchema.parse(body);
        
        const storedData = otpStore.get(email);
        
        if (!storedData) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'OTP expired or not found. Please request a new OTP.'
            })
          };
        }
        
        if (storedData.otp !== otp) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Invalid OTP. Please check and try again.'
            })
          };
        }
        
        // OTP is valid - remove from store and proceed with form submission
        const formData = storedData.data;
        otpStore.delete(email);
        
        // Import and use the contact form submission logic
        const { sendEmails } = await import('./contact.js');
        const { notificationSent, confirmationSent } = await sendEmails(formData);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: "Thank you for your message! I'll get back to you soon.",
            id: Date.now().toString(),
            notificationSent,
            confirmationSent,
            action: 'form-submitted'
          })
        };
        
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid action. Please specify "request-otp" or "verify-otp".'
          })
        };
      }
      
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
      
      console.error('OTP verification error:', error);
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