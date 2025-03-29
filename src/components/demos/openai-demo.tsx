"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

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
  }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export function OpenAIDemo() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm Flight AI, powered by OpenAI Agent SDK with Zip payment capabilities. I can help you book flights, check flight status, or manage your travel plans. How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialView, setShowInitialView] = useState(true);
  const initialFormRef = useRef<HTMLFormElement | null>(null);
  const conversationFormRef = useRef<HTMLFormElement | null>(null);
  const initialTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const simulateResponse = () => {
    let response = "";
    
    if (userInput.toLowerCase().includes("flight") || userInput.toLowerCase().includes("book") || userInput.toLowerCase().includes("travel")) {
      response = "I can help you book that flight. Using the Zip AI Toolkit, I can process your payment securely. Would you like to proceed with a $349 payment for a round-trip ticket?";
    } else if (userInput.toLowerCase().includes("yes") && chatHistory.some(msg => msg.content.includes("payment"))) {
      response = "Great! I'm using the Zip AI Toolkit to process your flight booking. Here's what's happening behind the scenes:\n\n1. Creating a customer record\n2. Generating a payment request for your flight\n3. Processing the payment\n\nPayment successful! Your flight has been booked. The OpenAI Agent SDK integration made this seamless.";
    } else {
      response = "I'm Flight AI with payment capabilities through the Zip AI Toolkit. I can help you book flights and process travel payments. Would you like to search for available flights?";
    }
    
    setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
    
    // Scroll to the bottom of the conversation
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: "user", content: userInput }]);
    
    // Set loading state and clear input
    setIsLoading(true);
    setUserInput("");
    setShowInitialView(false);
    
    // Scroll to the bottom of the conversation
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
    
    // Simulate AI response
    setTimeout(() => {
      simulateResponse();
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleTemplateClick = (template: string) => {
    setUserInput(template);
    // Focus the appropriate textarea based on which view is active
    setTimeout(() => {
      const activeTextarea = showInitialView ? 
        initialTextareaRef.current : 
        conversationTextareaRef.current;
        
      if (activeTextarea) {
        activeTextarea.focus();
        // Set cursor position to the end of the text
        const length = template.length;
        activeTextarea.setSelectionRange(length, length);
      }
    }, 0);
  };

  return (
    <div className="flex flex-col h-[640px] bg-black rounded-lg overflow-hidden">
      {showInitialView && chatHistory.length === 1 ? (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center -mt-8">
          <div className="text-3xl font-semibold text-white mb-8">Hello! Where would you like to fly? ✈️</div>
          <div className="w-full max-w-[640px]">
            <form 
              ref={initialFormRef}
              onSubmit={handleSubmit} 
              className="flex relative items-start space-x-2 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 overflow-hidden min-h-[120px] transition-all duration-200 ease-out initial-form-container"
            >
              <div className="textarea-container">
                <AutoResizeTextarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="How can I help you today?"
                  className="absolute inset-0 bottom-14 bg-zinc-800! border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 p-3.5 pr-9 resize-none custom-scrollbar"
                  minHeight={100}
                  maxHeight={240}
                  formRef={initialFormRef}
                  disabled={isLoading}
                  autoFocus
                  ref={initialTextareaRef}
                />
              </div>
              <div className="absolute left-3.5 bottom-4 text-xs text-zinc-500 font-mono">
                GPT-4o
              </div>
              <Button type="submit" disabled={isLoading || !userInput.trim()} size="icon" variant="ghost" className="text-white hover:bg-zinc-700 rounded-md absolute border border-zinc-500 cursor-pointer z-30 right-3.5 bottom-3.5 size-8">
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <div className="mt-6 flex flex-col gap-2">
              <div className="text-xs text-zinc-500 text-center mb-1">Try these examples</div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white text-xs cursor-pointer"
                  onClick={() => handleTemplateClick("I need a flight from Manila to Singapore next week")}
                >
                  I need a flight from Manila to Singapore next week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white text-xs cursor-pointer"
                  onClick={() => handleTemplateClick("Show me flights to Tokyo leaving April 15th")}
                >
                  Show me flights to Tokyo leaving April 15th
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white text-xs cursor-pointer"
                  onClick={() => handleTemplateClick("What's the cheapest flight from Manila to Cebu tomorrow?")}
                >
                  What&apos;s the cheapest flight from Manila to Cebu tomorrow?
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 min-h-[400px] custom-scrollbar"
            ref={messagesContainerRef}
          >
            {chatHistory.map((message, index) => {
              // Skip the first message when displaying the chat history
              if (index === 0 && showInitialView) return null;
              
              return (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={message.role === "user"
                      ? "max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground text-sm"
                      : "max-w-[80%] p-3 text-zinc-100 text-sm"
                    }
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-zinc-800 text-zinc-100 text-sm">
                  <div className="flex space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-800">
            <form 
              ref={conversationFormRef}
              onSubmit={handleSubmit} 
              className="flex relative items-start space-x-2 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 overflow-hidden min-h-[32px] transition-all duration-200 ease-out conversation-form"
            >
              <div className="textarea-container">
                <AutoResizeTextarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Reply to Flight AI..."
                  className="absolute inset-0 bottom-14 bg-zinc-800! border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 p-3.5 pr-9 resize-none custom-scrollbar"
                  minHeight={32}
                  maxHeight={90}
                  formRef={conversationFormRef}
                  disabled={isLoading}
                  autoFocus
                  ref={conversationTextareaRef}
                />
              </div>
              <div className="absolute left-3.5 bottom-4 text-xs text-zinc-500 font-mono">
                GPT-4o
              </div>
              <Button type="submit" disabled={isLoading || !userInput.trim()} size="icon" variant="ghost" className="text-white hover:bg-zinc-700 rounded-md absolute border border-zinc-500 cursor-pointer z-30 right-3.5 bottom-3.5 size-8">
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
