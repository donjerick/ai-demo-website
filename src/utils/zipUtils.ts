'use server';

interface ZipSession {
  id: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  last_updated: string;
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Fetches session details from Zip API
 * Uses server-side execution to keep the secret key secure
 */
export async function getZipSession(sessionId: string): Promise<ZipSession | null> {
  try {
    if (!process.env.ZIP_SECRET_KEY) {
      console.error('ZIP_SECRET_KEY is not defined in environment variables');
      return null;
    }

    const authToken = Buffer.from(`${process.env.ZIP_SECRET_KEY}:`).toString('base64');

    const response = await fetch(`https://api.zip.ph/v2/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching Zip session: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();

    // Format the data before returning
    if (data) {
      return {
        ...data,
        formattedAmount: formatAmount(data.amount_total, data.currency),
        formattedDate: formatDate(data.last_updated),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching Zip session:', error);
    return null;
  }
}

// Helper functions (not exported)
function formatAmount(amount: number, currency: string): string {
  const currencySymbol = currency.toLocaleLowerCase() === 'php' ? '₱' : '$';
  const wholeAmount = amount / 100; // Convert cents to whole number
  return `${currencySymbol}${wholeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function formatDate(dateValue: string | number): string {
  // Handle ISO date string format (e.g., "2025-04-01T04:01:17+00:00")
  const date = new Date(dateValue);

  // Format date without the "at" by combining separate parts
  const datePart = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  // Combine with a space instead of "at"
  return `${datePart} ${timePart}`;
}
