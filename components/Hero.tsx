'use client'

import { ChevronDown } from 'lucide-react'
import { CirclePattern } from './DecorativeElements'
import { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/navigation'
export default function Hero() {
  const router = useRouter()
  const [displayedText, setDisplayedText] = useState('')
  const staticText = 'The '
  const typingText = 'Method Lab'
  const [isTyping, setIsTyping] = useState(true)
  const currentIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const typingSpeed = 100 // milliseconds per character
    const deletingSpeed = 50 // faster when deleting
    const pauseDelay = 5000 // pause after completing text (2 seconds)

    const typeText = () => {
      if (!isDeletingRef.current && currentIndexRef.current < typingText.length) {
        // Typing forward
        setDisplayedText(typingText.substring(0, currentIndexRef.current + 1))
        currentIndexRef.current++
        setIsTyping(true)
        timeoutRef.current = setTimeout(typeText, typingSpeed)
      } else if (!isDeletingRef.current && currentIndexRef.current === typingText.length) {
        // Finished typing, pause then start deleting
        setIsTyping(false)
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true
          typeText()
        }, pauseDelay)
      } else if (isDeletingRef.current && currentIndexRef.current > 0) {
        // Deleting backward
        currentIndexRef.current--
        setDisplayedText(typingText.substring(0, currentIndexRef.current))
        setIsTyping(true)
        timeoutRef.current = setTimeout(typeText, deletingSpeed)
      } else if (isDeletingRef.current && currentIndexRef.current === 0) {
        // Finished deleting, pause then start typing again
        isDeletingRef.current = false
        setIsTyping(true)
        timeoutRef.current = setTimeout(() => {
          typeText()
        }, 500) // Short pause before retyping
      }
    }

    // Start typing after initial delay
    timeoutRef.current = setTimeout(() => {
      typeText()
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-gradient-to-tr from-[#162d5f] via-ablr-primary to-[#16377d] text-white py-20 md:py-32 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 text-white">
        <CirclePattern />
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-32 h-32 text-white">
          <CirclePattern />
        </div>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
       
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <p className="text-xs sm:text-sm tracking-wider text-[#a6c3e5] mb-4 sm:mb-6 md:mb-8">
        An Initiative by Hopscotch Child Therapy</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl font-bold mx-auto font-serif mb-6 sm:mb-8 leading-tight">
          <span>{staticText}</span>
          <span>
            {displayedText}
            {isTyping && <span className="animate-pulse text-white/80">|</span>}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-gray-200 px-4">
        Strengthening applied practice and research competence across the behavioural and health sciences. 
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <button className="bg-ablr-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-ablr-primary/80 transition font-semibold text-sm sm:text-base md:text-lg w-full sm:w-auto"
          onClick={() => router.push('/programs')}>
          Explore Programmes 
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded hover:bg-white hover:text-ablr-primary transition font-semibold text-sm sm:text-base md:text-lg w-full sm:w-auto"
          onClick={() => router.push('/inquiry/organisation')}>
          Partner with us
          </button>
        </div>
        <div className="mt-12 sm:mt-14 md:mt-16 flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-2">Scroll</span>
          <ChevronDown className="animate-bounce" size={20} style={{ width: 'clamp(20px, 4vw, 24px)', height: 'clamp(20px, 4vw, 24px)' }} />
        </div>
      </div>
    </section>
  )
}


