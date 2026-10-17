"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function MenuBar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hours, setHours] = useState<string>("--");
  const [minutes, setMinutes] = useState<string>("--");
  const [ampm, setAmpm] = useState<string>("");
  const [colonVisible, setColonVisible] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidekickEnabled, setSidekickEnabled] = useState<boolean>(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Load sidekick preference from localStorage
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("sys7_sidekick");
        if (stored !== null) {
          setSidekickEnabled(stored === "true");
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const toggleSidekick = useCallback(() => {
    setSidekickEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sys7_sidekick", String(next));
      } catch {
        // ignore
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("sidekick-toggle", { detail: { enabled: next } })
        );
      }
      return next;
    });
  }, []);

  // Client-side hydration-safe live clock with blinking colon
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const isPm = h >= 12;
      h = h % 12 || 12;

      setHours(h.toString());
      setMinutes(m);
      setAmpm(isPm ? "PM" : "AM");
      setColonVisible((v) => !v);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver to detect active section
  useEffect(() => {
    const sectionIds = ["projects", "experience", "about", "skills", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-8 bg-[#BFBFBF] border-b-2 border-black z-50 flex items-center justify-between px-3 select-none text-black font-pixel text-[11px]">
        {/* Left: Pixel RT Apple-style Mark + Nav Items */}
        <div className="flex items-center h-full">
          <Link
            href="#"
            className="flex items-center gap-1.5 px-2 h-full hover:bg-black hover:text-white transition-colors duration-75 border-r border-black/30 mr-1"
            title="System 7 Apple Menu"
          >
            <span className="font-bold tracking-tighter text-xs bg-black text-white px-1 py-0.5 border border-black">
              RT
            </span>
            <span className="font-bold hidden sm:inline">Finder</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center h-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`h-full flex items-center px-2.5 transition-colors duration-75 uppercase tracking-wider ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            className={`md:hidden h-full flex items-center px-2 uppercase tracking-wider ${
              mobileMenuOpen ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            Menu ▼
          </button>
        </div>

        {/* Right: Sidekick Toggle + Resume button + Live Clock */}
        <div className="flex items-center h-full gap-2">
          {/* Mascot Toggle Button */}
          <button
            type="button"
            onClick={toggleSidekick}
            title={`Desktop Mascot: ${sidekickEnabled ? "Enabled" : "Disabled"}`}
            className="hidden sm:flex items-center h-6 px-2 bg-[#D9D9D9] hover:bg-black hover:text-white border-2 border-black text-[10px] uppercase font-bold tracking-wider transition-colors duration-75 cursor-pointer"
          >
            Sidekick: {sidekickEnabled ? "ON" : "OFF"}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="h-6 px-2 flex items-center bg-[#D9D9D9] hover:bg-black hover:text-white border-2 border-black text-[10px] uppercase font-bold tracking-wider transition-colors duration-75"
          >
            Resume ↗
          </a>

          {/* Clock: Stepped Blinking Colon */}
          <div className="px-2 h-full flex items-center border-l border-black/30 text-[11px] font-mono font-bold tracking-tight">
            <span>{hours}</span>
            <span className={colonVisible ? "opacity-100" : "opacity-0"}>:</span>
            <span>{minutes}</span>
            {ampm && <span className="ml-1 text-[10px]">{ampm}</span>}
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Window */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed top-8 left-2 w-52 z-50 bg-[#D9D9D9] border-2 border-black mac-shadow md:hidden animate-in fade-in duration-100 select-none"
        >
          <div className="p-1 flex flex-col font-pixel text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-1.5 text-left uppercase tracking-wider ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="border-t border-black my-1" />
            <button
              type="button"
              onClick={toggleSidekick}
              className="px-3 py-1.5 text-left uppercase tracking-wider hover:bg-black hover:text-white flex items-center justify-between cursor-pointer"
            >
              <span>Sidekick</span>
              <span>[{sidekickEnabled ? "ON" : "OFF"}]</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 text-left uppercase tracking-wider hover:bg-black hover:text-white flex items-center justify-between"
            >
              <span>Resume</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
