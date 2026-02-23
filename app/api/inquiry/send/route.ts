import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'pranavkhandekar152@gmail.com'

async function sendEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not set')
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@themethodlab.in'

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
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
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to send email')
  }

  return response.json()
}

function generateAdminEmail(formType: string, formData: any): string {
  const formTypeLabels: { [key: string]: string } = {
    'apply': 'Application Request',
    'individual': 'Individual Enquiry',
    'organisation': 'Organisation Enquiry',
    'teach': 'Teaching/Collaboration Enquiry',
    'contact': 'Contact Form Submission',
  }

  const label = formTypeLabels[formType] || 'Enquiry'

  let detailsHtml = ''
  for (const [key, value] of Object.entries(formData)) {
    if (value && key !== 'resume') {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
      detailsHtml += `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${label}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${value}</td></tr>`
    }
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          table { width: 100%; border-collapse: collapse; background: white; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New ${label}</h1>
          </div>
          <div class="content">
            <p>You have received a new ${label.toLowerCase()} from the website.</p>
            <table>
              ${detailsHtml}
            </table>
            <p>Please respond to the enquiry as soon as possible.</p>
          </div>
          <div class="footer">
            <p>The Method Lab - Website Enquiry System</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateThankYouEmail(formType: string, userName: string): string {
  const messages: { [key: string]: { title: string; message: string } } = {
    'apply': {
      title: 'Application Request Received',
      message: 'Thank you for your interest in our programmes. We have received your application request and will send you the application form shortly.',
    },
    'individual': {
      title: 'Enquiry Received',
      message: 'Thank you for reaching out to us. We have received your enquiry and will get back to you as soon as possible.',
    },
    'organisation': {
      title: 'Organisation Enquiry Received',
      message: 'Thank you for your interest in partnering with The Method Lab. We have received your enquiry and will connect with you soon.',
    },
    'teach': {
      title: 'Collaboration Enquiry Received',
      message: 'Thank you for your interest in collaborating with The Method Lab. We have received your enquiry and will review your application soon.',
    },
    'contact': {
      title: 'Message Received',
      message: 'Thank you for contacting us. We have received your message and will respond within 24-48 hours.',
    },
  }

  const { title, message } = messages[formType] || {
    title: 'Enquiry Received',
    message: 'Thank you for contacting us. We have received your enquiry and will get back to you soon.',
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            <p>${message}</p>
            <p>If you have any urgent questions, please feel free to contact us directly.</p>
            <p>Best regards,<br>The Method Lab Team</p>
          </div>
          <div class="footer">
            <p>The Method Lab - Applied Behavioural Learning and Research</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formType, formData } = body

    if (!formType || !formData) {
      return NextResponse.json(
        { success: false, error: 'Form type and data are required' },
        { status: 400 }
      )
    }

    const userEmail = formData.email
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'User email is required' },
        { status: 400 }
      )
    }

    const userName = formData.name || formData.contactPerson || 'Valued User'

    // Only send thank you email if user email is provided
    const shouldSendThankYou = !!userEmail

    // Send email to admin
    const adminEmailContent = generateAdminEmail(formType, formData)
    await sendEmail(
      ADMIN_EMAIL,
      `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Enquiry from ${userName}`,
      adminEmailContent
    )

    // Send thank you email to user (if email is provided)
    if (shouldSendThankYou) {
      const thankYouEmailContent = generateThankYouEmail(formType, userName)
      await sendEmail(
        userEmail,
        'Thank You for Contacting The Method Lab',
        thankYouEmailContent
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
    })
  } catch (error: any) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send emails' },
      { status: 500 }
    )
  }
}

