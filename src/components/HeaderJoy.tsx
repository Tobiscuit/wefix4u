import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X } from 'lucide-react'

export default function HeaderJoy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path.startsWith('/#')) return false // Hash links handled by scroll
    return pathname === path
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-trusted-blue to-action-orange rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">W4U</span>
            </div>
            <h2 className={`text-xl font-bold leading-tight tracking-tight ${scrolled ? 'text-dark-text' : 'text-dark-text'}`}>
              WE FIX <span className="text-action-orange">4U</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-action-orange relative group ${
                  isActive(link.href) ? 'text-action-orange' : 'text-body-text'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-action-orange transition-all duration-300 group-hover:w-full ${isActive(link.href) ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            <Link
              href="/#contact"
              className="px-6 py-2.5 bg-trusted-blue text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-dark-text hover:text-action-orange transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium py-2 border-b border-gray-50 hover:text-action-orange transition-colors ${
                  isActive(link.href) ? 'text-action-orange' : 'text-dark-text'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-2 w-full py-3 bg-trusted-blue text-white text-center font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Zap className="w-5 h-5" />
              Get Instant Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
