"use client";

import React from "react";
import TabbedDialog, { TabItem } from "../os/TabbedDialog";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { myComputer32, controlPanel32 } from "@/data/sprites";

export default function AboutMacApp({ tab }: { tab?: string }) {
  const { skills, meta, about } = portfolioContent;

  const langGroup =
    skills.groups.find((g) => g.group === "Languages")?.items.join(", ") ||
    "Python, Java, SQL";
  const genaiGroup =
    skills.groups.find((g) => g.group === "GenAI & Agents")?.items.join(", ") ||
    "LangGraph, LangChain, RAG, MCP";
  const backendGroup =
    skills.groups.find((g) => g.group === "Backend")?.items.join(", ") ||
    "Django, FastAPI, PostgreSQL, Redis";
  const distGroup =
    skills.groups.find((g) => g.group === "Distributed Systems")?.items.join(", ") ||
    "Docker (cgroups), Channels, Celery";
  const csGroup =
    skills.groups.find((g) => g.group === "CS Fundamentals")?.items.join(", ") ||
    "DSA, OOP, OS, DBMS, Networks";

  const tabs: TabItem[] = [
    {
      id: "general",
      label: "General",
      content: (
        <div className="space-y-4 text-xs font-mono select-text">
          <div className="flex items-start gap-4 p-2">
            <div className="shrink-0 p-1">
              <PixelSprite sprite={myComputer32} scale={1.8} />
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-pixel text-[11px] font-bold block text-black">
                  System:
                </span>
                <span className="text-neutral-800 block">
                  RT-OS 95 4.00.950
                </span>
                <span className="text-neutral-600 block">
                  Build 2026.10
                </span>
              </div>

              <div>
                <span className="font-pixel text-[11px] font-bold block text-black">
                  Registered to:
                </span>
                <span className="text-neutral-900 font-bold block">
                  {meta.name}
                </span>
                <span className="text-neutral-700 block">
                  {meta.role}
                </span>
                <span className="text-neutral-600 block">
                  {about.education.institution}
                </span>
              </div>

              <div>
                <span className="font-pixel text-[11px] font-bold block text-black">
                  Computer:
                </span>
                <span className="text-neutral-800 block">
                  {about.education.degree} ({about.education.period})
                </span>
                <span className="text-neutral-700 block">
                  CGPA: {about.education.cgpa}
                </span>
                <span className="text-neutral-700 block">
                  Location: {meta.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2 border-t border-[#808080] text-neutral-700 text-[11px]">
            Double-click items in Device Manager for driver &amp; stack specs.
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      label: "Device Manager",
      content: (
        <div className="space-y-3 text-xs font-mono select-text">
          <div className="flex items-center gap-2 mb-2 font-pixel text-[10px] text-neutral-800">
            <PixelSprite sprite={controlPanel32} scale={0.5} />
            <span>Hardware Stack &amp; Skill Drivers</span>
          </div>

          <div className="bevel-in bg-white p-3 space-y-2.5 max-h-[280px] overflow-y-auto">
            {skills.groups.map((group) => (
              <div key={group.group} className="space-y-1">
                <div className="flex items-center gap-1.5 font-pixel text-[10px] font-bold text-[#000080]">
                  <span>▸</span>
                  <span>{group.group}</span>
                  <span className="text-neutral-500 font-mono text-[9px] ml-auto">
                    ({group.items.length} modules)
                  </span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-1.5 py-0.5 bg-[#DFDFDF] border border-[#808080] text-black font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "performance",
      label: "Performance",
      content: (
        <div className="space-y-3 text-xs font-mono select-text">
          <div className="bevel-in bg-white p-3 space-y-2">
            <div className="font-pixel text-[10px] font-bold text-black border-b border-[#808080] pb-1">
              Performance Status
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Processor Architecture:</span>
                <span className="font-bold">{langGroup}</span>
              </div>
              <div className="flex justify-between">
                <span>Agent Reasoning Heap:</span>
                <span className="font-bold">{genaiGroup}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage &amp; Vector DB:</span>
                <span className="font-bold">{backendGroup}</span>
              </div>
              <div className="flex justify-between">
                <span>Distributed Pipeline:</span>
                <span className="font-bold">{distGroup}</span>
              </div>
              <div className="flex justify-between">
                <span>System ROM / Fundamentals:</span>
                <span className="font-bold">{csGroup}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-300">
                <span>System Resources:</span>
                <span className="font-bold text-[#008000]">100% Free / Ready</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full bg-[#C0C0C0]">
      <TabbedDialog tabs={tabs} defaultTabId={tab === "skills" ? "skills" : "general"} />
    </div>
  );
}
