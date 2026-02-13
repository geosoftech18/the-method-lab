'use client'

import { ArrowRight, Check } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function TwoComplementaryWings() {
  const wings = [
    {
      title: 'Applied Teaching Wing',
      description: "The Applied Teaching Wing focuses on practice-oriented training for educators and human-service professionals, including psychologists, psychiatrists, special educators, social workers, counsellors, and others working directly with individuals and communities.",
      features: [
        'Applied strategies and behavioural frameworks',
        'Inclusive practices',
        'System-level problem-solving',
        'Tools for direct implementation in professional settings',
      ],
      bgClass: 'bg-gray-50/50',
    },
    {
      title: 'Research Teaching Wing',
      description: "The Research Teaching Wing focuses on building applied research competence, with particular attention to research design, measurement, and methodological decision-making. Training supports students and professionals engaged in academic research, clinical and educational evaluation, policy work, and field-based studies.",
      features: [
        'Research design and methodology',
        'Measurement and evaluation',
        'Clinical and educational evaluation',
        'Policy work and field-based studies',
      ],
      bgClass: 'bg-white',
    },
  ]

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background divided softly by tonal difference */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 left-0 right-1/2 bg-gray-50/30"></div>
        <div className="absolute inset-0 left-1/2 right-0 bg-white"></div>
      </div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-ablr-dark/70 mb-3 sm:mb-4 text-xs sm:text-sm">Structure</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Two Complementary Wings
          </h2>
          <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-4">
            The Centre operates through two complementary wings, each designed to address specific professional development needs.
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-0 relative">
          {/* Single divider line between the two cards */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300/50 transform -translate-x-1/2 z-10 hidden lg:block"></div>
          
          {wings.map((wing, index) => (
            <div 
              key={index} 
              className={`col-span-12 lg:col-span-6 ${wing.bgClass} p-6 sm:p-10 md:p-12 lg:p-16 relative transition-colors duration-500 group/wing hover:bg-gray-100/70`}
            >
              <ScrollAnimation direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 100}>
                {/* Subtle left border accent line */}
                <div className="absolute left-0 top-0 bottom-0 "></div>
                
                {/* Massive bold serif heading */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary leading-tight">
                  {wing.title}
                </h3>
                
                {/* Divider line */}
                <div className="w-16 sm:w-24 md:w-32 h-px bg-ablr-primary/30 mb-6 sm:mb-8"></div>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-full sm:max-w-[90%]">
                  {wing.description}
                </p>
                
                {/* Bullet points with animated check-line drawing */}
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
                  {wing.features.map((feature, idx) => (
                    <ScrollAnimation key={idx} direction="up" delay={idx * 60}>
                      <li className="flex items-start group">
                        <div className="mr-3 sm:mr-4 mt-1 flex-shrink-0">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-ablr-primary/30 flex items-center justify-center group-hover:border-ablr-primary group-hover:bg-ablr-primary transition-all duration-500">
                            <Check size={12} className="sm:w-[14px] sm:h-[14px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{feature}</span>
                      </li>
                    </ScrollAnimation>
                  ))}
                </ul>
                
                {/* Learn More link */}
                <a href="#" className="inline-flex items-center gap-2 sm:gap-3 text-ablr-primary font-semibold underline-animate group/link text-sm sm:text-base">
                  <span>Learn More</span>
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
