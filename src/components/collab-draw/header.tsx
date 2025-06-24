'use client';

import React from 'react';
import { Share2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareDialog } from './share-dialog';

export function Header() {
  const [isShareOpen, setShareOpen] = React.useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <Pencil className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">CollabDraw</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </header>
      <ShareDialog isOpen={isShareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
