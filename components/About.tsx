'use client'

import { useState } from 'react'

import { 
  Building2, 
  Lightbulb, 
  Target, 
  Heart, 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap,
  Eye,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const [activeTab, setActiveTab] = useState(0)

  const visionValues = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Commitment to the highest standards in training, research, and practice.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Ethical practice and transparent, evidence-based approaches.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building bridges between theory, practice, and research communities.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Embracing new methodologies and evidence-informed practices.',
    },
  ]

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ablr-dark/90 via-ablr-dark/95 to-ablr-dark text-white pt-16 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <ScrollAnimation direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="label-small-caps text-white/80 mb-4 text-sm sm:text-base">About The Method Lab</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Strengthening Applied Practice and Research Systems
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              For behavioural and health sciences professionals and institutions.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About the Center */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ablr-primary/5 via-transparent to-transparent"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Heading Section - Always First on Mobile */}
          <div className="col-span-12 mb-6 sm:mb-8 lg:mb-0 lg:hidden">
            <ScrollAnimation direction="up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary">
                About The Method Lab
              </h2>
              <div className="w-20 h-1 bg-ablr-primary"></div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-6 order-3 lg:order-1">
              <ScrollAnimation direction="up">
                {/* Heading Section - Desktop Only */}
                <div className="hidden lg:block mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary">
                    About The Method Lab
                  </h2>
                  <div className="w-20 h-1 bg-ablr-primary mb-6 sm:mb-8"></div>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  The Method Lab  is a global capacity-building initiative dedicated to strengthening applied practice and research competence across the behavioural and health sciences.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                We operate at the intersection of evidence-based practice and rigorous research methodology, equipping behavioural and health sciences professionals, students and institutions with the applied competence required in contemporary clinical, public health, educational and policy environments.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Our faculty-led model integrates professional development with methodological depth, supporting both individual expertise and institutional standards worldwide.                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <div className="flex items-center gap-2 text-ablr-primary">
                    <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Evidence-Based Training</span>
                  </div>
                  <div className="flex items-center gap-2 text-ablr-primary">
                    <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Research Excellence</span>
                  </div>
                  <div className="flex items-center gap-2 text-ablr-primary">
                    <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Professional Development</span>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 lg:col-span-6 order-2 lg:order-2 mb-6 lg:mb-0">
              <ScrollAnimation direction="up" delay={200}>
                <div className="relative w-full max-w-full">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-ablr-primary/20 to-ablr-dark/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-full w-full">
                    <Image 
                      src="/about-image.png" 
                      alt="About The Method Lab" 
                      width={600} 
                      height={500}
                      className="w-full h-auto max-w-full object-cover"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>
                  <div className="absolute top-2 left-2 right-2 bottom-2 sm:top-3 sm:left-3 sm:right-3 sm:bottom-3 md:top-4 md:left-4 md:right-4 md:bottom-4 bg-gradient-to-br from-ablr-primary/20 to-ablr-dark/20 rounded-2xl transform rotate-3 -z-10"></div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

   

      {/* Background & Rationale */}
      <section className="section-spacing bg-[#F6F7F8] relative overflow-hidden">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <ScrollAnimation direction="up">
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
               <span className="text-ablr-dark/90">Background </span>& Rationale
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
                Understanding the foundation and purpose behind The Method Lab's establishment
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
            {/* The Theory–Practice Gap */}
            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up">
                <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 card-elevated h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-primary/20 rounded-full -mr-16 -mt-16 group-hover:bg-ablr-primary/40 transition-colors duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-ablr-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-ablr-primary/20 transition-colors duration-500">
                      <Lightbulb className="text-ablr-primary" size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-ablr-primary">
                    	Why The Method Lab Was Established                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                    Across psychology, public health, education and allied disciplines, professionals are increasingly expected to demonstrate evidence-based practice, methodological rigour and systems-level thinking. However, 
                    structured opportunities for advanced applied training and research competence often remain fragmented or inconsistently integrated into formal education. 
                    The Method Lab was created to provide a focused, faculty-led platform dedicated to strengthening applied competence and research standards in a coherent and globally accessible format.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      This gap manifests in challenges such as difficulty applying research findings to real-world contexts, limited confidence in making evidence-based decisions, and insufficient skills in conducting rigorous practice-based research.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Why ABLR Was Established */}
            <div className="col-span-12 md:col-span-6">
              <ScrollAnimation direction="up" delay={200}>
                <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 card-elevated h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ablr-dark/20 rounded-full -mr-16 -mt-16 group-hover:bg-ablr-dark/40 transition-colors duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-ablr-dark/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-ablr-dark/20 transition-colors duration-500">
                      <Target className="text-ablr-dark" size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-ablr-dark">
                    The Theory–Practice Gap
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                    Within many behavioural and health sciences programmes, theoretical knowledge is robust. Foundational concepts, models and frameworks are thoroughly taught. 
                    Yet professionals frequently encounter a gap when translating this knowledge into real-world application - whether in clinical decision-making, programme implementation,
                     institutional evaluation or research design. Bridging this theory–practice gap requires more than additional information. 
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                    It requires structured training in implementation, methodological judgement and applied problem-solving. The Method Lab addresses this gap by integrating evidence-based practice with rigorous research methodology,
                     ensuring that theory is not only understood, but competently enacted within complex professional environments.
                    </p>
                    
                    
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Values and Approach */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <ScrollAnimation direction="up">
           
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
                Vision, Values and Approach
              </h2>
            </ScrollAnimation>
          </div>

          {/* Vision Statement */}
          <div className="mb-16">
            <ScrollAnimation direction="up">
              <div className="bg-gradient-to-br from-ablr-primary to-ablr-primary/80 rounded-2xl p-8 sm:p-12 md:p-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                  <Eye size={48} className="mx-auto mb-6 text-white/80" strokeWidth={1.5} />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
                    Our Vision
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
                  To advance global standards of excellence in applied practice and research across the behavioural and health sciences — where theory and practice are fully integrated, and evidence-based decision-making is foundational to professional and institutional systems.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
            {visionValues.map((value, index) => (
              <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <ScrollAnimation direction="up" delay={index * 100}>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 text-center h-full card-elevated group hover:border-ablr-primary transition-all duration-500">
                    <div className="w-20 h-20 bg-ablr-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-ablr-primary/10 transition-colors duration-500">
                      <value.icon className="text-ablr-primary" size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-ablr-primary">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </ScrollAnimation>
              </div>
            ))}
          </div>

          {/* Approach */}
          <ScrollAnimation direction="up">
            <div className="bg-[#F6F7F8] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6 text-ablr-dark/90">
                    Our Approach
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                    The Method Lab's approach is grounded in three core principles that guide all our programs and initiatives:
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ablr-dark/80 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-dark/90">Evidence Anchored</h4>
                        <p className="text-gray-700 text-sm sm:text-base">All programmes are grounded in established research, validated frameworks and current scientific literature across the behavioural and health sciences. </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ablr-dark/80 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          2
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-dark/90">Application-Oriented</h4>
                        <p className="text-gray-700 text-sm sm:text-base"> Learning is structured around real-world implementation. Whether in clinical settings, educational systems, public health environments or research institutions, our training emphasises applied competence and practical execution.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ablr-dark/80 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          3
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-ablr-dark/90">Faculty-Led and Systems-Focused</h4>
                        <p className="text-gray-700 text-sm sm:text-base">Our model is delivered by experienced scholars and practitioners and designed to strengthen both individual expertise and institutional capacity.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-ablr-primary/20 to-ablr-dark/20 rounded-2xl transform rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-ablr-secondary to-ablr-primary rounded-2xl p-6 sm:p-8 md:p-12 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
                      <BookOpen size={60} className="sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] text-white/80" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Founder & Academic Leadership */}
      <section className="section-spacing bg-gradient-to-br from-ablr-terracotta/10 via-ablr-terracotta/5 to-transparent relative overflow-hidden">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ablr-primary mb-4 sm:mb-6">
                Founder & Academic Leadership
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
                Meet the visionary leaders driving The Method Lab's mission forward
              </p>
            </ScrollAnimation>
          </div>

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
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6 max-w-2xl">
                        In addition to her academic work, she is the founder of Hopscotch Child Therapy, a clinical and training initiative dedicated to strengthening applied standards within child and family mental health. The Method Lab was established to extend this commitment globally — integrating professional practice and methodological rigour through structured, faculty-led capacity building.
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

      {/* Initiative by Hopscotch Child Therapy */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ablr-primary/5 via-transparent to-ablr-secondary/5"></div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
              <ScrollAnimation direction="up">
               
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 text-ablr-primary">
                  Initiative by Hopscotch Child Therapy
                </h2>
                <div className="w-20 h-1 bg-ablr-primary mb-6 sm:mb-8"></div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                The Method Lab emerged from the work of Hopscotch Child Therapy, a clinical and training initiative committed to evidence-based practice in child and family mental health.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                While operating independently, The Method Lab builds upon this foundation to deliver global capacity-building in applied practice and research across the behavioural and health sciences.
                </p>

                <div className="bg-ablr-primary/10 rounded-xl p-4 sm:p-6 border-l-4 border-ablr-primary mb-4 sm:mb-6">
                  <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
                    "Our vision is to create a lasting impact by empowering professionals with the knowledge, skills, and confidence to make evidence-based decisions that transform practice and improve outcomes."
                  </p>
                </div>

                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-ablr-primary font-semibold hover:gap-4 transition-all duration-300 group text-sm sm:text-base"
                >
                  <span>Learn More About Hopscotch</span>
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </ScrollAnimation>
            </div>

            <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
              <ScrollAnimation direction="up" delay={200}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-ablr-secondary/20 to-ablr-primary/20 rounded-2xl transform -rotate-3"></div>
                  <div className="relative bg-gradient-to-br from-ablr-primary to-ablr-dark rounded-2xl p-6 sm:p-8 md:p-12 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex flex-col items-center justify-center text-white">
                    <GraduationCap size={60} className="sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] mb-4 sm:mb-6 text-white/80" strokeWidth={1} />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 sm:mb-4 text-center px-4">
                      Hopscotch Child Therapy
                    </h3>
                    <p className="text-white/90 text-center max-w-md text-sm sm:text-base px-4">
                      Leading the way in evidence-based therapeutic services and professional development
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
                Ready to Partner with The Method Lab?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join us in advancing applied practice and research across the behavioural and health sciences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link
                  href="/for-organisations"
                  className="inline-flex items-center gap-3 bg-white text-ablr-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 group w-full sm:w-auto justify-center"
                >
                  <Users size={24} />
                  <span>Partner with the Method Lab</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 group w-full sm:w-auto justify-center"
                >
                  <GraduationCap size={24} />
                  <span>Explore Programmes</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}

