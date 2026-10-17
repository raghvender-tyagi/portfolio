import React from "react";
import Window from "./Window";
import { portfolioContent } from "@/data/content";

export default function SkillsSection() {
  const { skills } = portfolioContent;

  return (
    <section id="skills" className="w-full">
      <Window
        title={skills.filename}
        status="SYS_INFO • 5 COMPONENT GROUPS • RUNTIME: STABLE"
        collapsible={true}
      >
        <div className="space-y-4">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between">
            <span className="font-pixel text-xs font-bold uppercase tracking-wider text-black">
              INSTALLED STACK &amp; CAPABILITIES
            </span>
            <span className="font-pixel text-[10px] text-black/70">
              ARCHITECTURE: MONOLITH + AGENT GRAPH
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.groups.map((group) => (
              <div
                key={group.group}
                className="border-2 border-black bg-[#D9D9D9] p-3 space-y-2.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b-2 border-black pb-1.5">
                  <h4 className="font-pixel text-xs font-bold uppercase tracking-wider text-black">
                    {group.group}
                  </h4>
                  <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.2">
                    {group.items.length} PKGS
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border-2 border-black bg-white text-black font-mono text-xs px-2 py-0.5 select-none font-medium hover:bg-black hover:text-white transition-colors duration-75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </section>
  );
}
