'use client'

import Link from 'next/link'
import { GraduationCap, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-ablr-primary text-white py-20 relative">
      {/* Thin top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10"></div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <Image src="/white-footer-logo.png" alt="Method Lab Logo" width={250} height={250} />
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Applied Behavioural Learning and Research Centre
            </p>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h4 className="font-semibold mb-4 sm:mb-6 label-small-caps text-white/90 text-xs sm:text-sm">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  About Us
                </a>
              </li>
             
             
              <li>
                <a href="/courses" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                Self-Paced
                </a>
              </li>
             
              <li>
                <a href="/programs" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Programmes
                </a>
              </li>
              <li>
                <a href="/for-organisations" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  For Organisations
                </a>
              </li>
              <li>
                <a href="/faculty-collaborators" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Faculty & Collaborators
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h4 className="font-semibold mb-4 sm:mb-6 label-small-caps text-white/90 text-xs sm:text-sm">Programmes</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a href="/programs" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  All Programmes
                </a>
              </li>
              <li>
                <a href="/courses" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                Self-Paced
                </a>
              </li>
              <li>
                <a href="/programs/learning" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                Practice and Implementation Wing
                </a>
              </li>
            
              <li>
                <a href="/programs/research" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                Research and Methodology Wing
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h4 className="font-semibold mb-4 sm:mb-6 label-small-caps text-white/90 text-xs sm:text-sm">Contact</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <a href="mailto:info@ablr.org" className="hover:text-white transition-colors duration-300 underline-animate inline-block">
                  info@ablr.org
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-white transition-colors duration-300 underline-animate inline-block">
                  +91 98765 43210
                </a>
              </li>
              <li>Mumbai, India</li>
            </ul>
            
            {/* Work with Us Button */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="/inquiry/teach"
                className="inline-flex items-center gap-2 bg-white text-ablr-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors duration-300 group w-full sm:w-auto justify-center"
              >
                <GraduationCap size={18} />
                <span>Work with Us</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div>
                <a href="/privacy-policy" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Privacy Policy
                </a>
              </div>
              <div>
                <a href="/terms-of-service" className="text-white/70 hover:text-white transition-colors duration-300 underline-animate inline-block">
                  Terms of Service
                </a>
              </div>
              
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">© {new Date().getFullYear()} The Method Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
