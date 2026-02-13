'use client'

import { Shield, FlaskConical, BookOpen, Scale } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'
import { useEffect, useState, useRef } from 'react'

function CountUpNumber({ number, label }: { number: string; label: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const numValue = parseInt(number.replace('+', ''))
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          
          const duration = 2000
          const steps = 60
          const increment = numValue / steps
          const stepDuration = duration / steps

          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= numValue) {
              setCount(numValue)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, stepDuration)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [numValue, hasStarted])

  return (
    <div ref={countRef} className="text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-ablr-primary mb-3 sm:mb-4 font-serif">
        {count}{number.includes('+') ? '+' : ''}
      </div>
      <div className="w-12 sm:w-14 md:w-16 h-px bg-ablr-primary/30 mx-auto mb-2 sm:mb-3"></div>
      <div className="text-sm sm:text-base text-gray-600 font-sans px-2">{label}</div>
    </div>
  )
}

export default function WhyABLRIsDifferent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: Shield,
      title: 'Rigour',
      description: 'Every programme grounded in systematic, evidence-based methodology.',
    },
    {
      icon: FlaskConical,
      title: 'Practice',
      description: 'Real-world application at the core of all learning pathways.',
    },
    {
      icon: BookOpen,
      title: 'Research',
      description: 'Advancing the science of behavioural practice through inquiry.',
    },
    {
      icon: Scale,
      title: 'Evidence',
      description: 'Decision-making anchored in empirical data and professional standards.',
    },
  ]

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect when section is visible in viewport
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting && entry.intersectionRatio > 0.3)
      },
      { 
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px'
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-scroll on mobile - only when section is visible and user is not interacting
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current || !isSectionVisible || isUserInteracting) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % features.length
        // Scroll to the next card
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const cardElement = container.querySelector(`[data-card-index="${nextIndex}"]`) as HTMLElement
          if (cardElement) {
            cardElement.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            })
          }
        }
        return nextIndex
      })
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [isMobile, features.length, isSectionVisible, isUserInteracting])

  // Track user interaction timeout
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle manual scroll on mobile
  const handleScroll = () => {
    if (!scrollContainerRef.current || !isMobile) return
    
    // Mark that user is interacting
    setIsUserInteracting(true)
    
    // Clear existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    
    // Reset interaction flag after 5 seconds of no interaction
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000)
    
    const container = scrollContainerRef.current
    const cards = container.querySelectorAll('[data-card-index]')
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2
    
    let closestIndex = 0
    let closestDistance = Infinity
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const distance = Math.abs(containerCenter - cardCenter)
      
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    
    if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < features.length) {
      setCurrentIndex(closestIndex)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [])

  // Handle dot click
  const handleDotClick = (index: number) => {
    setIsUserInteracting(true)
    setCurrentIndex(index)
    
    // Clear existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    
    // Reset interaction flag after 5 seconds
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000)
    
    if (scrollContainerRef.current) {
      const cardElement = scrollContainerRef.current.querySelector(`[data-card-index="${index}"]`) as HTMLElement
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }

  return (
    <section ref={sectionRef} className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
      {/* Slight curved background section */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">WHAT SETS US APART</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Why ABLR is Different
          </h2>
        </div>
        
        {/* Stats with animated count-up */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <ScrollAnimation direction="up">
              <CountUpNumber number="50+" label="Years Combined Faculty Experience" />
            </ScrollAnimation>
          </div>
          <div className="col-span-12 md:col-span-4">
            <ScrollAnimation direction="up" delay={100}>
              <CountUpNumber number="30+" label="Programmes Delivered" />
            </ScrollAnimation>
          </div>
          <div className="col-span-12 md:col-span-4">
            <ScrollAnimation direction="up" delay={200}>
              <CountUpNumber number="12+" label="Professional Disciplines Engaged" />
            </ScrollAnimation>
          </div>
        </div>
        
        {/* 4 principle cards - horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Mobile: Horizontal scroll with snap */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="md:hidden overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  data-card-index={index}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center"
                >
                  <ScrollAnimation direction="up" delay={index * 100}>
                    <div className="group bg-white border border-gray-200/50 rounded-lg p-6 text-center h-[280px] card-elevated relative overflow-hidden flex flex-col mx-auto">
                      {/* Border accent animate from bottom on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-0 bg-ablr-primary group-hover:h-1 transition-all duration-500"></div>
                      
                      {/* Center icon with soft inner glow */}
                      <div className="mb-6 flex justify-center flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-ablr-primary/5 flex items-center justify-center group-hover:bg-ablr-primary/10 transition-colors duration-500 relative">
                          <feature.icon className="text-ablr-primary" size={32} strokeWidth={1.5} />
                          <div className="absolute inset-0 rounded-full bg-ablr-primary/0 group-hover:bg-ablr-primary/10 blur-lg transition-all duration-500"></div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-ablr-primary font-sans flex-shrink-0">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-[90%] mx-auto flex-1 flex items-center justify-center">{feature.description}</p>
                    </div>
                  </ScrollAnimation>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-6">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="group bg-white border border-gray-200/50 rounded-lg p-8 md:p-10 text-center h-[300px] md:h-[320px] card-elevated relative overflow-hidden flex flex-col">
                  {/* Border accent animate from bottom on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0 bg-ablr-primary group-hover:h-1 transition-all duration-500"></div>
                  
                  {/* Center icon with soft inner glow */}
                  <div className="mb-6 flex justify-center flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-ablr-primary/5 flex items-center justify-center group-hover:bg-ablr-primary/10 transition-colors duration-500 relative">
                      <feature.icon className="text-ablr-primary" size={32} strokeWidth={1.5} />
                      <div className="absolute inset-0 rounded-full bg-ablr-primary/0 group-hover:bg-ablr-primary/10 blur-lg transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-ablr-primary font-sans flex-shrink-0">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-[90%] mx-auto flex-1 flex items-center justify-center">{feature.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Mobile: Dot Pagination */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-ablr-primary w-8' 
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
