"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const m1 = window.matchMedia("(pointer: coarse)");
  const m2 = window.matchMedia("(prefers-reduced-motion: reduce)");
  m1.addEventListener("change", callback);
  m2.addEventListener("change", callback);
  return () => {
    m1.removeEventListener("change", callback);
    m2.removeEventListener("change", callback);
  };
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getPointerServerSnapshot() {
  return true;
}

export default function CustomCursor() {
  const isTouch = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [glowPos, setGlowPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let gX = -100;
    let gY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, [role='button'], [role='tab'], input, textarea, summary"
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Cursor fast lerp
      curX += (targetX - curX) * 0.35;
      curY += (targetY - curY) * 0.35;
      setCursorPos({ x: curX, y: curY });

      // Glow slight lag lerp 0.15
      gX += (targetX - gX) * 0.15;
      gY += (targetY - gY) * 0.15;
      setGlowPos({ x: gX, y: gY });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Soft radial glow below content at z-[5] (never darkens or sits above text) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[5]"
        style={{
          transform: `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 -left-20 w-40 h-40 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 75, 255, 0.18) 0%, rgba(59, 75, 255, 0.05) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* 2. Single small square cursor (10px) growing to 32px over links at z-[60] */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[60]"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        <div
          className={`absolute transition-all duration-150 ease-out border ${
            isHovered
              ? "w-8 h-8 -top-4 -left-4 border-[#3B4BFF] bg-[#3B4BFF]/15"
              : "w-2.5 h-2.5 -top-[5px] -left-[5px] border-[#161616] bg-[#161616]"
          }`}
          style={{
            boxShadow: isHovered ? "0 0 10px rgba(59, 75, 255, 0.35)" : "none",
          }}
        />
      </div>
    </>
  );
}
