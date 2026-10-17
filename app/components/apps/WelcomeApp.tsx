"use client";

import React from "react";
import Link from "next/link";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { useWindowStore } from "@/lib/os/windowStore";
import {
  myComputer32,
  rtStartLogo16,
  winFolder32,
  acrobat32,
  msDos32,
} from "@/data/sprites";

export default function WelcomeApp() {
  const { hero } = portfolioContent;
  const { openWindow } = useWindowStore();

  return (
    <div className="p-4 md:p-6 bg-[#C0C0C0] text-black font-mono select-text h-full flex flex-col justify-between">
      {/* Top Banner: Welcome Header */}
      <div className="space-y-4">
        {/* Yellow/White Tip of the Day Banner */}
        <div className="bg-[#FFFFE1] bevel-in p-3 border border-[#808080] flex items-start gap-3">
          <div className="shrink-0 pt-0.5">
            <PixelSprite sprite={myComputer32} scale={1} />
          </div>
          <div className="space-y-1">
            <div className="font-pixel text-[11px] font-bold text-[#000080] uppercase tracking-wide flex items-center gap-1.5">
              <PixelSprite sprite={rtStartLogo16} scale={0.8} />
              <span>Welcome to RT-OS 95</span>
            </div>
            <p className="text-xs text-black/90 font-mono leading-relaxed">
              {hero.subline}
            </p>
          </div>
        </div>

        {/* Headline & Role */}
        <div className="space-y-2 pt-2">
          <h1 className="font-pixel font-bold text-xl sm:text-2xl text-[#000080] leading-tight">
            {hero.greeting}
          </h1>
          <p className="font-mono text-xs text-black/80 leading-relaxed max-w-xl">
            Distributed backend and agentic AI systems engineer building multi-agent
            architectures with LangGraph, Docker sandboxes, and secure Text-to-SQL.
          </p>
        </div>

        {/* Quick App Launchers */}
        <div className="pt-2">
          <div className="font-pixel text-[10px] font-bold uppercase text-[#000080] mb-2 tracking-wide">
            What would you like to do?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
            <button
              type="button"
              onClick={() => openWindow("finder", { folder: "projects" })}
              className="win95-btn flex items-center gap-2 px-3 py-2 text-left"
            >
              <PixelSprite sprite={winFolder32} scale={0.6} />
              <div className="truncate">
                <span className="font-bold block">Browse Projects</span>
                <span className="text-[9px] text-neutral-600 font-mono block">TakeMyCompute, Paperly AI...</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openWindow("pdfViewer")}
              className="win95-btn flex items-center gap-2 px-3 py-2 text-left"
            >
              <PixelSprite sprite={acrobat32} scale={0.6} />
              <div className="truncate">
                <span className="font-bold block">View Resume (PDF)</span>
                <span className="text-[9px] text-neutral-600 font-mono block">Experience & Education</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openWindow("terminal")}
              className="win95-btn flex items-center gap-2 px-3 py-2 text-left"
            >
              <PixelSprite sprite={msDos32} scale={0.6} />
              <div className="truncate">
                <span className="font-bold block">MS-DOS Prompt</span>
                <span className="text-[9px] text-neutral-600 font-mono block">CLI commands & tools</span>
              </div>
            </button>

            <Link
              href="/classic"
              className="win95-btn flex items-center gap-2 px-3 py-2 text-left"
            >
              <PixelSprite sprite={myComputer32} scale={0.6} />
              <div className="truncate">
                <span className="font-bold block">Classic Recruiter Mode</span>
                <span className="text-[9px] text-neutral-600 font-mono block">Single-page accessible view</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Panel */}
      <div className="pt-4 mt-4 border-t border-[#808080]">
        <div className="bevel-in bg-[#DFDFDF] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-black/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#008000] inline-block" />
            <span>{hero.statusLine}</span>
          </div>
          <span className="font-pixel text-[9px] text-neutral-500">RT-OS 95 4.00.950</span>
        </div>
      </div>
    </div>
  );
}
