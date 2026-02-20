'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    programme: '',
    role: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [programmeOptions, setProgrammeOptions] = useState<string[]>([])

  const baseProgrammes = [
    'Applied Learning and Training Programme',
    'Applied Research and Practice Programme',
    'Clinical Training Programme',
    'Research Methodology Course',
    'Professional Development Workshop',
  ]

  // Pre-select course from URL parameters and update options
  useEffect(() => {
    const courseName = searchParams.get('courseName')
    
    if (courseName) {
      const decodedCourseName = decodeURIComponent(courseName)
      // Check if the course name exists in the programmes list
      const matchingProgramme = baseProgrammes.find(prog => 
        prog.toLowerCase() === decodedCourseName.toLowerCase() ||
        decodedCourseName.toLowerCase().includes(prog.toLowerCase()) ||
        prog.toLowerCase().includes(decodedCourseName.toLowerCase())
      )
      
      // If found, use the matching programme; otherwise, use the course name directly
      const selectedProgramme = matchingProgramme || decodedCourseName
      
      // Update programme options - add course name if it's not in the base list
      if (decodedCourseName && !baseProgrammes.includes(decodedCourseName)) {
        setProgrammeOptions([...baseProgrammes, decodedCourseName])
      } else {
        setProgrammeOptions(baseProgrammes)
      }
      
      // Pre-select the programme
      setFormData(prev => ({
        ...prev,
        programme: selectedProgramme
      }))
    } else {
      // No course name in URL, just use base programmes
      setProgrammeOptions(baseProgrammes)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', programme: '', role: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <Link href="/inquiry" className="inline-flex items-center gap-2 text-ablr-primary hover:text-ablr-dark mb-8 transition-colors duration-300">
            <ArrowLeft size={20} />
            <span>Back to Enquiry Options</span>
          </Link>
          
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap size={32} className="text-ablr-primary" />
                </div>
                <div>
                  <p className="label-small-caps text-ablr-dark/70 mb-2 text-sm">Request an Application</p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ablr-primary leading-tight">
                    Apply to a Programme
                  </h1>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-2xl">
                Ready to take the next step? Fill out the form below to request an application form for your chosen programme.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-spacing bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl mx-auto">
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white rounded-2xl p-8 sm:p-12 card-elevated">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold mb-2 text-ablr-primary">Application Request Submitted!</h3>
                    <p className="text-gray-700">We'll send you the application form shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="programme" className="block text-sm font-semibold text-gray-700 mb-2">
                        Programme of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="programme"
                        name="programme"
                        value={formData.programme}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select a programme</option>
                        {programmeOptions.map((prog, index) => (
                          <option key={index} value={prog}>
                            {prog}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Role / Background <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell us about your current role and professional background"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ablr-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300"
                    >
                      Request Application Form
                    </button>
                  </form>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


