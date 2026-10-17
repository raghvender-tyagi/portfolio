"use client";

import React from "react";
import BevelButton from "../BevelButton";
import { useWindowStore } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";

export default function ControlPanelApp() {
  const {
    wallpaper,
    setWallpaper,
    themeInverted,
    setThemeInverted,
    soundEnabled,
    setSoundEnabled,
    sidekickEnabled,
    setSidekickEnabled,
    screensaverEnabled,
    setScreensaverEnabled,
    resetDesktop,
    showAlert,
  } = useWindowStore();

  const wallpapers: Array<"dither" | "checker" | "grid" | "solid"> = [
    "dither",
    "checker",
    "grid",
    "solid",
  ];

  return (
    <div className="p-4 bg-white text-black font-mono text-xs flex flex-col h-full justify-between select-none space-y-4">
      <div className="space-y-4">
        {/* Desktop Wallpaper Picker */}
        <div className="border-2 border-black bg-[#D9D9D9] p-3 space-y-2">
          <div className="flex items-center justify-between border-b border-black pb-1">
            <span className="font-pixel text-[10px] font-bold uppercase">
              Desktop Wallpaper Pattern
            </span>
            <span className="font-pixel text-[9px] uppercase text-black/70">
              Active: {wallpaper}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {wallpapers.map((wp) => {
              const isSelected = wallpaper === wp;
              return (
                <button
                  key={wp}
                  type="button"
                  onClick={() => {
                    soundManager.playClick(soundEnabled);
                    setWallpaper(wp);
                  }}
                  className={`border-2 border-black p-2 flex flex-col items-center gap-1.5 cursor-pointer ${
                    isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"
                  }`}
                >
                  <div
                    className={`w-8 h-8 border border-black ${
                      wp === "dither"
                        ? "bg-mac-dither"
                        : wp === "checker"
                        ? "bg-mac-checker"
                        : wp === "grid"
                        ? "bg-[#D9D9D9]"
                        : "bg-[#BFBFBF]"
                    }`}
                  />
                  <span className="font-pixel text-[9px] uppercase">{wp}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Toggles */}
        <div className="border-2 border-black bg-white p-3 space-y-2.5">
          <span className="font-pixel text-[10px] font-bold uppercase text-black/70 block border-b border-black pb-1">
            System Preferences
          </span>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold">Retro Sound Effects:</span>
              <span className="text-[10px] text-black/60 block">WebAudio square-wave synthesis</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) soundManager.playAlertBeep(true);
              }}
              className="font-pixel text-[10px] px-2.5 py-1 border-2 border-black bg-[#D9D9D9] hover:bg-black hover:text-white uppercase font-bold"
            >
              [{soundEnabled ? "ENABLED" : "MUTED"}]
            </button>
          </div>

          {/* Sidekick Mascot Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold">Walking Mascot:</span>
              <span className="text-[10px] text-black/60 block">Animated robot assistant along menu</span>
            </div>
            <button
              type="button"
              onClick={() => setSidekickEnabled(!sidekickEnabled)}
              className="font-pixel text-[10px] px-2.5 py-1 border-2 border-black bg-[#D9D9D9] hover:bg-black hover:text-white uppercase font-bold"
            >
              [{sidekickEnabled ? "ACTIVE" : "OFF"}]
            </button>
          </div>

          {/* 60s Screensaver Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold">60s Screensaver:</span>
              <span className="text-[10px] text-black/60 block">Flying winged chips on inactivity</span>
            </div>
            <button
              type="button"
              onClick={() => setScreensaverEnabled(!screensaverEnabled)}
              className="font-pixel text-[10px] px-2.5 py-1 border-2 border-black bg-[#D9D9D9] hover:bg-black hover:text-white uppercase font-bold"
            >
              [{screensaverEnabled ? "ON" : "OFF"}]
            </button>
          </div>

          {/* Invert Theme Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold">Invert Palette:</span>
              <span className="text-[10px] text-black/60 block">High-contrast dark monochrome</span>
            </div>
            <button
              type="button"
              onClick={() => setThemeInverted(!themeInverted)}
              className="font-pixel text-[10px] px-2.5 py-1 border-2 border-black bg-[#D9D9D9] hover:bg-black hover:text-white uppercase font-bold"
            >
              [{themeInverted ? "INVERTED" : "STANDARD"}]
            </button>
          </div>
        </div>
      </div>

      {/* Reset Desktop Section */}
      <div className="pt-2 border-t-2 border-black flex items-center justify-between">
        <span className="text-[10px] text-black/60">
          CONTROL PANEL 7.1 • RT-OS
        </span>
        <BevelButton
          onClick={() => {
            showAlert(
              "Reset Desktop Confirmation",
              "Are you sure you want to reset all desktop windows and icon positions to factory defaults?",
              () => resetDesktop()
            );
          }}
          variant="default"
          size="sm"
        >
          Reset Desktop Defaults
        </BevelButton>
      </div>
    </div>
  );
}
