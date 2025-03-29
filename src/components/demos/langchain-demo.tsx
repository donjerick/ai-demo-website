"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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

export function LangChainDemo() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m Shopper AI, powered by LangChain SDK with Zip payment capabilities. I can help you find products, compare prices, and make secure purchases. How can I assist with your shopping today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount] = useState('129.99');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [productDetails] = useState({
    name: 'Premium Wireless Headphones',
    price: '129.99',
    description: 'Noise-cancelling with 30-hour battery life'
  });
  const [showInitialView, setShowInitialView] = useState(true);
  const initialFormRef = useRef<HTMLFormElement | null>(null);
  const conversationFormRef = useRef<HTMLFormElement | null>(null);
  const initialTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || showPaymentForm) return;
    
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
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `Payment processed successfully for ${customerName}! The LangChain integration with Zip AI Toolkit handled the entire payment flow. Here's what happened behind the scenes:

1. Customer record created for ${customerName} (${customerEmail})
2. Payment intent created for $${paymentAmount} for ${productDetails.name}
3. Payment processed through Zip's secure payment system
4. Order confirmation and shipping details sent to your email

Your order will arrive in 3-5 business days. Thank you for shopping with us!`
        }
      ]);
      setIsLoading(false);
      setShowPaymentForm(false);
      
      // Scroll to the bottom of the conversation
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }, 1500);
  };

  const simulateResponse = () => {
    let response = '';
    
    if (userInput.toLowerCase().includes('headphones') || userInput.toLowerCase().includes('buy') || userInput.toLowerCase().includes('purchase')) {
      response = `I found these Premium Wireless Headphones for $${productDetails.price}. They feature ${productDetails.description}. Would you like to purchase them using Zip's secure payment system?`;
      setShowPaymentForm(false);
    } else if (userInput.toLowerCase().includes('yes') && chatHistory.some(msg => msg.content.includes('purchase'))) {
      response = 'Great! Let me prepare a payment form for you using the Zip AI Toolkit integration.';
      setShowPaymentForm(true);
    } else {
      response = 'I\'m Shopper AI with payment capabilities through the Zip AI Toolkit. I can help you find products and make secure purchases. What kind of product are you looking for today?';
      setShowPaymentForm(false);
    }
    
    setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
    
    // Scroll to the bottom of the conversation
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleTemplateClick = (template: string) => {
    setUserInput(template);
    // Focus the appropriate textarea based on which view is active
    setTimeout(() => {
      let activeTextarea = null;
      
      if (showInitialView && !showPaymentForm) {
        activeTextarea = initialTextareaRef.current;
      } else if (!showPaymentForm) {
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

  return (
    <div className="flex flex-col h-[640px] bg-black rounded-lg overflow-hidden">
      {showInitialView && chatHistory.length === 1 && !showPaymentForm ? (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center -mt-8">
          <div className="text-3xl font-semibold text-white mb-8">Hello! What are you shopping for? 🛍️</div>
          <div className="w-full max-w-[640px]">
            <form 
              ref={initialFormRef}
              onSubmit={handleSubmit} 
              className="flex relative items-start space-x-2 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 overflow-hidden min-h-[120px] transition-all duration-200 ease-out"
              style={{ height: '100px' }}
            >
              <AutoResizeTextarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can I help you today?"
                className="absolute inset-0 bottom-14 bg-zinc-800! border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 p-3.5 pr-9 resize-none"
                minHeight={100}
                maxHeight={240}
                formRef={initialFormRef}
                disabled={isLoading}
                autoFocus
                ref={initialTextareaRef}
              />
              <div className="absolute left-3.5 bottom-4 text-xs text-zinc-500 font-mono">
                Gemini 2.5 Pro
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
                  onClick={() => handleTemplateClick("I need a new smartphone under ₱25,000")}
                >
                  I need a new smartphone under ₱25,000
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white text-xs cursor-pointer"
                  onClick={() => handleTemplateClick("What are the best noise-cancelling headphones?")}
                >
                  What are the best noise-cancelling headphones?
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white text-xs cursor-pointer"
                  onClick={() => handleTemplateClick("Help me find a gift for my 3-yr old niece")}
                >
                  Help me find a gift for my 3-yr old niece
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
            
            {showPaymentForm && (
              <div className="flex justify-center my-4">
                <Card className="bg-zinc-800 border border-zinc-700 p-4 w-full max-w-md">
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="font-medium text-white">{productDetails.name}</h3>
                      <p className="text-zinc-400 text-sm">{productDetails.description}</p>
                      <p className="text-xl font-bold mt-2 text-white">${productDetails.price}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-white"
                        required
                      />
                      <Input
                        placeholder="Email Address"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || !customerName || !customerEmail}
                    >
                      {isLoading ? "Processing..." : `Pay $${paymentAmount}`}
                    </Button>
                  </form>
                </Card>
              </div>
            )}
            
            {isLoading && !showPaymentForm && (
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
              className="flex relative items-start space-x-2 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 overflow-hidden min-h-[32px] transition-all duration-200 ease-out"
              style={{ height: '32px' }}
            >
              <AutoResizeTextarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Reply to Shopping AI..."
                className="absolute inset-0 bottom-14 bg-zinc-800! border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 p-3.5 pr-9 resize-none custom-scrollbar"
                minHeight={32}
                maxHeight={90}
                formRef={conversationFormRef}
                disabled={isLoading}
                autoFocus
                ref={conversationTextareaRef}
              />
              <div className="absolute left-3.5 bottom-4 text-xs text-zinc-500 font-mono">
                Gemini 2.5 Pro
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !userInput.trim() || showPaymentForm} 
                size="icon" 
                variant="ghost" 
                className="text-white hover:bg-zinc-700 rounded-md absolute border border-zinc-500 cursor-pointer z-30 right-3.5 bottom-3.5 size-8"
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
