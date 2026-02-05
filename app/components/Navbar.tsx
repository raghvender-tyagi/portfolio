"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-[#00D9FF]/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="#" className="text-3xl font-black text-white hover:text-[#00D9FF] transition-all tracking-tighter">
            RT
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">
            <a href="#about" className="hover:text-[#00D9FF] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#00D9FF] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#00D9FF] transition-colors">Skills</a>
            <a href="#contact" className="hover:text-[#00D9FF] transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50 p-2"
          >
            <div className={`w-6 h-0.5 bg-[#00D9FF] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#00D9FF] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#00D9FF] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-12 text-2xl font-black tracking-[0.2em] uppercase">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-[#00D9FF] hover:scale-110 transition-all border-b-2 border-transparent hover:border-[#00D9FF] pb-2"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
