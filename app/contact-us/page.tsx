'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react'

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
          formType: 'contact',
          formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@ablr.org',
      link: 'mailto:info@ablr.org',
      color: 'ablr-primary',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 123 456 7890',
      link: 'tel:+911234567890',
      color: 'ablr-terracotta',
      gradient: 'from-ablr-terracotta to-ablr-terracotta/90',
    },
    {
      icon: MessageCircle,
      title: 'Whatsapp',
      content: '+91 9876543210',
      link: 'https://wa.me/919876543210',
      color: 'ablr-terracotta',
      gradient: 'from-green-500 to-green-600',
    },
  ]

  const socialMedia = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://linkedin.com/company/ablr',
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      link: 'https://twitter.com/ablr',
      gradient: 'from-sky-400 to-sky-500',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      link: 'https://facebook.com/ablr',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://instagram.com/ablr',
      gradient: 'from-pink-500 via-purple-500 to-orange-500',
    },
  ]

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <p className="label-small-caps text-white/80 mb-4 text-sm sm:text-base">Get in Touch</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Have questions or want to learn more? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Information & Social Media Cards */}
      <section className="section-spacing bg-gradient-to-b from-white to-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Header */}
          <ScrollAnimation direction="up">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-ablr-primary">
                Get in Touch
              </h2>
              <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
                Reach out to us through any of these channels. We're here to help!
              </p>
            </div>
          </ScrollAnimation>

          {/* Contact Information Cards */}
          <div className="mb-12 sm:mb-16">
            
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4">
                  <ScrollAnimation direction="up" delay={index * 100}>
                    <a
                      href={info.link}
                      className="group relative block bg-white rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 h-full overflow-hidden border border-gray-100 hover:border-ablr-primary/30"
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        {/* Icon Container */}
                        <div className="relative mb-6">
                          <div 
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${info.gradient} shadow-lg`}
                          >
                            <info.icon 
                              size={32} 
                              className="text-white transition-transform duration-500"
                              strokeWidth={2.5} 
                            />
                          </div>
                          {/* Decorative Element */}
                          <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${info.gradient} rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500`}></div>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 text-ablr-primary group-hover:text-ablr-dark transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {info.content}
                        </p>
                        
                        {/* Hover Arrow */}
                        <div className="mt-4 flex items-center gap-2 text-ablr-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                          <span className="text-sm font-semibold">Contact</span>
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </a>
                  </ScrollAnimation>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      

      {/* Contact Form Section */}
      <section className="mb-12 sm:mb-16 bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <ScrollAnimation direction="up">
                <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 card-elevated">
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-ablr-primary">
                      Send us a Message
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg">
                      Fill out the form below and we'll respond within 24-48 hours.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-serif font-bold mb-2 text-ablr-primary">Message Sent!</h3>
                      <p className="text-gray-700">We'll get back to you soon. Check your email for confirmation.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
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
                            placeholder="Your full name"
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
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
                      </div>

                      <div className="grid grid-cols-12 gap-6">
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
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300"
                            placeholder="+91 123 456 7890"
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300 bg-white"
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="programmes">Programmes Information</option>
                            <option value="admissions">Admissions</option>
                            <option value="partnership">Partnership Opportunities</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors duration-300 resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ablr-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{loading ? 'Sending...' : 'Send Message'}</span>
                        {!loading && <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollAnimation>
            </div>

            {/* Additional Information */}
            <div className="col-span-12 lg:col-span-5">
              <ScrollAnimation direction="up" delay={200}>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-8 card-elevated">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-ablr-primary">
                      Why Contact Us?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Get detailed information about our programmes and training opportunities
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Discuss partnership and collaboration opportunities
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Receive guidance on which programme best fits your needs
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Learn about upcoming events, workshops, and webinars
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* Social Media Section */}
                  <div className="bg-white rounded-2xl p-8 card-elevated">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-ablr-primary">
                      Follow Us
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      Connect with us on social media for updates, insights, and the latest news.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-3 bg-[#F6F7F8] rounded-xl p-4 hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent"
                        >
                          {/* Gradient Background on Hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                          
                          <div className="relative z-10 flex items-center gap-3 w-full">
                            {/* Icon */}
                            <div 
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${social.gradient} shadow-md flex-shrink-0`}
                            >
                              <social.icon 
                                size={20} 
                                className="text-white transition-transform duration-300"
                                strokeWidth={2.5} 
                              />
                            </div>
                            
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                              {social.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-4">
                      Quick Response
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-6">
                      We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Clock size={18} />
                      <span>Response Time: 24-48 hours</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

