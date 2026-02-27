'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Save, Loader, User, Briefcase, FileText, Image as ImageIcon, Star } from 'lucide-react'

function TestimonialFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('id') || null
  const isEditing = !!editId

  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [testimonial, setTestimonial] = useState('')
  const [rating, setRating] = useState(5)
  const [image, setImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && editId) {
      const loadTestimonial = async () => {
        try {
          const response = await fetch(`/api/testimonials/${editId}`, {
            credentials: 'include',
          })
          const result = await response.json()
          
          if (result.success && result.data) {
            const testimonialData = result.data
            setName(testimonialData.name || '')
            setDesignation(testimonialData.designation || '')
            setTestimonial(testimonialData.testimonial || '')
            setRating(typeof testimonialData.rating === 'number' ? testimonialData.rating : parseInt(testimonialData.rating) || 5)
            setImage(testimonialData.image || null)
          } else {
            alert('Failed to load testimonial')
            router.push('/admin/testimonials')
          }
        } catch (error) {
          console.error('Error loading testimonial:', error)
          alert('Failed to load testimonial')
          router.push('/admin/testimonials')
        } finally {
          setLoading(false)
        }
      }
      loadTestimonial()
    } else {
      setLoading(false)
    }
  }, [editId, isEditing, router])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a name for the testimonial')
      return
    }

    if (!designation.trim()) {
      alert('Please enter a designation for the testimonial')
      return
    }

    if (!testimonial.trim()) {
      alert('Please enter the testimonial content')
      return
    }

    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5')
      return
    }

    setIsSubmitting(true)
    
    try {
      const testimonialData = {
        name: name.trim(),
        designation: designation.trim(),
        testimonial: testimonial.trim(),
        rating: typeof rating === 'number' ? rating : parseInt(rating) || 5,
        image: image || null,
      }

      let response
      if (isEditing && editId) {
        response = await fetch(`/api/testimonials/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(testimonialData),
        })
      } else {
        response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(testimonialData),
        })
      }

      const result = await response.json()

      if (result.success) {
        alert(`Testimonial ${isEditing ? 'updated' : 'created'} successfully!`)
        router.push('/admin/testimonials')
      } else {
        throw new Error(result.error || 'Failed to save testimonial')
      }
    } catch (error: any) {
      console.error('Error saving testimonial:', error)
      alert(error.message || 'Error saving testimonial. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (value: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`transition-colors ${
          i < value
            ? 'text-yellow-400 hover:text-yellow-500'
            : 'text-gray-300 hover:text-gray-400'
        }`}
      >
        <Star size={32} className={i < value ? 'fill-current' : ''} />
      </button>
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ablr-primary/30 border-t-ablr-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading testimonial...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-ablr-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Testimonials</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Update testimonial information' : 'Create a new testimonial'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="space-y-6 max-w-3xl">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User size={16} />
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter person's name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Briefcase size={16} />
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              id="designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter person's designation/role"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} />
              Profile Image
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
                  className="w-full h-32 border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-gray-600">Click to upload image</span>
                </button>
              </div>
              
              {image && (
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Star size={16} />
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {renderStars(rating)}
              <span className="ml-4 text-sm text-gray-600">({rating}/5)</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Click on the stars to set the rating</p>
          </div>

          {/* Testimonial */}
          <div>
            <label htmlFor="testimonial" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} />
              Testimonial <span className="text-red-500">*</span>
            </label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder="Enter the testimonial content"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/testimonials"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !designation.trim() || !testimonial.trim() || isSubmitting}
              className="px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialFormPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ablr-primary/30 border-t-ablr-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TestimonialFormContent />
    </Suspense>
  )
}

