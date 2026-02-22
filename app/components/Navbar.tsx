"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1, ease: "linear", delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[var(--neon-green)]/20"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center relative">
          <div className="font-pixel text-[var(--neon-green)] text-xs tracking-tighter">
            [ RAGHVENDER ]
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 text-[10px] font-pixel uppercase text-[var(--neon-green)]/60">
            {['about', 'projects', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="group relative hover:text-[var(--neon-green)] transition-none py-2 flex items-center gap-2"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-none">{'>'}</span>
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50 p-2 border border-[var(--neon-green)]/40"
          >
            <div className={`w-5 h-[2px] bg-[var(--neon-green)] ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-[2px] bg-[var(--neon-green)] ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-[2px] bg-[var(--neon-green)] ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-none md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl font-pixel uppercase">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setIsOpen(false)}
              className="text-[var(--neon-green)]/40 hover:text-[var(--neon-green)] flex items-center gap-4"
            >
              <span>{'>'}</span>
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
