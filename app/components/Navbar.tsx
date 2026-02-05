"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xs font-light tracking-[0.5em] uppercase text-white">
          R.Tyagi
        </h1>

        <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase text-white/40">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
