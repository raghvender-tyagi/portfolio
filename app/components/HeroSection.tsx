"use client";

import PixelHeroCanvas from "./PixelHeroCanvas";
import { portfolioContent } from "@/data/content";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Interactive Pixel Canvas at z-0 */}
      <PixelHeroCanvas />

      {/* Hero Content Layer strictly above canvas at z-10 */}
      <div className="relative z-10 flex flex-col justify-between flex-grow">
        {/* Top Status Bar (Decluttered: status chip only) */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider px-3.5 py-2 bg-[#161616] text-[#E4E4E4] border border-[#333333] shadow-none">
            <span className="w-2 h-2 bg-[#3B4BFF] animate-pulse shrink-0" />
            <span>{portfolioContent.meta.statusBadge}</span>
          </div>
        </div>

        {/* Text Safe Zone: Headline & CTAs */}
        <div id="hero-text-zone" className="my-auto py-8 max-w-5xl">
          <h1
            className="font-headline font-light tracking-[-0.03em] text-[#161616] leading-[1.02]"
            style={{
              fontSize: "clamp(2.25rem, 5.2vw, 6rem)",
              textWrap: "balance",
            }}
          >
            {/* Exactly two lines on desktop with white-space: nowrap */}
            <span className="block lg:whitespace-nowrap">
              I build agents that ship.
              <span
                className="inline-block w-2.5 h-[0.7em] bg-[#3B4BFF] ml-2 animate-pulse align-baseline"
                aria-hidden="true"
              />
            </span>
            <span className="block lg:whitespace-nowrap font-normal mt-1">
              Systems that don&apos;t fall over.
            </span>
          </h1>

          {/* Guaranteed Solid Plate CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-[#161616] text-[#E4E4E4] border border-[#161616] pixel-wipe-steps-dark focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
            >
              [ SEE THE WORK ↓ ]
            </a>
            <a
              href="mailto:raghvendertyagi@gmail.com"
              className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-[#E4E4E4] text-[#161616] border border-[#161616] pixel-wipe-steps-light focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
            >
              [ GET IN TOUCH → ]
            </a>
          </div>
        </div>

        {/* Bottom Row: Info Card anchored bottom-right over the dark zone */}
        <div className="flex justify-end pt-6">
          <div
            id="hero-info-card"
            className="p-5 md:p-6 bg-[#161616] border border-[#2E2E2E] max-w-lg text-left shadow-none"
          >
            <div className="font-mono text-[11px] text-[#3B4BFF] uppercase tracking-widest mb-2 font-semibold">
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
