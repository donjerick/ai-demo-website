'use client';

import { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Plus } from 'lucide-react';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import { TypingAnimation } from '@/components/ui/typing-animation';

interface Message {
  id?: string;
  role: string;
  content: string;
  timestamp?: string;
}

export function OpenAIDemo() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState<string>('');
  const initialFormRef = useRef<HTMLFormElement | null>(null);
  const conversationFormRef = useRef<HTMLFormElement | null>(null);
  const initialTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        if (data.token) {
          setCsrfToken(data.token);
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  // Function to generate chat title
  const generateChatTitle = async (message: string) => {
    if (!csrfToken) return;

    try {
      const response = await fetch('/api/openai/title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error generating chat title:', data.error);
        return;
      }

      setChatTitle(data.title.replaceAll('"', ''));
      localStorage.setItem('flightChatThreadTitle', data.title.replaceAll('"', ''));
    } catch (error) {
      console.error('Error generating chat title:', error);
    }
  };

  // Function to fetch thread messages
  const fetchThreadMessages = useCallback(
    async (threadId: string) => {
      if (!csrfToken) return;

      setIsLoading(true);

      try {
        const response = await fetch('/api/openai/threads/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken,
          },
          body: JSON.stringify({ threadId }),
        });

        const data = await response.json();

        if (data.error) {
          console.error('Error fetching messages:', data.error);
          return;
        }

        if (data.messages && data.messages.length > 0) {
          // Replace the default welcome message with the actual conversation
          setChatHistory(data.messages);

          // Set the timestamp of the latest message
          if (data.messages.length > 0) {
            const latestMessage = data.messages[data.messages.length - 1];
            setLastMessageTimestamp(latestMessage.timestamp);
          }
        }
      } catch (error) {
        console.error('Error fetching thread messages:', error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    },
    [csrfToken],
  );

  useEffect(() => {
    const savedChatTitle = localStorage.getItem('flightChatThreadTitle');
    if (savedChatTitle) {
      setChatTitle(savedChatTitle);
    }

    const savedThreadId = localStorage.getItem('flightChatThreadId');
    if (savedThreadId) {
      setThreadId(savedThreadId);
      fetchThreadMessages(savedThreadId);
    }
  }, [csrfToken, fetchThreadMessages]);

  useEffect(() => {
    // Only run if we have enough messages to potentially have duplicates
    if (chatHistory.length <= 1) return;

    // Create a map to track unique messages by ID
    const uniqueMessages: Message[] = [];
    const seenIds = new Set<string>();
    const seenContents = new Map<string, boolean>();
    const userMessageContents = new Set<string>();

    // First pass: collect all user message contents
    for (const message of chatHistory) {
      if (message.role === 'user') {
        userMessageContents.add(message.content);
      }
    }

    // Process all messages to keep only unique ones
    for (const message of chatHistory) {
      // Skip any internal system messages
      if (message.content.includes('INTERNAL_SYSTEM_MESSAGE')) {
        continue;
      }

      if (message.role === 'user') {
        // For user messages, check if we've already added this content
        if (userMessageContents.has(message.content)) {
          // This is the first occurrence of this content
          uniqueMessages.push(message);
          // Remove from set so we don't add duplicates
          userMessageContents.delete(message.content);
        }
      } else {
        // If the message has an ID, use that for deduplication
        if (message.id) {
          if (!seenIds.has(message.id)) {
            uniqueMessages.push(message);
            seenIds.add(message.id);
          }
        }
        // Otherwise, use content + role as a fallback deduplication method
        else {
          const contentKey = `${message.role}:${message.content}`;
          if (!seenContents.has(contentKey)) {
            uniqueMessages.push(message);
            seenContents.set(contentKey, true);
          }
        }
      }
    }

    // Only update the state if we've removed some messages
    if (uniqueMessages.length < chatHistory.length) {
      setChatHistory(uniqueMessages);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (!threadId || !csrfToken) return;

    // Function to fetch new messages
    const fetchNewMessages = async () => {
      try {
        const response = await fetch('/api/openai/threads/messages/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken,
          },
          body: JSON.stringify({
            threadId,
            lastMessageTimestamp,
          }),
        });

        const data = await response.json();

        if (data.error) {
          console.error('Error fetching new messages:', data.error);
          return;
        }

        // If we have new messages, add them and update the timestamp
        if (data.messages && data.messages.length > 0) {
          setChatHistory((prev) => [...prev, ...data.messages]);

          // Update the timestamp of the last message we've seen
          const latestTimestamp = data.messages[data.messages.length - 1].timestamp;
          setLastMessageTimestamp(latestTimestamp);

          setTimeout(() => {
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error polling for new messages:', error);
      }
    };

    // Set up polling interval (every 10 seconds)
    const intervalId = setInterval(fetchNewMessages, 10000);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [threadId, csrfToken, lastMessageTimestamp]);

  const callOpenAIApi = async (input: string) => {
    try {
      let currentThreadId = threadId;
      if (!currentThreadId) {
        const threadResponse = await fetch('/api/openai/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken,
          },
        });
        const threadData = await threadResponse.json();
        if (threadData.error) {
          throw new Error('Failed to create a thread');
        }

        currentThreadId = threadData.threadId;
        setThreadId(currentThreadId);
        localStorage.setItem('flightChatThreadId', currentThreadId as string);
      }

      const response = await fetch('/api/openai/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          threadId: currentThreadId as string,
          message: input,
        }),
      });

      const data = await response.json();
      console.log({ data });

      if (data.error) {
        throw new Error(data.error);
      }

      setChatHistory((prev) => [...prev, data]);

      setLastMessageTimestamp(data.timestamp);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: new Date().toISOString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || !csrfToken || isLoading) return;

    // If this is the first message, set the chat title
    if (chatHistory.length === 0) {
      // Create a title from the first message (truncate if too long)
      generateChatTitle(userInput);
    }

    setChatHistory((prev) => [...prev, { role: 'user', content: userInput }]);

    setIsLoading(true);

    const message = userInput.trim();
    setUserInput('');

    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    await callOpenAIApi(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event('submit', {
        bubbles: true,
      }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  const handleTemplateClick = (template: string) => {
    setUserInput(template);
    setTimeout(() => {
      const activeTextarea = !threadId
        ? initialTextareaRef.current
        : conversationTextareaRef.current;

      if (activeTextarea) {
        activeTextarea.focus();
        const length = template.length;
        activeTextarea.setSelectionRange(length, length);
      }
    }, 0);
  };

  // Function to start a new conversation
  const startNewConversation = useCallback(() => {
    // Reset thread ID
    setThreadId(null);
    localStorage.removeItem('flightChatThreadId');
    localStorage.removeItem('flightChatThreadTitle');

    // Reset chat history to initial state
    setChatHistory([]);

    // Reset chat title
    setChatTitle('');

    // Clear user input
    setUserInput('');
  }, []);

  // Function to scroll the messages container to the bottom
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-lg bg-black">
      {!threadId && chatHistory.length === 0 ? (
        <div className="-mt-8 flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-8 text-3xl font-semibold text-white">
            Hello! Where would you like to fly? ✈️
          </div>
          <div className="w-full max-w-[640px]">
            <form
              ref={initialFormRef}
              onSubmit={handleSubmit}
              className="initial-form-container relative flex min-h-[120px] items-start space-x-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 transition-all duration-200 ease-out hover:border-zinc-600"
            >
              <div className="textarea-container relative w-full">
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
              </div>
              <div className="absolute bottom-4 left-3.5 font-mono text-xs text-zinc-500">
                GPT-4o
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
                  onClick={() =>
                    handleTemplateClick('I need a flight from Manila to Singapore next week')
                  }
                >
                  I need a flight from Manila to Singapore next week
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  onClick={() => handleTemplateClick('Show me flights to Tokyo leaving April 15th')}
                >
                  Show me flights to Tokyo leaving April 15th
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  onClick={() =>
                    handleTemplateClick("What's the cheapest flight from Manila to Cebu tomorrow?")
                  }
                >
                  What&apos;s the cheapest flight from Manila to Cebu tomorrow?
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            {threadId && (
              <>
                <div className="max-w-[70%] truncate text-base font-semibold text-white">
                  {chatTitle || 'New Conversation'}
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="hover:bg-zinc-20 flex cursor-pointer items-center gap-1 bg-white text-xs text-black"
                  onClick={startNewConversation}
                >
                  <Plus className="h-3.5 w-3.5" />
                  New chat
                </Button>
              </>
            )}
          </div>
          <div
            className="custom-scrollbar mb-4 min-h-[400px] flex-1 space-y-4 overflow-y-auto p-4"
            ref={messagesContainerRef}
          >
            {chatHistory.map((message, index) => {
              if (index === 0 && !threadId) return null;
              if (message.content?.includes('INTERNAL_SYSTEM_MESSAGE:')) return null;

              return (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground max-w-[80%] rounded-lg p-3 text-sm'
                        : 'max-w-[80%] rounded-lg p-3 text-sm text-zinc-100'
                    }
                  >
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap">
                        {message.content.split('\n').map((line, i) => (
                          <Fragment key={i}>
                            {line}
                            {i < message.content.split('\n').length - 1 && <br />}
                          </Fragment>
                        ))}
                      </p>
                    ) : (
                      <div className="markdown-content prose prose-invert prose-sm max-w-none">
                        <TypingAnimation
                          content={message.content}
                          components={{
                            a: (props) => {
                              // Check if this is a "Complete Booking" link
                              const isPaymentLink = props.href?.includes('https://pay.zip.ph');

                              return isPaymentLink ? (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="focus-visible:ring-ring inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white no-underline shadow transition-colors hover:bg-blue-500/90 focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                />
                              ) : (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline hover:text-blue-300"
                                />
                              );
                            },
                          }}
                          onComplete={scrollToBottom}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
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
          </div>

          <div className="border-t border-zinc-800 p-4">
            <form
              ref={conversationFormRef}
              onSubmit={handleSubmit}
              className="conversation-form relative flex min-h-[32px] items-start space-x-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 transition-all duration-200 ease-out hover:border-zinc-600"
            >
              <div className="textarea-container relative w-full">
                <AutoResizeTextarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Reply to Flight AI..."
                  className="absolute inset-0 bottom-14 resize-none border-0 bg-zinc-800! p-3.5 pr-9 text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  minHeight={32}
                  maxHeight={90}
                  formRef={conversationFormRef}
                  disabled={isLoading}
                  autoFocus
                  ref={conversationTextareaRef}
                />
              </div>
              <div className="absolute bottom-4 left-3.5 font-mono text-xs text-zinc-500">
                GPT-4o
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
          </div>
        </>
      )}
    </div>
  );
}
