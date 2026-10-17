"use client";

import React, { useState } from "react";
import Link from "next/link";
import PixelSprite from "./PixelSprite";
import BevelButton from "./BevelButton";
import Window from "./Window";
import {
  floppyDiskSprite,
  folderSprite,
  documentSprite,
  trashSprites,
} from "@/data/sprites";

interface DesktopItem {
  id: string;
  label: string;
  sprite: React.ReactNode;
  href?: string;
  download?: string;
  isAction?: boolean;
}

export default function DesktopIcons() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [trashAlertOpen, setTrashAlertOpen] = useState<boolean>(false);
  const [trashShaking, setTrashShaking] = useState<boolean>(false);

  const items: DesktopItem[] = [
    {
      id: "mac-hd",
      label: "Macintosh HD",
      sprite: <PixelSprite sprite={floppyDiskSprite} scale={2} />,
      href: "/about",
    },
    {
      id: "projects",
      label: "Projects",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      href: "/projects",
    },
    {
      id: "experience",
      label: "Experience",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      href: "/experience",
    },
    {
      id: "about",
      label: "About",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      href: "/about",
    },
    {
      id: "skills",
      label: "Skills",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      href: "/skills",
    },
    {
      id: "contact",
      label: "Contact",
      sprite: <PixelSprite sprite={folderSprite} scale={2} />,
      href: "/contact",
    },
    {
      id: "resume",
      label: "Resume.pdf",
      sprite: <PixelSprite sprite={documentSprite} scale={2} />,
      href: "/resume.pdf",
      download: "Raghvender_Tyagi_Resume.pdf",
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
      isAction: true,
    },
  ];

  const handleTrashClick = () => {
    setSelectedId("trash");
    setTrashShaking(true);
    setTimeout(() => {
      setTrashShaking(false);
      setTrashAlertOpen(true);
    }, 200);
  };

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
        className="hidden min-[1200px]:flex fixed right-4 top-12 flex-col items-center gap-3.5 z-30 select-none max-h-[calc(100vh-3.5rem)] overflow-y-auto py-2"
      >
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const isShaking = item.id === "trash" && trashShaking;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={handleTrashClick}
                onFocus={() => setSelectedId(item.id)}
                aria-label={`${item.label} desktop shortcut`}
                className={`flex flex-col items-center gap-1 p-1 rounded cursor-pointer group focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black bg-transparent border-none ${
                  isShaking ? "animate-trash-shake" : ""
                }`}
              >
                <div className="p-0.5 border border-transparent group-hover:border-black/30">
                  {item.sprite}
                </div>
                <span
                  className={`font-pixel text-[10px] tracking-wider text-center max-w-[80px] leading-tight select-none uppercase transition-colors duration-75 ${
                    isSelected
                      ? "bg-black text-white px-1.5 py-0.5"
                      : "text-black bg-[#D9D9D9]/90 px-1 py-0.2 group-hover:bg-black group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              download={item.download}
              onClick={() => setSelectedId(item.id)}
              onFocus={() => setSelectedId(item.id)}
              aria-label={`${item.label} folder - opens in new page`}
              title={`Click to open ${item.label} in new page`}
              className="flex flex-col items-center gap-1 p-1 rounded cursor-pointer group focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black"
            >
              <div className="p-0.5 border border-transparent group-hover:border-black/30">
                {item.sprite}
              </div>
              <span
                className={`font-pixel text-[10px] tracking-wider text-center max-w-[80px] leading-tight select-none uppercase transition-colors duration-75 ${
                  isSelected
                    ? "bg-black text-white px-1.5 py-0.5"
                    : "text-black bg-[#D9D9D9]/90 px-1 py-0.2 group-hover:bg-black group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
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
