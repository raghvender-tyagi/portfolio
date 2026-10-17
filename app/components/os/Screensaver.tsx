"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { flyingChipFrames } from "@/data/sprites";
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
      className="fixed inset-0 bg-black z-[100] cursor-none flex items-center justify-center select-none overflow-hidden"
    >
      <style>{`
        @keyframes floatLogo {
          0% { transform: translate(-30vw, -30vh); }
          25% { transform: translate(30vw, -20vh); }
          50% { transform: translate(25vw, 30vh); }
          75% { transform: translate(-25vw, 20vh); }
          100% { transform: translate(-30vw, -30vh); }
        }
        .bouncing-logo {
          animation: floatLogo 24s steps(60) infinite;
        }
      `}</style>

      {/* Reduced motion static overlay */}
      {prefersReducedMotion ? (
        <div className="text-white font-pixel text-xs tracking-wider text-center p-6 border-2 border-white">
          <span>RT-OS 1.0 SCREENSAVER • PRESS ANY KEY TO WAKE</span>
        </div>
      ) : (
        <>
          {/* 4-6 Flying Winged Chips screensaver drift */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[10%] opacity-80 flying-chip-left-1">
              <PixelSprite frames={flyingChipFrames} fps={4} scale={3} />
            </div>
            <div className="absolute top-[30%] right-[15%] opacity-80 flying-chip-right-1">
              <PixelSprite frames={flyingChipFrames} fps={4} scale={3} />
            </div>
            <div className="absolute bottom-[20%] left-[25%] opacity-80 flying-chip-left-2">
              <PixelSprite frames={flyingChipFrames} fps={4} scale={3} />
            </div>
            <div className="absolute bottom-[40%] right-[30%] opacity-80 flying-chip-right-2">
              <PixelSprite frames={flyingChipFrames} fps={4} scale={3} />
            </div>
          </div>

          {/* Stepped Bouncing RT Logo */}
          <div className="bouncing-logo border-2 border-white bg-black p-3 text-center">
            <span className="font-pixel text-2xl font-bold tracking-widest text-white block">
              RT-OS
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/70 block mt-1">
              PRESS ANY KEY TO WAKE
            </span>
          </div>
        </>
      )}
    </div>
  );
}
