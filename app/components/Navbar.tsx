"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { portfolioContent } from "@/data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr("16:30:00");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#161616]/90 backdrop-blur-md border-b border-[#2A2A2A] text-[#E4E4E4]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Top-Left Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          aria-label="Raghvender Tyagi - Home"
        >
          {/* Pixel-style RT mark */}
          <div className="w-7 h-7 bg-[#E4E4E4] text-[#161616] font-mono font-bold text-xs flex items-center justify-center border border-[#161616] group-hover:bg-[#3B4BFF] group-hover:text-white transition-colors duration-150 select-none">
            RT
          </div>
          <div className="flex flex-col text-[11px] leading-tight font-mono tracking-wider">
            <span className="font-semibold text-[#E4E4E4] uppercase tracking-normal">
              {portfolioContent.meta.name}
            </span>
            <span className="text-[#8E8E8E] text-[10px]">
              {portfolioContent.meta.shortRole}
            </span>
          </div>
        </Link>

        {/* Center/Right: Live time and availability */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-[#8E8E8E] border-x border-[#2A2A2A] px-6 h-full select-none">
          <span className="w-1.5 h-1.5 rounded-none bg-[#3B4BFF] animate-pulse" />
          <span className="text-[#E4E4E4]">{portfolioContent.meta.timeZoneLabel} {timeStr || "16:30:00"}</span>
          <span className="text-[#444444]">/</span>
          <span className="uppercase text-[#A0A0A0]">{portfolioContent.meta.availability}</span>
        </div>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#8E8E8E] hover:text-[#E4E4E4] transition-colors py-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={portfolioContent.contact.socials.find((s) => s.code === "PDF")?.href || "/Raghvender_Tyagi_Resume.pdf"}
            download
            className="px-3 py-1.5 border border-[#3B4BFF]/80 text-[#3B4BFF] hover:bg-[#3B4BFF] hover:text-white text-[11px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          >
            RESUME [PDF]
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border border-[#333333] text-[#E4E4E4] hover:border-[#E4E4E4] transition-colors font-mono text-xs"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#2A2A2A] bg-[#161616] px-6 py-6 space-y-4 font-mono text-sm uppercase tracking-wider">
          <div className="flex items-center gap-2 pb-4 border-b border-[#2A2A2A] text-xs text-[#8E8E8E]">
            <span className="w-1.5 h-1.5 bg-[#3B4BFF] animate-pulse" />
            <span>{portfolioContent.meta.timeZoneLabel} {timeStr}</span>
            <span>—</span>
            <span className="text-[#E4E4E4]">{portfolioContent.meta.availability}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#8E8E8E] hover:text-[#E4E4E4] border-b border-[#222222]"
            >
              {`> ${link.label}`}
            </a>
          ))}
          <a
            href="/Raghvender_Tyagi_Resume.pdf"
            download
            onClick={() => setIsOpen(false)}
            className="block py-3 text-center border border-[#3B4BFF] text-[#3B4BFF] hover:bg-[#3B4BFF] hover:text-white transition-colors"
          >
            DOWNLOAD RESUME [PDF]
          </a>
        </div>
      )}
    </header>
  );
}