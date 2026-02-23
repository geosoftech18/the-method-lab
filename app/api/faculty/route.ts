import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all faculty members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { role: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ]
    }

    const faculty = await prisma.facultyMember.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: faculty })
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch faculty' },
      { status: 500 }
    )
  }
}

// POST create new faculty member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, bio, image, linkedinUrl } = body

    if (!name || !role || !bio) {
      return NextResponse.json(
        { success: false, error: 'Name, role, and bio are required' },
        { status: 400 }
      )
    }

    const faculty = await prisma.facultyMember.create({
      data: {
        name,
        role,
        bio,
        image: image || null,
        linkedinUrl: linkedinUrl || null,
      },
    })

    return NextResponse.json({ success: true, data: faculty }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating faculty:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create faculty member' },
      { status: 500 }
    )
  }
}

