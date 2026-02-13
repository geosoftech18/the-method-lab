'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function DesignedForEveryStage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const stages = [
    {
      title: 'Students & Early Career Professionals',
      description: 'A strong foundation to apply relevant science, learn critical thinking, cultivate a scientific-practitioner mindset.',
      image: '/students.jpg',
      gradientFrom: '#435C93',
      gradientTo: '#203b77',
      skewTransform: 'skew(19deg, -9deg)',
      gradientDirection: '0deg',
    },
    {
      title: 'Practicing Professionals',
      description: 'Current and relevant advanced training, practical tools and resources, and a community of like-minded professionals.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      gradientFrom: '#435C93',
      gradientTo: '#203b77',
      skewTransform: 'skew(19deg, -9deg)',
      gradientDirection: '-20deg',
    },
    {
      title: 'Organizations & Institutions',
      description: 'Partner with ABLR to develop and implement evidence-based practices and professional development programs.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      gradientFrom: '#435C93',
      gradientTo: '#203b77',
      skewTransform: 'skew(19deg, -9deg)',
      gradientDirection: '0deg',
    },
  ]

  return (
    <section className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
      {/* Very subtle diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-ablr-primary/5"></div>
      
      {/* Large faded academic geometric shapes behind */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-3">
        <svg viewBox="0 0 400 400" className="w-full h-full text-ablr-primary">
          <polygon points="200,50 350,200 200,350 50,200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
          <polygon points="200,100 300,200 200,300 100,200" fill="currentColor" opacity="0.05" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-3">
        <svg viewBox="0 0 300 300" className="w-full h-full text-ablr-primary">
          <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
          <circle cx="150" cy="150" r="80" fill="currentColor" opacity="0.05" />
        </svg>
      </div>

      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">OUR FOCUS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Designed for Every Stage of Practice
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-primary mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {stages.map((stage, index) => (
            <div key={index} className="w-full sm:w-[400px] sm:min-w-[400px] my-8">
              <ScrollAnimation direction="up" delay={index * 100}>
                <div
                  className="group relative w-full md:h-[450px] h-[400px] rounded-[30px] overflow-hidden shadow-[5px_5px_30px_rgba(0,0,0,0.3)]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hero Image - 70% height */}
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-[70%] object-cover"
                  />

                  {/* Skewed Background */}
                  <div
                    className="absolute rounded-[30px]"
                    style={{
                      top: '50%',
                      left: '-5px',
                      height: '70%',
                      width: '108%',
                      backgroundImage: `linear-gradient(${stage.gradientDirection}, ${stage.gradientFrom}, ${stage.gradientTo})`,
                      transform: stage.skewTransform,
                      zIndex: 1,
                    }}
                  >
                    {/* Description Text - Unskewed inside skewed background */}
                    <div
                      className="absolute text-white font-black z-10"
                      style={{
                        left: '48px',
                        bottom: '53%',
                        right: '30px',
                        transform: 'skew(-19deg, 9deg)', // Counter-transform to unskew the text
                      }}
                    >
                      <h3 className="text-base sm:text-lg font-bold mb-1 leading-tight">
                        {stage.title}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed font-normal">
                        {stage.description}
                      </p>
                    </div>

                    {/* Learn More Button - Slides up from bottom on hover */}
                    <div
                      className="absolute z-10"
                      style={{
                        bottom: '45%',
                        left: '10%',
                        transform: hoveredIndex === index 
                          ? 'skew(-19deg, 9deg) translateY(0)' 
                          : 'skew(-19deg, 9deg) translateY(100%)',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                      }}
                    >
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-white text-base font-semibold hover:gap-3 transition-all duration-200"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
