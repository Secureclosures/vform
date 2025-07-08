'use client'

// Client-side fetch function for dynamic updates
export async function fetchJobsClient() {
  try {
    const response = await fetch('/api/jobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Utility function to format job data
export function formatJobData(job) {
  return {
    ...job,
    formattedSalary: job.salary ? `$${job.salary}` : 'Competitive',
    formattedDate: new Date(job.postedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    requirementsList: job.requirements ? job.requirements.split('\n').filter(req => req.trim()) : [],
    benefitsList: job.benefits ? job.benefits.split('\n').filter(benefit => benefit.trim()) : [],
    // Ensure URL is properly formatted
    formattedApplyUrl: job.applyUrl ? (job.applyUrl.startsWith('http') ? job.applyUrl : `https://${job.applyUrl}`) : null
  };
}
