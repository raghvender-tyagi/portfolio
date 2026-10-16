import { portfolioContent } from "@/data/content";

export default function BuildLogSection() {
  if (!portfolioContent.buildLog || portfolioContent.buildLog.length === 0) {
    return null;
  }

  return (
    <section
      id="writing"
      className="w-full bg-[#E4E4E4] text-[#161616] py-24 md:py-32 px-6 md:px-12 lg:px-16"
      style={{ backgroundColor: "#E4E4E4", color: "#161616" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#161616]/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#555555] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#161616]" />
              <span>ENGINEERING NOTES // BUILD LOG</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#161616]">
              Field Notes & Architecture Deep Dives
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] uppercase tracking-wider">
            [ SCAFFOLD // SYSTEM LOGS ]
          </div>
        </div>

        {/* Entries List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioContent.buildLog.map((entry, idx) => (
            <article
              key={entry.slug}
              className="p-8 border border-[#161616]/25 bg-[#DEDEDE]/60 hover:bg-[#D5D5D5] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161616]/15 font-mono text-xs text-[#666666]">
                  <span className="text-[#3B4BFF] font-semibold">{entry.tag}</span>
                  <span>{entry.date} {"//"} {entry.readTime}</span>
                </div>

                <h3 className="font-headline text-xl md:text-2xl font-normal text-[#161616] leading-snug">
                  {entry.title}
                </h3>

                <p className="font-headline text-sm text-[#444444] mt-3 leading-relaxed">
                  {entry.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#161616]/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#666666]">[LOG // 0{idx + 1}]</span>
                <span className="text-[#161616] font-semibold hover:text-[#3B4BFF] transition-colors">
                  READ NOTE →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

