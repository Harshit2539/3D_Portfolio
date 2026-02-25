/* eslint-env node */
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Email templates
const adminEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #6366f1; margin-bottom: 5px; }
    .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Contact Form Submission</h1>
      <p>Someone wants to connect with you!</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">📧 Email:</div>
        <div class="value">${data.email}</div>
      </div>
      <div class="field">
        <div class="label">📝 Subject:</div>
        <div class="value">${data.subject}</div>
      </div>
      <div class="field">
        <div class="label">💬 Message:</div>
        <div class="value">${data.message}</div>
      </div>
      <div class="footer">
        <p>Received at: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const userEmailTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 40px; border-radius: 0 0 10px 10px; }
    .emoji { font-size: 48px; margin-bottom: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">✨</div>
      <h1>Thank You for Reaching Out!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for contacting me! I've received your message and I'm excited to connect with you.</p>
      <p>I'll review your message carefully and get back to you within <strong>24 hours</strong>.</p>
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Check out my portfolio projects</li>
        <li>Connect with me on LinkedIn</li>
        <li>Follow me on GitHub</li>
      </ul>
      <p>Looking forward to our conversation!</p>
      <p><strong>Best regards,</strong><br>Harsh Tyagi</p>
    </div>
    <div class="footer">
      <p>This is an automated response. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Send email to admin
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: adminEmailTemplate({ name, email, subject, message })
    });

    // Send thank you email to user
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for reaching out!',
      html: userEmailTemplate(name)
    });

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// AI Generate Message endpoint
app.post('/api/generate-message', async (req, res) => {
  try {
    const { name, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and subject are required' 
      });
    }

    const prompt = `Write a professional and friendly contact message for a portfolio website.
The sender's name is: ${name}
The subject is: ${subject}

Generate a concise, professional message (2-3 sentences) that:
- Introduces the sender briefly
- States their interest related to the subject
- Requests a response or meeting

Keep it under 150 words and make it sound natural and professional.`;

    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'You are a professional message writer for portfolio contact forms.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    const data = await response.json();
    const message = data.choices[0].message.content.trim();

    res.json({ 
      success: true, 
      message
    });

  } catch (error) {
    console.error('AI Generation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate message. Please try again.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
