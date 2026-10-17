"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWindowStore } from "@/lib/os/windowStore";
import { soundManager } from "@/lib/os/sound";
import { portfolioContent } from "@/data/content";

interface MenuDropdownItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export default function MenuBarOS() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    closeAllWindows,
    viewMode,
    setViewMode,
    cleanUpDesktopIcons,
    resetDesktop,
    showAlert,
    setShutDown,
    setRestarting,
    sidekickEnabled,
    setSidekickEnabled,
    recentWindows,
    soundEnabled,
  } = useWindowStore();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hours, setHours] = useState<string>("--");
  const [minutes, setMinutes] = useState<string>("--");
  const [colonVisible, setColonVisible] = useState<boolean>(true);
  const navRef = useRef<HTMLElement>(null);

  // Active window title for display in MenuBar
  const activeWin = windows.find((w) => w.id === activeWindowId);
  const activeAppName = activeWin ? activeWin.title.replace(/\.(app|sys|txt|finder|game|info)$/, "") : "Finder";

  // Clock with blinking colon
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      h = h % 12 || 12;
      setHours(h.toString());
      setMinutes(m);
      setColonVisible((v) => !v);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Global Keyboard Shortcuts (Cmd/Ctrl+W, Cmd/Ctrl+Shift+W, etc.)
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!isCmdOrCtrl) return;

      if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (e.shiftKey) {
          closeAllWindows();
        } else if (activeWindowId) {
          closeWindow(activeWindowId);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [activeWindowId, closeAllWindows, closeWindow]);

  const toggleMenu = (menuName: string) => {
    soundManager.playClick(soundEnabled);
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuHover = (menuName: string) => {
    if (openMenu !== null) {
      setOpenMenu(menuName);
    }
  };

  const handleAction = (fn?: () => void) => {
    if (fn) {
      soundManager.playClick(soundEnabled);
      fn();
    }
    setOpenMenu(null);
  };

  // Dropdown item definitions
  const logoItems: MenuDropdownItem[] = [
    {
      label: "About This Mac...",
      action: () => openWindow("aboutMac"),
    },
    {
      label: "Control Panel",
      action: () => openWindow("controlPanel"),
    },
    { divider: true, label: "" },
    ...recentWindows.map((rw) => ({
      label: `Recent: ${rw.title}`,
      action: () => openWindow(rw.appId, rw.props, rw.title),
    })),
  ];

  const fileItems: MenuDropdownItem[] = [
    {
      label: "Open Projects",
      action: () => openWindow("finder", { folder: "projects" }),
    },
    {
      label: "Download Resume",
      action: () => openWindow("pdfViewer"),
    },
    {
      label: "Email Me",
      action: () => openWindow("mail"),
    },
    { divider: true, label: "" },
    {
      label: "Close Window",
      shortcut: "⌘W",
      action: () => activeWindowId && closeWindow(activeWindowId),
      disabled: !activeWindowId,
    },
    {
      label: "Close All Windows",
      shortcut: "⇧⌘W",
      action: () => closeAllWindows(),
      disabled: windows.length === 0,
    },
  ];

  const editItems: MenuDropdownItem[] = [
    {
      label: "Copy Email Address",
      action: () => {
        navigator.clipboard.writeText(portfolioContent.contact.email);
        showAlert(
          "Clipboard Alert",
          `Copied ${portfolioContent.contact.email} to your clipboard.`
        );
      },
    },
    {
      label: "Select All Icons",
      action: () => {
        soundManager.playClick(soundEnabled);
      },
    },
  ];

  const viewItems: MenuDropdownItem[] = [
    {
      label: `${viewMode === "icon" ? "✓ " : "   "}by Icon`,
      action: () => setViewMode("icon"),
    },
    {
      label: `${viewMode === "list" ? "✓ " : "   "}by List`,
      action: () => setViewMode("list"),
    },
    { divider: true, label: "" },
    {
      label: "Clean Up Desktop",
      action: () => cleanUpDesktopIcons(),
    },
  ];

  const specialItems: MenuDropdownItem[] = [
    {
      label: "Restart",
      action: () => {
        setRestarting(true);
        setTimeout(() => {
          setRestarting(false);
          resetDesktop();
        }, 1200);
      },
    },
    {
      label: "Shut Down",
      action: () => setShutDown(true),
    },
    { divider: true, label: "" },
    {
      label: "Empty Trash",
      action: () => {
        showAlert(
          "Trash Status",
          "Trash is already empty. Zero abandonware found. Everything shipped to production!"
        );
      },
    },
    {
      label: "Reset Desktop",
      action: () => resetDesktop(),
    },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 h-8 bg-[#BFBFBF] border-b-2 border-black z-50 flex items-center justify-between px-2 select-none text-black font-pixel text-[11px]"
    >
      {/* Left Menus */}
      <div className="flex items-center h-full">
        {/* Apple / RT Logo Dropdown */}
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => toggleMenu("logo")}
            onMouseEnter={() => handleMenuHover("logo")}
            aria-expanded={openMenu === "logo"}
            className={`h-full px-2 flex items-center gap-1 font-bold cursor-pointer ${
              openMenu === "logo" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            <span className="bg-black text-white px-1 py-0.5 border border-black text-xs">
              RT
            </span>
          </button>
          {openMenu === "logo" && renderDropdown(logoItems, handleAction)}
        </div>

        {/* File Menu */}
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => toggleMenu("file")}
            onMouseEnter={() => handleMenuHover("file")}
            aria-expanded={openMenu === "file"}
            className={`h-full px-2.5 flex items-center cursor-pointer uppercase ${
              openMenu === "file" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            File
          </button>
          {openMenu === "file" && renderDropdown(fileItems, handleAction)}
        </div>

        {/* Edit Menu */}
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => toggleMenu("edit")}
            onMouseEnter={() => handleMenuHover("edit")}
            aria-expanded={openMenu === "edit"}
            className={`h-full px-2.5 flex items-center cursor-pointer uppercase ${
              openMenu === "edit" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            Edit
          </button>
          {openMenu === "edit" && renderDropdown(editItems, handleAction)}
        </div>

        {/* View Menu */}
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => toggleMenu("view")}
            onMouseEnter={() => handleMenuHover("view")}
            aria-expanded={openMenu === "view"}
            className={`h-full px-2.5 flex items-center cursor-pointer uppercase ${
              openMenu === "view" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            View
          </button>
          {openMenu === "view" && renderDropdown(viewItems, handleAction)}
        </div>

        {/* Special Menu */}
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => toggleMenu("special")}
            onMouseEnter={() => handleMenuHover("special")}
            aria-expanded={openMenu === "special"}
            className={`h-full px-2.5 flex items-center cursor-pointer uppercase ${
              openMenu === "special" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            Special
          </button>
          {openMenu === "special" && renderDropdown(specialItems, handleAction)}
        </div>

        {/* Active Application Name Badge */}
        <div className="hidden sm:flex items-center ml-2 pl-2 border-l border-black/30 text-[10px] text-black font-bold uppercase tracking-wider">
          <span>{activeAppName}</span>
        </div>
      </div>

      {/* Right Tools & Clock */}
      <div className="flex items-center h-full gap-2">
        {/* Recruiter "Classic view" button */}
        <Link
          href="/classic"
          className="h-6 px-2 flex items-center bg-[#D9D9D9] hover:bg-black hover:text-white border-2 border-black text-[10px] uppercase font-bold tracking-wider transition-colors duration-75"
          title="Open fast accessible single-page recruiter view"
        >
          Classic View ↗
        </Link>

        {/* Sidekick Toggle */}
        <button
          type="button"
          onClick={() => setSidekickEnabled(!sidekickEnabled)}
          className="hidden md:flex items-center h-6 px-2 bg-[#D9D9D9] hover:bg-black hover:text-white border-2 border-black text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-colors duration-75"
        >
          Sidekick: {sidekickEnabled ? "ON" : "OFF"}
        </button>

        {/* Blinking Clock */}
        <div className="px-2 h-full flex items-center border-l border-black/30 text-[11px] font-mono font-bold tracking-tight">
          <span>{hours}</span>
          <span className={colonVisible ? "opacity-100" : "opacity-0"}>:</span>
          <span>{minutes}</span>
        </div>
      </div>
    </header>
  );
}

function renderDropdown(
  items: MenuDropdownItem[],
  onSelect: (action?: () => void) => void
) {
  return (
    <div
      role="menu"
      className="absolute top-8 left-0 min-w-56 bg-[#D9D9D9] border-2 border-black mac-shadow p-1 z-50 font-pixel text-xs animate-in fade-in duration-75 select-none"
    >
      {items.map((item, idx) => {
        if (item.divider) {
          return <div key={idx} className="border-t-2 border-black my-1" />;
        }
        return (
          <button
            key={idx}
            type="button"
            disabled={item.disabled}
            onClick={() => onSelect(item.action)}
            className={`w-full px-2.5 py-1 text-left flex items-center justify-between uppercase tracking-wider ${
              item.disabled
                ? "text-black/40 cursor-default"
                : "text-black hover:bg-black hover:text-white cursor-pointer active:bg-neutral-800"
            }`}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="font-mono text-[10px] ml-4 text-black/60 group-hover:text-white">
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
