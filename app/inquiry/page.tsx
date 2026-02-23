'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { GraduationCap, User, Building2, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function InquiryPage() {
  const inquiryTiles = [
    {
      id: 'apply',
      title: 'Apply to a Programme',
      description: 'Ready to take the next step? Request an application form for your chosen programme.',
      icon: GraduationCap,
      link: '/inquiry/apply',
      color: 'from-ablr-primary to-ablr-primary/80',
      hoverColor: 'hover:from-ablr-primary/90 hover:to-ablr-primary/70',
    },
    {
      id: 'individual',
      title: 'Enquire (Individual)',
      description: 'Have questions about our programmes? Get in touch and we\'ll help you find the right fit.',
      icon: User,
      link: '/inquiry/individual',
      color: 'from-ablr-dark to-ablr-dark/80',
      hoverColor: 'hover:from-ablr-dark/90 hover:to-ablr-dark/70',
    },
    {
      id: 'organisation',
      title: 'Enquire (Organisation)',
      description: 'Explore training, research, or evaluation opportunities for your organization.',
      icon: Building2,
      link: '/inquiry/organisation',
      color: 'from-ablr-terracotta to-ablr-terracotta/80',
      hoverColor: 'hover:from-ablr-terracotta/90 hover:to-ablr-terracotta/70',
    },
    {
      id: 'teach',
      title: 'Collaborate or Teach with The Method Lab',
      description: 'Join our community of experts and contribute to advancing applied practice.',
      icon: Users,
      link: '/inquiry/teach',
      color: 'from-ablr-brown to-ablr-brown/80',
      hoverColor: 'hover:from-ablr-brown/90 hover:to-ablr-brown/70',
    },
  ]

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <p className="label-small-caps text-ablr-dark/70 mb-4 text-sm">Get in Touch</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-ablr-primary leading-[0.9]">
                Enquiry{" "}
              
                <span className="text-ablr-dark">Page</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl">
                The Method Lab programmes are designed for different stages and needs. Use the options below to apply, enquire, or explore collaboration.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Inquiry Tiles */}
      <section className="section-spacing bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {inquiryTiles.map((tile, index) => (
              <div key={tile.id} className="col-span-12 sm:col-span-6 lg:col-span-3 flex">
                <ScrollAnimation direction="up" delay={index * 100} className="flex-1 flex flex-col">
                  <Link href={tile.link} className="flex-1 flex flex-col">
                    <div className={`bg-gradient-to-br ${tile.color} ${tile.hoverColor} text-white rounded-2xl p-8 h-full relative overflow-hidden group transition-all duration-500 card-elevated cursor-pointer flex flex-col`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full group-hover:bg-white/20 transition-colors duration-500"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-500">
                          <tile.icon size={32} className="text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4">
                          {tile.title}
                        </h3>
                        <p className="text-white/90 mb-6 leading-relaxed flex-grow">
                          {tile.description}
                        </p>
                        <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                          <span>Get Started</span>
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-spacing bg-white">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimation direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-gray-600 text-sm sm:text-base">
                Prefer to call or email? Contact us at{' '}
                <a href="mailto:info@ablr.org" className="text-ablr-primary hover:text-ablr-dark font-semibold transition-colors duration-300">
                  info@ablr.org
                </a>
                {' '}or{' '}
                <a href="tel:+911234567890" className="text-ablr-primary hover:text-ablr-dark font-semibold transition-colors duration-300">
                  +91 123 456 7890
                </a>
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </main>
  )
}


