'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Program {
  id: string
  title: string
  description?: string
  duration: string
  startDate?: string
  endDate?: string
  nextCohort?: string
  isSelfPaced?: boolean
  mode: 'live' | 'pre-recorded'
  wing: string
  audience: 'students' | 'professionals' | 'organisations'
  image?: string
  faculty?: Array<{
    name: string
    role: string
    bio: string
    image?: string
  }>
  whoItsFor?: string[]
  learningObjectives?: string[]
  outcomes?: string[]
  brochureUrl?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
  certificate?: {
    title: string
    description: string
    image?: string
  }
  testimonials?: Array<{
    quote: string
    author: string
    role: string
  }>
}

interface Course {
  id: string
  title: string
  tagline?: string
  formatLine?: string
  microTrustLine?: string
  primaryCtaUrl?: string
  secondaryCtaUrl?: string
  overview?: string
  whoItsFor?: string[]
  learningObjectives?: string[]
  learningOutcomes?: string[]
  whatsIncluded?: string
  howItWorks?: string
  certificationDescription?: string
  price?: number
  earlyAccessPrice?: number
  institutionalLicensing?: string
  bulkPurchaseOption?: string
  readyToBeginText?: string
  startImmediatelyText?: string
  enrolNowUrl?: string
  downloadSyllabusUrl?: string
  image?: string
  faculty?: Array<{
    name: string
    role: string
    bio: string
    image?: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
}

interface ProgramContextType {
  programs: Program[]
  courses: Course[]
  loading: boolean
  error: string | null
  refreshPrograms: () => Promise<void>
  refreshCourses: () => Promise<void>
  getProgramById: (id: string) => Program | undefined
  getCourseById: (id: string) => Course | undefined
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined)

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrograms = async () => {
    try {
      setError(null)
      const response = await fetch('/api/programs')
      if (response.ok) {
        const data = await response.json()
        setPrograms(data)
      } else {
        setError('Failed to fetch programs')
      }
    } catch (err) {
      console.error('Error fetching programs:', err)
      setError('Error loading programs')
    }
  }

  const fetchCourses = async () => {
    try {
      setError(null)
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      } else {
        setError('Failed to fetch courses')
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Error loading courses')
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      await Promise.all([fetchPrograms(), fetchCourses()])
      setLoading(false)
    }
    fetchAll()
  }, [])

  const refreshPrograms = async () => {
    await fetchPrograms()
  }

  const refreshCourses = async () => {
    await fetchCourses()
  }

  const getProgramById = (id: string) => {
    return programs.find(p => p.id === id)
  }

  const getCourseById = (id: string) => {
    return courses.find(c => c.id === id)
  }

  return (
    <ProgramContext.Provider
      value={{
        programs,
        courses,
        loading,
        error,
        refreshPrograms,
        refreshCourses,
        getProgramById,
        getCourseById,
      }}
    >
      {children}
    </ProgramContext.Provider>
  )
}

export function usePrograms() {
  const context = useContext(ProgramContext)
  if (context === undefined) {
    throw new Error('usePrograms must be used within a ProgramProvider')
  }
  return context
}


