'use client'
import { useState, useRef, useEffect } from 'react';
import Chatbot from '@/app/components/chatbot'; // Import your Chatbot component

const CompanySection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const tabs = [
    {
      id: 'overview',
      label: 'Company Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'technology',
      label: 'Technology',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 'quality',
      label: 'Quality Assurance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const tabContent = {
    overview: {
      title: "Leading Plastic Cap Manufacturing Excellence",
      content: [
        "Founded in 1995, we have grown to become India's premier manufacturer of precision plastic caps and closures, serving over 500+ brands across beverage, pharmaceutical, and cosmetic industries.",
        "Our state-of-the-art manufacturing facilities span across 5 locations in India, equipped with the latest injection molding technology and automated production lines capable of producing 50 million caps monthly.",
        "With a team of 1,200+ skilled professionals and engineers, we maintain the highest standards of quality while delivering innovative packaging solutions that meet global industry requirements."
      ],
      stats: [
        { number: "28+", label: "Years Experience" },
        { number: "500+", label: "Global Clients" },
        { number: "50M+", label: "Monthly Production" },
        { number: "99.9%", label: "Quality Rate" }
      ]
    },
    technology: {
      title: "Advanced Manufacturing Technology",
      content: [
        "Our manufacturing ecosystem features cutting-edge injection molding machines with Industry 4.0 capabilities, enabling real-time monitoring and predictive maintenance for optimal efficiency.",
        "We utilize advanced CAD/CAM systems for rapid prototyping and tooling, reducing product development time by 60% while ensuring precision engineering in every component.",
        "Our automated quality control systems employ vision inspection technology and statistical process control to maintain zero-defect manufacturing standards."
      ],
      stats: [
        { number: "24/7", label: "Production Hours" },
        { number: "±0.01mm", label: "Precision Tolerance" },
        { number: "30+", label: "Molding Machines" },
        { number: "100%", label: "Automated QC" }
      ]
    },
    sustainability: {
      title: "Committed to Environmental Responsibility",
      content: [
        "We are pioneers in sustainable packaging solutions, using 100% recyclable materials and offering bio-based plastic alternatives that reduce environmental impact without compromising quality.",
        "Our manufacturing processes are carbon-neutral, powered by renewable energy sources and equipped with advanced waste management systems that achieve zero liquid discharge.",
        "Through our circular economy initiatives, we help clients transition to sustainable packaging while maintaining cost-effectiveness and superior product performance."
      ],
      stats: [
        { number: "100%", label: "Recyclable Materials" },
        { number: "0", label: "Liquid Discharge" },
        { number: "50%", label: "Renewable Energy" },
        { number: "25%", label: "Bio-based Options" }
      ]
    },
    quality: {
      title: "Uncompromising Quality Standards",
      content: [
        "Our quality management system exceeds international standards with ISO 9001:2015, FDA, and FSSC 22000 certifications, ensuring every product meets stringent global requirements.",
        "We maintain dedicated clean rooms for pharmaceutical and food-grade applications, with comprehensive testing laboratories equipped with advanced analytical instruments.",
        "Our quality assurance process includes 15-point inspection protocols, material traceability systems, and continuous improvement programs driven by Six Sigma methodologies."
      ],
      stats: [
        { number: "15", label: "Quality Checkpoints" },
        { number: "100%", label: "Batch Traceability" },
        { number: "ISO", label: "Certified Standards" },
        { number: "6σ", label: "Quality Systems" }
      ]
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Image and Animated Molecules */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="/aboutback.jpg" 
          alt="About section background" 
          className="w-full h-full object-cover opacity-20 blur-sm" 
          draggable="false"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            About Our Company
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Precision Manufacturing,
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Global Excellence
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Three decades of innovation in plastic cap manufacturing, serving global brands with 
            sustainable, high-quality solutions that exceed industry standards.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              {currentContent.title}
            </h3>
            
            <div className="space-y-4">
              {currentContent.content.map((paragraph, index) => (
                <p key={index} className="text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-slate-900/25">
                <span>Learn More About Us</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Chat with Us Button */}
              <button 
                onClick={() => setIsChatbotOpen(true)}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Chat with Us</span>
              </button>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {currentContent.stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <div className={`mt-20 grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Global Reach</h4>
            <p className="text-slate-600">Serving clients across 28 Indian states and 15+ international markets</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Custom Solutions</h4>
            <p className="text-slate-600">Tailored manufacturing solutions for unique industry requirements</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">24/7 Support</h4>
            <p className="text-slate-600">Round-the-clock technical support and customer service</p>
          </div>
        </div>
      </div>

      {/* Floating Chat Button - Alternative Option */}
      {!isChatbotOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat with us
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
            </div>
          </button>
        </div>
      )}

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />

    </section>
  );
};

export default CompanySection;