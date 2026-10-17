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
  type?: "info" | "warning" | "error" | "question";
  onOk?: () => void;
  onCancel?: () => void;
  buttons?: "ok" | "okCancel" | "yesNo";
}

interface WindowStoreState {
  windows: WindowInstance[];
  activeWindowId: string | null;
  nextZ: number;
  wallpaper: "teal" | "dither" | "checker" | "solid" | "grid";
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
  setWallpaper: (wp: "teal" | "dither" | "checker" | "solid" | "grid") => void;
  setThemeInverted: (val: boolean) => void;
  setSoundEnabled: (val: boolean) => void;
  setSidekickEnabled: (val: boolean) => void;
  setScreensaverEnabled: (val: boolean) => void;
  setViewMode: (mode: "icon" | "list") => void;
  moveDesktopIcon: (id: string, x: number, y: number) => void;
  cleanUpDesktopIcons: () => void;
  resetDesktop: () => void;
  showAlert: (
    title: string,
    message: string,
    onOk?: () => void,
    type?: "info" | "warning" | "error" | "question"
  ) => void;
  closeAlert: () => void;
  setShutDown: (val: boolean) => void;
  setRestarting: (val: boolean) => void;
  initFromStorage: () => void;
}

const STORAGE_KEY = "rt_os_95_state_v1";

// Fixed cell size: 96px width x 100px height.
// Arranged in left column (x: 16), wrapping to next column (x: 120).
export const DEFAULT_DESKTOP_ICONS: DesktopIconPosition[] = [
  // Column 1 (x: 16)
  { id: "my-computer", label: "My Computer", appId: "aboutMac", x: 16, y: 16 },
  { id: "network", label: "Network", appId: "chooser", x: 16, y: 120 },
  { id: "projects", label: "Projects", appId: "finder", props: { folder: "projects" }, x: 16, y: 224 },
  { id: "achievements", label: "Achievements", appId: "finder", props: { folder: "achievements" }, x: 16, y: 328 },
  { id: "experience", label: "Experience.txt", appId: "simpleText", props: { file: "experience.txt" }, x: 16, y: 432 },
  { id: "about", label: "About.txt", appId: "simpleText", props: { file: "about.txt" }, x: 16, y: 536 },
  { id: "skills", label: "Skills", appId: "aboutMac", props: { tab: "skills" }, x: 16, y: 640 },

  // Column 2 (x: 120)
  { id: "resume", label: "Resume.pdf", appId: "pdfViewer", x: 120, y: 16 },
  { id: "mail", label: "Inbox", appId: "mail", x: 120, y: 120 },
  { id: "terminal", label: "MS-DOS Prompt", appId: "terminal", x: 120, y: 224 },
  { id: "trash", label: "Recycle Bin", appId: "trash", x: 120, y: 328 },
];

