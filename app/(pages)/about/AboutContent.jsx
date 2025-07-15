'use client'
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Eye, Target, Award, Users, Lightbulb, Globe, Shield, Recycle, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';



const OptimizedVideo = React.memo(() => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.preload = 'auto';
    video.loading = 'eager';
    const handleLoadedData = () => {
      setIsLoaded(true);
      video.play().catch(() => {});
    };
    video.addEventListener('loadeddata', handleLoadedData);
    video.load();
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0" style={{ willChange: 'opacity, transform' }}>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}
        src="/aboutsection.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        decoding="async"
        style={{ willChange: 'opacity, transform' }}
      />
      {/* Single overlay for better performance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" style={{ willChange: 'opacity' }}></div>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-white/80"></div>
            <p className="text-white/70 text-sm font-medium">Loading experience...</p>
          </div>
        </div>
      )}
    </div>
  );
});

const AnimatedCounter = React.memo(({ end, duration = 1800, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const counterRef = useCallback(node => {
    if (node && !hasStarted) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
            
            let startTime;
            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.3, rootMargin: '50px' }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [end, duration, hasStarted]);
  
  return <span ref={counterRef}>{count.toLocaleString()}{suffix}</span>;
});

const COMPANY_DATA = {
  sections: [
    {
      id: 'vision',
      title: "Our Vision",
      icon: Eye,
      content: "Leading global plastic closures innovation while protecting our planet and people through sustainable manufacturing excellence.",
      highlights: ["Global Leadership", "Environmental Impact", "Labor Rights", "Business Ethics"],
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      delay: 0
    },
    {
      id: 'mission',
      title: "Our Mission",
      icon: Target,
      content: "Innovation-driven manufacturing delivering premium closures through collaborative excellence and sustainable practices.",
      details: [
        "Technical excellence in cap design, mold manufacturing, and customer solutions",
        "Collaborative problem-solving leveraging diverse expertise and experience",
        "Ethical business operations maintaining highest standards of conduct"
      ],
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      delay: 100
    },
    {
      id: 'quality',
      title: "Quality Policy", 
      icon: Award,
      content: "Quality is never an accident. It is always the result of intelligent effort.",
      details: [
        "Premium quality products driving company growth and customer satisfaction",
        "Efficient production performance minimizing waste and reducing costs",
        "Continuous quality improvement meeting evolving customer expectations"
      ],
      gradient: "from-orange-500 via-red-500 to-pink-600",
      delay: 200
    }
  ],
  
  stats: [
    { label: "Years Excellence", value: 25, suffix: "+", icon: Sparkles },
    { label: "Global Clients", value: 500, suffix: "+", icon: Users },
    { label: "Countries", value: 30, suffix: "+", icon: Globe },
    { label: "Products Made", value: 50, suffix: "M+", icon: TrendingUp }
  ],
  
  values: [
    { 
      icon: Lightbulb, 
      title: "Innovation", 
      description: "Cutting-edge solutions driving industry evolution",
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      icon: Shield, 
      title: "Quality", 
      description: "Uncompromising excellence in every product",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      icon: Recycle, 
      title: "Sustainability", 
      description: "Environmental stewardship in all operations",
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      icon: Users, 
      title: "Partnership", 
      description: "Collaborative success through teamwork",
      gradient: "from-purple-500 to-pink-600"
    }
  ]
};

const SectionCard = React.memo(({ section, index, isHovered, onHover }) => {
  const IconComponent = section.icon;
  const isReversed = index % 2 !== 0;
  
  return (
    <article 
      className={`group flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 ${isReversed ? 'lg:flex-row-reverse' : ''} animate-fade-in-up w-full`}
      style={{ animationDelay: `${section.delay}ms` }}
    >
      <div className="flex-1 min-w-0">
        <div
          className={`bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] hover:bg-white w-full ${
            isHovered === index ? 'shadow-2xl scale-[1.02] bg-white' : ''
          }`}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
        >
          <header className={`bg-gradient-to-br ${section.gradient} text-white p-6 lg:p-8 rounded-t-3xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center gap-4 lg:gap-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 lg:p-4 rounded-2xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg flex-shrink-0">
                <IconComponent className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">{section.title}</h3>
            </div>
          </header>
          
          <div className="p-6 lg:p-8">
            <p className="text-gray-700 leading-relaxed text-lg lg:text-xl mb-6 lg:mb-8 font-medium">{section.content}</p>
            
            {section.highlights && (
              <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
                {section.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 lg:px-5 py-2 lg:py-3 rounded-full text-xs lg:text-sm font-semibold border border-blue-100 hover:scale-105 hover:shadow-md transition-all duration-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
            
            {section.details && (
              <ul className="space-y-4 lg:space-y-5">
                {section.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 lg:gap-4 group/item">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1.5 lg:p-2 mt-1 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300 shadow-sm flex-shrink-0">
                      <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1 text-sm lg:text-base font-medium">{detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className={`bg-gradient-to-br ${section.gradient} rounded-3xl p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-center group-hover:scale-105 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <IconComponent className="w-28 h-28 mx-auto mb-6 opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
            <h4 className="text-2xl font-bold tracking-tight">{section.title}</h4>
            <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mt-6"></div>
          </div>
        </div>
      </aside>
    </article>
  );
});

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  const handleCardHover = useCallback((index) => setHoveredCard(index), []);
  const handleValueHover = useCallback((index) => setHoveredValue(index), []);

  const memoizedStats = useMemo(() => 
    COMPANY_DATA.stats.map((stat) => {
      const IconComponent = stat.icon;
      return (
        <div key={stat.label} className="text-center group">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 w-16 h-16 lg:w-20 lg:h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-xl">
            <IconComponent className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 lg:mb-4 tracking-tight">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-gray-600 font-semibold text-base lg:text-lg tracking-wide">{stat.label}</div>
        </div>
      );
    }), []
  );

  return (
    <div className="w-full overflow-x-hidden">
      <main className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <header className="h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 px-4 sm:px-8 md:px-20 lg:px-40 overflow-hidden flex items-center">
          <OptimizedVideo />
          
          <div className="absolute inset-0 opacity-20 z-10">
            <div className="absolute top-20 left-10 w-72 h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 lg:w-96 lg:h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 lg:w-72 lg:h-72 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          <div className="relative z-20 text-center max-w-7xl mx-auto w-full">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 lg:px-8 py-3 lg:py-4 mb-8 lg:mb-12 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Globe className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              <span className="text-base lg:text-lg font-semibold tracking-wide">Global Excellence Since 1999</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 lg:mb-12 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight tracking-tight break-words">
              About <span className="relative text-blue-500">Vform</span> Tecnopacks
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-16 lg:mb-20 opacity-90 max-w-5xl mx-auto leading-relaxed font-medium tracking-wide px-4">
              Global leader in premium plastic closure solutions, committed to innovation, quality, and sustainability
            </p>
          </div>
        </header>

        <section className="py-16 lg:py-24 px-4 sm:px-8 md:px-20 lg:px-40 bg-white relative overflow-hidden" aria-labelledby="stats-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 to-purple-50/60"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-48 h-48 lg:w-64 lg:h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 lg:w-64 lg:h-64 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16 lg:mb-20">
              <h2 id="stats-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 mb-6 lg:mb-8 tracking-tight">
                Our Impact in Numbers
              </h2>
              <div className="w-24 lg:w-32 h-1.5 lg:h-2 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {memoizedStats}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-4 sm:px-8 md:px-20 lg:px-40 bg-gradient-to-br from-gray-50 to-slate-50" aria-labelledby="content-heading">
          <h2 id="content-heading" className="sr-only">Company Information</h2>
          <div className="space-y-16 lg:space-y-24 max-w-7xl mx-auto w-full">
            {COMPANY_DATA.sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                isHovered={hoveredCard}
                onHover={handleCardHover}
              />
            ))}
          </div>
        </section>

        <section className="py-16 lg:py-24 px-4 sm:px-8 md:px-20 lg:px-40 bg-white relative overflow-hidden" aria-labelledby="values-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16 lg:mb-20">
              <h2 id="values-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 mb-6 lg:mb-8 tracking-tight">
                Our Core Values
              </h2>
              <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium leading-relaxed px-4">
                The principles that guide everything we do
              </p>
              <div className="w-28 lg:w-36 h-1.5 lg:h-2 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-6 lg:mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-10">
              {COMPANY_DATA.values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <article
                    key={value.title}
                    className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-100 w-full ${
                      hoveredValue === index ? 'scale-105 shadow-2xl' : ''
                    }`}
                    onMouseEnter={() => handleValueHover(index)}
                    onMouseLeave={() => handleValueHover(null)}
                  >
                    <div className="p-6 lg:p-8 text-center">
                      <div className={`bg-gradient-to-br ${value.gradient} w-16 h-16 lg:w-20 lg:h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 lg:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-5 tracking-tight">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">{value.description}</p>
                    </div>
                    
                    <div className={`h-2 bg-gradient-to-r ${value.gradient} transform origin-left transition-all duration-500 ${
                      hoveredValue === index ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-4 sm:px-8 md:px-20 lg:px-40 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 lg:w-72 lg:h-72 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 lg:mb-8 tracking-tight">
              Ready to Partner with Us?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-12 lg:mb-16 opacity-90 max-w-4xl mx-auto font-medium leading-relaxed px-4">
              Experience premium quality closures and exceptional service that drives your business forward
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold text-base lg:text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 group w-full sm:w-auto">
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold text-base lg:text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}