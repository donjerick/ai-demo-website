'use client';

import { forwardRef, useEffect, useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface AutoResizeTextareaProps extends React.ComponentPropsWithoutRef<typeof Textarea> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minHeight?: number;
  maxHeight?: number;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ value, onChange, minHeight = 32, maxHeight = 400, formRef, className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset the height to minimum before calculating the scroll height
      textarea.style.height = `${minHeight}px`;
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;

      // If form exists, adjust its height to accommodate the textarea
      if (formRef?.current) {
        // For the initial form, we want to set a fixed height
        if (formRef.current.classList.contains('initial-form-container')) {
          formRef.current.style.height = `${newHeight + 46}px`;
        } 
        // For the conversation form, we adjust padding-bottom
        else if (formRef.current.classList.contains('conversation-form')) {
          // Adjust the form height based on the textarea height
          formRef.current.style.height = `${newHeight + 32}px`;
        }
      }
    }, [minHeight, maxHeight, formRef]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      adjustHeight();
    };

    return (
      <Textarea
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          textareaRef.current = node;
        }}
        value={value}
        onChange={handleChange}
        className={`custom-scrollbar ${className || ''}`}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export { AutoResizeTextarea };
