"use client";

import React, { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabbedDialogProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export default function TabbedDialog({
  tabs,
  defaultTabId,
  className = "",
}: TabbedDialogProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className={`flex flex-col w-full h-full p-2 bg-[#C0C0C0] text-black select-none ${className}`}>
      {/* Tabs Header */}
      <div
        role="tablist"
        aria-label="Dialog tabs"
        className="flex items-end gap-1 px-1 -mb-[2px] z-10"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3 py-1 font-pixel text-[11px] font-bold tracking-wide outline-none transition-none ${
                isActive
                  ? "bg-[#C0C0C0] pt-1.5 pb-2 -mb-[2px] border-t-2 border-l-2 border-r-2 border-t-white border-l-white border-r-[#808080] text-black shadow-[-1px_0_0_#fff,1px_0_0_#000]"
                  : "bg-[#B0B0B0] hover:bg-[#B8B8B8] border-t border-l border-r border-t-white border-l-white border-r-[#808080] text-black/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel (Sunken or Raised Bevel) */}
      <div
        role="tabpanel"
        className="flex-1 p-3 bg-[#C0C0C0] bevel-out overflow-y-auto"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}

