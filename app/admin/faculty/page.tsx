'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/contexts/AdminContext'
import { Plus, Edit, Trash2, Search, Users, Linkedin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function FacultyList() {
  const { faculty, facultyLoading, fetchFaculty, invalidateFaculty } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchFaculty(false, { search: searchQuery || undefined })
  }, [searchQuery, fetchFaculty])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      try {
        const response = await fetch(`/api/faculty/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.success) {
          invalidateFaculty()
          fetchFaculty(true, { search: searchQuery || undefined })
          alert('Faculty member deleted successfully!')
        } else {
          alert('Failed to delete faculty member: ' + result.error)
        }
      } catch (error) {
        console.error('Error deleting faculty:', error)
        alert('Error deleting faculty member')
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
            Faculty Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage faculty members</p>
        </div>
        <Link
          href="/admin/faculty/new"
          className="flex items-center gap-2 px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors"
        >
          <Plus size={20} />
          <span>Add New Faculty</span>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search faculty by name, role, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-ablr-primary focus:ring-2 focus:ring-ablr-primary/20 outline-none"
          />
        </div>
      </div>

      {/* Faculty Table */}
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
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Bio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  LinkedIn
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {facultyLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading faculty members...
                  </td>
                </tr>
              ) : faculty.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>No faculty members found.</p>
                    <p className="text-sm mt-2">
                      {searchQuery ? 'Try adjusting your search criteria' : 'Create your first faculty member to get started.'}
                    </p>
                  </td>
                </tr>
              ) : (
                faculty.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-ablr-primary/10 flex items-center justify-center">
                          <Users className="w-8 h-8 text-ablr-primary" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      <p className="line-clamp-2">{member.bio}</p>
                    </td>
                    <td className="px-6 py-4">
                      {member.linkedinUrl ? (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-ablr-primary hover:text-ablr-dark transition-colors"
                        >
                          <Linkedin size={18} />
                          <span className="text-sm">View Profile</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/faculty/new?id=${member.id}`}
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
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

