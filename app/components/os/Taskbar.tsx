"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PixelSprite from "../PixelSprite";
import StartMenu from "./StartMenu";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import { useWindowStore, WindowInstance } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  rtStartLogo16,
  msDos32,
  myComputer32,
  winFolder32,
  winDoc32,
  acrobat32,
  winPaint32,
  winCalc32,
  bugSmileySprites,
} from "@/data/sprites";

function getIconForWindow(appId: string) {
  if (appId === "terminal") return <PixelSprite sprite={msDos32} scale={0.5} />;
  if (appId === "aboutMac") return <PixelSprite sprite={myComputer32} scale={0.5} />;
  if (appId === "finder") return <PixelSprite sprite={winFolder32} scale={0.5} />;
  if (appId === "simpleText") return <PixelSprite sprite={winDoc32} scale={0.5} />;
  if (appId === "pdfViewer") return <PixelSprite sprite={acrobat32} scale={0.5} />;
  if (appId === "paint") return <PixelSprite sprite={winPaint32} scale={0.5} />;
  if (appId === "calc") return <PixelSprite sprite={winCalc32} scale={0.5} />;
  if (appId === "snake" || appId === "bugSweeper")
    return <PixelSprite sprite={bugSmileySprites.normal} scale={1} />;
  return <PixelSprite sprite={winDoc32} scale={0.5} />;
}

