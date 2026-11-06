'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react'

interface Program {
  id: string
  title: string
  duration: string
  mode: 'live' | 'pre-recorded'
  wing: string
  audience: string
  nextCohort?: string
  [key: string]: any
}

interface Course {
  id: string
  title: string
  tagline?: string
  price?: number
  createdAt: string
  [key: string]: any
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
  updatedAt?: string
}

interface FacultyMember {
  id: string
  name: string
  role: string
  bio: string
  image: string | null
  linkedinUrl?: string | null
  createdAt: string
  updatedAt?: string
}

interface TestimonialMember {
  id: string
  name: string
  designation: string
  image: string | null
  testimonial: string
  rating: number
  createdAt: string
  updatedAt?: string
}

interface AdminContextType {
  // Programs
  programs: Program[]
  programsLoading: boolean
  fetchPrograms: (force?: boolean) => Promise<void>
  invalidatePrograms: () => void
  
  // Courses
  courses: Course[]
  coursesLoading: boolean
  fetchCourses: (force?: boolean) => Promise<void>
  invalidateCourses: () => void
  
  // Blogs
  blogs: BlogPost[]
  blogsLoading: boolean
  fetchBlogs: (force?: boolean, filters?: { status?: string; search?: string }) => Promise<void>
  invalidateBlogs: () => void
  
  // Faculty
  faculty: FacultyMember[]
  facultyLoading: boolean
  fetchFaculty: (force?: boolean, filters?: { search?: string }) => Promise<void>
  invalidateFaculty: () => void
  
  // Testimonials
  testimonials: TestimonialMember[]
  testimonialsLoading: boolean
  fetchTestimonials: (force?: boolean, filters?: { search?: string }) => Promise<void>
  invalidateTestimonials: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function AdminProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [programsLoading, setProgramsLoading] = useState(false)
  
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState(false)
  
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [blogsLoading, setBlogsLoading] = useState(false)
  
  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [facultyLoading, setFacultyLoading] = useState(false)
  
