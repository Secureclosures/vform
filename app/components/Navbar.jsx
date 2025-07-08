'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Globe } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'IMFL', href: '/services/manufacturing' },
      { label: 'Water Closures', href: '/services/quality-control' },
      { label: 'Juice Closures', href: '/services/supply-chain' },
      { label: 'CSD Closures', href: '/services/consulting' },
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopBar, setShowTopBar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)
      // Hide top bar on scroll for mobile
      if (window.innerWidth < 768) {
        setShowTopBar(scrollY < 50)
      }
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowTopBar(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setActiveDropdown(null)
  }

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/96 backdrop-blur-lg shadow-xl border-b border-gray-100' : 'bg-white shadow-sm'
    }`}>
      {/* Enhanced top contact bar */}
      <div className={`bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white transition-all duration-300 ${
        showTopBar ? 'py-2.5 opacity-100' : 'py-0 opacity-0 h-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            {/* Contact info - responsive layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
              <a href="mailto:admin@vform.in" className="flex items-center gap-2 hover:text-blue-300 transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium truncate">admin@vform.in</span>
              </a>

              <div className="flex items-center gap-2 hover:text-blue-300 transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium">+91-8657533268</span>
              </div>
            </div>
            
            {/* Shown on sm and up */}
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm hover:text-blue-300 transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium">Turbhe, Navi Mumbai</span>
            </div>

            {/* Shown only below sm */}
            <div className="flex sm:hidden items-center gap-2 text-xs hover:text-blue-300 transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-medium">Mumbai</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Enhanced logo with better mobile presence */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative">
              <Image 
                src="/logo.png"
                alt="Vform Logo"
                width={130} 
                height={130} 
                className="w-11 h-11 lg:w-12 lg:h-12 rounded-full ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Vform Technopacks
              </span>
              <span className="text-[10px] lg:text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
                Industrial Solutions
              </span>
            </div>
          </Link>

          {/* Enhanced desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    
                    {/* Enhanced dropdown */}
                    <div className={`absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 ${
                      activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                    }`}>
                      <div className="py-3">
                        {item.children.map((child, index) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 font-medium ${
                              index !== item.children.length - 1 ? 'border-b border-gray-50' : ''
                            }`}
                          >
                            <Globe className="w-4 h-4 mr-3 opacity-60" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 py-2 group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Enhanced CTA button */}
            <Link
              href="/quote"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
          </div>

          {/* Enhanced mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 top-3' : 'top-1'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 top-3' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Enhanced mobile navigation */}
        <div className={`lg:hidden transition-all duration-400 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 space-y-1 border-t border-gray-100">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div className="rounded-lg overflow-hidden bg-gray-50/50">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center justify-between w-full py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180 text-blue-600' : ''
                      }`} />
                    </button>
                    
                    {/* Enhanced mobile dropdown */}
                    <div className={`overflow-hidden transition-all duration-300 bg-white ${
                      activeDropdown === item.label ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
                    }`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMenu}
                          className="flex items-center py-3 px-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                        >
                          <Globe className="w-4 h-4 mr-3 opacity-60" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-4 px-4 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Enhanced mobile CTA button */}
            <div className="px-4 pt-4">
              <Link
                href="/quote"
                onClick={closeMenu}
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}