"use client";

import React, { useState } from "react";
import PixelSprite from "./PixelSprite";
import BevelButton from "./BevelButton";
import Window from "./Window";
import {
  floppyDiskSprite,
  folderSprite,
  documentSprite,
  trashSprites,
} from "@/data/sprites";

interface DesktopIconItem {
  id: string;
  label: string;
  sprite: React.ReactNode;
  onAction: () => void;
}

export default function DesktopIcons() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [trashAlertOpen, setTrashAlertOpen] = useState<boolean>(false);
  const [trashShaking, setTrashShaking] = useState<boolean>(false);

  const icons: DesktopIconItem[] = [
    {
      id: "mac-hd",
      label: "Macintosh HD",
      sprite: <PixelSprite sprite={floppyDiskSprite} scale={2} />,
      onAction: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "projects",
      label: "Projects",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      onAction: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "resume",
      label: "Resume.pdf",
      sprite: <PixelSprite sprite={documentSprite} scale={2} />,
      onAction: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Raghvender_Tyagi_Resume.pdf";
        link.target = "_blank";
        link.click();
      },
    },
    {
      id: "trash",
      label: "Trash",
      sprite: (
        <PixelSprite
          sprite={trashAlertOpen ? trashSprites.full : trashSprites.empty}
          scale={2}
        />
      ),
      onAction: () => {
        setTrashShaking(true);
        setTimeout(() => {
          setTrashShaking(false);
          setTrashAlertOpen(true);
        }, 300);
      },
    },
  ];

  return (
    <>
      <style>{`
        @keyframes trashShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
        }
        .animate-trash-shake {
          animation: trashShake 0.25s steps(4) 1;
        }
      `}</style>

      {/* Desktop Column on Right Margin (>=1200px screens) */}
      <aside
        aria-label="System 7 Desktop Shortcuts"
        className="hidden min-[1200px]:flex fixed right-6 top-14 flex-col items-center gap-6 z-30 select-none"
      >
        {icons.map((item) => {
          const isSelected = selectedId === item.id;
          const isShaking = item.id === "trash" && trashShaking;

          return (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`${item.label} desktop shortcut`}
              onClick={() => setSelectedId(item.id)}
              onDoubleClick={item.onAction}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  item.onAction();
                }
              }}
              className={`flex flex-col items-center gap-1.5 p-2 rounded cursor-pointer group focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black ${
                isShaking ? "animate-trash-shake" : ""
              }`}
            >
              {/* Pixel Sprite Icon */}
              <div className="p-1 border border-transparent group-hover:border-black/20">
                {item.sprite}
              </div>

              {/* Label Plate (inverted when selected) */}
              <span
                className={`font-pixel text-[11px] tracking-wider text-center max-w-[84px] leading-tight select-none transition-colors duration-75 ${
                  isSelected
                    ? "bg-black text-white px-1.5 py-0.5"
                    : "text-black bg-[#D9D9D9]/80 px-1 py-0.2"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </aside>

      {/* Easter Egg Modal Alert for Trash */}
      {trashAlertOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 select-none"
        >
          <div className="w-full max-w-sm">
            <Window
              title="trash.sys"
              status="TRASH CAN STATUS: EMPTY"
              collapsible={false}
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center py-2">
                  <PixelSprite sprite={trashSprites.empty} scale={3} />
                </div>
                <div className="font-heading font-bold text-lg text-black">
                  Nothing to see here.
                </div>
                <p className="font-mono text-xs text-black/80">
                  All systems deployed. Zero abandonware found. Everything shipped to production.
                </p>
                <div className="pt-2 flex justify-center">
                  <BevelButton
                    onClick={() => setTrashAlertOpen(false)}
                    variant="inverted"
                    size="sm"
                  >
                    [ OK ]
                  </BevelButton>
                </div>
              </div>
            </Window>
          </div>
        </div>
      )}
    </>
  );
}
