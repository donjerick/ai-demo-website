import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getZipSession } from '@/utils/zipUtils';
import { Card, CardContent } from '@/components/ui/card';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const sessionId = (await searchParams)?.session_id;
  const session = sessionId ? await getZipSession(sessionId) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="text-primary h-16 w-16" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>

          {session && (
            <Card className="mb-8">
              <CardContent>
                <div className="space-y-2 text-left">
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-muted-foreground text-sm font-medium">Transaction ID:</p>
                    <p className="overflow-hidden font-mono text-sm text-ellipsis">{session.id}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-muted-foreground text-sm font-medium">Amount:</p>
                    <p className="text-sm font-medium">{session.formattedAmount}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-muted-foreground text-sm font-medium">Status:</p>
                    <p className="text-sm font-medium capitalize">{session.payment_status}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-muted-foreground text-sm font-medium">Date:</p>
                    <p className="text-sm">{session.formattedDate}</p>
                  </div>
                  {session.payment_status === 'paid' && (
                    <div className="pt-3">
                      <p className="text-muted-foreground text-center text-xs font-medium">
                        As this is a demo, your payment has been fully refunded. The refund should
                        appear in your account within 1-3 business days.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/demo">Try Another Demo</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
