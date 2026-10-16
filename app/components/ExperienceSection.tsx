import { portfolioContent } from "@/data/content";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full bg-[#E4E4E4] text-[#161616] py-24 md:py-32 px-6 md:px-12 lg:px-16"
      style={{ backgroundColor: "#E4E4E4", color: "#161616" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#161616]/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#555555] mb-3 flex items-center gap-2">
              <span className="text-[#3B4BFF] font-bold">02 / EXPERIENCE</span>
              <span>—</span>
              <span>INDUSTRY CONTRIBUTIONS</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#161616]">
              Where I&apos;ve contributed.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-wider">
            [ ROLE HISTORY // 2026 ]
          </div>
        </div>

        {/* Timeline Items */}
        <div className="mt-12 space-y-12">
          {portfolioContent.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 border border-[#161616]/20 bg-[#DEDEDE]/60 relative hover:border-[#3B4BFF]/60 transition-colors"
            >
              {/* Top metadata row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[#161616]/15">
                <div>
                  <span className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest font-semibold">
                    TENURE // {exp.period}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl text-[#161616] font-normal mt-1">
                    {exp.company}
                  </h3>
                  <div className="font-mono text-xs uppercase text-[#555555] mt-1">
                    {exp.role} <span className="text-[#777777]">({exp.type})</span>
                  </div>
                </div>

                <div className="font-mono text-xs px-3 py-1.5 bg-[#E4E4E4] border border-[#CCCCCC] text-[#161616] self-start md:self-auto font-medium">
                  {exp.platform}
                </div>
              </div>

              {/* Technical Bullet Points */}
              <div className="mt-6 space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                  CORE SYSTEM DELIVERABLES:
                </div>
                <ul className="space-y-3 font-headline text-sm md:text-base text-[#2A2A2A] list-none">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="font-mono text-[#3B4BFF] font-bold select-none mt-0.5">
                        [0{bIdx + 1}]
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Tags */}
              <div className="mt-8 pt-6 border-t border-[#161616]/10 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#666666]">
                <span className="text-[#555555] uppercase font-semibold">ENGINEERING DOMAIN:</span>
                <span className="px-2 py-0.5 border border-[#161616]/25 bg-[#E4E4E4] text-[#161616]">
                  LangGraph Sub-Agents
                </span>
                <span className="px-2 py-0.5 border border-[#161616]/25 bg-[#E4E4E4] text-[#161616]">
                  pgvector Semantic Search
                </span>
                <span className="px-2 py-0.5 border border-[#161616]/25 bg-[#E4E4E4] text-[#161616]">
                  AST Query Hardening
                </span>
                <span className="px-2 py-0.5 border border-[#161616]/25 bg-[#E4E4E4] text-[#161616]">
                  RBAC SQL Sandboxing
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
