'use client';

import { useState, useEffect, useCallback, useMemo, } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import Head from 'next/head';
import { debounce } from 'lodash';
import React from 'react';


// Placeholder for external utilities (assumed to be implemented)
import { fetchJobsClient, formatJobData } from '@/lib/read';


// Constants
const JOBS_PER_PAGE = 6;
const MAX_PAGE_BUTTONS = 5;


// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900 dark:to-pink-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-red-700 dark:text-red-300 text-lg">Something went wrong.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Skeleton Component for Loading State
const JobCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  </div>
);

export default function CareersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams.get('department') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1));
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Analytics Placeholder
  const trackEvent = useCallback((action, label) => {
    // Replace with actual analytics (e.g., gtag, Mixpanel)
    console.log(`Tracking: ${action} - ${label}`);
  }, []);

  // Load jobs
  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await fetchJobsClient();
      const formattedJobs = jobsData.map(formatJobData);
      setJobs(formattedJobs);
    } catch (err) {
      setError('Failed to load job listings');
      console.error('Jobs loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sticky filters
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const filtersElement = document.getElementById('filters-container');
      if (filtersElement) {
        const rect = filtersElement.getBoundingClientRect();
        setIsFiltersSticky(rect.top <= headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal close on Escape or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedJob(null);
    };

    if (selectedJob) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedJob]);

  // Initial load
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedDepartment !== 'all') params.set('department', selectedDepartment);
    if (selectedLocation !== 'all') params.set('location', selectedLocation);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedDepartment, selectedLocation, currentPage, router]);

  // Debounced search
  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setIsFiltering(true);
    }, 300),
    []
  );

  // Add cleanup for debounced function
useEffect(() => {
  return () => {
    debouncedSetSearchTerm.cancel();
  };
}, [debouncedSetSearchTerm]);

  // Format salary
  const formatSalary = useCallback((salary) => {
    if (!salary || typeof salary !== 'string' || salary.toLowerCase() === 'not specified') {
      return 'Salary Not Disclosed';
    }

    const cleanSalary = salary.replace(/[^0-9-]/g, '');
    if (!cleanSalary) return 'Salary Not Disclosed';

    const formatINR = (amount) => {
      if (isNaN(amount)) return 'N/A';
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
      return `₹${(amount / 1000).toFixed(0)}K`;
    };

    if (cleanSalary.includes('-')) {
      const [min, max] = cleanSalary.split('-').map(Number);
      if (isNaN(min) || isNaN(max)) return 'Salary Not Disclosed';
      return `${formatINR(min)} - ${formatINR(max)}`;
    }

    const numericSalary = Number(cleanSalary);
    if (isNaN(numericSalary)) return 'Salary Not Disclosed';

    const minSalary = Math.max(numericSalary - 50000, 0);
    const maxSalary = numericSalary + 50000;

    return `${formatINR(minSalary)} - ${formatINR(maxSalary)}`;
  }, []);

  // Apply button handler
  const handleApplyNow = useCallback((job) => {
    trackEvent('apply_click', job.title);
    if (job.formattedApplyUrl) {
      window.open(job.formattedApplyUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Application link not available. Please contact HR.');
    }
  }, [trackEvent]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [jobs, searchTerm, selectedDepartment, selectedLocation]);

  // Reset page if out of bounds
  useEffect(() => {
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredJobs, currentPage]);

  // Simulate filtering delay
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => setIsFiltering(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // Unique departments and locations
  const departments = useMemo(() => [...new Set(jobs.map(job => job.department))], [jobs]);
  const locations = useMemo(() => [...new Set(jobs.map(job => job.location))], [jobs]);

  // Render page buttons
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-md transition-colors text-sm ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900 dark:to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-700 dark:text-red-300 text-lg">{error}</p>
          <button 
            onClick={loadJobs}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <>
        <Head>
          <title>Career Opportunities | Your Company</title>
          <meta name="description" content="Explore exciting career opportunities and join our innovative team." />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 pt-16 sm:pt-20 lg:pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Join Our Team
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover exciting career opportunities and be part of our innovative journey
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div 
              id="filters-container"
              className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 ${
                isFiltersSticky ? 'sticky top-[80px] z-40 shadow-xl' : ''
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Search Jobs
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by title or department..."
                    defaultValue={searchTerm}
                    onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    aria-describedby="search-description"
                  />
                  <span id="search-description" className="sr-only">Search for jobs by title or department</span>
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    aria-describedby="department-description"
                  >
                    <option value="all">All Departments</option>
                    {departments.length > 0 ? (
                      departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))
                    ) : (
                      <option value="" disabled>No departments available</option>
                    )}
                  </select>
                  <span id="department-description" className="sr-only">Filter jobs by department</span>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    aria-describedby="location-description"
                  >
                    <option value="all">All Locations</option>
                    {locations.length > 0 ? (
                      locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))
                    ) : (
                      <option value="" disabled>No locations available</option>
                    )}
                  </select>
                  <span id="location-description" className="sr-only">Filter jobs by location</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{filteredJobs.length}</span> jobs found
              </p>
              {totalPages > 1 && (
                <p className="text-gray-600 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Note: For large datasets, consider using react-virtualized here */}
            {isFiltering ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Filtering jobs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {paginatedJobs.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search criteria
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {paginatedJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-2 py-1 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-800">
                                  {job.department}
                                </span>
                                <span className="px-2 py-1 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium border border-green-200 dark:border-green-800">
                                  {job.location}
                                </span>
                                <span className="px-2 py-1 bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium border border-purple-200 dark:border-purple-800">
                                  {job.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Salary Range
                              </span>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {formatSalary(job.salary)}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Experience
                              </span>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {job.experience}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Posted: {job.formattedDate}
                            </p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  trackEvent('view_details', job.title);
                                  setSelectedJob(job);
                                }}
                                className="px-3 py-1.5 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
                              >
                                View Details
                              </button>
                              <button 
                                onClick={() => handleApplyNow(job)}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {renderPageButtons()}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedJob && (
              <FocusTrap>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setSelectedJob(null);
                  }}
                  role="dialog"
                  aria-labelledby="job-modal-title"
                  aria-describedby="job-modal-description"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-[90vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h2 id="job-modal-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {selectedJob.title}
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-800">
                              {selectedJob.department}
                            </span>
                            <span className="px-2 py-1 bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium border border-green-200 dark:border-green-800">
                              {selectedJob.location}
                            </span>
                            <span className="px-2 py-1 bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium border border-purple-200 dark:border-purple-800">
                              {selectedJob.type}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedJob(null)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl ml-4"
                          aria-label="Close modal"
                        >
                          ×
                        </button>
                      </div>

                      <div id="job-modal-description" className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Job Description
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {selectedJob.description}
                          </p>
                        </div>

                        {selectedJob.requirementsList?.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              Requirements
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {selectedJob.requirementsList.map((req, index) => (
                                <li key={index} className="text-gray-700 dark:text-gray-300">
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedJob.benefitsList?.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              Benefits
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {selectedJob.benefitsList.map((benefit, index) => (
                                <li key={index} className="text-gray-700 dark:text-gray-300">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Salary Range
                            </span>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {formatSalary(selectedJob.salary)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Experience
                            </span>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {selectedJob.experience}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => handleApplyNow(selectedJob)}
                            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Apply Now
                          </button>
                          <button 
                            onClick={() => setSelectedJob(null)}
                            className="flex-1 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </FocusTrap>
            )}
          </AnimatePresence>
        </div>
      </>
    </ErrorBoundary>
  );
}