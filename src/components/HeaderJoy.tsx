'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderJoy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="px-4 md:px-10 lg:px-20 mx-auto">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f1f5] py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-[#111218]">
            <span className="material-symbols-outlined text-2xl text-[#3D5AFE]">construction</span>
            <h2 className="text-[#111218] text-xl font-bold leading-tight tracking-[-0.015em]">WeFix4U</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            <Link 
              href="/" 
              className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                isActive('/') ? 'text-[#3D5AFE]' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/#services" 
              className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                isActive('/services') ? 'text-[#3D5AFE]' : 'text-gray-600'
              }`}
            >
              Services
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/sign-up" 
              className={`text-sm font-bold leading-normal border-b-2 transition-colors ${
                isActive('/sign-up') 
                  ? 'text-[#F57C00] border-[#F57C00]' 
                  : 'text-gray-600 border-transparent hover:text-[#3D5AFE]'
              }`}
            >
              Sign Up
            </Link>
            <Link 
              href="/sign-in" 
              className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                isActive('/sign-in') ? 'text-[#3D5AFE]' : 'text-gray-600'
              }`}
            >
              Log In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#f0f1f5] py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                  isActive('/') ? 'text-[#3D5AFE]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#services" 
                className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                  isActive('/services') ? 'text-[#3D5AFE]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#" 
                className="text-gray-600 text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/sign-up" 
                className={`text-sm font-bold leading-normal border-b-2 transition-colors ${
                  isActive('/sign-up') 
                    ? 'text-[#F57C00] border-[#F57C00]' 
                    : 'text-gray-600 border-transparent hover:text-[#3D5AFE]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link 
                href="/sign-in" 
                className={`text-sm font-medium leading-normal hover:text-[#3D5AFE] transition-colors ${
                  isActive('/sign-in') ? 'text-[#3D5AFE]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
