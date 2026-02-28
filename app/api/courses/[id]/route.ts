import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      include: {
        faculty: true,
        faqs: true,
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      tagline,
      formatLine,
      microTrustLine,
      primaryCtaUrl,
      secondaryCtaUrl,
      overview,
      wing,
      whoItsFor,
      learningObjectives,
      learningOutcomes,
      whatsIncluded,
      howItWorks,
      certificationDescription,
      image,
      faculty,
      faqs,
    } = body

    // Delete existing faculty and FAQs
    await prisma.courseFaculty.deleteMany({
      where: { courseId: params.id },
    })
    await prisma.courseFaq.deleteMany({
      where: { courseId: params.id },
    })

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        title,
        tagline,
        formatLine,
        microTrustLine,
        primaryCtaUrl,
        secondaryCtaUrl,
        overview,
        wing: wing || null,
        whoItsFor: whoItsFor || [],
        learningObjectives: learningObjectives || [],
        learningOutcomes: learningOutcomes || [],
        whatsIncluded,
        howItWorks,
        certificationDescription,
        image,
        faculty: {
          create: (faculty || []).map((f: any) => ({
            name: f.name,
            role: f.role,
            bio: f.bio,
            image: f.image,
          })),
        },
        faqs: {
          create: (faqs || []).map((f: any) => ({
            question: f.question,
            answer: f.answer,
          })),
        },
      },
      include: {
        faculty: true,
        faqs: true,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}

