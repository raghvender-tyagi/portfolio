import React from "react";

export default function RetroMacIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <style>{`
        @keyframes macBlink {
          0%, 90%, 100% {
            opacity: 1;
          }
          95% {
            opacity: 0;
          }
        }
        @keyframes macBlinkReverse {
          0%, 90%, 100% {
            opacity: 0;
          }
          95% {
            opacity: 1;
          }
        }
        .retro-eye-open {
          animation: macBlink 4s steps(1) infinite;
        }
        .retro-eye-closed {
          animation: macBlinkReverse 4s steps(1) infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[320px] h-auto drop-shadow-[4px_4px_0_#000000]"
        aria-label="Retro Macintosh computer illustration with friendly agent terminal face"
      >
        {/* Pixel Sparkles / Stars in background */}
        <g fill="#000000">
          {/* Top-left star */}
          <rect x="24" y="20" width="4" height="4" />
          <rect x="20" y="24" width="12" height="4" />
          <rect x="24" y="28" width="4" height="4" />

          {/* Top-right star */}
          <rect x="280" y="32" width="4" height="4" />
          <rect x="276" y="36" width="12" height="4" />
          <rect x="280" y="40" width="4" height="4" />

          {/* Small dust pixels */}
          <rect x="42" y="60" width="3" height="3" />
          <rect x="290" y="90" width="3" height="3" />
          <rect x="30" y="140" width="3" height="3" />
        </g>

        {/* Mac Main Body (Bevel outline & fill) */}
        {/* Shadow base */}
        <rect
          x="70"
          y="34"
          width="180"
          height="192"
          fill="#000000"
          rx="4"
        />

        {/* Outer Case */}
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

        {/* Beveled Screen Bezel */}
        <rect
          x="84"
          y="56"
          width="144"
          height="112"
          fill="#BFBFBF"
          stroke="#000000"
          strokeWidth="2.5"
        />

        {/* CRT Screen Glass (Inner display) */}
        <rect
          x="94"
          y="66"
          width="124"
          height="92"
          fill="#000000"
        />

        {/* CRT Screen Scanlines / Grayscale grid */}
        <rect
          x="96"
          y="68"
          width="120"
          height="88"
          fill="#FFFFFF"
        />

        {/* Terminal Header on Screen */}
        <rect x="96" y="68" width="120" height="14" fill="#BFBFBF" stroke="#000000" strokeWidth="1.5" />
        {/* Terminal Title */}
        <text
          x="100"
          y="78"
          fill="#000000"
          fontFamily="monospace"
          fontSize="7"
          fontWeight="bold"
        >
          SYS7:AGENT.SYS
        </text>

        {/* Agent Face Graphic on Screen */}
        <g>
          {/* Antenna / Node indicator */}
          <rect x="154" y="86" width="4" height="6" fill="#000000" />
          <rect x="152" y="84" width="8" height="2" fill="#000000" />

          {/* Robot Agent Head */}
          <rect
            x="126"
            y="92"
            width="60"
            height="42"
            fill="#D9D9D9"
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Eyes (Open state) */}
          <g className="retro-eye-open">
            <rect x="136" y="102" width="10" height="10" fill="#000000" />
            <rect x="138" y="104" width="4" height="4" fill="#FFFFFF" />

            <rect x="166" y="102" width="10" height="10" fill="#000000" />
            <rect x="168" y="104" width="4" height="4" fill="#FFFFFF" />
          </g>

          {/* Eyes (Closed/Blinking state) */}
          <g className="retro-eye-closed">
            <rect x="135" y="106" width="12" height="3" fill="#000000" />
            <rect x="165" y="106" width="12" height="3" fill="#000000" />
          </g>

          {/* Mouth (Stepped Smile) */}
          <rect x="144" y="122" width="24" height="3" fill="#000000" />
          <rect x="141" y="120" width="3" height="2" fill="#000000" />
          <rect x="168" y="120" width="3" height="2" fill="#000000" />

          {/* Cheek dither dots */}
          <rect x="132" y="118" width="2" height="2" fill="#000000" />
          <rect x="134" y="116" width="2" height="2" fill="#000000" />
          <rect x="176" y="118" width="2" height="2" fill="#000000" />
          <rect x="178" y="116" width="2" height="2" fill="#000000" />

          {/* Subtitle prompt line */}
          <text
            x="100"
            y="150"
            fill="#000000"
            fontFamily="monospace"
            fontSize="6.5"
            fontWeight="bold"
          >
            &gt; STATUS: SHIPPING AGENTS
          </text>
        </g>

        {/* Lower Front Panel of Macintosh */}
        {/* Floppy Drive Slot */}
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

        {/* Eject Pinhole */}
        <rect x="226" y="182" width="2" height="2" fill="#000000" />

        {/* Rainbow/Monochrome Apple-style Logo Plaque (Bottom-left) */}
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
          {/* Pixel RT inside plaque */}
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

        {/* Horizontal Air Vents on Bottom Chin */}
        <g fill="#000000">
          <rect x="92" y="202" width="128" height="2" />
          <rect x="92" y="207" width="128" height="2" />
          <rect x="92" y="212" width="128" height="2" />
        </g>

        {/* Keyboard Placed in Front (Isometric-ish) */}
        <g>
          {/* Shadow */}
          <polygon
            points="46,242 266,242 258,266 38,266"
            fill="#000000"
          />
          {/* Main Key Deck */}
          <polygon
            points="44,238 264,238 256,262 36,262"
            fill="#D9D9D9"
            stroke="#000000"
            strokeWidth="2.5"
          />
          {/* Key Rows Lines */}
          <line x1="48" y1="244" x2="258" y2="244" stroke="#000000" strokeWidth="1.5" />
          <line x1="45" y1="250" x2="254" y2="250" stroke="#000000" strokeWidth="1.5" />
          <line x1="42" y1="256" x2="250" y2="256" stroke="#000000" strokeWidth="1.5" />

          {/* Individual Keys Pattern */}
          <rect x="52" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="64" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="76" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="88" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
          <rect x="100" y="240" width="8" height="3" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />

          {/* Spacebar */}
          <rect x="90" y="252" width="60" height="3.5" fill="#BFBFBF" stroke="#000000" strokeWidth="1" />
        </g>

        {/* Classic Mac Mouse (Right side) */}
        <g>
          {/* Coiled Cord */}
          <path
            d="M 276 256 C 286 254, 286 244, 276 242 C 266 240, 266 230, 274 228"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
          />

          {/* Mouse Shadow */}
          <rect x="278" y="246" width="22" height="30" rx="3" fill="#000000" />
          {/* Mouse Body */}
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
          {/* Single Rectangular Button */}
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

