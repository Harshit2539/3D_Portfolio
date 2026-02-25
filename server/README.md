# Portfolio Contact Form Backend

## 🚀 Setup Instructions

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Environment Variables
The `.env` file is already configured in the root directory with your SMTP credentials.

### 3. Start the Server
```bash
# From the server directory
npm start

# Or from root directory
cd server && npm start
```

The server will run on `http://localhost:3008`

### 4. Start the Frontend
In a separate terminal:
```bash
# From the root directory
npm run dev
```

## 📧 How It Works

1. **User fills the contact form** on your portfolio
2. **Two emails are sent automatically:**
   - **To You (Admin):** Contains all the user's details (name, email, subject, message)
   - **To User:** A thank you email confirming their message was received

## 🔧 Email Configuration

The system uses Gmail SMTP with the following settings:
- **Host:** smtp.gmail.com
- **Port:** 587
- **Email:** softwareredian@gmail.com

## 🎨 Features

✅ Beautiful HTML email templates
✅ Automatic thank you email to users
✅ Admin notification with full contact details
✅ Error handling and validation
✅ CORS enabled for frontend integration
✅ Professional email design with gradients

## 🔒 Security Notes

- Never commit `.env` file to GitHub
- Keep your SMTP credentials secure
- The app password is already configured for Gmail

## 📝 API Endpoints

### POST `/api/contact`
Send a contact form submission

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### GET `/api/health`
Check server status

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Troubleshooting

**Issue:** Emails not sending
- Check if Gmail SMTP credentials are correct
- Ensure the app password is valid
- Check if port 587 is not blocked by firewall

**Issue:** CORS errors
- Make sure the server is running on port 3008
- Check if frontend is making requests to the correct URL

## 🚀 Production Deployment

For production, update the API URL in `Contact.jsx`:
```javascript
const response = await fetch('https://your-domain.com/api/contact', {
  // ...
});
```

Consider deploying the backend to:
- Heroku
- Railway
- Render
- AWS Lambda
- Vercel (with serverless functions)
