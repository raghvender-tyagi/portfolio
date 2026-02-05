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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-center items-center relative">
          {/* Logo removed as requested */}

          {/* Desktop Links - Centered */}
          <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
            {['about', 'projects', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="group relative hover:text-white transition-colors py-2"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle - Positioned Right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute right-8 flex flex-col gap-1.5 z-50 p-2"
          >
            <div className={`w-6 h-[1px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-[1px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-[1px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0d0d0d] transition-all duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-16 text-3xl font-black tracking-[0.3em] uppercase">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setIsOpen(false)}
              className="text-white/20 hover:text-white transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
