'use client'

import CourseForm from '@/components/admin/CourseForm'

export const dynamic = 'force-dynamic'

export default function NewCoursePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          Create New Course
        </h1>
        <p className="text-gray-600">Fill in the details to create a new pre-recorded course</p>
      </div>
      <CourseForm course={null} isEdit={false} />
    </div>
  )
}

