"use client";

import React, { useState, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { portfolioContent, Project, AchievementItem } from "@/data/content";
import {
  projectSpritesMap,
  trophySprite,
  myComputer32,
  winFolder32,
  winDoc32,
  networkNeighborhood32,
  recycleBinEmpty32,
} from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";

interface FinderAppProps {
  folder?: "projects" | "achievements" | "documents";
}

export default function FinderApp({ folder = "projects" }: FinderAppProps) {
  const { openWindow } = useWindowStore();
  const [currentFolder, setCurrentFolder] = useState<"projects" | "achievements" | "documents">(folder);
  const [viewStyle, setViewStyle] = useState<"large" | "list" | "details">("large");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [addressPath, setAddressPath] = useState(`C:\\${folder.charAt(0).toUpperCase() + folder.slice(1)}`);

  const projects = portfolioContent.projects;
  const achievements = portfolioContent.achievements.items;

  const navigateToFolder = (f: "projects" | "achievements" | "documents") => {
    setCurrentFolder(f);
    setSelectedItemId(null);
    setAddressPath(`C:\\${f.charAt(0).toUpperCase() + f.slice(1)}`);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = addressPath.toLowerCase();
    if (clean.includes("achieve")) {
      navigateToFolder("achievements");
    } else if (clean.includes("doc")) {
      navigateToFolder("documents");
    } else {
      navigateToFolder("projects");
    }
  };

  // Open item action
  const handleOpenItem = useCallback(
    (item: Project | AchievementItem | { title: string; file: string }) => {
      if ("slug" in item) {
        // Project
        openWindow("projectDetail", { slug: item.slug, title: item.title }, item.title);
      } else if ("icon" in item) {
        // Achievement
        openWindow("getInfo", {
          name: item.title,
          kind: item.icon === "patent" ? "Patent Application" : item.icon === "cert" ? "Certification" : "Honor / Award",
          institution: item.institution,
          details: item.event,
        });
      } else if ("file" in item) {
        // Document
        openWindow("simpleText", { file: item.file });
      }
    },
    [openWindow]
  );

  const getObjectCount = () => {
    if (currentFolder === "projects") return projects.length;
    if (currentFolder === "achievements") return achievements.length;
    return 3;
  };

  return (
    <div className="flex flex-col h-full bg-[#C0C0C0] text-black font-mono select-none">
      {/* 1. Explorer Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-0.5 bg-[#C0C0C0] border-b border-[#808080] text-[11px] font-pixel text-black">
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Go</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* 2. 3D Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-[#C0C0C0] border-b border-[#808080]">
        <button
          type="button"
          onClick={() => navigateToFolder("projects")}
          title="Up one level"
          className="win95-btn px-2 py-0.5 font-pixel text-[10px] flex items-center gap-1"
        >
          <span>⬆ Up</span>
        </button>

        <div className="h-5 w-[2px] border-l border-[#808080] border-r border-r-white mx-1" />

        <button
          type="button"
          onClick={() => setViewStyle("large")}
          className={`win95-btn px-2 py-0.5 font-pixel text-[10px] ${
            viewStyle === "large" ? "bevel-in bg-[#DFDFDF] font-bold" : ""
          }`}
        >
          Large Icons
        </button>
        <button
          type="button"
          onClick={() => setViewStyle("list")}
          className={`win95-btn px-2 py-0.5 font-pixel text-[10px] ${
            viewStyle === "list" ? "bevel-in bg-[#DFDFDF] font-bold" : ""
          }`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => setViewStyle("details")}
          className={`win95-btn px-2 py-0.5 font-pixel text-[10px] ${
            viewStyle === "details" ? "bevel-in bg-[#DFDFDF] font-bold" : ""
          }`}
        >
          Details
        </button>

        {selectedItemId && (
          <button
            type="button"
            onClick={() => {
              const prj = projects.find((p) => p.id === selectedItemId);
              if (prj) {
                openWindow("getInfo", {
                  name: prj.title,
                  kind: "Project",
                  stack: prj.tags.join(", "),
                  links: prj.liveUrl ? `${prj.liveUrl} | ${prj.githubUrl}` : prj.githubUrl,
                  status: prj.liveUrl ? "Production Live" : "Open Source",
                  comments: prj.pitch,
                });
              }
            }}
            className="win95-btn px-2 py-0.5 font-pixel text-[10px] ml-auto font-bold"
          >
            Properties
          </button>
        )}
      </div>

      {/* 3. Address Bar */}
      <form
        onSubmit={handleAddressSubmit}
        className="flex items-center gap-2 px-2 py-1 bg-[#C0C0C0] border-b border-[#808080] text-xs font-mono"
      >
        <span className="font-pixel text-[10px] text-black shrink-0">Address:</span>
        <div className="flex-1 bevel-in bg-white px-2 py-0.5 flex items-center">
          <input
            type="text"
            value={addressPath}
            onChange={(e) => setAddressPath(e.target.value)}
            className="w-full bg-transparent outline-none font-mono text-xs text-black"
          />
        </div>
      </form>

      {/* 4. Two-Pane Explorer Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Folder Tree */}
        <div className="w-44 sm:w-52 bg-white bevel-in m-1 p-2 overflow-y-auto text-xs font-mono shrink-0 select-none">
          <div className="space-y-1">
            {/* Desktop */}
            <div className="flex items-center gap-1.5 font-bold font-pixel text-[10px]">
              <PixelSprite sprite={myComputer32} scale={0.4} />
              <span>Desktop</span>
            </div>

            {/* My Computer Tree */}
            <div className="pl-3 space-y-1">
              <div className="flex items-center gap-1 text-neutral-800">
                <span className="font-mono text-neutral-400">└─</span>
                <PixelSprite sprite={myComputer32} scale={0.4} />
                <span className="font-pixel text-[9px]">My Computer</span>
              </div>

              {/* C: Drive Folders */}
              <div className="pl-4 space-y-1">
                <button
                  type="button"
                  onClick={() => navigateToFolder("projects")}
                  className={`w-full flex items-center gap-1.5 px-1 py-0.5 text-left rounded-none ${
                    currentFolder === "projects"
                      ? "bg-[#000080] text-white dotted-focus"
                      : "hover:bg-neutral-100 text-black"
                  }`}
                >
                  <PixelSprite sprite={winFolder32} scale={0.45} />
                  <span className="font-pixel text-[9px] truncate">Projects (C:)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToFolder("achievements")}
                  className={`w-full flex items-center gap-1.5 px-1 py-0.5 text-left rounded-none ${
                    currentFolder === "achievements"
                      ? "bg-[#000080] text-white dotted-focus"
                      : "hover:bg-neutral-100 text-black"
                  }`}
                >
                  <PixelSprite sprite={winFolder32} scale={0.45} />
                  <span className="font-pixel text-[9px] truncate">Achievements</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToFolder("documents")}
                  className={`w-full flex items-center gap-1.5 px-1 py-0.5 text-left rounded-none ${
                    currentFolder === "documents"
                      ? "bg-[#000080] text-white dotted-focus"
                      : "hover:bg-neutral-100 text-black"
                  }`}
                >
                  <PixelSprite sprite={winFolder32} scale={0.45} />
                  <span className="font-pixel text-[9px] truncate">Documents</span>
                </button>
              </div>

              {/* Other System Nodes */}
              <div className="flex items-center gap-1 text-neutral-700 pt-1">
                <span className="font-mono text-neutral-400">└─</span>
                <PixelSprite sprite={networkNeighborhood32} scale={0.4} />
                <span className="font-pixel text-[9px]">Network</span>
              </div>

              <div className="flex items-center gap-1 text-neutral-700">
                <span className="font-mono text-neutral-400">└─</span>
                <PixelSprite sprite={recycleBinEmpty32} scale={0.4} />
                <span className="font-pixel text-[9px]">Recycle Bin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Files & Folders View */}
        <div className="flex-1 bg-white bevel-in m-1 p-3 overflow-y-auto">
          {currentFolder === "projects" && (
            <>
              {viewStyle === "large" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {projects.map((p) => {
                    const isSelected = selectedItemId === p.id;
                    const sprite = projectSpritesMap[p.slug] || winFolder32;
                    return (
                      <div
                        key={p.id}
                        tabIndex={0}
                        role="button"
                        onClick={() => setSelectedItemId(p.id)}
                        onDoubleClick={() => handleOpenItem(p)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleOpenItem(p);
                          }
                        }}
                        className="flex flex-col items-center justify-start cursor-pointer text-center group focus:outline-none"
                      >
                        <div className="p-1 group-hover:scale-105">
                          <PixelSprite sprite={sprite} scale={1.5} />
                        </div>
                        <span
                          className={`mt-1 font-pixel text-[10px] leading-tight px-1 py-0.5 ${
                            isSelected
                              ? "bg-[#000080] text-white dotted-focus"
                              : "text-black group-hover:bg-[#000080] group-hover:text-white"
                          }`}
                        >
                          {p.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {viewStyle === "list" && (
                <div className="space-y-1">
                  {projects.map((p) => {
                    const isSelected = selectedItemId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedItemId(p.id)}
                        onDoubleClick={() => handleOpenItem(p)}
                        className={`flex items-center gap-2 px-2 py-1 cursor-pointer font-pixel text-[10px] ${
                          isSelected ? "bg-[#000080] text-white dotted-focus" : "hover:bg-neutral-100 text-black"
                        }`}
                      >
                        <PixelSprite sprite={projectSpritesMap[p.slug] || winFolder32} scale={0.5} />
                        <span className="font-bold">{p.title}</span>
                        <span className="text-[9px] opacity-75 font-mono ml-auto">{p.category}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {viewStyle === "details" && (
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#808080] bg-[#DFDFDF] font-pixel text-[9px] uppercase text-black">
                      <th className="py-1 px-2 border-r border-[#C0C0C0]">Name</th>
                      <th className="py-1 px-2 border-r border-[#C0C0C0]">Type</th>
                      <th className="py-1 px-2 border-r border-[#C0C0C0]">Tech Stack</th>
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
                          className={`border-b border-neutral-200 cursor-pointer text-xs ${
                            isSelected ? "bg-[#000080] text-white" : "hover:bg-neutral-100 text-black"
                          }`}
                        >
                          <td className="py-1 px-2 font-bold font-pixel text-[10px]">
                            {p.title}
                          </td>
                          <td className="py-1 px-2">{p.category}</td>
                          <td className="py-1 px-2 truncate max-w-[200px]">{p.tags.join(", ")}</td>
                          <td className="py-1 px-2 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenItem(p);
                              }}
                              className="win95-btn px-2 py-0.5 text-[9px]"
                            >
                              Open
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}

          {currentFolder === "achievements" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    onDoubleClick={() => handleOpenItem(item)}
                    className={`p-2 border cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? "bg-[#000080] text-white border-black dotted-focus"
                        : "bg-neutral-50 hover:bg-neutral-100 border-[#808080] text-black"
                    }`}
                  >
                    <div className="p-1 shrink-0">
                      <PixelSprite sprite={trophySprite} scale={1.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-pixel text-[10px] font-bold truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] font-mono opacity-90 truncate">
                        {item.event}
                      </div>
                      <div className="text-[9px] font-pixel opacity-70 truncate mt-0.5">
                        {item.institution}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentFolder === "documents" && (
            <div className="space-y-1">
              {[
                { title: "Resume.pdf", file: "Resume.pdf", size: "240 KB" },
                { title: "About.txt", file: "about.txt", size: "4 KB" },
                { title: "Experience.txt", file: "experience.txt", size: "8 KB" },
              ].map((doc) => (
                <div
                  key={doc.file}
                  onDoubleClick={() =>
                    doc.file.endsWith(".pdf")
                      ? openWindow("pdfViewer")
                      : openWindow("simpleText", { file: doc.file })
                  }
                  className="flex items-center gap-2 p-1.5 hover:bg-neutral-100 cursor-pointer border-b border-neutral-100"
                >
                  <PixelSprite sprite={winDoc32} scale={0.6} />
                  <span className="font-pixel text-[10px] font-bold text-black">{doc.title}</span>
                  <span className="font-mono text-xs text-neutral-500 ml-auto">{doc.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Explorer Status Bar */}
      <div className="flex items-center gap-2 px-2 py-0.5 bg-[#C0C0C0] border-t border-[#808080] text-[10px] font-mono">
        <div className="bevel-in px-2 py-0.5 text-neutral-800">
          {getObjectCount()} object(s)
        </div>
        <div className="bevel-in px-2 py-0.5 text-neutral-800">
          0 bytes selected
        </div>
        <div className="bevel-in px-2 py-0.5 text-neutral-800 ml-auto">
          Local Intranet (C:)
        </div>
      </div>
    </div>
  );
}
