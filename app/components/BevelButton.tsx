"use client";

import React, { useState } from "react";
import Link from "next/link";

interface BevelButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  download?: boolean | string;
  variant?: "default" | "inverted";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showDownloadProgress?: boolean;
}

export default function BevelButton({
  href,
  onClick,
  target,
  rel,
  download,
  variant = "default",
  size = "md",
  className = "",
  children,
  title,
  type = "button",
  disabled = false,
  showDownloadProgress,
}: BevelButtonProps) {
  const [isBursting, setIsBursting] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  const isDownload = showDownloadProgress || !!download;

  const handleClick = (e: React.MouseEvent) => {
    // 3-frame pixel burst (200ms)
    setIsBursting(true);
    setTimeout(() => setIsBursting(false), 200);

    // If it's a resume download, show stepped progress bar
    if (isDownload && href) {
      e.preventDefault();
      setDownloadProgress("COPYING... [██░░░░░░]");

      setTimeout(() => {
        setDownloadProgress("COPYING... [██████░░]");
      }, 350);

      setTimeout(() => {
        setDownloadProgress("COPYING... [████████]");
      }, 650);

      setTimeout(() => {
        setDownloadProgress("DONE ✓");
        // Trigger real download
        const a = document.createElement("a");
        a.href = href;
        if (typeof download === "string") {
          a.download = download;
        } else {
          a.download = "Raghvender_Tyagi_Resume.pdf";
        }
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Reset label after 1.2s
        setTimeout(() => {
          setDownloadProgress(null);
        }, 1200);
      }, 850);
    }

    onClick?.(e);
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-4 py-2 text-xs md:text-sm",
    lg: "px-6 py-3 text-sm md:text-base",
  }[size];

  const variantStyles = {
    default:
      "bg-[#D9D9D9] text-black hover:bg-[#BFBFBF] active:bg-[#BFBFBF]",
    inverted:
      "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900",
  }[variant];

  const baseStyles =
    "relative inline-flex items-center justify-center font-pixel font-bold uppercase tracking-wider border-2 border-black select-none mac-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black focus-visible:outline-offset-2 transition-transform duration-75 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = downloadProgress ? (
    <span className="font-pixel text-[11px] tracking-tight">{downloadProgress}</span>
  ) : (
    children
  );

  return (
    <span className="relative inline-block">
      {/* 3-Frame Pixel Burst (+ marks at corners on click) */}
      {isBursting && (
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between p-[-6px]"
        >
          <span className="absolute -top-2 -left-2 text-black font-pixel text-xs font-bold animate-ping">
            +
          </span>
          <span className="absolute -top-2 -right-2 text-black font-pixel text-xs font-bold animate-ping">
            +
          </span>
          <span className="absolute -bottom-2 -left-2 text-black font-pixel text-xs font-bold animate-ping">
            +
          </span>
          <span className="absolute -bottom-2 -right-2 text-black font-pixel text-xs font-bold animate-ping">
            +
          </span>
        </span>
      )}

      {href && !isDownload ? (
        <Link
          href={href}
          target={
            target ||
            (href.startsWith("http") &&
            !href.startsWith("mailto:") &&
            !href.startsWith("tel:")
              ? "_blank"
              : undefined)
          }
          rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
          onClick={handleClick}
          className={combinedStyles}
          title={title}
        >
          {content}
        </Link>
      ) : (
        <button
          type={type}
          onClick={handleClick}
          disabled={disabled || downloadProgress !== null}
          className={combinedStyles}
          title={title}
        >
          {content}
        </button>
      )}
    </span>
  );
}
