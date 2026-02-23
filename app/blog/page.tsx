'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import { 
  FileText, 
  Calendar, 
  Tag,
  ArrowRight
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blog?status=published')
        const result = await response.json()

        if (result.success) {
          setPosts(result.data)
        } else {
          console.error('Error loading blogs:', result.error)
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-ablr-primary/10 via-white to-ablr-primary/10 p-4 md:p-8">
    <Header />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-ablr-primary mb-4">
             Blog Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing content about The Method Lab
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-ablr-primary/20 border-t-ablr-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer h-full flex flex-col">
                {/* Featured Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-ablr-primary/10 to-ablr-primary/20 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-ablr-primary" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-ablr-secondary/70 text-white border border-ablr-secondary/30' 
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 pb-3">
                  <h3 className="text-gray-800 text-lg font-semibold line-clamp-2 group-hover:text-ablr-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                </div>

                <div className="p-4 pt-0 space-y-4 flex-1 flex flex-col">
                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-ablr-secondary/70 text-white border border-ablr-secondary/30 text-xs px-2 py-1 rounded-full flex items-center"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date and Read More */}
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <button
                        className="text-ablr-primary hover:text-ablr-dark hover:bg-ablr-secondary/10 p-1 h-auto rounded transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        )}

        {/* Empty State (if no posts) */}
        {!loading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-600 mb-2">No blog posts yet</h3>
            <p className="text-gray-500">Check back soon for new content about E-Waste Recycling!</p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  )
}

