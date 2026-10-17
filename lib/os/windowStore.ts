"use client";

import { create } from "zustand";

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  collapsed: boolean;
  maximized: boolean;
  props?: Record<string, unknown>;
  restoreRect?: { x: number; y: number; w: number; h: number };
}

export interface DesktopIconPosition {
  id: string;
  label: string;
  appId: string;
  props?: Record<string, unknown>;
  x: number;
  y: number;
}

export interface RecentWindowItem {
  title: string;
  appId: string;
  props?: Record<string, unknown>;
}

export interface SystemAlertState {
  open: boolean;
  title: string;
  message: string;
  type?: "info" | "warning";
  onOk?: () => void;
}

interface WindowStoreState {
  windows: WindowInstance[];
  activeWindowId: string | null;
  nextZ: number;
  wallpaper: "dither" | "checker" | "grid" | "solid";
  themeInverted: boolean;
  soundEnabled: boolean;
  sidekickEnabled: boolean;
  screensaverEnabled: boolean;
  viewMode: "icon" | "list";
  desktopIcons: DesktopIconPosition[];
  recentWindows: RecentWindowItem[];
  systemAlert: SystemAlertState | null;
  isShutDown: boolean;
  isRestarting: boolean;

  // Actions
  openWindow: (
    appId: string,
    props?: Record<string, unknown>,
    customTitle?: string
  ) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  minimizeWindow: (id: string) => void;
  toggleCollapse: (id: string) => void;
  maximizeWindow: (id: string) => void;
  setWallpaper: (wp: "dither" | "checker" | "grid" | "solid") => void;
  setThemeInverted: (val: boolean) => void;
  setSoundEnabled: (val: boolean) => void;
  setSidekickEnabled: (val: boolean) => void;
  setScreensaverEnabled: (val: boolean) => void;
  setViewMode: (mode: "icon" | "list") => void;
  moveDesktopIcon: (id: string, x: number, y: number) => void;
  cleanUpDesktopIcons: () => void;
  resetDesktop: () => void;
  showAlert: (title: string, message: string, onOk?: () => void) => void;
  closeAlert: () => void;
  setShutDown: (val: boolean) => void;
  setRestarting: (val: boolean) => void;
  initFromStorage: () => void;
}

const STORAGE_KEY = "rt_os_state_v1";

// Default desktop icon positions aligned on the right side
export const DEFAULT_DESKTOP_ICONS: DesktopIconPosition[] = [
  { id: "mac-hd", label: "Macintosh HD", appId: "aboutMac", x: 24, y: 48 },
  { id: "projects", label: "Projects", appId: "finder", props: { folder: "projects" }, x: 24, y: 112 },
  { id: "experience", label: "Experience", appId: "simpleText", props: { file: "experience.txt" }, x: 24, y: 176 },
  { id: "about", label: "About", appId: "simpleText", props: { file: "about.txt" }, x: 24, y: 240 },
  { id: "skills", label: "Skills", appId: "aboutMac", props: { tab: "skills" }, x: 24, y: 304 },
  { id: "achievements", label: "Achievements", appId: "finder", props: { folder: "achievements" }, x: 24, y: 368 },
  { id: "resume", label: "Resume.pdf", appId: "pdfViewer", x: 24, y: 432 },
  { id: "contact", label: "Contact", appId: "mail", x: 24, y: 496 },
  { id: "terminal", label: "Terminal", appId: "terminal", x: 24, y: 560 },
  { id: "trash", label: "Trash", appId: "trash", x: 24, y: 624 },
];

// Default Welcome window geometry
const DEFAULT_WELCOME_WINDOW: WindowInstance = {
  id: "welcome-main",
  appId: "welcome",
  title: "welcome.app",
  x: 48,
  y: 56,
  w: 780,
  h: 520,
  z: 10,
  minimized: false,
  collapsed: false,
  maximized: false,
};

