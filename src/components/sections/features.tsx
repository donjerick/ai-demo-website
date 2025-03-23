"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import OpenAI from "../icons/open-ai";
import Claude from "../icons/claude";
import LangChain from "../icons/langchain";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl opacity-20"></div>
      
      <div className="px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Supercharge Your AI with Payment Capabilities
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Transform your AI assistant into a powerful business tool that can handle payments and transactions.
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50 -z-10"></div>
            <div className="bg-black/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
              
              <div className="relative h-[400px] md:h-[300px]">
                {/* Center Zip Icon */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:-translate-y-1/2 w-18 h-18 md:w-20 md:h-20 bg-black rounded-xl border border-indigo-500/40 shadow-lg flex items-center justify-center z-10">
                  <Image 
                    src="/images/zip-icon.svg" 
                    alt="Zip Logo" 
                    width={40} 
                    height={40}
                  />
                </div>
                
                {/* AI models - Left on desktop, Top on mobile */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[2%] md:left-[5%] md:top-1/2 md:-translate-y-1/2 md:-translate-x-0 flex flex-row md:flex-col gap-8 md:gap-4 z-10">
                  {/* OpenAI */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-black rounded-xl pl-3 pr-[14px] py-2 border border-white/15"
                  >
                    <OpenAI width={16} height={18} className="ml-1" />
                    <span className="text-white text-sm hidden md:block">Open AI</span>
                  </motion.div>
                  
                  {/* Claude */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-black rounded-xl pl-3 pr-[14px] py-2 border border-white/15"
                  >
                    <Claude className="w-4 h-4 ml-1" />
                    <span className="text-white text-sm hidden md:block">Claude</span>
                  </motion.div>
                  
                  {/* LangChain */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 bg-black rounded-xl pl-3 pr-[14px] py-2 border border-white/15"
                  >
                    <LangChain width={24} height={24} />
                    <span className="text-white text-sm hidden md:block">LangChain</span>
                  </motion.div>
                  
                  {/* Vercel */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-black rounded-xl pl-3 pr-[14px] py-2 border border-white/15"
                  >
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center ml-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L21 18H3L12 2Z" fill="#000000"/>
                      </svg>
                    </div>
                    <span className="text-white text-sm hidden md:block">Vercel</span>
                  </motion.div>
                </div>
                
                {/* Connection Lines - Desktop version */}
                <svg className="absolute inset-0 w-full h-full hidden md:block" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <g className="opacity-30">
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 3 }).map((_, i) => {
                      // Make the top-most line less opaque
                      const opacity = i === 0 ? "0.15" : "1";
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
                      const opacity = i === 0 ? "0.15" : "1";
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
                  <path 
                    d="M420,135 L570,135" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M420,145 L570,145" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M420,155 L570,155" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M420,165 L570,165" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                </svg>

                {/* Mobile Connection Lines */}
                <svg className="absolute inset-0 w-full h-full md:hidden" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <g className="opacity-30">
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 3 }).map((_, i) => {
                      const opacity = i === 0 ? "0.15" : "1";
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
                      const opacity = i === 0 ? "0.15" : "1";
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
                  <path 
                    d="M150,235 L150,260" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M159,235 L159,260" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M168,235 L168,260" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M177,235 L177,260" 
                    stroke="#ededed" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                </svg>

                {/* Right side Chat UI - Right on desktop, Bottom on mobile */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:left-auto md:right-[5%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-translate-x-0">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-black/90 rounded-xl border border-gray-700 w-44 md:w-[220px] overflow-hidden shadow-xl"
                  >
                    <div className="bg-black p-2 border-b border-gray-700 flex items-center gap-2">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-3 space-y-3 flex flex-col">
                      <div className="bg-gray-800 h-4 rounded w-full"></div>
                      <div className="bg-gray-800 h-4 rounded w-2/5"></div>
                      <div className="h-1"></div>
                      <div className="bg-indigo-500/30 h-4 rounded w-3/5 self-end"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Chat Snapshots */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Seamless Payment Experience in Conversations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chat Snapshot 1 - Subscription Payment */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className=" backdrop-blur-sm border rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <p className="text-2xl font-medium text-gray-400 tracking-[-.96px]"><strong className="text-white font-bold">Subscriptions</strong> Enable AI to handle subscription purchases seamlessly within the conversation flow.</p>
                
                <div className="rounded-lg pt-6 pb-4">
                  {/* Minimal chat focused on transaction */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-900 rounded-lg rounded-tl-none px-5 py-4 text-white/90 text-base">
                        The premium plan costs ₱999/month. Would you like to proceed?
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end gap-2">
                      <div className="bg-gray-800 rounded-lg rounded-tr-none px-5 py-4 text-white/90 text-base">
                        Yes, let's do it.
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-900 rounded-lg rounded-tl-none px-6 py-4 text-white/90 text-base space-y-3">
                        <p>Here's your secure payment link:</p>
                        <div className="bg-black text-white rounded-lg p-3 flex items-center justify-between border border-gray-800">
                          <div>
                            <div className="text-sm text-gray-400">Amount</div>
                            <div className="font-semibold text-lg">₱999.00</div>
                          </div>
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium py-1.5 px-3 rounded-md transition-colors">
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
              className=" backdrop-blur-sm border rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <p className="text-2xl font-medium text-gray-400 tracking-[-.96px]"><strong className="text-white font-bold">Travel</strong> Let AI handle travel bookings and payments with a streamlined checkout experience.</p>
                
                <div className="rounded-lg pt-6 pb-4">
                  {/* Minimal chat focused on transaction */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-900 rounded-lg rounded-tl-none px-5 py-4 text-white/90 text-base">
                        I've found a flight to Tokyo for ₱11,599. Ready to book?
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end gap-2">
                      <div className="bg-gray-800 rounded-lg rounded-tr-none px-5 py-4 text-white/90 text-base">
                        Perfect! Let's book it.
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-900 rounded-lg rounded-tl-none px-6 py-4 text-white/90 text-sm space-y-3">
                        <div className="bg-black text-white rounded-lg p-3 border border-gray-800">
                          <div className="flex justify-between items-center mb-3">
                            <div className="font-bold">Flight to Tokyo</div>
                            <div className="text-green-400 text-xs ml-4">Secure Payment</div>
                          </div>
                          <div className="flex justify-between text-base mb-4">
                            <div className="text-gray-400">Economy Class</div>
                            <div className="font-semibold">₱11,599</div>
                          </div>
                          <div className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-md font-medium cursor-pointer transition-colors">
                            Complete Purchase
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-900 rounded-lg rounded-tl-none p-2.5 text-white/90 text-sm flex items-center gap-2">
                        <svg className="text-green-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-green-500 font-medium">Payment successful! Booking confirmed.</p>
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
