import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { verifyCsrfToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  // Check CSRF token
  const csrfToken = request.headers.get('x-csrf-token') || '';
  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const { threadId } = await request.json();

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Fetch all messages from the thread
    const messagesList = await openai.beta.threads.messages.list(threadId);

    // Format the messages for the frontend
    const messages = messagesList.data
      .map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: (msg.content[0] as OpenAI.Beta.Threads.TextContentBlock).text.value,
        timestamp: msg.created_at,
      }))
      .filter((msg) => msg.content) // Filter out any messages without content
      .reverse(); // Reverse to get oldest messages first

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching thread messages:', error);
    return NextResponse.json({ error: 'Failed to fetch thread messages' }, { status: 500 });
  }
}
