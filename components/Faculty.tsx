'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function Faculty() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const faculty = [
    {
      name: 'Dr. Ananya Mehta',
      title: 'Director of Clinical Training',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/ananya-mehta',
    },
    {
      name: 'Dr. John Smith',
      title: 'Senior Research Fellow',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/john-smith',
    },
    {
      name: 'Dr. Emily Martinez',
      title: 'Lead Faculty',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/emily-martinez',
    },
    {
      name: 'Dr. Michael Chen',
      title: 'Research Methodology ',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/michael-chen',
    },
    {
      name: 'Dr. Sarah Johnson',
      title: 'Clinical Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
    },
    {
      name: 'Dr. David Williams',
      title: 'Senior Faculty',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/david-williams',
    },
    {
      name: 'Dr. Lisa Anderson',
      title: 'Lead Researcher',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/lisa-anderson',
    },
    {
      name: 'Dr. Robert Taylor',
      title: 'Clinical Supervisor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      linkedin: 'https://linkedin.com/in/robert-taylor',
    },
  ]

  // Always show 4 cards on desktop, responsive on smaller screens
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 768) return 4 // md and above: always 4 cards
      if (window.innerWidth >= 640) return 2 // sm: 2 cards
      return 1 // mobile: 1 card
    }
    return 4 // default: 4 cards
  }

  const [cardsPerView, setCardsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView())
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, faculty.length - cardsPerView)

  // Reset currentIndex if it's out of bounds when cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [cardsPerView, maxIndex, currentIndex])

  const next = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev >= maxIndex ? 0 : prev + 1
        return newIndex
      })
      setIsTransitioning(false)
    }, 300)
  }

  const prev = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev <= 0 ? maxIndex : prev - 1
        return newIndex
      })
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="faculty" className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">Faculty</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Faculty & Collaborators
          </h2>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          <ScrollAnimation direction="up">
            {/* Carousel Wrapper */}
            <div className="overflow-hidden -mx-2 sm:-mx-3 md:-mx-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / Math.max(cardsPerView, 1))}%)` }}
              >
                {faculty.map((member, index) => (
                  <div 
                    key={index} 
                    className="w-full sm:w-1/2 md:w-1/4 px-2 sm:px-3 md:px-4 flex-shrink-0"
                  >
                    <div 
                      className="relative rounded-lg overflow-hidden card-elevated h-[350px] sm:h-[350px] md:h-[400px] group cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover "
                        />
                      </div>
                      
                      {/* White Section at Bottom with Wave Top */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-white"
                        style={{ 
                          height: '40%',
                          clipPath: 'polygon(0% 15%, 10% 10%, 20% 15%, 30% 8%, 40% 15%, 50% 10%, 60% 15%, 70% 8%, 80% 15%, 90% 10%, 100% 15%, 100% 100%, 0% 100%)'
                        }}
                      ></div>
                      
                      {/* LinkedIn Link Overlay - Appears on Hover */}
                      <div 
                        className={`absolute inset-0 bg-ablr-primary/90 flex items-center justify-center transition-all duration-300 z-20 ${
                          hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full h-full group/link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin 
                            size={48} 
                            className="sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] text-white group-hover/link:scale-110 transition-transform duration-300" 
                          />
                        </a>
                      </div>
                      
                      {/* Name and Designation at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                        <h3 className="text-ablr-primary text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-sans">
                          {member.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
              <button 
                onClick={prev}
                disabled={currentIndex === 0}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-ablr-primary/30 hover:border-ablr-primary hover:bg-ablr-primary/5 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous faculty members"
              >
                <ChevronLeft size={20} className="sm:w-[24px] sm:h-[24px] text-ablr-primary" />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2 sm:gap-3">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setCurrentIndex(index)
                        setIsTransitioning(false)
                      }, 300)
                    }}
                    className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-ablr-primary w-6 sm:w-8' : 'bg-gray-300 hover:bg-gray-400 w-2.5 sm:w-3'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={next}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-ablr-primary/30 hover:border-ablr-primary hover:bg-ablr-primary/5 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next faculty members"
              >
                <ChevronRight size={20} className="sm:w-[24px] sm:h-[24px] text-ablr-primary" />
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
