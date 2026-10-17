"use client";

import React, { useRef, useState, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import { useWindowStore, WindowInstance } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  myComputer32,
  winFolder32,
  winDoc32,
  msDos32,
  controlPanel32,
  acrobat32,
  winPaint32,
  winCalc32,
  bugSmileySprites,
} from "@/data/sprites";

interface WindowFrameProps {
  window: WindowInstance;
  children: React.ReactNode;
  minSize?: { w: number; h: number };
}

function getAppTitleIcon(appId: string) {
  if (appId === "terminal") return <PixelSprite sprite={msDos32} scale={0.65} />;
  if (appId === "aboutMac") return <PixelSprite sprite={myComputer32} scale={0.65} />;
  if (appId === "finder") return <PixelSprite sprite={winFolder32} scale={0.65} />;
  if (appId === "simpleText") return <PixelSprite sprite={winDoc32} scale={0.65} />;
  if (appId === "pdfViewer") return <PixelSprite sprite={acrobat32} scale={0.65} />;
  if (appId === "controlPanel") return <PixelSprite sprite={controlPanel32} scale={0.65} />;
  if (appId === "paint") return <PixelSprite sprite={winPaint32} scale={0.65} />;
  if (appId === "calc") return <PixelSprite sprite={winCalc32} scale={0.65} />;
  if (appId === "snake" || appId === "bugSweeper")
    return <PixelSprite sprite={bugSmileySprites.normal} scale={1} />;
  return <PixelSprite sprite={winDoc32} scale={0.65} />;
}

