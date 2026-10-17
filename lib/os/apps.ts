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
    title: "welcome.app",
    defaultSize: { w: 780, h: 520 },
    minSize: { w: 340, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/WelcomeApp"), {
      ssr: false,
    }),
  },
  finder: {
    id: "finder",
    title: "projects.finder",
    defaultSize: { w: 680, h: 460 },
    minSize: { w: 320, h: 260 },
    component: dynamic(() => import("@/app/components/apps/FinderApp"), {
      ssr: false,
    }),
  },
  terminal: {
    id: "terminal",
    title: "terminal.sys",
    defaultSize: { w: 620, h: 420 },
    minSize: { w: 320, h: 240 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/TerminalApp"), {
      ssr: false,
    }),
  },
  aboutMac: {
    id: "aboutMac",
    title: "About This Mac",
    defaultSize: { w: 580, h: 460 },
    minSize: { w: 320, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/AboutMacApp"), {
      ssr: false,
    }),
  },
  simpleText: {
    id: "simpleText",
    title: "SimpleText",
    defaultSize: { w: 580, h: 460 },
    minSize: { w: 320, h: 240 },
    component: dynamic(() => import("@/app/components/apps/SimpleTextApp"), {
      ssr: false,
    }),
  },
  mail: {
    id: "mail",
    title: "mail.app",
    defaultSize: { w: 540, h: 480 },
    minSize: { w: 320, h: 300 },
    component: dynamic(() => import("@/app/components/apps/MailApp"), {
      ssr: false,
    }),
  },
  chooser: {
    id: "chooser",
    title: "Chooser",
    defaultSize: { w: 480, h: 360 },
    minSize: { w: 300, h: 240 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/ChooserApp"), {
      ssr: false,
    }),
  },
  pdfViewer: {
    id: "pdfViewer",
    title: "Raghvender_Tyagi_Resume.pdf",
    defaultSize: { w: 680, h: 560 },
    minSize: { w: 340, h: 320 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/PdfViewerApp"), {
      ssr: false,
    }),
  },
  controlPanel: {
    id: "controlPanel",
    title: "Control Panel",
    defaultSize: { w: 520, h: 440 },
    minSize: { w: 320, h: 280 },
    singleton: true,
    component: dynamic(() => import("@/app/components/apps/ControlPanelApp"), {
      ssr: false,
    }),
  },
  projectDetail: {
    id: "projectDetail",
    title: "project.info",
    defaultSize: { w: 660, h: 520 },
    minSize: { w: 320, h: 260 },
    component: dynamic(() => import("@/app/components/apps/ProjectDetailApp"), {
      ssr: false,
    }),
  },
  getInfo: {
    id: "getInfo",
    title: "Get Info",
    defaultSize: { w: 420, h: 460 },
    minSize: { w: 280, h: 320 },
    component: dynamic(() => import("@/app/components/apps/GetInfoApp"), {
      ssr: false,
    }),
  },
  paint: {
    id: "paint",
    title: "MacPaint",
    defaultSize: { w: 580, h: 440 },
    minSize: { w: 340, h: 280 },
    component: dynamic(() => import("@/app/components/apps/PaintApp"), {
      ssr: false,
    }),
  },
  snake: {
    id: "snake",
    title: "Snake.game",
    defaultSize: { w: 460, h: 440 },
    minSize: { w: 320, h: 320 },
    component: dynamic(() => import("@/app/components/apps/SnakeApp"), {
      ssr: false,
    }),
  },
};
