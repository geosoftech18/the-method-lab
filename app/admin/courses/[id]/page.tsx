'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import CourseForm from '@/components/admin/CourseForm'

export const dynamic = 'force-dynamic'

interface CourseData {
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
  image?: string
}

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/courses/${courseId}`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data)
      } else {
        console.error('Failed to fetch course')
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading course...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Course not found</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          Edit Course
        </h1>
        <p className="text-gray-600">Update the course details</p>
      </div>
      <CourseForm course={course} isEdit={true} />
    </div>
  )
}

