'use client'

import { Clock, Calendar, Users, Download, FileText, ArrowRight } from 'lucide-react'
import ScrollAnimation from '../ScrollAnimation'
import Link from 'next/link'

interface CourseDetailsProps {
  course: {
    id: string
    title: string
    duration: string
    dates?: string
    nextCohort?: string
    isSelfPaced?: boolean
    mode: 'live' | 'pre-recorded'
    wing: string
    audience: string
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
  }
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <ScrollAnimation direction="up">
          <div className="mb-4">
            <span className="text-sm font-semibold text-ablr-primary uppercase tracking-wide">
              {course.wing}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-ablr-primary">
            {course.title}
          </h1>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={20} className="text-ablr-primary" />
              <span className="font-semibold">{course.duration}</span>
            </div>
            {course.nextCohort && (
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={20} className="text-ablr-primary" />
                <span className="font-semibold">Next cohort: {course.nextCohort}</span>
              </div>
            )}
            {course.isSelfPaced && (
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={20} className="text-ablr-primary" />
                <span className="font-semibold">Self-paced</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.mode === 'live' 
                  ? 'bg-ablr-primary text-white' 
                  : 'bg-ablr-secondary text-ablr-primary'
              }`}>
                {course.mode === 'live' ? 'Live' : 'Pre-recorded'}
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Course Information Grid */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          {/* About the Course */}
          <ScrollAnimation direction="up">
            <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                About the Course
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This comprehensive programme provides in-depth training in {course.title.toLowerCase()}, designed to equip participants with the knowledge, skills, and confidence needed to excel in their professional practice.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through a combination of theoretical foundations, practical exercises, and real-world case studies, participants will develop a deep understanding of the subject matter and its practical applications.
              </p>
            </div>
          </ScrollAnimation>

          {/* Who It's For */}
          {course.whoItsFor && course.whoItsFor.length > 0 && (
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                  Who It's For
                </h2>
                <ul className="space-y-3">
                  {course.whoItsFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          )}

          {/* Learning Objectives */}
          {course.learningObjectives && course.learningObjectives.length > 0 && (
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                  Learning Objectives
                </h2>
                <ul className="space-y-4">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          )}

          {/* Outcomes */}
          {course.outcomes && course.outcomes.length > 0 && (
            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-gradient-to-br from-ablr-primary/10 to-ablr-dark/10 rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                  Learning Outcomes
                </h2>
                <ul className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          {/* About Faculty */}
          {course.faculty && course.faculty.length > 0 && (
            <ScrollAnimation direction="up" delay={400}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6 text-ablr-primary">
                  About Faculty
                </h2>
                <div className="space-y-6">
                  {course.faculty.map((member, index) => (
                    <div key={index}>
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover mb-4 mx-auto"
                        />
                      )}
                      <h3 className="font-bold text-lg mb-1 text-ablr-primary text-center">
                        {member.name}
                      </h3>
                      <p className="text-sm text-ablr-dark font-semibold mb-2 text-center">
                        {member.role}
                      </p>
                      <p className="text-sm text-gray-700 text-center">
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Action Buttons */}
          <ScrollAnimation direction="up" delay={500}>
            <div className="bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-xl p-6 sm:p-8 text-white">
              <h3 className="text-xl font-serif font-bold mb-4">
                Ready to Apply?
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Take the next step in your professional development journey.
              </p>
              
              {course.brochureUrl && (
                <a
                  href={course.brochureUrl}
                  download
                  className="w-full mb-4 px-6 py-3 bg-white text-ablr-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  <span>Download Brochure</span>
                </a>
              )}
              
              <Link
                href={`/programs/apply?course=${course.id}`}
                className="w-full px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Request an Application</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}


