"use client";

import PixelHeroCanvas from "./PixelHeroCanvas";
import { portfolioContent } from "@/data/content";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Interactive Pixel Canvas */}
      <PixelHeroCanvas />

      {/* Top Meta & Status Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        {/* Status chip */}
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 bg-[#161616]/80 text-[#E4E4E4] border border-[#333333] backdrop-blur-sm self-start">
          <span className="w-1.5 h-1.5 bg-[#3B4BFF] animate-pulse" />
          <span>{portfolioContent.meta.statusBadge}</span>
        </div>

        {/* Coords & System Spec */}
        <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-[#222222]/70 dark:text-[#E4E4E4]/50 select-none">
          <span>SYS // 28.6692° N, 77.4538° E</span>
          <span>[ STACK: AGENTS + SANDBOX ]</span>
        </div>
      </div>

      {/* Main Massive Headline */}
      <div className="relative z-10 my-auto py-8 lg:py-12 max-w-6xl">
        <h1
          className="font-headline font-light tracking-[-0.035em] text-[#F0F0F0] leading-[0.94] mix-blend-difference"
          style={{
            fontSize: "clamp(46px, 7.8vw, 116px)",
          }}
        >
          <span className="block">{portfolioContent.hero.headline.line1}</span>
          <span className="block font-normal">{portfolioContent.hero.headline.line2}</span>
        </h1>

        {/* Hero Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-[#161616] text-[#E4E4E4] border border-[#161616] hover:bg-[#3B4BFF] hover:border-[#3B4BFF] hover:text-white transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          >
            [ SEE THE WORK ↓ ]
          </a>
          <a
            href="mailto:raghvendertyagi@gmail.com"
            className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-transparent text-[#161616] border border-[#161616] hover:bg-[#161616] hover:text-[#E4E4E4] transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          >
            [ GET IN TOUCH → ]
          </a>
        </div>
      </div>

      {/* Bottom Row: Specs on Left, Sub-copy Anchored Bottom-Right over Dark Bleed */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-[#2A2A2A]/20">
        {/* Left quick specs */}
        <div className="md:col-span-5 font-mono text-[11px] text-[#555555] dark:text-[#8E8E8E] space-y-1">
          <div className="text-[#161616] dark:text-[#C4C4C4] font-semibold">CORE ARCHITECTURES:</div>
          <div>• LangGraph Multi-Agent Orchestration & State Graphs</div>
          <div>• Docker Container Sandboxing (cgroups, veth namespaces)</div>
          <div>• Hardened Text-to-SQL AST Verification Pipelines</div>
        </div>

        {/* Right sub-copy anchored bottom-right over the dark area */}
        <div className="md:col-span-7 md:text-right flex flex-col md:items-end">
          <div className="p-4 md:p-5 bg-[#161616]/90 border border-[#2E2E2E] backdrop-blur-sm max-w-xl text-left">
            <div className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest mb-1.5">
              {"// PROFILE_MANIFEST"}
            </div>
            <p className="font-headline text-sm md:text-base text-[#E4E4E4] leading-relaxed">
              {portfolioContent.hero.subCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

