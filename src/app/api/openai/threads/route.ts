import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrfToken } from '@/lib/csrf';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  // Check CSRF token
  const csrfToken = request.headers.get('x-csrf-token') || '';

  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a new thread
    const thread = await openai.beta.threads.create();

    return NextResponse.json(
      {
        threadId: thread.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}
