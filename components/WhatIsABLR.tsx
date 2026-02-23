'use client'

import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollAnimation from './ScrollAnimation'
import { useRouter } from 'next/navigation'
export default function WhatIsABLR() {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 radial-overlay opacity-30"></div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Heading Section - Mobile: First, Desktop: Inside grid */}
        <div className="mb-6 sm:mb-8 lg:mb-0 lg:hidden">
          <ScrollAnimation direction="up">
            <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">About</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary">
              What is The Method Lab?
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-primary/30 relative">
              <div className="absolute left-0 top-0 h-full bg-ablr-primary transition-all duration-1000" style={{ width: '100%' }}></div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left text content */}
          <div className="col-span-12 lg:col-span-6 order-3 lg:order-1">
            <ScrollAnimation direction="up">
              {/* Heading Section - Desktop Only */}
              <div className="hidden lg:block mb-6 sm:mb-8">
                <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">About</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 text-ablr-primary">
                  What is The Method Lab?
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-primary/30 mb-4 sm:mb-6 md:mb-8 relative">
                  <div className="absolute left-0 top-0 h-full bg-ablr-primary transition-all duration-1000" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
              The Method Lab is a professional training and capacity-building initiative dedicated to strengthening 
              applied practice and research competence across behavioural and health sciences. 
              It was established to address a persistent gap between
               theoretical training and the real-world demands of professional practice and research.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
              Through advanced training in evidence-based practice and research methodology, we equip professionals, students and institutions 
              with the applied competence required in contemporary clinical, public health and research environments.
              </p>
              
              {/* {expanded && (
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base md:text-lg text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                    ABLR responds to this gap through structured, skills-focused programmes that are rigorous, practical, and grounded in evidence. ABLR's programmes are faculty-led and developed in collaboration with researchers and practitioners from diverse professional and cultural contexts.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                    Instruction is delivered in structured modular formats, with delivery models adapted to the aims and requirements of each programme. Across both wings, ABLR prioritises clarity, rigour, and relevance. Its focus is not on broad survey instruction, but on strengthening professional judgement, supporting ethical and methodologically sound work, and improving practice quality in real-world human contexts.
                  </p>
                </div>
              )} */}
              
              {/* Animated Read More link */}
              <button 
                onClick={() => router.push('/about')}
                className="mt-4 sm:mt-6 md:mt-8 text-ablr-primary font-semibold flex items-center gap-2 sm:gap-3 group underline-animate text-sm sm:text-base"
              >
                <span>{expanded ? 'Read Less' : 'Read More'}</span>
                <ArrowRight 
                  size={16} 
                  className={`sm:w-[18px] sm:h-[18px] transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                />
              </button>
            </ScrollAnimation>
          </div>
          
          {/* Right: Image */}
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative order-2 lg:order-2 mb-6 lg:mb-0">
            <ScrollAnimation direction="up" delay={200}>
              <div className="relative w-full max-w-[400px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[500px]">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-ablr-primary/20 to-ablr-dark/20 rounded-2xl transform rotate-3"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/about-image.png"
                    alt="The Method Lab - Applied Practice & Research"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
