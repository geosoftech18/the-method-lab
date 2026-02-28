'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AdminProvider } from '@/contexts/AdminContext'
import { LayoutDashboard, BookOpen, Settings, LogOut, FileText, Users, MessageSquare, Loader } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const hasCheckedRef = useRef(false)

  // Check authentication status (skip check for login page)
  useEffect(() => {
    // Always allow login page to be visible
    if (pathname === '/admin/login') {
      setIsChecking(false)
      setIsAuthenticated(false)
      hasCheckedRef.current = false // Reset so we check after login
      return
    }

    // If we get here, middleware has already verified the session exists
    // So we can assume authenticated - no need to check again
    if (hasCheckedRef.current) {
      return // Already set, skip
    }

    hasCheckedRef.current = true
    
    // Trust middleware - if we're here, we're authenticated
    setIsAuthenticated(true)
    setIsChecking(false)
  }, [pathname]) // Only re-run when pathname changes

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/programs', label: 'Programs', icon: BookOpen },
    { href: '/admin/courses', label: 'Self-Paced', icon: BookOpen },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/faculty', label: 'Faculty', icon: Users },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  
  ]

  const handleLogout = async () => {
    if (isLoggingOut) return
    
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      } else {
        console.error('Logout failed')
        // Still redirect to login even if API call fails
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Error logging out:', error)
      // Still redirect to login even if API call fails
      router.push('/admin/login')
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Always show login page without layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading state while checking authentication (only for non-login pages)
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-ablr-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't show admin layout if not authenticated (middleware will redirect, but this is a safety check)
  // Only return null if we've finished checking and confirmed not authenticated
  if (isChecking === false && isAuthenticated === false) {
    return null
  }

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
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={20} />
              <span className="font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
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


