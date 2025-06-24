'use client';

import React from 'react';
import { Sparkles, Share2, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareDialog } from './share-dialog';
import { ClarifyFeedbackDialog } from './clarify-feedback-dialog';

export function Header() {
  const [isShareOpen, setShareOpen] = React.useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = React.useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <PenTool className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">CollabDraw</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setFeedbackOpen(true)}>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Clarify Feedback</span>
          </Button>
          <Button onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </header>
      <ShareDialog isOpen={isShareOpen} onOpenChange={setShareOpen} />
      <ClarifyFeedbackDialog
        isOpen={isFeedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </>
  );
}
