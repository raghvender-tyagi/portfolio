"use client";

import React, { useEffect, useState } from "react";
import MenuBarOS from "./MenuBarOS";
import DesktopIconGrid from "./DesktopIconGrid";
import WindowFrame from "./WindowFrame";
import SystemAlert from "./SystemAlert";
import Screensaver from "./Screensaver";
import WalkingSidekick from "../WalkingSidekick";
import FlyingChips from "../FlyingChips";
import BootSequence from "../BootSequence";
import PixelSprite from "../PixelSprite";
import BevelButton from "../BevelButton";
import { useWindowStore } from "@/lib/os/windowStore";
import { appRegistry } from "@/lib/os/apps";
import { soundManager } from "@/lib/os/sound";
import { robotFaceSprites } from "@/data/sprites";

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
  } = useWindowStore();

  const [mounted, setMounted] = useState(false);

  // Initialize store from localStorage & hash deep link
  useEffect(() => {
    const timer = setTimeout(() => {
      initFromStorage();
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [initFromStorage]);

  const activeWin = windows.find((w) => w.id === activeWindowId);

  // Wallpaper CSS class
  const wallpaperClass =
    wallpaper === "checker"
      ? "bg-mac-checker"
      : wallpaper === "grid"
      ? "bg-[#D9D9D9]"
      : wallpaper === "solid"
      ? "bg-[#BFBFBF]"
      : "bg-mac-dither";

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#D9D9D9]" />;
  }

  return (
    <div
      className={`fixed inset-0 select-none overflow-hidden ${wallpaperClass} ${
        themeInverted ? "invert" : ""
      }`}
      style={{
        height: "100dvh",
        width: "100vw",
      }}
    >
      {/* 1. First-Load Boot Sequence */}
      <BootSequence />

      {/* 2. Top System 7 MenuBar */}
      <MenuBarOS />

      {/* 3. Ambient Walking Sidekick Mascot */}
      <WalkingSidekick />

      {/* 4. Ambient Flying Winged Chips (Margins) */}
      <FlyingChips />

      {/* 5. Desktop Workspace */}
      <main
        role="application"
        aria-label="RT-OS Desktop Workspace"
        className="absolute inset-0 pt-8 overflow-hidden"
      >
        {/* Desktop Icons Layer */}
        <DesktopIconGrid />

        {/* Desktop Floating Windows Layer (Tablet & Desktop >= 768px) */}
        <div className="hidden md:block absolute inset-0 pt-8 pointer-events-none">
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
        <div className="md:hidden absolute inset-0 pt-8 z-30">
          {activeWin ? (
            /* Open App Full Screen on Mobile */
            <div className="w-full h-full bg-white flex flex-col border-t-2 border-black">
              {/* Mobile App Header with Back Button */}
              <div className="h-8 bg-[#BFBFBF] border-b-2 border-black flex items-center justify-between px-2 text-xs select-none">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick(soundEnabled);
                    closeWindow(activeWin.id);
                  }}
                  className="font-pixel text-[10px] font-bold uppercase px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white"
                >
                  ← Desktop
                </button>
                <span className="font-pixel text-[11px] font-bold uppercase truncate max-w-[50%]">
                  {activeWin.title}
                </span>
                <div className="w-6" />
              </div>

              {/* Full Screen Content */}
              <div className="flex-1 overflow-y-auto">
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
                  className="flex flex-col items-center gap-1.5 p-2 border border-black/20 bg-white/70 active:bg-black active:text-white"
                >
                  <PixelSprite sprite={robotFaceSprites.idle} scale={2} />
                  <span className="font-pixel text-[9px] uppercase tracking-wider truncate w-full">
                    {app.title.replace(/\.(app|sys|finder|game)$/, "")}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 6. Screensaver Layer (Activates after 60s of inactivity) */}
      <Screensaver />

      {/* 7. System Alert Modal Layer */}
      <SystemAlert />

      {/* 8. Shut Down Screen */}
      {isShutDown && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black z-[120] flex flex-col items-center justify-center p-6 text-center select-none text-white space-y-6 animate-in fade-in duration-300"
        >
          <div className="border-4 border-white p-6 max-w-md bg-black space-y-4">
            <div className="font-pixel text-xl font-bold tracking-widest uppercase">
              RT-OS 1.0
            </div>
            <p className="font-mono text-sm leading-relaxed text-neutral-300">
              It is now safe to turn off your computer.
            </p>
            <div className="pt-2 flex justify-center">
              <BevelButton
                onClick={() => {
                  setShutDown(false);
                  soundManager.playStartupChime(soundEnabled);
                }}
                variant="inverted"
                size="md"
              >
                [ Power On ]
              </BevelButton>
            </div>
          </div>
        </div>
      )}

      {/* 9. Restart Screen */}
      {isRestarting && (
        <div className="fixed inset-0 bg-black z-[120] flex items-center justify-center text-white font-pixel text-sm uppercase">
          Restarting RT-OS...
        </div>
      )}
    </div>
  );
}
