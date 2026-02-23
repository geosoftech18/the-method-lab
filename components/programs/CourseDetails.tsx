'use client'

import { useState, useMemo } from 'react'
import { Clock, Calendar, Users, Download, FileText, ArrowRight, ChevronDown, Award, Mail, CheckCircle2, Quote } from 'lucide-react'
import ScrollAnimation from '../ScrollAnimation'
import Link from 'next/link'
import CourseCard from './CourseCard'
import { usePrograms } from '@/contexts/ProgramContext'

interface CourseDetailsProps {
  course: {
    id: string
    title: string
    duration: string
    dates?: string
    startDate?: string
    endDate?: string
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
    description?: string
    faqs?: Array<{
      question: string
      answer: string
    }>
    certificate?: {
      title: string
      description: string
      image?: string
    }
    testimonials?: Array<{
      quote: string
      author: string
      role: string
    }>
    image?: string
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
          
          {/* Programme Fee Notice */}
          <div className="bg-gradient-to-r from-ablr-primary/10 to-ablr-terracotta/10 border-l-4 border-ablr-primary rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-ablr-primary flex-shrink-0 mt-0.5" />
              <p className="text-base sm:text-lg font-semibold text-ablr-primary">
                Programme fee detailed in brochure.
              </p>
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

          {/* Certificate of Completion */}
          {course.certificate && (
            <ScrollAnimation direction="up" delay={400}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-ablr-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary">
                    {course.certificate.title || 'Certificate of Completion'}
                  </h2>
                </div>
                {course.certificate.description && (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {course.certificate.description}
                  </p>
                )}
                <div className="relative bg-gradient-to-br from-ablr-primary/5 to-ablr-dark/5 rounded-xl p-8 border-2 border-ablr-primary/20">
                  {course.certificate.image ? (
                    <div className="aspect-[4/3] max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={course.certificate.image}
                        alt={course.certificate.title || 'Certificate of Completion'}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] max-w-md mx-auto bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <Award size={64} className="text-ablr-primary mx-auto mb-4" />
                        <p className="text-gray-600 text-sm">Certificate Preview</p>
                        <p className="text-gray-500 text-xs mt-2">
                          {course.certificate.title || 'Professional Certificate of Completion'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Past Participant Voices */}
          {course.testimonials && course.testimonials.length > 0 && (
            <ScrollAnimation direction="up" delay={500}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                  Past Participant Voices
                </h2>
                <div className="space-y-6">
                  {course.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-ablr-primary pl-6 py-2">
                      <Quote size={24} className="text-ablr-primary/30 mb-3" />
                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-ablr-primary">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* FAQs / How It Works */}
          <FAQSection faqs={course.faqs} />
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          {/* About Faculty */}
          {course.faculty && course.faculty.length > 0 && (
            <ScrollAnimation direction="up" delay={400}>
              <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                <h2 className="text-xl sm:text-2xl text-center font-serif font-bold mb-6 text-ablr-primary">
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
                href={`/programs/apply?course=${course.id}&courseName=${encodeURIComponent(course.title)}`}
                className="w-full px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Request an Application</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Primary CTA Section */}
      <PrimaryCTASection course={course} />

      {/* Explore Related Programmes */}
      <RelatedProgrammesSection currentCourseId={course.id} />

      {/* Footer / Contact Prompt */}
      <ContactPromptSection />
    </div>
  )
}

// FAQ Section Component
function FAQSection({ faqs }: { faqs?: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const defaultFaqs = [
    {
      question: 'How does the application process work?',
      answer: 'The application process is straightforward. Submit your application through our online portal, and our team will review it within 5-7 business days. We\'ll notify you of the decision and provide next steps if accepted.'
    },
    {
      question: 'What are the technical requirements for online programmes?',
      answer: 'You\'ll need a stable internet connection, a computer or tablet, and access to video conferencing software. We provide all necessary materials and platform access once enrolled.'
    },
    {
      question: 'Can I get a refund if I need to withdraw?',
      answer: 'Refund policies vary by programme. Please refer to the specific programme brochure or contact our admissions team for detailed information about withdrawal and refund policies.'
    },
    {
      question: 'How much time should I allocate per week?',
      answer: 'Most programmes require 6-10 hours per week, including live sessions, readings, and assignments. Self-paced programmes offer more flexibility, allowing you to complete modules at your own pace.'
    },
    {
      question: 'Will I receive ongoing support after completion?',
      answer: 'Yes, graduates have access to our alumni network and can participate in continuing education opportunities, webinars, and professional development resources.'
    },
    {
      question: 'Are there any prerequisites for this programme?',
      answer: 'Prerequisites vary by programme. Some require prior experience or education, while others are open to all levels. Check the programme brochure or contact admissions for specific requirements.'
    }
  ]

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs

  return (
    <ScrollAnimation direction="up" delay={600}>
      <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {displayFaqs.map((faq: { question: string; answer: string }, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-ablr-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollAnimation>
  )
}

// Primary CTA Section Component
function PrimaryCTASection({ course }: { course: CourseDetailsProps['course'] }) {
  return (
    <section className="section-spacing bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white relative overflow-hidden mb-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a community of professionals committed to excellence and evidence-based practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/programs/apply?course=${course.id}&courseName=${encodeURIComponent(course.title)}`}
                className="w-full sm:w-auto px-8 py-4 bg-white text-ablr-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group inline-flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={24} />
                <span>Apply Now</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              {course.brochureUrl ? (
                <a
                  href={course.brochureUrl}
                  download
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Download size={24} />
                  <span>Request Brochure</span>
                </a>
              ) : (
                <Link
                  href={`/programs/course/${course.id}?action=brochure`}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <FileText size={24} />
                  <span>Request Brochure</span>
                </Link>
              )}
              
              <Link
                href={`/inquiry/register-interest?course=${course.id}`}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                <Mail size={24} />
                <span>Register Interest</span>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

// Related Programmes Section Component
function RelatedProgrammesSection({ currentCourseId }: { currentCourseId: string }) {
  const { programs } = usePrograms()

  const relatedCourses = useMemo(() => {
    return programs
      .filter((c: any) => c.id !== currentCourseId)
      .slice(0, 3)
      .map((program: any) => ({
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
      }))
  }, [currentCourseId, programs])

  if (relatedCourses.length === 0) return null

  return (
    <section className="section-spacing bg-[#F6F7F8] mb-12">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-ablr-primary">
              Explore Related Programmes
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Continue your learning journey with these complementary programmes
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {relatedCourses.map((course, index) => (
            <div key={course.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <ScrollAnimation direction="up" delay={index * 100}>
                <CourseCard {...course} />
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Prompt Section Component
function ContactPromptSection() {
  return (
    <section className="section-spacing bg-white border-t border-gray-200">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6 text-ablr-primary">
              Have Questions?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              Our team is here to help. Reach out to us for more information about this programme or to discuss your learning goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/contact-us"
                className="w-full sm:w-auto px-8 py-4 bg-ablr-primary text-white rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                <Mail size={24} />
                <span>Contact Us</span>
              </Link>
              
              <Link
                href="/inquiry/organisation"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-ablr-primary text-ablr-primary rounded-lg font-semibold text-lg hover:bg-ablr-primary/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                <span>Send an Enquiry</span>
                <ArrowRight size={24} />
              </Link>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
              An initiative of Hopscotch Child Therapy — Advancing evidence-based practice and research excellence.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}


