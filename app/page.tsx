export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-white selection:text-black">
      {/* Decorative Grid and Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Top Decorative Lines */}
        <div className="absolute top-12 left-12 w-12 h-[1px] bg-white/20" />
        <div className="absolute top-12 right-12 w-12 h-[1px] bg-white/20" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-white/40">2025</div>

        {/* Ghosted Background Text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-ghost whitespace-nowrap">
          2025
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-2 text-[10px] tracking-[0.5em] uppercase text-white/40">Full-Stack Developer</div>
          <div className="flex items-center gap-8">
            <div className="h-[1px] w-12 md:w-24 bg-white/40" />
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">
              Portfolio
            </h1>
            <div className="h-[1px] w-12 md:w-24 bg-white/40" />
          </div>
          <p className="mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-white/60">
            Raghvender Tyagi
          </p>
        </div>

        {/* Bottom Decorative Lines */}
        <div className="absolute bottom-12 left-12 w-12 h-[1px] bg-white/20" />
        <div className="absolute bottom-12 right-12 w-12 h-[1px] bg-white/20" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-white/40">Selected Projects</div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="relative w-full max-w-6xl px-6 py-32 mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-xs tracking-[0.5em] uppercase text-white/40 whitespace-nowrap">Projects</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative p-12 bg-black hover:bg-white/[0.02] transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-xs">→</span>
                </div>
              </div>
              <div className="mb-8 text-[10px] tracking-[0.3em] uppercase text-white/40">0{i} / Interactive</div>
              <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Project Module {i}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-md font-light">
                Architecting scalable systems with high-performance real-time data processing and minimalist interface design.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative w-full max-w-6xl px-6 py-32 mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-xs tracking-[0.5em] uppercase text-white/40 whitespace-nowrap">Capabilities</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "SQL", "Git"].map((skill) => (
            <div key={skill} className="flex flex-col gap-2">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">Technology</div>
              <div className="text-lg font-light uppercase tracking-tighter">{skill}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full max-w-6xl px-6 py-32 mx-auto mb-32">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-xs tracking-[0.5em] uppercase text-white/40 whitespace-nowrap">Connection</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        <div className="flex flex-col items-start gap-8">
          <p className="text-4xl md:text-6xl font-light tracking-tighter uppercase max-w-3xl leading-none">
            Let&apos;s build the next generation of <span className="text-white/20 underline decoration-1 underline-offset-8">digital interfaces</span>.
          </p>
          <a
            href="mailto:contact@example.com"
            className="group relative mt-8 px-12 py-4 border border-white/20 hover:border-white transition-colors"
          >
            <span className="relative z-10 text-xs tracking-[0.5em] uppercase">Initial Contact</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-[0.5em] uppercase pointer-events-none">
              Initial Contact
            </span>
          </a>
        </div>
      </section>
    </main>

  );
}
