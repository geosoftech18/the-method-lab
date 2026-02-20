import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ]
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: blogs })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, tags, featuredImage, status } = body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 100)

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    })

    let finalSlug = slug
    if (existingBlog) {
      finalSlug = `${slug}-${Date.now()}`
    }

    // Generate excerpt if not provided
    const generatedExcerpt = excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        excerpt: generatedExcerpt,
        slug: finalSlug,
        tags: tags || [],
        status: status || 'draft',
        featuredImage: featuredImage || null,
      },
    })

    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    )
  }
}


