"use client";

import React from "react";
import PixelSprite from "../PixelSprite";
import { acrobat32 } from "@/data/sprites";

export default function PdfViewerApp() {
  return (
    <div className="flex flex-col h-full bg-[#C0C0C0] text-black font-mono select-none">
      {/* 1. Acrobat Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-0.5 bg-[#C0C0C0] border-b border-[#808080] text-[11px] font-pixel text-black">
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Tools</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* 2. Viewer Action Toolbar */}
      <div className="p-1 bg-[#C0C0C0] border-b border-[#808080] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <PixelSprite sprite={acrobat32} scale={0.4} />
          <span className="font-pixel text-[10px] font-bold">
            Raghvender_Tyagi_Resume.pdf
          </span>
          <span className="bevel-in px-1.5 py-0.5 text-[9px] font-mono bg-[#DFDFDF] text-neutral-700">
            62 KB
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="/resume.pdf"
            download="Raghvender_Tyagi_Resume.pdf"
            className="win95-btn font-pixel text-[10px] px-2.5 py-1 font-bold"
          >
            Download PDF 💾
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="win95-btn font-pixel text-[10px] px-2 py-1"
          >
            Open Tab ↗
          </a>
        </div>
      </div>

      {/* 3. Embedded PDF object/iframe with fallback */}
      <div className="flex-1 w-full bg-white relative overflow-hidden bevel-in m-1">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="w-full h-full border-none"
        >
          <div className="p-8 text-center space-y-4">
            <p className="font-mono text-sm text-neutral-800">
              PDF preview directly rendered. If unviewable in this browser window:
            </p>
            <a
              href="/resume.pdf"
              download="Raghvender_Tyagi_Resume.pdf"
              className="win95-btn px-4 py-2 font-pixel text-xs font-bold"
            >
              Download Resume PDF 💾
            </a>
          </div>
        </object>
      </div>

      {/* 4. Status Bar */}
      <div className="bg-[#C0C0C0] border-t border-[#808080] px-2 py-0.5 text-[10px] font-mono flex items-center justify-between">
        <div className="bevel-in px-2 py-0.5 text-neutral-700">
          Document: 100% Verified Resume
        </div>
        <div className="bevel-in px-2 py-0.5 text-neutral-700">
          Page 1 of 1
        </div>
      </div>
    </div>
  );
}
