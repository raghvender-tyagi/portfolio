"use client";

import React, { useRef, useState, useEffect } from "react";

const WIN95_PALETTE = [
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#C0C0C0",
  "#FFFFFF",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
];

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<"pencil" | "brush" | "eraser">("pencil");
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawPixel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (tool === "eraser") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(x - 4, y - 4, 10, 10);
    } else if (tool === "brush") {
      ctx.fillStyle = selectedColor;
      ctx.fillRect(x - 2, y - 2, 5, 5);
    } else {
      ctx.fillStyle = selectedColor;
      ctx.fillRect(x, y, 2, 2);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    drawPixel(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    drawPixel(e);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="h-full bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between select-none">
      {/* Workspace Layout: Left Toolbox + Center Canvas */}
      <div className="flex-1 flex overflow-hidden p-1">
        {/* Left Toolbox */}
        <div className="w-14 bevel-out bg-[#C0C0C0] p-1 grid grid-cols-2 gap-1 content-start shrink-0 mr-1">
          <button
            type="button"
            title="Pencil"
            onClick={() => setTool("pencil")}
            className={`w-6 h-6 font-sans text-xs flex items-center justify-center ${
              tool === "pencil" ? "bevel-in bg-[#DFDFDF]" : "bevel-out bg-[#C0C0C0]"
            }`}
          >
            ✏
          </button>
          <button
            type="button"
            title="Brush"
            onClick={() => setTool("brush")}
            className={`w-6 h-6 font-sans text-xs flex items-center justify-center ${
              tool === "brush" ? "bevel-in bg-[#DFDFDF]" : "bevel-out bg-[#C0C0C0]"
            }`}
          >
            🖌
          </button>
          <button
            type="button"
            title="Eraser"
            onClick={() => setTool("eraser")}
            className={`w-6 h-6 font-sans text-xs flex items-center justify-center ${
              tool === "eraser" ? "bevel-in bg-[#DFDFDF]" : "bevel-out bg-[#C0C0C0]"
            }`}
          >
            ⌫
          </button>
          <button
            type="button"
            title="Clear Canvas"
            onClick={handleClear}
            className="w-6 h-6 bevel-out bg-[#C0C0C0] font-sans text-xs flex items-center justify-center active:bevel-in"
          >
            🗑
          </button>
        </div>

        {/* Center Drawing Canvas */}
        <div className="flex-1 bevel-in bg-[#808080] p-4 flex items-center justify-center overflow-auto">
          <canvas
            ref={canvasRef}
            width={380}
            height={240}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="bg-white border border-black cursor-crosshair shadow-md"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* 3. Bottom Color Palette */}
      <div className="p-1.5 bg-[#C0C0C0] border-t border-[#808080] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Active Color Preview */}
          <div className="w-7 h-7 bevel-in p-0.5 bg-white">
            <div
              className="w-full h-full border border-black"
              style={{ backgroundColor: selectedColor }}
            />
          </div>

          {/* Color Swatches Grid */}
          <div className="bevel-in bg-white p-0.5 grid grid-rows-2 grid-flow-col gap-0.5">
            {WIN95_PALETTE.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 border ${
                  selectedColor === color ? "border-black scale-110 z-10" : "border-neutral-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="win95-btn px-3 py-1 font-sans text-xs font-bold"
        >
          {savedStatus ? "Saved Doodle!" : "Save"}
        </button>
      </div>
    </div>
  );
}
