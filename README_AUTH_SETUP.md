# Admin Authentication Setup

## Environment Variables Required

Add the following environment variables to your `.env.local` file:

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=your_verified_sender_email@domain.com
```

## Setup Instructions

1. **Get Brevo API Key:**
   - Sign up at https://www.brevo.com/
   - Go to Settings > API Keys
   - Create a new API key
   - Copy the API key to `BREVO_API_KEY` in your `.env.local`

2. **Verify Sender Email:**
   - In Brevo dashboard, go to Senders & IP
   - Add and verify your sender email address
   - Use this email in `BREVO_SENDER_EMAIL`

3. **Admin Email:**
   - The admin email is hardcoded as: `pranavkhandekar152@gmail.com`
   - Only this email can receive verification codes

## How It Works

1. Admin visits `/admin/login`
2. Enters email address (must be `pranavkhandekar152@gmail.com`)
3. Receives 6-digit verification code via email
4. Enters code to complete login
5. Session cookie is set for 7 days
6. All admin routes are protected by middleware

## Features

- ✅ Email-based authentication
- ✅ 6-digit verification code
- ✅ 10-minute code expiration
- ✅ Session management (7 days)
- ✅ Protected admin routes
- ✅ Automatic logout functionality
- ✅ Secure cookie-based sessions

## Security Notes

- Verification codes are stored in memory (for production, consider Redis)
- Codes expire after 10 minutes
- Session cookies are HTTP-only and secure in production
- Only authorized email can receive codes




