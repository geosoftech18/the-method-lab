'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

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

export function AdminProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [programsLoading, setProgramsLoading] = useState(false)
  const [programsCacheTime, setProgramsCacheTime] = useState<number | null>(null)
  
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState(false)
  const [coursesCacheTime, setCoursesCacheTime] = useState<number | null>(null)
  
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [blogsLoading, setBlogsLoading] = useState(false)
  const [blogsCacheTime, setBlogsCacheTime] = useState<number | null>(null)
  const [blogsFilters, setBlogsFilters] = useState<{ status?: string; search?: string }>({})
  
  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [facultyLoading, setFacultyLoading] = useState(false)
  const [facultyCacheTime, setFacultyCacheTime] = useState<number | null>(null)
  const [facultyFilters, setFacultyFilters] = useState<{ search?: string }>({})
  
  const [testimonials, setTestimonials] = useState<TestimonialMember[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(false)
  const [testimonialsCacheTime, setTestimonialsCacheTime] = useState<number | null>(null)
  const [testimonialsFilters, setTestimonialsFilters] = useState<{ search?: string }>({})

  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Check if cache is still valid
  const isCacheValid = (cacheTime: number | null): boolean => {
    if (!cacheTime) return false
    return Date.now() - cacheTime < CACHE_DURATION
  }

  // Fetch Programs
  const fetchPrograms = useCallback(async (force = false) => {
    // Use cache if valid and not forcing refresh
    if (!force && isCacheValid(programsCacheTime) && programs.length > 0) {
      return
    }

    setProgramsLoading(true)
    try {
      const response = await fetch('/api/programs')
      if (response.ok) {
        const data = await response.json()
        setPrograms(data)
        setProgramsCacheTime(Date.now())
      } else {
        console.error('Failed to fetch programs')
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setProgramsLoading(false)
    }
  }, [programsCacheTime, programs.length])

  // Fetch Courses
  const fetchCourses = useCallback(async (force = false) => {
    // Use cache if valid and not forcing refresh
    if (!force && isCacheValid(coursesCacheTime) && courses.length > 0) {
      return
    }

    setCoursesLoading(true)
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
        setCoursesCacheTime(Date.now())
      } else {
        console.error('Failed to fetch courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setCoursesLoading(false)
    }
  }, [coursesCacheTime, courses.length])

  // Fetch Blogs
  const fetchBlogs = useCallback(async (force = false, filters = {}) => {
    const filtersKey = JSON.stringify(filters)
    const currentFiltersKey = JSON.stringify(blogsFilters)
    
    // Use cache if valid, not forcing refresh, and filters haven't changed
    if (!force && isCacheValid(blogsCacheTime) && blogs.length > 0 && filtersKey === currentFiltersKey) {
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
        const transformedBlogs = result.data.map((blog: any) => ({
          ...blog,
          id: blog.id,
          _id: blog.id,
        }))
        setBlogs(transformedBlogs)
        setBlogsCacheTime(Date.now())
        setBlogsFilters(filters)
      } else {
        console.error('Error loading blogs:', result.error)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setBlogsLoading(false)
    }
  }, [blogsCacheTime, blogs.length, blogsFilters])

  // Fetch Faculty
  const fetchFaculty = useCallback(async (force = false, filters = {}) => {
    const filtersKey = JSON.stringify(filters)
    const currentFiltersKey = JSON.stringify(facultyFilters)
    
    // Use cache if valid, not forcing refresh, and filters haven't changed
    if (!force && isCacheValid(facultyCacheTime) && faculty.length > 0 && filtersKey === currentFiltersKey) {
      return
    }

    setFacultyLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) {
        params.append('search', filters.search)
      }

      const response = await fetch(`/api/faculty?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setFaculty(result.data)
        setFacultyCacheTime(Date.now())
        setFacultyFilters(filters)
      } else {
        console.error('Error loading faculty:', result.error)
      }
    } catch (error) {
      console.error('Error fetching faculty:', error)
    } finally {
      setFacultyLoading(false)
    }
  }, [facultyCacheTime, faculty.length, facultyFilters])

  // Invalidate caches
  const invalidatePrograms = useCallback(() => {
    setProgramsCacheTime(null)
  }, [])

  const invalidateCourses = useCallback(() => {
    setCoursesCacheTime(null)
  }, [])

  const invalidateBlogs = useCallback(() => {
    setBlogsCacheTime(null)
  }, [])

  const invalidateFaculty = useCallback(() => {
    setFacultyCacheTime(null)
  }, [])

  // Fetch Testimonials
  const fetchTestimonials = useCallback(async (force = false, filters = {}) => {
    const filtersKey = JSON.stringify(filters)
    const currentFiltersKey = JSON.stringify(testimonialsFilters)
    
    // Use cache if valid, not forcing refresh, and filters haven't changed
    if (!force && isCacheValid(testimonialsCacheTime) && testimonials.length > 0 && filtersKey === currentFiltersKey) {
      setTestimonialsLoading(false)
      return
    }

    setTestimonialsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) {
        params.append('search', filters.search)
      }

      const url = params.toString() ? `/api/testimonials?${params.toString()}` : '/api/testimonials'
      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        setTestimonials(result.data || [])
        setTestimonialsCacheTime(Date.now())
        setTestimonialsFilters(filters)
      } else {
        console.error('Error loading testimonials:', result.error)
        setTestimonials([])
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([])
    } finally {
      setTestimonialsLoading(false)
    }
  }, [testimonialsCacheTime, testimonials.length, testimonialsFilters])

  const invalidateTestimonials = useCallback(() => {
    setTestimonialsCacheTime(null)
  }, [])

  // Pre-fetch data on mount
  useEffect(() => {
    fetchPrograms()
    fetchCourses()
    fetchBlogs()
    fetchFaculty()
    fetchTestimonials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

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

