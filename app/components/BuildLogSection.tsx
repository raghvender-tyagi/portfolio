"use client";

import React, { useState } from "react";
import Window from "./Window";
import BevelButton from "./BevelButton";
import { portfolioContent, BuildLogEntry } from "@/data/content";

export default function BuildLogSection() {
  const { buildLog } = portfolioContent;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="w-full space-y-4">
      {/* Container Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
            Engineering Build Log
          </h2>
          <p className="font-mono text-xs text-black/75">
            Click any note to bring window to front • Deep-dives from production systems.
          </p>
        </div>
        <span className="font-pixel text-[10px] bg-black text-white px-2 py-1 select-none">
          STACK: 3 NOTES
        </span>
      </div>

      {/* Stacked Window Switcher Tabs (System 7 Finder Toolbar) */}
      <div className="flex flex-wrap items-center gap-2 select-none">
        {buildLog.map((entry: BuildLogEntry, idx: number) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={entry.filename}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`font-pixel text-xs px-3 py-1.5 border-2 border-black transition-colors duration-75 cursor-pointer uppercase tracking-wider ${
                isActive
                  ? "bg-black text-white mac-shadow-pressed"
                  : "bg-[#D9D9D9] text-black hover:bg-[#BFBFBF] mac-shadow-sm active:translate-x-[2px] active:translate-y-[2px]"
              }`}
            >
              📄 {entry.filename}
            </button>
          );
        })}
      </div>

      {/* Overlapping Stacked Window Stage */}
      <div className="relative pt-4 pb-2">
        {buildLog.map((entry: BuildLogEntry, idx: number) => {
          const isActive = activeIndex === idx;
          // Calculate offset for stacked appearance
          const offsetStyle = isActive
            ? "relative z-30 translate-x-0 translate-y-0"
            : idx === 1
            ? "relative z-20 md:translate-x-3 md:-translate-y-2 opacity-90"
            : "relative z-10 md:translate-x-6 md:-translate-y-4 opacity-80";

          // If not active on small screens, render standard flow; on desktop, give stacked feel
          if (!isActive && typeof window !== "undefined" && window.innerWidth < 768) {
            return null; // On mobile, show only active window to prevent cramped layout
          }

          if (!isActive) return null; // Clean single active pane on mobile/responsive while toolbar switches tabs

          return (
            <Window
              key={entry.filename}
              title={entry.filename}
              status={`TAG: ${entry.tag} • READ: ${entry.readTime} • DATE: ${entry.date}`}
              collapsible={false}
              className={`${offsetStyle} transition-all duration-150`}
            >
              <div className="space-y-4">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] bg-black text-white px-1.5 py-0.5">
                      {entry.tag}
                    </span>
                    <span className="font-mono text-xs text-black/70">
                      {entry.date} • {entry.readTime} READ
                    </span>
                  </div>
                  <span className="font-mono text-xs text-black/60">
                    MARKDOWN / RAW VIEW
                  </span>
                </div>

                {/* Note Title */}
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black leading-tight">
                  {entry.title}
                </h3>

                {/* Note Summary */}
                <p className="font-mono text-xs sm:text-sm text-black/90 leading-relaxed border-l-2 border-black pl-3 py-1 bg-[#D9D9D9]/40">
                  {entry.summary}
                </p>

                {/* Footnote and Bevel Action */}
                <div className="flex items-center justify-between pt-2 border-t border-black/15">
                  <span className="font-pixel text-[10px] uppercase text-black/60">
                    STATUS: PUBLISHED IN PRODUCTION REPO
                  </span>
                  <BevelButton
                    href="https://github.com/raghvender-tyagi"
                    variant="default"
                    size="sm"
                  >
                    Inspect System Source ↗
                  </BevelButton>
                </div>
              </div>
            </Window>
          );
        })}
      </div>
    </section>
  );
}
