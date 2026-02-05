"use client";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#111111] overflow-hidden font-inter text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-20">
        <div className="max-w-7xl w-full text-center">
          <div className="text-[10px] md:text-sm font-bold tracking-[1em] uppercase text-white/30 mb-8">
            AI ENGINEER
          </div>
          <h1 className="text-[10vw] md:text-[6rem] font-black leading-[0.85] tracking-tighter uppercase mb-12">
            RAGHVENDER <br /> TYAGI
          </h1>
          <div className="flex flex-col items-center gap-10">
            <p className="text-sm md:text-lg font-medium tracking-tight text-white/40 max-w-2xl leading-relaxed">
              Building <span className="text-white">multi-agent systems</span> with LangGraph & RAG. <br />
              Production AI that actually works.
            </p>
            <div className="flex gap-10">
              <a href="https://github.com/raghvender-tyagi" target="_blank" className="px-10 py-4 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest uppercase">GitHub</a>
              <a href="https://linkedin.com/in/raghvender-tyagi-05a881247" target="_blank" className="px-10 py-4 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest uppercase">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/40 -translate-y-full animate-infinite-scroll" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-32 border-b border-white/5 pb-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Selected <br />Works</h2>
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">PRJ // 2025</div>
          </div>

          <div className="space-y-60">
            {[
              {
                id: "01",
                title: "PaperlyAI",
                desc: "6-agent LangGraph system generating 2,500+ word academic papers with RAG-based reasoning.",
                tags: ["LLM Agents", "LangGraph", "RAG"],
                image: "/paperly_ai.png" // User will add this to public/
              },
              {
                id: "02",
                title: "NETRA MITRA",
                desc: "Robotic navigation system for visually impaired using ultrasonic sensors & Computer Vision.",
                tags: ["AI Robotics", "OpenCV", "IoT"],
              },
              {
                id: "03",
                title: "Smart Pesticide",
                desc: "Pixel-level crop analysis for precision pesticide application with 30% chemical reduction.",
                tags: ["AgriTech", "CV", "ML"],
              }
            ].map((prj) => (
              <div key={prj.title} className="group relative border-t border-white/5 pt-20 first:border-0 first:pt-0">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                  <div className="w-full lg:w-1/2">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">{prj.id} // SYSTEM_MANIFEST</div>
                    <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 group-hover:translate-x-4 transition-transform duration-500">{prj.title}</h3>
                    <p className="text-xl text-white/40 leading-relaxed font-light mb-12 max-w-xl">{prj.desc}</p>
                    <div className="flex flex-wrap gap-4">
                      {prj.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 border border-white/10 px-6 py-2 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 aspect-video bg-[#1a1a1a] border border-white/5 overflow-hidden group-hover:border-white/20 transition-all relative shadow-2xl flex items-center justify-center">
                    {/* Background Text (Behind Image) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="text-[10vw] font-black text-white/5 uppercase select-none tracking-tighter">{prj.title}</div>
                    </div>

                    {prj.image ? (
                      <img
                        src={prj.image}
                        alt={prj.title}
                        className="relative z-10 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 contrast-[1.1] brightness-[1.1]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}

                    {/* Subtle Overlay to ensure text legibility if needed, but keeping it minimal */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity z-20 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-60 px-10 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="text-[10px] font-bold tracking-[1.2rem] text-white/20 uppercase mb-12">ORIGIN // DATA_CORE</div>
              <h2 className="text-[10vw] lg:text-[7.5rem] font-black leading-[0.85] tracking-tighter uppercase mb-20 lg:mb-0">
                The <br />
                <span className="text-white">Architect</span>
              </h2>
            </div>
            <div className="lg:col-span-1" /> {/* Spacer Column */}
            <div className="lg:col-span-4 flex flex-col justify-end lg:pt-20">
              <div className="space-y-12 text-lg md:text-xl text-white/40 leading-[1.8] font-light">
                <p>
                  Specializing in the intersection of <span className="text-white font-medium border-b border-white/10 pb-1">Multi-Agent Orchestration</span> and <span className="text-white font-medium border-b border-white/10 pb-1">Autonomous Robotics</span>.
                </p>
                <p>
                  I build systems that don&apos;t just process data, but reason through complex workflows using advanced RAG and custom frameworks.
                </p>
                <p>
                  With expertise spanning from high-level LLM reasoning to low-level hardware implementation, I bridge the gap between digital intelligence and physical reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arsenal (Skills) Section */}
      <section id="skills" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Arsenal</h2>
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">SKILLS // TECH</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              {
                cat: "AI / ML",
                skills: ["TensorFlow & PyTorch", "LangChain / LangGraph", "Computer Vision", "RAG Systems", "Agentic Workflows"]
              },
              {
                cat: "BACKEND",
                skills: ["Python (Django/FastAPI)", "PostgreSQL / Pinecone", "Docker & Kubernetes", "Redis", "Microservices"]
              },
              {
                cat: "SYSTEMS",
                skills: ["Raspberry Pi & ESP32", "IoT Protocols", "C++ / ROS", "Circuit Design", "Autonomous Nav"]
              }
            ].map((cat) => (
              <div key={cat.cat} className="space-y-10">
                <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 border-b border-white/5 pb-10">{cat.cat}</h3>
                <ul className="space-y-6">
                  {cat.skills.map(skill => (
                    <li key={skill} className="text-lg font-light text-white/60 hover:text-white transition-colors cursor-default">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-60 px-10 bg-[#161616] text-center">
        <div className="max-w-7xl mx-auto space-y-20">
          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8]">
            THANKS FOR <br /> WATCHING!
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-32">
            <div className="group">
              <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-4">EMAIL</div>
              <div className="text-2xl font-bold tracking-widest border-b border-white/10 group-hover:border-white transition-all pb-2">raghvendertyagi@gmail.com</div>
            </div>
            <div className="group">
              <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-4">PHONE</div>
              <div className="text-2xl font-bold tracking-widest border-b border-white/10 group-hover:border-white transition-all pb-2">+91 7253020660</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <div className="text-[10px] font-bold tracking-[1em] text-white/10 uppercase">
          © 2025 RAGHVENDER TYAGI // AI ENGINEER
        </div>
      </footer>
    </main>
  );
}
