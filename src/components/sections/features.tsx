'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import OpenAI from '../icons/open-ai';
import Claude from '../icons/claude';
import LangChain from '../icons/langchain';

/* const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}; */

/* const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}; */

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background relative overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/30 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/30 opacity-20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <div className="bg-primary/10 text-primary mb-2 inline-block rounded-lg px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Supercharge Your AI with Payment Capabilities
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Transform your AI assistant into a powerful business tool that can handle payments and
              transactions.
            </p>
          </div>
        </div>

        {/* Integration Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50 blur-xl"></div>
            <div className="border-border/50 rounded-2xl border bg-black/90 p-8 shadow-xl backdrop-blur-sm">
              <div className="relative h-[400px] md:h-[300px]">
                {/* Center Zip Icon */}
                <div className="absolute top-1/2 left-1/2 z-10 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-indigo-500/40 bg-black shadow-lg md:top-1/2 md:h-20 md:w-20 md:-translate-y-1/2">
                  <Image src="/images/zip-icon.svg" alt="Zip Logo" width={40} height={40} />
                </div>

                {/* AI models - Left on desktop, Top on mobile */}
                <div className="absolute top-[2%] left-1/2 z-10 flex -translate-x-1/2 flex-row gap-8 md:top-1/2 md:left-[5%] md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:gap-4">
                  {/* OpenAI */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-black py-2 pr-[14px] pl-3"
                  >
                    <OpenAI width={16} height={18} className="ml-1" />
                    <span className="hidden text-sm text-white md:block">Open AI</span>
                  </motion.div>

                  {/* Claude */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-black py-2 pr-[14px] pl-3"
                  >
                    <Claude className="ml-1 h-4 w-4" />
                    <span className="hidden text-sm text-white md:block">Claude</span>
                  </motion.div>

                  {/* LangChain */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-black py-2 pr-[14px] pl-3"
                  >
                    <LangChain width={24} height={24} />
                    <span className="hidden text-sm text-white md:block">LangChain</span>
                  </motion.div>

                  {/* Vercel */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-black py-2 pr-[14px] pl-3"
                  >
                    <div className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L21 18H3L12 2Z" fill="#000000" />
                      </svg>
                    </div>
                    <span className="hidden text-sm text-white md:block">Vercel</span>
                  </motion.div>
                </div>

                {/* Connection Lines - Desktop version */}
                <svg
                  className="absolute inset-0 hidden h-full w-full md:block"
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  <g className="opacity-30">
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 3 }).map((_, i) => {
                      // Make the top-most line less opaque
                      const opacity = i === 0 ? '0.15' : '1';
                      return (
                        <line
                          key={`h-${i}`}
                          x1="0"
                          y1={i * 100}
                          x2="100%"
                          y2={i * 100}
                          stroke="#6366f1"
                          strokeWidth="1"
                          strokeOpacity={opacity}
                        />
                      );
                    })}

                    {/* Vertical grid lines */}
                    {Array.from({ length: 6 }).map((_, i) => {
                      // Make the left-most line less opaque
                      const opacity = i === 0 ? '0.15' : '1';
                      return (
                        <line
                          key={`v-${i}`}
                          x1={i * 100}
                          y1="0"
                          x2={i * 100}
                          y2="100%"
                          stroke="#6366f1"
                          strokeWidth="1"
                          strokeOpacity={opacity}
                        />
                      );
                    })}
                  </g>

                  {/* OpenAI Connection - Blue */}
                  <path
                    d="M160,66 C250,66 300,150 400,150"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Claude Connection - Orange */}
                  <path
                    d="M160,125 C250,125 300,150 400,150"
                    stroke="#D97757"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* LangChain Connection - Red */}
                  <path
                    d="M160,177 C250,177 300,150 400,150"
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Vercel Connection - White */}
                  <path
                    d="M160,232 C250,232 300,150 400,150"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Chat UI Connection - Multiple lines */}
                  <path d="M420,135 L570,135" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M420,145 L570,145" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M420,155 L570,155" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M420,165 L570,165" stroke="#ededed" strokeWidth="1.5" fill="none" />
                </svg>

                {/* Mobile Connection Lines */}
                <svg
                  className="absolute inset-0 h-full w-full md:hidden"
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  <g className="opacity-30">
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 3 }).map((_, i) => {
                      const opacity = i === 0 ? '0.15' : '1';
                      return (
                        <line
                          key={`h-${i}`}
                          x1="0"
                          y1={i * 100}
                          x2="100%"
                          y2={i * 100}
                          stroke="#6366f1"
                          strokeWidth="1"
                          strokeOpacity={opacity}
                        />
                      );
                    })}

                    {/* Vertical grid lines */}
                    {Array.from({ length: 3 }).map((_, i) => {
                      const opacity = i === 0 ? '0.15' : '1';
                      return (
                        <line
                          key={`v-${i}`}
                          x1={i * 150}
                          y1="0"
                          x2={i * 150}
                          y2="100%"
                          stroke="#6366f1"
                          strokeWidth="1"
                          strokeOpacity={opacity}
                        />
                      );
                    })}
                  </g>

                  {/* OpenAI Connection - Blue */}
                  <path
                    d="M45,50 C40,120 140,80 150,165"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Claude Connection - Orange */}
                  <path
                    d="M125,50 C120,90 160,80 159,165"
                    stroke="#D97757"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* LangChain Connection - Red */}
                  <path
                    d="M205,50 C200,90 169,80 168,165"
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Vercel Connection - White */}
                  <path
                    d="M290,50 C285,120 200,80 177,165"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Zip to Chat UI Connection */}
                  <path d="M150,235 L150,260" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M159,235 L159,260" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M168,235 L168,260" stroke="#ededed" strokeWidth="1.5" fill="none" />
                  <path d="M177,235 L177,260" stroke="#ededed" strokeWidth="1.5" fill="none" />
                </svg>

                {/* Right side Chat UI - Right on desktop, Bottom on mobile */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:top-1/2 md:right-[5%] md:bottom-auto md:left-auto md:-translate-x-0 md:-translate-y-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="w-44 overflow-hidden rounded-xl border border-gray-700 bg-black/90 shadow-xl md:w-[220px]"
                  >
                    <div className="flex items-center gap-2 border-b border-gray-700 bg-black p-2">
                      <div className="flex space-x-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3 p-3">
                      <div className="h-4 w-full rounded bg-gray-800"></div>
                      <div className="h-4 w-2/5 rounded bg-gray-800"></div>
                      <div className="h-1"></div>
                      <div className="h-4 w-3/5 self-end rounded bg-indigo-500/30"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Snapshots */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-2xl font-bold">
            Seamless Payment Experience in Conversations
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Chat Snapshot 1 - Subscription Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm"
            >
              <div className="p-6">
                <p className="text-2xl font-medium tracking-[-.96px] text-gray-400">
                  <strong className="font-bold text-white">Subscriptions</strong> Enable AI to
                  handle subscription purchases seamlessly within the conversation flow.
                </p>

                <div className="rounded-lg pt-6 pb-4">
                  {/* Minimal chat focused on transaction */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="rounded-lg rounded-tl-none bg-gray-900 px-5 py-4 text-base text-white/90">
                        The premium plan costs ₱999/month. Would you like to proceed?
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-2">
                      <div className="rounded-lg rounded-tr-none bg-gray-800 px-5 py-4 text-base text-white/90">
                        Yes, let&rsquo;s do it.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="space-y-3 rounded-lg rounded-tl-none bg-gray-900 px-6 py-4 text-base text-white/90">
                        <p>Here&rsquo;s your secure payment link:</p>
                        <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-black p-3 text-white">
                          <div>
                            <div className="text-sm text-gray-400">Amount</div>
                            <div className="text-lg font-semibold">₱999.00</div>
                          </div>
                          <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-base font-medium text-white transition-colors hover:bg-indigo-700">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat Snapshot 2 - Travel Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm"
            >
              <div className="p-6">
                <p className="text-2xl font-medium tracking-[-.96px] text-gray-400">
                  <strong className="font-bold text-white">Travel</strong> Let AI handle travel
                  bookings and payments with a streamlined checkout experience.
                </p>

                <div className="rounded-lg pt-6 pb-4">
                  {/* Minimal chat focused on transaction */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="rounded-lg rounded-tl-none bg-gray-900 px-5 py-4 text-base text-white/90">
                        I&rsquo;ve found a flight to Tokyo for ₱11,599. Ready to book?
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-2">
                      <div className="rounded-lg rounded-tr-none bg-gray-800 px-5 py-4 text-base text-white/90">
                        Perfect! Let&rsquo;s book it.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="space-y-3 rounded-lg rounded-tl-none bg-gray-900 px-6 py-4 text-sm text-white/90">
                        <div className="rounded-lg border border-gray-800 bg-black p-3 text-white">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="font-bold">Flight to Tokyo</div>
                            <div className="ml-4 text-xs text-green-400">Secure Payment</div>
                          </div>
                          <div className="mb-4 flex justify-between text-base">
                            <div className="text-gray-400">Economy Class</div>
                            <div className="font-semibold">₱11,599</div>
                          </div>
                          <div className="w-full cursor-pointer rounded-md bg-indigo-600 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700">
                            Complete Purchase
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="flex items-center gap-2 rounded-lg rounded-tl-none bg-gray-900 p-2.5 text-sm text-white/90">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <p className="font-medium text-green-500">
                          Payment successful! Booking confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
