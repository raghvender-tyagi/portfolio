import React from "react";
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
}: BevelButtonProps) {
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
    "inline-flex items-center justify-center font-pixel font-bold uppercase tracking-wider border-2 border-black select-none mac-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-black focus-visible:outline-offset-2 transition-transform duration-75 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const defaultRel = isExternal ? "noopener noreferrer" : undefined;

    return (
      <Link
        href={href}
        target={target || (isExternal && !href.startsWith("mailto:") && !href.startsWith("tel:") ? "_blank" : undefined)}
        rel={rel || defaultRel}
        download={download}
        onClick={onClick}
        className={combinedStyles}
        title={title}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      title={title}
    >
      {children}
    </button>
  );
}

