"use client";

import React, { useState } from "react";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { winDoc32, winFolder32 } from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";

export default function FindFilesApp() {
  const { openWindow } = useWindowStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ name: string; folder: string; type: string; target: () => void }>
  >([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setSearched(true);
      return;
    }

    const matched: Array<{
      name: string;
      folder: string;
      type: string;
      target: () => void;
    }> = [];

    // Search Projects
    portfolioContent.projects.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.pitch.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        matched.push({
          name: p.title,
          folder: "C:\\Projects",
          type: "Project File",
          target: () => openWindow("projectDetail", { slug: p.slug, title: p.title }),
        });
      }
    });

    // Search Documents
    if ("resume".includes(q) || "cv".includes(q)) {
      matched.push({
        name: "Resume.pdf",
        folder: "C:\\Documents",
        type: "Adobe Acrobat Document",
        target: () => openWindow("pdfViewer"),
      });
    }
    if ("about".includes(q) || "bio".includes(q) || "education".includes(q)) {
      matched.push({
        name: "About.txt",
        folder: "C:\\Documents",
        type: "Text Document",
        target: () => openWindow("simpleText", { file: "about.txt" }),
      });
    }
    if ("experience".includes(q) || "work".includes(q) || "lightning".includes(q)) {
      matched.push({
        name: "Experience.txt",
        folder: "C:\\Documents",
        type: "Text Document",
        target: () => openWindow("simpleText", { file: "experience.txt" }),
      });
    }

    // Search Skills
    portfolioContent.skills.groups.forEach((g) => {
      g.items.forEach((item) => {
        if (item.toLowerCase().includes(q)) {
          matched.push({
            name: `${item} (${g.group})`,
            folder: "C:\\System\\Skills",
            type: "Skill Module",
            target: () => openWindow("aboutMac", { tab: "skills" }),
          });
        }
      });
    });

    setResults(matched);
    setSearched(true);
  };

  return (
    <div className="p-3 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between h-full select-none space-y-3">
      {/* Search Header & Inputs */}
      <form onSubmit={handleSearch} className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] w-20 text-right">Named:</span>
          <div className="flex-1 bevel-in bg-white px-2 py-0.5">
            <input
              type="text"
              placeholder="e.g. LangGraph, TakeMyCompute, Resume..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent outline-none font-mono text-xs text-black"
            />
          </div>
          <button
            type="submit"
            className="win95-btn px-4 py-1 font-pixel text-[10px] font-bold"
          >
            Find Now
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] w-20 text-right">Look in:</span>
          <div className="flex-1 bevel-in bg-[#DFDFDF] px-2 py-0.5 text-neutral-700">
            C:\ (Hard Disk)
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setSearched(false);
            }}
            className="win95-btn px-4 py-1 font-pixel text-[10px]"
          >
            New Search
          </button>
        </div>
      </form>

      {/* Results Table */}
      <div className="flex-1 bevel-in bg-white p-1 overflow-y-auto">
        {results.length > 0 ? (
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#808080] bg-[#DFDFDF] font-pixel text-[9px] text-black">
                <th className="py-1 px-2 border-r border-[#C0C0C0]">Name</th>
                <th className="py-1 px-2 border-r border-[#C0C0C0]">In Folder</th>
                <th className="py-1 px-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr
                  key={i}
                  onDoubleClick={res.target}
                  className="hover:bg-[#000080] hover:text-white cursor-pointer border-b border-neutral-100"
                >
                  <td className="py-1 px-2 font-bold flex items-center gap-1.5">
                    <PixelSprite sprite={res.type.includes("Project") ? winFolder32 : winDoc32} scale={0.4} />
                    <span>{res.name}</span>
                  </td>
                  <td className="py-1 px-2 text-neutral-600 group-hover:text-white">
                    {res.folder}
                  </td>
                  <td className="py-1 px-2 text-neutral-600 group-hover:text-white">
                    {res.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : searched ? (
          <div className="p-6 text-center text-neutral-500 font-mono text-xs">
            No matching files or projects found in C:\
          </div>
        ) : (
          <div className="p-6 text-center text-neutral-400 font-mono text-xs">
            Enter a search term and click &quot;Find Now&quot; to search the portfolio.
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-1 bg-[#C0C0C0] border-t border-[#808080] text-xs font-mono flex items-center">
        <div className="bevel-in px-2 py-0.5 text-neutral-800">
          {results.length} file(s) found
        </div>
      </div>
    </div>
  );
}
