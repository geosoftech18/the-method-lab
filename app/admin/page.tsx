'use client'

import { BookOpen, FileText, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

interface Stats {
  programs: number
  courses: number
  blogs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ programs: 0, courses: 0, blogs: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', {
          credentials: 'include',
          cache: 'no-store',
        })
        const result = await response.json()
        
        if (result.success) {
          setStats(result.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statsCards = [
    { 
      label: 'Total Programs', 
      value: loading ? '...' : stats.programs.toString(), 
      icon: BookOpen, 
      color: 'text-ablr-primary',
      bgColor: 'bg-ablr-primary/10'
    },
    { 
      label: 'Total Courses', 
      value: loading ? '...' : stats.courses.toString(), 
      icon: GraduationCap, 
      color: 'text-ablr-dark',
      bgColor: 'bg-ablr-dark/10'
    },
    { 
      label: 'Total Blogs', 
      value: loading ? '...' : stats.blogs.toString(), 
      icon: FileText, 
      color: 'text-ablr-terracotta',
      bgColor: 'bg-ablr-terracotta/10'
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your programs.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/programs/new"
            className="px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors"
          >
            Create New Program
          </Link>
          <Link
            href="/admin/programs"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Manage Programs
          </Link>
        </div>
      </div>
    </div>
  )
}


