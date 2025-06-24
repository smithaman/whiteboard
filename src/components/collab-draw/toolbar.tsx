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
      <aside className="flex flex-row items-center justify-start gap-4 overflow-x-auto border-b bg-card p-2 md:flex-col md:justify-start md:overflow-y-auto md:overflow-x-hidden md:border-r md:border-b-0 md:py-4">
        <div className="flex flex-row gap-2 md:flex-col">
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
              <TooltipContent side="bottom" className="block md:hidden">
                <p className="capitalize">{name}</p>
              </TooltipContent>
              <TooltipContent side="right" className="hidden md:block">
                <p className="capitalize">{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Separator orientation="vertical" className="h-10 md:hidden" />
        <Separator className="hidden w-full md:block" />
        <div className="flex flex-row items-center gap-2 md:flex-col md:gap-4">
          <Label htmlFor="color-picker" className="text-xs shrink-0">Color</Label>
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
            <TooltipContent side="bottom" className="block md:hidden">
              <p>Select Color</p>
            </TooltipContent>
            <TooltipContent side="right" className="hidden md:block">
              <p>Select Color</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex w-36 flex-row items-center gap-2 px-2 md:w-full md:flex-col md:gap-4">
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
        <Separator orientation="vertical" className="h-10 md:hidden" />
        <Separator className="hidden w-full md:block" />
        <div className="flex flex-row gap-2 md:flex-col">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleUndo} disabled={!canUndo}>
                <Undo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="block md:hidden">
              <p>Undo</p>
            </TooltipContent>
            <TooltipContent side="right" className="hidden md:block">
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleRedo} disabled={!canRedo}>
                <Redo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="block md:hidden">
              <p>Redo</p>
            </TooltipContent>
            <TooltipContent side="right" className="hidden md:block">
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClear}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="block md:hidden">
              <p>Clear Canvas</p>
            </TooltipContent>
            <TooltipContent side="right" className="hidden md:block">
              <p>Clear Canvas</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
