'use client';

import { Navbar } from '@/components/navbar';
import { DemoFooter } from '@/components/demo-footer';
import { AgentDemos } from '@/components/agent-demos';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-8 pb-4">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
          <div className="mb-12 px-4 text-center sm:px-0">
            <h1 className="mb-4 text-2xl font-bold md:text-4xl">AI Agent SDK Demo</h1>
            {/* Mobile description */}
            <p className="text-muted-foreground mx-auto max-w-2xl px-4 text-base md:hidden">
              Experience AI-powered payment capabilities with Zip Payments AI Toolkit.
            </p>
            {/* Desktop description */}
            <p className="text-muted-foreground mx-auto hidden max-w-2xl text-lg md:block">
              Experience the Zip AI Toolkit in action with different AI frameworks. Unlock new
              business opportunities and improve customer experiences with AI-powered payment
              capabilities.
            </p>
          </div>

          <AgentDemos />
        </div>
      </main>
      <DemoFooter />
    </div>
  );
}
