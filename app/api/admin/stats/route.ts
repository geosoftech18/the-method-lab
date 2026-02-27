import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get counts in parallel for better performance
    const [programsCount, coursesCount, blogsCount] = await Promise.all([
      prisma.program.count(),
      prisma.course.count(),
      prisma.blog.count(),
    ])

    return NextResponse.json({
      success: true,
      data: {
        programs: programsCount,
        courses: coursesCount,
        blogs: blogsCount,
      },
    })
  } catch (error: any) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch stats',
      },
      { status: 500 }
    )
  }
}

