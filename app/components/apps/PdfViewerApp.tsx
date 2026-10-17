"use client";

import React from "react";
import BevelButton from "../BevelButton";

export default function PdfViewerApp() {
  return (
    <div className="flex flex-col h-full bg-[#BFBFBF] text-black font-mono">
      {/* Viewer Action Toolbar */}
      <div className="border-b-2 border-black bg-[#D9D9D9] p-2 flex items-center justify-between select-none text-xs">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] uppercase font-bold">
            Raghvender_Tyagi_Resume.pdf
          </span>
          <span className="font-mono text-[9px] bg-black text-white px-1.5 py-0.2">
            62 KB
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BevelButton
            href="/resume.pdf"
            variant="inverted"
            size="sm"
            download="Raghvender_Tyagi_Resume.pdf"
            showDownloadProgress={true}
          >
            [ Download PDF ↓ ]
          </BevelButton>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[10px] uppercase px-2 py-1 border border-black bg-white hover:bg-neutral-200"
          >
            Open Tab ↗
          </a>
        </div>
      </div>

      {/* Embedded PDF object/iframe with fallback */}
      <div className="flex-1 w-full bg-white relative overflow-hidden">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="w-full h-full border-none"
        >
          <div className="p-8 text-center space-y-4">
            <p className="font-mono text-sm">
              Your browser does not support embedded PDF rendering directly.
            </p>
            <BevelButton
              href="/resume.pdf"
              variant="inverted"
              size="md"
              download="Raghvender_Tyagi_Resume.pdf"
            >
              Download Resume PDF ↓
            </BevelButton>
          </div>
        </object>
      </div>

      {/* Status Bar */}
      <div className="border-t-2 border-black bg-[#D9D9D9] px-3 py-1 text-[10px] font-mono flex items-center justify-between select-none">
        <span>PREVIEW ENGINE: PORTABLE DOCUMENT FORMAT</span>
        <span className="font-pixel text-[9px] uppercase">PAGE 1 OF 1</span>
      </div>
    </div>
  );
}
