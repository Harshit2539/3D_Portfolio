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

  const adminEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      line-height: 1.5;
      color: #0f172a;
    }

    /* Main container */
    .email-wrapper {
      width: 100%;
      padding: 20px;
      background-color: #f1f5f9;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    /* Header section with animated gradient */
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .email-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }

    .email-header h1 {
      color: #ffffff;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      position: relative;
    }

    .email-header p {
      color: rgba(255,255,255,0.95);
      font-size: 18px;
      font-weight: 400;
      position: relative;
    }

    .badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      padding: 8px 16px;
      border-radius: 100px;
      color: white;
      font-size: 14px;
      font-weight: 500;
      margin-top: 20px;
      border: 1px solid rgba(255,255,255,0.3);
    }

    /* Content area */
    .email-content {
      padding: 40px 35px;
      background: #ffffff;
    }

    /* Field styling */
    .field-group {
      margin-bottom: 28px;
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
    }

    .field-group:nth-child(1) { animation-delay: 0.1s; }
    .field-group:nth-child(2) { animation-delay: 0.2s; }
    .field-group:nth-child(3) { animation-delay: 0.3s; }
    .field-group:nth-child(4) { animation-delay: 0.4s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .field-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 8px;
    }

    .field-label span {
      font-size: 20px;
    }

    .field-value {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 16px 20px;
      border-radius: 16px;
      color: #0f172a;
      font-size: 16px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .field-value:hover {
      border-color: #667eea;
      box-shadow: 0 8px 16px -4px rgba(102, 126, 234, 0.1);
    }

    /* Message field specific */
    .message-field .field-value {
      white-space: pre-wrap;
      line-height: 1.7;
      min-height: 100px;
    }

    /* Divider */
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
      margin: 30px 0;
    }

    /* Meta information */
    .meta-info {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #f8fafc;
      border-radius: 16px;
      margin-top: 10px;
    }

    .timestamp {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #64748b;
      font-size: 14px;
    }

    .timestamp svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
    }

    .reply-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 100px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.4);
    }

    .reply-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.5);
    }

    /* Social Links */
    .social-links {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin: 20px 0;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }

    .social-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .social-link:hover::before {
      opacity: 1;
    }

    .social-link svg {
      width: 22px;
      height: 22px;
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }

    .social-link:hover svg {
      fill: white;
      transform: scale(1.1);
    }

    .social-link.linkedin svg {
      fill: #0077b5;
    }

    .social-link.github svg {
      fill: #333;
    }

    .social-link:hover svg {
      fill: white;
    }

    /* Footer */
    .email-footer {
      background: #f8fafc;
      padding: 30px 35px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .footer-text {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .signature {
      margin: 20px 0;
      padding: 15px;
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .signature-name {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .signature-title {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .copyright {
      color: #94a3b8;
      font-size: 12px;
      margin-top: 20px;
    }

    /* Responsive adjustments */
    @media screen and (max-width: 600px) {
      .email-wrapper {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 20px;
      }
      
      .email-header {
        padding: 30px 20px;
      }
      
      .email-header h1 {
        font-size: 24px;
      }
      
      .email-content {
        padding: 30px 20px;
      }
      
      .meta-info {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
      }
      
      .reply-button {
        width: 100%;
        justify-content: center;
      }
      
      .field-value {
        padding: 14px 16px;
      }

      .social-links {
        gap: 12px;
      }

      .social-link {
        width: 40px;
        height: 40px;
      }

      .social-link svg {
        width: 20px;
        height: 20px;
      }
    }

    /* Dark mode support for email clients */
    @media (prefers-color-scheme: dark) {
      .email-container {
        background: #1e293b;
      }
      
      .email-content {
        background: #1e293b;
      }
      
      .field-value {
        background: #334155;
        border-color: #475569;
        color: #f1f5f9;
      }
      
      .field-label {
        color: #94a3b8;
      }
      
      .meta-info {
        background: #334155;
      }
      
      .email-footer {
        background: #0f172a;
        border-color: #334155;
      }
      
      .footer-text {
        color: #94a3b8;
      }

      .signature {
        background: #334155;
        border-color: #475569;
      }

      .signature-name {
        color: #f1f5f9;
      }

      .signature-title {
        color: #94a3b8;
      }

      .social-link {
        background: #334155;
        border-color: #475569;
      }

      .social-link.github svg {
        fill: #f1f5f9;
      }
    }

    /* Print styles */
    @media print {
      .email-wrapper {
        background: white;
        padding: 0;
      }
      
      .email-container {
        box-shadow: none;
      }
      
      .reply-button,
      .social-links {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="email-header">
        <h1>✨ New Contact Submission</h1>
        <p>Someone's reaching out to connect!</p>
        <div class="badge">Priority: Normal</div>
      </div>

      <!-- Content -->
      <div class="email-content">
        <!-- Name Field -->
        <div class="field-group">
          <div class="field-label">
            <span>👤</span>
            <span>Full Name</span>
          </div>
          <div class="field-value">
            ${name}
          </div>
        </div>

        <!-- Email Field -->
        <div class="field-group">
          <div class="field-label">
            <span>📧</span>
            <span>Email Address</span>
          </div>
          <div class="field-value">
            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
          </div>
        </div>

        <!-- Subject Field -->
        <div class="field-group">
          <div class="field-label">
            <span>📌</span>
            <span>Subject</span>
          </div>
          <div class="field-value">
            ${subject}
          </div>
        </div>

        <!-- Message Field -->
        <div class="field-group message-field">
          <div class="field-label">
            <span>💬</span>
            <span>Message</span>
          </div>
          <div class="field-value">
            ${message}
          </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Meta Information -->
        <div class="meta-info">
          <div class="timestamp">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${new Date().toLocaleString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit', 
              minute: '2-digit'
            })}</span>
          </div>
          
          <a href="mailto:${email}?subject=Re: ${subject}" class="reply-button">
            <span>📨</span>
            <span>Reply Now</span>
          </a>
        </div>
      </div>

      <!-- Footer with Dynamic Social Links -->
      <div class="email-footer">
        <div class="footer-text">
          Connect with me on social media
        </div>
        
        <div class="social-links">
          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/harshtyagi25" class="social-link linkedin" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          <!-- GitHub -->
          <a href="https://github.com/Harshit2539" class="social-link github" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>

        <!-- Digital Signature -->
        <div class="signature">
          <div class="signature-name">Harsh Tyagi</div>
          <div class="signature-title">Software Developer & Creator</div>
        </div>
        
        <div class="copyright">
          © ${new Date().getFullYear()} Harsh Tyagi. All rights reserved made with 💜 in india.
        </div>
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

 const userEmailTemplate =  `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You for Contacting Me</title>
  <style>
    /* Outlook & Email Client Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f7;
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    /* Outlook-specific fixes */
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    td, th {
      padding: 0;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%;
    }

    /* Responsive container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e9e9f0;
      border-radius: 16px;
      overflow: hidden;
    }

    /* Header section - Simplified for Outlook */
    .header {
      background: #667eea;
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 40px 30px;
      text-align: center;
    }

    /* Fallback for Outlook */
    .header-fallback {
      background-color: #667eea;
    }

    .header-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      font-size: 40px;
      line-height: 80px;
      color: #ffffff;
    }

    .header h1 {
      color: #ffffff;
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 10px;
      line-height: 1.3;
    }

    .header-badge {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 8px 20px;
      border-radius: 50px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }

    /* Content section */
    .content {
      padding: 40px 30px;
      background-color: #ffffff;
    }

    /* Typography - Mobile optimized */
    h2 {
      font-size: 24px;
      color: #1e293b;
      font-weight: 600;
      margin: 0 0 10px;
      line-height: 1.3;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: #4a5568;
      margin: 0 0 20px;
    }

    /* Message card - Simplified for Outlook */
    .message-card {
      background-color: #f8fafc;
      border-left: 4px solid #667eea;
      padding: 25px;
      margin: 25px 0;
    }

    .message-card p {
      font-size: 18px;
      color: #2d3748;
      margin: 0;
    }

    /* Timer section - Better mobile readability */
    .timer-section {
      background-color: #f0f4ff;
      border-radius: 12px;
      padding: 20px;
      margin: 25px 0;
    }

    .timer-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .timer-icon {
      min-width: 48px;
      height: 48px;
      background: #667eea;
      border-radius: 12px;
      text-align: center;
      line-height: 48px;
      color: white;
      font-size: 24px;
    }

    .timer-text {
      font-size: 16px;
      color: #2d3748;
      line-height: 1.5;
    }

    .timer-text strong {
      color: #667eea;
      font-size: 20px;
      display: block;
      margin-bottom: 5px;
    }

    /* Social links - Simplified grid */
    .social-links {
      margin: 30px 0;
    }

    .social-row {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }

    .social-card {
      flex: 1;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      text-decoration: none;
      display: block;
    }

    .social-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      margin-bottom: 12px;
    }

    .linkedin-bg {
      background-color: #0077b5;
    }

    .github-bg {
      background-color: #24292e;
    }

    .social-icon img {
      width: 48px;
      height: 48px;
      display: block;
    }

    .social-info h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 5px;
    }

    .social-info p {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }

    /* Signature section */
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e2e8f0;
    }

    .signature-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      background: #667eea;
      border-radius: 16px;
      text-align: center;
      line-height: 70px;
      color: white;
      font-size: 28px;
      font-weight: 600;
    }

    .signature-text {
      flex: 1;
    }

    .signature-name {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      display: block;
      margin-bottom: 5px;
    }

    .signature-title {
      color: #667eea;
      font-size: 14px;
    }

    /* Footer */
    .footer {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .auto-reply {
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #e2e8f0;
    }

    .badge {
      display: inline-block;
      background-color: #fee2e2;
      color: #dc2626;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
    }

    .copyright {
      color: #94a3b8;
      font-size: 12px;
    }

    /* Mobile Responsive */
    @media screen and (max-width: 480px) {
      .content, .header {
        padding: 30px 20px;
      }

      .timer-content {
        flex-direction: column;
        text-align: center;
      }

      .social-row {
        flex-direction: column;
      }

      .social-card {
        width: 100%;
      }

      .signature-content {
        flex-direction: column;
        text-align: center;
      }

      h1 {
        font-size: 28px !important;
      }

      h2 {
        font-size: 22px;
      }

      p {
        font-size: 15px;
      }

      .timer-text strong {
        font-size: 18px;
      }
    }

    /* Outlook table fallback */
    .outlook-table {
      width: 100%;
      max-width: 600px;
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f7; font-family: 'Segoe UI', Arial, sans-serif;">
  <!-- Outlook-friendly wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f7;">
    <tr>
      <td align="center" style="padding: 20px;">
        <!-- Main container -->
        <table class="outlook-table" width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e9e9f0;">
          <tr>
            <td>
              <!-- Header -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="header" style="background: #667eea; background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px 30px; text-align: center;">
                    <!--[if mso]>
                    <table width="100%">
                      <tr>
                        <td style="background-color: #667eea; padding: 40px 30px; text-align: center;">
                    <![endif]-->
                    <div class="header-icon" style="width: 80px; height: 80px; margin: 0 auto 20px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; font-size: 40px; line-height: 80px; color: #ffffff;">✨</div>
                    <h1 style="color: #ffffff; font-size: 32px; font-weight: 600; margin: 0 0 10px; line-height: 1.3;">Thank You!</h1>
                    <div class="header-badge" style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 8px 20px; border-radius: 50px; color: #ffffff; font-size: 14px;">Message Received</div>
                    <!--[if mso]>
                        </td>
                      </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="content" style="padding: 40px 30px; background-color: #ffffff;">
                    <!-- Greeting -->
                    <h2 style="font-size: 24px; color: #1e293b; margin: 0 0 10px;">Hi ${name || 'there'}! 👋</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin: 0 0 20px;">Thanks for reaching out. I'm excited to connect with you.</p>

                    <!-- Message Card -->
                    <div class="message-card" style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 25px; margin: 25px 0;">
                      <p style="font-size: 18px; color: #2d3748; margin: 0;">I've received your message and will personally review it. I'm looking forward to our conversation.</p>
                    </div>

                    <!-- Timer -->
                    <div class="timer-section" style="background-color: #f0f4ff; border-radius: 12px; padding: 20px; margin: 25px 0;">
                      <div class="timer-content" style="display: flex; align-items: center; gap: 15px;">
                        <div class="timer-icon" style="min-width: 48px; height: 48px; background: #667eea; border-radius: 12px; text-align: center; line-height: 48px; color: white; font-size: 24px;">⏰</div>
                        <div class="timer-text" style="font-size: 16px; color: #2d3748;">
                          <strong style="color: #667eea; font-size: 20px; display: block; margin-bottom: 5px;">24-Hour Response</strong>
                          <span>I'll get back to you within 24 hours</span>
                        </div>
                      </div>
                    </div>

                    <!-- Social Links -->
                    <div class="social-links" style="margin: 30px 0;">
                      <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 20px;">Connect with me:</p>
                      
                      <!-- LinkedIn -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                        <tr>
                          <td style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="60" style="vertical-align: middle;">
                                  <div style="width: 48px; height: 48px; background-color: #0077b5; border-radius: 12px;"></div>
                                </td>
                                <td style="vertical-align: middle; padding-left: 15px;">
                                  <a href="https://www.linkedin.com/in/harshtyagi25" style="text-decoration: none; color: #1e293b; font-weight: 600; font-size: 16px; display: block;">LinkedIn</a>
                                  <span style="color: #64748b; font-size: 13px;">Connect professionally</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- GitHub -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="60" style="vertical-align: middle;">
                                  <div style="width: 48px; height: 48px; background-color: #24292e; border-radius: 12px;"></div>
                                </td>
                                <td style="vertical-align: middle; padding-left: 15px;">
                                  <a href="https://github.com/Harshit2539" style="text-decoration: none; color: #1e293b; font-weight: 600; font-size: 16px; display: block;">GitHub</a>
                                  <span style="color: #64748b; font-size: 13px;">Check my work</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Signature -->
                    <div class="signature" style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #e2e8f0;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="90" style="vertical-align: middle;">
                            <div class="avatar" style="width: 70px; height: 70px; background: #667eea; border-radius: 16px; text-align: center; line-height: 70px; color: white; font-size: 28px; font-weight: 600;">HT</div>
                          </td>
                          <td style="vertical-align: middle; padding-left: 20px;">
                            <span class="signature-name" style="font-size: 20px; font-weight: 600; color: #1e293b; display: block; margin-bottom: 5px;">Looking forward to our conversation!</span>
                            <span class="signature-title" style="color: #667eea; font-size: 14px;">Harsh Tyagi</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="footer" style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <div class="auto-reply" style="background-color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                      <p style="color: #4a5568; font-size: 14px; margin-bottom: 10px;">✨ This is an automated response — I'll personally get back to you soon.</p>
                      <div class="badge" style="display: inline-block; background-color: #fee2e2; color: #dc2626; padding: 6px 16px; border-radius: 50px; font-size: 12px; font-weight: 600;">Auto-reply • Human will respond</div>
                    </div>
                    <div class="copyright" style="color: #94a3b8; font-size: 12px;">
                      © ${new Date().getFullYear()} Harsh Tyagi. All rights reserved made with 💜 in india.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    await transporter.sendMail({
      // from: process.env.SMTP_USER,
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Request: ${subject}`,
      html: adminEmailTemplate,
    });

    await transporter.sendMail({
      // from: process.env.SMTP_USER,
      from: `"Portfolio Autogenerated Response" <${process.env.SMTP_USER}>`,
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
