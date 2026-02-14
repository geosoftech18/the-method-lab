'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import CourseDetails from '@/components/programs/CourseDetails'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Mock course data - in production, this would come from an API or database
const courses: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Applied Behaviour Analysis Foundations',
    duration: '8 weeks',
    nextCohort: 'March 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    faculty: [
      {
        name: 'Dr. Sarah Mitchell',
        role: 'Lead Instructor',
        bio: 'Expert in Applied Behaviour Analysis with over 20 years of experience.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      },
    ],
    whoItsFor: [
      'Practitioners seeking foundational ABA knowledge',
      'Professionals new to applied behavioural sciences',
      'Educators looking to implement evidence-based practices',
    ],
    learningObjectives: [
      'Understand core principles of Applied Behaviour Analysis',
      'Learn to design and implement behaviour intervention plans',
      'Develop skills in data collection and analysis',
      'Apply ethical guidelines in practice',
    ],
    outcomes: [
      'Competence in designing evidence-based interventions',
      'Ability to collect and analyze behavioural data',
      'Understanding of ethical practice in ABA',
      'Confidence in applying ABA principles to real-world scenarios',
    ],
    brochureUrl: '/brochures/aba-foundations.pdf',
  },
  '2': {
    id: '2',
    title: 'Advanced Clinical Supervision',
    duration: '6 weeks',
    nextCohort: 'April 2024',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    faculty: [
      {
        name: 'Dr. James Anderson',
        role: 'Clinical Director',
        bio: 'Renowned expert in clinical supervision with extensive experience in training supervisors.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      },
    ],
    whoItsFor: [
      'Experienced practitioners transitioning to supervisory roles',
      'Current supervisors seeking to enhance their skills',
      'Clinical directors and training coordinators',
    ],
    learningObjectives: [
      'Master advanced supervision techniques',
      'Develop effective mentoring strategies',
      'Learn to provide constructive feedback',
      'Understand legal and ethical considerations in supervision',
    ],
    outcomes: [
      'Enhanced supervision and mentoring capabilities',
      'Improved ability to support professional development',
      'Stronger understanding of supervisory ethics',
      'Confidence in managing supervisory relationships',
    ],
    brochureUrl: '/brochures/clinical-supervision.pdf',
  },
  // Add more courses as needed
}

export default function CoursePage() {
  const params = useParams()
  const id = params.id as string
  const course = courses[id]

  if (!course) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <Link href="/programs" className="text-ablr-primary hover:underline">
            Return to Programmes
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      <section className="section-spacing bg-white">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-ablr-primary hover:gap-4 transition-all duration-300 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Programmes</span>
          </Link>
          
          <CourseDetails course={course} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

