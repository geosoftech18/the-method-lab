'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <ScrollAnimation direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label-small-caps text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Stay Connected</p>
            
            {/* Elegant serif headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6 md:mb-8">
              Receive updates from ABLR
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
              Programmes announcements, new research, and professional development insights.
            </p>
            
            {/* Luxury minimal form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto border-b-2 border-gray-300 focus-within:border-ablr-primary transition-colors duration-300 px-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-transparent focus:outline-none text-sm sm:text-base md:text-lg placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="magnetic-button bg-ablr-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 hover:bg-ablr-dark transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <span>Subscribe</span>
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
