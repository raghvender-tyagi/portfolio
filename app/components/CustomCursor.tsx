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

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

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
      // Smooth lerp
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      setPos({ x: currentX, y: currentY });
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
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: "opacity 0.15s ease",
      }}
      aria-hidden="true"
    >
      {/* Soft electric-blue glow */}
      <div
        className="absolute -top-12 -left-12 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 75, 255, 0.22) 0%, rgba(59, 75, 255, 0.05) 50%, transparent 70%)",
        }}
      />

      {/* Brutalist cursor square */}
      <div
        className={`absolute -top-1.5 -left-1.5 border border-[#3B4BFF] transition-all duration-150 ease-out ${
          isHovered
            ? "w-8 h-8 -top-4 -left-4 bg-[#3B4BFF]/20 border-[#3B4BFF]"
            : "w-3 h-3 bg-white/90"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 0 12px rgba(59, 75, 255, 0.4)"
            : "0 0 6px rgba(59, 75, 255, 0.3)",
        }}
      />
    </div>
  );
}
