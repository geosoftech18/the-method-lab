import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
      return NextResponse.json({ 
        authenticated: false 
      })
    }

    // In a production app, you would verify the session token here
    // For now, we'll just check if it exists
    return NextResponse.json({ 
      authenticated: true 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      authenticated: false 
    })
  }
}




