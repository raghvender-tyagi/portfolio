import { portfolioContent } from "@/data/content";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full bg-[#161616] text-[#E4E4E4] py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#2A2A2A] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B4BFF] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3B4BFF]" />
              <span>EXPERIENCE // TIMELINE</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#E4E4E4]">
              Where I&apos;ve contributed.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider">
            [ ROLE HISTORY // 2026 ]
          </div>
        </div>

        {/* Timeline Items */}
        <div className="mt-12 space-y-12">
          {portfolioContent.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 border border-[#2A2A2A] bg-[#1A1A1A]/70 relative hover:border-[#3B4BFF]/50 transition-colors"
            >
              {/* Top metadata row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[#262626]">
                <div>
                  <span className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest">
                    TENURE // {exp.period}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl text-[#E4E4E4] font-normal mt-1">
                    {exp.company}
                  </h3>
                  <div className="font-mono text-xs uppercase text-[#A0A0A0] mt-1">
                    {exp.role} <span className="text-[#555555]">({exp.type})</span>
                  </div>
                </div>

                <div className="font-mono text-xs px-3 py-1.5 bg-[#222222] border border-[#333333] text-[#CCCCCC] self-start md:self-auto">
                  {exp.platform}
                </div>
              </div>

              {/* Technical Bullet Points */}
              <div className="mt-6 space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#777777]">
                  CORE SYSTEM DELIVERABLES:
                </div>
                <ul className="space-y-3 font-headline text-sm md:text-base text-[#C4C4C4] list-none">
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
              <div className="mt-8 pt-6 border-t border-[#262626] flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#8E8E8E]">
                <span className="text-[#555555] uppercase">ENGINEERING DOMAIN:</span>
                <span className="px-2 py-0.5 border border-[#333333] bg-[#1F1F1F] text-[#CCCCCC]">
                  LangGraph Sub-Agents
                </span>
                <span className="px-2 py-0.5 border border-[#333333] bg-[#1F1F1F] text-[#CCCCCC]">
                  pgvector Semantic Search
                </span>
                <span className="px-2 py-0.5 border border-[#333333] bg-[#1F1F1F] text-[#CCCCCC]">
                  AST Query Hardening
                </span>
                <span className="px-2 py-0.5 border border-[#333333] bg-[#1F1F1F] text-[#CCCCCC]">
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

