'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-container-light dark:bg-container-dark/80 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-icons-outlined text-primary text-3xl">build</span>
            <span className="font-bold text-xl text-text-light-primary dark:text-text-dark-primary">WE FIX 4U</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="/#services">Services</Link>
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#">About Us</Link>
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#reviews">Reviews</Link>
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#">Contact</Link>
          </nav>
          <a className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity" href="#">
            <span className="material-icons-outlined mr-2 text-base">sell</span>
            Get Quote
          </a>
          <button 
            className="md:hidden text-text-light-primary dark:text-text-dark-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-icons-outlined text-3xl">menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-200 dark:border-gray-800 mt-4">
            <nav className="flex flex-col space-y-4 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
              <Link
                className="hover:text-primary dark:hover:text-primary transition-colors"
                href="/#services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                className="hover:text-primary dark:hover:text-primary transition-colors"
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                className="hover:text-primary dark:hover:text-primary transition-colors"
                href="#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                className="hover:text-primary dark:hover:text-primary transition-colors"
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity" href="#">
                <span className="material-icons-outlined mr-2 text-base">sell</span>
                Get Quote
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
