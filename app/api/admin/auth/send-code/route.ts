import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAILS = [
  'pranavkhandekar152@gmail.com',
  'drangananandy@gmail.com'
]

// Store verification codes in memory (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expiresAt: number }>()

// Clean up expired codes
function cleanupExpiredCodes() {
  const now = Date.now()
  for (const [email, data] of verificationCodes.entries()) {
    if (data.expiresAt < now) {
      verificationCodes.delete(email)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const isAdmin = ADMIN_EMAILS.some(adminEmail => 
      email.toLowerCase() === adminEmail.toLowerCase()
    )

    if (!email || !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied. Only authorized administrators can login.' },
        { status: 403 }
      )
    }

    // Clean up expired codes before generating new one
    cleanupExpiredCodes()

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store code
    verificationCodes.set(email.toLowerCase(), { code, expiresAt })

    // Send email via Brevo REST API
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.error('BREVO_API_KEY is not set')
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@themethodlab.in'
    
    // Send email using Brevo REST API
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'The Method Lab',
          email: senderEmail,
        },
        to: [
          {
            email: email,
          },
        ],
        subject: 'Admin Login Verification Code',
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .code-box { background: white; border: 2px dashed #3b82f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
                .code { font-size: 32px; font-weight: bold; color: #1e3a8a; letter-spacing: 8px; font-family: monospace; }
                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Admin Login Verification</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p>You requested a verification code to access the admin panel. Use the code below to complete your login:</p>
                  <div class="code-box">
                    <div class="code">${code}</div>
                  </div>
                  <p>This code will expire in 10 minutes.</p>
                  <p>If you didn't request this code, please ignore this email.</p>
                </div>
                <div class="footer">
                  <p>The Method Lab - Admin Panel</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json().catch(() => ({}))
      console.error('Brevo API error:', errorData)
      throw new Error(errorData.message || 'Failed to send email')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent to your email' 
    })
  } catch (error: any) {
    console.error('Error sending verification code:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send verification code' },
      { status: 500 }
    )
  }
}

// Export verification codes map for use in verify route
export { verificationCodes }

