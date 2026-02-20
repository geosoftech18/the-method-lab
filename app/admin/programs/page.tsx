'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/contexts/AdminContext'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ProgramsList() {
  const { programs, programsLoading, fetchPrograms, invalidatePrograms } = useAdmin()

  useEffect(() => {
    fetchPrograms()
  }, [fetchPrograms])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        const response = await fetch(`/api/programs/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          // Invalidate cache and refresh
          invalidatePrograms()
          fetchPrograms(true)
        } else {
          alert('Failed to delete program')
        }
      } catch (error) {
        console.error('Error deleting program:', error)
        alert('Failed to delete program')
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
            Programs Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage your programs</p>
        </div>
        <Link
          href="/admin/programs/new"
          className="flex items-center gap-2 px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors"
        >
          <Plus size={20} />
          <span>Create New Program</span>
        </Link>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Wing
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programsLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading programs...
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No programs found. Create your first program to get started.
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{program.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {program.wing}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {program.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          program.mode === 'live'
                            ? 'bg-ablr-primary text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {program.mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {program.audience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/programs/course/${program.id}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/programs/${program.id}`}
                          className="p-2 text-gray-600 hover:text-ablr-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(program.id)}
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


