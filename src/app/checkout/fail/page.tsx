import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { getZipSession } from '@/utils/zipUtils';
import { Card, CardContent } from '@/components/ui/card';

export default async function CheckoutFailPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  // Access session_id directly from the props to avoid dynamic API issues
  const sessionId = searchParams.session_id;
  const session = sessionId ? await getZipSession(sessionId) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <XCircle className="text-destructive h-16 w-16" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">Payment Canceled</h1>
          <p className="text-muted-foreground mb-8">
            Your payment was not completed. This could be due to cancellation or an issue with the
            payment process. No charges have been made to your account.
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
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/demo">Try Again</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
