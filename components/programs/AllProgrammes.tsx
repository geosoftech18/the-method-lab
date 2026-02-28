'use client'

import { useMemo ,useState} from 'react'
import CourseCard from './CourseCard'
import ProgramFilters from './ProgramFilters'
import ScrollAnimation from '../ScrollAnimation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePrograms } from '@/contexts/ProgramContext'

export default function AllProgrammes() {
  const { programs, courses: dbCourses, loading } = usePrograms()
  const [filters, setFilters] = useState({
    audience: [] as string[],
  
    wing: [] as string[]
  })

  // Transform programs to match CourseCard interface - only live programs, no pre-recorded or self-paced
  const courses = useMemo(() => {
    // Only include live programs that are not self-paced
    const programCourses = programs
      .filter(program => program.mode === 'live' && !program.isSelfPaced)
      .map((program) => ({
        id: program.id,
        title: program.title,
        description: program.description,
        duration: program.duration,
        nextCohort: program.nextCohort,
        startDate: program.startDate,
        endDate: program.endDate,
        isSelfPaced: program.isSelfPaced,
        mode: program.mode,
        wing: program.wing,
        audience: program.audience,
        image: program.image,
        isCourse: false,
      }))
    
    // Don't include pre-recorded courses
    return programCourses
  }, [programs])

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const audienceMatch = filters.audience.length === 0 || filters.audience.includes(course.audience)
      
      const wingMatch = filters.wing.length === 0 || filters.wing.includes(course.wing)
      
      return audienceMatch  && wingMatch
    })
  }, [filters, courses])

  return (
    <div>
      <div className="mb-8">
        <ScrollAnimation direction="up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-ablr-primary">
            All Programmes
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our comprehensive range of professional training and research programmes
          </p>
        </ScrollAnimation>
      </div>

      <ProgramFilters onFilterChange={setFilters} />

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Loading programmes...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-ablr-primary">{filteredCourses.length}</span> programme{filteredCourses.length !== 1 ? 's' : ''}
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
              <p className="text-gray-600 text-lg mb-4">No programmes match your filters</p>
              <button
                onClick={() => setFilters({ audience: [], wing: [] })}
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


