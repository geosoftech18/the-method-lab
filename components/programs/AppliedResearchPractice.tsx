'use client'

import { FlaskConical, ChevronDown, Users, Clock, ArrowRight, CheckCircle2, BookOpen, Settings, BarChart3, FileText, Lightbulb } from 'lucide-react'
import CourseCard from './CourseCard'
import ScrollAnimation from '../ScrollAnimation'
import Link from 'next/link'

const highlightedCourses = [
  {
    id: '3',
    title: 'Research Methodology Intensive',
    duration: '10 weeks',
    isSelfPaced: true,
    mode: 'pre-recorded' as const,
    wing: 'Applied Research and Practice' as const,
    audience: 'students' as const,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Data Analysis for Behavioural Research',
    duration: '6 weeks',
    isSelfPaced: true,
    mode: 'pre-recorded' as const,
    wing: 'Applied Research and Practice' as const,
    audience: 'students' as const,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: '7',
    title: 'Evidence Synthesis and Meta-Analysis',
    duration: '8 weeks',
    nextCohort: 'April 2024',
    mode: 'live' as const,
    wing: 'Applied Research and Practice' as const,
    audience: 'professionals' as const,
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?w=800&h=600&fit=crop',
  },
]

const focusAreas = [
  {
    icon: Settings,
    title: 'Applied Behaviour Analysis (ABA)',
    description: 'Comprehensive training in evidence-based behavioural interventions and analysis techniques.',
  },
  {
    icon: BarChart3,
    title: 'Clinical Supervision',
    description: 'Advanced supervision methodologies and professional development frameworks.',
  },
  {
    icon: FileText,
    title: 'Ethical Practice',
    description: 'Ethical guidelines, professional standards, and responsible practice principles.',
  },
  {
    icon: Lightbulb,
    title: 'Professional Development',
    description: 'Continuous learning and skill enhancement for career advancement and excellence.',
  },
]

const programFormats = [
  {
    icon: Clock,
    title: 'Live Sessions',
    description: 'Interactive real-time training with expert faculty and structured learning experiences.',
    color: 'ablr-primary',
    accentColor: 'ablr-terracotta',
  },
  {
    icon: Users,
    title: 'Cohort-Based',
    description: 'Learn alongside peers in structured cohorts with collaborative learning opportunities.',
    color: 'ablr-terracotta',
    accentColor: 'ablr-primary',
  },
  {
    icon: BookOpen,
    title: 'Practical Application',
    description: 'Hands-on exercises and real-world case studies to enhance your professional skills.',
    color: 'ablr-dark',
    accentColor: 'ablr-primary',
  },
]

