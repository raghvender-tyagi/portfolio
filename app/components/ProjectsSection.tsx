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
      className="w-full bg-[#E4E4E4] text-[#161616] py-24 md:py-32 px-6 md:px-12 lg:px-16"
      style={{ backgroundColor: "#E4E4E4", color: "#161616" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#161616]/20">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#555555] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#161616]" />
              <span>SELECTED WORK // ARCHITECTURES</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#161616]">
              Engineered for resilience.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div
            className="flex flex-wrap gap-2 font-mono text-xs uppercase"
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
                      ? "bg-[#161616] text-[#E4E4E4] border-[#161616]"
                      : "bg-transparent text-[#444444] border-[#161616]/30 hover:border-[#161616] hover:text-[#161616]"
                  } focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Stack */}
        <div className="divide-y divide-[#161616]/20">
          {filteredProjects.map((project: Project) => {
            const isDiagramExpanded = expandedDiagramId === project.id;

            return (
              <article
                key={project.id}
                className="py-12 md:py-16 group transition-colors duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number and Category */}
                  <div className="lg:col-span-3 font-mono">
                    <div className="text-3xl md:text-4xl font-light text-[#161616]/40 group-hover:text-[#3B4BFF] transition-colors mb-2">
                      [{project.number}]
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#666666] font-semibold">
                      {project.category}
                    </div>
                    {project.note && (
                      <div className="mt-3 text-[11px] p-2 bg-[#D8D8D8] border-l-2 border-[#3B4BFF] text-[#444444]">
                        * {project.note}
                      </div>
                    )}
                  </div>

                  {/* Middle Column: Title, Pitch, Bullets, and Tech Tags */}
                  <div className="lg:col-span-6 space-y-5">
                    <div>
                      <h3 className="font-headline text-2xl md:text-3xl font-normal text-[#161616] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-headline text-sm md:text-base text-[#444444] leading-relaxed mt-2">
                        {project.pitch}
                      </p>
                    </div>

                    {/* Impact Bullets */}
                    <div className="space-y-2.5 pt-2">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                        KEY ENGINEERING HIGHLIGHTS:
                      </div>
                      <ul className="space-y-2 list-none font-headline text-xs md:text-sm text-[#2A2A2A]">
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
                          className="px-2.5 py-1 bg-[#D8D8D8] text-[#161616] border border-[#CCCCCC]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Actions & Diagram Toggle */}
                  <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-[#161616] text-[#E4E4E4] hover:bg-[#3B4BFF] hover:text-white transition-colors text-center border border-[#161616] uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <span>LIVE DEPLOYMENT</span>
                        <span>↗</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-transparent text-[#161616] border border-[#161616] hover:bg-[#161616] hover:text-[#E4E4E4] transition-colors text-center uppercase tracking-wider flex items-center justify-center gap-2"
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
                            : "bg-[#D8D8D8] text-[#161616] border-[#B8B8B8] hover:border-[#161616]"
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
                  <div className="mt-8 p-6 md:p-8 bg-[#161616] text-[#E4E4E4] border border-[#161616] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
                      <div>
                        <div className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest">
                          SYSTEM ARCHITECTURE SCHEMA // {project.title}
                        </div>
                        <p className="font-headline text-xs md:text-sm text-[#A0A0A0] mt-1">
                          {project.architecture.summary}
                        </p>
                      </div>
                      <div className="font-mono text-[10px] text-[#666666] shrink-0">
                        PIPELINE_NODES: {project.architecture.steps.length}
                      </div>
                    </div>

                    {/* Step-by-step Flow Nodes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                      {project.architecture.steps.map((st, sIdx) => (
                        <div
                          key={st.step}
                          className="p-4 border border-[#2E2E2E] bg-[#1E1E1E] flex flex-col justify-between relative"
                        >
                          {/* Flow connector arrow */}
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

                    {/* Pixel ASCII Flow Summary */}
                    <div className="mt-6 pt-4 border-t border-[#262626] font-mono text-[11px] text-[#777777] overflow-x-auto whitespace-pre">
                      {project.id === "takemycompute"
                        ? `[CLIENT] ──(WSS)──> [CHANNELS GATEWAY] ──(REDIS)──> [CELERY RUNNER] ──> [DOCKER CGROUP SANDBOX] ──(PUB/SUB)──> [LIVE TERMINAL]`
                        : `[PROMPT] ──> [LANGGRAPH PLANNER] ──> [THREADPOOL: ARXIV API] ──> [PARALLEL DRAFTERS] ──> [CRITIC EVAL] ──> [CELERY EXPORT]`}
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

