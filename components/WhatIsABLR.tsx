'use client'

import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollAnimation from './ScrollAnimation'

export default function WhatIsABLR() {
  const [expanded, setExpanded] = useState(false)

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
              What is ABLR?
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
                  What is ABLR?
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-primary/30 mb-4 sm:mb-6 md:mb-8 relative">
                  <div className="absolute left-0 top-0 h-full bg-ablr-primary transition-all duration-1000" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                ABLR Centre (<span className="text-ablr-primary font-semibold">Applied Behavioural Learning and Research</span>) is a professional training and capacity-building initiative by Hopscotch Child Therapy, designed to strengthen applied practice and research competence across the behavioural and social sciences.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                ABLR was established to address a persistent gap between theoretical knowledge and real-world professional demands. While formal training often provides strong conceptual foundations, many educators and practising professionals report limited preparation in translating theory into effective practice, professional judgement, and methodologically sound research.
              </p>
              
              {expanded && (
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base md:text-lg text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                    ABLR responds to this gap through structured, skills-focused programmes that are rigorous, practical, and grounded in evidence. ABLR's programmes are faculty-led and developed in collaboration with researchers and practitioners from diverse professional and cultural contexts.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-ablr-olive leading-relaxed max-w-full sm:max-w-[95%]">
                    Instruction is delivered in structured modular formats, with delivery models adapted to the aims and requirements of each programme. Across both wings, ABLR prioritises clarity, rigour, and relevance. Its focus is not on broad survey instruction, but on strengthening professional judgement, supporting ethical and methodologically sound work, and improving practice quality in real-world human contexts.
                  </p>
                </div>
              )}
              
              {/* Animated Read More link */}
              <button 
                onClick={() => setExpanded(!expanded)}
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
          
          {/* Right: Massive abstract layered circular structure */}
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative order-2 lg:order-2 mb-6 lg:mb-0">
            <ScrollAnimation direction="up" delay={200}>
              <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
                {/* Outer ring with blur */}
                <div className="absolute inset-0 border-2 border-ablr-primary/10 rounded-full blur-sm"></div>
                <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-ablr-primary/15 rounded-full"></div>
                <div className="absolute inset-8 sm:inset-12 md:inset-16 border border-ablr-primary/20 rounded-full"></div>
                
                {/* Center embossed ABLR watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-ablr-primary opacity-5 select-none" style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    ABLR
                  </div>
                </div>
                
                {/* Floating micro-particles */}
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ablr-primary/20 rounded-full"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-ablr-primary/15 rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ablr-primary/20 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-ablr-primary/15 rounded-full"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
