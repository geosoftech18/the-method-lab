'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/contexts/AdminContext'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function CoursesList() {
  const { courses, coursesLoading, fetchCourses, invalidateCourses } = useAdmin()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          // Invalidate cache and refresh
          invalidateCourses()
          fetchCourses(true)
        } else {
          alert('Failed to delete course')
        }
      } catch (error) {
        console.error('Error deleting course:', error)
        alert('Failed to delete course')
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
            Courses Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage your pre-recorded courses</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors"
        >
          <Plus size={20} />
          <span>Create New Course</span>
        </Link>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tagline
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coursesLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Loading courses...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No courses found. Create your first course to get started.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.tagline || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {course.price ? `₹${course.price.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
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

