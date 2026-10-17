"use client";

import React, { useState, useEffect } from "react";
import PixelSprite from "./PixelSprite";
import { flyingChipFrames } from "@/data/sprites";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function FlyingChips() {
  const [konamiActive, setKonamiActive] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Konami Code Listener
  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    let inputIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey =
        KONAMI_CODE[inputIndex].length === 1
          ? KONAMI_CODE[inputIndex].toLowerCase()
          : KONAMI_CODE[inputIndex];

      if (key === expectedKey) {
        inputIndex++;
        if (inputIndex === KONAMI_CODE.length) {
          setKonamiActive(true);
          inputIndex = 0;
          setTimeout(() => setKonamiActive(false), 6000);
        }
      } else {
        inputIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <style>{`
        /* Slow stepped drift crossing in ~30s */
        @keyframes chipDriftLeftGutter {
          0% {
            transform: translate(2vw, -10vh);
          }
          50% {
            transform: translate(5vw, 50vh);
          }
          100% {
            transform: translate(2vw, 110vh);
          }
        }
        @keyframes chipDriftRightGutter {
          0% {
            transform: translate(92vw, 110vh);
          }
          50% {
            transform: translate(88vw, 50vh);
          }
          100% {
            transform: translate(94vw, -10vh);
          }
        }
        @keyframes konamiSwarm {
          0% {
            transform: translate(-10vw, 30vh) scale(1.5);
          }
          100% {
            transform: translate(110vw, 60vh) scale(1.5);
          }
        }

        .flying-chip-left-1 {
          animation: chipDriftLeftGutter 32s steps(60) infinite;
        }
        .flying-chip-left-2 {
          animation: chipDriftLeftGutter 28s steps(60) infinite 14s;
        }
        .flying-chip-right-1 {
          animation: chipDriftRightGutter 30s steps(60) infinite;
        }
        .flying-chip-right-2 {
          animation: chipDriftRightGutter 34s steps(60) infinite 17s;
        }
      `}</style>

      {/* Ambient Flying Chips in Margins only (>=1100px screens) */}
      <div
        aria-hidden="true"
        className="hidden min-[1100px]:block fixed inset-0 pointer-events-none z-10 overflow-hidden"
      >
        {/* Left Gutter Chips (opacity 25%) */}
        <div className="absolute top-0 left-0 opacity-25 flying-chip-left-1">
          <PixelSprite frames={flyingChipFrames} fps={3} scale={2} />
        </div>
        <div className="absolute top-0 left-0 opacity-25 flying-chip-left-2">
          <PixelSprite frames={flyingChipFrames} fps={3} scale={2} />
        </div>

        {/* Right Gutter Chips (opacity 25%) */}
        <div className="absolute top-0 left-0 opacity-25 flying-chip-right-1">
          <PixelSprite frames={flyingChipFrames} fps={3} scale={2} />
        </div>
        <div className="absolute top-0 left-0 opacity-25 flying-chip-right-2">
          <PixelSprite frames={flyingChipFrames} fps={3} scale={2} />
        </div>
      </div>

      {/* Konami Easter Egg Swarm */}
      {konamiActive && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/10"
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 font-pixel text-xs border-2 border-white select-none">
            ★ KONAMI OVERCLOCK ACTIVATED: +300% CHIP FLIGHT ★
          </div>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${(i * 7) % 80}vh`,
                left: "-50px",
                animation: `konamiSwarm ${3 + (i % 3)}s steps(40) infinite ${i * 0.25}s`,
              }}
            >
              <PixelSprite frames={flyingChipFrames} fps={6} scale={3} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
