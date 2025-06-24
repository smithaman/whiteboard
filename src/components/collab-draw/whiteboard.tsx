'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { CanvasElement, Tool, Point, PathElement, ShapeElement, TextElement } from '@/lib/types';

interface WhiteboardProps {
  elements: CanvasElement[];
  tool: Tool;
  color: string;
  strokeWidth: number;
  onElementUpdate: (element: CanvasElement) => void;
  onTextElementAdd: (text: string, position: Point) => void;
}

const useDraw = (
  onElementUpdate: (element: CanvasElement) => void,
  onTextElementAdd: (text: string, position: Point) => void,
  tool: Tool,
  color: string,
  strokeWidth: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<CanvasElement | null>(null);

  const getCanvasCoordinates = (event: MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (event: MouseEvent) => {
      const pos = getCanvasCoordinates(event);
      if (!pos) return;
      
      setIsDrawing(true);
      event.preventDefault();

      if (tool === 'text') {
        onTextElementAdd('', pos); // Signal to open text dialog
        setIsDrawing(false);
        return;
      }

      const newElement: CanvasElement = {
        id: Date.now(),
        type: tool,
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
        color,
        strokeWidth,
        ...( (tool === 'pen' || tool === 'eraser') && { points: [{x: pos.x, y: pos.y}] } )
      } as CanvasElement;

      setCurrentElement(newElement);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing || !currentElement) return;

      const pos = getCanvasCoordinates(event);
      if (!pos) return;

      if (currentElement.type === 'pen' || currentElement.type === 'eraser') {
        const updatedElement = { ...currentElement as PathElement };
        updatedElement.points.push(pos);
        setCurrentElement(updatedElement);
      } else {
        const updatedElement = { ...currentElement as ShapeElement };
        updatedElement.x2 = pos.x;
        updatedElement.y2 = pos.y;
        setCurrentElement(updatedElement);
      }
    };

    const handleMouseUp = () => {
      if (!isDrawing || !currentElement) return;
      onElementUpdate(currentElement);
      setIsDrawing(false);
      setCurrentElement(null);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [tool, color, strokeWidth, isDrawing, currentElement, onElementUpdate]);

  return { canvasRef, currentDrawingElement: currentElement };
};

const drawElement = (ctx: CanvasRenderingContext2D, element: CanvasElement) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = element.color || '#000000';
    ctx.lineWidth = element.strokeWidth || 5;

    switch (element.type) {
        case 'pen':
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = element.color || '#000000';
            ctx.lineWidth = element.strokeWidth || 5;
            ctx.beginPath();
            element.points.forEach((point, index) => {
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
            break;
        case 'eraser':
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = element.strokeWidth || 5;
            ctx.beginPath();
            element.points.forEach((point, index) => {
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
            break;
        case 'rectangle':
            ctx.strokeStyle = element.color || '#000000';
            ctx.lineWidth = element.strokeWidth || 5;
            ctx.strokeRect(element.x1, element.y1, element.x2 - element.x1, element.y2 - element.y1);
            break;
        case 'circle':
            const radius = Math.sqrt(Math.pow(element.x2 - element.x1, 2) + Math.pow(element.y2 - element.y1, 2));
            ctx.strokeStyle = element.color || '#000000';
            ctx.lineWidth = element.strokeWidth || 5;
            ctx.beginPath();
            ctx.arc(element.x1, element.y1, radius, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 'text':
            ctx.fillStyle = element.color || '#000000';
            ctx.font = `${element.fontSize}px ${element.fontFamily}`;
            ctx.fillText(element.text, element.x, element.y);
            break;
    }
};

export function Whiteboard({
  elements,
  tool,
  color,
  strokeWidth,
  onElementUpdate,
  onTextElementAdd,
}: WhiteboardProps) {
  
  const { canvasRef, currentDrawingElement } = useDraw(onElementUpdate, onTextElementAdd, tool, color, strokeWidth);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resizing
    const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    };
    
    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        redraw();
    });
    resizeObserver.observe(parent);
    
    resizeCanvas();
    
    const redraw = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const allElements = [...elements, ...(currentDrawingElement ? [currentDrawingElement] : [])];
        allElements.forEach(element => drawElement(ctx, element));
    }

    redraw();

    return () => {
        resizeObserver.disconnect();
    }
  }, [elements, currentDrawingElement]);

  return (
    <div className="flex-1 w-full h-full p-4">
       <canvas ref={canvasRef} className="w-full h-full bg-white rounded-lg shadow-md" />
    </div>
  );
}
