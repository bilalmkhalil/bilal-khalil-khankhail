import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ValidationError } from 'yup';
import { contactSchema } from '@/lib/contact-schema';
import { SOCIAL_LINKS } from '@/lib/constants';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Best-effort per-instance rate limit; resets when the server instance recycles.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS
  );
  hits.push(now);
  recentRequests.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === 'string' && body.company.length > 0) {
    return NextResponse.json({ success: true });
  }

  let name: string, email: string, message: string;
  try {
    ({ name, email, message } = await contactSchema.validate(body, {
      stripUnknown: true,
    }));
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: SOCIAL_LINKS.email,
      replyTo: { name, address: email },
      subject: `Website Contact: ${name.replace(/[\r\n]+/g, ' ')} - New Inquiry`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #e5e5e5;
              background-color: #0f0f10;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 8px;
            }
            .header {
              padding: 15px;
              border-bottom: 2px solid rgba(255, 255, 255, 0.1);
              margin-bottom: 20px;
            }
            .header h2 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 0 15px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #ffffff;
            }
            .message-box {
              background-color: rgba(0, 0, 0, 0.2);
              padding: 15px;
              border-left: 4px solid rgba(255, 255, 255, 0.2);
              margin-top: 5px;
              border-radius: 4px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #9ca3af;
              text-align: center;
              padding-top: 15px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            a {
              color: #a78bfa;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${safeName}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${safeEmail}">${safeEmail}</a>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${safeMessage}</div>
              </div>
            </div>
            <div class="footer">
              This message was sent from your website contact form at ${new Date().toLocaleString()}.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
