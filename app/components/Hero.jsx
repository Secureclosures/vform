'use client'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Default slides data for plastic caps manufacturing with dynamic metrics
const DEFAULT_SLIDES = [
  {
    image: "/featured1.jpg",
    title: "Precision Plastic Caps",
    subtitle: "Precision-Engineered Plastic Closures for Beverages and Juices",
    ctaText: "Explore Products",
    ctaSecondary: "Watch Demo",
    stats: { number: "50M+", label: "Caps Monthly" },
    features: ["FDA Approved", "ISO Certified", "Custom Colors"],
    metrics: {
      Quality: 5,
      Speed: 4,
      Reliability: 5
    }
  },
  {
    image: "/featured2.jpg",
    title: "Advanced Manufacturing",
    subtitle: "Cutting-Edge Injection Molding for Flawless Cap Production",
    ctaText: "See Technology",
    ctaSecondary: "Get Quote",
    stats: { number: "99.9%", label: "Quality Rate" },
    features: ["24/7 Production", "Quality Control", "Fast Delivery"],
    metrics: {
      Quality: 5,
      Speed: 5,
      Reliability: 4
    }
  },
  {
    image: "/featured4.webm",
    title: "Sustainable Solutions",
    subtitle: "Recyclable and Sustainable – Designed with the Planet in Mind",
    ctaText: "Go Green",
    ctaSecondary: "Learn More",
    stats: { number: "100%", label: "Recyclable" },
    features: ["Carbon Neutral", "Bio-based Options", "Circular Economy"],
    metrics: {
      Quality: 4,
      Speed: 3,
      Reliability: 5
    }
  },
  {
    image: "/featured3.jpg",
    title: "Global Partnership",
    subtitle: "Trusted by Global Brands for Reliability and Exceptional Service",
    ctaText: "Partner Now",
    ctaSecondary: "View Network",
    stats: { number: "28", label: "Indian States" },
    features: ["Global Reach", "24/7 Support", "Competitive Pricing"],
    metrics: {
      Quality: 4,
      Speed: 4,
      Reliability: 5
    }
  }
];

const DEFAULT_INTERVAL = 6000;
const HOVER_INTERVAL = 10000;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};

const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

