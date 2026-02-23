'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import CourseCard from '@/components/programs/CourseCard'
import { usePrograms } from '@/contexts/ProgramContext'
import { 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Award,
  Quote,
  Mail
} from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const { getCourseById, courses, loading } = usePrograms()
  const course = getCourseById(courseId)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  // JavaScript-based sticky positioning
  useEffect(() => {
    if (!course) return // Don't run if course not loaded
    
    if (!isLargeScreen) {
      // Reset styles on small screens
      if (sidebarRef.current) {
        sidebarRef.current.style.position = 'relative'
        sidebarRef.current.style.top = 'auto'
        sidebarRef.current.style.width = 'auto'
        sidebarRef.current.style.left = 'auto'
      }
      return
    }

    if (!sidebarRef.current || !sectionRef.current || !ctaSectionRef.current) {
      return
    }

    const sidebar = sidebarRef.current
    const section = sectionRef.current
    const ctaSection = ctaSectionRef.current
    const heroSection = heroSectionRef.current
    const sidebarColumn = sidebar.parentElement

    if (!sidebarColumn) return

    const topOffset = 32 // 2rem = 32px
    const headerHeight = 80
    const buffer = 30 // Buffer to prevent overlap with CTA

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect()
      const ctaRect = ctaSection.getBoundingClientRect()
      const sidebarColumnRect = sidebarColumn.getBoundingClientRect()
      const heroRect = heroSection?.getBoundingClientRect()
      
      const sidebarWidth = sidebarColumnRect.width
      // Get sidebar height - use multiple methods to ensure we get a value
      const sidebarHeight = sidebar.offsetHeight || sidebar.scrollHeight || sidebar.clientHeight || 400

      // Check if hero section has passed
      const heroEnded = !heroSection || (heroRect && heroRect.bottom <= 0)
      
      // Check if section has started (top is at or above header + offset)
      const sectionStarted = sectionRect.top <= headerHeight + topOffset

      if (!sectionStarted || !heroEnded) {
        // Section not started or hero still visible - use relative
        sidebar.style.position = 'relative'
        sidebar.style.top = '0'
        sidebar.style.left = 'auto'
        sidebar.style.width = 'auto'
        sidebar.style.right = 'auto'
        return
      }

      // Calculate where sidebar bottom would be if fixed
      const sidebarBottomIfFixed = topOffset + sidebarHeight
      const ctaTop = ctaRect.top
      
      // Stop sticky when sidebar would overlap CTA section (with buffer)
      const shouldStop = sidebarBottomIfFixed >= (ctaTop - buffer)

      if (shouldStop) {
        // Calculate absolute position at bottom of section
        const sectionTop = section.offsetTop
        const ctaTopAbsolute = ctaSection.offsetTop
        const availableHeight = (ctaTopAbsolute - sectionTop) - buffer
        const absoluteTop = Math.max(0, availableHeight - sidebarHeight)
        
        sidebar.style.position = 'absolute'
        sidebar.style.top = `${absoluteTop}px`
        sidebar.style.width = `${sidebarWidth}px`
        sidebar.style.left = '0'
        sidebar.style.right = 'auto'
      } else {
        // Apply fixed sticky positioning - ensure it's always visible
        const currentLeft = sidebarColumnRect.left
        sidebar.style.position = 'fixed'
        sidebar.style.top = `${topOffset}px`
        sidebar.style.left = `${currentLeft}px`
        sidebar.style.width = `${sidebarWidth}px`
        sidebar.style.right = 'auto'
      }
    }

    // Use requestAnimationFrame for smooth updates
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isLargeScreen, course])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // lg breakpoint
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="text-center py-16">
          <p className="text-gray-600">Loading course...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!course) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="text-center py-16">
          <p className="text-gray-600">Course not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  // Get related courses (other courses, excluding current)
  const relatedCourses = courses
    .filter((c: any) => c.id !== courseId)
    .slice(0, 3)
    .map((c: any) => ({
      id: c.id,
      title: c.title,
      description: c.overview,
      duration: c.formatLine || '',
      mode: 'pre-recorded' as const,
      wing: '',
      audience: 'professionals' as const,
      image: c.image,
      isCourse: true,
    }))

  const defaultFaqs = [
    {
      question: 'How does the enrollment process work?',
      answer: 'The enrollment process is straightforward. Click "Enroll Now" to access the course platform, complete your registration, and start learning immediately. You\'ll have lifetime access to all course materials.'
    },
    {
      question: 'What are the technical requirements for this course?',
      answer: 'You\'ll need a stable internet connection, a computer or tablet, and access to a modern web browser. All course materials are delivered through our secure online learning platform.'
    },
    {
      question: 'Can I access the course on mobile devices?',
      answer: 'Yes, the course platform is fully responsive and can be accessed on mobile devices, tablets, and desktops. However, we recommend using a larger screen for the best learning experience.'
    },
    {
      question: 'How much time should I allocate per week?',
      answer: 'This is a self-paced course, so you can complete it at your own speed. Most participants complete the course over 4-6 weeks, spending 2-3 hours per week on average.'
    },
    {
      question: 'Will I receive a certificate upon completion?',
      answer: 'Yes, upon completing all course modules, you\'ll receive a digital certificate of completion that you can use for CPD documentation and professional development records.'
    },
    {
      question: 'Is there ongoing support after I complete the course?',
      answer: 'Yes, you\'ll have lifetime access to the course materials and can revisit them anytime. You\'ll also have access to our community forum for ongoing support and discussion.'
    }
  ]

  const displayFaqs = course.faqs && course.faqs.length > 0 ? course.faqs : defaultFaqs

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />

      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative text-white py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        {course.image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${course.image})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark"></div>
        )}
        
        {/* Gradient Overlay - Only show if image exists */}
        {course.image && (
          <div className="absolute inset-0 bg-gradient-to-br from-ablr-primary/90 via-ablr-primary/85 to-ablr-dark/90"></div>
        )}
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <ScrollAnimation direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              {course.tagline && (
                <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-semibold">
                  {course.tagline}
                </p>
              )}
              {course.formatLine && (
                <p className="text-base sm:text-lg text-white/80 mb-4">
                  {course.formatLine}
                </p>
              )}
              {course.microTrustLine && (
                <p className="text-sm sm:text-base text-white/70 mb-8">
                  {course.microTrustLine}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {course.primaryCtaUrl && (
                  <Link
                    href={course.primaryCtaUrl}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-ablr-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group inline-flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                )}
                {course.secondaryCtaUrl && (
                  <Link
                    href={course.secondaryCtaUrl}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    <span>Download Syllabus</span>
                  </Link>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Course Information Grid */}
      <section ref={sectionRef} className="section-spacing bg-white" id="course-content-section" style={{ position: 'relative' }}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-12 gap-8 mb-12 lg:items-start">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* About the Course */}
              {course.overview && (
                <ScrollAnimation direction="up">
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                      About the Course
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.overview}
                    </p>
                  </div>
                </ScrollAnimation>
              )}

              {/* Who It's For */}
              {course.whoItsFor && course.whoItsFor.length > 0 && (
                <ScrollAnimation direction="up" delay={100}>
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                      Who It's For
                    </h2>
                    <ul className="space-y-3">
                      {course.whoItsFor.map((item: string, index: number) => (
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
                      What You Will Gain
                    </h2>
                    <ul className="space-y-4">
                      {course.learningObjectives.map((objective: string, index: number) => (
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

              {/* Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <ScrollAnimation direction="up" delay={300}>
                  <div className="bg-gradient-to-br from-ablr-primary/10 to-ablr-dark/10 rounded-xl p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                      Learning Outcomes
                    </h2>
                    <ul className="space-y-4">
                      {course.learningOutcomes.map((outcome: string, index: number) => (
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

              {/* What's Included */}
              {course.whatsIncluded && (
                <ScrollAnimation direction="up" delay={400}>
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                      What's Included
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.whatsIncluded}
                    </p>
                  </div>
                </ScrollAnimation>
              )}

              {/* How the Course Works */}
              {course.howItWorks && (
                <ScrollAnimation direction="up" delay={500}>
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                      How the Course Works
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.howItWorks}
                    </p>
                  </div>
                </ScrollAnimation>
              )}

              {/* Certification & Completion */}
              {course.certificationDescription && (
                <ScrollAnimation direction="up" delay={400}>
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                        <Award size={24} className="text-ablr-primary" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary">
                        Certification & Completion
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.certificationDescription}
                    </p>
                  </div>
                </ScrollAnimation>
              )}

              {/* FAQs */}
              <ScrollAnimation direction="up" delay={600}>
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 card-elevated">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {displayFaqs.map((faq: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                          {openFaqIndex === index ? (
                            <ChevronUp size={20} className="text-ablr-primary flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-ablr-primary flex-shrink-0" />
                          )}
                        </button>
                        {openFaqIndex === index && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Sidebar */}
            <div 
              className="col-span-12 lg:col-span-4" 
              style={{ 
                position: 'relative', 
                minHeight: 'fit-content',
                height: 'fit-content'
              }}
            >
              <aside 
                ref={sidebarRef}
                className="sticky-sidebar"
                style={{ 
                  position: 'relative',
                  top: '0',
                  maxHeight: 'calc(100vh - 4rem)',
                  overflowY: 'auto',
                  zIndex: 10,
                  willChange: 'transform'
                }}
              >
                {/* About Faculty */}
                {course.faculty && course.faculty.length > 0 && (
                  <div className="mb-8">
                    <div className="bg-white border-2 border-ablr-primary/10 rounded-xl p-6 sm:p-8 card-elevated">
                      <h2 className="text-xl sm:text-2xl text-center font-serif font-bold mb-6 text-ablr-primary">
                        About Faculty
                      </h2>
                      <div className="space-y-6">
                        {course.faculty.map((member: any, index: number) => (
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
                  </div>
                )}

                {/* Action Buttons */}
                <div>
                  <div className="bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-xl p-6 sm:p-8 text-white">
                    <h3 className="text-xl font-serif font-bold mb-4">
                      Ready to Enroll?
                    </h3>
                    <p className="text-white/90 mb-6 text-sm">
                      Start your learning journey today with lifetime access.
                    </p>
                    
                    {course.primaryCtaUrl && (
                      <Link
                        href={course.primaryCtaUrl}
                        className="w-full mb-4 px-6 py-3 bg-white text-ablr-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={20} />
                        <span>Enroll Now</span>
                      </Link>
                    )}

                    <Link
                  href={`/inquiry/apply?course=${course.id}&courseName=${encodeURIComponent(course.title)}`}
                  className="w-full mb-4 px-6 py-3 bg-white text-ablr-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Send an Enquiry</span>
                </Link>
                    
                    {course.secondaryCtaUrl && (
                      <Link
                        href={course.secondaryCtaUrl}
                        className="w-full px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Download size={20} />
                        <span>Download Syllabus</span>
                      </Link>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Primary CTA Section */}
      <section ref={ctaSectionRef} className="section-spacing bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white relative overflow-hidden">
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
                {course.primaryCtaUrl && (
                  <Link
                    href={course.primaryCtaUrl}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-ablr-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group inline-flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={24} />
                    <span>Enroll Now</span>
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                )}
                {course.secondaryCtaUrl && (
                  <Link
                    href={course.secondaryCtaUrl}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    <span>Download Syllabus</span>
                  </Link>
                )}
               
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Explore Related Programmes */}
      {relatedCourses.length > 0 && (
        <section className="section-spacing bg-white">
          <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-ablr-primary text-center">
                Other Programmes You May Like
              </h2>
              <div className="grid grid-cols-12 gap-6">
                {relatedCourses.map((relatedCourse, index) => (
                  <div key={relatedCourse.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <ScrollAnimation direction="up" delay={index * 100}>
                      <CourseCard {...relatedCourse} />
                    </ScrollAnimation>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Footer / Contact Prompt */}
      {/* <section className="section-spacing bg-gray-50">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimation direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-ablr-primary">
                Have Questions?
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                We're here to help. Reach out to our team for more information about this course or to discuss your learning needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact-us"
                  className="px-8 py-4 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/inquiry"
                  className="px-8 py-4 bg-transparent border-2 border-ablr-primary text-ablr-primary rounded-lg font-semibold hover:bg-ablr-primary/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <span>Send an Enquiry</span>
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-8">
                An initiative by The Method Lab
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
