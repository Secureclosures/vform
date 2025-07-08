// lib/fetchJobs.js
import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const RANGE = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:L';

export async function fetchJobsFromGoogleSheets() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    // Fix newline characters in private_key
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const data = res.data.values;
    if (!data || data.length < 2) return [];

    const rows = data.slice(1);

    const jobs = rows.map((row, index) => ({
      id: index + 1,
      title: row[0] || '',
      department: row[1] || '',
      location: row[2] || '',
      type: row[3] || '',
      experience: row[4] || '',
      salary: row[5] || '',
      description: row[6] || '',
      requirements: row[7] || '',
      benefits: row[8] || '',
      postedDate: row[9] || new Date().toISOString().split('T')[0],
      status: row[10] || 'active',
      applyUrl: row[11] || '',
    })).filter(job => job.title && job.status === 'active');

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs with embedded credentials:', error);
    return [];
  }
}
