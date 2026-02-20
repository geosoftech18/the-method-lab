'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AdminProvider } from '@/contexts/AdminContext'
import { LayoutDashboard, BookOpen, Settings, LogOut, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/programs', label: 'Programs', icon: BookOpen },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-serif font-bold text-ablr-primary mb-8">
              Admin Panel
            </h1>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ablr-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          {children}
        </main>
      </div>
    </AdminProvider>
  )
}


