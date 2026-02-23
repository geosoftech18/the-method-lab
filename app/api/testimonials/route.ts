import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { designation: { contains: search, mode: 'insensitive' } },
        { testimonial: { contains: search, mode: 'insensitive' } },
      ]
    }

    const testimonials = await prisma.testimonialMember.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
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

    const testimonialData = await prisma.testimonialMember.create({
      data: {
        name,
        designation,
        testimonial,
        image: image || null,
        rating: ratingValue || 5, // Default to 5 if not provided
      },
    })

    return NextResponse.json({ success: true, data: testimonialData }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}


