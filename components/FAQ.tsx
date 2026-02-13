'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Who can enrol in a programme?',
      answer: 'ABLR programmes are designed for a wide range of professionals, including students, early career professionals, practicing clinicians, researchers, and organizational leaders in the behavioural sciences.',
    },
    {
      question: 'Are your programmes accredited?',
      answer: 'Yes, our programmes are designed to meet professional practice and certification requirements. Many of our courses align with professional association standards and continuing education requirements.',
    },
    {
      question: 'What is the format of programmes?',
      answer: 'Our programmes are offered in various formats including online courses, intensive training sessions, and hybrid models. Each programme description includes specific format details.',
    },
    {
      question: 'Can I get supervision or mentorship with ABLR?',
      answer: 'Yes, ABLR offers supervision and mentorship services as part of our Applied Learning & Training Wing. These services are designed to support professionals at various stages of their careers.',
    },
    {
      question: 'How do I apply?',
      answer: 'You can apply by visiting our programmes page, selecting the programme of interest, and following the application process outlined for that specific programme. For general enquiries, please contact us through our contact form.',
    },
  ]

  return (
    <section className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="label-small-caps text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Support</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 60}>
                <div className="bg-white border border-gray-200/50 rounded-lg overflow-hidden card-elevated">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className={`w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between text-left transition-all duration-300 ${
                      openIndex === index ? 'bg-ablr-primary/25' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <span className="font-semibold text-ablr-primary text-sm sm:text-base md:text-lg pr-4 sm:pr-6 md:pr-8">{faq.question}</span>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <Minus size={18} className="sm:w-[20px] sm:h-[20px] text-ablr-primary transition-transform duration-300" />
                      ) : (
                        <Plus size={18} className="sm:w-[20px] sm:h-[20px] text-ablr-primary transition-transform duration-300" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                  {/* Thin divider line */}
                  {index < faqs.length - 1 && (
                    <div className="h-px bg-gray-200/50 mx-4 sm:mx-6 md:mx-8"></div>
                  )}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
