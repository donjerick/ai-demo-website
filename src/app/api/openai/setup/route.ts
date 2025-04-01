import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ZipAIToolkit } from '@zipph/ai-toolkit/openai';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = authHeader.split('Bearer ')[1];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'demo-key',
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

    const flightsTool: OpenAI.Beta.Assistants.AssistantTool = {
      type: 'function',
      function: {
        name: 'search_flights',
        description: 'Search for flights between two locations on specific dates',
        parameters: {
          type: 'object',
          properties: {
            origin: { type: 'string', description: 'Origin city or airport code' },
            destination: { type: 'string', description: 'Destination city or airport code' },
            departureDate: { type: 'string', description: 'Departure date in YYYY-MM-DD format' },
            returnDate: {
              type: 'string',
              description: 'Return date in YYYY-MM-DD format (optional for one-way trips)',
            },
          },
          required: ['origin', 'destination', 'departureDate'],
        },
      },
    };

    const assistant = await openai.beta.assistants.create({
      name: 'Flight AI',
      model: 'gpt-4o',
      instructions: `
        You are a friendly flight booking assistant. Help users find flights based on their travel plans.
        
        When users ask about flights, extract the origin, destination, and dates to search for flights.
        Present flight information in a clear, organized manner.
        If a user doesn't provide all the necessary information (origin, destination, dates), politely ask for it.
        Always format prices as PHP currency with ₱ symbol.
        Flight prices are in whole amount. Do not convert to cents when presenting prices.
        For departure and arrival times, use a user-friendly format like "9:30 AM".
        Suggest the cheapest flight option when presenting results.

        BOOKING CAPABILITIES:
        You can help users book flights. When a user wants to book a flight:
        1. Ask how many seats they would like to book (default is 1 if they don't specify).
        2. Use the create_checkout_session tool to generate a checkout link. Always label the checkout link as "Complete Purchase" in the response.
        3. Provide the checkout link to the user.
        4. The checkout link will always be presented to the user as a button. Keep the message appropriate.
        5. Clearly explain that this is a DEMO and although they will make a real payment, they will be IMMEDIATELY REFUNDED.
        6. Explain that they will need to complete payment on that page.

        For creating checkout sessions, follow these guidelines:
        - Do not set value for customer.
        - Use the flight details to populate line_items.
        - Convert the flight price to cents (multiply by 100) when using it in checkout line items.
        - For one-way trips, include 1 line item with the flight details.
        - For round trips, include 2 line items (one for outbound, one for return flight).
        - Use the airline and flight number as the description of the line item.
        - Set quantity based on the number of seats requested (default: 1).
        - Always set currency to "PHP" (Philippine Peso).
        - Include both success_url and cancel_url as "https://zip-ai.vercel.app/checkout/success" and "https://zip-ai.vercel.app/checkout/fail".
        - Set mode to "payment".
        - Set payment_method_types to ["card", "bpi", "gcash", "paymaya", "qrph"].
        - Only set the following arguments for creating a checkout session: cancel_url, currency, line_items, mode, payment_method_types, and success_url.

        Example line_items structure for round trip (2 passengers):
        [
          {
            "name": "Manila to Tokyo (Outbound)",
            "description": "Philippine Airlines Flight #PR1234",
            "amount": 25000,
            "quantity": 2
          },
          {
            "name": "Tokyo to Manila (Return)",
            "description": "Cebu Pacific Flight #5J6789",
            "amount": 27000,
            "quantity": 2
          }
        ]

        PAYMENT STATUS CHECKS:
        When you receive a message starting with "INTERNAL_SYSTEM_MESSAGE:", treat it as an automated system request. Follow the instructions exactly without asking for clarification. These are internal operations and should be executed silently.
        1. Check the status of the checkout session ID provided in the message using retrieve_checkout_session.
        2. If payment is successful, get the charge ID from the checkout session and use retrieve_charge to get the charge details and then create_refund to issue a refund.

        To check if payment is successful from the response of retrieve_checkout_session, look for the following:
        - payment_status: "paid"

        To get the charge ID from the checkout session, look for the following:
        - payment_details.id
        - payment_details will only have a value if checkout session is paid

        3. Use the booking reference provided in the system message in your response to the user.
        4. Send a confirmation message to the user with the booking reference and refund information.
        5. Do not ask the user for any additional information during these automated checks.

        When processing automated system messages, use the booking reference provided in the system message for consistency. Do not generate new booking references for confirmations when a reference number has already been provided.

        IMPORTANT: ALWAYS make it extremely clear that this is a DEMO, the payment is real but will be IMMEDIATELY and AUTOMATICALLY refunded. The user should see the refund in 1-3 business days depending on their bank.

        Always assure users that their payment information is secure and will be handled safely.
      `,
      tools: [flightsTool, ...zipToolkit.getTools()],
    });

    return NextResponse.json(
      {
        assistantId: assistant.id,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('Error setting up OpenAI assistant:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to set up OpenAI assistant' },
      { status: 500 },
    );
  }
}
