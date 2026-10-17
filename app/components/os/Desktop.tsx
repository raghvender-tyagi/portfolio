"use client";

import React, { useEffect, useState, useCallback } from "react";
import Taskbar from "./Taskbar";
import DesktopIconGrid from "./DesktopIconGrid";
import WindowFrame from "./WindowFrame";
import SystemAlert from "./SystemAlert";
import Screensaver from "./Screensaver";
import BootSequence from "../BootSequence";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import PixelSprite from "../PixelSprite";
import { useWindowStore } from "@/lib/os/windowStore";
import { appRegistry } from "@/lib/os/apps";
import { soundManager } from "@/lib/os/sound";
import {
  myComputer32,
  networkNeighborhood32,
  winFolder32,
  winDoc32,
  acrobat32,
  mail32,
  msDos32,
  winPaint32,
  controlPanel32,
  winCalc32,
  bugSmileySprites,
} from "@/data/sprites";

function getMobileIcon(id: string) {
  if (id === "terminal") return <PixelSprite sprite={msDos32} scale={1} />;
  if (id === "aboutMac") return <PixelSprite sprite={myComputer32} scale={1} />;
  if (id === "finder") return <PixelSprite sprite={winFolder32} scale={1} />;
  if (id === "simpleText") return <PixelSprite sprite={winDoc32} scale={1} />;
  if (id === "pdfViewer") return <PixelSprite sprite={acrobat32} scale={1} />;
  if (id === "mail") return <PixelSprite sprite={mail32} scale={1} />;
  if (id === "chooser") return <PixelSprite sprite={networkNeighborhood32} scale={1} />;
  if (id === "controlPanel") return <PixelSprite sprite={controlPanel32} scale={1} />;
  if (id === "paint") return <PixelSprite sprite={winPaint32} scale={1} />;
  if (id === "calc") return <PixelSprite sprite={winCalc32} scale={1} />;
  if (id === "snake" || id === "bugSweeper")
    return <PixelSprite sprite={bugSmileySprites.normal} scale={1.5} />;
  return <PixelSprite sprite={winFolder32} scale={1} />;
}