function saveToLocalStorage(state: {
  windows: WindowInstance[];
  wallpaper: string;
  themeInverted: boolean;
  soundEnabled: boolean;
  sidekickEnabled: boolean;
  screensaverEnabled: boolean;
  viewMode: string;
  desktopIcons: DesktopIconPosition[];
}) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // Ignore storage quota errors
  }
}

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  windows: [DEFAULT_WELCOME_WINDOW],
  activeWindowId: "welcome-main",
  nextZ: 20,
  wallpaper: "dither",
  themeInverted: false,
  soundEnabled: false,
  sidekickEnabled: true,
  screensaverEnabled: true,
  viewMode: "icon",
  desktopIcons: DEFAULT_DESKTOP_ICONS,
  recentWindows: [{ title: "welcome.app", appId: "welcome" }],
  systemAlert: null,
  isShutDown: false,
  isRestarting: false,

  openWindow: (appId, props, customTitle) => {
    const { windows, nextZ, recentWindows } = get();

    // Check singleton apps: welcome, terminal, aboutMac, controlPanel
    const isSingleton = ["welcome", "terminal", "aboutMac", "controlPanel", "chooser", "pdfViewer"].includes(appId);
    if (isSingleton) {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        get().focusWindow(existing.id);
        if (existing.minimized) {
          set({
            windows: windows.map((w) => (w.id === existing.id ? { ...w, minimized: false } : w)),
          });
        }
        return;
      }
    }

    // Default sizes per app
    let w = 640;
    let h = 460;
    let title = customTitle || `${appId}.app`;

    if (appId === "welcome") {
      w = 780;
      h = 520;
      title = "welcome.app";
    } else if (appId === "finder") {
      w = 680;
      h = 440;
      title = props?.folder === "achievements" ? "achievements.finder" : "projects.finder";
    } else if (appId === "terminal") {
      w = 620;
      h = 420;
      title = "terminal.sys";
    } else if (appId === "aboutMac") {
      w = 580;
      h = 460;
      title = "About This Mac";
    } else if (appId === "simpleText") {
      w = 560;
      h = 440;
      title = (props?.file as string) || "document.txt";
    } else if (appId === "mail") {
      w = 540;
      h = 460;
      title = "mail.app";
    } else if (appId === "pdfViewer") {
      w = 660;
      h = 540;
      title = "Raghvender_Tyagi_Resume.pdf";
    } else if (appId === "controlPanel") {
      w = 500;
      h = 420;
      title = "Control Panel";
    } else if (appId === "projectDetail") {
      w = 660;
      h = 500;
      title = (props?.title as string) || "project.info";
    } else if (appId === "getInfo") {
      w = 420;
      h = 460;
      title = `Get Info: ${props?.name || "Item"}`;
    } else if (appId === "chooser") {
      w = 480;
      h = 360;
      title = "Chooser";
    }

    // Cascade offset from last window or centered
    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

    // Responsive clamp for dimensions
    if (w > viewportW - 32) w = Math.max(320, viewportW - 32);
    if (h > viewportH - 64) h = Math.max(260, viewportH - 64);

    let x = 60 + ((windows.length * 28) % 180);
    let y = 60 + ((windows.length * 28) % 160);

    // Clamp inside viewport
    if (x + w > viewportW - 40) x = Math.max(16, viewportW - w - 40);
    if (y + h > viewportH - 40) y = Math.max(40, viewportH - h - 40);

    const newId = `${appId}-${Date.now()}`;
    const newWindow: WindowInstance = {
      id: newId,
      appId,
      title,
      x,
      y,
      w,
      h,
      z: nextZ,
      minimized: false,
      collapsed: false,
      maximized: false,
      props,
    };

    const newRecent = [{ title, appId, props }, ...recentWindows.filter((r) => r.title !== title)].slice(0, 3);

    // Reflect in URL hash
    if (typeof window !== "undefined") {
      window.location.hash = `#/${appId}${props?.folder ? `/${props.folder}` : props?.file ? `/${props.file}` : ""}`;
    }

    const updatedWindows = [...windows, newWindow];
    set({
      windows: updatedWindows,
      activeWindowId: newId,
      nextZ: nextZ + 1,
      recentWindows: newRecent,
    });

    saveToLocalStorage({
      windows: updatedWindows,
      wallpaper: get().wallpaper,
      themeInverted: get().themeInverted,
      soundEnabled: get().soundEnabled,
      sidekickEnabled: get().sidekickEnabled,
      screensaverEnabled: get().screensaverEnabled,
      viewMode: get().viewMode,
      desktopIcons: get().desktopIcons,
    });
  },

  closeWindow: (id) => {
    const { windows } = get();
    const updated = windows.filter((w) => w.id !== id);
    let nextActive: string | null = null;

    if (updated.length > 0) {
      const topRemaining = [...updated].sort((a, b) => b.z - a.z)[0];
      nextActive = topRemaining ? topRemaining.id : null;
    }

    set({
      windows: updated,
      activeWindowId: nextActive,
    });

    saveToLocalStorage({
      windows: updated,
      wallpaper: get().wallpaper,
      themeInverted: get().themeInverted,
      soundEnabled: get().soundEnabled,
      sidekickEnabled: get().sidekickEnabled,
      screensaverEnabled: get().screensaverEnabled,
      viewMode: get().viewMode,
      desktopIcons: get().desktopIcons,
    });
  },

  closeAllWindows: () => {
    set({ windows: [], activeWindowId: null });
    saveToLocalStorage({
      windows: [],
      wallpaper: get().wallpaper,
      themeInverted: get().themeInverted,
      soundEnabled: get().soundEnabled,
      sidekickEnabled: get().sidekickEnabled,
      screensaverEnabled: get().screensaverEnabled,
      viewMode: get().viewMode,
      desktopIcons: get().desktopIcons,
    });
  },

  focusWindow: (id) => {
    const { windows, nextZ, activeWindowId } = get();
    if (activeWindowId === id) return;

    const target = windows.find((w) => w.id === id);
    if (!target) return;

    const updated = windows.map((w) =>
      w.id === id ? { ...w, z: nextZ, minimized: false } : w
    );

    if (typeof window !== "undefined") {
      window.location.hash = `#/${target.appId}`;
    }

    set({
      windows: updated,
      activeWindowId: id,
      nextZ: nextZ + 1,
    });
  },

  moveWindow: (id, x, y) => {
    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

    // Ensure title bar is always reachable: top >= 32px (below menu bar), keep at least 64px inside horizontally
    const clampedY = Math.max(32, Math.min(y, viewportH - 40));
    const targetWin = get().windows.find((w) => w.id === id);
    const winW = targetWin ? targetWin.w : 400;
    const clampedX = Math.max(-(winW - 64), Math.min(x, viewportW - 64));

    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, x: clampedX, y: clampedY, maximized: false } : w
      ),
    });
  },

  resizeWindow: (id, w, h) => {
    const minW = 280;
    const minH = 180;
    set({
      windows: get().windows.map((win) =>
        win.id === id
          ? {
              ...win,
              w: Math.max(minW, w),
              h: Math.max(minH, h),
              maximized: false,
            }
          : win
      ),
    });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      ),
    });
  },

  toggleCollapse: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, collapsed: !w.collapsed } : w
      ),
    });
  },

  maximizeWindow: (id) => {
    const { windows } = get();
    const target = windows.find((w) => w.id === id);
    if (!target) return;

    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

    if (target.maximized) {
      // Restore
      const prev = target.restoreRect || { x: 60, y: 60, w: 640, h: 440 };
      set({
        windows: windows.map((w) =>
          w.id === id
            ? {
                ...w,
                x: prev.x,
                y: prev.y,
                w: prev.w,
                h: prev.h,
                maximized: false,
              }
            : w
        ),
      });
    } else {
      // Maximize
      const currentRect = { x: target.x, y: target.y, w: target.w, h: target.h };
      set({
        windows: windows.map((w) =>
          w.id === id
            ? {
                ...w,
                x: 12,
                y: 40,
                w: viewportW - 24,
                h: viewportH - 52,
                maximized: true,
                restoreRect: currentRect,
              }
            : w
        ),
      });
    }
  },

  setWallpaper: (wallpaper) => {
    set({ wallpaper });
  },

  setThemeInverted: (themeInverted) => {
    set({ themeInverted });
  },

  setSoundEnabled: (soundEnabled) => {
    set({ soundEnabled });
  },

  setSidekickEnabled: (sidekickEnabled) => {
    set({ sidekickEnabled });
    try {
      localStorage.setItem("sys7_sidekick", String(sidekickEnabled));
    } catch {}
  },

  setScreensaverEnabled: (screensaverEnabled) => {
    set({ screensaverEnabled });
  },

  setViewMode: (viewMode) => {
    set({ viewMode });
  },

  moveDesktopIcon: (id, rawX, rawY) => {
    // Snap to 8px grid
    const snapGrid = 8;
    const x = Math.round(rawX / snapGrid) * snapGrid;
    const y = Math.round(rawY / snapGrid) * snapGrid;

    const updated = get().desktopIcons.map((icon) =>
      icon.id === id ? { ...icon, x, y } : icon
    );
    set({ desktopIcons: updated });

    saveToLocalStorage({
      windows: get().windows,
      wallpaper: get().wallpaper,
      themeInverted: get().themeInverted,
      soundEnabled: get().soundEnabled,
      sidekickEnabled: get().sidekickEnabled,
      screensaverEnabled: get().screensaverEnabled,
      viewMode: get().viewMode,
      desktopIcons: updated,
    });
  },

  cleanUpDesktopIcons: () => {
    set({ desktopIcons: DEFAULT_DESKTOP_ICONS });
    saveToLocalStorage({
      windows: get().windows,
      wallpaper: get().wallpaper,
      themeInverted: get().themeInverted,
      soundEnabled: get().soundEnabled,
      sidekickEnabled: get().sidekickEnabled,
      screensaverEnabled: get().screensaverEnabled,
      viewMode: get().viewMode,
      desktopIcons: DEFAULT_DESKTOP_ICONS,
    });
  },

  resetDesktop: () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    set({
      windows: [DEFAULT_WELCOME_WINDOW],
      activeWindowId: "welcome-main",
      nextZ: 20,
      wallpaper: "dither",
      themeInverted: false,
      soundEnabled: false,
      sidekickEnabled: true,
      screensaverEnabled: true,
      viewMode: "icon",
      desktopIcons: DEFAULT_DESKTOP_ICONS,
      recentWindows: [{ title: "welcome.app", appId: "welcome" }],
      systemAlert: null,
      isShutDown: false,
      isRestarting: false,
    });
  },

  showAlert: (title, message, onOk) => {
    set({
      systemAlert: {
        open: true,
        title,
        message,
        onOk,
      },
    });
  },

  closeAlert: () => {
    set({ systemAlert: null });
  },

  setShutDown: (isShutDown) => {
    set({ isShutDown });
  },

  setRestarting: (isRestarting) => {
    set({ isRestarting });
  },

  initFromStorage: () => {
    try {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.windows) && parsed.windows.length > 0) {
          set({
            windows: parsed.windows,
            wallpaper: parsed.wallpaper || "dither",
            themeInverted: !!parsed.themeInverted,
            soundEnabled: !!parsed.soundEnabled,
            sidekickEnabled: parsed.sidekickEnabled ?? true,
            screensaverEnabled: parsed.screensaverEnabled ?? true,
            viewMode: parsed.viewMode || "icon",
            desktopIcons: parsed.desktopIcons || DEFAULT_DESKTOP_ICONS,
            activeWindowId: parsed.windows[parsed.windows.length - 1]?.id || null,
          });
        }
      }

      // Check URL hash for deep link
      const hash = window.location.hash.replace("#/", "");
      if (hash) {
        const parts = hash.split("/");
        const appId = parts[0];
        if (appId) {
          if (appId === "finder" && parts[1]) {
            get().openWindow("finder", { folder: parts[1] });
          } else if (appId === "project" && parts[1]) {
            get().openWindow("projectDetail", { slug: parts[1] });
          } else {
            get().openWindow(appId);
          }
        }
      }
    } catch {
      // fallback to defaults on corrupted json
    }
  },
}));
