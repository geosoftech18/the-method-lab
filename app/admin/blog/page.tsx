'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/contexts/AdminContext'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  FileText,
  Calendar,
  Tag,
  Search,
  Settings,
  ArrowLeft,
  LogOut
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
  updatedAt?: string
}

export default function BlogAdminPage() {
  const router = useRouter()
  const { blogs, blogsLoading, fetchBlogs, invalidateBlogs } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')

  // Load blogs from API with caching
  useEffect(() => {
    fetchBlogs(false, { 
      status: filterStatus === 'all' ? undefined : filterStatus,
      search: searchQuery || undefined
    })
  }, [filterStatus, searchQuery, fetchBlogs])

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.success) {
          // Invalidate cache and refresh
          invalidateBlogs()
          fetchBlogs(true, { 
            status: filterStatus === 'all' ? undefined : filterStatus,
            search: searchQuery || undefined
          })
          alert('Blog post deleted successfully!')
        } else {
          alert('Failed to delete blog post: ' + result.error)
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
        alert('Error deleting blog post')
      }
    }
  }

  // Handle status toggle
  const handleToggleStatus = async (id: string) => {
    try {
      const blog = blogs.find(b => b.id === id)
      if (!blog) return

      const newStatus = blog.status === 'published' ? 'draft' : 'published'
      
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          status: newStatus,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Invalidate cache and refresh
        invalidateBlogs()
        fetchBlogs(true, { 
          status: filterStatus === 'all' ? undefined : filterStatus,
          search: searchQuery || undefined
        })
      } else {
        alert('Failed to update blog status: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating blog status:', error)
      alert('Error updating blog status')
    }
  }

  // Filter blogs (client-side filtering for instant feedback, but API handles main filtering)
  const filteredBlogs = blogs


  if (blogsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8 md:w-10 md:h-10" />
                Blog Management
              </h1>
              <p className="text-white/70 text-lg">
                Manage all your blog posts - create, edit, and delete
              </p>
            </div>
            <button 
              onClick={() => router.push('/admin/blog/create')}
              className="inline-flex items-center gap-2 bg-ablr-primary hover:bg-ablr-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl pl-10 h-12 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all' 
                    ? 'bg-ablr-primary hover:bg-ablr-dark text-white' 
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                All ({blogs.length})
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'published' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                Published ({blogs.filter(b => b.status === 'published').length})
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'draft' 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                Drafts ({blogs.filter(b => b.status === 'draft').length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl text-white/70 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'No blogs found' : 'No blog posts yet'}
            </h3>
            <p className="text-white/50 mb-6">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first blog post to get started!'
              }
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <button 
                onClick={() => router.push('/admin/blog/create')}
                className="inline-flex items-center gap-2 bg-ablr-primary hover:bg-ablr-dark text-white px-6 py-3 rounded-xl"
              >
                <Plus className="w-5 h-5" />
                Create Your First Post
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Featured Image */}
                      {blog.featuredImage && (
                        <div className="md:w-48 flex-shrink-0">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-32 md:h-full object-cover rounded-xl"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white line-clamp-2">
                                {blog.title}
                              </h3>
                              <span 
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                  blog.status === 'published' 
                                    ? 'bg-ablr-secondary/30 text-white border border-ablr-secondary/50' 
                                    : 'bg-ablr-terracotta/30 text-white border border-ablr-terracotta/50'
                                }`}
                              >
                                {blog.status === 'published' ? (
                                  <><Eye className="w-3 h-3" /> Published</>
                                ) : (
                                  <><EyeOff className="w-3 h-3" /> Draft</>
                                )}
                              </span>
                            </div>
                            <p className="text-white/70 text-sm line-clamp-2 mb-3">
                              {blog.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {blog.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-ablr-secondary/20 text-white border border-ablr-secondary/40 rounded text-xs"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Date */}
                            <div className="flex items-center text-white/50 text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              Created: {new Date(blog.createdAt).toLocaleDateString()}
                              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                <>
                                  <span className="mx-2">•</span>
                                  Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                          <Link 
                            href={`/admin/blog/create?id=${blog.id}`}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-400/30 text-blue-200 hover:bg-blue-500/20 hover:text-blue-100 rounded-lg text-sm transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(blog.id)}
                            className={`inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${
                              blog.status === 'published'
                                ? 'bg-ablr-terracotta/20 border-ablr-terracotta/40 text-white hover:bg-ablr-terracotta/30'
                                : 'bg-ablr-secondary/20 border-ablr-secondary/40 text-white hover:bg-ablr-secondary/30'
                            }`}
                          >
                            {blog.status === 'published' ? (
                              <>
                                <EyeOff className="w-4 h-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4" />
                                Publish
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-400/30 text-red-200 hover:bg-red-500/20 hover:text-red-100 rounded-lg text-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                          <Link 
                            href={`/blog/${blog.slug}`}
                            className="inline-flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{blogs.length}</div>
              <div className="text-white/70 text-sm">Total Posts</div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-ablr-secondary mb-1">
                {blogs.filter(b => b.status === 'published').length}
              </div>
              <div className="text-white/70 text-sm">Published</div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-ablr-terracotta mb-1">
                {blogs.filter(b => b.status === 'draft').length}
              </div>
              <div className="text-white/70 text-sm">Drafts</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

