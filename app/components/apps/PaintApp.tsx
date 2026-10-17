"use client";

import React, { useRef, useState, useEffect } from "react";

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [isDrawing, setIsDrawing] = useState(false);
  const [guestbookSaved, setGuestbookSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    ctx.fillStyle = tool === "pencil" ? "#000000" : "#FFFFFF";
    ctx.fillRect(x, y, tool === "pencil" ? 2 : 8, tool === "pencil" ? 2 : 8);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    ctx.fillStyle = tool === "pencil" ? "#000000" : "#FFFFFF";
    ctx.fillRect(x, y, tool === "pencil" ? 2 : 8, tool === "pencil" ? 2 : 8);
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
    setGuestbookSaved(true);
    setTimeout(() => setGuestbookSaved(false), 2500);
  };

  return (
    <div className="p-3 bg-white text-black font-mono text-xs flex flex-col h-full justify-between select-none space-y-3">
      {/* Paint Tools Bar */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTool("pencil")}
            className={`font-pixel text-[10px] px-2 py-1 border border-black uppercase ${
              tool === "pencil" ? "bg-black text-white" : "bg-[#D9D9D9] text-black"
            }`}
          >
            Pencil
          </button>
          <button
            type="button"
            onClick={() => setTool("eraser")}
            className={`font-pixel text-[10px] px-2 py-1 border border-black uppercase ${
              tool === "eraser" ? "bg-black text-white" : "bg-[#D9D9D9] text-black"
            }`}
          >
            Eraser
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="font-pixel text-[10px] px-2 py-1 border border-black bg-white hover:bg-neutral-200 uppercase ml-2"
          >
            Clear
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="font-pixel text-[10px] px-2 py-1 border-2 border-black bg-black text-white hover:bg-neutral-800 uppercase"
          >
            {guestbookSaved ? "Saved to Desk!" : "Save Doodle"}
          </button>
        </div>
      </div>

      {/* 320x200 1-bit Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-2 border-2 border-black bg-[#D9D9D9]">
        <canvas
          ref={canvasRef}
          width={320}
          height={200}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="border-2 border-black bg-white cursor-crosshair"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="text-[10px] text-black/60 flex items-center justify-between pt-1">
        <span>MACPAINT 1.0 • 320x200 MONOCHROME</span>
        <span>1-BIT BITMAP</span>
      </div>
    </div>
  );
}
