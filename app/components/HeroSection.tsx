"use client";

import React from "react";
import Window from "./Window";
import BevelButton from "./BevelButton";
import RetroMacIllustration from "./RetroMacIllustration";
import { portfolioContent } from "@/data/content";

export default function HeroSection() {
  const { hero } = portfolioContent;

  return (
    <section className="w-full">
      <Window
        title="welcome.app"
        status="SYS7 • 68030 33MHz • MEMORY: 16MB • READY"
        collapsible={true}
        className="w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2 md:py-4">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* System path kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-pixel uppercase tracking-widest text-black/70">
              <span className="w-2 h-2 bg-black inline-block" />
              <span>MACINTOSH HD : SYSTEM FOLDER : RAGHVENDER</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-black leading-[1.08] tracking-tight">
              {hero.greeting}
            </h1>

            {/* Subline */}
            <p className="font-mono text-sm sm:text-base text-black/90 leading-relaxed max-w-xl">
              {hero.subline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <BevelButton
                href="/resume.pdf"
                variant="inverted"
                size="md"
                download="Raghvender_Tyagi_Resume.pdf"
              >
                [ Download resume ↓ ]
              </BevelButton>

              <BevelButton href="#contact" variant="default" size="md">
                [ Get in touch ✉ ]
              </BevelButton>
            </div>

            {/* Status Line */}
            <div className="pt-2 border-t-2 border-black/10 flex items-center gap-2.5 text-xs font-mono text-black/80">
              <span className="w-2.5 h-2.5 bg-black animate-pulse" />
              <span>{hero.statusLine}</span>
            </div>
          </div>

          {/* Right Column: Retro Mac Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <RetroMacIllustration className="w-full max-w-[280px] sm:max-w-[320px]" />
          </div>
        </div>
      </Window>
    </section>
  );
}
