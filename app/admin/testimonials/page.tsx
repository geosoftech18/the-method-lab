'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/contexts/AdminContext'
import { Plus, Edit, Trash2, Search, MessageSquare, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function TestimonialsList() {
  const { testimonials = [], testimonialsLoading, fetchTestimonials, invalidateTestimonials } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')

  // Initial load
  useEffect(() => {
    fetchTestimonials(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Search filter
  useEffect(() => {
    if (searchQuery !== undefined) {
      fetchTestimonials(false, { search: searchQuery || undefined })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.success) {
          invalidateTestimonials()
          fetchTestimonials(true, { search: searchQuery || undefined })
          alert('Testimonial deleted successfully!')
        } else {
          alert('Failed to delete testimonial: ' + result.error)
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error)
        alert('Error deleting testimonial')
      }
    }
  }

  const renderStars = (rating: number) => {
    const ratingValue = typeof rating === 'number' ? rating : parseInt(rating) || 5
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < ratingValue ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
            Testimonials Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors"
        >
          <Plus size={20} />
          <span>Add New Testimonial</span>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search testimonials by name, designation, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-ablr-primary focus:ring-2 focus:ring-ablr-primary/20 outline-none"
          />
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Testimonial
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testimonialsLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading testimonials...
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>No testimonials found.</p>
                    <p className="text-sm mt-2">
                      {searchQuery ? 'Try adjusting your search criteria' : 'Create your first testimonial to get started.'}
                    </p>
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-ablr-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-8 h-8 text-ablr-primary" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {testimonial.designation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      <p className="line-clamp-2">{testimonial.testimonial}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating || 5)}
                        <span className="ml-2 text-sm text-gray-600">({testimonial.rating || 5}/5)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/testimonials/new?id=${testimonial.id}`}
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

