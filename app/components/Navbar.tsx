"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <a href="#" className="text-3xl font-black text-white tracking-tighter">
          RT
        </a>

        <div className="flex gap-12 text-sm font-bold tracking-[0.2em] uppercase text-white/70">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
