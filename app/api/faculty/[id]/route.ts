import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single faculty member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const faculty = await prisma.facultyMember.findUnique({
      where: { id },
    })

    if (!faculty) {
      return NextResponse.json(
        { success: false, error: 'Faculty member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: faculty })
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch faculty member' },
      { status: 500 }
    )
  }
}

// PUT update faculty member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, role, bio, image, linkedinUrl } = body

    if (!name || !role || !bio) {
      return NextResponse.json(
        { success: false, error: 'Name, role, and bio are required' },
        { status: 400 }
      )
    }

    const existingFaculty = await prisma.facultyMember.findUnique({
      where: { id },
    })

    if (!existingFaculty) {
      return NextResponse.json(
        { success: false, error: 'Faculty member not found' },
        { status: 404 }
      )
    }

    const faculty = await prisma.facultyMember.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        image: image || null,
        linkedinUrl: linkedinUrl || null,
      },
    })

    return NextResponse.json({ success: true, data: faculty })
  } catch (error: any) {
    console.error('Error updating faculty:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update faculty member' },
      { status: 500 }
    )
  }
}

// DELETE faculty member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.facultyMember.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Faculty member deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting faculty:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete faculty member' },
      { status: 500 }
    )
  }
}

