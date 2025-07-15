'use client';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const clients = [
  {
    name: 'Coca-Cola',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
  },
  {
    name: 'Parle Agro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Parle_Agro_Logo.png',
  },
  {
    name: 'CavinKare',
    logo: 'https://cavinkare.com/wp-content/uploads/2017/01/logo.png',
  },
  {
    name: 'Hotel Parle International',
    logo: 'https://hotelparleinternational.com/wp-content/uploads/2023/04/parle-logo-png.png',
  },  
  {
    name: 'Daily Fresh',
    logo: 'https://dailyfresh.net.in/admin/upload/logo/663dcb1573303.png',
  },   
];

export default function ClientShowcase() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const observerRef = useRef(null);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized animation with RAF
  useEffect(() => {
    if (!isVisible) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5;
    let lastTime = 0;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 16) { // ~60fps throttle
        if (!isHovered) {
          scrollPositionRef.current += scrollSpeed;

          const firstChild = scrollContainer.firstChild;
          const singleSetWidth = firstChild ? firstChild.offsetWidth : 0;

          if (scrollPositionRef.current >= singleSetWidth) {
            scrollPositionRef.current = 0;
          }

          scrollContainer.style.transform = `translate3d(-${scrollPositionRef.current}px, 0, 0)`;
        }
        lastTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isVisible]);

  // Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleTouchStart = useCallback(() => setIsHovered(true), []);
  const handleTouchEnd = useCallback(() => setIsHovered(false), []);

  // Memoized logo card component
  const LogoCard = useMemo(() => ({ client, keyPrefix }) => (
    <div
      key={`${keyPrefix}-${client.name}`}
      className="flex-shrink-0 flex items-center justify-center px-8 py-8 min-w-[200px] group relative"
    >
      <div className="relative w-32 h-20 md:w-40 md:h-24 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/20">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/50 via-transparent to-gray-50/30"></div>
        
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            className="max-w-full max-h-full object-contain transition-all duration-300 ease-out"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.style.display = 'none';
              console.warn(`Failed to load logo for ${client.name}`);
            }}
          />
        </div>
        
        <div className="absolute inset-0 rounded-lg border border-blue-200/0 group-hover:border-blue-200/50 transition-all duration-300"></div>
      </div>
    </div>
  ), []);

  return (
    <section 
      ref={observerRef}
      className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50 relative overflow-hidden"
      aria-label="Our Esteemed Clients"
    >
      {/* Background Image with Effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('ourclients.jpg')",
          filter: 'sharpness(1.2) brightness(0.9) contrast(1.5)',
        }}
        aria-hidden="true"
      ></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:60px_60px] animate-[drift_20s_linear_infinite]"></div>
      </div>

      {/* Gradient Overlays */}
      <div
        aria-hidden="true"
        className="absolute left-0 inset-y-0 w-32 md:w-48 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent pointer-events-none z-20"
      ></div>
      <div
        aria-hidden="true"
        className="absolute right-0 inset-y-0 w-32 md:w-48 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent pointer-events-none z-20"
      ></div>
      
      {/* Radial Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.12),transparent)] opacity-60"
      ></div>

      {/* Subtle Vignette Effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4))] opacity-50"
      ></div>

      <div className="max-w-10xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide text-transform: uppercase drop-shadow-xl">
  Our Esteemed Clients
</h2>

          <div className="w-100 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto opacity-80"></div>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="marquee"
            aria-live="polite"
            aria-label="Client logos carousel"
          >
            <div
              ref={scrollRef}
              className="flex will-change-transform"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {/* First set */}
              <div className="flex flex-shrink-0">
                {clients.map((client, idx) => (
                  <LogoCard key={`first-${idx}`} client={client} keyPrefix="first" />
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex flex-shrink-0">
                {clients.map((client, idx) => (
                  <LogoCard key={`second-${idx}`} client={client} keyPrefix="second" />
                ))}
              </div>
            </div>
          </div>

          {/* Edge shadows */}
          <div
            aria-hidden="true"
            className="absolute -left-6 inset-y-0 w-6 bg-slate-950 pointer-events-none z-30"
          ></div>
          <div
            aria-hidden="true"
            className="absolute -right-6 inset-y-0 w-6 bg-slate-950 pointer-events-none z-30"
          ></div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translateX(-60px) translateY(-60px);
          }
          100% {
            transform: translateX(60px) translateY(60px);
          }
        }
      `}</style>
    </section>
  );
}