'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [desktopPageIndex, setDesktopPageIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      name: 'Max Patrick',
      title: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.5,
      quote: 'In the fast-paced world of tech, it\'s crucial to have a creative partner who can keep up with our innovative ideas. ABLR not only kept up but exceeded our expectations. They transformed our learning approach with their fresh perspective and evidence-based methodology.',
    },
    {
      name: 'Job Gadhzi',
      title: 'CEO Glow Co',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 5.0,
      quote: 'The programmes at ABLR have been transformative for our team. The practical approach and rigorous methodology have significantly improved our professional practice. Highly recommend their training programmes.',
    },
    {
      name: 'Thomas Gala',
      title: 'Founder Zentech Wellness',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      rating: 4.5,
      quote: 'In the fast-paced world of tech, it\'s crucial to have a creative partner who can keep up with our innovative ideas. Kelola not only kept up but exceeded our expectations. They transformed our marketing campaigns with their fresh perspective and bold designs.',
    },
    {
      name: 'Casandra Mo',
      title: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      rating: 4.8,
      quote: 'ABLR\'s Applied Behaviour Analysis Foundations programme provided exactly what we needed. The instructors are knowledgeable, the content is practical, and the learning format is flexible. Excellent experience overall.',
    },
    {
      name: 'Sarah Johnson',
      title: 'Clinical Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      rating: 5.0,
      quote: 'The advanced clinical supervision training has elevated our practice standards. The evidence-based approach and real-world applications make this programme stand out. Our team has benefited tremendously.',
    },
    {
      name: 'Michael Chen',
      title: 'Research Lead',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      rating: 4.7,
      quote: 'The Research Methodology Intensive programme exceeded all expectations. The depth of content and practical applications have been invaluable for our research projects. Highly professional and well-structured.',
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
        threshold: 0.3,
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
        const nextIndex = (prev + 1) % testimonials.length
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
  }, [isMobile, testimonials.length, isSectionVisible, isUserInteracting])

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
    
    if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < testimonials.length) {
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
    
    if (scrollContainerRef.current && isMobile) {
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

  // Desktop navigation
  const itemsPerPage = 4
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  
  const currentTestimonials = isMobile 
    ? [testimonials[currentIndex]] // Show only one card on mobile
    : testimonials.slice(
        desktopPageIndex * itemsPerPage,
        desktopPageIndex * itemsPerPage + itemsPerPage
      )

  const nextSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    } else {
      setDesktopPageIndex((prev) => (prev + 1) % totalPages)
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    } else {
      setDesktopPageIndex((prev) => (prev - 1 + totalPages) % totalPages)
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
    <section ref={sectionRef} className="section-spacing bg-white relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <p className="label-small-caps text-ablr-dark/70 mb-2 text-xs sm:text-sm">Testimonials</p>
          <div className="w-16 sm:w-20 h-px bg-ablr-dark/20 mb-4"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary">
            — Our Happy Clients Say
          </h2>
        </div>

        {/* Testimonials - Carousel on mobile, Grid on desktop */}
        <div className="relative">
          {/* Mobile: Horizontal scroll with one card visible */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="md:hidden overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-4">
              {testimonials.map((testimonial, index) => {
                const isHovered = hoveredIndex === index
                
                return (
                  <div 
                    key={index}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center"
                  >
                    <ScrollAnimation direction="up" delay={index * 100}>
                      <div
                        className="relative group w-full h-[400px] rounded-[30px] overflow-hidden mx-auto"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Image Container - Always visible */}
                        <div className="absolute inset-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Gradient overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Name and Designation - Bottom Left */}
                          <div className="absolute block group-hover:hidden bottom-6 left-6 z-10">
                            <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg">
                              {testimonial.name}
                            </h3>
                            <p className="text-white/90 text-sm drop-shadow-lg">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial Card - Slides up from bottom on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-ablr-primary to-[#203b77] rounded-[30px] p-6 transition-all duration-500 flex flex-col ${
                            isHovered
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-full pointer-events-none'
                          }`}
                        >
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < Math.floor(testimonial.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : i < testimonial.rating
                                      ? 'fill-yellow-400/50 text-yellow-400/50'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-white/80">[{testimonial.rating} Rating]</span>
                          </div>

                          {/* Quote */}
                          <p className="text-white text-sm leading-relaxed mb-6 flex-1">
                            "{testimonial.quote}"
                          </p>

                          {/* Client Info at Bottom */}
                          <div className="flex items-center gap-3 mt-auto">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                            />
                            <div>
                              <h4 className="text-white font-semibold text-sm">
                                {testimonial.name}
                              </h4>
                              <p className="text-white/80 text-xs">
                                {testimonial.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop: Grid layout with 4 cards */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-4 lg:gap-6 mb-8">
            {currentTestimonials.map((testimonial, index) => {
              const globalIndex = desktopPageIndex * itemsPerPage + index
              const isHovered = hoveredIndex === globalIndex

              return (
                <div key={globalIndex} className="col-span-6 lg:col-span-3">
                  <ScrollAnimation direction="up" delay={index * 100}>
                    <div
                      className="relative group w-full h-[450px] rounded-[30px] overflow-hidden"
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Image Container - Always visible */}
                      <div className="absolute inset-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Name and Designation - Bottom Left */}
                        <div className="absolute block group-hover:hidden bottom-6 left-6 z-10">
                          <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                            {testimonial.name}
                          </h3>
                          <p className="text-white/90 text-base drop-shadow-lg">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Card - Slides up from bottom on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-ablr-primary to-[#203b77] rounded-[30px] p-6 sm:p-8 transition-all duration-500 flex flex-col ${
                          isHovered
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-full pointer-events-none'
                        }`}
                      >
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < Math.floor(testimonial.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : i < testimonial.rating
                                    ? 'fill-yellow-400/50 text-yellow-400/50'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-white/80">[{testimonial.rating} Rating]</span>
                        </div>

                        {/* Quote */}
                        <p className="text-white text-sm sm:text-base leading-relaxed mb-6 flex-1">
                          "{testimonial.quote}"
                        </p>

                        {/* Client Info at Bottom */}
                        <div className="flex items-center gap-3 mt-auto">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                          />
                          <div>
                            <h4 className="text-white font-semibold text-sm sm:text-base">
                              {testimonial.name}
                            </h4>
                            <p className="text-white/80 text-xs sm:text-sm">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              )
            })}
          </div>

          {/* Navigation - Desktop: Arrow buttons, All devices: Dot pagination */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Desktop: Arrow Navigation */}
            {!isMobile && testimonials.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={24} className="text-ablr-primary" />
                </button>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={24} className="text-ablr-primary" />
                </button>
              </div>
            )}

            {/* Dot Pagination */}
            <div className="flex items-center justify-center gap-2">
              {isMobile ? (
                // Mobile: One dot per testimonial
                testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-ablr-primary w-8' 
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))
              ) : (
                // Desktop: One dot per page/slide
                [...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setDesktopPageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === desktopPageIndex
                        ? 'bg-ablr-primary w-8' 
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

