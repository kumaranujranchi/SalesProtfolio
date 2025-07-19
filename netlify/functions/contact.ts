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

// Email template for contact form notifications (to you)
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

// Email template for confirmation email (to the person who filled the form)
const createConfirmationEmail = (submission: any) => {
  const { name, email, company, service, message } = submission;
  
  const subject = `Thank you for contacting us, ${name}!`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for your message</title>
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
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
          border-radius: 12px; 
          overflow: hidden; 
        }
        .header { 
          background: linear-gradient(135deg, #22c55e, #eab308); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 28px; 
          font-weight: 600; 
        }
        .header p { 
          margin: 10px 0 0 0; 
          font-size: 16px; 
          opacity: 0.9; 
        }
        .content { 
          padding: 40px 30px; 
        }
        .greeting { 
          font-size: 18px; 
          color: #22c55e; 
          font-weight: 600; 
          margin-bottom: 20px; 
        }
        .message { 
          font-size: 16px; 
          line-height: 1.8; 
          color: #555; 
          margin-bottom: 30px; 
        }
        .details { 
          background: #f8f9fa; 
          padding: 25px; 
          border-radius: 8px; 
          border-left: 4px solid #22c55e; 
          margin: 25px 0; 
        }
        .details h3 { 
          margin: 0 0 15px 0; 
          color: #22c55e; 
          font-size: 18px; 
        }
        .detail-row { 
          display: flex; 
          margin-bottom: 12px; 
          align-items: center; 
        }
        .detail-label { 
          font-weight: 600; 
          color: #666; 
          min-width: 120px; 
          margin-right: 15px; 
        }
        .detail-value { 
          color: #333; 
          flex: 1; 
        }
        .cta-section { 
          text-align: center; 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe); 
          border-radius: 8px; 
        }
        .cta-button { 
          display: inline-block; 
          background: linear-gradient(135deg, #22c55e, #16a34a); 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 25px; 
          font-weight: 600; 
          font-size: 16px; 
          transition: transform 0.2s; 
        }
        .cta-button:hover { 
          transform: translateY(-2px); 
        }
        .footer { 
          background: #f8f9fa; 
          padding: 30px; 
          text-align: center; 
          color: #666; 
          font-size: 14px; 
        }
        .social-links { 
          margin: 20px 0; 
        }
        .social-links a { 
          display: inline-block; 
          margin: 0 10px; 
          color: #22c55e; 
          text-decoration: none; 
          font-weight: 600; 
        }
        .contact-info { 
          margin-top: 20px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
        }
        .contact-info p { 
          margin: 5px 0; 
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
          <h1>🎉 Thank You!</h1>
          <p>We've received your message and will get back to you soon</p>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${name},</div>
          
          <div class="message">
            Thank you for reaching out to us! We're excited to hear from you and appreciate you taking the time to contact us about your <span class="highlight">${service}</span> needs.
          </div>
          
          <div class="details">
            <h3>📋 Your Message Details</h3>
            <div class="detail-row">
              <div class="detail-label">Name:</div>
              <div class="detail-value">${name}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Email:</div>
              <div class="detail-value">${email}</div>
            </div>
            ${company ? `
            <div class="detail-row">
              <div class="detail-label">Company:</div>
              <div class="detail-value">${company}</div>
            </div>
            ` : ''}
            <div class="detail-row">
              <div class="detail-label">Service:</div>
              <div class="detail-value">${service}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Message:</div>
              <div class="detail-value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Submitted:</div>
              <div class="detail-value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          
          <div class="cta-section">
            <h3 style="margin: 0 0 15px 0; color: #22c55e;">What's Next?</h3>
            <p style="margin: 0 0 20px 0; color: #555;">
              We'll review your message and get back to you within 24-48 hours with a detailed response and next steps.
            </p>
            <a href="https://salesportfoliosynergy.netlify.app/" class="cta-button">
              Visit Our Portfolio
            </a>
          </div>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="https://linkedin.com/in/your-profile">LinkedIn</a> |
            <a href="https://github.com/your-profile">GitHub</a> |
            <a href="https://twitter.com/your-profile">Twitter</a>
          </div>
          
          <div class="contact-info">
            <p><strong>Best regards,</strong></p>
            <p>Anuj Kumar</p>
            <p>Full Stack Developer & Sales Professional</p>
            <p>📧 anuj.esprit@gmail.com</p>
            <p>🌐 <a href="https://salesportfoliosynergy.netlify.app/" style="color: #22c55e;">salesportfoliosynergy.netlify.app</a></p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This is an automated confirmation email. Please do not reply to this message.
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

// Send both notification and confirmation emails
export const sendEmails = async (submission: any): Promise<{ notificationSent: boolean; confirmationSent: boolean }> => {
  const transporter = createTransporter();
  const emailUser = process.env.EMAIL_USER || 'anuj.esprit@gmail.com';
  
  console.log('Sending emails - Notification to:', emailUser, 'Confirmation to:', submission.email);
  
  let notificationSent = false;
  let confirmationSent = false;
  
  try {
    // Send notification email to you
    const notificationEmail = createContactNotificationEmail(submission);
    const notificationOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailUser,
      replyTo: submission.email,
      subject: notificationEmail.subject,
      html: notificationEmail.html
    };
    
    const notificationInfo = await transporter.sendMail(notificationOptions);
    console.log('Notification email sent successfully:', notificationInfo.messageId);
    notificationSent = true;
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
  
  try {
    // Send confirmation email to the person who filled the form
    const confirmationEmail = createConfirmationEmail(submission);
    const confirmationOptions = {
      from: `"Anuj Kumar - Portfolio" <${emailUser}>`,
      to: submission.email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html
    };
    
    const confirmationInfo = await transporter.sendMail(confirmationOptions);
    console.log('Confirmation email sent successfully:', confirmationInfo.messageId);
    confirmationSent = true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
  
  return { notificationSent, confirmationSent };
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
      
      // Send both notification and confirmation emails
      const { notificationSent, confirmationSent } = await sendEmails(validatedData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
          id: Date.now().toString(),
          notificationSent,
          confirmationSent
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