"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { portfolioContent } from "@/data/content";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

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
        setTimeStr("17:00:00");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      // Simple active section check
      const sections = ["hero", "work", "experience", "about", "skills", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work", id: "work" },
    { label: "EXPERIENCE", href: "#experience", id: "experience" },
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "SKILLS", href: "#skills", id: "skills" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#E4E4E4]/92 backdrop-blur-md border-b border-[#CCCCCC] text-[#161616]"
          : "bg-transparent border-b border-[#161616]/10 text-[#161616]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Top-Left Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          aria-label="Raghvender Tyagi - Home"
        >
          {/* Pixel-style RT mark */}
          <div className="w-7 h-7 bg-[#161616] text-[#E4E4E4] font-mono font-bold text-xs flex items-center justify-center border border-[#161616] group-hover:bg-[#3B4BFF] group-hover:border-[#3B4BFF] group-hover:text-white transition-colors duration-150 select-none">
            RT
          </div>
          <div className="flex flex-col text-[11px] leading-tight font-mono">
            <span className="font-bold text-[#161616] uppercase tracking-normal">
              {portfolioContent.meta.name}
            </span>
            <span className="text-[#555555] text-[10px] tracking-tight">
              {portfolioContent.meta.shortRole}
            </span>
          </div>
        </Link>

        {/* Center: Live time and availability (Client-only rendering to avoid hydration mismatch) */}
        {mounted && (
          <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-[#666666] border-x border-[#161616]/15 px-6 h-full select-none">
            <span className="w-1.5 h-1.5 bg-[#3B4BFF] animate-pulse" />
            <span className="text-[#161616] font-medium">
              {portfolioContent.meta.timeZoneLabel} {timeStr}
            </span>
            <span className="text-[#888888]">/</span>
            <span className="uppercase text-[#555555] text-[10px]">
              {portfolioContent.meta.availability}
            </span>
          </div>
        )}

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-[0.08em]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF] ${
                  isActive ? "text-[#161616] font-bold" : "text-[#555555] hover:text-[#161616]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B4BFF]" />
                )}
              </a>
            );
          })}

          <a
            href={
              portfolioContent.contact.socials.find((s) => s.code === "PDF")?.href ||
              "/Raghvender_Tyagi_Resume.pdf"
            }
            download
            className="px-3.5 py-1.5 bg-[#161616] text-[#E4E4E4] border border-[#161616] hover:bg-[#3B4BFF] hover:border-[#3B4BFF] hover:text-white text-[11px] font-semibold transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3B4BFF]"
          >
            RESUME [PDF]
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-[#E4E4E4] transition-colors font-mono text-xs cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#CCCCCC] bg-[#E4E4E4] px-6 py-6 space-y-4 font-mono text-sm uppercase tracking-wider text-[#161616] shadow-lg">
          {mounted && (
            <div className="flex items-center gap-2 pb-4 border-b border-[#CCCCCC] text-xs text-[#555555]">
              <span className="w-1.5 h-1.5 bg-[#3B4BFF] animate-pulse" />
              <span>
                {portfolioContent.meta.timeZoneLabel} {timeStr}
              </span>
              <span>—</span>
              <span className="text-[#161616] font-semibold">
                {portfolioContent.meta.availability}
              </span>
            </div>
          )}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#444444] hover:text-[#161616] border-b border-[#D0D0D0]"
            >
              {`> ${link.label}`}
            </a>
          ))}
          <a
            href="/Raghvender_Tyagi_Resume.pdf"
            download
            onClick={() => setIsOpen(false)}
            className="block py-3 text-center bg-[#161616] text-[#E4E4E4] hover:bg-[#3B4BFF] hover:text-white transition-colors text-xs font-semibold"
          >
            DOWNLOAD RESUME [PDF]
          </a>
        </div>
      )}
    </header>
  );
}