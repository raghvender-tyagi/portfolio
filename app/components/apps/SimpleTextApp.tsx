"use client";

import React, { useState, useMemo } from "react";
import { portfolioContent } from "@/data/content";

export default function SimpleTextApp({ file = "experience.txt" }: { file?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFind, setShowFind] = useState(false);

  const exp = portfolioContent.experience;
  const ab = portfolioContent.about;

  const rawText = useMemo(() => {
    if (file === "about.txt" || file === "readme.txt") {
      return `FILE: README.TXT
IDENTITY: Raghvender Tyagi (${portfolioContent.meta.role})
LOCATION: ${portfolioContent.meta.location}
STATUS: ${portfolioContent.meta.statusBadge}

PHILOSOPHY & BACKGROUND:
${ab.bio.join("\n\n")}

ACADEMIC BACKGROUND:
Institution: ${ab.education.institution}
Degree: ${ab.education.degree}
Period: ${ab.education.period}
CGPA: ${ab.education.cgpa}`;
    }

    return `FILE: EXPERIENCE.TXT
ORGANIZATION: ${exp.company}
ROLE: ${exp.role} (${exp.type})
PERIOD: ${exp.period}
PLATFORM: ${exp.platform}

DELIVERABLES & TECHNICAL MILESTONES:
${exp.bullets.map((b, i) => `[0${i + 1}] ${b}`).join("\n\n")}

VERIFICATION: Verified Industry Workload Record (2026)`;
  }, [file, exp, ab]);

  // Highlight matches
  const renderedContent = useMemo(() => {
    if (!searchTerm.trim()) {
      return <span>{rawText}</span>;
    }

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = rawText.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-black text-white font-bold px-0.5">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }, [rawText, searchTerm]);

  return (
    <div className="h-full bg-white text-black font-mono text-xs flex flex-col justify-between select-text">
      {/* Document Toolbar / Find Bar */}
      <div className="border-b-2 border-black bg-[#D9D9D9] p-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] uppercase font-bold">
            {file}
          </span>
          <span className="text-[10px] text-black/60">
            {rawText.split("\n").length} lines
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showFind ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Find text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="font-mono text-xs px-1.5 py-0.5 border border-black bg-white outline-none w-36"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setShowFind(false);
                }}
                className="font-pixel text-[10px] px-1 border border-black bg-white hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowFind(true)}
              className="font-pixel text-[10px] px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white uppercase"
            >
              Find (Ctrl+F)
            </button>
          )}
        </div>
      </div>

      {/* Main Document Body */}
      <div className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">
        {renderedContent}
      </div>

      {/* Footer Info */}
      <div className="border-t-2 border-black bg-[#D9D9D9] px-3 py-1 text-[10px] font-mono flex items-center justify-between text-black select-none">
        <span>ENCODING: US-ASCII • 100% VERIFIED</span>
        <span className="font-pixel text-[9px] uppercase">SIMPLETEXT 1.0</span>
      </div>
    </div>
  );
}
