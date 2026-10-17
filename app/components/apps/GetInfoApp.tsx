"use client";

import React from "react";
import PixelSprite from "../PixelSprite";
import { folderSprite, documentSprite } from "@/data/sprites";

interface GetInfoAppProps {
  name?: string;
  kind?: string;
  stack?: string;
  links?: string;
  status?: string;
  created?: string;
  comments?: string;
  details?: string;
  institution?: string;
}

export default function GetInfoApp({
  name = "System Document",
  kind = "Project",
  stack,
  links,
  status,
  created,
  comments,
  details,
  institution,
}: GetInfoAppProps) {
  return (
    <div className="p-4 bg-white text-black font-mono text-xs space-y-4 select-text">
      {/* Header with Icon & Name */}
      <div className="flex items-center gap-3 border-b-2 border-black pb-3">
        <div className="p-1.5 border-2 border-black bg-[#D9D9D9]">
          <PixelSprite
            sprite={kind === "Project" ? folderSprite : documentSprite}
            scale={2}
          />
        </div>
        <div>
          <h3 className="font-heading font-extrabold text-base text-black">
            {name}
          </h3>
          <span className="font-pixel text-[10px] uppercase text-black/60">
            Kind: {kind}
          </span>
        </div>
      </div>

      {/* Info Properties Table */}
      <div className="space-y-2 border-b-2 border-black pb-3">
        {institution && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Issuer:</span>
            <span className="col-span-2 text-black/85">{institution}</span>
          </div>
        )}

        {details && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Event / Scope:</span>
            <span className="col-span-2 text-black/85">{details}</span>
          </div>
        )}

        {stack && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Tech Stack:</span>
            <span className="col-span-2 text-black/85">{stack}</span>
          </div>
        )}

        {status && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Status:</span>
            <span className="col-span-2 text-black/85">{status}</span>
          </div>
        )}

        {created && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Created:</span>
            <span className="col-span-2 text-black/85">{created}</span>
          </div>
        )}

        {links && (
          <div className="grid grid-cols-3 gap-2">
            <span className="font-bold text-black">Location / URL:</span>
            <span className="col-span-2 text-black/85 truncate">{links}</span>
          </div>
        )}
      </div>

      {/* Comments / Pitch Box */}
      {comments && (
        <div className="space-y-1">
          <span className="font-pixel text-[10px] font-bold uppercase text-black/70">
            Comments:
          </span>
          <div className="border border-black bg-[#D9D9D9]/40 p-2 text-xs leading-relaxed">
            {comments}
          </div>
        </div>
      )}

      {/* Lock status footer */}
      <div className="flex items-center justify-between text-[10px] text-black/60 pt-1">
        <span>Stationery pad: Off</span>
        <span className="font-bold text-black">Locked: Read-Only</span>
      </div>
    </div>
  );
}
