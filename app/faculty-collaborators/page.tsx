'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { GraduationCap, Users, Award, BookOpen, ArrowRight, CheckCircle2, UserCheck, Briefcase, Linkedin, ExternalLink, Building2 } from 'lucide-react'
import Link from 'next/link'

interface FacultyMember {
  id: string
  name: string
  role: string
  bio: string
  image: string | null
  linkedinUrl: string | null
}

interface FacultyDisplay {
  name: string
  role: string
  type: string
  image: string
  summary: string
  tags?: string[]
  linkedin: string | null
}

export default function FacultyCollaboratorsPage() {
  const [currentFaculty, setCurrentFaculty] = useState<FacultyDisplay[]>([])
  const [facultyLoading, setFacultyLoading] = useState(true)

  // Fetch faculty from database
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('/api/faculty')
        const result = await response.json()
        
        if (result.success && result.data) {
          // Map database fields to UI format
          const mappedFaculty: FacultyDisplay[] = result.data.map((item: FacultyMember) => ({
            name: item.name,
            role: item.role,
            type: 'Current Faculty', // Default type since not in database
            image: item.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', // Fallback image
            summary: item.bio, // Use bio as summary
            tags: undefined, // Tags not in database, so not shown
            linkedin: item.linkedinUrl || null,
          }))
          setCurrentFaculty(mappedFaculty)
        }
      } catch (error) {
        console.error('Error fetching faculty:', error)
        setCurrentFaculty([])
      } finally {
        setFacultyLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  const engagementTypes = [
    {
      icon: BookOpen,
      title: 'Programme Delivery',
      description: 'Lead or co-facilitate training programmes and workshops',
    },
    {
      icon: Award,
      title: 'Curriculum Development',
      description: 'Design and develop course content and learning materials',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Provide guidance and support to programme participants',
    },
    {
      icon: GraduationCap,
      title: 'Research Collaboration',
      description: 'Partner on research projects and publications',
    },
  ]

  const collaborators = [
    {
      category: 'Individual Faculty Members',
      description: 'Experienced practitioners, researchers, and educators seeking to share their expertise and contribute to transformative learning experiences.',
      icon: GraduationCap,
    },
    {
      category: 'Trainers & Consultants',
      description: 'Independent trainers and consultants with specialized knowledge in applied behavioral sciences and professional development.',
      icon: Users,
    },
    {
      category: 'Academic Institutions',
      description: 'Universities and research centers seeking collaborative opportunities and joint programme development.',
      icon: Building2,
    },
    {
      category: 'Professional Associations',
      description: 'Organizations dedicated to advancing the field through training, research, and knowledge exchange.',
      icon: Award,
    },
    {
      category: 'Healthcare Systems',
      description: 'Hospitals and clinics focused on evidence-based practice and capacity building.',
      icon: Users,
    },
    {
      category: 'Training Organizations',
      description: 'Institutions committed to professional development and evidence-based training programmes.',
      icon: BookOpen,
    },
  ]

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <p className="label-small-caps text-ablr-dark/70 mb-4 text-sm">Faculty & Collaborators</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-ablr-primary leading-[0.9]">
                Excellence Through
                <br />
                <span className="text-ablr-dark">Collaboration</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl mb-8">
                Our diverse community of faculty and collaborators brings together expertise, experience, and innovation to deliver exceptional learning experiences.
              </p>
              <Link
                href="/inquiry/teach"
                className="inline-flex items-center gap-3 bg-ablr-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300 group"
              >
                <GraduationCap size={24} />
                <span>Apply to Join Faculty</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* How ABLR Approaches Faculty */}
      <section className="section-spacing bg-[#F6F7F8] relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Heading Section - Always First */}
          <div className="col-span-12 mb-6 sm:mb-8 lg:mb-0 lg:hidden">
            <ScrollAnimation direction="up">
              <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                Our Approach
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary leading-tight">
                How The Method Lab Approaches Faculty
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-4 sm:mb-6"></div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="col-span-12 lg:col-span-6 order-3 lg:order-1">
              <ScrollAnimation direction="up">
                {/* Heading Section - Desktop Only */}
                <div className="hidden lg:block mb-6 sm:mb-8">
                  <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                    Our Approach
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary leading-tight">
                    How The Method Lab Approaches Faculty
                  </h2>
                  <div className="w-24 h-1 bg-ablr-primary mb-4 sm:mb-6"></div>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  At The Method Lab, we believe that exceptional faculty are the cornerstone of transformative learning experiences. Our approach to faculty engagement is built on principles of respect, collaboration, and mutual growth.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Recognition of Expertise</h4>
                      <p className="text-gray-700 text-sm sm:text-base">We value and honor the unique contributions each faculty member brings to our programmes</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Collaborative Partnership</h4>
                      <p className="text-gray-700 text-sm sm:text-base">We work as partners, not just service providers, fostering meaningful relationships</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Professional Development</h4>
                      <p className="text-gray-700 text-sm sm:text-base">We support faculty growth through opportunities for research, publication, and skill enhancement</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 lg:col-span-6 order-2 lg:order-2">
              <ScrollAnimation direction="up" delay={200}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-ablr-primary/10 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-2xl p-6 sm:p-8 md:p-12 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
                    <GraduationCap size={60} className="sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] text-white/80" strokeWidth={1} />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Current / Advisory Faculty */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <ScrollAnimation direction="up">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Current / Advisory Faculty
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-8"></div>
              <p className="text-xl text-gray-700">
                Meet our distinguished faculty members who bring decades of combined experience and expertise to The Method Lab programmes.
              </p>
            </ScrollAnimation>
          </div>

          {facultyLoading ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">Loading faculty...</p>
            </div>
          ) : currentFaculty.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No faculty members available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {currentFaculty.map((faculty, index) => (
                <div key={faculty.name + index} className="col-span-12 sm:col-span-6 lg:col-span-3">
                  <ScrollAnimation direction="up" delay={index * 100}>
                    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden card-elevated group hover:border-ablr-primary transition-all duration-500 flex flex-col h-full">
                      <div className="relative h-64 overflow-hidden flex-shrink-0">
                        <img
                          src={faculty.image}
                          alt={faculty.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                          style={{ objectPosition: 'center 20%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            faculty.type === 'Current Faculty' 
                              ? 'bg-ablr-primary text-white' 
                              : 'bg-ablr-dark text-white'
                          }`}>
                            {faculty.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1 transition-all duration-500 min-h-[120px] group-hover:min-h-[220px]">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 text-ablr-primary">
                          {faculty.name}
                        </h3>
                        <p className="text-ablr-dark font-semibold mb-4">
                          {faculty.role}
                        </p>
                        
                        {/* Description - Always Visible */}
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                          {faculty.summary}
                        </p>
                        
                        {/* Tags and Links - Visible on Hover */}
                        {(faculty.tags && faculty.tags.length > 0) || faculty.linkedin ? (
                          <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-500 flex-1 flex flex-col overflow-hidden">
                            {/* Tags */}
                            {faculty.tags && faculty.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {faculty.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-3 py-1 bg-ablr-primary/10 text-ablr-primary text-xs font-semibold rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Links */}
                            {faculty.linkedin && (
                              <div className={`flex items-center gap-3 ${faculty.tags && faculty.tags.length > 0 ? 'mt-auto pt-4 border-t border-gray-200' : 'mt-0 pt-0'}`}>
                                <a
                                  href={faculty.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-ablr-primary hover:text-ablr-dark transition-colors duration-300 group/link"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Linkedin size={20} className="group-hover/link:scale-110 transition-transform duration-300" />
                                  <span className="text-sm font-semibold">LinkedIn</span>
                                </a>
                              </div>
                            )}
                          </div>
                        ) : null}
                        
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Types of Engagement */}
      <section className="section-spacing bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <ScrollAnimation direction="up">
              <span className="text-sm font-semibold text-ablr-dark uppercase tracking-wider mb-4 block">
                Engagement Opportunities
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Types of Engagement
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We offer flexible engagement models that accommodate different levels of involvement and expertise.
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 items-stretch">
            {engagementTypes.map((type, index) => (
              <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3 flex">
                <ScrollAnimation direction="up" delay={index * 100} className="flex-1 flex flex-col">
                  <div className="bg-white p-8 h-full relative overflow-hidden group flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/30 rounded-bl-full group-hover:bg-ablr-primary/10 transition-colors duration-500"></div>
                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="w-16 h-16 bg-ablr-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-ablr-primary/20 transition-colors duration-500">
                        <type.icon size={32} className="text-ablr-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-ablr-primary">
                        {type.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed flex-grow">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Collaborate With */}
      <section className="section-spacing bg-white relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mb-16">
            <ScrollAnimation direction="up">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Who We Collaborate With
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-8"></div>
              <p className="text-xl text-gray-700">
                The Method Lab partners with a diverse range of organizations and institutions committed to advancing applied practice and research.
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 items-stretch">
            {collaborators.map((collab, index) => (
              <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 flex">
                <ScrollAnimation direction="up" delay={index * 100} className="flex-1 flex flex-col">
                  <div className="bg-[#F6F7F8] p-8 rounded-xl h-full relative overflow-hidden group hover:bg-ablr-primary/5 transition-colors duration-500 flex flex-col">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-ablr-primary group-hover:w-2 transition-all duration-500"></div>
                    <div className="pl-6 flex flex-col flex-grow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <collab.icon size={24} className="text-ablr-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 text-ablr-primary">
                            {collab.category}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-grow">
                        {collab.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply to Join Faculty CTA */}
      <section className="section-spacing bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
                Ready to Make an Impact?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join our community of expert faculty and contribute to advancing applied practice and research. We're looking for passionate educators, researchers, and practitioners.
              </p>
              <Link
                href="/inquiry/teach"
                className="inline-flex items-center gap-3 bg-white text-ablr-primary px-10 py-5 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group"
              >
                <GraduationCap size={24} />
                <span>Apply to Join Faculty</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


