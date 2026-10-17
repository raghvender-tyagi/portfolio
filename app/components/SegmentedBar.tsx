import React from "react";
import { portfolioContent } from "@/data/content";

export default function SegmentedBar() {
  const links = portfolioContent.quickLinks;

  return (
    <nav
      aria-label="Quick Navigation"
      className="w-full grid grid-cols-2 sm:grid-cols-4 border-2 border-black bg-[#D9D9D9] mac-shadow select-none"
    >
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        return (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center justify-between px-3 md:px-4 py-2.5 font-pixel text-xs md:text-sm font-bold uppercase tracking-wider text-black bg-[#D9D9D9] hover:bg-black hover:text-white transition-colors duration-75 border-b sm:border-b-0 ${
              !isLast ? "sm:border-r-2 sm:border-black" : ""
            } ${index % 2 === 0 ? "border-r-2 sm:border-r-0 border-black" : ""}`}
          >
            <span>{link.label}</span>
            <span className="font-mono text-sm ml-1">↗</span>
          </a>
        );
      })}
    </nav>
  );
}

