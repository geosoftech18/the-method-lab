'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import CourseDetails from '@/components/programs/CourseDetails'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { usePrograms } from '@/contexts/ProgramContext'

export default function CoursePage() {
  const params = useParams()
  const id = params.id as string
  const { getProgramById, loading } = usePrograms()
  const course = getProgramById(id)

  if (loading) {
    return (
      <main className="min-h-screen">
        <ScrollProgress />
        <ScrollToTop />
        <Header />
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 text-center">
          <p className="text-gray-600">Loading course details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!course) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 text-center">
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
      
      <section className="section-spacing bg-white !py-10">
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