export default function WindowFrame({
  window: win,
  children,
  minSize = { w: 320, h: 200 },
}: WindowFrameProps) {
  const {
    activeWindowId,
    focusWindow,
    moveWindow,
    resizeWindow,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    soundEnabled,
  } = useWindowStore();

  const isActive = activeWindowId === win.id;

  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const isResizingRef = useRef(false);
  const resizeDirRef = useRef<string>("");
  const resizeStartRef = useRef({ x: 0, y: 0, winX: 0, winY: 0, w: 0, h: 0 });

  const [titleContextMenu, setTitleContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 1. Dragging via title bar
  const handleTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("button")) return;

      focusWindow(win.id);
      if (win.maximized) return; // Can't drag maximized window

      isDraggingRef.current = true;
      dragOffsetRef.current = {
        x: e.clientX - win.x,
        y: e.clientY - win.y,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusWindow, win.id, win.maximized, win.x, win.y]
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
    }
  }, []);

  // 2. Resizing from all 8 directions
  const handleResizePointerDown = (
    e: React.PointerEvent,
    direction: string
  ) => {
    e.stopPropagation();
    focusWindow(win.id);
    if (win.maximized) return;

    isResizingRef.current = true;
    resizeDirRef.current = direction;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      winX: win.x,
      winY: win.y,
      w: win.w,
      h: win.h,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleResizePointerMove = (e: React.PointerEvent) => {
    if (!isResizingRef.current) return;
    const dx = e.clientX - resizeStartRef.current.x;
    const dy = e.clientY - resizeStartRef.current.y;
    const dir = resizeDirRef.current;

    let newW = resizeStartRef.current.w;
    let newH = resizeStartRef.current.h;
    let newX = resizeStartRef.current.winX;
    let newY = resizeStartRef.current.winY;

    if (dir.includes("e")) {
      newW = Math.max(minSize.w, resizeStartRef.current.w + dx);
    }
    if (dir.includes("s")) {
      newH = Math.max(minSize.h, resizeStartRef.current.h + dy);
    }
    if (dir.includes("w")) {
      const candidateW = resizeStartRef.current.w - dx;
      if (candidateW >= minSize.w) {
        newW = candidateW;
        newX = resizeStartRef.current.winX + dx;
      }
    }
    if (dir.includes("n")) {
      const candidateH = resizeStartRef.current.h - dy;
      if (candidateH >= minSize.h) {
        newH = candidateH;
        newY = resizeStartRef.current.winY + dy;
      }
    }

    if (newX !== win.x || newY !== win.y) {
      moveWindow(win.id, newX, newY);
    }
    resizeWindow(win.id, newW, newH);
  };

  const handleResizePointerUp = (e: React.PointerEvent) => {
    if (isResizingRef.current) {
      isResizingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // 3. Title bar right-click context menu
  const handleTitleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setTitleContextMenu({ x: e.clientX, y: e.clientY });
  };

  const titleContextMenuItems: ContextMenuItem[] = [
    {
      label: "Restore",
      disabled: !win.maximized,
      onClick: () => maximizeWindow(win.id),
    },
    {
      label: "Move",
      disabled: win.maximized,
      onClick: () => {},
    },
    {
      label: "Size",
      disabled: win.maximized,
      onClick: () => {},
    },
    {
      label: "Minimize",
      onClick: () => minimizeWindow(win.id),
    },
    {
      label: "Maximize",
      disabled: win.maximized,
      onClick: () => maximizeWindow(win.id),
    },
    { isDivider: true },
    {
      label: "Close",
      shortcut: "Alt+F4",
      onClick: () => closeWindow(win.id),
    },
  ];

  if (win.minimized) return null;

  return (
    <>
      <div
        role="region"
        aria-label={`Window: ${win.title}`}
        onPointerDown={() => !isActive && focusWindow(win.id)}
        className={`absolute bevel-window bg-[#C0C0C0] p-[3px] select-none ${
          isActive
            ? "z-30 shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
            : "z-20 opacity-95 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
        }`}
        style={{
          left: `${win.x}px`,
          top: `${win.y}px`,
          width: `${win.w}px`,
          height: win.collapsed ? "28px" : `${win.h}px`,
          zIndex: win.z,
        }}
      >
        {/* Title Bar (22px) */}
        <div
          onPointerDown={handleTitlePointerDown}
          onPointerMove={handleTitlePointerMove}
          onPointerUp={handleTitlePointerUp}
          onDoubleClick={() => maximizeWindow(win.id)}
          onContextMenu={handleTitleContextMenu}
          className={`h-[28px] flex items-center justify-between px-1.5 select-none cursor-move ${
            isActive ? "titlebar-active" : "titlebar-inactive"
          }`}
        >
          {/* Left: App Icon + Title */}
          <div className="flex items-center gap-2 overflow-hidden pr-2">
            <div className="shrink-0 flex items-center">
              {getAppTitleIcon(win.appId)}
            </div>
            <span className="font-pixel text-[13px] md:text-[14px] font-bold truncate text-shadow-[1px_1px_0_rgba(0,0,0,0.6)]">
              {win.title}
            </span>
          </div>

          {/* Right: Window Controls (_, square, X) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Minimize */}
            <button
              type="button"
              aria-label="Minimize"
              title="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick(soundEnabled);
                minimizeWindow(win.id);
              }}
              className="titlebar-btn font-pixel text-[11px] -mt-[1px]"
            >
              _
            </button>

            {/* Maximize / Restore */}
            <button
              type="button"
              aria-label={win.maximized ? "Restore" : "Maximize"}
              title={win.maximized ? "Restore" : "Maximize"}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick(soundEnabled);
                maximizeWindow(win.id);
              }}
              className="titlebar-btn font-pixel text-[11px]"
            >
              {win.maximized ? "❐" : "□"}
            </button>

            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              title="Close (Alt+F4)"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playWindowClose(soundEnabled);
                closeWindow(win.id);
              }}
              className="titlebar-btn font-pixel text-[11px]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content */}
        {!win.collapsed && (
          <div
            className="w-full bg-[#FFFFFF] text-black font-mono overflow-y-auto select-text relative bevel-in mt-[2px]"
            style={{ height: `${win.h - 38}px` }}
          >
            {children}
          </div>
        )}

        {/* 8 Resize Edge & Corner Hit Areas */}
        {!win.maximized && !win.collapsed && (
          <>
            {/* Top */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "n")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute top-0 left-2 right-2 h-1.5 cursor-n-resize z-40"
            />
            {/* Bottom */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "s")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize z-40"
            />
            {/* Left */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "w")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute top-2 bottom-2 left-0 w-1.5 cursor-w-resize z-40"
            />
            {/* Right */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "e")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute top-2 bottom-2 right-0 w-1.5 cursor-e-resize z-40"
            />

            {/* Top-Left */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "nw")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute top-0 left-0 w-2.5 h-2.5 cursor-nw-resize z-40"
            />
            {/* Top-Right */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "ne")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute top-0 right-0 w-2.5 h-2.5 cursor-ne-resize z-40"
            />
            {/* Bottom-Left */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "sw")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute bottom-0 left-0 w-2.5 h-2.5 cursor-sw-resize z-40"
            />
            {/* Bottom-Right with Grip */}
            <div
              onPointerDown={(e) => handleResizePointerDown(e, "se")}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              title="Resize window"
              className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-se-resize z-40 flex items-end justify-end p-0.5"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#808080]">
                <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1" />
                <line x1="7" y1="4" x2="4" y2="7" stroke="currentColor" strokeWidth="1" />
                <line x1="7" y1="7" x2="7" y2="7" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Title Bar Context Menu */}
      {titleContextMenu && (
        <ContextMenu
          x={titleContextMenu.x}
          y={titleContextMenu.y}
          items={titleContextMenuItems}
          onClose={() => setTitleContextMenu(null)}
        />
      )}
    </>
  );
}
