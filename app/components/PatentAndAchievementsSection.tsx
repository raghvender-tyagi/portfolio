import { portfolioContent } from "@/data/content";

export default function PatentAndAchievementsSection() {
  const { patent, certifications } = portfolioContent.patentAndCerts;
  const { achievements, education } = portfolioContent;

  return (
    <section
      id="about"
      className="w-full bg-[#161616] text-[#E4E4E4] py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#2A2A2A] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#8E8E8E] mb-3 flex items-center gap-2">
              <span className="text-[#3B4BFF] font-bold">03 / ABOUT</span>
              <span>—</span>
              <span>PATENT, CREDENTIALS & EDUCATION</span>
            </div>
            <h2 className="font-headline font-light text-4xl md:text-6xl tracking-tight text-[#E4E4E4]">
              Patent & Credentials
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider">
            [ VERIFIED RECORDS // 2023 - 2026 ]
          </div>
        </div>

        {/* Top Grid: Patent & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Patent Card (Large 7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 border border-[#2A2A2A] bg-[#1A1A1A]/70 flex flex-col justify-between hover:border-[#3B4BFF]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2A2A2A] font-mono text-xs">
                <span className="px-2.5 py-1 bg-[#3B4BFF] text-white uppercase tracking-wider font-bold text-[10px]">
                  INTELLECTUAL PROPERTY
                </span>
                <span className="text-[#8E8E8E]">{patent.status} ({patent.year})</span>
              </div>

              <h3 className="font-headline text-2xl md:text-3xl text-[#E4E4E4] font-normal leading-snug">
                {patent.title}
              </h3>

              <p className="font-headline text-sm text-[#A0A0A0] leading-relaxed mt-4">
                {patent.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#262626] font-mono text-[11px] text-[#8E8E8E] flex items-center justify-between">
              <span>FILING JURISDICTION: {patent.institution}</span>
              <span className="text-[#3B4BFF]">STATUS: PENDING_EXAMINATION</span>
            </div>
          </div>

          {/* Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 border border-[#2A2A2A] bg-[#1A1A1A]/70 hover:border-[#3B4BFF]/50 transition-colors">
              <div className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest mb-4">
                CERTIFICATION // 01
              </div>
              <h4 className="font-headline text-xl text-[#E4E4E4] font-normal">
                {certifications[0].name}
              </h4>
              <div className="font-mono text-xs text-[#8E8E8E] mt-1">
                Issued by {certifications[0].issuer}
              </div>
              <div className="mt-4 inline-block font-mono text-[10px] px-2.5 py-1 bg-[#222222] border border-[#333333] text-[#CCCCCC]">
                BADGE: {certifications[0].badge}
              </div>
            </div>

            <div className="p-8 border border-[#2A2A2A] bg-[#1A1A1A]/70 hover:border-[#3B4BFF]/50 transition-colors">
              <div className="font-mono text-[10px] text-[#3B4BFF] uppercase tracking-widest mb-4">
                CERTIFICATION // 02
              </div>
              <h4 className="font-headline text-xl text-[#E4E4E4] font-normal">
                {certifications[1].name}
              </h4>
              <div className="font-mono text-xs text-[#8E8E8E] mt-1">
                Issued by {certifications[1].issuer}
              </div>
              <div className="mt-4 inline-block font-mono text-[10px] px-2.5 py-1 bg-[#222222] border border-[#333333] text-[#CCCCCC]">
                BADGE: {certifications[1].badge}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid: Hackathons & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#262626]">
          {/* Hackathons / Achievements (7 cols) */}
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B4BFF] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#3B4BFF]" />
              <span>HACKATHONS & RECOGNITION (VERIFIED OUTCOMES)</span>
            </div>

            <div className="divide-y divide-[#2A2A2A] border-y border-[#2A2A2A]">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#1E1E1E]/50 px-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#3B4BFF] text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="font-headline text-sm md:text-base text-[#E4E4E4] font-medium">
                        {item.title}
                      </span>
                      <span className="text-[#8E8E8E] text-xs md:text-sm font-headline">
                        {" "}— {item.event}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#777777] sm:text-right shrink-0">
                    {item.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card (5 cols) */}
          <div className="lg:col-span-5 p-8 border border-[#2A2A2A] bg-[#1A1A1A]/70 flex flex-col justify-between hover:border-[#3B4BFF]/50 transition-colors">
            <div>
              <div className="font-mono text-xs text-[#3B4BFF] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#3B4BFF]" />
                <span>EDUCATION // DEGREE</span>
              </div>

              <h4 className="font-headline text-xl md:text-2xl text-[#E4E4E4] font-normal">
                {education.institution}
              </h4>
              <div className="font-mono text-xs text-[#8E8E8E] mt-1">
                {education.location}
              </div>

              <p className="font-headline text-sm text-[#CCCCCC] mt-4 leading-relaxed">
                {education.degree}
              </p>
              <div className="mt-2 font-mono text-xs text-[#8E8E8E]">
                Duration: {education.period}
              </div>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#222222] border border-[#333333] font-mono text-xs text-[#E4E4E4]">
                <span>CUMULATIVE CGPA:</span>
                <span className="text-[#3B4BFF] font-bold">{education.cgpa} / 10.0</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#262626]">
              <div className="font-mono text-[10px] text-[#666666] uppercase mb-2">
                SELECTED CS & AI COURSEWORK:
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[#8E8E8E]">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2 py-0.5 bg-[#141414] border border-[#262626]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

