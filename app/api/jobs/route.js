// app/api/jobs/route.js
import { fetchJobsFromGoogleSheets } from '@/lib/fetchJobs';

export async function GET() {
  try {
    const jobs = await fetchJobsFromGoogleSheets();
    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch jobs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
