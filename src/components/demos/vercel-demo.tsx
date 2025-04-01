'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  isStreaming?: boolean;
}

interface AutoResizeTextareaProps extends React.ComponentPropsWithoutRef<typeof Textarea> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minHeight?: number;
  maxHeight?: number;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ value, onChange, minHeight = 90, maxHeight = 240, formRef, className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Combine the forwarded ref with our internal ref
    const combinedRef = (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const adjustHeight = (): void => {
        textarea.style.height = `${minHeight}px`;
        const scrollHeight = textarea.scrollHeight;
        const newHeight = Math.min(scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Also adjust the form height if formRef is provided
        if (formRef?.current) {
          // Add bottom padding for the model name and send button
          formRef.current.style.height = `${newHeight + 46}px`;
        }
      };

      adjustHeight();
    }, [value, minHeight, maxHeight, formRef]);

    return (
      <Textarea
        ref={combinedRef}
        value={value}
        onChange={onChange}
        className={`${className} custom-scrollbar`}
        {...props}
      />
    );
  },
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export function VercelAIDemo() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm Fitness AI, powered by Vercel AI SDK with Zip payment capabilities. I can help you find workout plans, track your progress, and process subscription payments. How can I assist with your fitness journey today?",
      isStreaming: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showInitialView, setShowInitialView] = useState(true);
  const initialFormRef = useRef<HTMLFormElement | null>(null);
  const conversationFormRef = useRef<HTMLFormElement | null>(null);
  const initialTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Skip scrolling on initial render
    if (chatHistory.length === 1) {
      return;
    }
    scrollToBottom();
  }, [chatHistory]);

  const simulateStreamingResponse = (finalResponse: string) => {
    // Add a streaming message placeholder
    setChatHistory((prev) => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

    // Scroll to the bottom of the conversation
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    let currentResponse = '';
    const words = finalResponse.split(' ');

    // Simulate streaming by adding words one by one
    const streamInterval = setInterval(() => {
      if (words.length === 0) {
        clearInterval(streamInterval);
        setChatHistory((prev) => {
          const newHistory = [...prev];
          // Replace the streaming message with the complete message
          newHistory[newHistory.length - 1] = { role: 'assistant', content: currentResponse };
          return newHistory;
        });
        setIsLoading(false);

        // Scroll to the bottom after completing the response
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }, 100);
        return;
      }

      currentResponse += words.shift() + ' ';

      setChatHistory((prev) => {
        const newHistory = [...prev];
        // Update the streaming message
        newHistory[newHistory.length - 1] = {
          role: 'assistant',
          content: currentResponse,
          isStreaming: true,
        };
        return newHistory;
      });

      // Scroll to the bottom during streaming
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || isProcessingPayment) return;

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: 'user', content: userInput }]);

    // Set loading state and clear input
    setIsLoading(true);
    setUserInput('');
    setShowInitialView(false);

    // Scroll to the bottom of the conversation
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    // Simulate AI response
    setTimeout(() => {
      let response = '';

      if (
        userInput.toLowerCase().includes('membership') ||
        userInput.toLowerCase().includes('join') ||
        userInput.toLowerCase().includes('sign up')
      ) {
        response = `I can help you sign up for our Premium Gym Membership for $${79.99}. This includes full access to all gym facilities and classes for 1 month. Would you like to proceed with this membership?`;
      } else if (
        userInput.toLowerCase().includes('yes') &&
        chatHistory.some((msg) => msg.content.includes('membership'))
      ) {
        response = 'Great! Let me process that for you using the Zip AI Toolkit integration.';
        handleProcessPayment();
        return; // Exit early since handleProcessPayment will handle the rest
      } else if (
        userInput.toLowerCase().includes('trainer') ||
        userInput.toLowerCase().includes('class') ||
        userInput.toLowerCase().includes('workout')
      ) {
        response =
          'Our gym offers personal training sessions and group classes including yoga, HIIT, and strength training. All of these are included in our Premium Gym Membership. Would you like to sign up for a membership?';
      } else {
        response =
          "I'm Gym AI with payment capabilities through the Zip AI Toolkit. I can help you sign up for gym memberships, schedule training sessions, and provide workout recommendations. How can I help with your fitness goals today?";
      }

      simulateStreamingResponse(response);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleTemplateClick = (template: string) => {
    setUserInput(template);
    // Focus the appropriate textarea based on which view is active
    setTimeout(() => {
      let activeTextarea = null;

      if (showInitialView && !isProcessingPayment) {
        activeTextarea = initialTextareaRef.current;
      } else if (!isProcessingPayment) {
        activeTextarea = conversationTextareaRef.current;
      }

      if (activeTextarea) {
        activeTextarea.focus();
        // Set cursor position to the end of the text
        const length = template.length;
        activeTextarea.setSelectionRange(length, length);
      }
    }, 0);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);

    // Scroll to the bottom to show the payment processing UI
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);

      const successResponse =
        'Payment processed successfully! Your Premium Gym Membership is now active. The Vercel AI SDK with Zip integration handled the entire payment flow securely. You now have access to all gym facilities and classes. Would you like me to recommend some classes to get started?';

      simulateStreamingResponse(successResponse);
    }, 2000);
  };

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-lg bg-black">
      {showInitialView && chatHistory.length === 1 && !isProcessingPayment ? (
        <div className="-mt-8 flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-8 text-3xl font-semibold text-white">
            Hello! What are your fitness goals? 🏋️‍♀️
          </div>
          <div className="w-full max-w-[640px]">
            <form
              ref={initialFormRef}
              onSubmit={handleSubmit}
              className="relative flex min-h-[120px] items-start space-x-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 transition-all duration-200 ease-out hover:border-zinc-600"
              style={{ height: '100px' }}
            >
              <AutoResizeTextarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can I help you today?"
                className="absolute inset-0 bottom-14 resize-none border-0 bg-zinc-800! p-3.5 pr-9 text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                minHeight={100}
                maxHeight={240}
                formRef={initialFormRef}
                disabled={isLoading}
                autoFocus
                ref={initialTextareaRef}
              />
              <div className="absolute bottom-4 left-3.5 font-mono text-xs text-zinc-500">
                Claude 3.7 Sonnet
              </div>
              <Button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                size="icon"
                variant="ghost"
                className="absolute right-3.5 bottom-3.5 z-30 size-8 cursor-pointer rounded-md border border-zinc-500 text-white hover:bg-zinc-700"
              >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <div className="mt-6 flex flex-col gap-2">
              <div className="mb-1 text-center text-xs text-zinc-500">Try these examples</div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  onClick={() => handleTemplateClick('Best workout for six-pack abs?')}
                >
                  Best workout for six-pack abs?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  onClick={() => handleTemplateClick('Find me a weight loss trainer')}
                >
                  Find me a weight loss trainer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  onClick={() => handleTemplateClick('Best membership for 3x weekly visits?')}
                >
                  Best membership plan for 3x weekly visits?
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="custom-scrollbar mb-4 min-h-[400px] flex-1 space-y-4 overflow-y-auto p-4"
            ref={messagesContainerRef}
          >
            {chatHistory.map((message, index) => {
              // Skip the system and initial assistant message when displaying the chat history
              if ((index === 0 || index === 1) && !isProcessingPayment) return null;

              if (message.role === 'function') {
                try {
                  const functionData = JSON.parse(message.content);
                  return (
                    <div key={index} className="my-2 flex justify-center">
                      <Card className="max-w-[90%] border border-zinc-700 bg-zinc-800 p-2 font-mono text-xs text-zinc-400">
                        <div className="text-primary/70 mb-1 font-semibold">
                          Function Call: {functionData.name}
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(functionData.arguments, null, 2)}
                        </pre>
                      </Card>
                    </div>
                  );
                } catch {
                  return null;
                }
              }

              return (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground max-w-[80%] rounded-lg p-3 text-sm'
                        : 'max-w-[80%] p-3 text-sm text-zinc-100'
                    }
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.isStreaming && (
                      <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-current" />
                    )}
                  </div>
                </div>
              );
            })}

            {isProcessingPayment && (
              <div className="my-4 flex justify-center">
                <Card className="w-full max-w-md border border-zinc-700 bg-zinc-800 p-4">
                  <div className="space-y-4 text-center">
                    <h3 className="font-medium text-white">Processing Payment</h3>
                    <div className="flex justify-center">
                      <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Please wait while we process your payment...
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {isLoading && !isProcessingPayment && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-zinc-800 p-3 text-sm text-zinc-100">
                  <div className="flex space-x-2">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-zinc-800 p-4">
            <form
              ref={conversationFormRef}
              onSubmit={handleSubmit}
              className="relative flex min-h-[32px] items-start space-x-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 transition-all duration-200 ease-out hover:border-zinc-600"
              style={{ height: '32px' }}
            >
              <AutoResizeTextarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Reply to Fitness AI..."
                className="absolute inset-0 bottom-14 resize-none border-0 bg-zinc-800! p-3.5 pr-9 text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                minHeight={32}
                maxHeight={90}
                formRef={conversationFormRef}
                disabled={isLoading || isProcessingPayment}
                autoFocus
                ref={conversationTextareaRef}
              />
              <div className="absolute bottom-4 left-3.5 font-mono text-xs text-zinc-500">
                Claude 3.7 Sonnet
              </div>
              <Button
                type="submit"
                disabled={isLoading || !userInput.trim() || isProcessingPayment}
                size="icon"
                variant="ghost"
                className="absolute right-3.5 bottom-3.5 z-30 size-8 cursor-pointer rounded-md border border-zinc-500 text-white hover:bg-zinc-700"
              >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
