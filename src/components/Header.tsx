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
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#about">About Us</Link>
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#reviews">Reviews</Link>
            <Link className="hover:text-primary dark:hover:text-primary transition-colors" href="#footer">Contact</Link>
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

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 h-screen bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
            }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="material-icons-outlined text-primary text-3xl">build</span>
              <span className="font-bold text-xl text-text-light-primary dark:text-text-dark-primary">WE FIX 4U</span>
            </div>
            <button
              className="p-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-icons-outlined text-3xl">close</span>
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="grow flex flex-col items-center justify-center space-y-8 p-6">
            <Link
              className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary hover:text-primary dark:hover:text-primary transition-colors"
              href="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary hover:text-primary dark:hover:text-primary transition-colors"
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary hover:text-primary dark:hover:text-primary transition-colors"
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary hover:text-primary dark:hover:text-primary transition-colors"
              href="#footer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Footer Info */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <a className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-primary rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20" href="#">
                <span className="material-icons-outlined mr-2">call</span>
                Call Now
              </a>
              <div className="flex items-center justify-center space-x-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                <span className="flex items-center text-yellow-400">
                  <span className="material-icons-outlined text-sm">star</span>
                  <span className="font-bold ml-1 text-text-light-primary dark:text-text-dark-primary">4.9/5</span>
                </span>
                <span>•</span>
                <span>Based on 233 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
