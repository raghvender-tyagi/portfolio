"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { portfolioContent, Project, AchievementItem } from "@/data/content";
import { projectSpritesMap, trophySprite, documentSprite } from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";

interface FinderAppProps {
  folder?: "projects" | "achievements";
}

export default function FinderApp({ folder = "projects" }: FinderAppProps) {
  const { viewMode, setViewMode, openWindow } = useWindowStore();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const projects = portfolioContent.projects;
  const achievements = portfolioContent.achievements.items;

  // Handle opening item
  const handleOpenItem = useCallback(
    (item: Project | AchievementItem) => {
      if ("slug" in item) {
        // Project
        openWindow("projectDetail", { slug: item.slug, title: `${item.slug}.project` }, `${item.slug}.project`);
      } else {
        // Achievement
        openWindow(
          "getInfo",
          {
            name: item.title,
            kind: item.icon === "patent" ? "Patent Application" : item.icon === "cert" ? "Certification" : "Honor / Award",
            institution: item.institution,
            details: item.event,
          },
          `Info: ${item.title}`
        );
      }
    },
    [openWindow]
  );

  // Keyboard shortcut Ctrl/Cmd+I for Get Info
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "i" || e.key === "I")) {
        e.preventDefault();
        if (selectedItemId) {
          const prj = projects.find((p) => p.id === selectedItemId || p.slug === selectedItemId);
          if (prj) {
            openWindow("getInfo", {
              name: prj.title,
              kind: "Project",
              stack: prj.tags.join(", "),
              links: prj.liveUrl ? `${prj.liveUrl} | ${prj.githubUrl}` : prj.githubUrl,
              status: prj.liveUrl ? "Live Production & Source Available" : "Source Code Available",
              comments: prj.pitch,
            });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemId, projects, openWindow]);

  const breadcrumb = folder === "achievements" ? "Macintosh HD : Achievements" : "Macintosh HD : Projects";
  const itemCount = folder === "achievements" ? achievements.length : projects.length;

  return (
    <div className="flex flex-col h-full bg-white text-black font-mono select-none">
      {/* Finder Navigation & View Bar */}
      <div className="border-b-2 border-black bg-[#D9D9D9] p-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] uppercase font-bold text-black/70">
            {breadcrumb}
          </span>
          <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.2">
            {itemCount} items
          </span>
        </div>

        {/* View Switcher: Icon / List */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("icon")}
            className={`font-pixel text-[10px] px-2 py-0.5 border border-black uppercase ${
              viewMode === "icon" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            Icons
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`font-pixel text-[10px] px-2 py-0.5 border border-black uppercase ${
              viewMode === "list" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            List
          </button>
          {selectedItemId && (
            <button
              type="button"
              onClick={() => {
                const prj = projects.find((p) => p.id === selectedItemId || p.slug === selectedItemId);
                if (prj) {
                  openWindow("getInfo", {
                    name: prj.title,
                    kind: "Project",
                    stack: prj.tags.join(", "),
                    links: prj.liveUrl ? `${prj.liveUrl} | ${prj.githubUrl}` : prj.githubUrl,
                    status: prj.liveUrl ? "Live Production & Source Available" : "Source Code Available",
                    comments: prj.pitch,
                  });
                }
              }}
              className="font-pixel text-[10px] px-2 py-0.5 border border-black bg-[#BFBFBF] hover:bg-black hover:text-white uppercase ml-2"
            >
              Get Info (⌘I)
            </button>
          )}
        </div>
      </div>

      {/* Main Folder Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {folder === "projects" ? (
          viewMode === "icon" ? (
            /* Icon Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
              {projects.map((p) => {
                const isSelected = selectedItemId === p.id;
                const sprite = projectSpritesMap[p.slug] || projectSpritesMap[p.id];

                return (
                  <div
                    key={p.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${p.title}`}
                    onClick={() => setSelectedItemId(p.id)}
                    onDoubleClick={() => handleOpenItem(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenItem(p);
                      }
                    }}
                    className="flex flex-col items-center gap-1.5 p-2 rounded cursor-pointer group focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black text-center"
                  >
                    <div className="p-1 border border-transparent group-hover:border-black/30 group-hover:scale-105 transition-transform duration-75">
                      {sprite ? <PixelSprite sprite={sprite} scale={2} /> : null}
                    </div>
                    <span
                      className={`font-pixel text-[11px] tracking-tight leading-tight uppercase select-none px-1 py-0.5 ${
                        isSelected ? "bg-black text-white" : "text-black group-hover:bg-black group-hover:text-white"
                      }`}
                    >
                      {p.title}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View (Name, Kind, Tech Stack, Status) */
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-black font-pixel text-[10px] uppercase text-black/70">
                  <th className="py-1 px-2">Name</th>
                  <th className="py-1 px-2">Category</th>
                  <th className="py-1 px-2">Tech Stack</th>
                  <th className="py-1 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const isSelected = selectedItemId === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedItemId(p.id)}
                      onDoubleClick={() => handleOpenItem(p)}
                      className={`border-b border-black/10 cursor-pointer ${
                        isSelected ? "bg-black text-white" : "hover:bg-neutral-100"
                      }`}
                    >
                      <td className="py-1.5 px-2 font-bold font-pixel text-xs">
                        {p.title}
                      </td>
                      <td className="py-1.5 px-2 text-xs">{p.category}</td>
                      <td className="py-1.5 px-2 text-xs truncate max-w-[200px]">
                        {p.tags.join(", ")}
                      </td>
                      <td className="py-1.5 px-2 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenItem(p);
                          }}
                          className="font-pixel text-[9px] uppercase px-1.5 py-0.5 border border-black bg-[#D9D9D9] text-black hover:bg-black hover:text-white"
                        >
                          Open ↗
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        ) : (
          /* Achievements Folder View */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
            {achievements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                onDoubleClick={() => handleOpenItem(item)}
                className="border-2 border-black bg-white hover:bg-[#D9D9D9] p-3 flex items-start gap-3 mac-shadow-sm cursor-pointer select-none"
              >
                <div className="p-1 border border-black bg-[#BFBFBF] shrink-0">
                  <PixelSprite
                    sprite={item.icon === "trophy" ? trophySprite : documentSprite}
                    scale={2}
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h4 className="font-heading font-bold text-sm text-black leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-black/80 truncate">
                    {item.event}
                  </p>
                  <p className="font-pixel text-[9px] uppercase text-black/60 truncate">
                    {item.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="border-t-2 border-black bg-[#D9D9D9] px-3 py-1 text-[11px] font-mono flex items-center justify-between text-black">
        <span>Double-click any item to inspect file window</span>
        <span className="font-pixel text-[9px] uppercase tracking-wider text-black/60">
          FINDER 7.1
        </span>
      </div>
    </div>
  );
}