export default function AppliedResearchPractice() {
  return (
    <div>
      {/* Overview */}
      <ScrollAnimation direction="up">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-ablr-primary">
            Applied Research and Practice Wing
          </h2>
          <div className="w-20 h-1 bg-ablr-primary mb-6"></div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The Applied Research and Practice Wing is dedicated to advancing research competence and evidence-based practice. Our programmes focus on developing rigorous research skills, methodological expertise, and the ability to translate research findings into practical applications.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We equip researchers, practitioners, and students with the tools and knowledge needed to conduct high-quality research, critically evaluate evidence, and contribute meaningfully to the field of applied behavioural sciences.
          </p>
        </div>
      </ScrollAnimation>

      {/* How Programmes are Designed */}
      <ScrollAnimation direction="up" delay={100}>
        <div className="bg-[#F6F7F8] rounded-2xl p-8 sm:p-12 mb-12">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
            How Programmes are Designed
          </h3>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                Our research programmes are structured to provide comprehensive training in:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ablr-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Methodological Rigor</h4>
                    <p className="text-gray-700 text-sm">Training in robust research design and methodology</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ablr-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Data Analysis</h4>
                    <p className="text-gray-700 text-sm">Advanced statistical and analytical techniques</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ablr-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Evidence Translation</h4>
                    <p className="text-gray-700 text-sm">Bridging research findings to practical application</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white rounded-xl p-8 h-full flex items-center justify-center">
                <FlaskConical size={80} className="text-ablr-primary/30" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Target Professionals */}
      <ScrollAnimation direction="up" delay={200}>
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
            Target Professionals
          </h3>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center card-elevated h-full">
                <FlaskConical size={48} className="text-ablr-primary mx-auto mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-lg mb-2 text-ablr-primary">Researchers</h4>
                <p className="text-gray-700 text-sm">Academic and practice-based researchers</p>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center card-elevated h-full">
                <BookOpen size={48} className="text-ablr-primary mx-auto mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-lg mb-2 text-ablr-primary">Students</h4>
                <p className="text-gray-700 text-sm">Graduate students and doctoral candidates</p>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center card-elevated h-full">
                <Users size={48} className="text-ablr-primary mx-auto mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-lg mb-2 text-ablr-primary">Practitioners</h4>
                <p className="text-gray-700 text-sm">Professionals seeking research skills</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Key Training Focus Areas */}
      <ScrollAnimation direction="up" delay={300}>
        <div className=" section-spacing !pb-0">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
            Key Training Focus Areas
          </h3>
          <div className="bg-gray-200 rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="space-y-5 sm:space-y-6">
              {focusAreas.map((area, index) => {
                // Color gradient from primary (purple-like) to secondary (blue-like) using ABLR colors
                const colorVariations = [
                  { bg: 'bg-ablr-primary', text: 'text-white', number: 'text-ablr-primary' }, // Focus Area 1 - Primary blue
                  { bg: 'bg-ablr-primary/90', text: 'text-white', number: 'text-ablr-primary/90' }, // Focus Area 2
                  { bg: 'bg-ablr-primary', text: 'text-white', number: 'text-ablr-secondary' }, // Focus Area 3 - Secondary blue
                  { bg: 'bg-ablr-primary/90', text: 'text-white', number: 'text-ablr-secondary/80' }, // Focus Area 4
                ]
                const colors = colorVariations[index] || colorVariations[0]
                
                return (
                  <div key={index} className="relative flex items-center gap-3 sm:gap-4 md:gap-5">
                    {/* Left: Circular Icon with Arrow */}
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${colors.bg} rounded-full flex items-center justify-center shadow-md z-10 relative`}>
                        <area.icon size={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
                      </div>
                      {/* Connecting Arrow (except for last item) */}
                      {index < focusAreas.length - 1 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 z-0">
                          <ChevronDown size={14} className="text-ablr-primary" strokeWidth={3} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    
                    {/* Focus Area Label */}
                    <div className={`${colors.bg} z-10 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 flex-shrink-0`}>
                      <span className={`${colors.text} font-bold text-xs sm:text-sm md:text-base whitespace-nowrap`}>
                        Focus Area {index + 1}
                      </span>
                    </div>
                    
                    {/* Description Text Box - White background with dark text */}
                    <div className="flex-1   md:relative md:right-20 bg-white rounded-lg px-4 py-3 sm:px-20 sm:py-3.5 md:px-20 md:py-4 min-h-[50px] sm:min-h-[80px] flex items-center shadow-sm">
                      <p className="text-gray-700 text-xs sm:text-sm md:text-xl leading-relaxed">{area.description}</p>
                    </div>
                    
                    {/* Large Number - Far right, no border */}
                    {/* <div className="flex-shrink-0">
                      <span className={`${colors.number} font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl`} style={{
                        textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 -1px 2px rgba(0, 0, 0, 0.1)',
                        lineHeight: '1',
                      }}>
                        {index + 1}
                      </span>
                    </div> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollAnimation>

   
       {/* Program Formats */}
       <ScrollAnimation direction="up" delay={400}>
        <div className=" section-spacing ">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-ablr-primary">
            Program Formats
          </h3>
          <div className="grid grid-cols-12  justify-center">
            {programFormats.map((format, index) => {
              const colorClasses = {
                'ablr-primary': {
                  bg: 'bg-ablr-primary',
                  accent: 'text-ablr-terracotta',
                  button: 'bg-ablr-terracotta',
                },
                'ablr-terracotta': {
                  bg: 'bg-ablr-terracotta',
                  accent: 'text-ablr-primary',
                  button: 'bg-ablr-primary',
                },
                'ablr-dark': {
                  bg: 'bg-ablr-dark',
                  accent: 'text-ablr-primary',
                  button: 'bg-ablr-primary',
                },
              }
              const colors = colorClasses[format.color as keyof typeof colorClasses]
              
              return (
                <div key={index} className="col-span-12 md:col-span-4 flex justify-center mb-12">
                  <div className="relative bg-white rounded-3xl card-elevated  overflow-visible w-full max-w-[320px]" style={{ paddingBottom: '20px' }}>
                    {/* Top White Section with Icon */}
                    <div className="relative bg-white rounded-t-3xl pt-10 pb-12 px-6" style={{ minHeight: '180px' }}>
                      {/* Wave Divider SVG - Concave curve */}
                      <svg 
                        className="absolute bottom-0 left-0 w-full" 
                        style={{ height: '50px' }}
                        viewBox="0 0 1200 100" 
                        preserveAspectRatio="none"
                      >
                        <path 
                          d="M 0,50 Q 200,0 400,50 T 800,50 T 1200,50 L 1200,100 L 0,100 Z" 
                          fill={format.color === 'ablr-primary' ? '#435C93' : format.color === 'ablr-terracotta' ? '#935C48' : '#602C24'}
                        />
                      </svg>
                      
                      {/* Icon with Decorative Elements */}
                      <div className="relative flex items-center justify-center h-full">
                        {/* Decorative Elements - Dots around circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-36 h-36">
                            {[...Array(16)].map((_, i) => {
                              const angle = (i * 22.5) * (Math.PI / 180)
                              const radius = 60
                              const x = 50 + Math.cos(angle) * radius
                              const y = 50 + Math.sin(angle) * radius
                              return (
                                <div
                                  key={i}
                                  className={`absolute w-2 h-2 rounded-full ${colors.accent}`}
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                />
                              )
                            })}
                          </div>
                        </div>
                        
                        {/* Circular Outline with Icon */}
                        <div className={`relative w-28 h-28 rounded-full border-4 ${colors.accent} flex items-center justify-center bg-white z-10 shadow-md`}>
                          <format.icon size={44} className={colors.accent} strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Colored Section */}
                    <div className={`relative ${colors.bg} rounded-b-3xl px-6 pt-6 pb-8 text-white`} style={{ minHeight: '20px' }}>
                      {/* Pointed Bottom - Speech bubble tail
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div 
                          className="w-0 h-0"
                          style={{ 
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderTop: `25px solid ${format.color === 'ablr-primary' ? '#435C93' : format.color === 'ablr-terracotta' ? '#935C48' : '#602C24'}`
                          }}
                        />
                      </div> */}
                      
                      <h4 className="font-bold text-2xl mb-3 text-center">{format.title}</h4>
                      <p className="text-white/90 text-sm leading-relaxed mb-6 text-center px-2">
                        {format.description}
                      </p>
                      
                   
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </ScrollAnimation>

      {/* Highlighted Programmes */}
      <ScrollAnimation direction="up" delay={500}>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary">
                Upcoming Courses
              </h3>
              <p className="text-gray-600 mt-2">Featured programmes from this wing</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {highlightedCourses.map((course, index) => (
              <div key={course.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* Page CTA */}
      <ScrollAnimation direction="up" delay={600}>
        <div className="bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-2xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our programmes or get in touch to learn more about how we can support your research journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs?filter=all"
              className="px-8 py-4 bg-white text-ablr-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>View All Programmes</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Enquire About a Course</span>
            </Link>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}


