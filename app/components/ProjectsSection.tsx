"use client";

import React, { useState } from "react";
import Window from "./Window";
import BevelButton from "./BevelButton";
import DitherImage from "./DitherImage";
import { portfolioContent, Project } from "@/data/content";

const categories: Array<"All" | "Backend" | "GenAI & Agents" | "Robotics"> = [
  "All",
  "Backend",
  "GenAI & Agents",
  "Robotics",
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Backend" | "GenAI & Agents" | "Robotics"
  >("All");

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioContent.projects
      : portfolioContent.projects.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <section id="projects" className="w-full space-y-6">
      {/* Finder Navigation Header Window */}
      <Window
        title="projects.finder"
        status={`${filteredProjects.length} ITEMS DISPLAYED • FILTER: ${selectedCategory.toUpperCase()}`}
        collapsible={false}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
              Featured Engineering Projects
            </h2>
            <p className="font-mono text-xs sm:text-sm text-black/75 mt-1">
              Production agent systems, distributed compute runtimes, and verified prototypes.
            </p>
          </div>

          {/* System 7 Finder Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 select-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-pixel text-[11px] px-2.5 py-1 uppercase font-bold tracking-wider border-2 border-black transition-colors duration-75 cursor-pointer ${
                    isActive
                      ? "bg-black text-white mac-shadow-pressed"
                      : "bg-[#D9D9D9] text-black hover:bg-[#BFBFBF] mac-shadow-sm active:translate-x-[2px] active:translate-y-[2px]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </Window>

      {/* Projects 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project: Project) => (
          <Window
            key={project.id}
            title={`${project.slug}.project`}
            status={`NUM: #${project.number} • ${project.category.toUpperCase()}`}
            collapsible={true}
            className="h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Media: DitherImage or Retro Schematic Box */}
              {project.image ? (
                <DitherImage
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  aspect="aspect-[16/9]"
                />
              ) : (
                <div className="w-full aspect-[16/9] border-2 border-black bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
                  {/* Subtle checker background */}
                  <div className="absolute inset-0 bg-mac-checker opacity-40" />
                  <div className="z-10 text-center font-mono space-y-1">
                    <span className="font-pixel text-[10px] uppercase tracking-widest text-black/60 block">
                      SYSTEM 7 SCHEMATIC ARCHITECTURE
                    </span>
                    <span className="font-heading font-bold text-lg text-black block">
                      [{project.title.toUpperCase()}]
                    </span>
                    <div className="inline-block border border-black bg-[#D9D9D9] px-2 py-0.5 font-pixel text-[9px] uppercase tracking-wider">
                      {project.tags.slice(0, 3).join(" • ")}
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black text-white px-1 py-0.5 font-pixel text-[8px] uppercase">
                    DIAG.SYS
                  </div>
                </div>
              )}

              {/* Title & Pitch */}
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-black">
                  {project.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-black/90 mt-1 leading-relaxed">
                  {project.pitch}
                </p>
              </div>

              {/* Verified Technical Bullets */}
              <ul className="space-y-2 font-mono text-xs text-black/85">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="select-none font-bold text-black mt-0.5">▪</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Note / Disclaimer if applicable */}
              {project.note && (
                <div className="border-2 border-black bg-[#BFBFBF]/40 p-2 font-mono text-[11px] text-black font-semibold">
                  [NOTE: {project.note}]
                </div>
              )}

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-2 border-black bg-[#D9D9D9] text-black font-pixel text-[10px] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t-2 border-black/15">
                {project.liveUrl && (
                  <BevelButton
                    href={project.liveUrl}
                    variant="inverted"
                    size="sm"
                  >
                    View Live ↗
                  </BevelButton>
                )}
                <BevelButton
                  href={project.githubUrl}
                  variant="default"
                  size="sm"
                >
                  Source Code ↗
                </BevelButton>
              </div>
            </div>
          </Window>
        ))}
      </div>
    </section>
  );
}
