"use client";

import React, { useState } from "react";
import BevelButton from "../BevelButton";
import { portfolioContent } from "@/data/content";

interface ServiceItem {
  id: string;
  name: string;
  url: string;
  type: string;
}

export default function ChooserApp() {
  const { contact } = portfolioContent;

  const services: ServiceItem[] = [
    {
      id: "github",
      name: "GitHub Repository Archives",
      url: contact.socials.find((s) => s.label === "GitHub")?.href || "https://github.com/raghvender-tyagi",
      type: "Code Repositories",
    },
    {
      id: "linkedin",
      name: "LinkedIn Professional Network",
      url: contact.socials.find((s) => s.label === "LinkedIn")?.href || "https://linkedin.com/in/raghvender-tyagi-05a881247",
      type: "Career Network",
    },
    {
      id: "leetcode",
      name: "LeetCode Competitive Algorithms",
      url: contact.socials.find((s) => s.label === "LeetCode")?.href || "https://leetcode.com/u/RaghvenderTyagi450/",
      type: "Algorithms & DSA",
    },
    {
      id: "email",
      name: `Direct SMTP Dispatch (${contact.email})`,
      url: `mailto:${contact.email}`,
      type: "Electronic Mail",
    },
  ];

  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);

  const handleConnect = () => {
    if (selectedService) {
      window.open(selectedService.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="p-4 bg-white text-black font-mono text-xs flex flex-col h-full justify-between select-none space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <span className="font-pixel text-[10px] font-bold uppercase text-black/70">
            CONNECT TO EXTERNAL SYSTEMS
          </span>
          <span className="font-pixel text-[9px] bg-black text-white px-1.5 py-0.2">
            CHOOSER 7.1
          </span>
        </div>

        {/* Services List Table */}
        <div className="border-2 border-black bg-white overflow-hidden">
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
                className={`p-2 flex items-center justify-between border-b border-black/15 cursor-pointer text-xs ${
                  isSelected ? "bg-black text-white font-bold" : "hover:bg-neutral-100"
                }`}
              >
                <span>{svc.name}</span>
                <span className={`text-[10px] ${isSelected ? "text-neutral-300" : "text-black/60"}`}>
                  {svc.type}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected target preview and OK button */}
      <div className="pt-2 border-t-2 border-black flex items-center justify-between">
        <div className="truncate max-w-[260px] text-[10px] text-black/70">
          Target: {selectedService.url}
        </div>
        <div className="flex items-center gap-2">
          <BevelButton onClick={handleConnect} variant="inverted" size="sm">
            [ Connect ↗ ]
          </BevelButton>
        </div>
      </div>
    </div>
  );
}
