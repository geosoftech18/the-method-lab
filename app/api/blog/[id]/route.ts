import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    })

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, excerpt, tags, featuredImage, status } = body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Get existing blog to preserve slug if title hasn't changed
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    })

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Generate new slug if title changed
    let slug = existingBlog.slug
    if (title !== existingBlog.title) {
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 100)

      // Check if new slug already exists (excluding current blog)
      const slugExists = await prisma.blog.findFirst({
        where: {
          slug: newSlug,
          id: { not: params.id },
        },
      })

      slug = slugExists ? `${newSlug}-${Date.now()}` : newSlug
    }

    // Generate excerpt if not provided
    const generatedExcerpt = excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        content,
        excerpt: generatedExcerpt,
        slug,
        tags: tags || [],
        status: status || 'draft',
        featuredImage: featuredImage || null,
      },
    })

    return NextResponse.json({ success: true, data: blog })
  } catch (error: any) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    )
  }
}


