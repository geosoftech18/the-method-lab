import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all programs
export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        faculty: true,
        faqs: true,
        testimonials: true,
        certificate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(programs)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

// POST create new program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      duration,
      startDate,
      endDate,
      nextCohort,
      isSelfPaced,
      mode,
      wing,
      audience,
      brochureUrl,
      description,
      image,
      whoItsFor,
      learningObjectives,
      outcomes,
      faculty,
      faqs,
      testimonials,
      certificate,
    } = body

    // Create program with nested relations
    const program = await prisma.program.create({
      data: {
        title,
        duration,
        startDate,
        endDate,
        nextCohort,
        isSelfPaced: isSelfPaced || false,
        mode,
        wing,
        audience,
        brochureUrl,
        description,
        image,
        whoItsFor: whoItsFor || [],
        learningObjectives: learningObjectives || [],
        outcomes: outcomes || [],
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
        testimonials: {
          create: (testimonials || []).map((t: any) => ({
            quote: t.quote,
            author: t.author,
            role: t.role,
          })),
        },
        certificate: certificate
          ? {
              create: {
                title: certificate.title || 'Certificate of Completion',
                description: certificate.description || '',
                image: certificate.image,
              },
            }
          : undefined,
      },
      include: {
        faculty: true,
        faqs: true,
        testimonials: true,
        certificate: true,
      },
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}