export function getCenteredWelcomeWindow(): WindowInstance {
  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;
  const w = Math.min(760, Math.max(360, viewportW - 40));
  const h = Math.min(500, Math.max(340, viewportH - 90));
  const x = Math.max(16, Math.floor((viewportW - w) / 2));
  const y = Math.max(16, Math.floor((viewportH - 46 - h) / 2));

  return {
    id: "welcome-main",
    appId: "welcome",
    title: "Welcome to RT-OS 95",
    x,
    y,
    w,
    h,
    z: 20,
    minimized: false,
    collapsed: false,
    maximized: false,
  };
}

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
  windows: [getCenteredWelcomeWindow()],
  activeWindowId: "welcome-main",
  nextZ: 25,
  wallpaper: "teal",
  themeInverted: false,
  soundEnabled: false,
  sidekickEnabled: true,
  screensaverEnabled: true,
  viewMode: "icon",
  desktopIcons: DEFAULT_DESKTOP_ICONS,
  recentWindows: [{ title: "Welcome to RT-OS 95", appId: "welcome" }],
  systemAlert: null,
  isShutDown: false,
  isRestarting: false,

  openWindow: (appId, props, customTitle) => {
    const { windows, nextZ, recentWindows } = get();

    // Check singleton apps
    const isSingleton = [
      "welcome",
      "terminal",
      "aboutMac",
      "controlPanel",
      "chooser",
      "pdfViewer",
      "calc",
      "paint",
      "snake",
      "bugSweeper",
      "findFiles",
      "runDialog",
      "dateTimeProperties",
      "help",
    ].includes(appId);

    if (isSingleton) {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        get().focusWindow(existing.id);
        if (existing.minimized) {
          set({
            windows: windows.map((w) =>
              w.id === existing.id ? { ...w, minimized: false } : w
            ),
          });
        }
        return;
      }
    }

    // Default sizes and titles per app
    let w = 640;
    let h = 460;
    let title = customTitle || `${appId}.exe`;

    if (appId === "welcome") {
      w = 740;
      h = 480;
      title = "Welcome to RT-OS 95";
    } else if (appId === "finder") {
      w = 700;
      h = 460;
      title =
        props?.folder === "achievements"
          ? "C:\\Achievements"
          : "C:\\Projects";
    } else if (appId === "terminal") {
      w = 640;
      h = 420;
      title = "MS-DOS Prompt";
    } else if (appId === "aboutMac") {
      w = 560;
      h = 460;
      title = "System Properties";
    } else if (appId === "simpleText") {
      w = 580;
      h = 440;
      title = (props?.file as string) || "Notepad - Untitled";
    } else if (appId === "mail") {
      w = 560;
      h = 460;
      title = "Outlook Express - New Message";
    } else if (appId === "pdfViewer") {
      w = 680;
      h = 540;
      title = "Acrobat Reader - Raghvender_Tyagi_Resume.pdf";
    } else if (appId === "controlPanel") {
      w = 520;
      h = 420;
      title = "Control Panel";
    } else if (appId === "projectDetail") {
      w = 660;
      h = 500;
      title = (props?.title as string) || "Project Overview";
    } else if (appId === "getInfo") {
      w = 420;
      h = 460;
      title = `Properties: ${props?.name || "Item"}`;
    } else if (appId === "chooser") {
      w = 500;
      h = 360;
      title = "Network Neighborhood";
    } else if (appId === "paint") {
      w = 600;
      h = 460;
      title = "Paint - Untitled";
    } else if (appId === "snake") {
      w = 460;
      h = 440;
      title = "Snake";
    } else if (appId === "calc") {
      w = 340;
      h = 360;
      title = "Calculator";
    } else if (appId === "bugSweeper") {
      w = 360;
      h = 400;
      title = "Bug Sweeper";
    } else if (appId === "findFiles") {
      w = 520;
      h = 380;
      title = "Find: All Files";
    } else if (appId === "runDialog") {
      w = 440;
      h = 220;
      title = "Run";
    } else if (appId === "dateTimeProperties") {
      w = 420;
      h = 440;
      title = "Date/Time Properties";
    } else if (appId === "help") {
      w = 580;
      h = 440;
      title = "RT-OS 95 Help & Support";
    }

    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

    // Responsive clamp for dimensions
    if (w > viewportW - 32) w = Math.max(320, viewportW - 32);
    if (h > viewportH - 70) h = Math.max(240, viewportH - 70);

    let x = 60 + ((windows.length * 28) % 180);
    let y = 40 + ((windows.length * 28) % 160);

    // Keep title bar and window inside viewport
    if (x + w > viewportW - 20) x = Math.max(12, viewportW - w - 20);
    if (y + h > viewportH - 50) y = Math.max(20, viewportH - h - 50);

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

    const newRecent = [
      { title, appId, props },
      ...recentWindows.filter((r) => r.title !== title),
    ].slice(0, 5);

    // Reflect in URL hash
    if (typeof window !== "undefined") {
      window.location.hash = `#/${appId}${
        props?.folder ? `/${props.folder}` : props?.file ? `/${props.file}` : ""
      }`;
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

    // Ensure title bar is always reachable: top >= 0, keep at least 64px inside horizontally
    const clampedY = Math.max(0, Math.min(y, viewportH - 70));
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
    const { windows, activeWindowId } = get();
    const updated = windows.map((w) =>
      w.id === id ? { ...w, minimized: !w.minimized } : w
    );
    let nextActive = activeWindowId;
    if (activeWindowId === id) {
      const remainingVisible = updated
        .filter((w) => !w.minimized)
        .sort((a, b) => b.z - a.z);
      nextActive = remainingVisible[0]?.id || null;
    }
    set({ windows: updated, activeWindowId: nextActive });
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
      const prev = target.restoreRect || { x: 40, y: 40, w: 640, h: 440 };
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
      // Maximize (fills entire space above 38px taskbar)
      const currentRect = { x: target.x, y: target.y, w: target.w, h: target.h };
      set({
        windows: windows.map((w) =>
          w.id === id
            ? {
                ...w,
                x: 0,
                y: 0,
                w: viewportW,
                h: Math.max(240, viewportH - 46),
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
    // Snap to 104px horizontal x 104px vertical grid
    const gridW = 104;
    const gridH = 104;
    const snappedX = Math.max(16, Math.round((rawX - 16) / gridW) * gridW + 16);
    const snappedY = Math.max(16, Math.round((rawY - 16) / gridH) * gridH + 16);

    const updated = get().desktopIcons.map((icon) =>
      icon.id === id ? { ...icon, x: snappedX, y: snappedY } : icon
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
    const welcomeWin = getCenteredWelcomeWindow();
    set({
      windows: [welcomeWin],
      activeWindowId: welcomeWin.id,
      nextZ: 25,
      wallpaper: "teal",
      themeInverted: false,
      soundEnabled: false,
      sidekickEnabled: true,
      screensaverEnabled: true,
      viewMode: "icon",
      desktopIcons: DEFAULT_DESKTOP_ICONS,
      recentWindows: [{ title: "Welcome to RT-OS 95", appId: "welcome" }],
      systemAlert: null,
      isShutDown: false,
      isRestarting: false,
    });
  },

  showAlert: (title, message, onOk, type = "info") => {
    set({
      systemAlert: {
        open: true,
        title,
        message,
        type,
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
      let loadedWindows: WindowInstance[] = [];

      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          if (Array.isArray(parsed.windows) && parsed.windows.length > 0) {
            loadedWindows = parsed.windows;
          }
          set({
            wallpaper: parsed.wallpaper || "teal",
            themeInverted: !!parsed.themeInverted,
            soundEnabled: !!parsed.soundEnabled,
            sidekickEnabled: parsed.sidekickEnabled ?? true,
            screensaverEnabled: parsed.screensaverEnabled ?? true,
            viewMode: parsed.viewMode || "icon",
            desktopIcons:
              parsed.desktopIcons && parsed.desktopIcons.length > 0
                ? parsed.desktopIcons
                : DEFAULT_DESKTOP_ICONS,
          });
        }
      }

      // Bug #2 Fix: Welcome window MUST be open and centered if no windows exist!
      if (loadedWindows.length === 0) {
        const welcomeWin = getCenteredWelcomeWindow();
        loadedWindows = [welcomeWin];
      }

      set({
        windows: loadedWindows,
        activeWindowId: loadedWindows[loadedWindows.length - 1]?.id || null,
      });

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
      const welcomeWin = getCenteredWelcomeWindow();
      set({
        windows: [welcomeWin],
        activeWindowId: welcomeWin.id,
        desktopIcons: DEFAULT_DESKTOP_ICONS,
      });
    }
  },
}));
