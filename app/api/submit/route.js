// app/api/submit/route.js
import { saveFormToSheet } from '@/lib/saveFormToSheet';

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = ['name', 'email', 'company', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    await saveFormToSheet(body);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Error saving to sheet:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
