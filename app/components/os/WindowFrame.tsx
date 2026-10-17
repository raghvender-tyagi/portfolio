"use client";

import React, { useRef, useState, useCallback } from "react";
import { useWindowStore, WindowInstance } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";

interface WindowFrameProps {
  window: WindowInstance;
  children: React.ReactNode;
  minSize?: { w: number; h: number };
}

export default function WindowFrame({
  window: win,
  children,
  minSize = { w: 280, h: 180 },
}: WindowFrameProps) {
  const {
    activeWindowId,
    focusWindow,
    moveWindow,
    resizeWindow,
    closeWindow,
    toggleCollapse,
    maximizeWindow,
    soundEnabled,
  } = useWindowStore();

  const isActive = activeWindowId === win.id;
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const [, setRerender] = useState({});

  // 1. Dragging via title bar
  const handleTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Don't drag if clicked on button controls
      if ((e.target as HTMLElement).closest("button")) return;

      focusWindow(win.id);
      isDraggingRef.current = true;
      dragOffsetRef.current = {
        x: e.clientX - win.x,
        y: e.clientY - win.y,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusWindow, win.id, win.x, win.y]
  );

  const handleTitlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;
      moveWindow(win.id, newX, newY);
    },
    [moveWindow, win.id]
  );

  const handleTitlePointerUp = useCallback((e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      setRerender({});
    }
  }, []);

  // 2. Resizing via bottom-right grip
  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      focusWindow(win.id);
      isResizingRef.current = true;
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        w: win.w,
        h: win.h,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusWindow, win.id, win.w, win.h]
  );

  const handleResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizingRef.current) return;
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      const newW = Math.max(minSize.w, resizeStartRef.current.w + deltaX);
      const newH = Math.max(minSize.h, resizeStartRef.current.h + deltaY);
      resizeWindow(win.id, newW, newH);
    },
    [minSize.h, minSize.w, resizeWindow, win.id]
  );

  const handleResizePointerUp = useCallback((e: React.PointerEvent) => {
    if (isResizingRef.current) {
      isResizingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      setRerender({});
    }
  }, []);

  if (win.minimized) return null;

  return (
    <div
      role="region"
      aria-label={`Window: ${win.title}`}
      onPointerDown={() => !isActive && focusWindow(win.id)}
      className={`absolute border-2 border-black bg-[#D9D9D9] select-none ${
        isActive ? "mac-shadow z-30" : "drop-shadow-[3px_3px_0_#000] z-20 opacity-95"
      }`}
      style={{
        left: `${win.x}px`,
        top: `${win.y}px`,
        width: `${win.w}px`,
        height: win.collapsed ? "32px" : `${win.h}px`,
        zIndex: win.z,
      }}
    >
      {/* Title Bar (28px) */}
      <div
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        className={`h-7 bg-[#BFBFBF] border-b-2 border-black flex items-center justify-between px-1.5 relative cursor-move overflow-hidden ${
          isActive ? "" : "bg-[#CFCFCF]"
        }`}
      >
        {/* Horizontal lines texture (active window only) */}
        {isActive && (
          <div className="absolute inset-y-1.5 left-8 right-16 mac-titlebar-stripes pointer-events-none opacity-85" />
        )}

        {/* Left: Close Button (Circle in square) */}
        <div className="z-10 flex items-center gap-1 bg-[#BFBFBF] pr-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playWindowClose(soundEnabled);
              closeWindow(win.id);
            }}
            aria-label="Close window"
            title="Close window (Cmd/Ctrl+W)"
            className="w-3.5 h-3.5 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center cursor-pointer active:scale-90"
          >
            <div className="w-1.5 h-1.5 bg-black" />
          </button>
        </div>

        {/* Center: Title */}
        <div className="z-10 bg-[#BFBFBF] px-2 text-center max-w-[65%] truncate">
          <span
            className={`font-pixel text-[11px] uppercase tracking-wider ${
              isActive ? "font-bold text-black" : "text-black/70 font-semibold"
            }`}
          >
            {win.title}
          </span>
        </div>

        {/* Right: Window Controls (Windowshade collapse + Zoom box) */}
        <div className="z-10 flex items-center gap-1.5 bg-[#BFBFBF] pl-1.5">
          {/* Collapse (Windowshade) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick(soundEnabled);
              toggleCollapse(win.id);
            }}
            aria-label={win.collapsed ? "Expand window" : "Collapse window"}
            title={win.collapsed ? "Expand windowshade" : "Collapse windowshade"}
            className="w-3.5 h-3.5 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="font-pixel text-[8px] leading-none block -mt-[1px]">
              {win.collapsed ? "▼" : "▲"}
            </span>
          </button>

          {/* Zoom Box (Maximize/Restore) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick(soundEnabled);
              maximizeWindow(win.id);
            }}
            aria-label={win.maximized ? "Restore window" : "Zoom window"}
            title={win.maximized ? "Restore window" : "Zoom window"}
            className="w-3.5 h-3.5 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center cursor-pointer"
          >
            <div className="w-2 h-2 border border-black" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      {!win.collapsed && (
        <div
          className="w-full bg-white text-black font-mono overflow-y-auto select-text relative"
          style={{ height: `${win.h - 32}px` }}
        >
          {children}

          {/* Bottom-right resize grip */}
          <div
            onPointerDown={handleResizePointerDown}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            aria-label="Resize window"
            title="Drag to resize"
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-20 bg-white/80 select-none"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className="text-black"
            >
              <line x1="8" y1="2" x2="2" y2="8" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="5" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="8" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
