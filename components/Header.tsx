'use client'

import { useState } from 'react'
import { ChevronDown, Menu, X, Search } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [programmesDropdown, setProgrammesDropdown] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b  border-gray-200/50 sticky top-0 z-50 shadow-sm">
      {/* Top dark blue strip */}
  
      
      {/* Main header */}
      <nav className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex flex-col group">
             <Image src="/logo.png" alt="ABLR" width={150} height={100} />
            </a>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-10">
           
            <a href="/" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 underline-animate">Home</a>
            <a href="/about" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 underline-animate">About Us</a>
            <div 
              className="relative"
              onMouseEnter={() => setProgrammesDropdown(true)}
              onMouseLeave={() => setProgrammesDropdown(false)}
            >
              <a href="/programs" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 flex items-center gap-1 underline-animate">
                Programmes
                <ChevronDown size={14} className={`transition-transform duration-300 ${programmesDropdown ? 'rotate-180' : ''}`} />
              </a>
              {programmesDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200/50 rounded-lg shadow-lg py-2 min-w-[280px] z-50 card-elevated">
                  <a href="/programs" className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50/50 transition-colors duration-200">All Programmes</a>
                  <a href="/programs/learning" className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50/50 transition-colors duration-200">Practice and Implementation Wing</a>
                  <a href="/programs/research" className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50/50 transition-colors duration-200">Research and Methodology Wing</a>
                </div>
              )}
            </div>
            <a href="/for-organisations" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 leading-tight underline-animate">
              For Organisations
            </a>
            <a href="/faculty-collaborators" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 leading-tight underline-animate">
              Faculty & Collaborators
            </a>
            <a href="/blog" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 leading-tight underline-animate">
              Blog
            </a>
            <a href="/contact-us" className="text-base text-gray-700 hover:text-ablr-primary transition-colors duration-300 leading-tight underline-animate">
              Contact Us
            </a>
      
          </div>

          {/* Right Section - Search and Buttons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
           

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a href="/inquiry" className="magnetic-button bg-ablr-primary text-white px-8 py-3 rounded-sm hover:bg-ablr-dark transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md">
               Enquire Now
              </a>
            
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 pb-4 border-t border-gray-200 pt-4">
            <a href="/" className="block text-gray-700 hover:text-ablr-primary">Home</a>
            <a href="/about" className="block text-gray-700 hover:text-ablr-primary">About Us</a>
            <a href="/programs" className="block text-gray-700 hover:text-ablr-primary">All Programmes</a>
            <a href="/programs/learning" className="block text-gray-700 hover:text-ablr-primary pl-4">Applied Learning and Training</a>
            <a href="/programs/research" className="block text-gray-700 hover:text-ablr-primary pl-4">Applied Research and Practice</a>
            <a href="/for-organisations" className="block text-gray-700 hover:text-ablr-primary">For Organisations</a>
            <a href="/faculty-collaborators" className="block text-gray-700 hover:text-ablr-primary">Faculty & Collaborators</a>
            <a href="/blog" className="block text-gray-700 hover:text-ablr-primary">Blog</a>
            <a href="/contact-us" className="block text-gray-700 hover:text-ablr-primary">Contact Us</a>
            <a href="/inquiry" className="block text-gray-700 hover:text-ablr-primary">Enquire</a>
            <div className="flex items-center space-x-2 pt-2">
              <a href="/inquiry" className="bg-ablr-primary text-white px-6 py-2 rounded hover:bg-ablr-dark transition font-semibold text-sm flex-1 text-center">
              Enquire 
              </a>
             
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}


