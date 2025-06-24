'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/collab-draw/header';
import { Toolbar } from '@/components/collab-draw/toolbar';
import { Whiteboard } from '@/components/collab-draw/whiteboard';
import { TextToolDialog } from '@/components/collab-draw/text-tool-dialog';
import type { CanvasElement, Tool, Point, TextElement } from '@/lib/types';

export default function CollabDrawPage() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [isTextToolOpen, setIsTextToolOpen] = useState(false);
  const [textPosition, setTextPosition] = useState<Point | null>(null);

  const updateElements = useCallback((newElements: CanvasElement[]) => {
    setHistory(prev => [...prev, elements]);
    setElements(newElements);
  }, [elements]);
  
  const handleElementUpdate = (element: CanvasElement) => {
    updateElements([...elements, element]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setElements(previousState);
      setHistory(history.slice(0, -1));
    }
  };

  // A simple redo can be implemented by storing the "undone" states.
  // For this version, we keep undo simple. Redo would require another state array.
  // This placeholder shows where it would go.
  const handleRedo = () => {
    // To be implemented
  };

  const handleClear = () => {
    updateElements([]);
  };

  const handleTextToolClick = (text: string, position: Point) => {
    setIsTextToolOpen(true);
    setTextPosition(position);
  };
  
  const handleTextAdd = (text: string) => {
    if (textPosition) {
      const newTextElement: TextElement = {
        id: Date.now(),
        type: 'text',
        x: textPosition.x,
        y: textPosition.y,
        text,
        color,
        fontSize: strokeWidth + 12, // Base font size on stroke width
        fontFamily: 'Inter, sans-serif'
      };
      handleElementUpdate(newTextElement);
    }
    setIsTextToolOpen(false);
    setTextPosition(null);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <Toolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleClear={handleClear}
          canUndo={history.length > 0}
          canRedo={false} // Disabled for now
        />
        <Whiteboard
          elements={elements}
          tool={tool}
          color={color}
          strokeWidth={strokeWidth}
          onElementUpdate={handleElementUpdate}
          onTextElementAdd={handleTextToolClick}
        />
      </main>
      <TextToolDialog
        isOpen={isTextToolOpen}
        onOpenChange={setIsTextToolOpen}
        onTextAdd={handleTextAdd}
      />
    </div>
  );
}
