import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const testimonial = await prisma.testimonialMember.findUnique({
      where: { id },
    })

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonial' },
      { status: 500 }
    )
  }
}

// PUT update testimonial
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, designation, image, testimonial, rating } = body

    if (!name || !designation || !testimonial) {
      return NextResponse.json(
        { success: false, error: 'Name, designation, and testimonial are required' },
        { status: 400 }
      )
    }

    // Validate rating (1-5)
    const ratingValue = rating ? parseInt(rating) : null
    if (ratingValue !== null && (ratingValue < 1 || ratingValue > 5)) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const existingTestimonial = await prisma.testimonialMember.findUnique({
      where: { id },
    })

    if (!existingTestimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    const testimonialData = await prisma.testimonialMember.update({
      where: { id },
      data: {
        name,
        designation,
        testimonial,
        image: image || null,
        rating: ratingValue || existingTestimonial.rating,
      },
    })

    return NextResponse.json({ success: true, data: testimonialData })
  } catch (error: any) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

// DELETE testimonial
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.testimonialMember.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}


