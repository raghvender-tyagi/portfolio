"use client";

import { useState } from "react";
import { portfolioContent, Project } from "@/data/content";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedDiagramId, setExpandedDiagramId] = useState<string | null>(null);

  const categories = ["All", "Backend", "GenAI & Agents", "Robotics"];

  const filteredProjects =
    activeCategory === "All"
      ? portfolioContent.projects
      : portfolioContent.projects.filter((p) => p.category === activeCategory);

  const toggleDiagram = (id: string) => {
    setExpandedDiagramId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="work"
      className="w-full bg-[#161616] text-[#E4E4E4] relative pb-28 px-6 md:px-16"
    >
      {/* Static 1-cell tall random stair top edge (transition from hero) */}
      <div
        className="w-full h-5 overflow-hidden leading-none select-none pointer-events-none -mt-5"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
          className="w-full h-5 block"
          shapeRendering="crispEdges"
        >
          <path
            d="
              M0,20 L0,10 L30,10 L30,0 L60,0 L60,10 L100,10 L100,0 L140,0 L140,10 L190,10 L190,0 L230,0 L230,10
              L280,10 L280,0 L320,0 L320,10 L370,10 L370,0 L420,0 L420,10 L470,10 L470,0 L520,0 L520,10
              L580,10 L580,0 L630,0 L630,10 L680,10 L680,0 L730,0 L730,10 L790,10 L790,0 L840,0 L840,10
              L890,10 L890,0 L940,0 L940,10 L990,10 L990,0 L1040,0 L1040,10 L1100,10 L1100,0 L1150,0 L1150,10 L1200,10 L1200,20 Z
            "
            fill="#161616"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto pt-16">
        {/* Section Index & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2A2A2A]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#8E8E8E] mb-3 flex items-center gap-2">
              <span className="text-[#3B4BFF] font-bold">01 / WORK</span>
              <span>—</span>
              <span>SELECTED ARCHITECTURES</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#E4E4E4]">
              Engineered for resilience.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div
            className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[0.08em]"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 border transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#E4E4E4] text-[#161616] border-[#E4E4E4] font-semibold"
                      : "bg-transparent text-[#8E8E8E] border-[#333333] hover:border-[#E4E4E4] hover:text-[#E4E4E4]"
                  } focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Stack */}
        <div className="divide-y divide-[#2A2A2A]">
          {filteredProjects.map((project: Project) => {
            const isDiagramExpanded = expandedDiagramId === project.id;
            const isShipped = project.statusType === "shipped";

            return (
              <article
                key={project.id}
                className="py-12 md:py-16 group transition-colors duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Status Tag, Category */}
                  <div className="lg:col-span-3 font-mono">
                    <div className="text-3xl md:text-4xl font-light text-[#555555] group-hover:text-[#3B4BFF] transition-colors mb-2">
                      [{project.number}]
                    </div>

                    <div className="flex items-center gap-2 my-2">
                      {isShipped ? (
                        <span className="px-2 py-0.5 bg-[#1F1F1F] text-[#E4E4E4] border border-[#3B4BFF] text-[10px] font-bold uppercase tracking-wider">
                          [ SHIPPED ]
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#8E8E8E] border border-[#333333] text-[10px] uppercase tracking-wider">
                          [ REPO ]
                        </span>
                      )}
                      <span className="text-xs uppercase tracking-wider text-[#8E8E8E]">
                        {project.category}
                      </span>
                    </div>

                    {project.note && (
                      <div className="mt-3 text-[11px] p-2 bg-[#1E1E1E] border-l-2 border-[#3B4BFF] text-[#A0A0A0]">
                        * {project.note}
                      </div>
                    )}
                  </div>

                  {/* Middle Column: Title, Pitch, Bullets, and Tech Tags */}
                  <div className="lg:col-span-6 space-y-5">
                    <div>
                      <h3 className="font-headline text-2xl md:text-3xl font-normal text-[#E4E4E4] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-headline text-sm md:text-base text-[#A0A0A0] leading-relaxed mt-2">
                        {project.pitch}
                      </p>
                    </div>

                    {/* Impact Bullets */}
                    <div className="space-y-2.5 pt-2">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#777777]">
                        KEY ENGINEERING HIGHLIGHTS:
                      </div>
                      <ul className="space-y-2 list-none font-headline text-xs md:text-sm text-[#C4C4C4]">
                        {project.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="font-mono text-[#3B4BFF] font-bold select-none">
                              ›
                            </span>
                            <span className="leading-normal">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-[#1F1F1F] text-[#CCCCCC] border border-[#2E2E2E]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Actions & Diagram Toggle */}
                  <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
                    {/* Live URL button: hidden if null/absent */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-[#E4E4E4] text-[#161616] hover:bg-[#3B4BFF] hover:text-white transition-colors text-center border border-[#E4E4E4] font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <span>LIVE DEPLOYMENT</span>
                        <span>↗</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-transparent text-[#E4E4E4] border border-[#333333] hover:border-[#E4E4E4] hover:bg-[#222222] transition-colors text-center uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>SOURCE CODE</span>
                      <span>↗</span>
                    </a>

                    {project.hasArchitectureDiagram && (
                      <button
                        onClick={() => toggleDiagram(project.id)}
                        className={`px-4 py-2.5 text-center uppercase tracking-wider border transition-colors cursor-pointer text-[11px] ${
                          isDiagramExpanded
                            ? "bg-[#3B4BFF] text-white border-[#3B4BFF]"
                            : "bg-[#1E1E1E] text-[#CCCCCC] border-[#333333] hover:border-[#E4E4E4]"
                        }`}
                        aria-expanded={isDiagramExpanded}
                      >
                        {isDiagramExpanded
                          ? "[ HIDE ARCHITECTURE ▲ ]"
                          : "[ HOW IT WORKS (FLOW) ▼ ]"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable Architecture Flow Diagram */}
                {project.hasArchitectureDiagram && project.architecture && isDiagramExpanded && (
                  <div className="mt-8 p-6 md:p-8 bg-[#1B1B1B] text-[#E4E4E4] border border-[#2E2E2E]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2E2E2E]">
                      <div>
                        <div className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest font-semibold">
                          SYSTEM ARCHITECTURE SCHEMA // {project.title}
                        </div>
                        <p className="font-headline text-xs md:text-sm text-[#A0A0A0] mt-1">
                          {project.architecture.summary}
                        </p>
                      </div>
                      <div className="font-mono text-[10px] text-[#777777] shrink-0">
                        PIPELINE_NODES: {project.architecture.steps.length}
                      </div>
                    </div>

                    {/* Step-by-step Flow Nodes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                      {project.architecture.steps.map((st, sIdx) => (
                        <div
                          key={st.step}
                          className="p-4 border border-[#2E2E2E] bg-[#161616] flex flex-col justify-between relative"
                        >
                          {sIdx < project.architecture!.steps.length - 1 && (
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 font-mono text-[#3B4BFF] text-xs">
                              →
                            </div>
                          )}
                          <div>
                            <div className="font-mono text-[10px] text-[#3B4BFF] mb-1">
                              STAGE // {st.step}
                            </div>
                            <div className="font-mono text-xs uppercase font-bold text-[#E4E4E4] mb-2">
                              {st.label}
                            </div>
                            <div className="font-headline text-xs text-[#8E8E8E] leading-relaxed">
                              {st.detail}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
