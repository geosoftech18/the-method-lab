'use client'

import { useState, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Users, ArrowLeft, CheckCircle2, Upload } from 'lucide-react'
import Link from 'next/link'

export default function TeachPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData, resume)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setResume(null)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  const handleFileRemove = () => {
    setResume(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ablr-brown/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <Link href="/inquiry" className="inline-flex items-center gap-2 text-ablr-primary hover:text-ablr-dark mb-8 transition-colors duration-300">
            <ArrowLeft size={20} />
            <span>Back to Enquiry Options</span>
          </Link>
          
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-ablr-brown/10 rounded-full flex items-center justify-center">
                  <Users size={32} className="text-ablr-brown" />
                </div>
                <div>
                  <p className="label-small-caps text-ablr-dark/70 mb-2 text-sm">Teaching Enquiry</p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ablr-brown leading-tight">
                    Collaborate or Teach with ABLR
                  </h1>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-2xl">
                Join our community of experts and contribute to advancing applied practice and research. Share your expertise with us.
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
                    <h3 className="text-2xl font-serif font-bold mb-2 text-ablr-brown">Enquiry Submitted!</h3>
                    <p className="text-gray-700">We'll review your application and get back to you soon.</p>
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-brown focus:outline-none transition-colors duration-300"
                        placeholder="Enter your full name"
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-brown focus:outline-none transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-brown focus:outline-none transition-colors duration-300"
                        placeholder="+91 123 456 7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-brown focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell us about your expertise, experience, and how you'd like to collaborate with ABLR"
                      />
                    </div>

                    <div>
                      <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                        Resume Upload
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            id="resume"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-ablr-brown transition-colors duration-300"
                          >
                            <Upload size={20} className="text-ablr-brown" />
                            <span className="text-gray-700">Choose File</span>
                          </label>
                          {resume && (
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <span>{resume.name}</span>
                              <button
                                type="button"
                                onClick={handleFileRemove}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ablr-brown text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-brown/90 transition-colors duration-300"
                    >
                      Submit Enquiry
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


