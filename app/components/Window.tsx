"use client";

import React, { useState } from "react";

interface WindowProps {
  title: string;
  status?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  id?: string;
}

export default function Window({
  title,
  status,
  collapsible = true,
  defaultCollapsed = false,
  className = "",
  children,
  headerRight,
  id,
}: WindowProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div
      id={id}
      className={`border-2 border-black bg-white mac-shadow text-black transition-all duration-150 ${className}`}
    >
      {/* Title Bar (28px height, System 7 chrome) */}
      <div className="relative h-7 bg-[#BFBFBF] border-b-2 border-black flex items-center justify-between px-2 select-none overflow-hidden">
        {/* Background horizontal stripes (System 7 active window lines) */}
        <div className="absolute inset-y-1 left-9 right-9 mac-titlebar-stripes pointer-events-none opacity-80" />

        {/* Left: Window control buttons */}
        <div className="flex items-center gap-1.5 z-10 bg-[#BFBFBF] pr-1.5">
          <button
            type="button"
            disabled={!collapsible}
            onClick={() => collapsible && setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand window" : "Collapse window"}
            title={collapsible ? (isCollapsed ? "Expand" : "Collapse") : undefined}
            className={`w-3 h-3 rounded-full border-2 border-black bg-white flex items-center justify-center transition-transform ${
              collapsible
                ? "hover:bg-black hover:text-white cursor-pointer active:scale-90"
                : "cursor-default"
            }`}
          >
            {collapsible && (
              <span className="text-[8px] leading-none font-bold block -mt-[1px]">
                {isCollapsed ? "+" : "−"}
              </span>
            )}
          </button>
          <div
            aria-hidden="true"
            className="w-3 h-3 rounded-full border-2 border-black bg-white"
          />
        </div>

        {/* Centered Filename Title */}
        <div className="z-10 bg-[#BFBFBF] px-2 text-center max-w-[65%] truncate">
          <span className="font-pixel text-[11px] font-bold tracking-wider text-black uppercase">
            {title}
          </span>
        </div>

        {/* Right side controls or slot */}
        <div className="flex items-center gap-2 z-10 bg-[#BFBFBF] pl-1.5">
          {headerRight ? (
            headerRight
          ) : (
            <div
              aria-hidden="true"
              className="w-3 h-3 border-2 border-black bg-white flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-black" />
            </div>
          )}
        </div>
      </div>

      {/* Window Body (collapsible) */}
      {!isCollapsed && (
        <div className="p-4 md:p-6 text-black font-mono text-sm leading-relaxed">
          {children}
        </div>
      )}

      {/* Window Footer / Status Bar */}
      {!isCollapsed && status && (
        <div className="border-t-2 border-black bg-[#D9D9D9] px-3 py-1 text-[11px] font-mono flex items-center justify-between text-black select-none">
          <span className="truncate">{status}</span>
          <span className="font-pixel text-[9px] uppercase tracking-wider text-black/70 ml-2">
            SYS7
          </span>
        </div>
      )}
    </div>
  );
}

