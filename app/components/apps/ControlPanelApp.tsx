"use client";

import React from "react";
import TabbedDialog, { TabItem } from "../os/TabbedDialog";
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

  const wallpaperOptions: Array<{ id: "teal" | "dither" | "checker" | "solid"; label: string }> = [
    { id: "teal", label: "Classic Teal (Win95)" },
    { id: "dither", label: "1-Bit Dither (Mono)" },
    { id: "checker", label: "Checker Mesh" },
    { id: "solid", label: "Solid Neutral Grey" },
  ];

  const tabs: TabItem[] = [
    {
      id: "background",
      label: "Background",
      content: (
        <div className="space-y-3 text-xs font-mono select-none">
          {/* CRT Monitor Preview */}
          <div className="flex justify-center p-2">
            <div className="w-40 h-28 bevel-in bg-[#C0C0C0] p-1 flex flex-col items-center justify-center">
              <div
                className={`w-32 h-20 border border-black ${
                  wallpaper === "teal"
                    ? "bg-[#008080]"
                    : wallpaper === "dither"
                    ? "bg-mac-dither"
                    : wallpaper === "checker"
                    ? "bg-mac-checker"
                    : "bg-[#808080]"
                }`}
              />
              <div className="w-12 h-2 bg-[#808080] mt-1" />
            </div>
          </div>

          {/* Wallpaper Selection Box */}
          <div className="space-y-1">
            <span className="font-pixel text-[10px] font-bold text-black block">
              Pattern / Wallpaper:
            </span>
            <div className="bevel-in bg-white p-1 max-h-28 overflow-y-auto space-y-0.5">
              {wallpaperOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick(soundEnabled);
                    setWallpaper(opt.id);
                  }}
                  className={`w-full text-left px-2 py-1 font-pixel text-[10px] ${
                    wallpaper === opt.id
                      ? "bg-[#000080] text-white dotted-focus"
                      : "hover:bg-neutral-100 text-black"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mono Mode Option */}
          <div className="pt-2 border-t border-[#808080] flex items-center justify-between">
            <div>
              <span className="font-bold text-black">1-Bit Mono Theme:</span>
              <span className="text-[10px] text-neutral-600 block">
                Applies the monochrome high-contrast skin
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = wallpaper !== "dither";
                setWallpaper(next ? "dither" : "teal");
              }}
              className="win95-btn px-3 py-1 font-pixel text-[10px]"
            >
              {wallpaper === "dither" ? "MONO: ON" : "MONO: OFF"}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "sounds",
      label: "Sounds",
      content: (
        <div className="space-y-3 text-xs font-mono select-none">
          <div className="space-y-2">
            <span className="font-pixel text-[10px] font-bold text-black block">
              Audio Scheme:
            </span>
            <div className="bevel-in bg-white p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Synthesized WebAudio Sound:</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) soundManager.playStartupChime(true);
                  }}
                  className="win95-btn px-3 py-1 font-pixel text-[10px] font-bold"
                >
                  {soundEnabled ? "ENABLED" : "MUTED"}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                <span>Audition Sound Event:</span>
                <button
                  type="button"
                  onClick={() => soundManager.playStartupChime(true)}
                  className="win95-btn px-2.5 py-1 font-pixel text-[10px]"
                >
                  ▶ Play Chime
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "system",
      label: "Settings",
      content: (
        <div className="space-y-3 text-xs font-mono select-none">
          <div className="bevel-in bg-white p-3 space-y-3">
            {/* Mascot */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-black">Walking Robot Mascot:</span>
                <span className="text-[10px] text-neutral-600 block">
                  Stepped pixel mascot walking along desktop
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSidekickEnabled(!sidekickEnabled)}
                className="win95-btn px-3 py-1 font-pixel text-[10px]"
              >
                {sidekickEnabled ? "ACTIVE" : "OFF"}
              </button>
            </div>

            {/* Screensaver */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <div>
                <span className="font-bold text-black">60s Flying Chips Screensaver:</span>
                <span className="text-[10px] text-neutral-600 block">
                  Triggers after 1 minute of inactivity
                </span>
              </div>
              <button
                type="button"
                onClick={() => setScreensaverEnabled(!screensaverEnabled)}
                className="win95-btn px-3 py-1 font-pixel text-[10px]"
              >
                {screensaverEnabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            {/* Invert */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <div>
                <span className="font-bold text-black">Invert Palette:</span>
                <span className="text-[10px] text-neutral-600 block">
                  Night vision inverted mode
                </span>
              </div>
              <button
                type="button"
                onClick={() => setThemeInverted(!themeInverted)}
                className="win95-btn px-3 py-1 font-pixel text-[10px]"
              >
                {themeInverted ? "INVERTED" : "NORMAL"}
              </button>
            </div>
          </div>

          {/* Reset Desktop */}
          <div className="pt-2 border-t border-[#808080] flex justify-end">
            <button
              type="button"
              onClick={() => {
                showAlert(
                  "Reset Desktop",
                  "Are you sure you want to restore factory default icons and centered Welcome window?",
                  () => resetDesktop(),
                  "warning"
                );
              }}
              className="win95-btn px-4 py-1.5 font-bold font-pixel text-[10px]"
            >
              Reset to Factory Defaults
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full bg-[#C0C0C0]">
      <TabbedDialog tabs={tabs} />
    </div>
  );
}
