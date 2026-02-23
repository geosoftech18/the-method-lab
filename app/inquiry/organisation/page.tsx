'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Building2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function OrganisationEnquiryPage() {
  const [formData, setFormData] = useState({
    organisationType: '',
    areaOfInterest: '',
    contactPerson: '',
    email: '',
    phone: '',
    bestTime: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/inquiry/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'organisation',
          formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ organisationType: '', areaOfInterest: '', contactPerson: '', email: '', phone: '', bestTime: '' })
        }, 5000)
      } else {
        setError(result.error || 'Failed to submit form. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <section className="relative bg-white pt-8 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-ablr-terracotta/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <Link href="/inquiry" className="inline-flex items-center gap-2 text-ablr-primary hover:text-ablr-dark mb-8 transition-colors duration-300">
            <ArrowLeft size={20} />
            <span>Back to Enquiry Options</span>
          </Link>
          
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-ablr-terracotta/10 rounded-full flex items-center justify-center">
                  <Building2 size={32} className="text-ablr-terracotta" />
                </div>
                <div>
                  <p className="label-small-caps text-ablr-dark/70 mb-2 text-sm">Institutional Enquiry</p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ablr-terracotta leading-tight">
                    Enquire (Organisation)
                  </h1>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-2xl">
                Explore training, research, or evaluation opportunities for your organization. Fill out the form below and we'll connect with you.
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
                    <h3 className="text-2xl font-serif font-bold mb-2 text-ablr-terracotta">Enquiry Submitted!</h3>
                    <p className="text-gray-700">We'll get back to you soon. Check your email for confirmation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="organisationType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Organisation Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="organisationType"
                        name="organisationType"
                        value={formData.organisationType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select organisation type</option>
                        <option value="academic">Academic Institution</option>
                        <option value="healthcare">Healthcare System</option>
                        <option value="ngo">NGO / Non-profit</option>
                        <option value="corporate">Corporate</option>
                        <option value="government">Government</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="areaOfInterest" className="block text-sm font-semibold text-gray-700 mb-2">
                        Area of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="areaOfInterest"
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select area of interest</option>
                        <option value="training">Training</option>
                        <option value="research">Research</option>
                        <option value="evaluation">Evaluation</option>
                        <option value="training-research">Training & Research</option>
                        <option value="all">All of the above</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300"
                        placeholder="Enter contact person's name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300"
                        placeholder="contact@organisation.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mobile/Telephone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300"
                        placeholder="+91 123 456 7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="bestTime" className="block text-sm font-semibold text-gray-700 mb-2">
                        Best Time to Call <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="bestTime"
                        name="bestTime"
                        value={formData.bestTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-terracotta focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select a time</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-ablr-terracotta text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-terracotta/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Submitting...' : 'Submit Enquiry'}
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


