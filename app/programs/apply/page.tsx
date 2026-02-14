'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('course')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    courseInterest: courseId || '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // In production, this would send data to an API
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      <section className="section-spacing bg-white">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <Link
            href={courseId ? `/programs/course/${courseId}` : '/programs'}
            className="inline-flex items-center gap-2 text-ablr-primary hover:gap-4 transition-all duration-300 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <div className="max-w-3xl mx-auto">
            <ScrollAnimation direction="up">
              <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-ablr-primary">
                  Request an Application
                </h1>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and we'll get back to you with application details
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 card-elevated">
                <div className="grid grid-cols-12 gap-6 mb-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                      Role/Position
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="courseInterest" className="block text-sm font-semibold text-gray-700 mb-2">
                    Course of Interest *
                  </label>
                  <select
                    id="courseInterest"
                    name="courseInterest"
                    required
                    value={formData.courseInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select a course</option>
                    <option value="1">Applied Behaviour Analysis Foundations</option>
                    <option value="2">Advanced Clinical Supervision</option>
                    <option value="3">Research Methodology Intensive</option>
                    <option value="4">Ethical Practice in ABA</option>
                    <option value="5">Data Analysis for Behavioural Research</option>
                    <option value="6">Organizational Training in ABA</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your interest or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  <span>Submit Application Request</span>
                </button>
              </form>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


