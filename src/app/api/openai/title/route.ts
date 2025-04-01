import { verifyCsrfToken } from '@/lib/csrf';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// API route for title generation
export async function POST(request: NextRequest) {
  // Check CSRF token
  const csrfToken = request.headers.get('x-csrf-token') || '';

  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const { message } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "Generate a concise, descriptive title (5-7 words) for a flight search conversation based on the user's first message. Focus on the origin, destination, and dates if present. Do not include 'Flight Search' in the title. Without quotes.",
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 30,
    });

    const title = completion.choices[0].message.content?.trim() || 'Flight Search';
    return NextResponse.json({ title });
  } catch (error) {
    console.error('Error generating title:', error);
    return NextResponse.json({ title: 'Flight Search' });
  }
}
