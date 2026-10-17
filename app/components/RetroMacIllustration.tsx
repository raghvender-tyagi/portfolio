"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const STATUS_LINES = [
  "> STATUS: SHIPPING AGENTS",
  "> COMPILING...",
  "> ALL TESTS PASSING",
];

export default function RetroMacIllustration({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState<"left" | "center" | "right">("center");
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [expression, setExpression] = useState<"idle" | "happy" | "winking">("idle");
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Pupil Cursor Tracking (Snapped to 3 discrete stepped positions: Left, Center, Right)
  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const deltaX = e.clientX - centerX;

      if (deltaX < -80) {
        setPupilPosition("left");
      } else if (deltaX > 80) {
        setPupilPosition("right");
      } else {
        setPupilPosition("center");
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [prefersReducedMotion]);

  // Stepped status line cycling every 3.5s
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_LINES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Click computer: 1-second screen flicker (invert frames) + swap expression
  const handleClickComputer = useCallback(() => {
    setIsFlickering(true);
    setExpression((prev) => {
      if (prev === "idle") return "happy";
      if (prev === "happy") return "winking";
      return "idle";
    });

    setTimeout(() => {
      setIsFlickering(false);
    }, 1000);
  }, []);

  // Pupil X coordinates based on stepped position
  const leftPupilX = pupilPosition === "left" ? 136 : pupilPosition === "right" ? 140 : 138;
  const rightPupilX = pupilPosition === "left" ? 166 : pupilPosition === "right" ? 170 : 168;

  return (
    <div
      ref={containerRef}
      onClick={handleClickComputer}
      title="Click computer to swap face expression!"
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      <style>{`
        /* Stepped 2-frame blink every ~4s */
        @keyframes macBlink {
          0%, 88%, 100% { opacity: 1; }
          94% { opacity: 0; }
        }
        @keyframes macBlinkReverse {
          0%, 88%, 100% { opacity: 0; }
          94% { opacity: 1; }
        }
        .retro-eye-open {
          animation: macBlink 4s steps(1) infinite;
        }
        .retro-eye-closed {
          animation: macBlinkReverse 4s steps(1) infinite;
        }

        /* Twinkling sparkles at staggered stepped intervals */
        @keyframes sparkleTwinkleA {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.5); opacity: 0.3; }
        }
        @keyframes sparkleTwinkleB {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .sparkle-a {
          animation: sparkleTwinkleA 2.4s steps(2) infinite;
          transform-origin: center;
        }
        .sparkle-b {
          animation: sparkleTwinkleB 3.2s steps(2) infinite 1.2s;
          transform-origin: center;
        }

        /* Screen flicker stepped inversion (1s duration) */
        @keyframes screenFlickerAnim {
          0% { filter: invert(0); }
          25% { filter: invert(1); }
          50% { filter: invert(0); }
          75% { filter: invert(1); }
          100% { filter: invert(0); }
        }
        .animate-flicker {
          animation: screenFlickerAnim 1s steps(1) 1;
        }

        /* Blinking terminal cursor */
        @keyframes blockBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .terminal-block-cursor {
          animation: blockBlink 0.9s steps(1) infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[320px] h-auto drop-shadow-[4px_4px_0_#000000]"
        aria-label="Interactive retro Macintosh computer with responsive agent face"
      >
        {/* Twinkling Sparkles in background */}
        <g fill="#000000">
          {/* Top-left star */}
          <g className="sparkle-a">
            <rect x="24" y="20" width="4" height="4" />
            <rect x="20" y="24" width="12" height="4" />
            <rect x="24" y="28" width="4" height="4" />
          </g>

          {/* Top-right star */}
          <g className="sparkle-b">
            <rect x="280" y="32" width="4" height="4" />
            <rect x="276" y="36" width="12" height="4" />
            <rect x="280" y="40" width="4" height="4" />
          </g>

          {/* Small dust pixels */}
          <rect x="42" y="60" width="3" height="3" />
          <rect x="290" y="90" width="3" height="3" />
          <rect x="30" y="140" width="3" height="3" />
        </g>

        {/* Mac Main Body Case */}
        <rect x="70" y="34" width="180" height="192" fill="#000000" rx="4" />
        <rect
          x="66"
          y="30"
          width="180"
          height="190"
          fill="#D9D9D9"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* Top Handle Recess */}
        <rect
          x="125"
          y="36"
          width="62"
          height="8"
          fill="#BFBFBF"
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Screen Bezel */}
        <rect
          x="84"
          y="56"
          width="144"
          height="112"
          fill="#BFBFBF"
          stroke="#000000"
          strokeWidth="2.5"
        />

        {/* CRT Screen Tube (Flickers on click) */}
        <g className={isFlickering ? "animate-flicker" : ""}>
          <rect x="94" y="66" width="124" height="92" fill="#000000" />
          <rect x="96" y="68" width="120" height="88" fill="#FFFFFF" />

          {/* CRT Header Stripe */}
          <rect
            x="96"
            y="68"
            width="120"
            height="14"
            fill="#BFBFBF"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="78"
            fill="#000000"
            fontFamily="monospace"
            fontSize="7"
            fontWeight="bold"
          >
            SYS7:AGENT.SYS [CLICK ME]
          </text>

          {/* Robot Agent Graphic on Screen */}
          <g>
            {/* Antenna / Node */}
            <rect x="154" y="86" width="4" height="6" fill="#000000" />
            <rect x="152" y="84" width="8" height="2" fill="#000000" />

            {/* Robot Head */}
            <rect
              x="126"
              y="92"
              width="60"
              height="42"
              fill="#D9D9D9"
              stroke="#000000"
              strokeWidth="2"
            />

            {/* EYES LOGIC */}
            {expression === "winking" ? (
              // Left Eye Open, Right Eye Wink
              <>
                <rect x="136" y="102" width="10" height="10" fill="#000000" />
                <rect x={leftPupilX} y="104" width="4" height="4" fill="#FFFFFF" />
                <rect x="165" y="106" width="12" height="3" fill="#000000" />
              </>
            ) : (
              <>
                {/* Normal / Happy Eyes with Stepped Blink */}
                <g className="retro-eye-open">
                  <rect x="136" y="102" width="10" height="10" fill="#000000" />
                  <rect x={leftPupilX} y="104" width="4" height="4" fill="#FFFFFF" />

                  <rect x="166" y="102" width="10" height="10" fill="#000000" />
                  <rect x={rightPupilX} y="104" width="4" height="4" fill="#FFFFFF" />
                </g>

                <g className="retro-eye-closed">
                  <rect x="135" y="106" width="12" height="3" fill="#000000" />
                  <rect x="165" y="106" width="12" height="3" fill="#000000" />
                </g>
              </>
            )}

            {/* MOUTH LOGIC */}
            {expression === "happy" ? (
              // Big Happy Open Smile
              <g>
                <polygon points="144,120 168,120 162,126 150,126" fill="#000000" />
                <rect x="148" y="121" width="8" height="2" fill="#FFFFFF" />
              </g>
            ) : (
              // Regular Stepped Smile
              <g>
                <rect x="144" y="122" width="24" height="3" fill="#000000" />
                <rect x="141" y="120" width="3" height="2" fill="#000000" />
                <rect x="168" y="120" width="3" height="2" fill="#000000" />
              </g>
            )}

            {/* Cheek Dots */}
            <rect x="132" y="118" width="2" height="2" fill="#000000" />
            <rect x="134" y="116" width="2" height="2" fill="#000000" />
            <rect x="176" y="118" width="2" height="2" fill="#000000" />
            <rect x="178" y="116" width="2" height="2" fill="#000000" />

            {/* Cycling Status Line with Blinking Cursor */}
            <text
              x="100"
              y="150"
              fill="#000000"
              fontFamily="monospace"
              fontSize="6.5"
              fontWeight="bold"
            >
              {STATUS_LINES[statusIndex]}
            </text>
            <rect
              x={98 + STATUS_LINES[statusIndex].length * 4.2}
              y="144"
              width="4"
              height="7"
              fill="#000000"
              className="terminal-block-cursor"
            />
          </g>
        </g>

        {/* Lower Front Panel of Macintosh */}
        {/* Floppy Slot */}
        <rect
          x="146"
          y="180"
          width="76"
          height="5"
          fill="#000000"
          stroke="#000000"
          strokeWidth="1"
        />
        <rect x="148" y="181" width="72" height="1" fill="#FFFFFF" />
        <rect x="226" y="182" width="2" height="2" fill="#000000" />

        {/* Pixel RT Badge Plaque */}
        <g>
          <rect
            x="92"
            y="178"
            width="12"
            height="14"
            fill="#BFBFBF"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <text
            x="94"
            y="188"
            fill="#000000"
            fontFamily="monospace"
            fontSize="8"
            fontWeight="bold"
          >
            RT
          </text>
        </g>

        {/* Bottom Air Vents */}
        <g fill="#000000">
          <rect x="92" y="202" width="128" height="2" />
          <rect x="92" y="207" width="128" height="2" />
          <rect x="92" y="212" width="128" height="2" />
        </g>

        {/* Keyboard Deck */}
        <g>
          <polygon points="46,242 266,242 258,266 38,266" fill="#000000" />
          <polygon
            points="44,238 264,238 256,262 36,262"
            fill="#D9D9D9"
            stroke="#000000"
            strokeWidth="2.5"
          />
          <line x1="48" y1="244" x2="258" y2="244" stroke="#000000" strokeWidth="1.5" />
          <line x1="45" y1="250" x2="254" y2="250" stroke="#000000" strokeWidth="1.5" />
          <line x1="42" y1="256" x2="250" y2="256" stroke="#000000" strokeWidth="1.5" />
          <rect x="52" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="64" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="76" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="88" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="100" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="90" y="252" width="60" height="3.5" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
        </g>

        {/* Classic Mac Mouse */}
        <g>
          <path
            d="M 276 256 C 286 254, 286 244, 276 242 C 266 240, 266 230, 274 228"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
          />
          <rect x="278" y="246" width="22" height="30" rx="3" fill="#000000" />
          <rect
            x="276"
            y="244"
            width="22"
            height="30"
            rx="3"
            fill="#D9D9D9"
            stroke="#000000"
            strokeWidth="2"
          />
          <rect
            x="278"
            y="246"
            width="18"
            height="10"
            fill="#BFBFBF"
            stroke="#000000"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
