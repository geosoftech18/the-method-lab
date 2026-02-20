'use client'

import { Monitor, MessageCircle, Users, ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function ExploreABLR() {
  const options = [
    {
      icon: Monitor,
      title: 'View Programmes',
      description: 'Explore our comprehensive range of learning and research programmes.',
    },
    {
      icon: MessageCircle,
      title: 'Partner with us',
      description: 'Get your questions answered and start your journey with ABLR.',
    },
    {
      icon: Users,
      title: 'Work with us',
      description: 'Partner with us for research, training, or programme development.',
    },
  ]

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">Get Started</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Explore ABLR
          </h2>
        </div>
        
        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {options.map((option, index) => (
            <div key={index} className="col-span-12 md:col-span-4">
              <ScrollAnimation direction="up" delay={index * 100}>
                <div className="group card-elevated bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 text-center h-[400px] sm:h-[420px] md:h-[450px] relative overflow-hidden flex flex-col">
                  {/* Border highlight animate on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-ablr-primary/30 rounded-lg transition-all duration-500"></div>
                  
                  {/* Centered icon in circular matte disc */}
                  <div className="mb-6 sm:mb-8 flex justify-center flex-shrink-0">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full bg-ablr-primary/5 flex items-center justify-center group-hover:bg-ablr-primary/10 transition-colors duration-500 relative">
                      <option.icon className="text-ablr-primary" size={32} strokeWidth={1.5} style={{ width: 'clamp(32px, 5vw, 40px)', height: 'clamp(32px, 5vw, 40px)' }} />
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-full bg-ablr-primary/0 group-hover:bg-ablr-primary/10 blur-xl transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Elegant spacing */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary flex-shrink-0">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-full sm:max-w-[85%] mx-auto flex-1 flex items-center justify-center">
                    {option.description}
                  </p>
                  
                  <a href="#" className="inline-flex items-center gap-2 sm:gap-3 text-ablr-primary font-semibold underline-animate group/link text-sm sm:text-base mt-auto flex-shrink-0">
                    <span>Learn More</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
