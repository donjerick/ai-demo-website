'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Type for ReactMarkdown components prop
interface MarkdownComponentsProps {
  a: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
  [key: string]: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

interface TypingAnimationProps {
  content: string;
  components: MarkdownComponentsProps;
  onComplete?: () => void;
}

export function TypingAnimation({ content, components, onComplete }: TypingAnimationProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const contentRef = useRef(content);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    // Reset animation if content changes
    if (content !== contentRef.current) {
      contentRef.current = content;
      setDisplayedContent('');
      setIsComplete(false);
      wasCompleteRef.current = false;
    }

    // If animation is already complete, don't restart
    if (isComplete && displayedContent === content) {
      return;
    }

    // Calculate typing speed based on content length
    // Longer messages should type faster to avoid too much waiting
    const baseDelay = 10; // ms per character for short messages
    const minDelay = 5; // minimum ms per character for long messages
    const typingDelay = Math.max(minDelay, baseDelay - content.length / 500);

    const currentIndex = displayedContent.length;

    // If we're already partway through the animation, continue from there
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        // Add the next character
        setDisplayedContent(content.substring(0, currentIndex + 1));
      }, typingDelay);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [content, displayedContent, isComplete]);

  // Show the full content immediately if it's very short
  useEffect(() => {
    if (content.length < 20) {
      setDisplayedContent(content);
      setIsComplete(true);
    }
  }, [content]);

  // Call onComplete callback when animation finishes
  useEffect(() => {
    if (isComplete && !wasCompleteRef.current) {
      wasCompleteRef.current = true;
      if (onComplete) {
        onComplete();
      }
    }
  }, [isComplete, onComplete]);

  // If the animation is complete, render the full content with markdown
  if (isComplete) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    );
  }

  // During animation, render the partial content with markdown
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {displayedContent}
    </ReactMarkdown>
  );
}
