"use client";

import React, { useState, useRef, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { useWindowStore, DesktopIconPosition } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  floppyDiskSprite,
  folderSprite,
  documentSprite,
  trashSprites,
  trophySprite,
  robotFaceSprites,
} from "@/data/sprites";

function getSpriteForApp(id: string, appId: string): React.ReactNode {
  if (id === "mac-hd") return <PixelSprite sprite={floppyDiskSprite} scale={2} />;
  if (id === "resume") return <PixelSprite sprite={documentSprite} scale={2} />;
  if (id === "trash") return <PixelSprite sprite={trashSprites.empty} scale={2} />;
  if (id === "achievements") return <PixelSprite sprite={trophySprite} scale={2} />;
  if (appId === "terminal") return <PixelSprite sprite={robotFaceSprites.idle} scale={2} />;
  return <PixelSprite sprite={folderSprite} scale={2} />;
}

export default function DesktopIconGrid() {
  const {
    desktopIcons,
    moveDesktopIcon,
    openWindow,
    showAlert,
    soundEnabled,
  } = useWindowStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragItemRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, item: DesktopIconPosition) => {
      setSelectedId(item.id);
      soundManager.playClick(soundEnabled);

      dragItemRef.current = {
        id: item.id,
        startX: e.clientX,
        startY: e.clientY,
        initX: item.x,
        initY: item.y,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [soundEnabled]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragItemRef.current) return;
      const dx = e.clientX - dragItemRef.current.startX;
      const dy = e.clientY - dragItemRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        moveDesktopIcon(
          dragItemRef.current.id,
          dragItemRef.current.initX - dx, // icons positioned from right
          dragItemRef.current.initY + dy
        );
      }
    },
    [moveDesktopIcon]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragItemRef.current) {
      dragItemRef.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  }, []);

  const handleOpen = useCallback(
    (item: DesktopIconPosition) => {
      soundManager.playWindowOpen(soundEnabled);
      if (item.id === "trash") {
        showAlert(
          "Trash Status",
          "Trash is currently empty. Zero bugs found. Everything shipped to production!"
        );
      } else {
        openWindow(item.appId, item.props, item.label);
      }
    },
    [openWindow, showAlert, soundEnabled]
  );

  return (
    <div
      role="group"
      aria-label="Desktop icons"
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {/* Desktop Icons layer */}
      {desktopIcons.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            tabIndex={0}
            role="button"
            aria-label={`${item.label} desktop item`}
            onPointerDown={(e) => handlePointerDown(e, item)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDoubleClick={() => handleOpen(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen(item);
              }
            }}
            className="pointer-events-auto absolute flex flex-col items-center gap-1 p-1 cursor-pointer group focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black"
            style={{
              right: `${item.x}px`,
              top: `${item.y}px`,
              width: "76px",
            }}
          >
            {/* Sprite Icon */}
            <div className="p-1 border border-transparent group-hover:border-black/30">
              {getSpriteForApp(item.id, item.appId)}
            </div>

            {/* Label Plate */}
            <span
              className={`font-pixel text-[10px] uppercase tracking-wider text-center max-w-[76px] leading-tight select-none transition-colors duration-75 ${
                isSelected
                  ? "bg-black text-white px-1.5 py-0.5"
                  : "text-black bg-[#D9D9D9]/85 px-1 py-0.2 group-hover:bg-black group-hover:text-white"
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
