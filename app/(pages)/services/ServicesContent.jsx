'use client'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { 
  FaTools, FaHeadset, FaCogs, FaUserGraduate, FaShieldAlt, 
  FaWrench, FaSyncAlt, FaRocket, FaChartLine, FaAward,
  FaArrowRight, FaCheck, FaLightbulb, FaIndustry
} from 'react-icons/fa';
import { HiSparkles, HiTrendingUp, HiCog } from 'react-icons/hi';
import Head from 'next/head';
import "keen-slider/keen-slider.min.css";

const services = [
  {
    title: 'Complete Capping Performance Responsibility',
    description: 'We take full ownership of your capping performance, ensuring optimal closure application to maximize efficiency and minimize downtime.',
    icon: <FaTools className="text-4xl text-blue-500" />,
    features: ['24/7 Monitoring', 'Performance Guarantee', 'Real-time Analytics'],
    color: 'from-blue-500 to-indigo-600',
    category: 'Performance'
  },
  {
    title: 'Expert Engineer Visits',
    description: 'Our capping specialists provide continuous on-site support, conducting thorough inspections and offering tailored solutions.',
    icon: <FaHeadset className="text-4xl text-emerald-500" />,
    features: ['On-site Support', 'Expert Consultation', 'Custom Solutions'],
    color: 'from-emerald-500 to-teal-600',
    category: 'Support'
  },
  {
    title: 'Cost-Effective Consumable Spares',
    description: 'Supply of high-quality capping machinery spares at 10-20% of OEM costs, encouraging timely replacement of worn-out parts.',
    icon: <FaCogs className="text-4xl text-purple-500" />,
    features: ['80% Cost Savings', 'Premium Quality', 'Fast Delivery'],
    color: 'from-purple-500 to-pink-600',
    category: 'Parts'
  },
  {
    title: 'Machinery Health Checkups',
    description: 'Comprehensive diagnostics to identify and resolve issues affecting capping performance, ensuring seamless operations.',
    icon: <FaWrench className="text-4xl text-orange-500" />,
    features: ['Predictive Analysis', 'Health Reports', 'Issue Prevention'],
    color: 'from-orange-500 to-red-600',
    category: 'Maintenance'
  },
  {
    title: 'Operator & Engineer Training',
    description: 'Specialized training programs for your team to master capping processes and troubleshoot issues effectively.',
    icon: <FaUserGraduate className="text-4xl text-cyan-500" />,
    features: ['Certified Programs', 'Hands-on Training', 'Skill Development'],
    color: 'from-cyan-500 to-blue-600',
    category: 'Training'
  },
  {
    title: 'Peak Season Optimization',
    description: 'Ensure optimal closure usage during peak seasons, reducing revenue loss due to improper capping applications.',
    icon: <FaShieldAlt className="text-4xl text-rose-500" />,
    features: ['Seasonal Planning', 'Capacity Optimization', 'Revenue Protection'],
    color: 'from-rose-500 to-pink-600',
    category: 'Optimization'
  },
  {
    title: 'Preventive Maintenance',
    description: 'Proactive maintenance strategies to avoid sudden breakdowns and maintain consistent capping performance.',
    icon: <FaSyncAlt className="text-4xl text-indigo-500" />,
    features: ['Scheduled Maintenance', 'Breakdown Prevention', 'Uptime Guarantee'],
    color: 'from-indigo-500 to-purple-600',
    category: 'Maintenance'
  },
  {
    title: 'Capping Technology Innovation',
    description: 'Continuous improvement in capping technologies, addressing faults and implementing corrective actions.',
    icon: <FaRocket className="text-4xl text-green-500" />,
    features: ['Latest Technology', 'Innovation Focus', 'Future-Ready'],
    color: 'from-green-500 to-emerald-600',
    category: 'Innovation'
  },
  {
    title: 'Closure Transition Support',
    description: 'Expert assistance in transitioning from 1810 long neck to 1881 short neck closures for enhanced efficiency.',
    icon: <FaChartLine className="text-4xl text-yellow-500" />,
    features: ['Seamless Transition', 'Expert Guidance', 'Efficiency Boost'],
    color: 'from-yellow-500 to-orange-600',
    category: 'Support'
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Pacific Beverages",
    text: "VformIndustries transformed our capping process. 40% increase in efficiency!",
    rating: 5
  },
  {
    name: "Mike Chen",
    company: "Global Manufacturing",
    text: "Outstanding support and cost-effective solutions. Highly recommended.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    company: "Premium Foods Corp",
    text: "Their preventive maintenance program saved us thousands in downtime.",
    rating: 5
  }
];


const ServicesPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Keen Slider for testimonials
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 30 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 40 },
      },
    },
  });

  useEffect(() => {
    const handleResize = () => {
      // Dynamic navbar height detection
      const navbar = document.querySelector('nav') || document.querySelector('.navbar');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      } else {
        // Responsive navbar height based on screen size
        const screenHeight = window.innerHeight;
        if (screenHeight <= 640) setNavbarHeight(60);
        else if (screenHeight <= 768) setNavbarHeight(70);
        else setNavbarHeight(80);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['All', ...new Set(services.map(service => service.category))];
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <>
      <Head>
        <title>Premium Services & Solutions | VformIndustries</title>
        <meta name="description" content="Discover VformIndustries' comprehensive capping solutions with cutting-edge technology, expert support, and innovative approaches to industrial excellence." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Dynamic Hero Section */}
        <motion.section
          style={{ y, paddingTop: `${navbarHeight + 15}px` }}
          className="pb-0 relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: "url('servicecaps.jpg')" }} />

          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 opacity-50" >
            <div className="absolute inset-0 bg-black/20"></div>
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                backgroundSize: '100% 100%',
              }}
            />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                  <HiSparkles className="mr-2" />
                  Premium LTD
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Revolutionary
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                  Capping Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed"
              >
                Experience the future of industrial capping with our cutting-edge technology, 
                expert engineering, and unmatched performance optimization.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center z-10"
              >
                <a
                  href="#services"
                  className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore Services
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact#contactform"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Get Consultation
                </a>
              </motion.div>
            </div>
          </div>

          {/* Wave Bottom - Fixed positioning */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <svg className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 318">
              <path 
                fill="#f8fafc" 
                fillOpacity="1" 
                d="M0,192L34.3,197.3C68.6,203,137,213,206,234.7C274.3,256,343,288,411,304C480,320,549,320,617,298.7C685.7,277,754,235,823,229.3C891.4,224,960,256,1029,250.7C1097.1,245,1166,203,1234,170.7C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
              />
            </svg>
          </div>
        </motion.section>

        {/* Services Section - Adjusted background and positioning */}
          <section id="services" className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 sm:py-20 lg:py-24 relative -mt-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 pt-4" // Added pt-4 for top padding
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Comprehensive Service Portfolio
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From performance optimization to innovative solutions, we deliver excellence across every aspect of industrial capping.
                </p>
              </motion.div>

              {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={`${service.title}-${activeCategory}`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative"
                  >
                    <div className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                      hoveredIndex === index ? 'transform scale-105' : ''
                    }`}>
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Service Icon */}
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                          {service.icon}
                        </div>
                      </div>

                      {/* Service Content */}
                      <div className="relative">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                              <FaCheck className="text-green-500 mr-2 text-xs" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* Learn More Button */}
                        <AnimatePresence>
                          {hoveredIndex === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <a
                                href="#contact"
                                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                              >
                                Learn More
                                <FaArrowRight className="ml-2 text-sm" />
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 sm:py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600">
                Trusted by industry leaders worldwide
              </p>
            </div>

            <div ref={sliderRef} className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="keen-slider__slide">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mx-2">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                Join hundreds of satisfied clients who've revolutionized their capping processes with our innovative solutions and expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket className="mr-2" />
                  Start Your Journey
                </a>
                <a
                  href="contact#contactform"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <FaLightbulb className="mr-2" />
                  Explore Solutions
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ServicesPage;