export default function Taskbar() {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    soundEnabled,
    setSoundEnabled,
    openWindow,
  } = useWindowStore();

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [fullDate, setFullDate] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    win: WindowInstance;
  } | null>(null);

  // Clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setFullDate(
        now.toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global keybindings: Windows key or Ctrl+Esc to toggle Start Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "Meta" || (e.ctrlKey && e.key === "Escape")) &&
        !e.altKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        soundManager.playClick(soundEnabled);
        setIsStartOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [soundEnabled]);

  const handleStartClick = useCallback(() => {
    soundManager.playClick(soundEnabled);
    setIsStartOpen((prev) => !prev);
  }, [soundEnabled]);

  const handleTaskButtonClick = (win: WindowInstance) => {
    soundManager.playClick(soundEnabled);
    if (win.minimized) {
      focusWindow(win.id);
    } else if (activeWindowId === win.id) {
      minimizeWindow(win.id);
    } else {
      focusWindow(win.id);
    }
  };

  const handleTaskButtonContextMenu = (
    e: React.MouseEvent,
    win: WindowInstance
  ) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY - 120,
      win,
    });
  };

  const taskContextMenuItems: ContextMenuItem[] = contextMenu
    ? [
        {
          label: "Restore",
          disabled: !contextMenu.win.minimized && !contextMenu.win.maximized,
          onClick: () => {
            if (contextMenu.win.minimized) minimizeWindow(contextMenu.win.id);
            if (contextMenu.win.maximized) maximizeWindow(contextMenu.win.id);
            focusWindow(contextMenu.win.id);
          },
        },
        {
          label: "Minimize",
          disabled: contextMenu.win.minimized,
          onClick: () => minimizeWindow(contextMenu.win.id),
        },
        {
          label: "Maximize",
          disabled: contextMenu.win.maximized,
          onClick: () => maximizeWindow(contextMenu.win.id),
        },
        { isDivider: true },
        {
          label: "Close",
          shortcut: "Alt+F4",
          onClick: () => closeWindow(contextMenu.win.id),
        },
      ]
    : [];

  // Show desktop toggle
  const handleShowDesktop = () => {
    soundManager.playClick(soundEnabled);
    const hasVisible = windows.some((w) => !w.minimized);
    if (hasVisible) {
      windows.forEach((w) => {
        if (!w.minimized) minimizeWindow(w.id);
      });
    } else {
      windows.forEach((w) => {
        if (w.minimized) minimizeWindow(w.id);
      });
    }
  };

  return (
    <>
      {/* Start Menu Layer */}
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

      {/* Taskbar Frame (38px) */}
      <header
        role="navigation"
        aria-label="RT-OS 95 Taskbar"
        className="fixed bottom-0 left-0 right-0 h-[38px] bg-[#C0C0C0] bevel-out z-[100] flex items-center justify-between px-1 select-none"
      >
        {/* Left Side: System indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 h-[26px] bevel-in text-[10px] font-pixel text-neutral-700 bg-[#C0C0C0]">
          <span className="w-2 h-2 bg-[#008080] border border-black inline-block"></span>
          <span className="font-bold tracking-wider">RT-OS 95</span>
        </div>

        {/* Center: Windows 11 style centered Start button + Quick Launch + Open Task Buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 h-full py-0.5 max-w-[calc(100vw-180px)] overflow-x-auto scrollbar-none">
          {/* Start Button */}
          <button
            id="start-button"
            type="button"
            aria-haspopup="true"
            aria-expanded={isStartOpen}
            onClick={handleStartClick}
            className={`h-[28px] px-2.5 flex items-center gap-1.5 font-pixel text-[11px] font-bold tracking-wider cursor-pointer select-none outline-none ${
              isStartOpen ? "bevel-in bg-[#B8B8B8]" : "win95-btn"
            }`}
          >
            <div className="shrink-0 -ml-0.5">
              <PixelSprite sprite={rtStartLogo16} scale={1} />
            </div>
            <span>Start</span>
          </button>

          {/* Quick Launch Well */}
          <div className="hidden sm:flex items-center gap-1 px-1 h-[26px] bevel-in">
            {/* Show Desktop */}
            <button
              type="button"
              onClick={handleShowDesktop}
              title="Show Desktop"
              className="p-1 hover:bg-black/10 active:scale-95"
            >
              <PixelSprite sprite={myComputer32} scale={0.45} />
            </button>

            {/* Terminal Quick Launch */}
            <button
              type="button"
              onClick={() => {
                soundManager.playWindowOpen(soundEnabled);
                openWindow("terminal");
              }}
              title="MS-DOS Prompt"
              className="p-1 hover:bg-black/10 active:scale-95"
            >
              <PixelSprite sprite={msDos32} scale={0.45} />
            </button>

            {/* Classic View Link */}
            <Link
              href="/classic"
              title="Classic Recruiter View (Single Page)"
              className="p-1 hover:bg-black/10 active:scale-95 flex items-center"
            >
              <PixelSprite sprite={winDoc32} scale={0.45} />
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-[24px] w-[2px] border-l border-[#808080] border-r border-r-white mx-0.5" />

          {/* Task Buttons Area */}
          <div className="flex items-center gap-1 h-full py-0.5 overflow-x-auto scrollbar-none">
            {windows.map((win) => {
              const isActive = activeWindowId === win.id && !win.minimized;
              return (
                <button
                  key={win.id}
                  type="button"
                  onClick={() => handleTaskButtonClick(win)}
                  onContextMenu={(e) => handleTaskButtonContextMenu(e, win)}
                  title={win.title}
                  className={`h-[28px] min-w-[110px] max-w-[160px] px-2 flex items-center gap-1.5 font-pixel text-[10px] truncate cursor-pointer text-left select-none transition-none ${
                    isActive
                      ? "bevel-in bg-[#DFDFDF] font-bold text-black"
                      : "win95-btn bg-[#C0C0C0] text-black/90"
                  }`}
                >
                  <div className="shrink-0">{getIconForWindow(win.appId)}</div>
                  <span className="truncate">{win.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: System Tray */}
        <div className="ml-auto flex items-center gap-2 h-[26px] px-2 bevel-in bg-[#C0C0C0]">
          {/* Sound Toggle Icon */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) soundManager.playStartupChime(true);
            }}
            title={`Audio Sound: ${soundEnabled ? "ON" : "MUTED"}`}
            className="hover:bg-black/10 p-0.5 flex items-center font-pixel text-[11px]"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>

          {/* Divider */}
          <div className="h-[18px] w-[1px] bg-[#808080]" />

          {/* Clock */}
          <div
            title={fullDate}
            onDoubleClick={() => openWindow("dateTimeProperties")}
            className="font-pixel text-[11px] text-black tracking-wide cursor-pointer select-none px-1"
          >
            {currentTime || "12:00 PM"}
          </div>
        </div>
      </header>

      {/* Task Button Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={taskContextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}

