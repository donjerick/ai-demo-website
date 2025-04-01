'use client';

import { Button } from '@/components/ui/button';
import { ChatDemo } from '@/components/chat-demo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-teal-500/10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Add Payment Services to Your
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {' '}
              AI Agent
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8 max-w-3xl text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Seamlessly integrate Zip payment services into your AI agent with minimal configuration.
            Compatible with OpenAI Agent SDK, LangChain, and Vercel AI SDK.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <Link
                href="https://dashboard.zip.ph/developers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://www.npmjs.com/package/@zipph/ai-toolkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10"
        >
          <ChatDemo />
        </motion.div>
      </div>
    </section>
  );
}
