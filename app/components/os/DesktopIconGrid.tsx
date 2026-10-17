"use client";

import React, { useState, useRef, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import { useWindowStore, DesktopIconPosition } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  myComputer32,
  networkNeighborhood32,
  winFolder32,
  winDoc32,
  trophySprite,
  acrobat32,
  mail32,
  msDos32,
  recycleBinEmpty32,
  controlPanel32,
} from "@/data/sprites";

function getSpriteForDesktopItem(id: string, appId: string) {
  if (id === "my-computer" || appId === "aboutMac")
    return <PixelSprite sprite={myComputer32} scale={1} />;
  if (id === "network" || appId === "chooser")
    return <PixelSprite sprite={networkNeighborhood32} scale={1} />;
  if (id === "resume" || appId === "pdfViewer")
    return <PixelSprite sprite={acrobat32} scale={1} />;
  if (id === "mail" || appId === "mail")
    return <PixelSprite sprite={mail32} scale={1} />;
  if (id === "trash")
    return <PixelSprite sprite={recycleBinEmpty32} scale={1} />;
  if (id === "achievements")
    return <PixelSprite sprite={trophySprite} scale={2} />;
  if (id === "skills")
    return <PixelSprite sprite={controlPanel32} scale={1} />;
  if (appId === "terminal")
    return <PixelSprite sprite={msDos32} scale={1} />;
  if (appId === "simpleText")
    return <PixelSprite sprite={winDoc32} scale={1} />;
  return <PixelSprite sprite={winFolder32} scale={1} />;
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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    item: DesktopIconPosition;
  } | null>(null);

  const dragItemRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    hasMoved: boolean;
  } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, item: DesktopIconPosition) => {
      if (e.button !== 0) return; // Only primary button for drag
      setSelectedId(item.id);
      soundManager.playClick(soundEnabled);

      dragItemRef.current = {
        id: item.id,
        startX: e.clientX,
        startY: e.clientY,
        initX: item.x,
        initY: item.y,
        hasMoved: false,
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
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        dragItemRef.current.hasMoved = true;
        moveDesktopIcon(
          dragItemRef.current.id,
          dragItemRef.current.initX + dx,
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
          "Recycle Bin",
          "The Recycle Bin is currently empty. Zero bugs found. All code running in production!",
          undefined,
          "info"
        );
      } else {
        openWindow(item.appId, item.props, item.label);
      }
    },
    [openWindow, showAlert, soundEnabled]
  );

  const handleContextMenu = (e: React.MouseEvent, item: DesktopIconPosition) => {
    e.preventDefault();
    setSelectedId(item.id);
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
    });
  };

  const iconContextMenuItems: ContextMenuItem[] = contextMenu
    ? [
        {
          label: "Open",
          onClick: () => handleOpen(contextMenu.item),
        },
        {
          label: "Open With Terminal",
          onClick: () => {
            openWindow("terminal", {
              initialCommand: `open ${contextMenu.item.label}`,
            });
          },
        },
        { isDivider: true },
        {
          label: "Properties",
          onClick: () => {
            openWindow("getInfo", {
              name: contextMenu.item.label,
              appId: contextMenu.item.appId,
              props: contextMenu.item.props,
            });
          },
        },
      ]
    : [];

  return (
    <>
      <div
        role="group"
        aria-label="Desktop icons"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedId(null);
          }
        }}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
      >
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
              onContextMenu={(e) => handleContextMenu(e, item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(item);
                }
              }}
              className="pointer-events-auto absolute flex flex-col items-center justify-start cursor-pointer group focus:outline-none"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: "80px",
                height: "84px",
              }}
            >
              {/* Centered 32x32 Icon */}
              <div
                className={`w-9 h-9 flex items-center justify-center p-0.5 ${
                  isSelected ? "brightness-90 contrast-125" : ""
                }`}
              >
                {getSpriteForDesktopItem(item.id, item.appId)}
              </div>

              {/* Label plate below icon, max 2 lines, word-wrapped, never clipped */}
              <div className="mt-1 flex justify-center max-w-[78px]">
                <span
                  className={`font-pixel text-[10px] text-center leading-[1.25] break-words select-none px-1 py-0.5 rounded-none ${
                    isSelected
                      ? "bg-[#000080] text-white dotted-focus shadow-sm"
                      : "text-white text-shadow-[1px_1px_0_#000] group-hover:bg-[#000080]/80 group-hover:text-white"
                  }`}
                  style={{
                    wordBreak: "break-word",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={iconContextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}
