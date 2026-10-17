import React from "react";
import Window from "./Window";
import { portfolioContent } from "@/data/content";

export default function ExperienceSection() {
  const { experience } = portfolioContent;

  return (
    <section id="experience" className="w-full">
      <Window
        title={experience.filename}
        status="LINES: 32 • ENCODING: US-ASCII • 100% READ-ONLY"
        collapsible={true}
      >
        <div className="space-y-6">
          {/* Document Header Metadata Block */}
          <div className="border-2 border-black bg-[#D9D9D9] p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-1.5 select-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-2 mb-2 gap-1">
              <div>
                <span className="font-pixel text-xs font-bold uppercase tracking-widest text-black/60 block">
                  ORGANIZATION
                </span>
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-black">
                  {experience.company}
                </span>
              </div>
              <div className="sm:text-right font-pixel text-xs text-black/80 font-bold uppercase">
                <span>{experience.period}</span>
                <span className="block text-[10px] text-black/60">{experience.type}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-bold text-black">ROLE: </span>
                <span>{experience.role}</span>
              </div>
              <div>
                <span className="font-bold text-black">PLATFORM: </span>
                <span>{experience.platform}</span>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div>
            <h4 className="font-pixel text-xs font-bold uppercase tracking-wider text-black mb-3">
              === KEY DELIVERABLES & ARCHITECTURAL CONTRIBUTIONS ===
            </h4>

            {/* Deliverables List */}
            <div className="space-y-4">
              {experience.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border-l-2 border-black pl-3 py-0.5"
                >
                  <span className="font-pixel text-xs font-bold text-black bg-[#BFBFBF] px-1.5 py-0.5 border border-black select-none">
                    0{idx + 1}
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-black/90 leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* System 7 Seal / Verification Stamp */}
          <div className="pt-2 flex items-center justify-between border-t-2 border-black text-xs font-mono text-black/70">
            <span className="font-pixel text-[10px] uppercase">
              CONFIDENTIAL / RESEARCH ARCHIVES
            </span>
            <span className="font-bold text-black">
              VERIFIED WORKLOAD RECORD
            </span>
          </div>
        </div>
      </Window>
    </section>
  );
}
