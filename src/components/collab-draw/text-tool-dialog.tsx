'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TextToolDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onTextAdd: (text: string) => void;
}

export function TextToolDialog({ isOpen, onOpenChange, onTextAdd }: TextToolDialogProps) {
  const [text, setText] = useState('');
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
        // Reset text and focus on textarea when dialog opens
        setText('');
        setTimeout(() => {
            textAreaRef.current?.focus();
        }, 100);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (text.trim()) {
      onTextAdd(text.trim());
      onOpenChange(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Text</DialogTitle>
          <DialogDescription>
            Enter the text you want to add to the whiteboard.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your text here..."
          onKeyDown={handleKeyDown}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Text</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
