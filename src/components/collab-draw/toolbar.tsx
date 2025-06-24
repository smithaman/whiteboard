'use client';

import React from 'react';
import {
  Pen,
  Circle,
  RectangleHorizontal,
  Type,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Tool } from '@/lib/types';

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const tools: { name: Tool; icon: React.ElementType }[] = [
  { name: 'pen', icon: Pen },
  { name: 'rectangle', icon: RectangleHorizontal },
  { name: 'circle', icon: Circle },
  { name: 'text', icon: Type },
  { name: 'eraser', icon: Eraser },
];

export function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  handleUndo,
  handleRedo,
  handleClear,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <TooltipProvider>
      <aside className="flex flex-col items-center gap-4 border-r bg-card p-2">
        <div className="flex flex-col gap-2">
          {tools.map(({ name, icon: Icon }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Button
                  variant={tool === name ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setTool(name)}
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="capitalize">{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col items-center gap-4">
          <Label htmlFor="color-picker" className="text-xs">Color</Label>
          <Tooltip>
            <TooltipTrigger asChild>
                <input
                  id="color-picker"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer appearance-none rounded-md border-2 border-transparent bg-transparent p-0 focus:border-ring"
                  style={{ backgroundColor: color }}
                />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Select Color</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex w-full flex-col gap-4 px-2">
          <Label htmlFor="stroke-width" className="text-center text-xs">
            Stroke
          </Label>
          <Slider
            id="stroke-width"
            min={1}
            max={50}
            step={1}
            value={[strokeWidth]}
            onValueChange={(values) => setStrokeWidth(values[0])}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleUndo} disabled={!canUndo}>
                <Undo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleRedo} disabled={!canRedo}>
                <Redo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClear}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Clear Canvas</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
