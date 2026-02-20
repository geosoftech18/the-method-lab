'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Who is The Method Lab designed for?',
      answer: 'The Method Lab serves behavioural and health sciences professionals, students and institutions — including psychologists, psychiatrists, public health practitioners, educators, social workers, counsellors, behavioural scientists and allied health professionals seeking advanced applied and research competence.',
    },
    {
      question: 'Is The Method Lab focused on research or clinical practice?',
      answer: 'Both. Our structure integrates evidence-based practice and rigorous research methodology through complementary training wings. Participants strengthen applied competence while developing advanced methodological skill.',
    },
    {
      question: 'Are your programmes suitable for early-career professionals?',
      answer: 'Yes. We offer structured training for students and early-career professionals building foundational competence, as well as advanced programmes for experienced practitioners and faculty members.',
    },
    {
      question: 'Do you offer institutional or customised training programmes?',
      answer: 'Yes. We partner with universities, healthcare systems, schools and professional organisations to deliver customised faculty development, research training and applied capacity-building initiatives.',
    },
    {
      question: 'Are programmes delivered online or in person?',
      answer: 'We offer live online programmes, hybrid formats and institutional on-site intensives depending on cohort type and partnership requirements.',
    },
    {
      question: 'Are your programmes internationally accessible?',
      answer: 'Yes. The Method Lab operates globally, with participants and institutional partners across behavioural and health sciences environments worldwide.',
    },
    {
      question: 'Who delivers the training?',
      answer: 'All programmes are faculty-led and delivered by experienced scholars and practitioners with expertise in applied psychology, public health, clinical practice and research methodology.',
    },
    {
      question: 'Do participants receive certification?',
      answer: 'Yes. Participants receive certification of completion reflecting advanced professional training in applied practice or research methodology, depending on programme track.',
    },
    {
      question: ' How are your programmes different from standard continuing education courses?',
      answer: 'Our programmes integrate applied implementation with methodological rigour. We focus not only on knowledge acquisition but on strengthening professional judgement, research competence and institutional standards.',
    },
    {
      question: 'How can organisations initiate a partnership?',
      answer: 'Institutions may request a consultation through our “For Organisations” pathway to discuss customised training, faculty development or long-term capacity-building collaborations.',
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
