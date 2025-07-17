'use client'
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ];

  const industries = [
    { name: 'Beverage Industry', href: '#beverage' },
    { name: 'Pharmaceuticals', href: '#pharma' },
    { name: 'Cosmetics & Personal Care', href: '#cosmetics' },
    { name: 'Food & Nutrition', href: '#food' },
    { name: 'Chemical & Industrial', href: '#chemical' },
    { name: 'Automotive', href: '#automotive' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management' },
    { name: 'FDA Approved', desc: 'Food Safety' },
    { name: 'FSSC 22000', desc: 'Food Safety Systems' },
    { name: 'ISO 14001', desc: 'Environmental Management' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/aboutback.jpg" 
          alt="about us" 
          className="w-full h-full object-cover opacity-30 blur-sm select-none pointer-events-none" 
          draggable="false"
        />
      </div>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 rounded-full blur-2xl" />
      </div>
      {/* Main Footer Content */}
      <div className="relative z-20">
        {/* Top Section */}
        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
      {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
            <img 
              src="/logo.png" 
              alt="Vform Tecnopacks company logo featuring a stylized emblem, displayed next to the company name Vform Tecnopacks in bold text, set within a modern office branding environment" 
              className="w-16 h-16 object-contain rounded-full" 
            />
          
          <h3 className="text-2xl font-bold">Vform Tecnopacks</h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
          Leading manufacturer of precision plastic caps and closures, delivering innovative packaging solutions globally for over 28 years.
            </p>
            
            {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">H/O: Turbhe, Navi Mumbai</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">+91 8657533268</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">admin@vform.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries Served */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Industries Served</h4>
              <ul className="space-y-3">
                {industries.map((industry) => (
                  <li key={industry.name}>
                    <a 
                      href={industry.href}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {industry.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Certifications */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleSubscribe} className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium"
                  >
                    {isSubscribed ? '✓' : '→'}
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-emerald-400 text-xs mt-2">Successfully subscribed!</p>
                )}
              </form>

              {/* Certifications */}
              <div>
                <h5 className="text-sm font-semibold mb-4 text-slate-200">Certifications</h5>
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-emerald-500/30 transition-colors duration-300">
                      <div className="text-emerald-400 font-semibold text-xs mb-1">{cert.name}</div>
                      <div className="text-slate-400 text-xs">{cert.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Stats Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">50M+</div>
                  <div className="text-slate-400 text-xs">Monthly Production</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">500+</div>
                  <div className="text-slate-400 text-xs">Global Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">28+</div>
                  <div className="text-slate-400 text-xs">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-slate-400 text-xs">Quality Rate</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm mr-2">Follow Us:</span>
                {[
                  { icon: 'linkedin', href: '#' },
                  { icon: 'twitter', href: '#' },
                  { icon: 'facebook', href: '#' },
                  { icon: 'instagram', href: '#' },
                  { icon: 'youtube', href: '#' }
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 group"
                  >
                    {social.icon === 'linkedin' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {social.icon === 'twitter' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-2.51 0-4.551-2.041-4.551-4.551S5.94 7.885 8.449 7.885s4.551 2.041 4.551 4.551-2.041 4.552-4.551 4.552zm7.519 0c-2.51 0-4.551-2.041-4.551-4.551S13.459 7.885 15.968 7.885s4.551 2.041 4.551 4.551-2.041 4.552-4.551 4.552z"/>
                      </svg>
                    )}
                    {social.icon === 'youtube' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Vform Tecnopacks. All rights reserved. | Designed & Developed with precision manufacturing excellence.
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#privacy" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Cookie Policy
                </a>
                <a href="#sitemap" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;