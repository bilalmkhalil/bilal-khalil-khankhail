import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'bilalkhalilkhankhail@gmail.com',
      subject: `Website Contact: ${name} - New Inquiry`,
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
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
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
