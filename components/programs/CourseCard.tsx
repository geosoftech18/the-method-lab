'use client'

import { ArrowRight, Clock, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
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

export default function CourseCard({
  id,
  title,
  duration,
  nextCohort,
  isSelfPaced,
  mode,
  wing,
  audience,
  image
}: CourseCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden card-elevated h-full flex flex-col hover:shadow-xl transition-all duration-500">
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              mode === 'live' 
                ? 'bg-ablr-primary text-white' 
                : 'bg-ablr-secondary text-ablr-primary'
            }`}>
              {mode === 'live' ? 'Live' : 'Pre-recorded'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <span className="text-xs font-semibold text-ablr-primary uppercase tracking-wide">
            {wing}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-ablr-primary group-hover:text-ablr-dark transition-colors">
          {title}
        </h3>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} className="text-ablr-primary" />
            <span className="text-sm">{duration}</span>
          </div>

          {nextCohort && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-ablr-primary" />
              <span className="text-sm">Next cohort: {nextCohort}</span>
            </div>
          )}

          {isSelfPaced && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} className="text-ablr-primary" />
              <span className="text-sm">Self-paced learning</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} className="text-ablr-primary" />
            <span className="text-sm capitalize">For {audience}</span>
          </div>
        </div>

        <Link
          href={`/programs/course/${id}`}
          className="inline-flex items-center gap-2 text-ablr-primary font-semibold group/link hover:gap-4 transition-all duration-300 mt-auto"
        >
          <span>Learn More</span>
          <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}


