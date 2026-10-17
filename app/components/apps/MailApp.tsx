"use client";

import React, { useState } from "react";
import PixelSprite from "../PixelSprite";
import { portfolioContent } from "@/data/content";
import { mail32 } from "@/data/sprites";

export default function MailApp() {
  const { contact } = portfolioContent;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject || "Inquiry from RT-OS 95 Portfolio"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full bg-[#C0C0C0] text-black font-mono text-xs flex flex-col justify-between select-text">
      {/* 1. Outlook 3D Toolbar */}
      <div className="flex items-center gap-2 p-1.5 bg-[#C0C0C0] border-b border-[#808080] select-none">
        <button
          type="button"
          onClick={handleSend}
          className="win95-btn flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-bold"
        >
          <PixelSprite sprite={mail32} scale={0.4} />
          <span>Send Mail</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="win95-btn px-3 py-1.5 font-sans text-xs font-bold"
        >
          {copied ? "Copied!" : "Copy Email"}
        </button>
      </div>

      {/* 2. Form Header Fields */}
      <div className="p-3 space-y-2 bg-[#C0C0C0] border-b border-[#808080]">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-bold text-neutral-800 w-16 text-right">
            To:
          </span>
          <div className="flex-1 bevel-in bg-white px-2 py-1 font-mono text-xs font-bold text-black truncate select-text">
            {contact.email}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-bold text-neutral-800 w-16 text-right">
            Phone:
          </span>
          <div className="flex-1 bevel-in bg-white px-2 py-1 font-mono text-xs text-black select-text">
            {contact.phone}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-bold text-neutral-800 w-16 text-right">
            Subject:
          </span>
          <div className="flex-1 bevel-in bg-white px-2 py-0.5">
            <input
              type="text"
              placeholder="Engineering collaboration / Architecture discussion"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-transparent outline-none font-mono text-xs text-black"
            />
          </div>
        </div>
      </div>

      {/* 3. Message Body Container */}
      <div className="flex-1 p-2 bg-[#C0C0C0]">
        <textarea
          rows={7}
          placeholder="Type your message here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full h-full bevel-in p-2.5 font-mono text-xs outline-none bg-white text-black resize-none"
        />
      </div>
    </div>
  );
}
