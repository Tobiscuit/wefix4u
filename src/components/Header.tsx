'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link 
          className="text-2xl font-bold text-[var(--trusted-blue)] font-montserrat" 
          href="/"
        >
          WE FIX 4U
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            className={`transition-all duration-300 ${
              pathname === '/services' || pathname.startsWith('/services/')
                ? 'text-[var(--action-orange)] font-bold underline' 
                : 'text-gray-700 hover:text-[var(--action-orange)] hover:underline hover:font-bold'
            }`}
            href="/services#services"
          >
            Services
          </Link>
          <a 
            className="text-gray-700 hover:text-[var(--action-orange)] hover:underline hover:font-bold transition-all duration-300" 
            href="#shop"
          >
            Shop
          </a>
          <a 
            className="text-gray-700 hover:text-[var(--action-orange)] hover:underline hover:font-bold transition-all duration-300" 
            href="#about"
          >
            About
          </a>
          <a 
            className="text-gray-700 hover:text-[var(--action-orange)] hover:underline hover:font-bold transition-all duration-300" 
            href="#contact"
          >
            Contact
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <a 
            className="border-2 border-[var(--trusted-blue)] text-[var(--trusted-blue)] font-bold py-2 px-5 rounded-lg hover:bg-[var(--trusted-blue)] hover:text-white transition-all duration-300" 
            href="#signin"
          >
            Sign In
          </a>
          <a 
            className="bg-[var(--action-orange)] text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300" 
            href="#signup"
          >
            Sign Up
          </a>
        </div>
        
        <div className="md:hidden">
          <button 
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-icons">
              menu
            </span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col space-y-4">
            <Link 
              className={`transition-colors duration-300 ${
                pathname === '/services' || pathname.startsWith('/services/')
                  ? 'text-[var(--action-orange)] font-bold' 
                  : 'text-gray-700 hover:text-[var(--action-orange)]'
              }`}
              href="/services#services"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <a 
              className="text-gray-700 hover:text-[var(--action-orange)] transition-colors duration-300" 
              href="#shop"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </a>
            <a 
              className="text-gray-700 hover:text-[var(--action-orange)] transition-colors duration-300" 
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              className="text-gray-700 hover:text-[var(--action-orange)] transition-colors duration-300" 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <a 
                className="border-2 border-[var(--trusted-blue)] text-[var(--trusted-blue)] font-bold py-2 px-5 rounded-lg hover:bg-[var(--trusted-blue)] hover:text-white transition-all duration-300 text-center" 
                href="#signin"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </a>
              <a 
                className="bg-[var(--action-orange)] text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 text-center" 
                href="#signup"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
