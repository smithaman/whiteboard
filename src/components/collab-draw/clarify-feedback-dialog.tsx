'use client';

import React, { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { getClarifiedFeedbackAction } from '@/lib/actions';
import { Loader2, Lightbulb } from 'lucide-react';

interface ClarifyFeedbackDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ClarifyFeedbackDialog({
  isOpen,
  onOpenChange,
}: ClarifyFeedbackDialogProps) {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clarifiedOptions, setClarifiedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsLoading(true);
    setError(null);
    setClarifiedOptions([]);

    const result = await getClarifiedFeedbackAction({
      feedback,
      drawingDescription: 'A collaborative whiteboard with various shapes and lines.',
      userInteractions: 'User has been drawing lines and shapes.',
    });

    if (result.error) {
      setError(result.error);
    } else if (result.clarifiedOptions) {
      setClarifiedOptions(result.clarifiedOptions);
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
        setFeedback('');
        setClarifiedOptions([]);
        setError(null);
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Clarify Drawing Feedback</DialogTitle>
            <DialogDescription>
              Enter unclear feedback about the drawing, and AI will suggest
              clearer, more actionable options.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="feedback">Unclear Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="e.g., 'make it pop' or 'it needs something'"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
            </div>
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="ml-2">Analyzing feedback...</p>
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {clarifiedOptions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Suggested Clarifications:</h4>
                <ul className="space-y-2 rounded-md border bg-secondary p-3">
                  {clarifiedOptions.map((option, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Lightbulb className="mr-2 mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !feedback.trim()}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Suggestions
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
