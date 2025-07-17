import { google } from 'googleapis';
import path from 'path';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID1; // Set in .env file
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RANGE1; // Change tab name if needed

export async function saveFormToSheet(data) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON1);

    // Fix newline characters in private_key
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const values = [
    new Date().toISOString(),
    data.name,
    data.email,
    data.company,
    data.phone,
    data.subject,
    data.message
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [values],
    },
  });
}
