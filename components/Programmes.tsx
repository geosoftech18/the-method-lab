'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function Programmes() {
  const [activeTab, setActiveTab] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const tabs = ['All', 'Applied Behaviour Analysis', 'Research & Evaluation']

  const programmes = [
    {
      type: 'Intensive Training',
      title: 'Applied Behaviour Analysis Foundations',
      description: 'Foundational programme covering core ABA principles and their application.',
      duration: '8 weeks',
      format: 'Online',
      category: 'Applied Behaviour Analysis',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    },
    {
      type: 'Advanced Clinical',
      title: 'Advanced Clinical Supervision',
      description: 'Advanced skills for effective supervision and mentorship in ABA.',
      duration: '6 weeks',
      format: 'Online',
      category: 'Applied Behaviour Analysis',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
    },
    {
      type: 'Research & Evaluation',
      title: 'Research Methodology Intensive',
      description: 'Deep dive into research design, data analysis, and ethical considerations.',
      duration: '10 weeks',
      format: 'Online',
      category: 'Research & Evaluation',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    },
    {
      type: 'Ethical Practice',
      title: 'Ethical Practice in ABA',
      description: 'Comprehensive course on ethical decision-making and professional conduct.',
      duration: '4 weeks',
      format: 'Online',
      category: 'Applied Behaviour Analysis',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    },
  ]

  const filteredProgrammes = activeTab === 'All' 
    ? programmes 
    : programmes.filter(p => p.category === activeTab)

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
        threshold: 0.3,
        rootMargin: '0px'
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Reset current index when tab changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  // Auto-scroll on mobile - only when section is visible and user is not interacting
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current || !isSectionVisible || isUserInteracting || filteredProgrammes.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % filteredProgrammes.length
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
  }, [isMobile, filteredProgrammes.length, isSectionVisible, isUserInteracting])

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
    
    if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < filteredProgrammes.length) {
      setCurrentIndex(closestIndex)
    }
  }

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="programmes" className="section-spacing bg-white relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">Our Offerings</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-dark/90 mb-4 sm:mb-6">
            Current & Upcoming Programmes
          </h2>
        </div>
        
        {/* Premium filtering tabs with animated underline */}
        <div className="overflow-x-auto scrollbar-hide mb-10 sm:mb-12 md:mb-16 -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
          <div className="flex flex-nowrap justify-center md:justify-center gap-3 sm:gap-4 md:gap-6 min-w-max md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 whitespace-nowrap flex-shrink-0"
              >
                <span className={activeTab === tab ? 'text-ablr-dark' : 'text-gray-600 hover:text-ablr-dark'}>
                  {tab}
                </span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ablr-dark transition-all duration-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Cards - Carousel on mobile, Grid on desktop */}
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
              {filteredProgrammes.map((programme, index) => (
                <div 
                  key={index}
                  data-card-index={index}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center"
                >
                  <ScrollAnimation direction="up" delay={index * 100}>
                    <div className="group card-elevated bg-ablr-dark rounded-lg p-6 h-[350px] relative overflow-hidden flex flex-col mx-auto">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 hidden group-hover:block bg-cover bg-center"
                        style={{ backgroundImage: `url(${programme.image})` }}
                      ></div>
                      
                      {/* Gradient Overlay for text readability */}
                      <div className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-br from-ablr-dark via-ablr-dark/85 to-ablr-secondary/5"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Top category badge */}
                        <div className="label-small-caps text-white/90 mb-3 text-xs">{programme.type}</div>
                        
                        {/* Elegant serif title */}
                        <h3 className="text-xl font-serif font-bold mb-3 text-white leading-tight">
                          {programme.title}
                        </h3>
                        
                        {/* Divider line */}
                        <div className="w-10 h-px bg-white/30 mb-4"></div>
                        
                        {/* Description - flex-1 to take available space */}
                        <p className="text-white/90 mb-4 text-sm leading-relaxed flex-1">
                          {programme.description}
                        </p>
                        
                        {/* Program meta in small caps */}
                        <div className="label-small-caps text-white/80 mb-4 flex items-center gap-2 text-xs">
                          <span>{programme.duration}</span>
                          <span>•</span>
                          <span>{programme.format}</span>
                        </div>
                        
                        {/* CTA arrow animated */}
                        <a href="#" className="inline-flex items-center gap-2 text-white font-semibold underline-animate group/link text-sm mt-auto">
                          <span>View Details</span>
                          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-4 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
            {filteredProgrammes.map((programme, index) => (
              <div key={index} className="col-span-6 lg:col-span-3">
                <ScrollAnimation direction="up" delay={index * 100}>
                  <div className="group card-elevated rounded-lg p-6 sm:p-8 h-[380px] md:h-[400px] relative overflow-hidden flex flex-col">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 hidden group-hover:block bg-cover bg-center"
                      style={{ backgroundImage: `url(${programme.image})` }}
                    ></div>
                    
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-br from-ablr-dark via-ablr-dark/90 to-ablr-dark"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top category badge */}
                      <div className="label-small-caps text-white/90 mb-3 sm:mb-4 text-xs sm:text-sm">{programme.type}</div>
                      
                      {/* Elegant serif title */}
                      <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-white leading-tight">
                        {programme.title}
                      </h3>
                      
                      {/* Divider line */}
                      <div className="w-10 sm:w-12 h-px bg-white/30 mb-4 sm:mb-6"></div>
                      
                      {/* Description - flex-1 to take available space */}
                      <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed flex-1">
                        {programme.description}
                      </p>
                      
                      {/* Program meta in small caps */}
                      <div className="label-small-caps text-white/80 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <span>{programme.duration}</span>
                        <span>•</span>
                        <span>{programme.format}</span>
                      </div>
                      
                      {/* CTA arrow animated */}
                      <a href="#" className="inline-flex items-center gap-2 sm:gap-3 text-white font-semibold underline-animate group/link text-sm sm:text-base mt-auto">
                        <span>View Details</span>
                        <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover/link:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            ))}
          </div>

          {/* Mobile: Dot Pagination */}
          {filteredProgrammes.length > 0 && (
            <div className="md:hidden flex justify-center items-center gap-2 my-4">
              {filteredProgrammes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-ablr-dark/80 w-8' 
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to programme ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <button className="magnetic-button bg-ablr-dark text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-sm hover:bg-ablr-dark/95 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto">
            View All Programmes
          </button>
        </div>
      </div>
    </section>
  )
}
