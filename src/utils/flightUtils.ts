import OpenAI from 'openai';
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/runs/runs.mjs';
import { ZipAIToolkit } from '@zipph/ai-toolkit/openai';
import { bookingReferences } from '@/lib/store';

const airports = [
  { code: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila' },
  { code: 'CEB', name: 'Mactan-Cebu International Airport', city: 'Cebu' },
  { code: 'DVO', name: 'Davao International Airport', city: 'Davao' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul' },
  { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing' },
  { code: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne' },
  { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto' },
  { code: 'YUL', name: 'Montreal Trudeau International Airport', city: 'Montreal' },
];

const airlines = [
  { name: 'Philippine Airlines', prefix: 'PR' },
  { name: 'Cebu Pacific', prefix: '5J' },
  { name: 'AirAsia', prefix: 'Z2' },
  { name: 'Cathay Pacific', prefix: 'CX' },
  { name: 'Singapore Airlines', prefix: 'SQ' },
  { name: 'Korean Air', prefix: 'KE' },
  { name: 'Jetstar Asia', prefix: '3K' },
  { name: 'All Nippon Airways', prefix: 'NH' },
  { name: 'Qatar Airways', prefix: 'QR' },
  { name: 'Air Canada', prefix: 'AC' },
  { name: 'Air China', prefix: 'CA' },
  { name: 'Emirates', prefix: 'EK' },
];

function generateFlightNumber(airline: string) {
  const prefix = airlines.find((a) => a.name === airline)?.prefix;
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}${suffix}`;
}

function generateTime(date: Date, baseHour: number) {
  const hour = (baseHour + Math.floor(Math.random() * 4)) % 24;
  const minute = Math.floor(Math.random() * 12) * 5;
  return new Date(date).setHours(hour, minute, 0, 0);
}

function generatePrice(distance: number) {
  // Generate a price between 50 and 300
  const minPrice = 50;
  const maxPrice = 300;
  const range = maxPrice - minPrice;

  // Use distance as a factor to influence the price within the range
  const distanceFactor = Math.min(1, distance / 10000); // Normalize distance
  const basePrice = minPrice + range * 0.6 * distanceFactor;

  // Add some randomness
  const variation = range * 0.4 * Math.random();

  // Round to nearest 5
  return Math.round((basePrice + variation) / 5) * 5;
}

export function generateFlights(
  origin: string,
  destination: string,
  date: string | Date,
  returnDate: string | Date | null,
  seats: number = 1,
) {
  if (!origin || !destination || !date) {
    return { error: 'Missing required parameters' };
  }

  // Convert string dates to Date objects if needed
  const departureDate = typeof date === 'string' ? new Date(date) : date;
  const returnDepartureDate = returnDate
    ? typeof returnDate === 'string'
      ? new Date(returnDate)
      : returnDate
    : null;

  const originAirport = airports.find(
    (a) => a.code === origin.toUpperCase() || a.city.toLowerCase() === origin.toLowerCase(),
  );

  const destinationAirport = airports.find(
    (a) =>
      a.code === destination.toUpperCase() || a.city.toLowerCase() === destination.toLowerCase(),
  );

  if (!originAirport || !destinationAirport) {
    return { error: 'Airport not found' };
  }

  // Generate random distance between airports
  const distance = Math.floor(Math.random() * 5000) + 500;
  const flightDuration = Math.floor(distance / 500) + 1; // hours

  // Create outbound flight
  const outboundFlights = [];

  for (let i = 0; i < 5; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = generateFlightNumber(airline.name);
    const departureTime = generateTime(departureDate, 6 + i * 3);
    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + flightDuration);
    const price = generatePrice(distance);

    // Generate available seats, ensuring it's at least the requested amount
    // This guarantees all flights can accommodate the requested number of seats
    const availableSeats = Math.max(seats, Math.floor(Math.random() * 30) + seats);

    outboundFlights.push({
      flightNumber,
      airline,
      origin: originAirport,
      destination: destinationAirport,
      departureTime: new Date(departureTime).toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      duration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
      price,
      seats: availableSeats,
      totalPrice: price * seats,
      requestedSeats: seats,
    });
  }

  // Create return flights if return date is provided
  const returnFlights = [];
  if (returnDepartureDate) {
    for (let i = 0; i < 5; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = generateFlightNumber(airline.name);
      const departureTime = generateTime(returnDepartureDate, 7 + i * 3);
      const arrivalTime = new Date(departureTime);
      arrivalTime.setHours(arrivalTime.getHours() + flightDuration);
      const price = generatePrice(distance);
      // Generate available seats, ensuring it's at least the requested amount
      const availableSeats = Math.max(seats, Math.floor(Math.random() * 30) + seats);

      returnFlights.push({
        flightNumber,
        airline,
        origin: destinationAirport,
        destination: originAirport,
        departureTime: new Date(departureTime).toISOString(),
        arrivalTime: arrivalTime.toISOString(),
        duration: `${flightDuration}h ${Math.floor(Math.random() * 55)}m`,
        price,
        seats: availableSeats,
        totalPrice: price * seats,
        requestedSeats: seats,
      });
    }
  }

  return {
    outbound: outboundFlights,
    return: returnFlights,
    currency: 'PHP',
    requestedSeats: seats,
  };
}

// Generate a random booking reference
export function generateBookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

// Store checkout polling data
const checkoutPolling = new Map<
  string,
  Array<{
    sessionId: string;
    createdAt: number;
    attempts: number;
  }>
>();

export function registerCheckoutSession(threadId: string, sessionId: string): void {
  if (!checkoutPolling.has(threadId)) {
    checkoutPolling.set(threadId, []);
  }

  const threadCheckouts = checkoutPolling.get(threadId) || [];

  // Only register if not already registered
  if (!threadCheckouts.some((checkout) => checkout.sessionId === sessionId)) {
    threadCheckouts.push({
      sessionId,
      createdAt: Date.now(),
      attempts: 0,
    });

    checkoutPolling.set(threadId, threadCheckouts);
  }
}

export function getThreadCheckouts(threadId: string) {
  return checkoutPolling.get(threadId) || [];
}

export function updateCheckoutPolling(
  threadId: string,
  checkouts: Array<{ sessionId: string; createdAt: number; attempts: number }>,
) {
  checkoutPolling.set(threadId, checkouts);
}

export function extractCheckoutSessionId(text: string): string | null {
  // This regex looks for Zip checkout session IDs (cs_...) in the message
  const checkoutSessionRegex = /cs_[a-zA-Z0-9]{12,}/g;
  const matches = text.match(checkoutSessionRegex);

  return matches && matches.length > 0 ? matches[0] : null;
}

// Create a new run to check session status
async function createStatusCheckRun(
  openai: OpenAI,
  threadId: string,
  sessionId: string,
  assistantId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    // Use the stored booking reference if available
    const bookingRef = bookingReferences.get(sessionId) || generateBookingReference();

    // First, add a system message to prompt the assistant to check status
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: `INTERNAL_SYSTEM_MESSAGE: This is an automated status check. 
      
      Follow these steps precisely:
      1. Check the status of checkout session ${sessionId} using retrieve_checkout_session function
      2. If session.payment_status = 'paid', get the charge ID in session.payment_details.id and create a refund using create_refund function
      3. Verify the refund was created successfully
      4. If checkout session is not yet paid or no refund is created yet, respond with "Checking payment status..."
      5. Send a payment confirmation message with the booking reference ${bookingRef} in bold text ONLY after the checkout session was paid and the refund was successfully created.
      6. Do not respond to the user or ask any questions.

      IMPORTANT: This is an automated request. Process these steps in sequence without interaction.`,
    });

    // Run the assistant to check the status
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: `This is an automated system operation to check checkout session's payment status and process refunds. Follow the steps in the message exactly.
      
      Always format amounts as PHP currency with ₱ symbol.`,
    });

    return run;
  } catch (error) {
    console.error('Error creating status check run:', error);
    throw error;
  }
}

// Process the run until it completes
async function processStatusCheckRun(
  openai: OpenAI,
  zipToolkit: ZipAIToolkit,
  threadId: string,
  runId: string,
): Promise<{ completed: boolean; sessionStatus?: string; chargeId?: string }> {
  let sessionStatus = '';
  let chargeId = '';

  try {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

    while (
      runStatus.status !== 'completed' &&
      runStatus.status !== 'failed' &&
      runStatus.status !== 'cancelled' &&
      runStatus.status !== 'expired'
    ) {
      // If requires action (function calling)
      if (runStatus.status === 'requires_action') {
        const toolCalls = runStatus.required_action!.submit_tool_outputs.tool_calls;
        const toolOutputs: RunSubmitToolOutputsParams.ToolOutput[] = [];

        // Just pass through any tool calls
        for (const toolCall of toolCalls) {
          if (toolCall.function.name === 'retrieve_checkout_session') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              console.log('retrieve_checkout_session arguments:', args);

              const toolResponse = await zipToolkit.handleToolCall(toolCall);
              console.log('retrieve_checkout_session response:', toolResponse);

              const sessionDetails = JSON.parse(toolResponse.content as string);
              sessionStatus = sessionDetails.payment_status;
              chargeId = sessionDetails.payment_details?.id || '';

              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify(toolResponse),
              });
            } catch (error) {
              console.error('Error retrieving checkout session:', error);
              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify({ error: 'Failed to retrieve checkout session' }),
              });
            }
          } else if (toolCall.function.name === 'retrieve_charge') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              console.log('retrieve_charge arguments:', args);

              const toolResponse = await zipToolkit.handleToolCall(toolCall);
              console.log('retrieve_charge response:', toolResponse);

              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify(toolResponse),
              });
            } catch (error) {
              console.error('Error retrieving charge:', error);
              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify({ error: 'Failed to retrieve charge' }),
              });
            }
          } else if (toolCall.function.name === 'create_refund') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              console.log('create_refund arguments:', args);

              const toolResponse = await zipToolkit.handleToolCall(toolCall);
              console.log('create_refund response:', toolResponse);

              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify(toolResponse),
              });
            } catch (error) {
              console.error('Error creating refund:', error);
              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: JSON.stringify({ error: 'Failed to create refund' }),
              });
            }
          } else {
            // For any other tool calls, provide a dummy success response
            console.log(`Using dummy response for tool: ${toolCall.function.name}`);
            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify({ result: 'success' }),
            });
          }
        }

        // Submit tool outputs back to the assistant
        runStatus = await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
          tool_outputs: toolOutputs,
        });
      }

      // Wait a moment before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    }

    return {
      completed: runStatus.status === 'completed',
      sessionStatus,
      chargeId,
    };
  } catch (error) {
    console.error('Error processing status check run:', error);
    return { completed: false };
  }
}

// Delete the system messages used for status checking
async function cleanupSystemMessages(openai: OpenAI, threadId: string): Promise<void> {
  try {
    // Get recent messages
    const messages = await openai.beta.threads.messages.list(threadId);

    // Find system messages
    const systemMessages = messages.data.filter(
      (msg) =>
        msg.role === 'user' &&
        msg.content[0].type === 'text' &&
        (msg.content[0].text.value.includes('INTERNAL_SYSTEM_MESSAGE:') ||
          msg.content[0].text.value.includes('automated status check')),
    );

    // Delete each system message
    for (const msg of systemMessages) {
      try {
        await openai.beta.threads.messages.del(threadId, msg.id);
      } catch (err) {
        console.error('Error deleting system message:', err);
      }
    }
  } catch (error) {
    console.error('Error cleaning up system messages:', error);
  }
}

export async function scheduleCheckoutPolling(
  threadId: string,
  sessionId: string,
  openai: OpenAI,
  zipToolkit: ZipAIToolkit,
  assistantId: string,
): Promise<void> {
  // Get the checkout data
  const threadCheckouts = getThreadCheckouts(threadId);
  console.log({ threadCheckouts });
  const checkoutData = threadCheckouts.find((c) => c.sessionId === sessionId);
  console.log({ checkoutData });

  if (!checkoutData) return;

  // Increment attempt counter
  checkoutData.attempts++;

  // Check if we've exceeded max attempts or timeout
  const MAX_ATTEMPTS = 10; // 5 minutes (30 seconds × 10)
  const MAX_AGE = 5 * 60 * 1000; // 5 minutes in milliseconds

  if (checkoutData.attempts > MAX_ATTEMPTS || Date.now() - checkoutData.createdAt > MAX_AGE) {
    // Remove from polling
    updateCheckoutPolling(
      threadId,
      threadCheckouts.filter((c) => c.sessionId !== sessionId),
    );

    // Let the user know we stopped checking
    await openai.beta.threads.messages.create(threadId, {
      role: 'assistant',
      content:
        "I've been checking your payment status, but it's still pending. You can complete the payment at your convenience by using the checkout link I provided earlier. Once the payment is complete, your booking will be confirmed automatically.",
    });

    return;
  }

  try {
    console.log(
      `Checking checkout status for session ${sessionId}, attempt ${checkoutData.attempts}`,
    );

    // Create a status check run
    const run = await createStatusCheckRun(openai, threadId, sessionId, assistantId);
    console.log('createStatusCheckRun');
    console.log({ run });

    // Process the run until completion
    const result = await processStatusCheckRun(openai, zipToolkit, threadId, run.id);
    console.log('processStatusCheckRun');
    console.log({ result });

    if (result.completed) {
      // Clean up the system messages
      await cleanupSystemMessages(openai, threadId);

      // If the status check was successful, and we know the status was completed,
      // we can remove it from polling
      if (result.sessionStatus === 'paid') {
        // Get the most recent assistant message to check if refund was created
        const messages = await openai.beta.threads.messages.list(threadId);
        const recentMessages = messages.data.slice(0, 10); // Check latest 10 messages

        // Check if any tool calls for create_refund were made
        let refundCreated = false;

        // Look for evidence of refund in run events
        try {
          const runSteps = await openai.beta.threads.runs.steps.list(threadId, run.id);

          // Properly type-check and access the tool calls
          for (const step of runSteps.data) {
            if (step.step_details.type === 'tool_calls') {
              // Cast to the correct type and then check for refund
              const toolCalls = step.step_details.tool_calls;
              for (const call of toolCalls) {
                // Check if it's a function call and if the function name is create_refund
                if ('function' in call && call.function?.name === 'create_refund') {
                  console.log('Found a refund step in the run');
                  refundCreated = true;
                  break;
                }
              }
              if (refundCreated) break;
            }
          }
        } catch (error) {
          console.error('Error checking run steps for refund:', error);
        }

        // Analyze message content for mention of refund
        if (!refundCreated) {
          for (const msg of recentMessages) {
            if (msg.role === 'assistant' && msg.content[0].type === 'text') {
              const text = msg.content[0].text.value.toLowerCase();
              if (text.includes('refund') || text.includes('refunded')) {
                console.log('Found refund mention in assistant message');
                refundCreated = true;
                break;
              }
            }
          }
        }

        // If refund was created, send success message and stop polling
        if (refundCreated) {
          // Use the stored booking reference instead of generating a new one
          const bookingRef = bookingReferences.get(sessionId) || generateBookingReference();

          // Send success message to the user with booking reference
          await openai.beta.threads.messages.create(threadId, {
            role: 'assistant',
            content: `Great news! Your payment for the flight booking has been successfully processed. Your booking is confirmed with reference number **${bookingRef}**.\n\nAs this is a demo, your payment has been fully refunded. The refund should appear in your account within 1-3 business days, depending on your bank.\n\nThank you for trying our flight booking service!`,
          });

          // Remove from polling
          updateCheckoutPolling(
            threadId,
            threadCheckouts.filter((c) => c.sessionId !== sessionId),
          );
          return;
        }

        // If payment was successful but refund wasn't created yet, try again in the next polling cycle
        console.log('Payment succeeded but refund not confirmed yet. Will check again.');
      }

      // If the status check was successful but payment is still pending,
      // we'll continue polling
    }
    // Schedule next check in 30 seconds if we haven't reached the limit
    setTimeout(() => {
      scheduleCheckoutPolling(threadId, sessionId, openai, zipToolkit, assistantId);
    }, 30000);
  } catch (error) {
    console.error('Error in checkout polling:', error);

    // Schedule next attempt if we haven't reached the limit
    if (checkoutData.attempts < MAX_ATTEMPTS) {
      setTimeout(() => {
        scheduleCheckoutPolling(threadId, sessionId, openai, zipToolkit, assistantId);
      }, 30000);
    } else {
      // Remove from polling if too many errors
      updateCheckoutPolling(
        threadId,
        threadCheckouts.filter((c) => c.sessionId !== sessionId),
      );
    }
  }
}
