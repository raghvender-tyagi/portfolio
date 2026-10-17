import React from "react";
import Window from "./Window";
import { portfolioContent } from "@/data/content";

export default function AboutSection() {
  const { about, meta } = portfolioContent;

  return (
    <section id="about" className="w-full">
      <Window
        title={about.filename}
        status="FILE: README.TXT • 3 PARAGRAPHS • READY"
        collapsible={true}
      >
        <div className="space-y-6">
          {/* Engineering Philosophy / Bio Paragraphs */}
          <div className="space-y-3 font-mono text-xs sm:text-sm text-black/90 leading-relaxed">
            {about.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Education & Academic Profile Box */}
          <div className="border-2 border-black bg-[#D9D9D9] p-4 font-mono space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-pixel text-xs font-bold uppercase tracking-wider text-black">
                ACADEMIC PROFILE
              </span>
              <span className="font-pixel text-[10px] bg-black text-white px-2 py-0.5">
                ACTIVE DEGREE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs sm:text-sm">
              <div className="md:col-span-8 space-y-1">
                <h4 className="font-heading font-bold text-base sm:text-lg text-black">
                  {about.education.institution}
                </h4>
                <p className="text-black/80 font-medium">
                  {about.education.degree}
                </p>
                <p className="text-black/60 text-xs font-pixel uppercase">
                  Location: {meta.location}
                </p>
              </div>

              <div className="md:col-span-4 flex flex-row md:flex-col justify-between md:justify-center md:items-end border-t md:border-t-0 md:border-l-2 border-black pt-2 md:pt-0 md:pl-4 font-pixel text-xs">
                <div>
                  <span className="text-black/60 block text-[10px]">PERIOD</span>
                  <span className="font-bold text-black">{about.education.period}</span>
                </div>
                <div className="md:mt-2">
                  <span className="text-black/60 block text-[10px]">CGPA</span>
                  <span className="font-bold text-black bg-black text-white px-1.5 py-0.5">
                    {about.education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </section>
  );
}

