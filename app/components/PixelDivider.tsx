export default function PixelDivider({
  from = "dark",
  to = "light",
}: {
  from?: "dark" | "light";
  to?: "dark" | "light";
}) {
  const fromColor = from === "dark" ? "#161616" : "#E4E4E4";
  const toColor = to === "dark" ? "#161616" : "#E4E4E4";

  return (
    <div
      className="w-full overflow-hidden leading-none select-none pointer-events-none"
      style={{ backgroundColor: fromColor, height: "32px" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="w-full h-8 block"
        shapeRendering="crispEdges"
      >
        {/* Stepped pixel sawtooth pattern */}
        <path
          d={`
            M0,32 L0,24 
            L20,24 L20,16 L40,16 L40,24 L60,24 L60,8 L80,8 L80,16 L100,16 L100,0 L120,0 L120,16 L140,16 L140,24 
            L160,24 L160,8 L180,8 L180,24 L200,24 L200,16 L220,16 L220,0 L240,0 L240,16 L260,16 L260,24 
            L280,24 L280,8 L300,8 L300,24 L320,24 L320,16 L340,16 L340,0 L360,0 L360,16 L380,16 L380,24 
            L400,24 L400,8 L420,8 L420,24 L440,24 L440,16 L460,16 L460,0 L480,0 L480,16 L500,16 L500,24 
            L520,24 L520,8 L540,8 L540,24 L560,24 L560,16 L580,16 L580,0 L600,0 L600,16 L620,16 L620,24 
            L640,24 L640,8 L660,8 L660,24 L680,24 L680,16 L700,16 L700,0 L720,0 L720,16 L740,16 L740,24 
            L760,24 L760,8 L780,8 L780,24 L800,24 L800,16 L820,16 L820,0 L840,0 L840,16 L860,16 L860,24 
            L880,24 L880,8 L900,8 L900,24 L920,24 L920,16 L940,16 L940,0 L960,0 L960,16 L980,16 L980,24 
            L1000,24 L1000,8 L1020,8 L1020,24 L1040,24 L1040,16 L1060,16 L1060,0 L1080,0 L1080,16 L1100,16 L1100,24 
            L1120,24 L1120,8 L1140,8 L1140,24 L1160,24 L1160,16 L1180,16 L1180,0 L1200,0 L1200,32 Z
          `}
          fill={toColor}
        />
      </svg>
    </div>
  );
}

