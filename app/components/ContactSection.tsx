"use client";

import React, { useState } from "react";
import Window from "./Window";
import BevelButton from "./BevelButton";
import { portfolioContent } from "@/data/content";

export default function ContactSection() {
  const { contact, meta } = portfolioContent;
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full space-y-8 pb-16">
      <Window
        title={contact.filename}
        status="SMTP DISPATCHER • STATUS: READY FOR TRANSMISSION • 0 QUEUED"
        collapsible={true}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-black">
              {contact.heading}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-black/85 max-w-xl leading-relaxed">
              {contact.subheading}
            </p>
          </div>

          {/* Primary Email Dispatch Box */}
          <div className="border-2 border-black bg-[#D9D9D9] p-4 space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-pixel text-xs font-bold uppercase tracking-wider text-black">
                DIRECT INBOX DISPATCH
              </span>
              <span className="font-pixel text-[10px] bg-black text-white px-2 py-0.5">
                {meta.availability}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <BevelButton
                href={`mailto:${contact.email}`}
                variant="inverted"
                size="lg"
                className="flex-1"
              >
                ✉ {contact.email}
              </BevelButton>

              <BevelButton
                onClick={handleCopyEmail}
                variant="default"
                size="lg"
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy Address"}
              </BevelButton>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-black/70 pt-1">
              <span>TEL: {contact.phone}</span>
              <span>TIMEZONE: IST (UTC+5:30)</span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div>
            <h4 className="font-pixel text-xs font-bold uppercase tracking-wider text-black mb-3">
              EXTERNAL NETWORKS &amp; REPOSITORIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contact.socials.map((social) => (
                <BevelButton
                  key={social.label}
                  href={social.href}
                  variant="default"
                  size="md"
                  className="w-full flex items-center justify-between"
                >
                  <span>{social.label}</span>
                  <span>↗</span>
                </BevelButton>
              ))}
            </div>
          </div>
        </div>
      </Window>

      {/* Retro System 7 Desk Bar & Shut Down Button */}
      <div className="border-2 border-black bg-[#D9D9D9] p-3 mac-shadow flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <div className="font-pixel text-[11px] text-black text-center sm:text-left space-y-0.5">
          <div className="font-bold">
            © 2026 {meta.name} • System 7 Edition
          </div>
          <div className="text-black/60 text-[10px]">
            Engineered with Next.js &amp; Tailwind • 100% Monochrome Architecture
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BevelButton
            onClick={scrollToTop}
            variant="default"
            size="sm"
            title="Return to top of page"
          >
            ▲ Shut Down (Top)
          </BevelButton>
        </div>
      </div>
    </footer>
  );
}
