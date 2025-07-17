import { Handler } from '@netlify/functions';
import { z } from 'zod';

const insertContactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(1),
});

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
      
      // For now, just return success - you'll need to implement actual storage
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
          id: Date.now().toString()
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