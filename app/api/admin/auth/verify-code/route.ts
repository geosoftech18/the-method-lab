import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verificationCodes } from '../send-code/route'

const ADMIN_EMAILS = [
  'pranavkhandekar152@gmail.com',
  'drangananandy@gmail.com'
]

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    const isAdmin = ADMIN_EMAILS.some(adminEmail => 
      email.toLowerCase() === adminEmail.toLowerCase()
    )

    if (!email || !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    if (!code || code.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code format' },
        { status: 400 }
      )
    }

    // Clean up expired codes
    const now = Date.now()
    for (const [key, data] of verificationCodes.entries()) {
      if (data.expiresAt < now) {
        verificationCodes.delete(key)
      }
    }

    const storedData = verificationCodes.get(email.toLowerCase())

    if (!storedData) {
      return NextResponse.json(
        { success: false, error: 'Verification code expired or not found. Please request a new code.' },
        { status: 400 }
      )
    }

    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email.toLowerCase())
      return NextResponse.json(
        { success: false, error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      )
    }

    if (storedData.code !== code) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Code is valid - create session
    const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')
    const cookieStore = await cookies()
    
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // Remove used code
    verificationCodes.delete(email.toLowerCase())

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    })
  } catch (error: any) {
    console.error('Error verifying code:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify code' },
      { status: 500 }
    )
  }
}

