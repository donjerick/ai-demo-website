"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AgentDemos } from "@/components/agent-demos";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              AI Agent SDK Demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the Zip AI Toolkit in action with different AI frameworks. 
              See how easy it is to integrate payment capabilities into your AI applications.
            </p>
          </div>
          
          <AgentDemos />
        </div>
      </main>
      <Footer />
    </div>
  );
}
