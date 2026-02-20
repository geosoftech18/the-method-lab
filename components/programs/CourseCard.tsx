'use client'

import { ArrowRight, Clock, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  id: string
  title: string
  description?: string
  duration: string
  nextCohort?: string
  startDate?: string
  endDate?: string
  isSelfPaced?: boolean
  mode: 'live' | 'pre-recorded'
  wing: string
  audience: 'students' | 'professionals' | 'organisations'
  image?: string
  isCourse?: boolean
}

export default function CourseCard({
  id,
  title,
  description,
  duration,
  nextCohort,
  startDate,
  endDate,
  isSelfPaced,
  mode,
  wing,
  audience,
  image,
  isCourse = false
}: CourseCardProps) {
  // Format date from ISO string to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateString
    }
  }
  // Determine colors based on wing
  const isLearningWing = wing === 'Applied Learning and Training'
  const isPracticeWing = wing === 'Practice and Implementation'
  
  // Color classes for different wings
  const wingColorClasses = isLearningWing ? {
    text: 'text-ablr-primary',
    textHover: 'group-hover:text-ablr-dark',
    badge: mode === 'live' ? 'bg-ablr-primary text-white' : 'bg-ablr-primary/10 text-ablr-primary',
    label: 'text-ablr-primary',
    icon: 'text-ablr-primary',
    link: 'text-ablr-primary'
  } : isPracticeWing ? {
    text: 'text-ablr-primary',
    textHover: 'group-hover:text-ablr-dark',
    badge: mode === 'live' ? 'bg-ablr-primary text-white' : 'bg-ablr-primary/10 text-ablr-primary',
    label: 'text-ablr-primary',
    icon: 'text-ablr-primary',
    link: 'text-ablr-primary'
  } : {
    text: 'text-ablr-terracotta',
    textHover: 'group-hover:text-ablr-brown',
    badge: mode === 'live' ? 'bg-ablr-terracotta text-white' : 'bg-ablr-terracotta/10 text-ablr-terracotta',
    label: 'text-ablr-terracotta',
    icon: 'text-ablr-terracotta',
    link: 'text-ablr-terracotta'
  }
  
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
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${wingColorClasses.badge}`}>
              {mode === 'live' ? 'Live' : 'Pre-recorded'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <span className={`text-xs font-semibold ${wingColorClasses.label} uppercase tracking-wide`}>
            {wing}
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-serif font-bold mb-2 ${wingColorClasses.text} ${wingColorClasses.textHover} transition-colors`}>
          {title}
        </h3>
        
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} className={wingColorClasses.icon} />
            <span className="text-sm">{duration}</span>
          </div>

          {startDate && endDate && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className={wingColorClasses.icon} />
              <span className="text-sm">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
          )}
          {!startDate && !endDate && nextCohort && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className={wingColorClasses.icon} />
              <span className="text-sm">Next cohort: {nextCohort}</span>
            </div>
          )}

          {isSelfPaced && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} className={wingColorClasses.icon} />
              <span className="text-sm">Self-paced learning</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} className={wingColorClasses.icon} />
            <span className="text-sm capitalize">For {audience}</span>
          </div>
        </div>

        <Link
          href={isCourse ? `/courses/${id}` : `/programs/course/${id}`}
          className={`inline-flex items-center gap-2 ${wingColorClasses.link} font-semibold group/link hover:gap-4 transition-all duration-300 mt-auto`}
        >
          <span>Learn More</span>
          <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}


