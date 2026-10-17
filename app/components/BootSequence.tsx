"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function BootSequence({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [bootStep, setBootStep] = useState<number>(0);
  const [zoomStep, setZoomStep] = useState<number>(0); // 0 = not zooming, 1..4 = expanding rect, 5 = done
  const [isDismissed, setIsDismissed] = useState<boolean>(true); // start true to prevent SSR flash

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem("sys7_booted", "true");
    } catch {
      // ignore
    }
    setZoomStep(1);
    const z1 = setTimeout(() => setZoomStep(2), 70);
    const z2 = setTimeout(() => setZoomStep(3), 140);
    const z3 = setTimeout(() => setZoomStep(4), 210);
    const z4 = setTimeout(() => {
      setZoomStep(5);
      setIsDismissed(true);
      onComplete?.();
    }, 280);

    return () => {
      clearTimeout(z1);
      clearTimeout(z2);
      clearTimeout(z3);
      clearTimeout(z4);
    };
  }, [onComplete]);

  const instantSkip = useCallback(() => {
    try {
      sessionStorage.setItem("sys7_booted", "true");
    } catch {
      // ignore
    }
    setIsDismissed(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timerId: ReturnType<typeof setTimeout> | null = null;
    let t1: ReturnType<typeof setTimeout> | null = null;
    let t2: ReturnType<typeof setTimeout> | null = null;
    let t3: ReturnType<typeof setTimeout> | null = null;
    let t4: ReturnType<typeof setTimeout> | null = null;

    const startBoot = () => {
      // Check if already booted in this session
      try {
        if (sessionStorage.getItem("sys7_booted") === "true") {
          return;
        }
      } catch {
        // fallback
      }

      // Check prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        instantSkip();
        return;
      }

      // Ready to boot
      setIsDismissed(false);

      // Boot timeline: <= 1.5s total
      t1 = setTimeout(() => setBootStep(1), 250); // MEMORY CHECK
      t2 = setTimeout(() => setBootStep(2), 650); // LOADING AGENTS
      t3 = setTimeout(() => setBootStep(3), 1100); // WELCOME
      t4 = setTimeout(() => finishBoot(), 1500); // Trigger zoom rect
    };

    timerId = setTimeout(startBoot, 0);

    // Keyboard ESC listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        instantSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
      if (t4) clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot, instantSkip]);

  if (isDismissed) return null;

  return (
    <>
      <style>{`
        @keyframes bootProgress {
          0% { width: 0%; }
          25% { width: 25%; }
          50% { width: 55%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
        .boot-bar-fill {
          animation: bootProgress 1.2s steps(4) forwards;
        }
      `}</style>

      {/* Main Boot Screen Terminal */}
      {zoomStep === 0 && (
        <div
          role="dialog"
          aria-label="System Boot Sequence"
          className="fixed inset-0 bg-black text-white z-[100] flex flex-col justify-between p-6 sm:p-12 font-mono select-none"
        >
          {/* Top Header / Skip Button */}
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-white inline-block" />
              <span className="font-pixel text-xs tracking-wider uppercase text-white/80">
                SYSTEM 7.1 ROM RELEASE (68030)
              </span>
            </div>
            <button
              type="button"
              onClick={instantSkip}
              className="font-pixel text-xs px-2.5 py-1 bg-white text-black border border-white hover:bg-neutral-300 active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Skip [ESC] ↗
            </button>
          </div>

          {/* Stepped Boot Logs */}
          <div className="max-w-xl space-y-3 py-8 text-xs sm:text-sm">
            <div className="text-white/70">&gt; SYS7 BOOT...</div>
            {bootStep >= 1 && (
              <div className="text-white/90">
                &gt; MEMORY CHECK: 16384 KB OK (FAST RAM DETECTED)
              </div>
            )}
            {bootStep >= 2 && (
              <div className="text-white">
                &gt; LOADING AGENTS .................... <span className="font-bold text-white">[ DONE ]</span>
              </div>
            )}
            {bootStep >= 3 && (
              <div className="text-white font-bold text-sm sm:text-base pt-2">
                &gt; WELCOME, RAGHVENDER.
              </div>
            )}

            {/* Stepped Progress Bar */}
            <div className="pt-4 max-w-md">
              <div className="h-4 border-2 border-white p-0.5 bg-black">
                <div className="h-full bg-white boot-bar-fill" />
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="border-t border-white/20 pt-3 text-[10px] sm:text-xs text-white/60 flex items-center justify-between">
            <span>STARTUP DISK: MACINTOSH HD</span>
            <span>PRESS ESC TO INTERRUPT</span>
          </div>
        </div>
      )}

      {/* Stepped Zoom Rect Effect on Window Opening */}
      {zoomStep >= 1 && zoomStep <= 4 && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          <div
            className="border-4 border-black bg-white/40"
            style={{
              width:
                zoomStep === 1
                  ? "20vw"
                  : zoomStep === 2
                  ? "45vw"
                  : zoomStep === 3
                  ? "70vw"
                  : "95vw",
              height:
                zoomStep === 1
                  ? "15vh"
                  : zoomStep === 2
                  ? "35vh"
                  : zoomStep === 3
                  ? "65vh"
                  : "90vh",
            }}
          />
        </div>
      )}
    </>
  );
}
