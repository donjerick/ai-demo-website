import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ZipAIToolkit } from '@zipph/ai-toolkit/openai';
import { verifyCsrfToken } from '@/lib/csrf';
import {
  extractCheckoutSessionId,
  generateBookingReference,
  generateFlights,
  registerCheckoutSession,
  scheduleCheckoutPolling,
} from '@/utils/flightUtils';
import { bookingReferences } from '@/lib/store';

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || '';

export async function POST(request: NextRequest) {
  // Check CSRF token
  const csrfToken = request.headers.get('x-csrf-token') || '';

  if (!verifyCsrfToken(csrfToken)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const { threadId, message } = await request.json();

    if (!threadId || !message) {
      return NextResponse.json({ error: 'Missing threadId or message' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Initialize the Zip AI Toolkit for payment capabilities
    const zipToolkit = new ZipAIToolkit({
      secretKey: process.env.ZIP_SECRET_KEY || '',
      configuration: {
        actions: {
          checkoutSessions: {
            create: true,
            read: true,
          },
          refunds: {
            create: true,
          },
          charges: {
            read: true,
          },
        },
      },
    });

    // Check for active runs on this thread
    const runs = await openai.beta.threads.runs.list(threadId);
    const activeRun = runs.data.find((run) =>
      ['queued', 'in_progress', 'requires_action'].includes(run.status),
    );

    // If there's an active run, cancel it
    if (activeRun) {
      try {
        await openai.beta.threads.runs.cancel(threadId, activeRun.id);
        // Wait a moment to ensure the cancellation is processed
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (cancelError) {
        console.error('Error cancelling previous run:', cancelError);
        // Continue anyway, as the run might have completed while we were trying to cancel it
      }
    }

    // Add the user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

    while (
      runStatus.status !== 'completed' &&
      runStatus.status !== 'failed' &&
      runStatus.status !== 'cancelled' &&
      runStatus.status !== 'expired'
    ) {
      // If requires action (function calling)
      if (runStatus.status === 'requires_action') {
        const toolCalls = runStatus.required_action!.submit_tool_outputs.tool_calls;
        const toolOutputs = [];

        // Process each tool call
        for (const toolCall of toolCalls) {
          if (toolCall.function.name === 'search_flights') {
            const args = JSON.parse(toolCall.function.arguments);
            const flightResults = generateFlights(
              args.origin,
              args.destination,
              args.departureDate,
              args.returnDate,
              args.seats,
            );
            console.log('search_flights response:', flightResults);

            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify(flightResults),
            });
          } else if (toolCall.function.name === 'create_checkout_session') {
            // Handle checkout session creation
            const args = JSON.parse(toolCall.function.arguments);
            console.log('create_checkout_session arguments:', args);
            const toolResponse = await zipToolkit.handleToolCall(toolCall);
            console.log('create_checkout_session response:', toolResponse);

            // Extract the checkout URL
            try {
              const checkoutUrl = JSON.parse(toolResponse.content as string).payment_url;
              console.log('Checkout URL:', checkoutUrl);

              const sessionId = extractCheckoutSessionId(checkoutUrl) || '';

              // Generate a booking reference
              const bookingRef = generateBookingReference();

              // Store the booking reference by session ID
              bookingReferences.set(sessionId, bookingRef);

              console.log(
                `Stored checkout session ${sessionId} with booking reference ${bookingRef}`,
              );
            } catch (error) {
              console.error('Error creating checkout session:', error);
              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify({ error: 'Failed to create a checkout session' }),
              });
            }

            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify(toolResponse),
            });
          } else if (
            toolCall.function.name === 'retrieve_checkout_session' ||
            toolCall.function.name === 'create_refund' ||
            toolCall.function.name === 'retrieve_charge'
          ) {
            const args = JSON.parse(toolCall.function.arguments);
            console.log(`${toolCall.function.name} arguments:`, args);

            // Handle Zip AI Toolkit tool calls
            const toolMessages = await zipToolkit.handleToolCall(toolCall);
            console.log(`${toolCall.function.name} response:`, toolMessages);
            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify(toolMessages),
            });
          }
        }

        // Submit tool outputs back to the assistant
        runStatus = await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
          tool_outputs: toolOutputs,
        });
      }

      // Wait a moment before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    // Get the latest messages
    const messages = await openai.beta.threads.messages.list(threadId);

    // Find the latest assistant message
    const latestMessage = messages.data
      .filter((msg: OpenAI.Beta.Threads.Message) => msg.role === 'assistant')
      .sort(
        (a: OpenAI.Beta.Threads.Message, b: OpenAI.Beta.Threads.Message) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )[0];

    const response = {
      id: latestMessage.id,
      role: latestMessage.role,
      content: (latestMessage.content[0] as OpenAI.Beta.Threads.TextContentBlock).text.value,
      timestamp: latestMessage.created_at,
    };

    // If the response contains placeholder checkout link and we have a real URL stored
    /* const checkoutUrl = checkoutUrls.get(threadId);
    if (checkoutUrl && response.includes('[Complete Booking](#)')) {
      // Replace the placeholder with the actual URL
      response = response.replace('[Complete Booking](#)', `[Complete Booking](${checkoutUrl})`);
    } */

    // Check if we need to start polling for checkout status
    const sessionId = extractCheckoutSessionId(response.content);
    console.log({ sessionId });

    if (sessionId) {
      // Register the checkout session for polling
      registerCheckoutSession(threadId, sessionId);

      // Add a note about checking payment status
      response.content +=
        "\n\nI'll check the status of your payment and notify you when it's processed.";

      // Start polling in the background - using the assistant ID
      scheduleCheckoutPolling(threadId, sessionId, openai, zipToolkit, ASSISTANT_ID);
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error('Error processing messages:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process messages' },
      { status: 500 },
    );
  }
}
