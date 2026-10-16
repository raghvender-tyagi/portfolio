import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#161616",
          padding: "60px 80px",
          color: "#E4E4E4",
          border: "12px solid #262626",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                backgroundColor: "#E4E4E4",
                color: "#161616",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: 22,
                border: "2px solid #3B4BFF",
              }}
            >
              RT
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: "#E4E4E4" }}>
                RAGHVENDER TYAGI
              </span>
              <span style={{ fontSize: 14, color: "#8E8E8E" }}>
                AI SYSTEMS & DISTRIBUTED BACKEND ENGINEER
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "#202020",
              border: "1px solid #333333",
              fontFamily: "monospace",
              fontSize: 14,
              color: "#3B4BFF",
            }}
          >
            STATUS: OPEN TO WORK
          </div>
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "40px 0",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            I build agents that ship.
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            Systems that don&apos;t fall over.
          </span>
        </div>

        {/* Bottom Tagline & Specs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 30,
            borderTop: "1px solid #2E2E2E",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              fontSize: 15,
              color: "#A0A0A0",
              gap: 4,
            }}
          >
            <span>• LangGraph Multi-Agent Orchestration & State Graphs</span>
            <span>• Sandboxed Compute in Docker (cgroups, network namespaces)</span>
            <span>• Hardened Text-to-SQL AST Verification Pipelines</span>
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              color: "#3B4BFF",
              fontWeight: 700,
            }}
          >
            raghvender.vercel.app ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

