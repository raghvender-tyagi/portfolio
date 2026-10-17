"use client";

import React from "react";
import DitherImage from "../DitherImage";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { projectSpritesMap } from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";

export default function ProjectDetailApp({ slug }: { slug?: string }) {
  const { openWindow } = useWindowStore();
  const project =
    portfolioContent.projects.find((p) => p.slug === slug || p.id === slug) ||
    portfolioContent.projects[0];

  const sprite = projectSpritesMap[project.slug] || projectSpritesMap[project.id];

  return (
    <div className="p-4 bg-[#C0C0C0] text-black font-mono space-y-4 select-text">
      {/* Media Box */}
      {project.image ? (
        <div className="bevel-in p-1 bg-white">
          <DitherImage
            src={project.image}
            alt={`${project.title} interface`}
            aspect="aspect-[16/9]"
          />
        </div>
      ) : sprite ? (
        <div className="w-full aspect-[16/9] bevel-in bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
          <PixelSprite sprite={sprite} scale={2.5} />
          <span className="font-pixel text-[10px] uppercase tracking-widest text-neutral-500 mt-2">
            SYSTEM SCHEMATIC • {project.title.toUpperCase()}
          </span>
        </div>
      ) : null}

      {/* Title & Pitch Container */}
      <div className="bevel-out bg-[#DFDFDF] p-3 space-y-2">
        <div className="flex items-center justify-between border-b border-[#808080] pb-1">
          <span className="font-pixel text-xs uppercase font-bold text-[#000080]">
            NUM #{project.number} • {project.category.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() =>
              openWindow("getInfo", {
                name: project.title,
                kind: "Project",
                stack: project.tags.join(", "),
                links: project.liveUrl ? `${project.liveUrl} | ${project.githubUrl}` : project.githubUrl,
                status: project.liveUrl ? "Production Live" : "Open Source",
                comments: project.pitch,
              })
            }
            className="win95-btn px-2.5 py-1 text-xs font-bold"
          >
            Properties
          </button>
        </div>

        <h2 className="font-pixel font-bold text-2xl text-black">
          {project.title}
        </h2>
        <p className="font-mono text-sm text-neutral-800 leading-relaxed">
          {project.pitch}
        </p>
      </div>

      {/* Technical Highlights */}
      <div className="bevel-in bg-white p-3.5 space-y-2">
        <h4 className="font-pixel text-xs font-bold uppercase text-[#000080]">
          Technical Highlights:
        </h4>
        <ul className="space-y-2 text-sm font-mono text-neutral-900">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="font-bold text-[#000080] select-none text-base">▪</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Note / Disclaimer if any */}
      {project.note && (
        <div className="bevel-in bg-[#FFFFE1] p-2.5 text-sm text-neutral-800">
          <strong>Note:</strong> {project.note}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bevel-out bg-[#DFDFDF] text-black font-pixel text-xs px-2.5 py-1 uppercase tracking-wider font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#808080]">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="win95-btn font-pixel text-xs md:text-sm font-bold px-4 py-2"
          >
            Launch Live Demo ↗
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-btn font-pixel text-xs md:text-sm font-bold px-4 py-2"
        >
          View Source Repository ↗
        </a>
      </div>
    </div>
  );
}
