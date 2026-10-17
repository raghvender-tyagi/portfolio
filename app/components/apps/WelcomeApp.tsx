"use client";

import React from "react";
import Link from "next/link";
import BevelButton from "../BevelButton";
import RetroMacIllustration from "../RetroMacIllustration";
import { portfolioContent } from "@/data/content";
import { useWindowStore } from "@/lib/os/windowStore";

export default function WelcomeApp() {
  const { hero } = portfolioContent;
  const { openWindow } = useWindowStore();

  return (
    <div className="p-4 md:p-6 text-black font-mono select-text space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Greeting & Actions */}
        <div className="md:col-span-7 flex flex-col space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] font-pixel uppercase tracking-widest text-black/70">
            <span className="w-2 h-2 bg-black inline-block" />
            <span>RT-OS 1.0 : SYSTEM FOLDER : WELCOME</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.08] tracking-tight">
            {hero.greeting}
          </h1>

          <p className="font-mono text-xs sm:text-sm text-black/90 leading-relaxed">
            {hero.subline}
          </p>

          {/* Quick App Launchers */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <BevelButton
              onClick={() => openWindow("finder", { folder: "projects" })}
              variant="inverted"
              size="sm"
            >
              [ Open Projects ↗ ]
            </BevelButton>

            <BevelButton
              onClick={() => openWindow("pdfViewer")}
              variant="default"
              size="sm"
            >
              [ View Resume ↓ ]
            </BevelButton>

            <BevelButton
              onClick={() => openWindow("terminal")}
              variant="default"
              size="sm"
            >
              [ Terminal CLI &gt;_ ]
            </BevelButton>

            <Link
              href="/classic"
              className="inline-flex items-center justify-center font-pixel text-xs font-bold uppercase tracking-wider border-2 border-black bg-[#D9D9D9] hover:bg-black hover:text-white px-2.5 py-1 mac-shadow-sm transition-transform active:translate-x-[2px] active:translate-y-[2px]"
            >
              Classic View ↗
            </Link>
          </div>

          {/* Verified Status Banner */}
          <div className="pt-2 border-t-2 border-black/15 flex items-center gap-2 text-xs font-mono text-black/80">
            <span className="w-2 h-2 bg-black animate-pulse" />
            <span>{hero.statusLine}</span>
          </div>
        </div>

        {/* Right Column: Interactive Mac Illustration */}
        <div className="md:col-span-5 flex items-center justify-center pt-2 md:pt-0">
          <RetroMacIllustration className="w-full max-w-[260px] sm:max-w-[290px]" />
        </div>
      </div>
    </div>
  );
}
