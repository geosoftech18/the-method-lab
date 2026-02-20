'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import BlogEditor from '@/components/admin/blog-editor'
import { 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Tag,
  Type,
  FileText,
  ArrowLeft,
  Loader
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function BlogCreateContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('id') || null
  const isEditing = !!editId

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && editId) {
      const loadBlog = async () => {
        try {
          const response = await fetch(`/api/blog/${editId}`)
          const result = await response.json()
          
          if (result.success && result.data) {
            const blog = result.data
            setTitle(blog.title)
            setContent(blog.content)
            setTags(blog.tags || [])
            setFeaturedImage(blog.featuredImage)
            setIsPublished(blog.status === 'published')
          }
        } catch (error) {
          console.error('Error loading blog:', error)
          alert('Failed to load blog post')
        } finally {
          setLoading(false)
        }
      }
      loadBlog()
    } else {
      setLoading(false)
    }
  }, [editId, isEditing])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFeaturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your blog post')
      return
    }

    if (!content.trim()) {
      alert('Please enter content for your blog post')
      return
    }

    setIsSubmitting(true)
    
    try {
      const blogData = {
        title,
        content,
        tags,
        featuredImage,
        status: isPublished ? 'published' : 'draft',
      }

      let response
      if (isEditing && editId) {
        response = await fetch(`/api/blog/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        })
      } else {
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        })
      }

      const result = await response.json()

      if (result.success) {
        const message = isPublished 
          ? (isEditing ? 'updated and published' : 'published')
          : (isEditing ? 'updated as draft' : 'saved as draft')
        alert(`Blog post ${message} successfully!`)
        router.push('/admin/blog')
      } else {
        throw new Error(result.error || 'Failed to save blog post')
      }
    } catch (error: any) {
      console.error('Error saving blog:', error)
      alert(error.message || 'Error saving blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/admin/blog"
              className="inline-flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isEditing ? '✏️ Edit Blog Post' : '✨ Create New Blog Post'}
            </h1>
            <p className="text-white/70 text-lg">
              {isEditing ? 'Update your blog post' : 'Share your thoughts about E-Waste Recycling'}
            </p>
          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl">
            <div className="p-6 pb-6">
              <h2 className="text-2xl text-white flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-ablr-secondary" />
                Blog Post Details
              </h2>
            
            <div className="space-y-8">
              {/* Title Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label htmlFor="title" className="block text-white/90 flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4" />
                  Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-ablr-secondary focus:ring-2 focus:ring-ablr-secondary/20 rounded-xl h-12 px-4 outline-none"
                />
              </motion.div>

              {/* Featured Image Upload */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <label className="block text-white/90 flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4" />
                  Featured Image
                </label>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-dashed border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-8 h-8" />
                      <span>Click to upload image</span>
                    </button>
                  </div>
                  
                  {featuredImage && (
                    <div className="flex-1">
                      <div className="relative">
                        <img
                          src={featuredImage}
                          alt="Featured"
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setFeaturedImage(null)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Tags Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-white/90 flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-ablr-secondary/20 text-white border border-ablr-secondary/40 px-3 py-1 rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="p-0 w-4 h-4 hover:bg-red-500/20 rounded flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-ablr-secondary focus:ring-2 focus:ring-ablr-secondary/20 rounded-xl px-4 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-ablr-primary hover:bg-ablr-dark text-white rounded-xl px-4 py-2 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Content Editor */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label className="block text-white/90 mb-2">Blog Content</label>
                <BlogEditor
                  content={content}
                  onChange={(newContent) => setContent(newContent)}
                  placeholder="Start writing your blog post..."
                />
              </motion.div>

              {/* Publish/Draft Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  {isPublished ? (
                    <Eye className="w-5 h-5 text-ablr-secondary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-ablr-terracotta" />
                  )}
                  <div>
                    <label className="block text-white font-medium">
                      {isPublished ? 'Published' : 'Draft'}
                    </label>
                    <p className="text-white/60 text-sm">
                      {isPublished ? 'This post will be visible to everyone' : 'This post will be saved as draft'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ablr-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ablr-primary"></div>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center pt-4"
              >
                <button
                  onClick={handleSubmit}
                  disabled={!title.trim() || isSubmitting}
                  className="inline-flex items-center gap-2 bg-ablr-primary hover:bg-ablr-dark text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      {isPublished ? 'Publishing...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {isPublished ? 'Publish Post' : 'Save as Draft'}
                    </>
                  )}
                </button>
              </motion.div>
            </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm">
            💡 Tip: Use the rich text editor to format your content beautifully. You can insert images, links, videos, and tables!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function BlogCreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    }>
      <BlogCreateContent />
    </Suspense>
  )
}

