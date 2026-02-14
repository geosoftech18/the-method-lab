'use client'

import { useState, useMemo } from 'react'
import CourseCard from './CourseCard'
import ProgramFilters from './ProgramFilters'
import ScrollAnimation from '../ScrollAnimation'

interface Course {
  id: string
  title: string
  duration: string
  nextCohort?: string
  isSelfPaced?: boolean
  mode: 'live' | 'pre-recorded'
  wing: 'Applied Learning and Training' | 'Applied Research and Practice'
  audience: 'students' | 'professionals' | 'organisations'
  image?: string
}

const allCourses: Course[] = [
  {
    id: '1',
    title: 'Applied Behaviour Analysis Foundations',
    duration: '8 weeks',
    nextCohort: 'March 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Advanced Clinical Supervision',
    duration: '6 weeks',
    nextCohort: 'April 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Research Methodology Intensive',
    duration: '10 weeks',
    isSelfPaced: true,
    mode: 'pre-recorded',
    wing: 'Applied Research and Practice',
    audience: 'students',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Ethical Practice in ABA',
    duration: '4 weeks',
    nextCohort: 'May 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Data Analysis for Behavioural Research',
    duration: '6 weeks',
    isSelfPaced: true,
    mode: 'pre-recorded',
    wing: 'Applied Research and Practice',
    audience: 'students',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Organizational Training in ABA',
    duration: '12 weeks',
    nextCohort: 'June 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'organisations',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
  },
]

export default function AllProgrammes() {
  const [filters, setFilters] = useState({
    audience: [] as string[],
    mode: [] as string[],
    wing: [] as string[]
  })

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const audienceMatch = filters.audience.length === 0 || filters.audience.includes(course.audience)
      const modeMatch = filters.mode.length === 0 || filters.mode.includes(course.mode)
      const wingMatch = filters.wing.length === 0 || filters.wing.includes(course.wing)
      
      return audienceMatch && modeMatch && wingMatch
    })
  }, [filters])

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
            onClick={() => setFilters({ audience: [], mode: [], wing: [] })}
            className="text-ablr-primary font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}


