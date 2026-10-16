import { portfolioContent } from "@/data/content";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full bg-[#E4E4E4] text-[#161616] py-24 md:py-32 px-6 md:px-12 lg:px-16"
      style={{ backgroundColor: "#E4E4E4", color: "#161616" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#161616]/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#555555] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#161616]" />
              <span>TECHNICAL CAPABILITIES // ARSENAL</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#161616]">
              Skills & Systems Stack
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-wider">
            [ MONOSPACE TAXONOMY // ZERO SOUP ]
          </div>
        </div>

        {/* Compact Monospace Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioContent.skills.map((cat, idx) => (
            <div
              key={cat.category}
              className="p-6 md:p-8 border border-[#161616]/20 bg-[#DEDEDE]/60 hover:bg-[#D5D5D5] transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#161616]/15 font-mono text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#161616]">
                    {cat.category}
                  </span>
                  <span className="px-2 py-0.5 bg-[#161616] text-[#E4E4E4] text-[10px]">
                    [{cat.code}]
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 bg-[#E4E4E4] border border-[#161616]/30 text-[#161616] hover:border-[#161616] hover:bg-[#161616] hover:text-[#E4E4E4] transition-colors select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#161616]/10 font-mono text-[10px] text-[#666666]">
                MODULE // 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Core Architecture Patterns (Relocated cleanly from Hero) */}
        <div className="mt-12 p-6 md:p-8 border border-[#161616]/25 bg-[#D8D8D8]/70">
          <div className="font-mono text-[11px] text-[#3B4BFF] uppercase tracking-widest font-semibold mb-3">
            {"// SPECIALIZED SYSTEM ARCHITECTURES & PATTERNS"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-[#222222]">
            <div className="space-y-1">
              <span className="font-bold text-[#161616] block">• LangGraph Multi-Agent Workflows</span>
              <span className="text-[#555555] font-headline text-xs block leading-relaxed">
                State graphs, deterministic query routing, sub-agent communication, and long-running job persistence.
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#161616] block">• Sandboxed Docker Compute</span>
              <span className="text-[#555555] font-headline text-xs block leading-relaxed">
                docker-py container isolation, hard cgroup CPU/RAM limits, and isolated veth bridge networks for untrusted execution.
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#161616] block">• Hardened Text-to-SQL AST</span>
              <span className="text-[#555555] font-headline text-xs block leading-relaxed">
                Dual-layer AST/regex validation (validate_sql_access), schema masking, and strict RBAC enforcement.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
