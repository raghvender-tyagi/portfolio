"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { flyingChip16, rtStartLogo16 } from "@/data/sprites";
import { useWindowStore } from "@/lib/os/windowStore";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

export default function Screensaver() {
  const { screensaverEnabled } = useWindowStore();
  const [isActive, setIsActive] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const resetTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (!screensaverEnabled) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setIsActive(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsActive(true);
      }, 60000); // 60s inactivity
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("pointerdown", handleActivity);

    timeoutId = setTimeout(() => {
      setIsActive(true);
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("pointerdown", handleActivity);
    };
  }, [screensaverEnabled]);

  if (!isActive) return null;

  return (
    <div
      role="presentation"
      onClick={resetTimer}
      className="fixed inset-0 bg-black z-[130] cursor-none flex items-center justify-center select-none overflow-hidden"
    >
      <style>{`
        @keyframes floatLogo {
          0% { transform: translate(-30vw, -30vh); }
          25% { transform: translate(30vw, -20vh); }
          50% { transform: translate(25vw, 30vh); }
          75% { transform: translate(-25vw, 20vh); }
          100% { transform: translate(-30vw, -30vh); }
        }
        @keyframes driftChip1 {
          0% { transform: translate(-10vw, 20vh); }
          100% { transform: translate(110vw, 60vh); }
        }
        @keyframes driftChip2 {
          0% { transform: translate(110vw, 10vh); }
          100% { transform: translate(-10vw, 70vh); }
        }
        .bouncing-logo {
          animation: floatLogo 22s steps(60) infinite;
        }
      `}</style>

      {/* Reduced motion static overlay */}
      {prefersReducedMotion ? (
        <div className="text-white font-pixel text-xs tracking-wider text-center p-6 border-2 border-white">
          <span>RT-OS 95 SCREENSAVER • PRESS ANY KEY TO WAKE</span>
        </div>
      ) : (
        <>
          {/* Crisp 16x16 integer-scale (3x) flying microchips */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute"
              style={{
                animation: "driftChip1 18s steps(40) infinite",
              }}
            >
              <PixelSprite sprite={flyingChip16} scale={3} />
            </div>
            <div
              className="absolute"
              style={{
                animation: "driftChip2 24s steps(40) infinite 6s",
              }}
            >
              <PixelSprite sprite={flyingChip16} scale={3} />
            </div>
            <div
              className="absolute"
              style={{
                animation: "driftChip1 20s steps(40) infinite 10s",
              }}
            >
              <PixelSprite sprite={flyingChip16} scale={2} />
            </div>
          </div>

          {/* Stepped Bouncing RT-OS 95 Logo */}
          <div className="bouncing-logo border-2 border-white bg-black p-4 text-center shadow-[4px_4px_0_#444] flex flex-col items-center gap-2">
            <PixelSprite sprite={rtStartLogo16} scale={2} />
            <span className="font-pixel text-xl font-bold tracking-widest text-white block">
              RT-OS 95
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
              PRESS ANY KEY TO WAKE
            </span>
          </div>
        </>
      )}
    </div>
  );
}
