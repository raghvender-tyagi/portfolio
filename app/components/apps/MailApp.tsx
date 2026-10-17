"use client";

import React, { useState } from "react";
import BevelButton from "../BevelButton";
import { portfolioContent } from "@/data/content";

export default function MailApp() {
  const { contact } = portfolioContent;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject || "Inquiry from RT-OS Portfolio"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-white text-black font-mono text-xs flex flex-col h-full justify-between select-text space-y-3">
      {/* Fields */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 border-b border-black pb-1.5">
          <span className="font-pixel text-[10px] font-bold uppercase w-16">
            To:
          </span>
          <span className="font-bold text-black flex-1 truncate">
            {contact.email}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="font-pixel text-[9px] uppercase px-1.5 py-0.5 border border-black bg-[#D9D9D9] hover:bg-black hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-black pb-1.5">
          <label htmlFor="mail-subject" className="font-pixel text-[10px] font-bold uppercase w-16">
            Subject:
          </label>
          <input
            id="mail-subject"
            type="text"
            placeholder="Role discussion / Engineering collaboration"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 font-mono text-xs outline-none bg-transparent"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="mail-body" className="font-pixel text-[10px] font-bold uppercase">
            Message Body:
          </label>
          <textarea
            id="mail-body"
            rows={7}
            placeholder="Write your note here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border-2 border-black p-2 font-mono text-xs outline-none bg-white resize-none"
          />
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-2 border-t-2 border-black">
        <span className="font-pixel text-[10px] text-black/60">
          PHONE: {contact.phone}
        </span>
        <BevelButton onClick={handleSend} variant="inverted" size="sm">
          Send Dispatch ✉
        </BevelButton>
      </div>
    </div>
  );
}
