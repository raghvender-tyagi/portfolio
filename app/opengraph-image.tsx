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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          padding: "40px",
          fontFamily: "monospace",
        }}
      >
        {/* Outer System 7 Window */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            border: "4px solid #000000",
            boxShadow: "10px 10px 0px #000000",
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              height: "48px",
              backgroundColor: "#BFBFBF",
              borderBottom: "4px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            {/* Left buttons */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "3px solid #000000",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "3px solid #000000",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: 900,
                color: "#000000",
                letterSpacing: "2px",
                backgroundColor: "#BFBFBF",
                padding: "0 16px",
              }}
            >
              WELCOME.APP • RAGHVENDER TYAGI
            </div>

            {/* Right box */}
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "3px solid #000000",
                backgroundColor: "#FFFFFF",
              }}
            />
          </div>

          {/* Window Body */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "40px 48px",
            }}
          >
            {/* Top row */}
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
                  gap: "12px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#000000",
                  letterSpacing: "1px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 900,
                  }}
                >
                  RT
                </div>
                <span>MACINTOSH HD : SYSTEM FOLDER : RAGHVENDER</span>
              </div>

              <div
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                SYSTEM 7 RETRO EDITION
              </div>
            </div>

            {/* Main Title */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  fontSize: "58px",
                  fontWeight: 900,
                  color: "#000000",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                }}
              >
                Hello. I&apos;m Raghvender.
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#000000",
                  lineHeight: 1.4,
                  maxWidth: "900px",
                }}
              >
                I build agents that ship, and systems that don&apos;t fall over. AI systems &amp; distributed backend engineer. B.Tech CSE (AI), KIET &apos;27.
              </div>
            </div>

            {/* Bottom Row / Badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "3px solid #000000",
                paddingTop: "24px",
              }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "2px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                  }}
                >
                  [ View Portfolio ↗ ]
                </div>
                <div
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#D9D9D9",
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "2px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                  }}
                >
                  [ Download Resume ↓ ]
                </div>
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#000000",
                }}
              >
                raghvender.vercel.app
              </div>
            </div>
          </div>

          {/* Footer Status Line */}
          <div
            style={{
              height: "32px",
              backgroundColor: "#D9D9D9",
              borderTop: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#000000",
            }}
          >
            <span>SYS7 • 68030 33MHz • MEMORY: 16MB • READY</span>
            <span>FINDER 7.1</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
