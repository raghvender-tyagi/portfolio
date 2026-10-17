"use client";

import React, { useState, useMemo } from "react";
import { portfolioContent } from "@/data/content";

export default function SimpleTextApp({
  file = "experience.txt",
}: {
  file?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFind, setShowFind] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);

  const exp = portfolioContent.experience;
  const ab = portfolioContent.about;

  const rawText = useMemo(() => {
    if (file === "about.txt" || file === "readme.txt") {
      return `FILE: ABOUT.TXT
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

    if (file === "New Text Document.txt") {
      return `[Notepad - New Text Document]
Type notes here...
Raghvender Tyagi - AI Systems Engineer`;
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

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = rawText.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#000080] text-white font-bold px-0.5">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }, [rawText, searchTerm]);

  return (
    <div className="h-full bg-white text-black font-mono text-xs flex flex-col justify-between select-text">
      {/* 1. Notepad Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-0.5 bg-[#C0C0C0] border-b border-[#808080] text-[11px] font-pixel text-black select-none">
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
          File
        </span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
          Edit
        </span>
        <button
          type="button"
          onClick={() => setShowFind(!showFind)}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => setWordWrap(!wordWrap)}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"
        >
          Word Wrap: {wordWrap ? "ON" : "OFF"}
        </button>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">
          Help
        </span>
      </div>

      {/* Find Dialog Bar */}
      {showFind && (
        <div className="bg-[#FFFFE1] border-b border-[#808080] p-1.5 flex items-center justify-between gap-2 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-neutral-800">
              Find:
            </span>
            <input
              type="text"
              placeholder="Search text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="px-1.5 py-0.5 bevel-in bg-white outline-none font-mono text-xs w-48 text-black"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setShowFind(false);
            }}
            className="win95-btn px-2 py-0.5 text-[10px]"
          >
            Close
          </button>
        </div>
      )}

      {/* 2. Main Notepad Text Canvas */}
      <div
        className={`flex-1 p-3 overflow-y-auto font-mono text-xs leading-relaxed select-text ${
          wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
        }`}
      >
        {renderedContent}
      </div>

      {/* 3. Status Bar */}
      <div className="flex items-center gap-2 px-2 py-0.5 bg-[#C0C0C0] border-t border-[#808080] text-[10px] font-mono select-none">
        <div className="bevel-in px-2 py-0.5 text-neutral-800">
          Line 1, Col 1
        </div>
        <div className="bevel-in px-2 py-0.5 text-neutral-800">
          {rawText.split("\n").length} lines
        </div>
        <div className="bevel-in px-2 py-0.5 text-neutral-800 ml-auto">
          ANSI
        </div>
      </div>
    </div>
  );
}
