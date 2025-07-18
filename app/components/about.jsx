'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Award, Users, Microscope, Leaf,
  Target, CheckCircle2, ArrowRight
} from 'lucide-react';


const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galleryImages = [
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/Production-Area.jpg",
      title: "Production Area",
      category: "Manufacturing"
    },
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/Complete-Lab-facility-1.jpg",
      title: "Complete Lab Facility",
      category: "Quality Control"
    },
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/RESIN-FEEDING-SILOS.jpg",
      title: "Resin Feeding Silos",
      category: "Infrastructure"
    },
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/F.G.-Store.jpg",
      title: "Finished Goods Store",
      category: "Storage"
    },
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/Master-Batch-Liner-Bag-Bopp-Tape-ink-Store.jpg",
      title: "Raw Materials Store",
      category: "Storage"
    },
    {
      src: "https://www.secureclosures.com/wp-content/uploads/2019/05/Gardening-Area.jpg",
      title: "Gardening Area",
      category: "Environment"
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Innovation",
      description: "Pioneering advanced closure solutions through cutting-edge technology and creative engineering."
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Cooperation",
      description: "Building strong partnerships with customers and fostering collaborative teamwork internally."
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Excellence",
      description: "Maintaining the highest standards of perfection and productivity in every product."
    },
    {
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Sustainability",
      description: "Committed to sustainable advancement and environmentally responsible manufacturing."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) nextImage();
    else if (distance < -threshold) prevImage();
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden" role="region" aria-labelledby="about-section-title">
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-cyan-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400">Skip to main content</a>
      <h1 id="about-section-title" className="sr-only">About VForm Tecnopacks</h1>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.1)_50%,transparent_65%)] bg-[length:20px_20px] animate-pulse" />
      </div>

      {/* Hero Section */}
      <div id="main-content" className="relative w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 lg:-mt-50 order-1 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}> 
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <span className="text-cyan-400 font-medium tracking-wider uppercase text-xs sm:text-sm">
                  About VForm Tecnopacks
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" aria-label="Crafting Excellence Since Decades">
                <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Crafting Excellence
                </span>
                <br />
                <span className="text-white">Since Decades</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
              We believe in innovation, cooperation, and building the best products. Our technical team addresses every challenge with enthusiasm and curiosity, delivering premium quality plastic closures that exceed expectations.
            </p>
          </div>
          {/* Right Gallery */}
          <div className={`order-1 lg:order-2 ${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`}> 
            <div
              className="relative w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-label="Gallery navigation"
              aria-live="polite"
            >
              {/* Primary Image Container */}
              <div className="relative w-auto h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl group cursor-grab">
                <img
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlays & Navigation */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 pointer-events-none">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-4 sm:w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                        <span className="text-cyan-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                          {galleryImages[currentImageIndex].category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1">
                        {galleryImages[currentImageIndex].title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        {String(currentImageIndex + 1).padStart(2, '0')}
                      </div>
                      <div className="text-slate-400 text-xs sm:text-sm">
                        of {String(galleryImages.length).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 pointer-events-none">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                    style={{ width: `${((currentImageIndex + 1) / galleryImages.length) * 100}%` }}
                  />
                </div>
              </div>
              {/* Thumbnails */}
              <div className="hidden sm:block mt-4 sm:mt-6 px-4 sm:px-0">
                <div
                  className="flex px-2 space-x-3 overflow-x-auto py-2 scrollbar-hide"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                    touchAction: 'pan-x',
                  }}
                >
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      tabIndex={0}
                      aria-label={`Show image ${img.title}`}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 scroll-snap-align-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                        i === currentImageIndex
                          ? 'ring-2 ring-cyan-400 scale-105 bg-slate-900'
                          : 'opacity-60 hover:opacity-90 hover:scale-105 bg-slate-800'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 text-center">
                {[
                  ['25k+', 'Sq. Ft. Facility'],
                  ['ISO', 'Certified'],
                  ['24/7', 'Operations'],
                ].map(([value, label], idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-700/30 backdrop-blur-sm"
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400">{value}</div>
                    <div className="text-slate-400 text-xs sm:text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Core Values */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" role="region" aria-labelledby="core-values-title">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="core-values-title" className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Core Values</h2>
          <p className="text-lg sm:text-xl text-slate-400">The principles that drive our excellence</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-6 sm:p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-cyan-400">
                <div className="text-cyan-400 mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quality Policy */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" role="region" aria-labelledby="quality-policy-title">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <Microscope className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
              <h2 id="quality-policy-title" className="text-3xl sm:text-4xl font-bold text-white">Quality Policy</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
          </div>
          <div className="relative p-8 sm:p-12 bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-600/30">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-cyan-400 font-medium mb-6 sm:mb-8 italic">
              "Quality is never an accident. It is always the result of intelligent effort"
            </blockquote>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8">
              Quality Products and Services are our top priority. We recognize quality as a critical aspect that fuels our growth and success. Our objective is to continuously improve product quality, satisfy customer needs and expectations, while fulfilling our organizational goal of making "Premium Quality Plastic Closures."
            </p>
            <a href="/about/quality-standards" className="flex items-center justify-center space-x-2 sm:space-x-3 text-cyan-400 hover:text-blue-400 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-200" aria-label="Learn more about our quality standards">
              <span className="text-base sm:text-lg font-medium">Learn More About Our Quality Standards</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;