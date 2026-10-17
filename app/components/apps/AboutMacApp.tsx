"use client";

import React, { useState } from "react";
import PixelSprite from "../PixelSprite";
import BevelButton from "../BevelButton";
import { portfolioContent } from "@/data/content";
import { robotFaceSprites } from "@/data/sprites";

export default function AboutMacApp({ tab }: { tab?: string }) {
  const [activeView, setActiveView] = useState<"hardware" | "fullSkills">(
    tab === "skills" ? "fullSkills" : "hardware"
  );

  const { skills, meta } = portfolioContent;

  // Extract from content.ts
  const langGroup = skills.groups.find((g) => g.group === "Languages")?.items.join(" • ") || "Python • Java • SQL";
  const genaiGroup = skills.groups.find((g) => g.group === "GenAI & Agents")?.items.join(" • ") || "LangGraph • LangChain • RAG • MCP";
  const backendGroup = skills.groups.find((g) => g.group === "Backend")?.items.join(" • ") || "Django • FastAPI • PostgreSQL • Redis";
  const distGroup = skills.groups.find((g) => g.group === "Distributed Systems")?.items.join(" • ") || "Docker (cgroups) • Channels • Celery";
  const csGroup = skills.groups.find((g) => g.group === "CS Fundamentals")?.items.join(" • ") || "DSA • OOP • OS • DBMS • Networks";

  return (
    <div className="p-4 md:p-6 bg-white text-black font-mono space-y-4 select-text">
      {activeView === "hardware" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Pixel Computer Art */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-2 border-2 border-black bg-[#D9D9D9]">
              <PixelSprite sprite={robotFaceSprites.happy} scale={4} />
              <span className="font-pixel text-[10px] uppercase font-bold tracking-wider mt-2">
                RT-OS 1.0
              </span>
              <span className="text-[9px] text-black/60 font-mono">
                System 7.1 ROM
              </span>
            </div>

            {/* Right: Hardware Specification Table */}
            <div className="md:col-span-8 space-y-2">
              <h2 className="font-heading font-extrabold text-xl text-black">
                {meta.name}
              </h2>
              <p className="font-mono text-xs text-black/80 pb-2 border-b-2 border-black">
                {meta.role} • {meta.location}
              </p>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-black">Processor:</span>
                  <span className="col-span-2 text-black/90">{langGroup}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-black">Memory:</span>
                  <span className="col-span-2 text-black/90">{genaiGroup}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-black">Storage / DB:</span>
                  <span className="col-span-2 text-black/90">{backendGroup}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-black">Network / P2P:</span>
                  <span className="col-span-2 text-black/90">{distGroup}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-black">System ROM:</span>
                  <span className="col-span-2 text-black/90">{csGroup}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-black">
            <span className="font-pixel text-[10px] text-black/70 uppercase">
              B.Tech CSE (AI), KIET &apos;27 • CGPA: 7.6
            </span>
            <BevelButton
              onClick={() => setActiveView("fullSkills")}
              variant="default"
              size="sm"
            >
              More Info...
            </BevelButton>
          </div>
        </div>
      ) : (
        /* Full Grouped Skills View */
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h3 className="font-heading font-bold text-lg text-black">
              Full Stack &amp; Capabilities Breakdown
            </h3>
            <BevelButton
              onClick={() => setActiveView("hardware")}
              variant="default"
              size="sm"
            >
              ← System Specs
            </BevelButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.groups.map((group) => (
              <div
                key={group.group}
                className="border-2 border-black bg-[#D9D9D9] p-3 space-y-2"
              >
                <div className="flex items-center justify-between border-b border-black pb-1">
                  <span className="font-pixel text-xs font-bold uppercase text-black">
                    {group.group}
                  </span>
                  <span className="font-mono text-[9px] bg-black text-white px-1">
                    {group.items.length} PKGS
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border border-black bg-white text-black font-mono text-xs px-1.5 py-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
