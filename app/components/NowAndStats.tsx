import { portfolioContent } from "@/data/content";

export default function NowAndStats() {
  return (
    <section className="w-full bg-[#161616] text-[#E4E4E4] border-y border-[#2A2A2A]">
      {/* "Now" Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 border-b border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#3B4BFF]" />
          <span className="text-[#3B4BFF] font-semibold tracking-wider">
            [{portfolioContent.now.title}]
          </span>
          <span className="text-[#8E8E8E] hidden sm:inline">—</span>
          <span className="text-[#C4C4C4] font-headline text-xs md:text-sm">
            {portfolioContent.now.text}
          </span>
        </div>
        <div className="text-[10px] text-[#666666] uppercase tracking-widest shrink-0">
          {portfolioContent.now.status}
        </div>
      </div>

      {/* Stats Row (Accurate metrics only) */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioContent.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="p-6 border border-[#262626] bg-[#1A1A1A]/50 hover:border-[#3B4BFF]/60 transition-colors duration-150 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between font-mono text-[10px] text-[#666666] uppercase tracking-widest mb-4">
                <span>METRIC // 0{idx + 1}</span>
                <span className="text-[#3B4BFF]">VERIFIED</span>
              </div>
              <div className="font-mono text-4xl md:text-5xl font-light text-[#E4E4E4] tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#C4C4C4] font-semibold mb-1">
                {stat.label}
              </div>
              <div className="font-headline text-xs text-[#8E8E8E] leading-normal">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