  const [testimonials, setTestimonials] = useState<TestimonialMember[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(false)

  // Cache in refs so fetch callbacks stay stable and empty results still count as cached
  const programsCacheRef = useRef<number | null>(null)
  const coursesCacheRef = useRef<number | null>(null)
  const blogsCacheRef = useRef<{ time: number | null; filtersKey: string }>({
    time: null,
    filtersKey: '',
  })
  const facultyCacheRef = useRef<{ time: number | null; filtersKey: string }>({
    time: null,
    filtersKey: '',
  })
  const testimonialsCacheRef = useRef<{ time: number | null; filtersKey: string }>({
    time: null,
    filtersKey: '',
  })

  const isCacheValid = (cacheTime: number | null): boolean => {
    if (!cacheTime) return false
    return Date.now() - cacheTime < CACHE_DURATION
  }

  // Fetch Programs
  const fetchPrograms = useCallback(async (force = false) => {
    if (!force && isCacheValid(programsCacheRef.current)) {
      return
    }

    setProgramsLoading(true)
    try {
      const response = await fetch('/api/programs')
      if (response.ok) {
        const data = await response.json()
        setPrograms(Array.isArray(data) ? data : [])
        programsCacheRef.current = Date.now()
      } else {
        console.error('Failed to fetch programs')
        setPrograms([])
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      setPrograms([])
    } finally {
      setProgramsLoading(false)
    }
  }, [])

  // Fetch Courses
  const fetchCourses = useCallback(async (force = false) => {
    if (!force && isCacheValid(coursesCacheRef.current)) {
      return
    }

    setCoursesLoading(true)
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(Array.isArray(data) ? data : [])
        coursesCacheRef.current = Date.now()
      } else {
        console.error('Failed to fetch courses')
        setCourses([])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      setCourses([])
    } finally {
      setCoursesLoading(false)
    }
  }, [])

  // Fetch Blogs
  const fetchBlogs = useCallback(async (force = false, filters: { status?: string; search?: string } = {}) => {
    const filtersKey = JSON.stringify({
      status: filters.status || undefined,
      search: filters.search || undefined,
    })

    if (
      !force &&
      isCacheValid(blogsCacheRef.current.time) &&
      blogsCacheRef.current.filtersKey === filtersKey
    ) {
      return
    }

    setBlogsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status)
      }
      if (filters.search) {
        params.append('search', filters.search)
      }

      const response = await fetch(`/api/blog?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        const transformedBlogs = (result.data || []).map((blog: any) => ({
          ...blog,
          id: blog.id,
          _id: blog.id,
        }))
        setBlogs(transformedBlogs)
        blogsCacheRef.current = { time: Date.now(), filtersKey }
      } else {
        console.error('Error loading blogs:', result.error)
        setBlogs([])
        blogsCacheRef.current = { time: Date.now(), filtersKey }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs([])
      blogsCacheRef.current = { time: Date.now(), filtersKey }
    } finally {
      setBlogsLoading(false)
    }
  }, [])

  // Fetch Faculty
  const fetchFaculty = useCallback(async (force = false, filters: { search?: string } = {}) => {
    const filtersKey = JSON.stringify({
      search: filters.search || undefined,
    })

    if (
      !force &&
      isCacheValid(facultyCacheRef.current.time) &&
      facultyCacheRef.current.filtersKey === filtersKey
    ) {
      return
    }

    setFacultyLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) {
        params.append('search', filters.search)
      }

      const url = params.toString() ? `/api/faculty?${params.toString()}` : '/api/faculty'
      const response = await fetch(url, {
        credentials: 'include',
        cache: 'no-store',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()

      if (result.success) {
        setFaculty(result.data || [])
        facultyCacheRef.current = { time: Date.now(), filtersKey }
      } else {
        console.error('Error loading faculty:', result.error)
        setFaculty([])
        facultyCacheRef.current = { time: Date.now(), filtersKey }
      }
    } catch (error: any) {
      console.error('Error fetching faculty:', error)
      setFaculty([])
      facultyCacheRef.current = { time: Date.now(), filtersKey }
    } finally {
      setFacultyLoading(false)
    }
  }, [])

  // Fetch Testimonials
  const fetchTestimonials = useCallback(async (force = false, filters: { search?: string } = {}) => {
    const filtersKey = JSON.stringify({
      search: filters.search || undefined,
    })

    if (
      !force &&
      isCacheValid(testimonialsCacheRef.current.time) &&
      testimonialsCacheRef.current.filtersKey === filtersKey
    ) {
      return
    }

    setTestimonialsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) {
        params.append('search', filters.search)
      }

      const url = params.toString() ? `/api/testimonials?${params.toString()}` : '/api/testimonials'
      const response = await fetch(url, {
        credentials: 'include',
        cache: 'no-store',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()

      if (result.success) {
        setTestimonials(result.data || [])
        testimonialsCacheRef.current = { time: Date.now(), filtersKey }
      } else {
        console.error('Error loading testimonials:', result.error)
        setTestimonials([])
        testimonialsCacheRef.current = { time: Date.now(), filtersKey }
      }
    } catch (error: any) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([])
      testimonialsCacheRef.current = { time: Date.now(), filtersKey }
    } finally {
      setTestimonialsLoading(false)
    }
  }, [])

  // Invalidate caches
  const invalidatePrograms = useCallback(() => {
    programsCacheRef.current = null
  }, [])

  const invalidateCourses = useCallback(() => {
    coursesCacheRef.current = null
  }, [])

  const invalidateBlogs = useCallback(() => {
    blogsCacheRef.current = { time: null, filtersKey: '' }
  }, [])

  const invalidateFaculty = useCallback(() => {
    facultyCacheRef.current = { time: null, filtersKey: '' }
  }, [])

  const invalidateTestimonials = useCallback(() => {
    testimonialsCacheRef.current = { time: null, filtersKey: '' }
  }, [])

  // Pre-fetch data on mount
  useEffect(() => {
    fetchPrograms()
    fetchCourses()
    fetchBlogs()
    fetchFaculty()
    fetchTestimonials()
  }, [fetchPrograms, fetchCourses, fetchBlogs, fetchFaculty, fetchTestimonials])

  return (
    <AdminContext.Provider
      value={{
        programs,
        programsLoading,
        fetchPrograms,
        invalidatePrograms,
        courses,
        coursesLoading,
        fetchCourses,
        invalidateCourses,
        blogs,
        blogsLoading,
        fetchBlogs,
        invalidateBlogs,
        faculty,
        facultyLoading,
        fetchFaculty,
        invalidateFaculty,
        testimonials,
        testimonialsLoading,
        fetchTestimonials,
        invalidateTestimonials,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
