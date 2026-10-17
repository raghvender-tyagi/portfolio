"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { buildVirtualFileSystem, VirtualFile } from "@/lib/os/virtualFs";
import { useWindowStore } from "@/lib/os/windowStore";
import { portfolioContent } from "@/data/content";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string;
}

const COMMAND_LIST = [
  "help",
  "dir",
  "ls",
  "cd",
  "pwd",
  "type",
  "cat",
  "open",
  "whoami",
  "neofetch",
  "cls",
  "clear",
  "ver",
  "mem",
  "echo",
  "date",
  "history",
  "theme",
  "sudo",
  "rm",
  "exit",
  "konami",
];

export default function TerminalApp() {
  const { openWindow, closeWindow, setThemeInverted, showAlert } = useWindowStore();
  const vfs = useRef<Record<string, VirtualFile>>(buildVirtualFileSystem());

  const [currentDir, setCurrentDir] = useState<string>("C:\\");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState<string>("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "line-dos-ver",
      type: "system",
      text: "RT-OS 95 [Version 4.00.950]\n(C) Copyright Raghvender Tyagi 2026. All rights reserved.\nType 'HELP' or 'DIR' for commands.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [lines]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getDirContents = useCallback((path: string): Record<string, VirtualFile> | null => {
    const clean = path.replace(/^C:\\?/i, "").replace(/\/+/g, "/").replace(/^\//, "").replace(/\/$/, "");
    if (!clean) return vfs.current;

    const parts = clean.split(/[\\/]/);
    let cur: VirtualFile | undefined = vfs.current[parts[0]];
    if (!cur || cur.type !== "dir" || !cur.children) return null;

    for (let i = 1; i < parts.length; i++) {
      cur = cur.children[parts[i]];
      if (!cur || cur.type !== "dir" || !cur.children) return null;
    }

    return cur.children;
  }, []);

  const handleCommand = useCallback(
    (cmdRaw: string) => {
      const trimmed = cmdRaw.trim();
      if (!trimmed) return;

      const newHistory = [...history, trimmed];
      setHistory(newHistory);
      setHistoryIndex(-1);

      const inputEntry: TerminalLine = {
        id: `input-${Date.now()}`,
        type: "input",
        text: `${currentDir}>${trimmed}`,
      };

      const args = trimmed.split(/\s+/);
      const cmd = args[0].toLowerCase();
      const param1 = args[1];

      let outputLines: string[] = [];
      let isError = false;

      switch (cmd) {
        case "help":
          outputLines = [
            "RT-OS 95 MS-DOS Prompt - Supported Commands:",
            "  DIR / LS          List directory files and folders",
            "  CD <dir>          Change current directory (e.g. CD PROJECTS, CD ..)",
            "  TYPE / CAT <file> Display contents of a text file",
            "  OPEN <target>     Launch window (projects, resume, contact, github)",
            "  WHOAMI            Display developer & systems identity",
            "  NEOFETCH          Display system architecture & ASCII specs",
            "  VER               Display operating system version",
            "  MEM               Display system memory heap & allocations",
            "  CLS / CLEAR       Clear screen",
            "  ECHO <text>       Display messages on screen",
            "  DATE              Display system date and time",
            "  HISTORY           View previously executed commands",
            "  THEME [INVERT]    Toggle retro themes",
            "  EXIT              Close MS-DOS Prompt",
          ];
          break;

        case "ver":
          outputLines = ["RT-OS 95 [Version 4.00.950] (Raghvender Tyagi Edition)"];
          break;

        case "mem":
          outputLines = [
            "Memory Type        Total       Used       Free",
            "----------------  --------   --------   --------",
            "Conventional        640K        48K       592K",
            "Upper                 0K         0K         0K",
            "Reserved            384K       384K         0K",
            "Extended (XMS)    64,512K     4,200K    60,312K",
            "----------------  --------   --------   --------",
            "Total memory      65,536K     4,632K    60,904K",
            "",
            "Agent State Memory: LangGraph Runtime Active",
          ];
          break;

        case "pwd":
          outputLines = [currentDir];
          break;

        case "dir":
        case "ls": {
          const target = getDirContents(currentDir);
          if (target) {
            outputLines = [
              ` Volume in drive C is RT-OS_95`,
              ` Directory of ${currentDir}`,
              "",
            ];
            const entries = Object.values(target);
            entries.forEach((f) => {
              const isD = f.type === "dir";
              const date = "10-17-26  12:00p";
              const size = isD ? "<DIR>        " : `${(f.content?.length || 1024).toString().padStart(8, " ")} `;
              outputLines.push(`${f.name.padEnd(16, " ")} ${size} ${date}`);
            });
            outputLines.push("");
            outputLines.push(`        ${entries.length} file(s)     1,048,576 bytes free`);
          } else {
            outputLines = [`Invalid directory`];
            isError = true;
          }
          break;
        }

        case "cd": {
          if (!param1 || param1 === "\\" || param1 === "/") {
            setCurrentDir("C:\\");
          } else if (param1 === "..") {
            if (currentDir !== "C:\\") {
              const parts = currentDir.replace(/^C:\\?/, "").split(/[\\/]/).filter(Boolean);
              parts.pop();
              setCurrentDir(parts.length ? `C:\\${parts.join("\\")}` : "C:\\");
            }
          } else {
            const candidate = currentDir === "C:\\" ? `C:\\${param1}` : `${currentDir}\\${param1}`;
            const target = getDirContents(candidate);
            if (target) {
              setCurrentDir(candidate);
            } else {
              outputLines = [`Invalid directory - ${param1}`];
              isError = true;
            }
          }
          break;
        }

        case "type":
        case "cat": {
          if (!param1) {
            outputLines = ["Required parameter missing"];
            isError = true;
            break;
          }
          const contents = getDirContents(currentDir);
          const target = contents ? contents[param1] : undefined;

          if (target) {
            if (target.type === "dir") {
              outputLines = [`Access denied - ${param1} is a directory`];
              isError = true;
            } else {
              outputLines = (target.content || "").split("\n");
            }
          } else {
            outputLines = [`File not found - ${param1}`];
            isError = true;
          }
          break;
        }

        case "open": {
          if (!param1) {
            outputLines = ["Specify target to open (e.g. open projects, open resume)"];
            isError = true;
            break;
          }
          const lower = param1.toLowerCase();
          if (lower === "projects") {
            openWindow("finder", { folder: "projects" });
            outputLines = ["Opening Projects folder..."];
          } else if (lower === "resume") {
            openWindow("pdfViewer");
            outputLines = ["Opening Resume viewer..."];
          } else if (lower === "contact" || lower === "mail") {
            openWindow("mail");
            outputLines = ["Opening Mail compose..."];
          } else if (lower === "github") {
            window.open("https://github.com/raghvender-tyagi", "_blank");
            outputLines = ["Navigating to GitHub profile..."];
          } else if (lower === "linkedin") {
            window.open("https://linkedin.com/in/raghvender-tyagi-05a881247", "_blank");
            outputLines = ["Navigating to LinkedIn profile..."];
          } else if (lower === "leetcode") {
            window.open("https://leetcode.com/u/RaghvenderTyagi450/", "_blank");
            outputLines = ["Navigating to LeetCode profile..."];
          } else {
            const prj = portfolioContent.projects.find((p) => p.slug === lower);
            if (prj) {
              openWindow("projectDetail", { slug: prj.slug, title: prj.title });
              outputLines = [`Launching ${prj.title}...`];
            } else {
              outputLines = [`Bad command or file name: ${param1}`];
              isError = true;
            }
          }
          break;
        }

        case "whoami":
          outputLines = [
            `${portfolioContent.meta.name}`,
            `${portfolioContent.meta.role}`,
            `Location: ${portfolioContent.meta.location}`,
            `Education: ${portfolioContent.about.education.institution}`,
          ];
          break;

        case "neofetch":
          outputLines = [
            "   .rrrrrr...kkkkk.      raghvender@rt-os95",
            "   .rrrrrr..kkkkkk.      ------------------",
            "   .bbbb.yyyyyyyyy.      OS: RT-OS 95 [Version 4.00.950]",
            "   .bbbbb.yyyyyyyy.      Host: KIET Group of Institutions '26",
            "   ................      Kernel: LangGraph Multi-Agent Engine",
            "   Processor: Python 3.12 / Java 21 / Docker Sandboxing",
            "   Memory: 64MB RAM / PostgreSQL + pgvector",
            "   Uptime: 99.99% Production Reliability",
          ];
          break;

        case "cls":
        case "clear":
          setLines([]);
          return;

        case "echo":
          outputLines = [args.slice(1).join(" ")];
          break;

        case "date":
          outputLines = [new Date().toString()];
          break;

        case "history":
          outputLines = newHistory.map((h, i) => `  ${i + 1}  ${h}`);
          break;

        case "theme":
          if (param1 === "invert") {
            setThemeInverted(true);
            outputLines = ["Monochrome invert enabled."];
          } else {
            setThemeInverted(false);
            outputLines = ["Default colors restored."];
          }
          break;

        case "sudo":
          outputLines = ["Access denied. Root operations managed by deterministic supervisor agents."];
          break;

        case "rm":
          if (trimmed.includes("-rf") || trimmed.includes("/s")) {
            showAlert(
              "Access Denied",
              "Nice try! Sandboxed Docker container cgroup limits protect host system files from deletion.",
              undefined,
              "error"
            );
            outputLines = ["Access denied."];
          } else {
            outputLines = ["Required parameter missing."];
          }
          break;

        case "exit": {
          const terminalWin = useWindowStore.getState().windows.find((w) => w.appId === "terminal");
          if (terminalWin) {
            closeWindow(terminalWin.id);
          }
          return;
        }

        case "konami":
          outputLines = ["Konami code activated. Overclocking chips..."];
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
          break;

        default:
          outputLines = [`Bad command or file name: ${cmd}`];
          isError = true;
      }

      setLines((prev) => [
        ...prev,
        inputEntry,
        ...outputLines.map((text, idx) => ({
          id: `out-${Date.now()}-${idx}`,
          type: isError ? ("error" as const) : ("output" as const),
          text,
        })),
      ]);
      setInputVal("");
    },
    [currentDir, history, getDirContents, openWindow, setThemeInverted, showAlert, closeWindow]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = inputVal.trim().split(/\s+/);
      if (parts.length === 1) {
        const match = COMMAND_LIST.find((c) => c.startsWith(parts[0].toLowerCase()));
        if (match) setInputVal(match);
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="h-full bg-black text-[#C0C0C0] font-mono text-xs p-3 overflow-y-auto flex flex-col justify-between cursor-text select-text"
    >
      <div
        role="region"
        aria-live="polite"
        className="space-y-1 font-mono text-xs leading-relaxed"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap ${
              line.type === "input"
                ? "text-white font-bold"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "system"
                ? "text-[#C0C0C0] border-b border-[#808080] pb-1 mb-2"
                : "text-[#C0C0C0]"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Line */}
      <div className="flex items-center gap-1 pt-2 border-t border-[#808080] font-mono text-xs text-white">
        <span className="text-white shrink-0">{currentDir}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="MS-DOS command prompt"
          className="flex-1 bg-transparent text-white outline-none font-mono text-xs border-none p-0"
        />
        <span className="w-2 h-4 bg-white inline-block animate-pulse" />
      </div>
    </div>
  );
}
