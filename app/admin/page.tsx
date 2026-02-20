'use client'

import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Programs', value: '12', icon: BookOpen, color: 'text-ablr-primary' },
    { label: 'Active Students', value: '245', icon: Users, color: 'text-ablr-dark' },
    { label: 'Certificates Issued', value: '189', icon: Award, color: 'text-ablr-terracotta' },
    { label: 'Growth Rate', value: '+23%', icon: TrendingUp, color: 'text-green-600' },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color.replace('text-', '')}/10`}>
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


