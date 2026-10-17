"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ContextMenuItem {
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  isDivider?: boolean;
  onClick?: () => void;
  submenu?: ContextMenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  items,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number | null>(
    null
  );
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [onClose, hoverTimeout]);

  // Clamp menu inside viewport
  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

  const menuWidth = 180;
  const menuHeight = items.length * 24 + 10;
  const posX = Math.min(x, viewportW - menuWidth - 10);
  const posY = Math.min(y, viewportH - menuHeight - 40);

  const handleMouseEnter = (idx: number, item: ContextMenuItem) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timer = setTimeout(() => {
      if (item.submenu) {
        setActiveSubmenuIndex(idx);
      } else {
        setActiveSubmenuIndex(null);
      }
    }, 150);
    setHoverTimeout(timer);
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      className="fixed z-[120] bg-[#C0C0C0] bevel-out p-1 min-w-[170px] shadow-[3px_3px_0_rgba(0,0,0,0.4)] select-none text-black font-pixel text-[11px]"
      style={{ left: `${posX}px`, top: `${posY}px` }}
    >
      {items.map((item, idx) => {
        if (item.isDivider) {
          return (
            <div
              key={idx}
              className="my-1 border-t border-[#808080] border-b border-b-white"
            />
          );
        }

        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isSubmenuOpen = activeSubmenuIndex === idx;

        return (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => handleMouseEnter(idx, item)}
          >
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                if (!hasSubmenu) {
                  item.onClick?.();
                  onClose();
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-1 text-left ${
                item.disabled
                  ? "text-[#808080] cursor-not-allowed text-shadow-[1px_1px_0_#fff]"
                  : "hover:bg-[#000080] hover:text-white cursor-pointer active:bg-[#000080] active:text-white"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span className="truncate">{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="text-[9px] opacity-75 ml-3 font-mono">
                  {item.shortcut}
                </span>
              )}
              {hasSubmenu && <span className="ml-2 font-mono">►</span>}
            </button>

            {/* Cascading Submenu */}
            {hasSubmenu && isSubmenuOpen && (
              <div
                role="menu"
                className="absolute left-[98%] -top-1 bg-[#C0C0C0] bevel-out p-1 min-w-[150px] shadow-[3px_3px_0_rgba(0,0,0,0.4)] z-[130]"
              >
                {item.submenu?.map((sub, sIdx) => {
                  if (sub.isDivider) {
                    return (
                      <div
                        key={sIdx}
                        className="my-1 border-t border-[#808080] border-b border-b-white"
                      />
                    );
                  }
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      role="menuitem"
                      disabled={sub.disabled}
                      onClick={() => {
                        if (sub.disabled) return;
                        sub.onClick?.();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1 text-left hover:bg-[#000080] hover:text-white cursor-pointer"
                    >
                      <span>{sub.label}</span>
                      {sub.shortcut && (
                        <span className="text-[9px] opacity-75 font-mono">
                          {sub.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

