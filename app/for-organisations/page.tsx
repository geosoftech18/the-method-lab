'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Building2, Users, Target, ArrowRight, CheckCircle2, Sparkles, Network, GraduationCap, Award, Quote, Calendar, Heart } from 'lucide-react'
import Link from 'next/link'
import Testimonials from '@/components/Testimonials'
import { Linkedin, Mail } from 'lucide-react'



const leadership = [
  {
    name: 'Dr. Angana Nandy',
    role: 'Developmental psychologist and researcher with international training and experience across academic and applied settings. ',
    bio: `She holds a PhD in Developmental Psychology from Trinity College Dublin and completed postdoctoral research in early intervention and child development in Taiwan.`,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com/in/sarah-mitchell',
    
    email: 'sarah.mitchell@ablr.org',
  },
]
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
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl mb-8">
                Tailored training and research solutions designed to elevate your team's capabilities and drive meaningful impact.
              </p>
              <Link
                href="/inquiry/organisation"
                className="inline-flex items-center gap-3 bg-ablr-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300 group"
              >
                <Calendar size={24} />
                <span>Schedule a Consultation</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* The Institutional Challenge */}
      <section className="section-spacing bg-[#F6F7F8] relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up">
              <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                The Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 text-ablr-primary leading-tight">
                Why Institutions Struggle to Build Sustainable Capacity
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-8"></div>
            </ScrollAnimation>

            <div className="space-y-6 sm:space-y-8">
              <ScrollAnimation direction="up" delay={100}>
                <div className="bg-white p-6 sm:p-8 rounded-xl card-elevated">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-ablr-primary">The Gap in Professional Training</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Many institutions face a persistent challenge: traditional training programmes often provide strong theoretical foundations but fall short in translating knowledge into effective, sustainable practice. This gap creates several critical issues:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Limited practical application skills among staff, leading to inconsistent implementation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Difficulty maintaining quality standards and evidence-based practices over time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Insufficient research capacity to evaluate programmes and measure impact</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-ablr-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-ablr-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-700">High staff turnover and knowledge loss, disrupting organizational continuity</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={200}>
                <div className="bg-gradient-to-br from-ablr-primary/10 to-ablr-terracotta/10 p-6 sm:p-8 rounded-xl border-l-4 border-ablr-primary">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-ablr-dark">The Solution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Method Lab addresses these challenges through structured, skills-focused programmes that bridge theory and practice. We work with institutions to build sustainable capacity that endures beyond individual training sessions, creating lasting organizational change through evidence-based methodologies and continuous support.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing bg-white relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mb-16">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-ablr-primary">
                Who This Is For
              </h2>
              <div className="w-24 h-1 bg-ablr-primary mb-8"></div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 sm:gap-8 items-stretch">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-primary/20 rounded-xl hover:border-ablr-primary transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-bl-full"></div>
                  <Building2 size={48} className="text-ablr-primary mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-primary relative z-10">Educational Institutions</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                    Schools, colleges, and universities seeking to enhance their faculty's expertise and student outcomes.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" delay={100} className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-dark/20 rounded-xl hover:border-ablr-dark transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-dark/20 rounded-bl-full"></div>
                  <Users size={48} className="text-ablr-dark mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-dark relative z-10">Healthcare Organizations</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                    Hospitals, clinics, and healthcare systems looking to strengthen their clinical practice and research capacity.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" delay={200} className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-primary/20 rounded-xl hover:border-ablr-primary transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-bl-full"></div>
                  <Target size={48} className="text-ablr-primary mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-primary relative z-10">Corporate Entities</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                    Businesses and organizations committed to evidence-based practices and professional development.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" delay={300} className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-terracotta/20 rounded-xl hover:border-ablr-terracotta transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-terracotta/20 rounded-bl-full"></div>
                  <Heart size={48} className="text-ablr-terracotta mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-terracotta relative z-10">Non-Profit and Development Organisations
                  </h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                  Professional bodies and mission-driven organisations committed to advancing training, standards and evidence-based systems.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" delay={400} className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-primary/20 rounded-xl hover:border-ablr-primary transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-bl-full"></div>
                  <Building2 size={48} className="text-ablr-primary mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-primary relative z-10">Government & Public Sector Bodies</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                  Health, education and policy agencies building research capacity and systems-level professional standards.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex">
              <ScrollAnimation direction="up" delay={400} className="flex-1 flex flex-col">
                <div className="bg-white p-8 h-full relative border-2 border-ablr-dark/20 rounded-xl hover:border-ablr-dark transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-dark/20 rounded-bl-full"></div>
                  <Building2 size={48} className="text-ablr-dark mb-6 relative z-10" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-ablr-dark relative z-10">Research Organisations & Think Tanks</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10 flex-grow">
                  Research institutes, think tanks and evaluation agencies strengthening methodological rigour and applied research design.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <ScrollAnimation direction="up">
              <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Comprehensive Solutions
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
                From structured training programmes to research support, we provide end-to-end solutions for institutional capacity building.
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-stretch">
            {/* Institutional Training */}
            <div className="col-span-12 lg:col-span-6 flex">
              <ScrollAnimation direction="up" className="flex-1 flex flex-col">
                <div className="bg-white rounded-xl p-8 h-full card-elevated flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap size={32} className="text-ablr-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary">Institutional Training</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    We design and deliver structured training programmes that align with your organization's goals, addressing specific skill gaps and building capacity across teams.
                  </p>
                  <ul className="space-y-3 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Customized curriculum tailored to your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Flexible delivery: on-site, online, or hybrid</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Expert faculty with real-world experience</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>

            {/* Research & Evaluation Support */}
            <div className="col-span-12 lg:col-span-6 flex">
              <ScrollAnimation direction="up" delay={100} className="flex-1 flex flex-col">
                <div className="bg-white rounded-xl p-8 h-full card-elevated flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-ablr-dark/10 rounded-full flex items-center justify-center">
                      <Sparkles size={32} className="text-ablr-dark" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-dark">Research & Evaluation Support</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Strengthen your organization's research capacity with comprehensive support services, from study design to data analysis and reporting.
                  </p>
                  <ul className="space-y-3 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-dark flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Research design & methodology guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-dark flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Data analysis & interpretation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-ablr-dark flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Evaluation framework development</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work With Institutions */}
      <section className="section-spacing bg-white">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <ScrollAnimation direction="up">
              <span className="text-sm font-semibold text-ablr-dark uppercase tracking-wider mb-4 block">
                How We Work With Institutions
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                Our Collaborative Process
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Every organization is unique. We work closely with you to develop programmes that address your specific challenges and opportunities.
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up">
                <div className="bg-white p-10 h-full relative overflow-hidden group border-2 border-ablr-primary/20 rounded-xl hover:border-ablr-primary transition-colors">
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
                <div className="bg-white p-10 h-full relative overflow-hidden group border-2 border-ablr-dark/20 rounded-xl hover:border-ablr-dark transition-colors">
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
                <div className="bg-white p-10 h-full relative overflow-hidden group border-2 border-ablr-primary/20 rounded-xl hover:border-ablr-primary transition-colors">
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
                <div className="bg-white p-10 h-full relative overflow-hidden group border-2 border-ablr-dark/20 rounded-xl hover:border-ablr-dark transition-colors">
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

          <div className="space-y-8 mb-12">
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

          {/* CTA After Partnership Models */}
          <ScrollAnimation direction="up" delay={300}>
            <div className="text-center">
              <Link
                href="/inquiry/organisation"
                className="inline-flex items-center gap-3 bg-ablr-primary text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-ablr-dark transition-colors duration-300 group"
              >
                <Calendar size={24} />
                <span>Schedule a Consultation</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why Partner with the Method Lab */}
      <section className="section-spacing bg-white relative">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center ">
            <ScrollAnimation direction="up">
              <span className="text-xs sm:text-sm font-semibold text-ablr-primary uppercase tracking-wider mb-3 sm:mb-4 block">
                Why Partner With Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-ablr-primary">
                The Method Lab Advantage
              </h2>
            </ScrollAnimation>
          </div>

          {/* Founder Profile */}
          {/* Founder & Academic Leadership */}
      <section className="section-spacing bg-gradient-to-br from-ablr-terracotta/10 via-ablr-terracotta/5 to-transparent relative overflow-hidden">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
         

          <div className="max-w-5xl mx-auto">
            <ScrollAnimation direction="up" delay={200}>
              {leadership[0] && (
                <div className="bg-white rounded-2xl overflow-visible card-elevated relative">
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    {/* Left Side - Orange Square with Image (Overlapping) */}
                    <div className="relative md:w-[350px] md:h-[350px] w-full h-[300px] mt-10 md:flex-shrink-0 md:-ml-8 md:z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-ablr-terracotta via-ablr-terracotta/95 to-ablr-terracotta/85 rounded-2xl shadow-2xl overflow-hidden">
                        <img
                          src={leadership[0].image}
                          alt={leadership[0].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Right Side - Content */}
                    <div className="flex-1 p-8 sm:p-10 md:p-12 md:pl-16 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ablr-primary mb-4">
                          {leadership[0].name}
                        </h3>
                        <p className="text-ablr-terracotta font-semibold mb-6 text-lg sm:text-xl">
                          {leadership[0].role}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6 max-w-2xl">
                          {leadership[0].bio}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-8 max-w-2xl">
                        Her work has focused on bridging research and practice within behavioural and health sciences systems, with particular emphasis on evidence-based professional training, applied competence and research methodology.
                        </p>
                       
                      </div>
                      
                      {/* Social Icons */}
                      <div className="flex items-center gap-5 pt-6 border-t border-gray-200">
                        {leadership[0].linkedin && (
                          <a
                            href={leadership[0].linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-ablr-terracotta to-ablr-terracotta/80 hover:from-ablr-terracotta/90 hover:to-ablr-terracotta/70 text-white flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-xl"
                            aria-label="LinkedIn"
                          >
                            <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
                          </a>
                        )}
                      
                        {leadership[0].email && (
                          <a
                            href={`mailto:${leadership[0].email}`}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-ablr-terracotta to-ablr-terracotta/80 hover:from-ablr-terracotta/90 hover:to-ablr-terracotta/70 text-white flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-xl"
                            aria-label="Email"
                          >
                            <Mail size={22} className="group-hover:scale-110 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </section>
          {/* <div className="mb-16">
            <ScrollAnimation direction="up">
              <div className="bg-gradient-to-br from-ablr-primary/5 to-ablr-terracotta/5 rounded-2xl p-8 sm:p-12">
                <div className="grid grid-cols-12 gap-8 items-center">
                  <div className="col-span-12 md:col-span-4">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-ablr-terracotta/20 rounded-2xl transform rotate-3"></div>
                      <div className="relative bg-gradient-to-br from-ablr-terracotta to-ablr-dark rounded-2xl p-8 h-[300px] sm:h-[400px] flex items-center justify-center">
                        <GraduationCap size={80} className="text-white/80" strokeWidth={1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-ablr-primary">Founder Profile</h3>
                    <p className="text-lg sm:text-xl font-semibold text-ablr-terracotta mb-4">Dr. Sarah Mitchell, Founder & Director</p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      With over 20 years of experience bridging the gap between theory and practice, Dr. Mitchell has dedicated her career to advancing evidence-based methodologies in applied behavioural sciences. Her vision for ABLR stems from recognizing the critical need for sustainable capacity building in institutions.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Under her leadership, ABLR has become a trusted partner for organizations seeking to transform their training and research capabilities, combining rigorous academic standards with practical, real-world application.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div> */}

          {/* Faculty Highlights */}
          <div className="mb-16">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white rounded-xl p-8 sm:p-12 card-elevated">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-ablr-primary/10 rounded-full flex items-center justify-center">
                    <Users size={32} className="text-ablr-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary">Faculty Highlights</h3>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-4">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-serif font-bold text-ablr-primary mb-2">50+</div>
                      <p className="text-gray-700">Expert Faculty Members</p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-serif font-bold text-ablr-primary mb-2">20+</div>
                      <p className="text-gray-700">Years Average Experience</p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-serif font-bold text-ablr-primary mb-2">15+</div>
                      <p className="text-gray-700">Countries Represented</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-8 leading-relaxed text-center max-w-3xl mx-auto">
                  Our diverse faculty brings together leading practitioners, researchers, and educators from around the world, ensuring that our programmes reflect global best practices while remaining relevant to local contexts.
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Institutional Collaborations */}
          <div className="">
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white rounded-xl p-8 sm:p-12 card-elevated">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-ablr-dark/10 rounded-full flex items-center justify-center">
                    <Network size={32} className="text-ablr-dark" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-dark">Institutional Collaborations</h3>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-start gap-4">
                      <Award size={24} className="text-ablr-dark flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-ablr-dark">Leading Universities</h4>
                        <p className="text-gray-700">Partnerships with top-tier academic institutions for joint research and curriculum development.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-start gap-4">
                      <Building2 size={24} className="text-ablr-dark flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-ablr-dark">Healthcare Systems</h4>
                        <p className="text-gray-700">Collaborations with major hospital networks and healthcare organizations.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-start gap-4">
                      <Target size={24} className="text-ablr-dark flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-ablr-dark">NGOs & Non-Profits</h4>
                        <p className="text-gray-700">Long-term partnerships with organizations focused on social impact and capacity building.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-start gap-4">
                      <Network size={24} className="text-ablr-dark flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-ablr-dark">Government Agencies</h4>
                        <p className="text-gray-700">Working with public sector organizations to enhance service delivery and evaluation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

        
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="section-spacing bg-gradient-to-br from-ablr-dark via-ablr-dark/95 to-ablr-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Schedule a consultation to discuss how we can support your organization's goals and create a tailored solution for your team.
              </p>
              
              <Link
                href="/inquiry/organisation"
                className="inline-flex items-center gap-3 bg-white text-ablr-dark/90 px-10 py-5 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group"
              >
                <Calendar size={24} />
                <span>Schedule a Consultation</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
