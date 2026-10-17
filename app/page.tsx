import Desktop from "./components/os/Desktop";
import { portfolioContent } from "@/data/content";

export const metadata = {
  title: "RT-OS 1.0 | Raghvender Tyagi - AI Systems & Distributed Backend Engineer",
  description:
    "Interactive System 7 desktop OS portfolio of Raghvender Tyagi. LangGraph multi-agent architectures, sandboxed Docker compute, and secure Text-to-SQL pipelines.",
};

export default function Home() {
  return (
    <>
      {/* 1. Main Interactive System 7 Desktop Experience (No page scroll) */}
      <Desktop />

      {/* 2. Accessible <noscript> & Semantic Fallback for Crawlers and Non-JS Users */}
      <noscript>
        <div className="p-8 bg-[#D9D9D9] text-black font-mono space-y-6">
          <h1 className="text-3xl font-bold">
            {portfolioContent.meta.name} - {portfolioContent.meta.role}
          </h1>
          <p>{portfolioContent.hero.subline}</p>
          <div className="p-4 border-2 border-black bg-white">
            <h2 className="text-xl font-bold">Recruiter &amp; Accessible View</h2>
            <p className="mt-1">
              JavaScript is disabled or not supported in your browser. Please access the fast, accessible single-page version:
            </p>
            <a
              href="/classic"
              className="inline-block mt-3 px-4 py-2 bg-black text-white font-bold"
            >
              Go to Classic Accessible View →
            </a>
          </div>
        </div>
      </noscript>
    </>
  );
}
