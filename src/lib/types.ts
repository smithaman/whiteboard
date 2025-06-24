export type Tool = "pen" | "rectangle" | "circle" | "text" | "eraser";

export type Point = { x: number; y: number };

export type PathElement = {
    id: number;
    type: "pen" | "eraser";
    points: Point[];
    color: string;
    strokeWidth: number;
};

export type ShapeElement = {
    id: number;
    type: "rectangle" | "circle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    strokeWidth: number;
};

export type TextElement = {
    id: number;
    type: "text";
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
    fontFamily: string;
};

export type CanvasElement = PathElement | ShapeElement | TextElement;
