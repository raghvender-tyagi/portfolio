"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSprite from "./PixelSprite";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import {
  walkingRobotRight,
  walkingRobotLeft,
  robotFaceSprites,
  heartSprite,
} from "@/data/sprites";

const TIPS = [
  "Psst. Check the projects.",
  "Try the Konami code. (↑ ↑ ↓ ↓ ← → ← → B A)",
  "I debug in production. Kidding.",
  "AST validation beats regex every time.",
  "System 7: 16MB RAM was plenty.",
];

export default function WalkingSidekick() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [posX, setPosX] = useState<number>(60);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [petted, setPetted] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Sync with localStorage & prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("sys7_sidekick");
        if (stored !== null) {
          setEnabled(stored === "true");
        }
      } catch {
        // ignore
      }
    }, 0);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sys7_sidekick") {
        setEnabled(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorage);

    // Custom event for internal toggle
    const handleCustomToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setEnabled(customEvent.detail.enabled);
    };
    window.addEventListener("sidekick-toggle", handleCustomToggle as EventListener);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sidekick-toggle", handleCustomToggle as EventListener);
    };
  }, [prefersReducedMotion]);

  // Stepped Walking Movement
  useEffect(() => {
    if (!enabled || isPaused) return;

    const stepSize = 4;
    const intervalTime = 160; // stepped cadence

    const walkTimer = setInterval(() => {
      const maxRight = Math.max(
        200,
        (typeof window !== "undefined" ? window.innerWidth : 1000) - 120
      );
      const minLeft = 40;

      setPosX((prev) => {
        if (direction === "right") {
          const next = prev + stepSize;
          if (next >= maxRight) {
            setDirection("left");
            return maxRight;
          }
          return next;
        } else {
          const next = prev - stepSize;
          if (next <= minLeft) {
            setDirection("right");
            return minLeft;
          }
          return next;
        }
      });
    }, intervalTime);

    return () => clearInterval(walkTimer);
  }, [enabled, isPaused, direction]);

  // Periodic Speech Bubble Tip (~every 25s for 3.5s)
  useEffect(() => {
    if (!enabled) return;

    const tipTimer = setInterval(() => {
      setIsPaused(true);
      const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
      setCurrentTip(randomTip);

      const hideTimer = setTimeout(() => {
        setCurrentTip(null);
        setIsPaused(false);
      }, 3500);

      return () => clearTimeout(hideTimer);
    }, 25000);

    return () => clearInterval(tipTimer);
  }, [enabled]);

  // Handle Mascot Petting / Clicking
  const handlePet = useCallback(() => {
    setPetted(true);
    setCurrentTip(null);
    setIsPaused(true);

    const timer = setTimeout(() => {
      setPetted(false);
      setIsPaused(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!enabled) return null;

  return (
    <aside
      aria-label="Desktop Sidekick Mascot"
      className="fixed top-8 z-40 select-none pointer-events-auto"
      style={{
        left: `${posX}px`,
        transition: "left 0.16s steps(1)", // pure stepped position
      }}
    >
      {/* Speech Bubble */}
      {currentTip && (
        <div
          role="status"
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border-2 border-black mac-shadow-sm px-2.5 py-1 text-[11px] font-pixel text-black whitespace-nowrap z-50 animate-in fade-in"
        >
          <span>{currentTip}</span>
          {/* Speech bubble tail pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black" />
        </div>
      )}

      {/* Floating Pet Heart */}
      {petted && (
        <div className="absolute -top-8 left-2 z-50 animate-bounce">
          <PixelSprite sprite={heartSprite} scale={2} />
        </div>
      )}

      {/* Walking Mascot Sprite */}
      <button
        type="button"
        onClick={handlePet}
        aria-label="Click to pet desktop mascot"
        title="Click to pet robot!"
        className="cursor-pointer bg-transparent border-none p-0 outline-none focus-visible:ring-1 focus-visible:ring-black"
      >
        {petted ? (
          <PixelSprite sprite={robotFaceSprites.happy} scale={2} />
        ) : (
          <PixelSprite
            frames={direction === "right" ? walkingRobotRight : walkingRobotLeft}
            fps={4}
            scale={2}
            paused={isPaused}
          />
        )}
      </button>
    </aside>
  );
}
