"use client";

import React, { useState } from "react";
import PixelSprite from "../PixelSprite";
import { msDos32 } from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";

export default function RunDialogApp() {
  const { openWindow, closeWindow, showAlert } = useWindowStore();
  const [command, setCommand] = useState("");

  const handleRun = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    // Find run window ID to close it
    const runWin = useWindowStore
      .getState()
      .windows.find((w) => w.appId === "runDialog");
    if (runWin) closeWindow(runWin.id);

    if (cmd === "terminal" || cmd === "cmd" || cmd === "command") {
      openWindow("terminal");
    } else if (cmd === "calc" || cmd === "calculator") {
      openWindow("calc");
    } else if (cmd === "paint" || cmd === "mspaint") {
      openWindow("paint");
    } else if (cmd === "notepad" || cmd === "note") {
      openWindow("simpleText");
    } else if (cmd === "resume" || cmd === "cv") {
      openWindow("pdfViewer");
    } else if (cmd === "mail" || cmd === "email") {
      openWindow("mail");
    } else if (cmd === "projects" || cmd === "explorer") {
      openWindow("finder", { folder: "projects" });
    } else if (cmd === "achievements") {
      openWindow("finder", { folder: "achievements" });
    } else if (cmd === "snake") {
      openWindow("snake");
    } else if (cmd === "minesweeper" || cmd === "bugs" || cmd === "bugsweeper") {
      openWindow("bugSweeper");
    } else if (cmd === "control" || cmd === "settings") {
      openWindow("controlPanel");
    } else if (cmd === "classic") {
      window.location.href = "/classic";
    } else if (cmd.startsWith("open ")) {
      const target = cmd.replace("open ", "").trim();
      openWindow("terminal", { initialCommand: `open ${target}` });
    } else {
      showAlert(
        "Cannot find file",
        `Cannot find the file '${command}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.`,
        undefined,
        "error"
      );
    }
  };

  const handleCancel = () => {
    const runWin = useWindowStore
      .getState()
      .windows.find((w) => w.appId === "runDialog");
    if (runWin) closeWindow(runWin.id);
  };

  return (
    <div className="p-4 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between h-full select-none space-y-3">
      {/* Description & Icon */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 pt-1">
          <PixelSprite sprite={msDos32} scale={1} />
        </div>
        <p className="text-xs text-neutral-800 leading-relaxed font-mono">
          Type the name of a program, folder, document, or Internet resource, and RT-OS 95 will open it for you.
        </p>
      </div>

      {/* Input Row */}
      <form onSubmit={handleRun} className="space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="run-open-input" className="font-pixel text-[10px] font-bold text-neutral-800 w-12">
            Open:
          </label>
          <div className="flex-1 bevel-in bg-white px-2 py-1">
            <input
              id="run-open-input"
              type="text"
              placeholder="e.g. terminal, calc, paint, resume, classic..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              autoFocus
              className="w-full bg-transparent outline-none font-mono text-xs text-black"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
          <button
            type="submit"
            className="win95-btn px-5 py-1 font-pixel text-[10px] font-bold"
          >
            OK
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="win95-btn px-5 py-1 font-pixel text-[10px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

