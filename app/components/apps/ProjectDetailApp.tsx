"use client";

import React from "react";
import DitherImage from "../DitherImage";
import PixelSprite from "../PixelSprite";
import BevelButton from "../BevelButton";
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
    <div className="p-4 md:p-6 bg-white text-black font-mono space-y-4 select-text">
      {/* Media: DitherImage or 96x96 Pixel Illustration */}
      {project.image ? (
        <DitherImage
          src={project.image}
          alt={`${project.title} interface`}
          aspect="aspect-[16/9]"
        />
      ) : sprite ? (
        <div className="w-full aspect-[16/9] border-2 border-black bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-mac-checker opacity-30 pointer-events-none" />
          <PixelSprite sprite={sprite} scale={3} />
          <span className="font-pixel text-[10px] uppercase tracking-widest text-black/60 mt-2">
            ORIGINAL SYSTEM SCHEMATIC
          </span>
        </div>
      ) : null}

      {/* Title & Pitch */}
      <div className="space-y-1">
        <div className="flex items-center justify-between border-b-2 border-black pb-1">
          <span className="font-pixel text-xs uppercase tracking-wider text-black/70">
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
                status: project.liveUrl ? "Live Production & Source" : "Source Code Available",
                comments: project.pitch,
              })
            }
            className="font-pixel text-[9px] uppercase px-1.5 py-0.5 border border-black bg-[#D9D9D9] hover:bg-black hover:text-white cursor-pointer"
          >
            Get Info (⌘I)
          </button>
        </div>

        <h2 className="font-heading font-extrabold text-2xl text-black">
          {project.title}
        </h2>
        <p className="font-mono text-xs sm:text-sm text-black/90 leading-relaxed">
          {project.pitch}
        </p>
      </div>

      {/* Bullet Deliverables */}
      <div className="space-y-1.5">
        <h4 className="font-pixel text-[11px] font-bold uppercase text-black">
          Technical Highlights:
        </h4>
        <ul className="space-y-1.5 text-xs font-mono text-black/85">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold text-black select-none">▪</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Note / Disclaimer if any */}
      {project.note && (
        <div className="border-2 border-black bg-[#BFBFBF]/40 p-2 font-mono text-xs text-black font-semibold">
          [NOTE: {project.note}]
        </div>
      )}

      {/* Tags */}
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
          <BevelButton href={project.liveUrl} variant="inverted" size="sm">
            View Live ↗
          </BevelButton>
        )}
        <BevelButton href={project.githubUrl} variant="default" size="sm">
          Source Code ↗
        </BevelButton>
      </div>
    </div>
  );
}
