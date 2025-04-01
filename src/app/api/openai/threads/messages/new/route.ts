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
    const { threadId, lastMessageTimestamp } = await request.json();

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    // If no lastMessageTimestamp is provided, don't return any messages
    if (!lastMessageTimestamp) {
      return NextResponse.json({ messages: [] });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get messages after the last message timestamp
    const messagesResponse = await openai.beta.threads.messages.list(threadId);

    const lastTimestamp = new Date(lastMessageTimestamp).getTime();

    // console.log('New messages:', messagesResponse.data);

    const newMessages = messagesResponse.data
      .filter((msg) => {
        // Ensure we have text content
        if (!msg.content || msg.content.length === 0) return false;
        // if (msg.content[0].type !== 'text') return false;

        // Compare timestamps
        const msgTimestamp = new Date(msg.created_at).getTime();
        return msgTimestamp > lastTimestamp;
      })
      .map((msg) => ({
        id: msg.id, // Include message ID
        role: msg.role,
        content: (msg.content[0] as OpenAI.Beta.Threads.TextContentBlock).text.value,
        timestamp: msg.created_at,
      }))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort by timestamp

    return NextResponse.json({ messages: newMessages });
  } catch (error) {
    console.error('Error fetching new messages:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch new messages' },
      { status: 500 },
    );
  }
}
