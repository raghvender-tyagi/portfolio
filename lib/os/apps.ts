import React from "react";
import dynamic from "next/dynamic";

export interface AppDefinition {
  id: string;
  title: string;
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
  singleton?: boolean;
  component: React.ComponentType<Record<string, unknown>>;
}

// Lazy-loaded app components for fast initial load
export const appRegistry: Record<string, AppDefinition> = {
  welcome: {
    id: "welcome",
    title: "Welcome to RT-OS 95",
    defaultSize: { w: 740, h: 480 },
    minSize: { w: 340, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/WelcomeApp"), {
      ssr: false,
    }),
  },
  finder: {
    id: "finder",
    title: "Explorer",
    defaultSize: { w: 700, h: 460 },
    minSize: { w: 320, h: 260 },
    component: dynamic(() => import("@/app/components/apps/FinderApp"), {
      ssr: false,
    }),
  },
  terminal: {
    id: "terminal",
    title: "MS-DOS Prompt",
    defaultSize: { w: 640, h: 420 },
    minSize: { w: 320, h: 240 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/TerminalApp"), {
      ssr: false,
    }),
  },
  aboutMac: {
    id: "aboutMac",
    title: "System Properties",
    defaultSize: { w: 560, h: 460 },
    minSize: { w: 320, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/AboutMacApp"), {
      ssr: false,
    }),
  },
  simpleText: {
    id: "simpleText",
    title: "Notepad",
    defaultSize: { w: 580, h: 440 },
    minSize: { w: 320, h: 240 },
    component: dynamic(() => import("@/app/components/apps/SimpleTextApp"), {
      ssr: false,
    }),
  },
  mail: {
    id: "mail",
    title: "Outlook Express",
    defaultSize: { w: 560, h: 460 },
    minSize: { w: 320, h: 300 },
    component: dynamic(() => import("@/app/components/apps/MailApp"), {
      ssr: false,
    }),
  },
  chooser: {
    id: "chooser",
    title: "Network Neighborhood",
    defaultSize: { w: 500, h: 360 },
    minSize: { w: 300, h: 240 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/ChooserApp"), {
      ssr: false,
    }),
  },
  pdfViewer: {
    id: "pdfViewer",
    title: "Acrobat Reader",
    defaultSize: { w: 680, h: 540 },
    minSize: { w: 340, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/PdfViewerApp"), {
      ssr: false,
    }),
  },
  controlPanel: {
    id: "controlPanel",
    title: "Control Panel",
    defaultSize: { w: 520, h: 420 },
    minSize: { w: 320, h: 280 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/ControlPanelApp"), {
      ssr: false,
    }),
  },
  projectDetail: {
    id: "projectDetail",
    title: "Project Overview",
    defaultSize: { w: 660, h: 500 },
    minSize: { w: 320, h: 260 },
    component: dynamic(() => import("@/app/components/apps/ProjectDetailApp"), {
      ssr: false,
    }),
  },
  getInfo: {
    id: "getInfo",
    title: "Properties",
    defaultSize: { w: 420, h: 460 },
    minSize: { w: 280, h: 320 },
    component: dynamic(() => import("@/app/components/apps/GetInfoApp"), {
      ssr: false,
    }),
  },
  paint: {
    id: "paint",
    title: "Paint",
    defaultSize: { w: 600, h: 460 },
    minSize: { w: 340, h: 280 },
    component: dynamic(() => import("@/app/components/apps/PaintApp"), {
      ssr: false,
    }),
  },
  snake: {
    id: "snake",
    title: "Snake",
    defaultSize: { w: 460, h: 440 },
    minSize: { w: 320, h: 320 },
    component: dynamic(() => import("@/app/components/apps/SnakeApp"), {
      ssr: false,
    }),
  },
  calc: {
    id: "calc",
    title: "Calculator",
    defaultSize: { w: 340, h: 360 },
    minSize: { w: 260, h: 280 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/CalcApp"), {
      ssr: false,
    }),
  },
  bugSweeper: {
    id: "bugSweeper",
    title: "Bug Sweeper",
    defaultSize: { w: 340, h: 380 },
    minSize: { w: 280, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/BugSweeperApp"), {
      ssr: false,
    }),
  },
  findFiles: {
    id: "findFiles",
    title: "Find: All Files",
    defaultSize: { w: 520, h: 380 },
    minSize: { w: 320, h: 280 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/FindFilesApp"), {
      ssr: false,
    }),
  },
  runDialog: {
    id: "runDialog",
    title: "Run",
    defaultSize: { w: 440, h: 220 },
    minSize: { w: 300, h: 180 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/RunDialogApp"), {
      ssr: false,
    }),
  },
  dateTimeProperties: {
    id: "dateTimeProperties",
    title: "Date/Time Properties",
    defaultSize: { w: 440, h: 440 },
    minSize: { w: 320, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/DateTimeApp"), {
      ssr: false,
    }),
  },
  help: {
    id: "help",
    title: "RT-OS 95 Help & Support",
    defaultSize: { w: 580, h: 440 },
    minSize: { w: 320, h: 280 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/HelpApp"), {
      ssr: false,
    }),
  },
};
