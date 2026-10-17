"use client";

import React from "react";
import TabbedDialog, { TabItem } from "../os/TabbedDialog";
import PixelSprite from "../PixelSprite";
import { winFolder32, winDoc32 } from "@/data/sprites";

interface GetInfoAppProps {
  name?: string;
  kind?: string;
  stack?: string;
  links?: string;
  status?: string;
  comments?: string;
  details?: string;
  institution?: string;
}

export default function GetInfoApp({
  name = "Item",
  kind = "Project",
  stack,
  links,
  status,
  comments,
  details,
  institution,
}: GetInfoAppProps) {
  const tabs: TabItem[] = [
    {
      id: "general",
      label: "General",
      content: (
        <div className="space-y-3 text-xs font-mono select-text">
          {/* Header Row */}
          <div className="flex items-center gap-3 border-b border-[#808080] pb-2">
            <PixelSprite
              sprite={kind === "Project" ? winFolder32 : winDoc32}
              scale={1.2}
            />
            <div className="min-w-0">
              <div className="font-pixel text-[11px] font-bold text-black truncate">
                {name}
              </div>
              <div className="text-[10px] text-neutral-600 font-pixel mt-0.5">
                Type: {kind}
              </div>
            </div>
          </div>

          {/* Properties List */}
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-neutral-700">Location:</span>
              <span className="col-span-2 text-black font-bold">
                C:\{kind === "Project" ? "Projects" : "Achievements"}\{name}
              </span>
            </div>

            {institution && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-neutral-700">Issuer:</span>
                <span className="col-span-2 text-black">{institution}</span>
              </div>
            )}

            {details && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-neutral-700">Event / Scope:</span>
                <span className="col-span-2 text-black">{details}</span>
              </div>
            )}

            {comments && (
              <div className="space-y-1 pt-1">
                <span className="text-neutral-700 block">Description:</span>
                <div className="bevel-in bg-white p-2 text-xs text-neutral-800 leading-relaxed max-h-28 overflow-y-auto">
                  {comments}
                </div>
              </div>
            )}
          </div>

          {/* Attributes */}
          <div className="pt-2 border-t border-[#808080] flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-default">
              <input type="checkbox" checked readOnly className="accent-[#000080]" />
              <span>Read-only</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-default">
              <input type="checkbox" disabled />
              <span className="text-neutral-500">Archive</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "details",
      label: "Details",
      content: (
        <div className="space-y-2.5 text-xs font-mono select-text">
          {stack && (
            <div className="space-y-1">
              <span className="font-bold text-black block">Tech Stack:</span>
              <div className="bevel-in bg-white p-2 text-xs text-neutral-800">
                {stack}
              </div>
            </div>
          )}

          {status && (
            <div className="grid grid-cols-3 gap-2 pt-1">
              <span className="text-neutral-700">Deployment:</span>
              <span className="col-span-2 text-[#008000] font-bold">{status}</span>
            </div>
          )}

          {links && (
            <div className="space-y-1 pt-1">
              <span className="font-bold text-black block">Access Links:</span>
              <div className="bevel-in bg-white p-2 text-xs text-[#0000FF] break-all">
                {links}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="h-full bg-[#C0C0C0]">
      <TabbedDialog tabs={tabs} />
    </div>
  );
}
