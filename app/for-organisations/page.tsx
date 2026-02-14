'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Building2, Users, Target, ArrowRight, CheckCircle2, Sparkles, Network } from 'lucide-react'
import Link from 'next/link'

export default function ForOrganisationsPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <ScrollAnimation direction="up">
              <p className="label-small-caps text-ablr-dark/70 mb-4 text-sm">For Organisations</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-ablr-primary leading-[0.9]">
                Empowering
                <br />
                <span className="text-ablr-dark/80">Organisations</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                Tailored training and research solutions designed to elevate your team's capabilities and drive meaningful impact.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing bg-[#F6F7F8] relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mb-16">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-ablr-primary">
                Who This Is For
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-8"></div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ScrollAnimation direction="up">
                <div className="bg-white p-8 h-full relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-bl-full"></div>
                  <Building2 size={48} className="text-ablr-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-primary">Educational Institutions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Schools, colleges, and universities seeking to enhance their faculty's expertise and student outcomes.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ScrollAnimation direction="up" delay={100}>
                <div className="bg-white p-8 h-full relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-dark/20 rounded-bl-full"></div>
                  <Users size={48} className="text-ablr-dark mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-dark">Healthcare Organizations</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Hospitals, clinics, and healthcare systems looking to strengthen their clinical practice and research capacity.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ScrollAnimation direction="up" delay={200}>
                <div className="bg-white p-8 h-full relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-bl-full"></div>
                  <Target size={48} className="text-ablr-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-primary">Corporate Entities</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Businesses and organizations committed to evidence-based practices and professional development.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Training */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-ablr-primary/5 to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
              <ScrollAnimation direction="up">
                <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                  Institutional Training
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 text-ablr-primary leading-tight">
                  Comprehensive
                  <br />
                  Training Solutions
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  We design and deliver structured training programmes that align with your organization's goals, addressing specific skill gaps and building capacity across teams.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Customized Curriculum</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Programmes tailored to your organization's specific needs and objectives</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Flexible Delivery</h4>
                      <p className="text-gray-700 text-sm sm:text-base">On-site, online, or hybrid formats to suit your schedule and preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6 text-ablr-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-primary">Expert Faculty</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Led by experienced practitioners and researchers in the field</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
              <ScrollAnimation direction="up" delay={200}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-ablr-primary/10 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-2xl p-6 sm:p-8 md:p-12 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
                    <Building2 size={60} className="sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] text-white/80" strokeWidth={1} />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Customised Programmes */}
      <section className="section-spacing bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <ScrollAnimation direction="up">
              <span className="text-sm font-semibold text-ablr-dark uppercase tracking-wider mb-4 block">
                Customised Programmes
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Built for Your Needs
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Every organization is unique. We work closely with you to develop programmes that address your specific challenges and opportunities.
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up">
                <div className="bg-white p-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-ablr-primary/40 rounded-bl-full group-hover:w-48 group-hover:h-48 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-serif font-bold text-ablr-primary/40 mb-6">01</div>
                    <h3 className="text-3xl font-serif font-bold mb-4 text-ablr-primary">Needs Assessment</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We begin by understanding your organization's goals, challenges, and current capabilities through comprehensive assessment.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up" delay={100}>
                <div className="bg-white p-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-ablr-dark/40 rounded-bl-full group-hover:w-48 group-hover:h-48 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-serif font-bold text-ablr-dark/40 mb-6">02</div>
                    <h3 className="text-3xl font-serif font-bold mb-4 text-ablr-dark/90">Programme Design</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our team collaborates with you to design a programme structure that aligns with your objectives and learning preferences.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up" delay={200}>
                <div className="bg-white p-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-ablr-primary/40 rounded-bl-full group-hover:w-48 group-hover:h-48 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-serif font-bold text-ablr-primary/40 mb-6">03</div>
                    <h3 className="text-3xl font-serif font-bold mb-4 text-ablr-primary">Implementation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We deliver the programme with ongoing support, ensuring smooth execution and maximum engagement from participants.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up" delay={300}>
                <div className="bg-white p-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-ablr-dark/40 rounded-bl-full group-hover:w-48 group-hover:h-48 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-serif font-bold text-ablr-dark/40 mb-6">04</div>
                    <h3 className="text-3xl font-serif font-bold mb-4 text-ablr-dark/90">Evaluation & Support</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Post-programme evaluation and continued support to ensure sustainable impact and long-term success.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Evaluation Support */}
      <section className="section-spacing bg-white relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="col-span-12 lg:col-span-5 order-1 lg:order-1">
              <ScrollAnimation direction="up">
                <div className="relative">
                  <div className="absolute -inset-4 bg-ablr-dark/10 rounded-2xl transform -rotate-3"></div>
                  <div className="relative bg-gradient-to-br from-ablr-dark to-ablr-primary rounded-2xl p-6 sm:p-8 md:p-12 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
                    <Sparkles size={60} className="sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] text-white/80" strokeWidth={1} />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 lg:col-span-7 order-2 lg:order-2">
              <ScrollAnimation direction="up" delay={200}>
                <span className="text-xs sm:text-sm font-semibold text-ablr-dark uppercase tracking-wider mb-3 sm:mb-4 block">
                  Research & Evaluation Support
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 text-ablr-dark leading-tight">
                  Evidence-Based
                  <br />
                  Decision Making
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  Strengthen your organization's research capacity with our comprehensive support services, from study design to data analysis and reporting.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-[#F6F7F8] rounded-lg">
                    <div className="w-2 h-2 bg-ablr-dark rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Research Design & Methodology</h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Expert guidance on study design and methodological approaches</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-[#F6F7F8] rounded-lg">
                    <div className="w-2 h-2 bg-ablr-dark rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Data Analysis & Interpretation</h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Statistical analysis and meaningful interpretation of findings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-[#F6F7F8] rounded-lg">
                    <div className="w-2 h-2 bg-ablr-dark rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Evaluation Frameworks</h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Development of robust evaluation systems for programmes and initiatives</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="section-spacing bg-[#F6F7F8]">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mb-16">
            <ScrollAnimation direction="up">
              <span className="text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-4 block">
                Partnership Models
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Flexible Collaboration
              </h2>
              <p className="text-xl text-gray-700">
                We offer various partnership models to suit different organizational needs and engagement levels.
              </p>
            </ScrollAnimation>
          </div>

          <div className="space-y-8">
            <ScrollAnimation direction="up">
              <div className="bg-white p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-ablr-primary group-hover:w-2 transition-all duration-500"></div>
                <div className="pl-8 md:pl-12">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-3xl font-serif font-bold mb-3 text-ablr-primary">Project-Based Partnership</h3>
                      <p className="text-gray-700 text-lg">
                        Engage us for specific projects or initiatives with defined scope and deliverables.
                      </p>
                    </div>
                    <Network size={48} className="text-ablr-primary/20 flex-shrink-0" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-ablr-dark group-hover:w-2 transition-all duration-500"></div>
                <div className="pl-8 md:pl-12">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-3xl font-serif font-bold mb-3 text-ablr-dark">Ongoing Collaboration</h3>
                      <p className="text-gray-700 text-lg">
                        Long-term partnerships for continuous capacity building and research support.
                      </p>
                    </div>
                    <Target size={48} className="text-ablr-dark/20 flex-shrink-0" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-ablr-primary group-hover:w-2 transition-all duration-500"></div>
                <div className="pl-8 md:pl-12">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-3xl font-serif font-bold mb-3 text-ablr-primary">Strategic Alliance</h3>
                      <p className="text-gray-700 text-lg">
                        Deep integration for joint programme development and knowledge exchange.
                      </p>
                    </div>
                    <Users size={48} className="text-ablr-primary/20 flex-shrink-0" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section className="section-spacing bg-gradient-to-br from-ablr-dark via-ablr-dark/95 to-ablr-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Let's Discuss Your Needs
              </h2>
              <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Get in touch to explore how we can support your organization's goals and create a tailored solution for your team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-white text-ablr-dark/90 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-3 group"
                >
                  <span>Enquire Now</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link
                  href="/programs"
                  className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-3"
                >
                  <span>View Programmes</span>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

