import React from "react";
import Window from "./Window";
import { portfolioContent, AchievementItem } from "@/data/content";

function RetroIcon({ type }: { type: AchievementItem["icon"] }) {
  if (type === "trophy") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-black select-none shrink-0"
        aria-hidden="true"
      >
        {/* Pixel Trophy */}
        <path d="M4 4h16v3h-2v3c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V7H4V4zm2 2v1h2V6H6zm10 0v1h2V6h-2zm-6 9v3h4v-3h-4zm-3 5h10v2H7v-2z" />
      </svg>
    );
  }
  if (type === "patent") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-black select-none shrink-0"
        aria-hidden="true"
      >
        {/* Pixel Patent / Document */}
        <path d="M4 2h11l5 5v15H4V2zm10 1v4h4l-4-4zm-8 7v2h12v-2H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z" />
      </svg>
    );
  }
  if (type === "cert") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-black select-none shrink-0"
        aria-hidden="true"
      >
        {/* Pixel Certificate / Badge */}
        <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4l3-3zm0 4a6 6 0 100 12 6 6 0 000-12zm-1 3h2v4h-2V9zm0 5h2v2h-2v-2z" />
      </svg>
    );
  }
  // Folder
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-black select-none shrink-0"
      aria-hidden="true"
    >
      {/* Classic Mac Folder */}
      <path d="M2 4h7l2 2h11v14H2V4zm2 4v10h16V8H4z" />
    </svg>
  );
}

export default function PatentAndAchievementsSection() {
  const { achievements } = portfolioContent;

  return (
    <section className="w-full">
      <Window
        title={achievements.filename}
        status="8 OBJECTS • 0 CORRUPTIONS • FINDER VIEW"
        collapsible={true}
      >
        <div className="space-y-4">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between">
            <span className="font-pixel text-xs font-bold uppercase tracking-wider text-black">
              HONORS, PATENTS &amp; PROFESSIONAL CERTIFICATIONS
            </span>
            <span className="font-pixel text-[10px] text-black/70">
              CLICK TO INSPECT RECORD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.items.map((item) => (
              <div
                key={item.id}
                className="border-2 border-black bg-white hover:bg-[#D9D9D9] p-3 transition-colors duration-75 flex items-start gap-3 mac-shadow-sm"
              >
                <div className="p-1.5 border-2 border-black bg-[#BFBFBF] shrink-0">
                  <RetroIcon type={item.icon} />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-black leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-black/85 leading-tight truncate">
                    {item.event}
                  </p>
                  <p className="font-pixel text-[10px] uppercase tracking-wider text-black/60 truncate">
                    {item.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </section>
  );
}
