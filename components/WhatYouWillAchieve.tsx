'use client'

import { Check } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'
import { useEffect, useState, useRef } from 'react'

function AnimatedCheck({ isVisible }: { isVisible: boolean }) {
  const [drawn, setDrawn] = useState(false)
  
  useEffect(() => {
    if (isVisible && !drawn) {
      const timer = setTimeout(() => setDrawn(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, drawn])

  return (
    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-500 relative">
      <svg width="20" height="20" viewBox="0 0 20 20" className="absolute">
        <path
          d="M4 10 L8 14 L16 6"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={drawn ? "0" : "20"}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
    </div>
  )
}

export default function WhatYouWillAchieve() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, index])
          }
        },
        { threshold: 0.3 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs) => obs?.disconnect())
    }
  }, [])

  const achievements = [
    'Applied Professional Competence: Translate evidence into action with confidence — implementing research-informed strategies across clinical, educational, public health and community settings.',
    'Methodological Rigour: Design, evaluate and interpret research with clarity, strengthening your ability to conduct scientifically robust and ethically sound inquiry.',
    'Informed Clinical & Professional Judgement: Strengthen decision-making through structured frameworks grounded in behavioural science, evidence-based practice and systems thinking.',
    'Measurable Impact: Move beyond theory to implement interventions, evaluations and professional practices that produce observable and defensible outcomes.',
    'Institutional & Career Advancement: Enhance your professional credibility and contribute meaningfully to institutional standards, faculty development and research excellence.',
  ]

  return (
    <section className="section-spacing bg-ablr-primary text-white relative overflow-hidden">
      {/* Floating blurred shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Parallax background circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-white/5 rounded-full"></div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left large heading */}
          <div className="col-span-12 lg:col-span-5">
            <ScrollAnimation direction="right">
              <p className="label-small-caps text-white/70 mb-4 sm:mb-6 text-xs sm:text-sm">Our Promise</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
                What You Will Achieve
              </h2>
            </ScrollAnimation>
          </div>
          
          {/* Right checklist grid */}
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-4 sm:space-y-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  ref={(el) => { itemRefs.current[index] = el }}
                  className="flex items-start group"
                >
                  <ScrollAnimation direction="left" delay={index * 100} className='flex items-start group'>
                    {/* Animated check mark draw */}
                    <div className="mr-4 sm:mr-6 mt-1 flex-shrink-0">
                      <AnimatedCheck isVisible={visibleItems.includes(index)} />
                    </div>
                    <span className="text-base sm:text-lg md:text-xl leading-relaxed flex-1">{achievement}</span>
                  </ScrollAnimation>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