export default function Desktop() {
  const {
    windows,
    activeWindowId,
    wallpaper,
    themeInverted,
    isShutDown,
    setShutDown,
    isRestarting,
    initFromStorage,
    soundEnabled,
    closeWindow,
    cleanUpDesktopIcons,
    openWindow,
  } = useWindowStore();

  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [desktopContextMenu, setDesktopContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Initialize store from localStorage & hash deep link
  useEffect(() => {
    const timer = setTimeout(() => {
      initFromStorage();
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [initFromStorage]);

  const activeWin = windows.find((w) => w.id === activeWindowId && !w.minimized);

  // Desktop right-click context menu
  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    // Only trigger if clicking directly on the desktop background
    if ((e.target as HTMLElement).closest("[role='region'], [role='button'], header, [role='menu']")) {
      return;
    }
    e.preventDefault();
    setDesktopContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 120);
  }, []);

  const desktopMenuItems: ContextMenuItem[] = [
    {
      label: "Arrange Icons",
      submenu: [
        {
          label: "by Name",
          onClick: cleanUpDesktopIcons,
        },
        {
          label: "by Type",
          onClick: cleanUpDesktopIcons,
        },
        {
          label: "Auto Arrange",
          onClick: cleanUpDesktopIcons,
        },
      ],
    },
    {
      label: "Line Up Icons",
      onClick: cleanUpDesktopIcons,
    },
    {
      label: "Refresh",
      onClick: handleRefresh,
    },
    { isDivider: true },
    {
      label: "New",
      submenu: [
        {
          label: "Text Document",
          onClick: () => openWindow("simpleText", { file: "New Text Document.txt" }),
        },
        {
          label: "Folder",
          onClick: () => openWindow("finder", { folder: "projects" }),
        },
      ],
    },
    { isDivider: true },
    {
      label: "Properties",
      onClick: () => openWindow("controlPanel"),
    },
  ];

  // Wallpaper CSS styling
  let wallpaperBg = "bg-[#008080]"; // Classic Win95 Teal default
  if (wallpaper === "dither") wallpaperBg = "bg-mac-dither";
  if (wallpaper === "checker") wallpaperBg = "bg-mac-checker";
  if (wallpaper === "solid") wallpaperBg = "bg-[#808080]";
  if (wallpaper === "grid") wallpaperBg = "bg-[#008080]";

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#008080]" />;
  }

  return (
    <div
      onContextMenu={handleDesktopContextMenu}
      className={`fixed inset-0 select-none overflow-hidden ${wallpaperBg} ${
        themeInverted ? "invert" : ""
      } ${isRefreshing ? "opacity-60" : "opacity-100"}`}
      style={{
        height: "100dvh",
        width: "100vw",
      }}
    >
      {/* 1. First-Load Boot Sequence */}
      <BootSequence />

      {/* 2. Desktop Workspace Area (Above 38px taskbar) */}
      <main
        role="application"
        aria-label="RT-OS 95 Desktop Workspace"
        className="absolute inset-0 pb-[38px] overflow-hidden"
      >
        {/* Desktop Icons Layer (Fixed 80x84px grid) */}
        <DesktopIconGrid />

        {/* Floating Windows Layer (Tablet & Desktop >= 768px) */}
        <div className="hidden md:block absolute inset-0 pb-[38px] pointer-events-none">
          {windows.map((win) => {
            const appDef = appRegistry[win.appId];
            if (!appDef) return null;
            const AppComponent = appDef.component;

            return (
              <div key={win.id} className="pointer-events-auto">
                <WindowFrame window={win} minSize={appDef.minSize}>
                  <AppComponent {...(win.props || {})} />
                </WindowFrame>
              </div>
            );
          })}
        </div>

        {/* Mobile Full-Screen App Mode (< 768px) */}
        <div className="md:hidden absolute inset-0 pb-[38px] z-30">
          {activeWin ? (
            /* Open App Full Screen on Mobile */
            <div className="w-full h-full bg-[#C0C0C0] flex flex-col bevel-window">
              {/* Mobile App Header with Back Button */}
              <div className="h-7 titlebar-active flex items-center justify-between px-2 text-xs select-none">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick(soundEnabled);
                    closeWindow(activeWin.id);
                  }}
                  className="font-pixel text-[9px] font-bold px-1.5 py-0.5 win95-btn"
                >
                  ← Desktop
                </button>
                <span className="font-pixel text-[10px] font-bold truncate max-w-[50%] text-white">
                  {activeWin.title}
                </span>
                <button
                  type="button"
                  onClick={() => closeWindow(activeWin.id)}
                  className="titlebar-btn text-[10px]"
                >
                  ✕
                </button>
              </div>

              {/* Full Screen Content with Bevel In */}
              <div className="flex-1 overflow-y-auto bg-white bevel-in m-1 p-1">
                {(() => {
                  const appDef = appRegistry[activeWin.appId];
                  if (!appDef) return null;
                  const AppComponent = appDef.component;
                  return <AppComponent {...(activeWin.props || {})} />;
                })()}
              </div>
            </div>
          ) : (
            /* Mobile Home-Screen App Grid */
            <div className="p-4 grid grid-cols-3 gap-3 text-center overflow-y-auto max-h-full">
              {Object.values(appRegistry).map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    soundManager.playWindowOpen(soundEnabled);
                    useWindowStore.getState().openWindow(app.id);
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 bg-[#C0C0C0]/90 bevel-out active:bevel-in"
                >
                  {getMobileIcon(app.id)}
                  <span className="font-pixel text-[9px] font-bold uppercase tracking-wider truncate w-full text-black">
                    {app.title.replace(/\.(app|sys|finder|game|exe)$/, "")}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 4. Bottom Taskbar (38px, fixed) */}
      <Taskbar />

      {/* 5. Screensaver Layer (Activates after 60s of inactivity) */}
      <Screensaver />

      {/* 6. System Alert / Message Box Layer */}
      <SystemAlert />

      {/* 7. Desktop Background Context Menu */}
      {desktopContextMenu && (
        <ContextMenu
          x={desktopContextMenu.x}
          y={desktopContextMenu.y}
          items={desktopMenuItems}
          onClose={() => setDesktopContextMenu(null)}
        />
      )}

      {/* 8. Shut Down Screen */}
      {isShutDown && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black z-[140] flex flex-col items-center justify-center p-6 text-center select-none text-[#FFA500] space-y-6"
        >
          <div className="border-4 border-[#FFA500] p-8 max-w-lg bg-black space-y-4 shadow-[8px_8px_0_#333]">
            <div className="font-pixel text-2xl font-bold tracking-widest uppercase text-[#FFA500]">
              RT-OS 95
            </div>
            <p className="font-pixel text-sm leading-relaxed text-[#FFA500]">
              It&apos;s now safe to turn off your computer.
            </p>
            <p className="font-mono text-xs text-neutral-400">
              Or click below to restart your session.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setShutDown(false);
                  soundManager.playStartupChime(soundEnabled);
                }}
                className="win95-btn px-6 py-2 font-pixel text-xs text-black"
              >
                Restart Computer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Restart Screen */}
      {isRestarting && (
        <div className="fixed inset-0 bg-black z-[140] flex items-center justify-center text-white font-pixel text-sm uppercase">
          Restarting RT-OS 95...
        </div>
      )}
    </div>
  );
}
