'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AgentDemos } from '@/components/agent-demos';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">AI Agent SDK Demo</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Experience the Zip AI Toolkit in action with different AI frameworks. Unlock new
              business opportunities and improve customer experiences with AI-powered payment
              capabilities.
            </p>
          </div>

          <AgentDemos />
        </div>
      </main>
      <Footer />
    </div>
  );
}
