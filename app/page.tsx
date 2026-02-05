export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0d0d0d] selection:bg-[#10b981] selection:text-black">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 z-10">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-16 bg-[#10b981]/50" />
            <span className="text-sm font-mono text-[#10b981] tracking-[0.3em] uppercase">AI Engineer & Developer</span>
          </div>

          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] mb-12 tracking-tighter uppercase">
            <div className="text-white">RAGHVENDER</div>
            <div className="text-[#10b981]">TYAGI</div>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-4xl mb-16 leading-relaxed">
            Building intelligent systems with LangGraph, RAG architectures, and agentic AI workflows.
            Specializing in multi-agent systems and production-grade ML applications.
          </p>

          <div className="flex flex-wrap gap-6">
            <a href="https://github.com/raghvender-tyagi" target="_blank" className="px-12 py-5 bg-[#10b981] text-black font-black text-xl hover:bg-[#10b981]/90 transition-all">
              GitHub →
            </a>
            <a href="https://linkedin.com/in/raghvender-tyagi-05a881247" target="_blank" className="px-12 py-5 border-2 border-[#10b981] text-[#10b981] font-black text-xl hover:bg-[#10b981] hover:text-black transition-all">
              LinkedIn
            </a>
            <a href="#contact" className="px-12 py-5 border-2 border-white/20 text-white font-black text-xl hover:border-white transition-all">
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase whitespace-nowrap">Projects</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          <div className="flex flex-col gap-16">
            {/* Project 1 */}
            <div className="group relative border-b border-white/5 pb-16 last:border-0">
              <div className="relative z-10">
                <div className="flex justify-between items-start flex-wrap gap-8 mb-10">
                  <div className="max-w-4xl">
                    <div className="text-[#10b981] font-mono text-sm mb-4 tracking-widest uppercase">01 — MULTI-AGENT SYSTEM</div>
                    <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover:text-[#10b981] transition-colors">PaperlyAI</h3>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
                      Research paper writing agent powered by a 6-agent LangGraph system. Generates 2,500+ word academic papers
                      from topic inputs using RAG-based reasoning with arXiv integration.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-10">
                      {["LangGraph", "GPT-4o-mini", "RAG", "arXiv API", "Django"].map(tech => (
                        <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a href="https://paperly-ai.onrender.com/" target="_blank" className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-[#10b981] transition-all">
                    Live Demo →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
                  <div className="flex gap-4">
                    <span className="text-[#10b981] font-bold">/</span>
                    <span className="text-lg">6-agent orchestration with critic-generator loops</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#10b981] font-bold">/</span>
                    <span className="text-lg">Top-5 arXiv retrieval for identifying research gaps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative border-b border-white/5 pb-16 last:border-0">
              <div className="relative z-10">
                <div className="flex justify-between items-start flex-wrap gap-8 mb-10">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#10b981] font-mono text-sm tracking-widest uppercase">02 — ROBOTICS + COMPUTER VISION</span>
                      <span className="px-3 py-1 bg-[#fbbf24] text-black text-[10px] font-black uppercase">Patent Granted</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover:text-[#10b981] transition-colors">NETRA MITRA</h3>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
                      AI-powered robotic navigation system for visually impaired individuals. Features autonomous path planning
                      with 8 ultrasonic sensors and environment description via CV.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-10">
                      {["Decision Tree ML", "ESP32-CAM", "Raspberry Pi", "OpenCV", "Object Detection"].map(tech => (
                        <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative border-b border-white/5 pb-16 last:border-0">
              <div className="relative z-10">
                <div className="text-[#10b981] font-mono text-sm mb-4 tracking-widest uppercase">03 — AGENTIC AI</div>
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover:text-[#10b981] transition-colors">AI Personal Assistant</h3>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-4xl mb-10 leading-relaxed">
                  Advanced personal assistant with super memory capabilities. Maintains a centralized knowledge database
                  for long-term contextual awareness and intelligent recall.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["LangChain", "Vector DB", "Memory Systems", "NLP"].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group relative border-b border-white/5 pb-16 last:border-0">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#10b981] font-mono text-sm tracking-widest uppercase">04 — COMPUTER VISION + IOT</span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase">Patent Filed</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover:text-[#10b981] transition-colors">Smart Pesticide System</h3>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-4xl mb-10 leading-relaxed">
                  Precision agriculture system using pixel-level crop image analysis for targeted pesticide application.
                  Reduces chemical usage by ~30% through intelligent detection.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Computer Vision", "Segmentation", "IoT", "OpenCV"].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="relative py-32 px-6 bg-white/[0.02] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase whitespace-nowrap">Tech Stack</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="space-y-12">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-[#10b981] pl-6">
                AI & ML
              </h3>
              <ul className="space-y-6 text-gray-400 text-xl font-light">
                {["LangGraph", "LangChain", "RAG Architecture", "FAISS", "Pgvector", "OpenAI Embeddings", "Transformer Models", "Prompt Engineering"].map(skill => (
                  <li key={skill} className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                    <span className="w-1.5 h-1.5 bg-[#10b981]" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-[#10b981] pl-6">
                Backend
              </h3>
              <ul className="space-y-6 text-gray-400 text-xl font-light">
                {["FastAPI", "Django", "n8n Automation", "Node.js", "Python", "REST APIs", "Vector Databases"].map(skill => (
                  <li key={skill} className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                    <span className="w-1.5 h-1.5 bg-[#10b981]" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-[#10b981] pl-6">
                Vision & IOT
              </h3>
              <ul className="space-y-6 text-gray-400 text-xl font-light">
                {["ESP32-CAM", "Raspberry Pi", "OpenCV", "Object Detection", "IoT Systems", "Edge Computing"].map(skill => (
                  <li key={skill} className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                    <span className="w-1.5 h-1.5 bg-[#10b981]" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase whitespace-nowrap">Status</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            <div className="p-12 md:p-20 bg-[#0d0d0d]">
              <h3 className="text-3xl font-black mb-12 uppercase tracking-widest text-[#10b981]">Victories</h3>
              <div className="space-y-12">
                <div>
                  <div className="text-white font-black text-2xl mb-2">INNOTECH WINNER</div>
                  <div className="text-gray-500 font-mono uppercase tracking-wider">KIET Group · 2000+ Participants</div>
                </div>
                <div>
                  <div className="text-white font-black text-2xl mb-2">OPENAI STATE FINALS</div>
                  <div className="text-gray-500 font-mono uppercase tracking-wider">NIU · 8000+ Participants</div>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-20 bg-[#0d0d0d]">
              <h3 className="text-3xl font-black mb-12 uppercase tracking-widest text-[#10b981]">Patents</h3>
              <div className="space-y-12">
                <div>
                  <div className="text-white font-black text-2xl mb-2">NETRA MITRA</div>
                  <div className="text-gray-500 font-mono uppercase tracking-wider">Patent Granted · Autonomous Navigation</div>
                </div>
                <div>
                  <div className="text-white font-black text-2xl mb-2">SMART PESTICIDE</div>
                  <div className="text-gray-500 font-mono uppercase tracking-wider">Patent Filed · IoT Agriculture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-48 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-none">
            READY TO <br />
            <span className="text-[#10b981]">INNOVATE?</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 mt-20">
            <a href="mailto:raghvendertyagi@gmail.com" className="text-2xl md:text-4xl font-black hover:text-[#10b981] transition-colors uppercase border-b-4 border-[#10b981] pb-2">
              raghvendertyagi@gmail.com
            </a>
            <a href="tel:+917253020660" className="text-2xl md:text-4xl font-black hover:text-[#10b981] transition-colors uppercase border-b-4 border-[#10b981] pb-2">
              +91 7253020660
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-white/5 bg-[#0d0d0d] z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-10">
          <div className="text-gray-600 font-mono text-sm uppercase tracking-widest">
            © 2025 Raghvender Tyagi / AI Engineering
          </div>
          <div className="flex gap-12 text-sm font-black tracking-[0.3em] uppercase text-gray-500">
            <a href="https://github.com/raghvender-tyagi" target="_blank" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/raghvender-tyagi-05a881247" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
