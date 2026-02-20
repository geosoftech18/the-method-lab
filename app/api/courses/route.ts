import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        faculty: true,
        faqs: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const course = await prisma.course.create({
      data: {
        title,
        tagline,
        formatLine,
        microTrustLine,
        primaryCtaUrl,
        secondaryCtaUrl,
        overview,
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

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

