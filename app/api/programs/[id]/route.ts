import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single program
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const program = await prisma.program.findUnique({
      where: { id: params.id },
      include: {
        faculty: true,
        faqs: true,
        testimonials: true,
        certificate: true,
      },
    })

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error fetching program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch program' },
      { status: 500 }
    )
  }
}

// PUT update program
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete existing relations
    await prisma.faculty.deleteMany({
      where: { programId: params.id },
    })
    await prisma.faq.deleteMany({
      where: { programId: params.id },
    })
    await prisma.testimonial.deleteMany({
      where: { programId: params.id },
    })
    await prisma.certificate.deleteMany({
      where: { programId: params.id },
    })

    // Update program with new relations
    const program = await prisma.program.update({
      where: { id: params.id },
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

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { error: 'Failed to update program' },
      { status: 500 }
    )
  }
}

// DELETE program
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Cascade delete will handle related records
    await prisma.program.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { error: 'Failed to delete program' },
      { status: 500 }
    )
  }
}

