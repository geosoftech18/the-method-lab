'use client'

import { useMemo, useState } from 'react'
import CourseCard from '../programs/CourseCard'
import ScrollAnimation from '../ScrollAnimation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePrograms } from '@/contexts/ProgramContext'

export default function AllCourses() {
  const { courses: dbCourses, loading } = usePrograms()
  const [filters, setFilters] = useState({
    mode: [] as string[]
  })

  // Transform courses to match CourseCard interface
  const courses = useMemo(() => {
    return dbCourses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.overview,
      duration: course.formatLine || 'Self-paced',
      nextCohort: undefined,
      startDate: undefined,
      endDate: undefined,
      isSelfPaced: true,
      mode: 'pre-recorded' as const,
      wing: '',
      audience: 'professionals' as const,
      image: course.image,
      isCourse: true,
    }))
  }, [dbCourses])

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const modeMatch = filters.mode.length === 0 || filters.mode.includes(course.mode)
      return modeMatch
    })
  }, [filters, courses])

  return (
    <div>
      <div className="mb-8">
        <ScrollAnimation direction="up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-ablr-primary">
            All Courses
          </h2>
          <p className="text-gray-600 text-lg">
            Browse our collection of professional training courses and pre-recorded learning programs
          </p>
        </ScrollAnimation>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <ScrollAnimation direction="up">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  mode: prev.mode.includes('pre-recorded')
                    ? prev.mode.filter(m => m !== 'pre-recorded')
                    : [...prev.mode, 'pre-recorded']
                }))
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filters.mode.includes('pre-recorded')
                  ? 'bg-ablr-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pre-recorded
            </button>
            {/* <button
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  mode: prev.mode.includes('live')
                    ? prev.mode.filter(m => m !== 'live')
                    : [...prev.mode, 'live']
                }))
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filters.mode.includes('live')
                  ? 'bg-ablr-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Live
            </button> */}
            {(filters.mode.length > 0) && (
              <button
                onClick={() => setFilters({ mode: [] })}
                className="px-6 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </ScrollAnimation>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-ablr-primary">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {filteredCourses.map((course, index) => (
              <div key={course.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <ScrollAnimation direction="up" delay={index * 100}>
                  <CourseCard {...course} />
                </ScrollAnimation>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No courses match your filters</p>
              <button
                onClick={() => setFilters({ mode: [] })}
                className="text-ablr-primary font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}

      {/* B2B Institutional Training Section */}
      <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-200">
        <ScrollAnimation direction="up">
          <div className="bg-gradient-to-br from-ablr-primary/5 via-ablr-terracotta/5 to-ablr-dark/5 rounded-2xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary">
              Looking for institutional training?
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Customised programmes for universities, hospitals and organisations.
            </p>
            <Link
              href="/for-organisations"
              className="inline-flex items-center gap-2 bg-ablr-primary text-white px-8 py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-ablr-dark transition-colors duration-300 group"
            >
              <span>Partner With Us</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

