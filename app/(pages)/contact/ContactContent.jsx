'use client'

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Form validation schema
const formSchema = {
  name: { 
    required: 'Name is required', 
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Name must be less than 50 characters' }
  },
  email: { 
    required: 'Email is required', 
    pattern: { 
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
      message: 'Please enter a valid email address' 
    } 
  },
  company: { 
    required: 'Company name is required',
    maxLength: { value: 100, message: 'Company name must be less than 100 characters' }
  },
  phone: {
    pattern: {
      value: /^[\+]?[0-9\s\-\(\)]+$/,
      message: 'Please enter a valid phone number'
    }
  },
  subject: {
    required: 'Subject is required',
    maxLength: { value: 100, message: 'Subject must be less than 100 characters' }
  },
  message: { 
    required: 'Message is required', 
    minLength: { value: 10, message: 'Message must be at least 10 characters' },
    maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
  },
};

// Multiple office locations
const officeLocations = [
  {
  id: 1,
  name: "Head Office",
  company: "VFORM Tecnopacks Pvt. Ltd.",
  address: {
    street: "B-201, Everest Nivara Infotech Park-I, Plot No. D-3,",
    area: "TTC Industrial Area, MIDC, Indira Nagar, Turbhe,",
    city: "Navi Mumbai, Thane, MH-400705, India"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15084.688953904496!2d73.0285435!3d19.071354!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c15e33948c51%3A0xd434e73b1a071942!2sSecure%20Industries%20Private%20Limited!5e0!3m2!1sen!2sin!4v1720188890000!5m2!1sen!2sin",
  isDefault: true
},

  {
    id: 2,
    name: "Manufacturing Unit 1",
    company: "VFORM Tecnopacks Pvt. Ltd.",
    address: {
      street: "Sy.No. 75, Yellaram Road,",
      area: "Chandapur Village Sadasivpet Mandal,",
      city: "Sangareddy Dist., Telangana - 502291, India"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.8211742171743!2d77.92345537492487!3d17.65862669493516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc95558f007f4e3%3A0xc206cf57b900db96!2sSecure%20Industries%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1751719537464!5m2!1sen!2sin",
    isDefault: false
  },
  {
    id: 3,
    name: "Manufacturing Unit 2",
    company: "VFORM Tecnopacks Pvt. Ltd.",
    address: {
      street: "Survey No.86/A, Kambalapally Village,",
      area: "Sadasivpet Mandal,Sangareddy Dist.,",
      city: "Telangana - 502291, India"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.412949012247!2d77.93076207492336!3d17.58311499713754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbff15826cfaaf%3A0xe98984a529dd201!2sVform%20Tecnopacks%20Private%20Limited!5e0!3m2!1sen!2sin!4v1751719620526!5m2!1sen!2sin",
    isDefault: false
  },
  {
    id: 4,
    name: "Manufacturing Unit 3",
    company: "VFORM Tecnopacks Pvt. Ltd.",
    address: {
      street: "Kila No. 189,Tehsil Meham Village,",
      area: "Madina Grindhan, Hissar Road,",
      city: "Mokhara Road, Haryana-124111, India"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7511915.619462661!2d71.88863290267712!3d23.172844264889257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391277c3635c26bb%3A0xcb5c91b52c1618c!2sVFORM%20Tecnopacks%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1751719714948!5m2!1sen!2sin",
    isDefault: false
  }
];

const contactInfo = {
  phones: [
    { label: "Marketing Inquiry", number: "+91 99307 62241", href: "tel:+919930762241" },
    { label: "HR Inquiry", number: "+91 86575 33268", href: "tel:+918657533268" },
    { label: "Sales Support", number: "+91 98765 43210", href: "tel:+919876543210" }
  ],
  emails: [
    { label: "HR Department", address: "hohr@secureclosures.com", href: "mailto:hohr@secureclosures.com" },
    { label: "General Inquiry", address: "admin@secureclosures.com", href: "mailto:admin@secureclosures.com" },
    { label: "Sales Inquiry", address: "sales@secureclosures.com", href: "mailto:sales@secureclosures.com" }
  ],
  businessHours: "Monday - Friday: 9:00 AM - 6:00 PM IST"
};

export default function ContactContent() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(officeLocations.find(loc => loc.isDefault));

  // Form submission handler
  const onSubmit = useCallback(async (data) => {
    try {
      setSubmitStatus('submitting');
      
      const formData = {
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        page: 'contact'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      toast.success('Message sent successfully! We\'ll get back to you soon.', { 
        duration: 5000,
        position: 'top-right'
      });
      reset();
      setIsModalOpen(true);
      
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again or contact us directly.', { 
        duration: 5000,
        position: 'top-right'
      });
    }
  }, [reset]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.1,
        ease: "easeOut"
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] text-white overflow-hidden pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
         <div
  className="absolute inset-0 bg-cover bg-no-repeat z-0
             bg-[position:70%_top] md:bg-[position:80%_top] lg:bg-[position:90%_top]"
  style={{
    backgroundImage: "url('/contactus.jpeg')",
  }}
/>


  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent opacity-80 z-10" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Connect with Vform Tecnopacks
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed opacity-90">
              Your trusted partner for innovative plastic caps and closures solutions across India
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
              variants={itemVariants}
            >
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🏭 4 Manufacturing Units
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                📞 24/7 Support
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🚀 Quick Response
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">


                                                  {/* Row 1 */}
                                                  <div className="order-2 lg:order-1">
          <motion.div id="contactform" variants={cardVariants}>


                                                {/* OUR LOCATIONS */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Locations</h2>
                  <p className="text-gray-600">Choose a location to view on map</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {officeLocations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedLocation?.id === location.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-2">
                      <MapPinIcon className={`w-5 h-5 mr-2 ${selectedLocation?.id === location.id ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-semibold text-gray-900">{location.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{location.address.city}</p>
                  </motion.button>
                ))}
              </div>

              {/* Selected Location Details */}
              <AnimatePresence mode="wait">
                {selectedLocation && (
                  <motion.div
                    key={selectedLocation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-700 mb-1">{selectedLocation.company}</p>
                    <address className="text-sm text-gray-600 not-italic leading-relaxed">
                      {selectedLocation.address.street}<br />
                      {selectedLocation.address.area}<br />
                      {selectedLocation.address.city}
                    </address>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </motion.div> 
</div>
<div className="order-3 lg:order-3">
                                               {/* PHONE NUMBERS */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 space-y-8">
  <div className="space-y-6">
    {/* Phone Numbers */}
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
          <PhoneIcon className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Numbers</h3>
        <div className="space-y-4">
          {contactInfo.phones.map((phone, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 transition-shadow duration-200">
              <div>
                <p className="text-sm text-gray-500">{phone.label}</p>
                <a
                  href={phone.href}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {phone.number}
                </a>
              </div>
              {/* Add a small icon for easy recognition */}
              <div className="ml-3">
                <ArrowRightIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Email Addresses */}
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
          <EnvelopeIcon className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Addresses</h3>
        <div className="space-y-4">
          {contactInfo.emails.map((email, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 transition-shadow duration-200">
              <div>
                <p className="text-sm text-gray-500">{email.label}</p>
                <a
                  href={email.href}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {email.address}
                </a>
              </div>
              {/* Add a small icon for easy recognition */}
              <div className="ml-3">
                <ArrowRightIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Business Hours */}
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
          <ClockIcon className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
        <div className="bg-gray-50 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 transition-shadow duration-200">
          <p className="text-gray-700">{contactInfo.businessHours}</p>
        </div>
      </div>
    </div>
  </div>
            </div>

                 
</div>

                                                 {/* Row 2 */}
                                                  {/* MAP */}
                                                    <div className="order-1 lg:order-2">
                                                  
        <motion.div 
          variants={cardVariants} 
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"

        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Us on Map</h3>
            <p className="text-gray-600">
              Currently showing: <span className="font-medium text-blue-600">{selectedLocation?.name}</span>
            </p>
          </div>
          <div className="relative h-96 w-full">
            <AnimatePresence mode="wait">
              {selectedLocation && (
                <motion.iframe
                  key={selectedLocation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={selectedLocation.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${selectedLocation.name} - ${selectedLocation.address.city}`}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        </div>
<div className="order-4 lg:order-4">
                                             {/* SEND US A MESSAGE */}
        <motion.div id="contactform" variants={cardVariants}>
  <div className="order-4 lg:order-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-10">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center mb-8 gap-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
        <EnvelopeIcon className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Send Us a Message
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          We'll respond within 24 hours
        </p>
      </div>
    </div>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              {...register('name', formSchema.name)}
              className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
                errors.name 
                  ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
              } focus:ring-4 focus:outline-none`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <span>⚠️</span> {errors.name.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              {...register('email', formSchema.email)}
              className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
                errors.email 
                  ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
              } focus:ring-4 focus:outline-none`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <span>⚠️</span> {errors.email.message}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Company & Phone Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Field */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="company"
              type="text"
              {...register('company', formSchema.company)}
              className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
                errors.company 
                  ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
              } focus:ring-4 focus:outline-none`}
              placeholder="Your Company Name"
            />
            {errors.company && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <span>⚠️</span> {errors.company.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              {...register('phone', formSchema.phone)}
              className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
                errors.phone 
                  ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
              } focus:ring-4 focus:outline-none`}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <span>⚠️</span> {errors.phone.message}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            {...register('subject', formSchema.subject)}
            className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
              errors.subject 
                ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:ring-4 focus:outline-none`}
            placeholder="Brief description of your inquiry"
          />
          {errors.subject && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <span>⚠️</span> {errors.subject.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            {...register('message', formSchema.message)}
            rows="6"
            className={`w-full px-4 py-4 border-2 rounded-2xl shadow-sm transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-900 ${
              errors.message 
                ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            } focus:ring-4 focus:outline-none`}
            placeholder="Tell us about your requirements, questions, or how we can help you..."
          />
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <span>⚠️</span> {errors.message.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 text-lg ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed transform scale-95'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95'
        } focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
        whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            <span>Sending Message...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>Send Message</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        )}
      </motion.button>
    </form>
  </div>
</motion.div>         
</div>

        </div>

      </section>

      {/* Success Modal */}
      <Transition show={isModalOpen} as="div">
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                      Message Sent Successfully!
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Thank you for contacting Vform Tecnopacks. We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors duration-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors duration-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </motion.main>
  );
}