function Hero({
  slides = DEFAULT_SLIDES,
  autoAdvanceInterval = DEFAULT_INTERVAL,
  hoverAdvanceInterval = HOVER_INTERVAL,
  className = "",
  onSlideChange,
  onCtaClick
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  
  const heroRef = useRef(null);
  const intervalRef = useRef(null);
  const videoRefs = useRef({});
  
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const currentInterval = useMemo(() => {
    return isHovered ? hoverAdvanceInterval : autoAdvanceInterval;
  }, [isHovered, hoverAdvanceInterval, autoAdvanceInterval]);

  // Video restart effect when slide changes
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    if (currentSlideData?.image?.endsWith('.webm')) {
      const video = videoRefs.current[currentSlide];
      if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log('Video autoplay prevented:', e));
      }
    }
  }, [currentSlide, slides]);

  // Auto-advance slides
  useEffect(() => {
    if (prefersReducedMotion || isAnimating) return;
    
    const advanceSlide = () => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % slides.length);
    };
    
    intervalRef.current = setTimeout(advanceSlide, currentInterval);
    
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentSlide, currentInterval, prefersReducedMotion, isAnimating, slides.length]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    
    setDirection(index > currentSlide ? 1 : -1);
    setIsAnimating(true);
    setCurrentSlide(index);
    onSlideChange?.(index);
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, currentSlide, onSlideChange]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }, [slides.length]);

  const handleCtaClick = useCallback((slide, index, secondary = false) => (e) => {
    e.preventDefault();
    onCtaClick?.(slide, index, secondary);
  }, [onCtaClick]);

  const mouseHandlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  }), []);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, prevSlide, nextSlide]);

  if (!slides.length) {
    return (
      <section className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">No content available</h1>
          <p className="text-slate-400">Please provide slides data</p>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen w-full overflow-hidden bg-black pt-[72px] md:pt-28 pb-8 flex flex-col justify-center ${className}`}
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}
      {...mouseHandlers}
      role="banner"
      aria-label="Hero carousel"
    >
      {/* Background Images with Ken Burns Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? 'opacity-100 scale-105' 
                : 'opacity-0 scale-100'
            }`}
          >
            {slide.image.endsWith('.webm') ? (
              <video
                ref={el => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={slide.image}
                autoPlay={index === currentSlide}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(92%) contrast(110%) saturate(120%)',
                }}
                onLoadedData={() => {
                  // Ensure video starts from beginning when loaded
                  if (index === currentSlide && videoRefs.current[index]) {
                    videoRefs.current[index].currentTime = 0;
                  }
                }}
              />
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(92%) contrast(110%) saturate(120%)',
                }}
              />
            )}
          </div>
        ))}
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Main Content - Updated spacing for desktop */}
      <div className="relative z-20 h-full flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-12 lg:px-20 xl:px-32 2xl:px-40 md:py-20">
        {/* Left Content - Better spacing on desktop */}
        <div className="w-full lg:w-7/12 xl:w-1/2 max-w-4xl mx-auto lg:mx-0 lg:pr-8 xl:pr-16 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Slide Counter */}
          <div className="flex items-center gap-3 mb-4 md:mb-6 mt-4 md:mt-0">
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentSlide 
                      ? 'w-8 bg-blue-400' 
                      : idx < currentSlide 
                        ? 'w-4 bg-blue-600' 
                        : 'w-4 bg-white/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/70 text-xs md:text-sm font-medium">
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title with Animation - Updated gradients */}
          <h1 
            className={`font-black text-white mb-4 md:mb-6 leading-tight transition-all duration-700 ${
              direction > 0 ? 'animate-slide-up' : 'animate-slide-down'
            } ${
              isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-6xl xl:text-7xl'
            } md:text-left`}
            key={`title-${currentSlide}`}
          >
            {currentSlideData.title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-2 md:mr-3 mb-1 md:mb-2">
                <span className={`${
                  word.toLowerCase().includes('precision') || 
                  word.toLowerCase().includes('advanced') || 
                  word.toLowerCase().includes('sustainable') ||
                  word.toLowerCase().includes('global') ||
                  word.toLowerCase().includes('plastic') ||
                  word.toLowerCase().includes('manufacturing') ||
                  word.toLowerCase().includes('partnership')
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent' 
                    : ''
                }`}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-base md:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 transition-all duration-700 delay-100 md:text-left max-w-2xl`}
            key={`subtitle-${currentSlide}`}
          >
            {currentSlideData.subtitle}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center md:justify-start">
            {currentSlideData.features.map((feature, index) => (
              <span
                key={`${currentSlide}-feature-${index}`}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons - Updated colors */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start">
            <button
              onClick={handleCtaClick(currentSlideData, currentSlide)}
              className={`group relative px-6 py-3 md:px-8 md:py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 shadow-xl text-sm md:text-base ${
                currentSlideData.ctaText === "Go Green" 
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white focus:ring-emerald-500/50 hover:shadow-emerald-500/25"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-blue-500/50 hover:shadow-blue-500/25"
              }`}
            >
              <span className="relative z-10">{currentSlideData.ctaText}</span>
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                currentSlideData.ctaText === "Go Green"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                  : "bg-gradient-to-r from-blue-400 to-blue-500"
              }`} />
            </button>
            <button
              onClick={handleCtaClick(currentSlideData, currentSlide, true)}
              className="px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/25 text-sm md:text-base"
            >
              {currentSlideData.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Right Stats Card - Better positioning on desktop */}
        <div className="w-full lg:w-5/12 xl:w-auto mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-6 md:px-6 md:py-8 border border-white/20 shadow-2xl w-auto min-w-[240px] max-w-full transform transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:shadow-3xl">

            <div className="text-center">
              {/* Animated Number Display */}
              <div className="relative overflow-hidden h-12 md:h-16 mb-1 md:mb-2">
                <div 
                  className="text-3xl md:text-5xl font-black text-blue-400 transition-all duration-500 ease-out transform"
                  key={currentSlideData.stats.number}
                >
                  {currentSlideData.stats.number}
                </div>
              </div>
              
              {/* Animated Label */}
              <div className="relative overflow-hidden h-6 md:h-8 mb-4 md:mb-6">
                <div 
                  className="text-white/80 font-medium text-sm md:text-base transition-all duration-500 ease-out transform"
                  key={currentSlideData.stats.label}
                >
                  {currentSlideData.stats.label}
                </div>
              </div>
              
              {/* Dynamic Progress Visualization with Custom Metrics */}
              <div className="space-y-2 md:space-y-3">
                {Object.entries(currentSlideData.metrics || {}).map(([metric, rating]) => (
                  <div key={`${currentSlide}-${metric}`} className="flex items-center justify-between min-w-0">
                    <span
                      className="text-white/70 text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-[120px]"
                      title={metric}
                    >
                      {metric}
                    </span>
                    <div className="flex gap-1 flex-shrink-0" role="progressbar" aria-label={`${metric} rating: ${rating} out of 5`}>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                            i < rating
                              ? 'bg-blue-400 shadow-sm shadow-blue-400/50 scale-110'
                              : 'bg-white/20'
                          }`}
                          style={{
                            transitionDelay: `${i * 100}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtle Pulse Animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 animate-pulse pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 md:gap-6">
        {/* Navigation Dots */}
        <div className="flex gap-1 md:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? "bg-blue-400 scale-110 md:scale-125 shadow-lg shadow-blue-400/50" 
                  : "bg-white/40 hover:bg-white/60 hover:scale-110"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="p-1.5 md:p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="p-1.5 md:p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
            aria-label="Next slide"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Decorative Elements - Updated colors */}
      <div className="absolute top-20 right-6 md:right-20 w-20 h-20 md:w-32 md:h-32 bg-blue-400/10 rounded-full blur-2xl md:blur-3xl" />
      <div className="absolute bottom-32 left-6 md:bottom-40 md:left-20 w-16 h-16 md:w-24 md:h-24 bg-cyan-400/10 rounded-full blur-xl md:blur-2xl" />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.7s ease-out;
        }
      `}</style>
    </section>
  );
}

export default function App() {
  const handleSlideChange = (index) => {
    console.log('Slide changed to:', index);
  };

  const handleCtaClick = (slide, index, secondary = false) => {
    console.log(`${secondary ? 'Secondary' : 'Primary'} CTA clicked:`, slide.ctaText, 'on slide', index);
  };

  return (
    <div className="min-h-screen">
      <Hero 
        onSlideChange={handleSlideChange}
        onCtaClick={handleCtaClick}
      />
    </div>
  );
}