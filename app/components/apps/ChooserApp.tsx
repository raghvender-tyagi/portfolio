"use client";

import React, { useState } from "react";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { networkNeighborhood32, myComputer32 } from "@/data/sprites";

interface ServiceItem {
  id: string;
  name: string;
  url: string;
  type: string;
  comment: string;
}

export default function ChooserApp() {
  const { contact } = portfolioContent;

  const services: ServiceItem[] = [
    {
      id: "github",
      name: "\\\\GITHUB\\raghvender-tyagi",
      url: contact.socials.find((s) => s.label === "GitHub")?.href || "https://github.com/raghvender-tyagi",
      type: "Git Repository Server",
      comment: "Open source AI agents & distributed compute repos",
    },
    {
      id: "linkedin",
      name: "\\\\LINKEDIN\\raghvender-tyagi",
      url: contact.socials.find((s) => s.label === "LinkedIn")?.href || "https://linkedin.com/in/raghvender-tyagi-05a881247",
      type: "Professional Network Host",
      comment: "Industry updates, patents, and engineering background",
    },
    {
      id: "leetcode",
      name: "\\\\LEETCODE\\RaghvenderTyagi450",
      url: contact.socials.find((s) => s.label === "LeetCode")?.href || "https://leetcode.com/u/RaghvenderTyagi450/",
      type: "Algorithms Host",
      comment: "450+ solved algorithmic problems in Java & Python",
    },
    {
      id: "email",
      name: "\\\\SMTP\\raghvendertyagi",
      url: `mailto:${contact.email}`,
      type: "Mail Server",
      comment: `Direct contact gateway (${contact.email})`,
    },
  ];

  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);

  const handleConnect = () => {
    if (selectedService) {
      window.open(selectedService.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="p-3 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col h-full justify-between select-none space-y-3">
      {/* Header Info */}
      <div className="flex items-center gap-3 p-2 bg-[#C0C0C0] border-b border-[#808080]">
        <PixelSprite sprite={networkNeighborhood32} scale={1} />
        <div>
          <div className="font-pixel text-[11px] font-bold text-black">
            Entire Network &amp; Remote Workstations
          </div>
          <div className="text-[11px] text-neutral-700 font-mono">
            Double-click a server to connect via browser.
          </div>
        </div>
      </div>

      {/* Network Server List */}
      <div className="flex-1 bevel-in bg-white p-2 overflow-y-auto space-y-1">
        {services.map((svc) => {
          const isSelected = selectedService.id === svc.id;
          return (
            <div
              key={svc.id}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedService(svc)}
              onDoubleClick={handleConnect}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleConnect();
                }
              }}
              className={`p-2 flex items-center justify-between cursor-pointer text-xs ${
                isSelected
                  ? "bg-[#000080] text-white dotted-focus"
                  : "hover:bg-neutral-100 text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <PixelSprite sprite={myComputer32} scale={0.5} />
                <span className="font-bold font-pixel text-[10px]">{svc.name}</span>
              </div>
              <div className="text-right">
                <span className={`text-[10px] block ${isSelected ? "text-neutral-200" : "text-neutral-600"}`}>
                  {svc.type}
                </span>
                <span className={`text-[9px] block ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                  {svc.comment}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#808080] flex items-center justify-between">
        <div className="text-[10px] text-neutral-700 truncate max-w-[240px]">
          Target: {selectedService.url}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleConnect}
            className="win95-btn px-4 py-1 font-bold font-pixel text-[10px]"
          >
            Connect ↗
          </button>
        </div>
      </div>
    </div>
  );
}
