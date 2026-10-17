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
  "ls",
  "cd",
  "pwd",
  "cat",
  "open",
  "whoami",
  "neofetch",
  "clear",
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

  const [currentDir, setCurrentDir] = useState<string>("/");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState<string>("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "line-welcome",
      type: "system",
      text: "Welcome to RT-OS 1.0. Type 'help' to begin.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [lines]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getDirContents = useCallback((path: string): Record<string, VirtualFile> | null => {
    if (path === "/" || path === "") return vfs.current;
    const cleanPath = path.replace(/^\//, "").replace(/\/$/, "");
    const parts = cleanPath.split("/");

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

      // Add user input line
      const inputEntry: TerminalLine = {
        id: `input-${Date.now()}`,
        type: "input",
        text: `${currentDir} $ ${trimmed}`,
      };

      const args = trimmed.split(/\s+/);
      const cmd = args[0].toLowerCase();
      const param1 = args[1];

      let outputLines: string[] = [];
      let isError = false;

      switch (cmd) {
        case "help":
          outputLines = [
            "RT-OS 1.0 Virtual Terminal - Available commands:",
            "  help              Show this help guide",
            "  ls [path]         List directory contents",
            "  cd <dir>          Change directory (e.g. cd projects, cd ..)",
            "  pwd               Print working directory",
            "  cat <file>        Read file contents (e.g. cat experience.txt)",
            "  open <target>     Open window (projects, resume, contact, etc.)",
            "  whoami            Print user and engineering identity",
            "  neofetch          Display system architecture & ASCII specs",
            "  clear             Clear the terminal screen",
            "  echo <text>       Print text to standard output",
            "  date              Print current system date and time",
            "  history           Show command history",
            "  theme invert      Toggle inverted monochrome mode",
            "  theme normal      Restore standard monochrome theme",
            "  sudo <cmd>        Run elevated privileges",
            "  rm -rf            Attempt to delete filesystem",
            "  konami            Trigger the chip overclock screensaver",
            "  exit              Close the terminal window",
          ];
          break;

        case "pwd":
          outputLines = [currentDir];
          break;

        case "ls": {
          const targetDir = param1 ? (param1.startsWith("/") ? param1 : `${currentDir === "/" ? "" : currentDir}/${param1}`) : currentDir;
          const contents = getDirContents(targetDir);
          if (contents) {
            outputLines = Object.values(contents).map(
              (f) => `${f.name}${f.type === "dir" ? "/" : ""}`
            );
          } else {
            outputLines = [`ls: cannot access '${param1}': No such file or directory`];
            isError = true;
          }
          break;
        }

        case "cd": {
          if (!param1 || param1 === "/" || param1 === "~") {
            setCurrentDir("/");
          } else if (param1 === "..") {
            if (currentDir !== "/") {
              const parts = currentDir.split("/").filter(Boolean);
              parts.pop();
              setCurrentDir(parts.length ? `/${parts.join("/")}` : "/");
            }
          } else {
            const nextPath = param1.startsWith("/") ? param1 : `${currentDir === "/" ? "" : currentDir}/${param1}`;
            const target = getDirContents(nextPath);
            if (target) {
              setCurrentDir(nextPath.replace(/\/+/g, "/"));
            } else {
              outputLines = [`cd: ${param1}: No such file or directory`];
              isError = true;
            }
          }
          break;
        }

        case "cat": {
          if (!param1) {
            outputLines = ["cat: missing file operand"];
            isError = true;
            break;
          }

          // Search current dir first
          const contents = getDirContents(currentDir);
          const target = contents ? contents[param1] : undefined;

          if (target) {
            if (target.type === "dir") {
              outputLines = [`cat: ${param1}: Is a directory`];
              isError = true;
            } else {
              outputLines = (target.content || "").split("\n");
            }
          } else {
            outputLines = [`cat: ${param1}: No such file or directory`];
            isError = true;
          }
          break;
        }

        case "open": {
          if (!param1) {
            outputLines = ["open: specify target (projects, resume, contact, github, etc.)"];
            isError = true;
            break;
          }
          const lower = param1.toLowerCase();
          if (lower === "projects") {
            openWindow("finder", { folder: "projects" });
            outputLines = ["Opening Projects folder in Finder..."];
          } else if (lower === "resume") {
            openWindow("pdfViewer");
            outputLines = ["Opening Resume viewer..."];
          } else if (lower === "contact" || lower === "mail") {
            openWindow("mail");
            outputLines = ["Opening Mail compose..."];
          } else if (lower === "github") {
            window.open("https://github.com/raghvender-tyagi", "_blank");
            outputLines = ["Opening GitHub profile in new tab..."];
          } else if (lower === "linkedin") {
            window.open("https://linkedin.com/in/raghvender-tyagi-05a881247", "_blank");
            outputLines = ["Opening LinkedIn profile in new tab..."];
          } else if (lower === "leetcode") {
            window.open("https://leetcode.com/u/RaghvenderTyagi450/", "_blank");
            outputLines = ["Opening LeetCode profile in new tab..."];
          } else {
            // Check project slug
            const prj = portfolioContent.projects.find((p) => p.slug === lower);
            if (prj) {
              openWindow("projectDetail", { slug: prj.slug, title: `${prj.slug}.project` });
              outputLines = [`Opening project: ${prj.title}...`];
            } else {
              outputLines = [`open: unknown target '${param1}'`];
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
            "   .########.      raghvender@rt-os",
            "   #........#      ----------------",
            " .###.####.###.    OS: RT-OS 1.0 (Mac System 7 Edition)",
            " .#..........#.    Host: KIET Group of Institutions '27",
            " .#.###..###.#.    Kernel: LangGraph Multi-Agent Engine",
            " .#.#w#..#w#.#.    Uptime: 99.99% Production Reliability",
            " .#..........#.    Shell: rtsh 1.0",
            " .#.########.#.    CPU: Python 3.12 / Java 21 / Docker cgroups",
            " .#..######..#.    Memory: 16MB Fast RAM / PostgreSQL pgvector",
            " ..##########..    Architecture: Distributed P2P + Sandbox",
          ];
          break;

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
            outputLines = ["Theme set to INVERTED monochrome."];
          } else {
            setThemeInverted(false);
            outputLines = ["Theme set to STANDARD monochrome."];
          }
          break;

        case "sudo":
          outputLines = ["nice try. All root operations are handled by deterministic supervisor agents."];
          break;

        case "rm":
          if (trimmed.includes("-rf") || trimmed.includes("-r")) {
            showAlert(
              "Security Sandbox Violation",
              "Nice try! Sandboxed Docker cgroup caps and read-only host filesystem prevented system deletion."
            );
            outputLines = ["rm: operation denied by security hypervisor."];
          } else {
            outputLines = ["rm: missing operand"];
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
          outputLines = ["Triggering Konami overclock screensaver..."];
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "a" })
          );
          break;

        default:
          outputLines = [`command not found: ${cmd}. Try 'help' for documentation.`];
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

  // Keyboard navigation for history (Up/Down) & Tab autocompletion
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
      // Tab autocompletion
      const parts = inputVal.trim().split(/\s+/);
      if (parts.length === 1) {
        // Complete command
        const match = COMMAND_LIST.find((c) => c.startsWith(parts[0].toLowerCase()));
        if (match) setInputVal(match);
      } else if (parts.length === 2 && (parts[0] === "cat" || parts[0] === "cd" || parts[0] === "ls")) {
        // Complete filename
        const contents = getDirContents(currentDir);
        if (contents) {
          const files = Object.keys(contents);
          const match = files.find((f) => f.startsWith(parts[1]));
          if (match) setInputVal(`${parts[0]} ${match}`);
        }
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === "l") {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="h-full bg-black text-white font-mono text-xs p-3 overflow-y-auto flex flex-col justify-between cursor-text select-text"
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
                ? "text-neutral-300 font-bold"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "system"
                ? "text-neutral-400 border-b border-white/20 pb-1 mb-2"
                : "text-white"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Line */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-white/20 font-mono text-xs text-white">
        <span className="text-white/70">{currentDir} $</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command prompt"
          className="flex-1 bg-transparent text-white outline-none font-mono text-xs border-none p-0"
        />
        <span className="w-2 h-4 bg-white inline-block animate-pulse" />
      </div>
    </div>
  );
}
