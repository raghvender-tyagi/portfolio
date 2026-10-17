"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { useWindowStore } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import {
  winFolder32,
  winDoc32,
  msDos32,
  controlPanel32,
  acrobat32,
  winPaint32,
  winCalc32,
  bugSmileySprites,
  dialogInfo32,
  myComputer32,
  projectSpritesMap,
} from "@/data/sprites";
import { portfolioContent } from "@/data/content";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openWindow, setShutDown, soundEnabled } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState<string | null>(
    null
  );
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setActiveSubmenu(null);
    setActiveNestedSubmenu(null);
    onClose();
  }, [onClose]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#start-button")
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmenuHover = (menuKey: string | null) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(menuKey);
      setActiveNestedSubmenu(null);
    }, 120);
  };

  const handleNestedHover = (nestedKey: string | null) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveNestedSubmenu(nestedKey);
    }, 120);
  };

  const handleLaunch = (appId: string, props?: Record<string, unknown>) => {
    soundManager.playWindowOpen(soundEnabled);
    openWindow(appId, props);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Start Menu"
      className="fixed bottom-[38px] left-[2px] z-[110] bg-[#C0C0C0] bevel-out p-1 flex select-none shadow-[4px_4px_0_rgba(0,0,0,0.4)]"
      style={{ width: "230px" }}
    >
      {/* Left Vertical Banner (Rotated text: RT-OS 95) */}
      <div
        className="w-7 shrink-0 flex items-end justify-center pb-2 select-none"
        style={{
          background: "linear-gradient(180deg, #1084D0 0%, #000080 100%)",
        }}
      >
        <span
          className="font-pixel text-[13px] font-bold text-white tracking-widest uppercase origin-bottom-left -rotate-90 whitespace-nowrap block translate-x-4 -translate-y-2 text-shadow-[1px_1px_0_#000]"
        >
          RT-OS 95
        </span>
      </div>

      {/* Main Start Menu Items */}
      <div className="flex-1 py-1 pl-1 flex flex-col justify-between">
        <div className="space-y-0.5">
          {/* Programs */}
          <div
            className="relative"
            onMouseEnter={() => handleSubmenuHover("programs")}
          >
            <button
              type="button"
              className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                activeSubmenu === "programs"
                  ? "bg-[#000080] text-white"
                  : "text-black hover:bg-[#000080] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PixelSprite sprite={winFolder32} scale={0.7} />
                <span className="font-bold underline decoration-1">P</span>rograms
              </div>
              <span className="font-mono text-xs">►</span>
            </button>

            {/* Programs Submenu */}
            {activeSubmenu === "programs" && (
              <div
                role="menu"
                className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-56 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[120] space-y-0.5"
              >
                {/* Projects cascading */}
                <div
                  className="relative"
                  onMouseEnter={() => handleNestedHover("projects")}
                >
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                      activeNestedSubmenu === "projects"
                        ? "bg-[#000080] text-white"
                        : "text-black hover:bg-[#000080] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PixelSprite sprite={winFolder32} scale={0.6} />
                      <span>Projects</span>
                    </div>
                    <span className="font-mono text-xs">►</span>
                  </button>

                  {/* Nested Projects List */}
                  {activeNestedSubmenu === "projects" && (
                    <div className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-64 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[130] space-y-0.5">
                      {portfolioContent.projects.map((prj) => (
                        <button
                          key={prj.id}
                          type="button"
                          onClick={() =>
                            handleLaunch("projectDetail", { slug: prj.slug, title: prj.title })
                          }
                          className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-left text-black hover:bg-[#000080] hover:text-white"
                        >
                          <PixelSprite
                            sprite={projectSpritesMap[prj.slug] || winDoc32}
                            scale={0.5}
                          />
                          <span className="truncate">{prj.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience */}
                <button
                  type="button"
                  onClick={() =>
                    handleLaunch("simpleText", { file: "experience.txt" })
                  }
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={winDoc32} scale={0.6} />
                  <span>Experience.txt</span>
                </button>

                {/* Skills */}
                <button
                  type="button"
                  onClick={() => handleLaunch("aboutMac", { tab: "skills" })}
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={myComputer32} scale={0.6} />
                  <span>Skills & Hardware</span>
                </button>

                {/* Achievements */}
                <button
                  type="button"
                  onClick={() =>
                    handleLaunch("finder", { folder: "achievements" })
                  }
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={winFolder32} scale={0.6} />
                  <span>Achievements</span>
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-[#808080] border-b border-b-white" />

                {/* Accessories cascading */}
                <div
                  className="relative"
                  onMouseEnter={() => handleNestedHover("accessories")}
                >
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                      activeNestedSubmenu === "accessories"
                        ? "bg-[#000080] text-white"
                        : "text-black hover:bg-[#000080] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PixelSprite sprite={winFolder32} scale={0.6} />
                      <span>Accessories</span>
                    </div>
                    <span className="font-mono text-xs">►</span>
                  </button>

                  {/* Nested Accessories */}
                  {activeNestedSubmenu === "accessories" && (
                    <div className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-52 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[130] space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleLaunch("terminal")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={msDos32} scale={0.5} />
                        <span>MS-DOS Prompt</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLaunch("simpleText")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={winDoc32} scale={0.5} />
                        <span>Notepad</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLaunch("paint")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={winPaint32} scale={0.5} />
                        <span>Paint</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLaunch("calc")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={winCalc32} scale={0.5} />
                        <span>Calculator</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Games cascading */}
                <div
                  className="relative"
                  onMouseEnter={() => handleNestedHover("games")}
                >
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                      activeNestedSubmenu === "games"
                        ? "bg-[#000080] text-white"
                        : "text-black hover:bg-[#000080] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PixelSprite sprite={winFolder32} scale={0.6} />
                      <span>Games</span>
                    </div>
                    <span className="font-mono text-xs">►</span>
                  </button>

                  {/* Nested Games */}
                  {activeNestedSubmenu === "games" && (
                    <div className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-48 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[130] space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleLaunch("snake")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={bugSmileySprites.normal} scale={1} />
                        <span>Snake</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLaunch("bugSweeper")}
                        className="w-full flex items-center gap-2 px-2 py-1 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                      >
                        <PixelSprite sprite={bugSmileySprites.cool} scale={1} />
                        <span>Bug Sweeper</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Documents */}
          <div
            className="relative"
            onMouseEnter={() => handleSubmenuHover("documents")}
          >
            <button
              type="button"
              className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                activeSubmenu === "documents"
                  ? "bg-[#000080] text-white"
                  : "text-black hover:bg-[#000080] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PixelSprite sprite={winDoc32} scale={0.7} />
                <span className="font-bold underline decoration-1">D</span>ocuments
              </div>
              <span className="font-mono text-xs">►</span>
            </button>

            {activeSubmenu === "documents" && (
              <div className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-52 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[120] space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleLaunch("pdfViewer")}
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={acrobat32} scale={0.5} />
                  <span>Resume.pdf</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunch("simpleText", { file: "about.txt" })}
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={winDoc32} scale={0.5} />
                  <span>About.txt</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLaunch("simpleText", { file: "experience.txt" })
                  }
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={winDoc32} scale={0.5} />
                  <span>Experience.txt</span>
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div
            className="relative"
            onMouseEnter={() => handleSubmenuHover("settings")}
          >
            <button
              type="button"
              className={`w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left ${
                activeSubmenu === "settings"
                  ? "bg-[#000080] text-white"
                  : "text-black hover:bg-[#000080] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PixelSprite sprite={controlPanel32} scale={0.7} />
                <span className="font-bold underline decoration-1">S</span>ettings
              </div>
              <span className="font-mono text-xs">►</span>
            </button>

            {activeSubmenu === "settings" && (
              <div className="absolute left-[98%] top-0 bg-[#C0C0C0] bevel-out p-1 w-52 shadow-[4px_4px_0_rgba(0,0,0,0.4)] z-[120] space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleLaunch("controlPanel")}
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={controlPanel32} scale={0.5} />
                  <span>Control Panel</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunch("dateTimeProperties")}
                  className="w-full flex items-center gap-2 px-2 py-1.5 font-pixel text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <PixelSprite sprite={controlPanel32} scale={0.5} />
                  <span>Taskbar and Clock...</span>
                </button>
              </div>
            )}
          </div>

          {/* Find */}
          <button
            type="button"
            onClick={() => handleLaunch("findFiles")}
            onMouseEnter={() => handleSubmenuHover(null)}
            className="w-full flex items-center justify-between px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
          >
            <div className="flex items-center gap-2.5">
              <PixelSprite sprite={winFolder32} scale={0.7} />
              <span className="font-bold underline decoration-1">F</span>ind...
            </div>
            <span className="font-mono text-[9px] opacity-75">Ctrl+K</span>
          </button>

          {/* Help */}
          <button
            type="button"
            onClick={() => handleLaunch("help")}
            onMouseEnter={() => handleSubmenuHover(null)}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
          >
            <PixelSprite sprite={dialogInfo32} scale={0.6} />
            <span className="font-bold underline decoration-1">H</span>elp
          </button>

          {/* Run... */}
          <button
            type="button"
            onClick={() => handleLaunch("runDialog")}
            onMouseEnter={() => handleSubmenuHover(null)}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white"
          >
            <PixelSprite sprite={msDos32} scale={0.6} />
            <span className="font-bold underline decoration-1">R</span>un...
          </button>
        </div>

        {/* Bottom Section: Divider + Shut Down */}
        <div className="pt-2">
          <div className="my-1 border-t border-[#808080] border-b border-b-white" />
          <button
            type="button"
            onClick={() => {
              setShutDown(true);
              onClose();
            }}
            onMouseEnter={() => handleSubmenuHover(null)}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 font-pixel text-[11px] text-left text-black hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <PixelSprite sprite={dialogInfo32} scale={0.6} />
            <span className="font-bold underline decoration-1">S</span>hut Down...
          </button>
        </div>
      </div>
    </div>
  );
}
