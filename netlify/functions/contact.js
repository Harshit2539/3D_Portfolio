import nodemailer from "nodemailer";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "All fields required",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // const adminEmailTemplate = `
    //   <h2>New Contact Form Submission</h2>
    //   <p><strong>Name:</strong> ${name}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Subject:</strong> ${subject}</p>
    //   <p><strong>Message:</strong> ${message}</p>
    // `;

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

    // const userEmailTemplate = `
    //   <h2>Thank You for Reaching Out!</h2>
    //   <p>Hi ${name},</p>
    //   <p>Thank you for contacting me! I'll get back to you within 24 hours.</p>
    // `;

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

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: adminEmailTemplate,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for reaching out!",
      html: userEmailTemplate,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message sent!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Failed to send" }),
    };
  }
};
