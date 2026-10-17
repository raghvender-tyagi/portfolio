"use client";

import React from "react";
import Link from "next/link";
import PixelSprite from "../PixelSprite";
import { dialogInfo32 } from "@/data/sprites";

export default function HelpApp() {
  return (
    <div className="p-4 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between h-full select-text space-y-4">
      <div className="space-y-4">
        {/* Banner */}
        <div className="bevel-in bg-white p-3 flex items-start gap-3">
          <div className="shrink-0 pt-0.5">
            <PixelSprite sprite={dialogInfo32} scale={1} />
          </div>
          <div>
            <h2 className="font-pixel text-xs font-bold text-[#000080]">
              RT-OS 95 Help &amp; Support Index
            </h2>
            <p className="text-xs text-neutral-800 leading-relaxed font-mono mt-1">
              Welcome to Raghvender Tyagi&apos;s interactive desktop operating system.
              This interface is fully interactive, featuring draggable and resizable windows,
              a functional MS-DOS CLI prompt, and deep-link persistence.
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bevel-in bg-white p-3 space-y-2">
          <span className="font-pixel text-[10px] font-bold text-[#000080] block">
            Keyboard Shortcuts:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-bold">Windows Key / Ctrl+Esc:</span>
              <span className="block text-neutral-600">Toggle Start Menu</span>
            </div>
            <div>
              <span className="font-bold">Ctrl+K:</span>
              <span className="block text-neutral-600">Open Find: All Files</span>
            </div>
            <div>
              <span className="font-bold">Alt+F4:</span>
              <span className="block text-neutral-600">Close active window</span>
            </div>
            <div>
              <span className="font-bold">Tab (in MS-DOS):</span>
              <span className="block text-neutral-600">Autocomplete commands</span>
            </div>
          </div>
        </div>

        {/* Recruiter Notice */}
        <div className="bevel-out bg-[#DFDFDF] p-3 space-y-2">
          <span className="font-pixel text-[10px] font-bold text-black block">
            Recruiter &amp; Accessible Mode
          </span>
          <p className="text-xs text-neutral-800 leading-relaxed font-mono">
            Looking for a traditional, single-page scrollable portfolio view for fast skimming or printing?
            Visit the Classic Recruiter mode:
          </p>
          <div className="pt-1">
            <Link
              href="/classic"
              className="win95-btn px-4 py-1.5 font-pixel text-[10px] font-bold"
            >
              Switch to Classic View ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#808080] flex items-center justify-between text-[10px] text-neutral-600">
        <span>RT-OS 95 Support Assistant</span>
        <span>Version 4.00.950</span>
      </div>
    </div>
  );
}

