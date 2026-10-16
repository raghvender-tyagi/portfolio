"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import PixelHeroCanvas from "./PixelHeroCanvas";
import { portfolioContent } from "@/data/content";

const emptySubscribe = () => () => {};

export default function HeroSection() {
  const [timeStr, setTimeStr] = useState<string>("");
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr("18:16");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-[72px] overflow-hidden select-none"
    >
      {/* Background Interactive Pixel Canvas at z-0 */}
      <PixelHeroCanvas />

      {/* 12-Column Grid Container with 64px Margins on Desktop (24px on Mobile) */}
      <div className="relative z-10 w-full px-6 md:px-16 pt-8 pb-4 flex-grow flex flex-col justify-between">
        {/* Main 12-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          {/* LEFT 7 COLUMNS = The Calm Light Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Status Chip (40px above headline, 11px mono, 8px padding) */}
            <div className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1 bg-[#161616] text-[#E4E4E4] border border-[#333333]">
              <span className="w-1.5 h-1.5 bg-[#3B4BFF] animate-pulse shrink-0" />
              <span>{portfolioContent.meta.statusBadge}</span>
            </div>

            {/* Headline Block (Optical center, font-size clamp, tight line-height 1.0) */}
            <h1
              ref={headlineRef}
              className="font-headline font-light tracking-[-0.035em] text-[#161616] leading-[1.0] mb-10 w-full"
              style={{
                fontSize: "clamp(2.25rem, 4.1vw, 5.2rem)",
                textWrap: "balance",
              }}
            >
              <span className="block lg:whitespace-nowrap">
                I build agents that ship.
                <span
                  className="inline-block w-2.5 h-[0.65em] bg-[#3B4BFF] ml-2 animate-pulse align-baseline"
                  aria-hidden="true"
                />
              </span>
              <span className="block lg:whitespace-nowrap font-normal mt-1">
                Systems that don&apos;t fall over.
              </span>
            </h1>

            {/* Solid Plate CTAs (40px below headline) */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="font-mono text-xs uppercase tracking-[0.08em] px-6 py-3.5 bg-[#161616] text-[#E4E4E4] border border-[#161616] pixel-wipe-steps-dark focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
              >
                [ SEE THE WORK ↓ ]
              </a>
              <a
                href="mailto:raghvendertyagi@gmail.com"
                className="font-mono text-xs uppercase tracking-[0.08em] px-6 py-3.5 bg-[#E4E4E4] text-[#161616] border border-[#161616] pixel-wipe-steps-light focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
              >
                [ GET IN TOUCH → ]
              </a>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS = Lives inside the coherent dark mass, anchored bottom-right */}
          <div className="lg:col-span-5 flex justify-end items-end h-full pt-8 lg:pt-0">
            <div
              id="hero-info-card"
              className="p-6 bg-[#161616] border border-[#2E2E2E] w-full max-w-md text-left shadow-none"
            >
              <div className="font-mono text-[11px] text-[#3B4BFF] uppercase tracking-[0.08em] mb-2 font-semibold">
                {"// PROFILE_MANIFEST"}
              </div>
              <p className="font-headline text-sm md:text-base text-[#E4E4E4] leading-[1.6]">
                {portfolioContent.hero.subCopy}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Footer Meta Row: Scroll cue on left margin + thin meta row */}
        <div className="pt-6 border-t border-[#161616]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#666666]">
          <div className="flex items-center gap-6">
            <span className="text-[#161616] font-semibold">SCROLL ↓</span>
            <span>/</span>
            <span>
              GHAZIABAD, IN / {mounted ? `IST ${timeStr || "18:16"}` : "IST"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3B4BFF]" />
            <span className="text-[#161616] font-medium">OPEN TO ROLES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
