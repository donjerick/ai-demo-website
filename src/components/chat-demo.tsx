'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

type Message = {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  showPaymentLink?: boolean;
  showPaymentSuccess?: boolean;
  status?: 'processing' | 'completed';
};

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your ZipShop assistant. How can I help you today?",
  },
];

// Complete sequence of messages for the demo
const demoSequence: Message[] = [
  // Initial welcome message (duplicated to ensure it's always shown first)
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your ZipShop assistant. How can I help you today?",
  },
  // User first message
  {
    id: 2,
    role: 'user',
    content: "I'd like to upgrade to the premium plan for my business.",
  },
  // Rest of the conversation
  {
    id: 3,
    role: 'assistant',
    content:
      'Great choice! The ZipShop premium plan costs ₱900/month and includes advanced analytics, priority support, and unlimited API calls. Would you like to proceed with the payment?',
  },
  {
    id: 4,
    role: 'user',
    content: 'Yes, please go ahead.',
  },
  {
    id: 5,
    role: 'assistant',
    content: "Perfect! I'll set that up for you right away. Here's your secure payment link:",
    showPaymentLink: true,
  },
  {
    id: 6,
    role: 'system',
    content: 'Payment processing...',
    status: 'processing',
  },
  {
    id: 7,
    role: 'system',
    content: 'Payment completed successfully',
    status: 'completed',
  },
  {
    id: 8,
    role: 'assistant',
    content:
      "Thank you! Your payment has been processed successfully. Your ZipShop premium plan is now active and will renew automatically each month. You'll receive a confirmation email shortly with all the details.",
    showPaymentSuccess: true,
  },
  {
    id: 9,
    role: 'user',
    content: 'Great! Can you also help me set up a custom integration?',
  },
  {
    id: 10,
    role: 'assistant',
    content:
      'Absolutely! As a premium member, you have access to our custom integration services. Let me walk you through the setup process...',
  },
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([...initialMessages]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle demo playback
  const playDemo = useCallback(() => {
    // Reset state and clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsPlaying(true);
    setDemoCompleted(false);
    setShowRestartButton(false);

    // Start with just the first message
    setMessages([demoSequence[0]]);

    // Start from the second message (index 1)
    let currentIndex = 1;

    // Set up new interval for message playback
    intervalRef.current = setInterval(() => {
      if (currentIndex < demoSequence.length) {
        const nextMessage = demoSequence[currentIndex];
        if (nextMessage) {
          setMessages((prevMessages) => [...prevMessages, nextMessage]);
          currentIndex++;
        } else {
          console.error(`No message found at index ${currentIndex}`);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPlaying(false);
          setDemoCompleted(true);

          // Add a delay before showing the restart button
          setTimeout(() => {
            setShowRestartButton(true);
          }, 3000); // 3 second delay
        }
      } else {
        // End of demo
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPlaying(false);
        setDemoCompleted(true);

        // Add a delay before showing the restart button
        setTimeout(() => {
          setShowRestartButton(true);
        }, 3000); // 3 second delay
      }
    }, 2000);
  }, []);

  // Scroll chat container when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      // Smooth scroll animation using requestAnimationFrame for better performance
      const targetScrollTop = chatContainerRef.current.scrollHeight;
      const startScrollTop = chatContainerRef.current.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const duration = 300; // ms
      let startTime: number | null = null;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out function for smoother deceleration
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = startScrollTop + distance * easeOut(progress);
        }

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [messages]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Render message based on role
  const renderMessage = (message: Message) => {
    if (message.role === 'system') {
      if (message.status === 'processing') {
        return (
          <div className="bg-secondary/30 text-secondary-foreground flex animate-pulse items-center justify-center space-x-2 rounded-full px-4 py-2 text-xs">
            <svg
              className="text-primary h-3 w-3 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{message.content}</span>
          </div>
        );
      } else if (message.status === 'completed') {
        return (
          <div className="flex items-center justify-center space-x-2 rounded-full bg-green-500/10 px-4 py-2 text-xs text-green-600">
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{message.content}</span>
          </div>
        );
      } else {
        return (
          <div className="bg-secondary/30 text-secondary-foreground rounded-full px-4 py-2 text-xs">
            {message.content}
          </div>
        );
      }
    }

    return (
      <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 ${message.role === 'assistant' ? 'mr-2' : 'ml-2'}`}>
          {message.role === 'assistant' ? (
            <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-xs font-medium">AI</span>
            </div>
          ) : (
            <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-xs font-medium">You</span>
            </div>
          )}
        </div>
        <div>
          <div
            className={`rounded-lg px-4 py-2 ${
              message.role === 'assistant'
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          {message.showPaymentLink && (
            <div className="border-border bg-card/50 mt-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Premium Plan - ₱900/month</span>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1 text-xs transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          )}
          {message.showPaymentSuccess && (
            <div className="mt-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-xs font-medium text-green-500">Payment successful</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Overlay Play Demo button when not playing */}
      {!isPlaying && showRestartButton && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-[2px]">
          <div className="group relative">
            {/* Animated gradient border */}
            <div className="animate-gradient-x absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-sm transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

            <motion.button
              onClick={playDemo}
              className="relative flex items-center gap-2 rounded-full bg-black/80 px-8 py-4 font-medium text-white shadow-lg hover:shadow-xl"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.97,
                transition: { duration: 0.1 },
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Restart Demo</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Initial Play Demo button */}
      {!isPlaying && !demoCompleted && !showRestartButton && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-[2px]">
          <div className="group relative">
            {/* Animated gradient border */}
            <div className="animate-gradient-x absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-sm transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

            <motion.button
              onClick={playDemo}
              className="relative flex items-center gap-2 rounded-full bg-black/80 px-8 py-4 font-medium text-white shadow-lg hover:shadow-xl"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.97,
                transition: { duration: 0.1 },
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Play Demo</span>
            </motion.button>
          </div>
        </div>
      )}

      <Card className="border-border/50 relative w-full gap-0 overflow-hidden py-0 shadow-xl">
        {/* Chat header */}
        <div className="bg-primary/10 border-border/50 flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600">
              <Image src="/images/zip-icon.svg" alt="ZipShop Logo" width={20} height={20} />
            </div>
            <div>
              <div className="text-sm font-semibold">ZipShop</div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages container with fixed scrollbar */}
        <div
          className="scrollbar-custom h-[400px] overflow-y-auto px-4 pt-4 pb-4"
          ref={chatContainerRef}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(100, 116, 139, 0.2) transparent',
          }}
        >
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } ${message.role === 'system' ? 'justify-center' : ''}`}
                >
                  {renderMessage(message)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </div>
      </Card>
    </div>
  );
}
